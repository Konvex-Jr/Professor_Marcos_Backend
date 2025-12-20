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
const User_1 = __importDefault(require("../../../domain/Entity/User"));
class UserRepositoryDatabase {
    constructor(connection) {
        this.connection = connection;
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield this.findByEmail(user.email);
            if (exists)
                throw new Error("Email already exists");
            yield this.connection.execute("insert into users (id, email, password) values ($1, $2, $3);", [user.id, user.email, user.password]);
            return yield this.findById(user.id);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection.execute("select id, email, password from users where id = $1", [id]);
            if (result.length === 0)
                return null;
            return new User_1.default(result[0].email, result[0].password, result[0].id);
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection.execute("select id, email, password from users where email = $1", [email]);
            if (result.length === 0)
                return null;
            return new User_1.default(result[0].email, result[0].password, result[0].id);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection.execute("select id, email, password from users");
            return result.map((user) => new User_1.default(user.email, user.password, user.id));
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.execute("update users set email = $1, password = $2 where id = $3", [user.email, user.password, user.id]);
            return user;
        });
    }
}
exports.default = UserRepositoryDatabase;
