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
const CreateConversation_1 = __importDefault(require("../source/useCases/createConversation/CreateConversation"));
describe("CreateConversation Use Case", () => {
    let mockRepositoryFactory;
    let mockConversationRepository;
    beforeEach(() => {
        mockConversationRepository = {
            create: jest.fn(),
            findById: jest.fn(),
            findAll: jest.fn(),
            delete: jest.fn(),
            update: jest.fn(),
        };
        mockRepositoryFactory = {
            createConversationRepository: jest.fn().mockReturnValue(mockConversationRepository),
        };
    });
    it("deve criar uma nova conversa e chamá-la no repositório", () => __awaiter(void 0, void 0, void 0, function* () {
        const useCase = new CreateConversation_1.default(mockRepositoryFactory);
        const input = {
            userId: "user-123",
            title: "Minha primeira conversa"
        };
        yield useCase.execute(input);
        expect(mockRepositoryFactory.createConversationRepository).toHaveBeenCalledTimes(1);
        expect(mockConversationRepository.create).toHaveBeenCalledTimes(1);
        const createdConversation = mockConversationRepository.create.mock.calls[0][0];
        expect(createdConversation).toBeInstanceOf(Conversation_1.default);
        expect(createdConversation.userId).toBe("user-123");
        expect(createdConversation.title).toBe("Minha primeira conversa");
        expect(createdConversation.id).toBeDefined();
    }));
});
