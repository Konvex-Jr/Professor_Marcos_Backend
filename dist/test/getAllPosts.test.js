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
    let getAllPosts;
    let mockRepositoryFactory;
    let mockGetAll;
    beforeEach(() => {
        mockGetAll = jest.fn();
        mockRepositoryFactory = {
            createPostRepository: () => ({
                getAll: mockGetAll
            })
        };
        getAllPosts = new GetAllPosts_1.default(mockRepositoryFactory);
    });
    test("deve retornar todos os posts", () => __awaiter(void 0, void 0, void 0, function* () {
        const postsMock = [{ description: "desc", post_string: "str", created_at: new Date(), updated_at: new Date() }];
        mockGetAll.mockResolvedValue(postsMock);
        const result = yield getAllPosts.execute();
        expect(result.data).toBeDefined();
        expect(result.data.length).toBe(1);
    }));
    test("deve lançar erro se não houver posts", () => __awaiter(void 0, void 0, void 0, function* () {
        mockGetAll.mockResolvedValue(null);
        yield expect(getAllPosts.execute()).rejects.toThrow("Nenhum post cadastrado ou erro na requisição");
    }));
});
