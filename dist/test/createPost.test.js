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
const CreatePost_1 = __importDefault(require("../source/useCases/createPost/CreatePost"));
describe("CreatePost UseCase", () => {
    let createPost;
    let repositoryFactory;
    beforeEach(() => {
        repositoryFactory = new MemoryRepositoryFactory_1.default();
        createPost = new CreatePost_1.default(repositoryFactory);
    });
    test("deve criar um post com sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
        const createPost = new CreatePost_1.default(repositoryFactory);
        const input = {
            description: "description test",
            post_string: "post_string test"
        };
        const newPost = yield createPost.execute(input);
        expect(newPost.post).toBeDefined();
    }));
    test("não deve criar um post caso não seja fornecido uma post_string", () => __awaiter(void 0, void 0, void 0, function* () {
        const createPost = new CreatePost_1.default(repositoryFactory);
        const input = {
            description: "description test",
            post_string: ""
        };
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            const postOutput = yield createPost.execute(input);
        })).rejects.toThrow("String de imagem não fornecida");
    }));
    test("deve chamar o método create do repositório", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockCreate = jest.fn();
        const mockRepositoryFactory = {
            createPostRepository: () => {
                return {
                    create: mockCreate
                };
            }
        };
        const createPost = new CreatePost_1.default(mockRepositoryFactory);
        const input = {
            description: "description test",
            post_string: "post_string test"
        };
        yield createPost.execute(input);
        expect(mockCreate).toHaveBeenCalled();
    }));
});
