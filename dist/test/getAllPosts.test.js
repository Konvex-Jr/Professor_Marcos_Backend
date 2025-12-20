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
const GetAllPosts_1 = __importDefault(require("../source/useCases/getAllPosts/GetAllPosts"));
describe("GetAllPosts UseCase", () => {
    const mockRepositoryFactory = {
        createPostRepository: () => ({
            getAll: jest.fn()
        })
    };
    it("deve retornar todos os posts", () => __awaiter(void 0, void 0, void 0, function* () {
        const postsMock = [{ description: "desc", post_string: "str", created_at: new Date(), updated_at: new Date() }];
        const useCase = new GetAllPosts_1.default(mockRepositoryFactory);
        useCase.postRepository.getAll.mockResolvedValue(postsMock);
        const result = yield useCase.execute();
        expect(result.data).toBeDefined();
        expect(result.data.length).toBe(1);
    }));
    it("deve lançar erro se não houver posts", () => __awaiter(void 0, void 0, void 0, function* () {
        const useCase = new GetAllPosts_1.default(mockRepositoryFactory);
        useCase.postRepository.getAll.mockResolvedValue(null);
        yield expect(useCase.execute()).rejects.toThrow("Nenhum post cadastrado ou erro na requisição");
    }));
});
const mockRepositoryFactory = {
    createPostRepository: () => ({
        getAll: jest.fn()
    })
};
it("deve retornar todos os posts", () => __awaiter(void 0, void 0, void 0, function* () {
    const postsMock = [{ description: "desc", post_string: "str", created_at: new Date(), updated_at: new Date() }];
    const useCase = new GetAllPosts_1.default(mockRepositoryFactory);
    useCase.postRepository.getAll.mockResolvedValue(postsMock);
    const result = yield useCase.execute();
    expect(result.data).toBeDefined();
    expect(result.data.length).toBe(1);
}));
it("deve lançar erro se não houver posts", () => __awaiter(void 0, void 0, void 0, function* () {
    const useCase = new GetAllPosts_1.default(mockRepositoryFactory);
    useCase.postRepository.getAll.mockResolvedValue(null);
    yield expect(useCase.execute()).rejects.toThrow("Nenhum post cadastrado ou erro na requisição");
}));
