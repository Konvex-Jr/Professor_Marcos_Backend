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
const CreateUser_1 = __importDefault(require("../source/useCases/createUser/CreateUser"));
describe("CreateUser UseCase", () => {
    const mockRepositoryFactory = {
        createUserRepository: () => ({
            create: jest.fn(),
            getAll: jest.fn().mockResolvedValue([])
        })
    };
    it("deve criar um usuário com sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
        const useCase = new CreateUser_1.default(mockRepositoryFactory);
        useCase.userRepository.create.mockResolvedValue({ id: "1", name: "John", email: "john.doe@konvex.com.br", password: "senha123" });
        const input = { name: "John", email: "john.doe@konvex.com.br", password: "senha123" };
        const output = yield useCase.execute(input);
        expect(output.accessToken).toBeDefined();
    }));
    it("não deve criar usuário com senha inferior a seis caracteres", () => __awaiter(void 0, void 0, void 0, function* () {
        const useCase = new CreateUser_1.default(mockRepositoryFactory);
        const input = { name: "John", email: "john.doe@konvex.com.br", password: "12345" };
        yield expect(useCase.execute(input)).rejects.toThrow("Invalid password");
    }));
    it("deve chamar o método create do repositório", () => __awaiter(void 0, void 0, void 0, function* () {
        const useCase = new CreateUser_1.default(mockRepositoryFactory);
        useCase.userRepository.create.mockResolvedValue({ id: "1", name: "John", email: "john.doe@konvex.com.br", password: "senha123" });
        const input = { name: "John", email: "john.doe@konvex.com.br", password: "senha123" };
        yield useCase.execute(input);
        expect(useCase.userRepository.create).toHaveBeenCalled();
    }));
});
describe("CreateUser UseCase", () => {
    const mockRepositoryFactory = {
        createUserRepository: () => ({
            create: jest.fn(),
            getAll: jest.fn().mockResolvedValue([])
        })
    };
    it("deve criar um usuário com sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
        const useCase = new CreateUser_1.default(mockRepositoryFactory);
        useCase.userRepository.create.mockResolvedValue({ id: "1", name: "John", email: "john.doe@konvex.com.br", password: "senha123" });
        const input = { name: "John", email: "john.doe@konvex.com.br", password: "senha123" };
        const output = yield useCase.execute(input);
        expect(output.accessToken).toBeDefined();
    }));
    it("não deve criar usuário com senha inferior a seis caracteres", () => __awaiter(void 0, void 0, void 0, function* () {
        const useCase = new CreateUser_1.default(mockRepositoryFactory);
        const input = { name: "John", email: "john.doe@konvex.com.br", password: "12345" };
        yield expect(useCase.execute(input)).rejects.toThrow("Invalid password");
    }));
    it("deve chamar o método create do repositório", () => __awaiter(void 0, void 0, void 0, function* () {
        const useCase = new CreateUser_1.default(mockRepositoryFactory);
        useCase.userRepository.create.mockResolvedValue({ id: "1", name: "John", email: "john.doe@konvex.com.br", password: "senha123" });
        const input = { name: "John", email: "john.doe@konvex.com.br", password: "senha123" };
        yield useCase.execute(input);
        expect(useCase.userRepository.create).toHaveBeenCalled();
    }));
});
