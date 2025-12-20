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
const CreatePost_1 = __importDefault(require("../source/useCases/createPost/CreatePost"));
describe("CreatePost UseCase", () => {
    const mockRepositoryFactory = {
        createPostRepository: () => ({
            create: jest.fn(),
            getAll: jest.fn().mockResolvedValue([])
        })
    };
    it("deve criar um post com sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
        const useCase = new CreatePost_1.default(mockRepositoryFactory);
        useCase.postRepository.create.mockResolvedValue({ id: "1", description: "meu primeiro post", post_string: "teste post_string", created_at: new Date(), updated_at: new Date(), deleted_at: null });
        const input = { description: "meu primeiro post", post_string: "teste post_string", created_at: new Date(), updated_at: new Date(), deleted_at: null };
        const output = yield useCase.execute(input);
        expect(output.post).toBeDefined();
        expect(output.post.description).toBe(input.description);
    }));
    it("não deve criar um post caso não seja fornecido uma post_string", () => __awaiter(void 0, void 0, void 0, function* () {
        const useCase = new CreatePost_1.default(mockRepositoryFactory);
        const input = { description: "meu primeiro post", post_string: '', created_at: new Date(), updated_at: new Date(), deleted_at: null };
        yield expect(useCase.execute(input)).rejects.toThrow("String de imagem não fornecido");
    }));
    it("deve chamar o método create do repositório", () => __awaiter(void 0, void 0, void 0, function* () {
        const useCase = new CreatePost_1.default(mockRepositoryFactory);
        useCase.postRepository.create.mockResolvedValue({ id: "1", description: "meu primeiro post", post_string: "teste post_string", created_at: new Date(), updated_at: new Date(), deleted_at: null });
        const input = { description: "meu primeiro post", post_string: "teste post_string", created_at: new Date(), updated_at: new Date(), deleted_at: null };
        yield useCase.execute(input);
        expect(useCase.postRepository.create).toHaveBeenCalled();
    }));
});
