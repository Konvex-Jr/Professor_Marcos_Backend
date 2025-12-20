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
const FindPostById_1 = __importDefault(require("../source/useCases/findPostById/FindPostById"));
describe("FindPostById UseCase", () => {
    const mockRepositoryFactory = {
        createPostRepository: () => ({
            findById: jest.fn()
        })
    };
    it("deve retornar um post quando o ID existe", () => __awaiter(void 0, void 0, void 0, function* () {
        const postMock = { description: "desc", post_string: "str", created_at: new Date(), updated_at: new Date() };
        const useCase = new FindPostById_1.default(mockRepositoryFactory);
        useCase.postRepository.findById.mockResolvedValue(postMock);
        const input = { post_id: "1" };
        const result = yield useCase.execute(input);
        expect(result.post).toBeDefined();
        expect(result.post.description).toBe(postMock.description);
    }));
    it("deve lançar erro se ID não for fornecido", () => __awaiter(void 0, void 0, void 0, function* () {
        const useCase = new FindPostById_1.default(mockRepositoryFactory);
        yield expect(useCase.execute({})).rejects.toThrow("ID do post não fornecido");
    }));
    it("deve lançar erro se post não encontrado", () => __awaiter(void 0, void 0, void 0, function* () {
        const useCase = new FindPostById_1.default(mockRepositoryFactory);
        useCase.postRepository.findById.mockResolvedValue(null);
        yield expect(useCase.execute({ post_id: "1" })).rejects.toThrow("Post não encontrado");
    }));
});
