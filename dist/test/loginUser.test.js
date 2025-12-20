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
const LoginUser_1 = __importDefault(require("../source/useCases/loginUser/LoginUser"));
describe("LoginUser UseCase", () => {
    const mockRepositoryFactory = {
        createUserRepository: () => ({
            findByEmail: jest.fn()
        })
    };
    it("deve gerar um token para usuário válido", () => __awaiter(void 0, void 0, void 0, function* () {
        const userMock = { id: "1", name: "John", email: "john.doe@gmail.com.br", password: "senha123" };
        const useCase = new LoginUser_1.default(mockRepositoryFactory);
        useCase.userRepository.findByEmail.mockResolvedValue(userMock);
        const loginOutput = yield useCase.execute({ email: "john.doe@gmail.com.br", password: "senha123" });
        expect(loginOutput.accessToken).toBeDefined();
    }));
    it("deve falhar se o usuário não existir", () => __awaiter(void 0, void 0, void 0, function* () {
        const useCase = new LoginUser_1.default(mockRepositoryFactory);
        useCase.userRepository.findByEmail.mockResolvedValue(null);
        yield expect(useCase.execute({ email: "no.user@gmail.com.br", password: "123456" })).rejects.toThrow("Usuário não encontrado");
    }));
    it("deve falhar se a senha estiver incorreta", () => __awaiter(void 0, void 0, void 0, function* () {
        const userMock = { id: "1", name: "John", email: "john.doe@gmail.com.br", password: "senha123" };
        const useCase = new LoginUser_1.default(mockRepositoryFactory);
        useCase.userRepository.findByEmail.mockResolvedValue(userMock);
        yield expect(useCase.execute({ email: "john.doe@gmail.com.br", password: "senhaErrada" })).rejects.toThrow("Usuário não encontrado");
    }));
});
