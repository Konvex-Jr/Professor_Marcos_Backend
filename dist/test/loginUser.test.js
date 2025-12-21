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
const MemoryRepositoryFactory_1 = __importDefault(require("../source/infra/repository/MemoryRepositoryFactory"));
const CreateUser_1 = __importDefault(require("../source/useCases/createUser/CreateUser"));
const LoginUser_1 = __importDefault(require("../source/useCases/loginUser/LoginUser"));
describe("LoginUser use case", () => {
    let loginUser;
    let repositoryFactory;
    beforeEach(() => {
        repositoryFactory = new MemoryRepositoryFactory_1.default();
        loginUser = new LoginUser_1.default(repositoryFactory);
    });
    test("Deve gerar um token para usuário válido", () => __awaiter(void 0, void 0, void 0, function* () {
        const createUser = new CreateUser_1.default(repositoryFactory);
        const userInput = {
            name: "John",
            email: "john.doe@gmail.com.br",
            password: "senha123",
        };
        yield createUser.execute(userInput);
        const loginOutput = yield loginUser.execute({
            email: "john.doe@gmail.com.br",
            password: "senha123",
        });
        expect(loginOutput.accessToken).toBeDefined();
    }));
    test("Deve falhar se o usuário não existir", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(loginUser.execute({ email: "no.user@gmail.com.br", password: "123456" })).rejects.toThrow("Usuário não encontrado");
    }));
    test("Deve falhar se a senha estiver incorreta", () => __awaiter(void 0, void 0, void 0, function* () {
        const createUser = new CreateUser_1.default(repositoryFactory);
        const userInput = {
            name: "John",
            email: "john.doe@gmail.com.br",
            password: "senha123",
        };
        yield createUser.execute(userInput);
        yield expect(loginUser.execute({ email: "jane.doe@gmail.com.br", password: "senhaErrada" })).rejects.toThrow("Usuário não encontrado");
    }));
});
