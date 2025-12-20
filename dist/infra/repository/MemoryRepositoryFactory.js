"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepositoryMemory_1 = __importDefault(require("./memory/UserRepositoryMemory"));
const PostRepositoryMemory_1 = __importDefault(require("./memory/PostRepositoryMemory"));
class MemoryRepositoryFactory {
    constructor() {
        this.userRepository = new UserRepositoryMemory_1.default();
        this.postRepository = new PostRepositoryMemory_1.default();
    }
    createPostRepository() {
        return this.postRepository;
    }
    createUserRepository() {
        return this.userRepository;
    }
}
exports.default = MemoryRepositoryFactory;
