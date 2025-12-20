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
const FindUserById_1 = __importDefault(require("../source/useCases/findUserById/FindUserById"));
describe("FindUserById UseCase", () => {
    const mockRepositoryFactory = {
        createUserRepository: () => ({
            findById: jest.fn()
        })
    };
    it("deve encontrar um usuário pelo ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const userMock = { id: "1", name: "John Doe", email: "john.doe@example.com", password: "senha123" };
        const useCase = new FindUserById_1.default(mockRepositoryFactory);
        useCase.userRepository.findById.mockResolvedValue(userMock);
        const result = yield useCase.execute({ userId: "1" });
        expect(result.user).toBeDefined();
        expect(result.user.id).toBe(userMock.id);
        expect(result.user.email).toBe(userMock.email);
    }));
    it("deve lançar erro quando o userId não for fornecido", () => __awaiter(void 0, void 0, void 0, function* () {
        const useCase = new FindUserById_1.default(mockRepositoryFactory);
        yield expect(useCase.execute({ userId: "" })).rejects.toThrow("Id do usuário não fornecido");
    }));
    it("deve lançar erro quando o usuário não for encontrado", () => __awaiter(void 0, void 0, void 0, function* () {
        const useCase = new FindUserById_1.default(mockRepositoryFactory);
        useCase.userRepository.findById.mockResolvedValue(null);
        yield expect(useCase.execute({ userId: "1" })).rejects.toThrow("Usuário não encontrado");
    }));
});
