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
const UpdatePost_1 = __importDefault(require("../source/useCases/updatePost/UpdatePost"));
describe("UpdatePost UseCase", () => {
    let updatePost;
    let mockRepositoryFactory;
    let mockFindById;
    beforeEach(() => {
        mockFindById = jest.fn();
        mockRepositoryFactory = {
            createPostRepository: () => ({
                findById: mockFindById
            })
        };
        updatePost = new UpdatePost_1.default(mockRepositoryFactory);
    });
    test("deve atualizar um post existente", () => __awaiter(void 0, void 0, void 0, function* () {
        const postMock = { id: "1", description: "desc", post_string: "str", created_at: new Date(), updated_at: new Date() };
        mockFindById.mockResolvedValue(postMock);
        const input = { post: { id: "1", description: "nova desc", post_string: "novo str" } };
        const result = yield updatePost.execute(input);
        expect(result.post).toBeDefined();
        expect(result.post.description).toBe(input.post.description);
    }));
    test("deve lançar erro se input não for fornecido", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(updatePost.execute(undefined)).rejects.toThrow("Post não fornecido");
    }));
    test("deve lançar erro se post não encontrado", () => __awaiter(void 0, void 0, void 0, function* () {
        mockFindById.mockResolvedValue(null);
        const input = { post: { id: "1", description: "desc", post_string: "str" } };
        yield expect(updatePost.execute(input)).rejects.toThrow("Post não encontrado");
    }));
});
