import OpenAI from "openai";
import { ModelType } from "../../domain/Enums/ModelType";
import { TokenType } from "../../domain/Enums/TokenType";
import RepositoryFactoryInterface from "../../domain/Interfaces/RepositoryFactoryInterface";
import { extractPdfText } from "../../domain/Services/extractTextFromPDF";
import AskQuestionInput from "./AskQuestionInput";
import AskQuestionOutput from "./AskQuestionOutput";
import EmbeddingService from "../../domain/Services/EmbeddingService";
import ChunkService from "../../domain/Services/ChunkService";
import OpenAIChatService from "../../domain/Services/OpenAIChatService";
import removeStopwordsService from "../../domain/Services/removeStopwordsService";

export default class AskQuestion {
    private repositoryFactory: RepositoryFactoryInterface;
    private embeddingService: EmbeddingService;
    private chunkService: ChunkService;
    private chatService: OpenAIChatService;

    constructor(
        repositoryFactory: RepositoryFactoryInterface,
        embeddingService?: EmbeddingService,
        chunkService?: ChunkService,
        chatService?: OpenAIChatService,
    ) {
        this.repositoryFactory = repositoryFactory;

        this.embeddingService =
            embeddingService ||
            new EmbeddingService(this.repositoryFactory, new OpenAI({ apiKey: process.env.OPENAI_API_KEY }));

        this.chunkService =
            chunkService ||
            new ChunkService(this.repositoryFactory);

        this.chatService =
            chatService ||
            new OpenAIChatService(this.repositoryFactory, new OpenAI({ apiKey: process.env.OPENAI_API_KEY }));
    }

    async execute(input: AskQuestionInput): Promise<AskQuestionOutput> {
        if (!input.question) throw new Error("O campo pergunta é obrigatório.");

        let fileText = "";
        if (input.file) {
            const file = input.file as Express.Multer.File;

            if (file.mimetype !== "application/pdf")
                throw new Error("Formato inválido. Apenas PDF é aceito.");

            if (file.size > 1_000_000)
                throw new Error("O arquivo PDF deve ter menos de 1MB.");

            fileText = await extractPdfText(file);
        }

        const combinedText = [fileText, input.question].filter(Boolean).join(" ");
        const cleanedText = await removeStopwordsService(combinedText, "porBr");
        const queryEmbedding = await this.embeddingService.createEmbedding(
            cleanedText,
            ModelType.EMBEDDING_MODEL,
            TokenType.INPUT
        );

        const topChunks = await this.chunkService.findRelevantChunks(queryEmbedding);
        const contextIds = topChunks.map(c => c.id);
        const conversationRepository = this.repositoryFactory.createConversationRepository();
        const conversation = await conversationRepository.findById(input.conversationId);

        if (!conversation) throw new Error("Conversa não encontrada.");

        const response = await this.chatService.chatWithConversation(
            conversation,
            ModelType.PROMPT_MODEL,
            input.question,
            input.mentorType,
            contextIds
        );

        return {
            answer: response.answer,
            conversationId: conversation.id,
            messageId: response.messageId
        };
    }
}
