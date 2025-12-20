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
const Conversation_1 = __importDefault(require("../source/domain/Entity/Conversation"));
const ListConversation_1 = __importDefault(require("../source/useCases/listConversation/ListConversation"));
describe("ListConversation Use Case", () => {
    let mockRepositoryFactory;
    let mockConversationRepository;
    let listConversation;
    beforeEach(() => {
        mockConversationRepository = {
            getAllByUserId: jest.fn(),
        };
        mockRepositoryFactory = {
            createConversationRepository: jest.fn().mockReturnValue(mockConversationRepository),
        };
        listConversation = new ListConversation_1.default(mockRepositoryFactory);
    });
    it("deve retornar todas as conversas pertencentes ao usuário informado", () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = "user-1";
        const mockConversations = [
            new Conversation_1.default(userId, "Conversa 1"),
            new Conversation_1.default(userId, "Conversa 2"),
        ];
        mockConversationRepository.getAllByUserId.mockResolvedValue(mockConversations);
        const input = { userId: userId };
        const result = yield listConversation.execute(input);
        expect(mockRepositoryFactory.createConversationRepository).toHaveBeenCalledTimes(1);
        expect(mockConversationRepository.getAllByUserId).toHaveBeenCalledWith(userId);
        expect(mockConversationRepository.getAllByUserId).toHaveBeenCalledTimes(1);
        expect(result).toEqual({ data: mockConversations });
    }));
    it("deve retornar um array vazio quando o usuário não possui conversas", () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = "user-2";
        mockConversationRepository.getAllByUserId.mockResolvedValue([]);
        const input = { userId: userId };
        const result = yield listConversation.execute(input);
        expect(mockConversationRepository.getAllByUserId).toHaveBeenCalledWith(userId);
        expect(mockConversationRepository.getAllByUserId).toHaveBeenCalledTimes(1);
        expect(result).toEqual({ data: [] });
    }));
});
