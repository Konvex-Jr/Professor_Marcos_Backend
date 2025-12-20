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
const Message_1 = __importDefault(require("../source/domain/Entity/Message"));
const ConversationRepositoryMemory_1 = __importDefault(require("../source/infra/repository/memory/ConversationRepositoryMemory"));
const GetMessagesFromConversation_1 = __importDefault(require("../source/useCases/getMessagesFromConversation/GetMessagesFromConversation"));
describe("GetMessagesFromConversation with Memory Repository", () => {
    let useCase;
    let conversationRepo;
    let mockRepositoryFactory;
    beforeEach(() => {
        conversationRepo = new ConversationRepositoryMemory_1.default();
        mockRepositoryFactory = {
            createConversationRepository: jest.fn().mockReturnValue(conversationRepo),
        };
        useCase = new GetMessagesFromConversation_1.default(mockRepositoryFactory);
    });
    it("should return messages from a conversation", () => __awaiter(void 0, void 0, void 0, function* () {
        const chatId = "conversation-123";
        jest.spyOn(conversationRepo, "getMessages").mockResolvedValueOnce([
            new Message_1.default({
                chatId,
                role: "user",
                content: "Hello",
                orderIndex: 0,
                id: "msg-1",
                createdAt: new Date("2025-01-01"),
            }),
            new Message_1.default({
                chatId,
                role: "assistant",
                content: "World",
                orderIndex: 1,
                id: "msg-2",
                createdAt: new Date("2025-01-02"),
            }),
        ]);
        const result = yield useCase.execute({ chatId });
        expect(result.data).toHaveLength(2);
        expect(result.data[0].content).toBe("Hello");
        expect(result.data[1].content).toBe("World");
    }));
    it("should return empty array when no messages exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const chatId = "empty";
        const result = yield useCase.execute({ chatId });
        expect(result.data).toEqual([]);
    }));
    it("should return messages with correct properties", () => __awaiter(void 0, void 0, void 0, function* () {
        const chatId = "conversation-789";
        const createdAt = new Date("2025-01-15");
        const msg = new Message_1.default({
            chatId,
            role: "system",
            content: "System message",
            orderIndex: 0,
            id: "sys-msg",
            createdAt,
            contextIds: ["ctx-1", "ctx-2"],
            metadata: { foo: "bar" },
        });
        jest.spyOn(conversationRepo, "getMessages").mockResolvedValueOnce([msg]);
        const result = yield useCase.execute({ chatId });
        const returned = result.data[0];
        expect(returned.id).toBe("sys-msg");
        expect(returned.chatId).toBe(chatId);
        expect(returned.role).toBe("system");
        expect(returned.content).toBe("System message");
        expect(returned.orderIndex).toBe(0);
        expect(returned.createdAt).toEqual(createdAt);
        expect(returned.contextIds).toEqual(["ctx-1", "ctx-2"]);
        expect(returned.metadata).toEqual({ foo: "bar" });
    }));
    it("should call repository factory to create conversation repository", () => {
        expect(mockRepositoryFactory.createConversationRepository).toHaveBeenCalledTimes(1);
    });
    it("should propagate error when repository fails", () => __awaiter(void 0, void 0, void 0, function* () {
        const chatId = "conversation-error";
        jest.spyOn(conversationRepo, "getMessages").mockRejectedValue(new Error("Database connection failed"));
        yield expect(useCase.execute({ chatId })).rejects.toThrow("Database connection failed");
    }));
});
