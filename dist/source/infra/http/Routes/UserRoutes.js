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
const UserController_1 = __importDefault(require("../../controller/UserController"));
class UserRoutes {
    constructor(http, repositoryFactory) {
        this.http = http;
        this.userController = new UserController_1.default(repositoryFactory);
    }
    init() {
        // CREATE USER
        this.http.route("post", "/api/auth/register", false, (params, body) => __awaiter(this, void 0, void 0, function* () {
            return yield this.userController.createUser(body);
        }));
        // LOGIN LOGIN
        this.http.route("post", "/api/auth/login", false, (params, body) => __awaiter(this, void 0, void 0, function* () {
            return this.userController.login(body);
        }));
        // GET USERS
        this.http.route("get", "/api/users", false, () => __awaiter(this, void 0, void 0, function* () {
            return this.userController.getAll();
        }));
        // GET USER BY ID
        this.http.route("post", "/api/users/:id", true, (params, body) => __awaiter(this, void 0, void 0, function* () {
            return this.userController.findById(body);
        }));
    }
}
exports.default = UserRoutes;
