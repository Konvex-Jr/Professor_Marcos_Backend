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
const DeleteConversation_1 = __importDefault(require("../source/useCases/deleteConversation/DeleteConversation"));
describe("DeleteConversation Use Case", () => {
    let mockRepositoryFactory;
    let mockConversationRepository;
    let deleteConversation;
    beforeEach(() => {
        mockConversationRepository = {
            deleteConversation: jest.fn(),
        };
        mockRepositoryFactory = {
            createConversationRepository: jest.fn().mockReturnValue(mockConversationRepository),
        };
        deleteConversation = new DeleteConversation_1.default(mockRepositoryFactory);
    });
    it("deve chamar o método deleteConversation do repositório com chatId e userId corretos", () => __awaiter(void 0, void 0, void 0, function* () {
        const input = {
            chatId: "chat-123",
            userId: "user-123",
        };
        yield deleteConversation.execute(input);
        expect(mockRepositoryFactory.createConversationRepository).toHaveBeenCalledTimes(1);
        expect(mockConversationRepository.deleteConversation).toHaveBeenCalledTimes(1);
        expect(mockConversationRepository.deleteConversation).toHaveBeenCalledWith("chat-123", "user-123");
    }));
    it("não deve lançar erro quando o repositório executa corretamente", () => __awaiter(void 0, void 0, void 0, function* () {
        mockConversationRepository.deleteConversation.mockResolvedValue();
        const input = {
            chatId: "chat-456",
            userId: "user-456",
        };
        yield expect(deleteConversation.execute(input)).resolves.not.toThrow();
        expect(mockConversationRepository.deleteConversation).toHaveBeenCalledWith("chat-456", "user-456");
    }));
    it("deve lançar erro se o repositório falhar ao deletar", () => __awaiter(void 0, void 0, void 0, function* () {
        mockConversationRepository.deleteConversation.mockRejectedValue(new Error("Falha ao deletar"));
        const input = {
            chatId: "chat-789",
            userId: "user-789",
        };
        yield expect(deleteConversation.execute(input)).rejects.toThrow("Falha ao deletar");
        expect(mockConversationRepository.deleteConversation).toHaveBeenCalledWith("chat-789", "user-789");
    }));
});
