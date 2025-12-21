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
const GetAllUsers_1 = __importDefault(require("../source/useCases/getAllUsers/GetAllUsers"));
describe("GetAllUsers UseCase", () => {
    let getAllUsers;
    let mockRepositoryFactory;
    let mockGetAll;
    beforeEach(() => {
        mockGetAll = jest.fn();
        mockRepositoryFactory = {
            createUserRepository: () => ({
                getAll: mockGetAll
            })
        };
        getAllUsers = new GetAllUsers_1.default(mockRepositoryFactory);
    });
    test("deve retornar todos os usuários", () => __awaiter(void 0, void 0, void 0, function* () {
        const usersMock = [
            { id: "1", name: "User 1", email: "user1@example.com", password: "senha123" },
            { id: "2", name: "User 2", email: "user2@example.com", password: "senha123" },
            { id: "3", name: "User 3", email: "user3@example.com", password: "senha123" }
        ];
        mockGetAll.mockResolvedValue(usersMock);
        const result = yield getAllUsers.execute();
        expect(result.data).toHaveLength(3);
        expect(result.data[0].email).toBe("user1@example.com");
        expect(result.data[1].email).toBe("user2@example.com");
        expect(result.data[2].email).toBe("user3@example.com");
    }));
    test("deve retornar array vazio quando não houver usuários", () => __awaiter(void 0, void 0, void 0, function* () {
        mockGetAll.mockResolvedValue([]);
        const result = yield getAllUsers.execute();
        expect(result.data).toEqual([]);
        expect(result.data).toHaveLength(0);
    }));
});
