"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ModelType_1 = require("../source/domain/Enums/ModelType");
const TokenType_1 = require("../source/domain/Enums/TokenType");
const MemoryRepositoryFactory_1 = __importDefault(require("../source/infra/repository/MemoryRepositoryFactory"));
const AskQuestion_1 = __importDefault(require("../source/useCases/askQuestion/AskQuestion"));
const extractTextFromPDF_1 = require("../source/domain/Services/extractTextFromPDF");
const Conversation_1 = __importDefault(require("../source/domain/Entity/Conversation"));
const removeStopwordsService_1 = __importDefault(require("../source/domain/Services/removeStopwordsService"));
// Mocks
jest.mock("openai", () => {
    return jest.fn().mockImplementation(() => ({
        embeddings: {
            create: jest.fn().mockResolvedValue({
                data: [{ embedding: [0.1, 0.2, 0.3] }],
            }),
        },
        chat: {
            completions: {
                create: jest.fn().mockResolvedValue({
                    choices: [{ message: { content: "Resposta simulada via mock" } }],
                }),
            },
        },
    }));
});
jest.mock("../source/domain/Services/extractTextFromPDF", () => ({
    extractPdfText: jest.fn().mockResolvedValue("Texto extraído do PDF sobre educação"),
}));
jest.mock("../source/domain/Services/removeStopwordsService", () => jest.fn().mockImplementation((text) => Promise.resolve(text)));
// Mock Services
class MockEmbeddingService {
    createEmbedding(text, model, tokenType) {
        return __awaiter(this, void 0, void 0, function* () {
            return [0.1, 0.2, 0.3];
        });
    }
}
class MockChunkService {
    findRelevantChunks(embedding) {
        return __awaiter(this, void 0, void 0, function* () {
            return [
                { chunk: "Contexto 1: Educação é fundamental para o desenvolvimento sustentável." },
                { chunk: "Contexto 2: ODS 4 visa garantir educação inclusiva e de qualidade." },
                { chunk: "Contexto 3: A meta é promover oportunidades de aprendizagem ao longo da vida." },
            ];
        });
    }
}
class MockChatService {
    constructor(repositoryFactory) {
        this.repositoryFactory = repositoryFactory;
    }
    chatWithConversation(conversation, model, userPrompt, mentorType) {
        return __awaiter(this, void 0, void 0, function* () {
            const conversationRepo = this.repositoryFactory.createConversationRepository();
            const userMessage = {
                id: `msg-user-${Date.now()}`,
                conversationId: conversation.id,
                role: "user",
                content: userPrompt,
                orderIndex: yield this.getNextOrderIndex(conversation.id),
                createdAt: new Date()
            };
            yield conversationRepo.addMessage(conversation.id, userMessage);
            const simulatedAnswer = `Resposta ${mentorType.toLowerCase()} sobre: ${userPrompt.substring(0, 50)}...`;
            const assistantMessage = {
                id: `msg-assistant-${Date.now()}`,
                conversationId: conversation.id,
                role: "assistant",
                content: simulatedAnswer,
                orderIndex: yield this.getNextOrderIndex(conversation.id),
                createdAt: new Date()
            };
            yield conversationRepo.addMessage(conversation.id, assistantMessage);
            return {
                answer: simulatedAnswer,
                messageId: assistantMessage.id
            };
        });
    }
    getNextOrderIndex(conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const conversationRepo = this.repositoryFactory.createConversationRepository();
            const messages = yield conversationRepo.getMessages(conversationId);
            return messages.length;
        });
    }
}
// Test Suite
describe("AskQuestion Use Case", () => {
    let askQuestion;
    let repositoryFactory;
    let mockEmbeddingService;
    let mockChunkService;
    let mockChatService;
    let testConversationId;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        jest.clearAllMocks();
        repositoryFactory = new MemoryRepositoryFactory_1.default();
        const conversationRepo = repositoryFactory.createConversationRepository();
        testConversationId = "test-conversation-id";
        const conversation = new Conversation_1.default("user-test", "Test Conversation", testConversationId);
        yield conversationRepo.create(conversation);
        mockEmbeddingService = new MockEmbeddingService();
        mockChunkService = new MockChunkService();
        mockChatService = new MockChatService(repositoryFactory);
        askQuestion = new AskQuestion_1.default(repositoryFactory, mockEmbeddingService, mockChunkService, mockChatService);
    }));
    describe("Validação de entrada", () => {
        test("Deve lançar erro quando pergunta estiver vazia", () => __awaiter(void 0, void 0, void 0, function* () {
            const input = {
                question: "",
                mentorType: "GENERATIVO",
                userId: "user-test",
                conversationId: testConversationId,
            };
            yield expect(askQuestion.execute(input)).rejects.toThrow("O campo pergunta é obrigatório.");
        }));
        test("Deve lançar erro quando pergunta for undefined", () => __awaiter(void 0, void 0, void 0, function* () {
            const input = {
                question: undefined,
                mentorType: "GENERATIVO",
                userId: "user-test",
                conversationId: testConversationId,
            };
            yield expect(askQuestion.execute(input)).rejects.toThrow("O campo pergunta é obrigatório.");
        }));
        test("Deve lançar erro quando conversationId não existir", () => __awaiter(void 0, void 0, void 0, function* () {
            const input = {
                question: "Pergunta válida",
                mentorType: "GENERATIVO",
                userId: "user-test",
                conversationId: "conversa-inexistente",
            };
            yield expect(askQuestion.execute(input)).rejects.toThrow("Conversa não encontrada.");
        }));
    });
    describe("Processamento de perguntas simples", () => {
        test("Deve processar pergunta válida e retornar resposta", () => __awaiter(void 0, void 0, void 0, function* () {
            const input = {
                question: "Qual o impacto do ODS 4 na educação?",
                mentorType: "GENERATIVO",
                userId: "user-test",
                conversationId: testConversationId,
            };
            const output = yield askQuestion.execute(input);
            expect(output.answer).toContain("Resposta generativo");
            expect(output.conversationId).toBe(testConversationId);
            expect(output.messageId).toBeDefined();
            expect(removeStopwordsService_1.default).toHaveBeenCalledWith(expect.stringContaining("Qual o impacto do ODS 4"), "porBr");
        }));
        test("Deve processar pergunta com mentor REFLEXIVO", () => __awaiter(void 0, void 0, void 0, function* () {
            const input = {
                question: "Como posso contribuir para a educação de qualidade?",
                mentorType: "REFLEXIVO",
                userId: "user-test",
                conversationId: testConversationId,
            };
            const output = yield askQuestion.execute(input);
            expect(output.answer).toContain("Resposta reflexivo");
            expect(output.conversationId).toBe(testConversationId);
        }));
    });
    describe("Processamento de PDF", () => {
        test("Deve rejeitar arquivo com formato inválido", () => __awaiter(void 0, void 0, void 0, function* () {
            const input = {
                question: "Pergunta com arquivo inválido",
                mentorType: "GENERATIVO",
                userId: "user-test",
                conversationId: testConversationId,
                file: {
                    mimetype: "text/plain",
                    size: 500,
                    buffer: Buffer.from("conteúdo texto"),
                    originalname: "teste.txt"
                },
            };
            yield expect(askQuestion.execute(input)).rejects.toThrow("Formato inválido. Apenas PDF é aceito.");
        }));
        test("Deve rejeitar PDF maior que 1MB", () => __awaiter(void 0, void 0, void 0, function* () {
            const input = {
                question: "Pergunta com PDF grande",
                mentorType: "GENERATIVO",
                userId: "user-test",
                conversationId: testConversationId,
                file: {
                    mimetype: "application/pdf",
                    size: 1500000, // 1.5MB
                    buffer: Buffer.alloc(1500000),
                    originalname: "arquivo-grande.pdf"
                },
            };
            yield expect(askQuestion.execute(input)).rejects.toThrow("O arquivo PDF deve ter menos de 1MB.");
        }));
        test("Deve aceitar e processar PDF válido", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockFile = {
                mimetype: "application/pdf",
                size: 500000,
                buffer: Buffer.from("%PDF-1.4 conteúdo simulado"),
                originalname: "documento.pdf",
                fieldname: "file",
                encoding: "7bit",
                destination: "",
                filename: "documento.pdf",
                path: "",
                stream: {},
            };
            const input = {
                question: "Qual o conteúdo deste documento?",
                mentorType: "GENERATIVO",
                userId: "user-test",
                conversationId: testConversationId,
                file: mockFile,
            };
            const output = yield askQuestion.execute(input);
            expect(extractTextFromPDF_1.extractPdfText).toHaveBeenCalledWith(mockFile);
            expect(removeStopwordsService_1.default).toHaveBeenCalledWith(expect.stringContaining("Texto extraído do PDF"), "porBr");
            expect(output.answer).toBeDefined();
            expect(output.conversationId).toBe(testConversationId);
        }));
        test("Deve combinar texto do PDF com a pergunta para embedding", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockFile = {
                mimetype: "application/pdf",
                size: 300000,
                buffer: Buffer.from("%PDF-1.4"),
                originalname: "relatorio.pdf",
                fieldname: "file",
                encoding: "7bit",
                destination: "",
                filename: "relatorio.pdf",
                path: "",
                stream: {},
            };
            const input = {
                question: "Resuma as principais conclusões",
                mentorType: "REFLEXIVO",
                userId: "user-test",
                conversationId: testConversationId,
                file: mockFile,
            };
            yield askQuestion.execute(input);
            expect(removeStopwordsService_1.default).toHaveBeenCalledWith(expect.stringContaining("Texto extraído do PDF"), "porBr");
            expect(removeStopwordsService_1.default).toHaveBeenCalledWith(expect.stringContaining("Resuma as principais conclusões"), "porBr");
        }));
    });
    describe("Gerenciamento de conversas", () => {
        test("Deve salvar mensagens do usuário e assistente no histórico", () => __awaiter(void 0, void 0, void 0, function* () {
            const conversationRepo = repositoryFactory.createConversationRepository();
            const input = {
                question: "Primeira pergunta da conversa",
                mentorType: "GENERATIVO",
                userId: "user-test",
                conversationId: testConversationId,
            };
            yield askQuestion.execute(input);
            const messages = yield conversationRepo.getMessages(testConversationId);
            expect(messages.length).toBe(2);
            expect(messages[0].role).toBe("user");
            expect(messages[0].content).toContain("Primeira pergunta");
            expect(messages[1].role).toBe("assistant");
            expect(messages[1].content).toBeDefined();
        }));
        test("Deve manter histórico em múltiplas interações", () => __awaiter(void 0, void 0, void 0, function* () {
            const conversationRepo = repositoryFactory.createConversationRepository();
            const input1 = {
                question: "Primeira pergunta sobre ODS 4",
                mentorType: "GENERATIVO",
                userId: "user-test",
                conversationId: testConversationId,
            };
            yield askQuestion.execute(input1);
            const input2 = {
                question: "Segunda pergunta sobre educação inclusiva",
                mentorType: "REFLEXIVO",
                userId: "user-test",
                conversationId: testConversationId,
            };
            yield askQuestion.execute(input2);
            const messages = yield conversationRepo.getMessages(testConversationId);
            expect(messages.length).toBe(4); // 2 pares de user/assistant
            expect(messages[0].role).toBe("user");
            expect(messages[1].role).toBe("assistant");
            expect(messages[2].role).toBe("user");
            expect(messages[3].role).toBe("assistant");
            expect(messages[0].orderIndex).toBe(0);
            expect(messages[3].orderIndex).toBe(3);
        }));
        test("Deve isolar mensagens entre diferentes conversas", () => __awaiter(void 0, void 0, void 0, function* () {
            const conversationRepo = repositoryFactory.createConversationRepository();
            // Cria segunda conversa
            const conversationId2 = "test-conversation-2";
            const conversation2 = new Conversation_1.default("user-test-2", "Second Conversation", conversationId2);
            yield conversationRepo.create(conversation2);
            const input1 = {
                question: "Pergunta na conversa 1",
                mentorType: "GENERATIVO",
                userId: "user-test",
                conversationId: testConversationId,
            };
            const input2 = {
                question: "Pergunta na conversa 2",
                mentorType: "REFLEXIVO",
                userId: "user-test-2",
                conversationId: conversationId2,
            };
            yield askQuestion.execute(input1);
            yield askQuestion.execute(input2);
            const messages1 = yield conversationRepo.getMessages(testConversationId);
            const messages2 = yield conversationRepo.getMessages(conversationId2);
            expect(messages1.length).toBe(2);
            expect(messages2.length).toBe(2);
            expect(messages1[0].content).toContain("conversa 1");
            expect(messages2[0].content).toContain("conversa 2");
        }));
    });
    describe("Integração de serviços", () => {
        test("Deve utilizar embedding service para processar texto", () => __awaiter(void 0, void 0, void 0, function* () {
            const spyEmbedding = jest.spyOn(mockEmbeddingService, 'createEmbedding');
            const input = {
                question: "Teste de embedding",
                mentorType: "GENERATIVO",
                userId: "user-test",
                conversationId: testConversationId,
            };
            yield askQuestion.execute(input);
            expect(spyEmbedding).toHaveBeenCalledWith(expect.any(String), ModelType_1.ModelType.EMBEDDING_MODEL, TokenType_1.TokenType.INPUT);
        }));
        test("Deve buscar chunks relevantes baseados no embedding", () => __awaiter(void 0, void 0, void 0, function* () {
            const spyChunk = jest.spyOn(mockChunkService, 'findRelevantChunks');
            const input = {
                question: "Qual a importância da educação?",
                mentorType: "GENERATIVO",
                userId: "user-test",
                conversationId: testConversationId,
            };
            yield askQuestion.execute(input);
            expect(spyChunk).toHaveBeenCalledWith([0.1, 0.2, 0.3]);
        }));
        test("Deve passar contexto dos chunks para o chat service", () => __awaiter(void 0, void 0, void 0, function* () {
            const spyChatService = jest.spyOn(mockChatService, 'chatWithConversation');
            const input = {
                question: "Como melhorar a educação?",
                mentorType: "REFLEXIVO",
                userId: "user-test",
                conversationId: testConversationId,
            };
            yield askQuestion.execute(input);
            expect(spyChatService).toHaveBeenCalledWith(expect.any(Object), ModelType_1.ModelType.PROMPT_MODEL, "Como melhorar a educação?", "REFLEXIVO", expect.any(Array));
        }));
    });
    describe("Fluxo completo (end-to-end)", () => {
        test("Deve executar fluxo completo: pergunta + PDF + histórico", () => __awaiter(void 0, void 0, void 0, function* () {
            const conversationRepo = repositoryFactory.createConversationRepository();
            const mockFile = {
                mimetype: "application/pdf",
                size: 400000,
                buffer: Buffer.from("%PDF-1.4"),
                originalname: "estudo-educacao.pdf",
                fieldname: "file",
                encoding: "7bit",
                destination: "",
                filename: "estudo-educacao.pdf",
                path: "",
                stream: {},
            };
            const input = {
                question: "Com base neste documento, quais são as estratégias mais eficazes?",
                mentorType: "GENERATIVO",
                userId: "user-test",
                conversationId: testConversationId,
                file: mockFile,
            };
            const output = yield askQuestion.execute(input);
            expect(extractTextFromPDF_1.extractPdfText).toHaveBeenCalled();
            expect(removeStopwordsService_1.default).toHaveBeenCalled();
            expect(output.answer).toBeDefined();
            expect(output.conversationId).toBe(testConversationId);
            expect(output.messageId).toBeDefined();
            const messages = yield conversationRepo.getMessages(testConversationId);
            expect(messages.length).toBe(2);
            expect(messages[0].role).toBe("user");
            expect(messages[1].role).toBe("assistant");
        }));
    });
});
