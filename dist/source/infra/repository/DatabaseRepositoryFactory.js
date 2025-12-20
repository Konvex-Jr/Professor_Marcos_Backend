"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepositoryDatabase_1 = __importDefault(require("./database/UserRepositoryDatabase"));
const PostRepositoryDatabase_1 = __importDefault(require("./database/PostRepositoryDatabase"));
class DatabaseRepositoryFactory {
    constructor(connection) {
        this.userRepository = new UserRepositoryDatabase_1.default(connection);
        this.postRepository = new PostRepositoryDatabase_1.default(connection);
    }
    createUserRepository() { return this.userRepository; }
    createPostRepository() { return this.postRepository; }
}
exports.default = DatabaseRepositoryFactory;
