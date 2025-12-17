import ConversationRepositoryInterface from "../../domain/Interfaces/ConversationRepositoryInterface";
import RepositoryFactoryInterface from "../../domain/Interfaces/RepositoryFactoryInterface";
import UpdateConversationInput from "./UpdateConversationInput";

export default class UpdateConversation {

    readonly conversationRepository: ConversationRepositoryInterface;

    constructor(repositoryFactory: RepositoryFactoryInterface) {
        this.conversationRepository = repositoryFactory.createConversationRepository();
    }

    async execute(input: UpdateConversationInput): Promise<void> {
        const exists = await this.conversationRepository.findById(input.conversationId);
        if(!exists) throw new Error("Conversation não encontrada");
        await this.conversationRepository.updateConversationTitle(input.conversationId, input.title);
    }
}