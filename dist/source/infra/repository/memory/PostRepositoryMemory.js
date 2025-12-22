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
const Post_1 = __importDefault(require("../../../domain/Entity/Post"));
class PostRepositoryMemory {
    constructor() {
        this.posts = [];
    }
    create(post) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = this.posts.find(existentPost => existentPost.id === post.id);
            if (exists)
                throw new Error("Post já existe");
            this.posts.push(post);
            return post;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = this.posts.find(post => post.id === id);
            if (!post)
                throw new Error("Post não encontrado");
            return post;
        });
    }
    findByDate(created_at) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = this.posts.find(post => post.created_at === created_at);
            if (!post)
                throw new Error("Não há posts nesta data");
            return post;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.posts;
        });
    }
    update(post) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.posts.findIndex(existingPost => existingPost.id === post.id);
            if (index === -1)
                throw new Error("Post não encontrado");
            this.posts[index] = post;
            return post;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.posts.findIndex(existingPost => existingPost.id === id);
            if (index === -1)
                throw new Error("Post não encontrado");
            const deletedPost = this.posts[index];
            this.posts[index] = new Post_1.default(deletedPost.description, deletedPost.post_string, deletedPost.created_at, deletedPost.updated_at, new Date());
            return "Post deletado com sucesso";
        });
    }
}
exports.default = PostRepositoryMemory;
