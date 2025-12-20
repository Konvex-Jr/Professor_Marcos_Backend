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
const Feedback_1 = __importDefault(require("../source/domain/Entity/Feedback"));
const CreateFeedback_1 = __importDefault(require("../source/useCases/createFeedback/CreateFeedback"));
describe("CreateFeedback", () => {
    let mockFeedbackRepository;
    let mockRepositoryFactory;
    let createFeedback;
    beforeEach(() => {
        mockFeedbackRepository = {
            create: jest.fn(),
        };
        mockRepositoryFactory = {
            createFeedbackRepository: jest.fn(() => mockFeedbackRepository),
        };
        createFeedback = new CreateFeedback_1.default(mockRepositoryFactory);
    });
    it("deve criar um feedback com sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
        const input = {
            messageId: "123",
            rating: 5,
            comment: "Excelente resposta!",
        };
        yield createFeedback.execute(input);
        expect(mockFeedbackRepository.create).toHaveBeenCalledTimes(1);
        const feedbackCreated = mockFeedbackRepository.create.mock.calls[0][0];
        expect(feedbackCreated).toBeInstanceOf(Feedback_1.default);
        expect(feedbackCreated.messageId).toBe("123");
        expect(feedbackCreated.rating).toBe(5);
        expect(feedbackCreated.comment).toBe("Excelente resposta!");
    }));
    it("deve lançar erro se messageId for inválido", () => __awaiter(void 0, void 0, void 0, function* () {
        const input = { messageId: "", rating: 4, comment: "ok" };
        yield expect(createFeedback.execute(input))
            .rejects
            .toThrow("Invalid message ID");
    }));
    it("deve lançar erro se rating for menor que 1", () => __awaiter(void 0, void 0, void 0, function* () {
        const input = { messageId: "1", rating: 0, comment: "Ruim" };
        yield expect(createFeedback.execute(input))
            .rejects
            .toThrow("Invalid rating");
    }));
    it("deve lançar erro se rating for maior que 5", () => __awaiter(void 0, void 0, void 0, function* () {
        const input = { messageId: "1", rating: 10, comment: "Perfeito" };
        yield expect(createFeedback.execute(input))
            .rejects
            .toThrow("Invalid rating");
    }));
    it("deve lançar erro se comment for inválido", () => __awaiter(void 0, void 0, void 0, function* () {
        const input = { messageId: "1", rating: 3, comment: "" };
        yield expect(createFeedback.execute(input))
            .rejects
            .toThrow("Invalid comment");
    }));
});
