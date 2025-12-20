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
const CreateUser_1 = __importDefault(require("../../useCases/createUser/CreateUser"));
const FindUserById_1 = __importDefault(require("../../useCases/findUserById/FindUserById"));
const GetAllUsers_1 = __importDefault(require("../../useCases/getAllUsers/GetAllUsers"));
const LoginUser_1 = __importDefault(require("../../useCases/loginUser/LoginUser"));
class UserController {
    constructor(repositoryFactory) {
        this.repositoryFactory = repositoryFactory;
    }
    createUser(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const createUser = new CreateUser_1.default(this.repositoryFactory);
            return yield createUser.execute(input);
        });
    }
    login(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginUser = new LoginUser_1.default(this.repositoryFactory);
            return yield loginUser.execute(input);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const getAllUsers = new GetAllUsers_1.default(this.repositoryFactory);
            return yield getAllUsers.execute();
        });
    }
    findById(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const findById = new FindUserById_1.default(this.repositoryFactory);
            return yield findById.execute(input);
        });
    }
}
exports.default = UserController;
