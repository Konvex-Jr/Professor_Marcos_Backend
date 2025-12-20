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
class PostRepositoryDatabase {
    constructor(connection) {
        this.connection = connection;
    }
    create(post) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield this.findById(post.id);
            if (exists)
                throw new Error("Post já existe");
            yield this.connection.execute("INSERT INTO posts (id, description, post_string, created_at, updated_at, deleted_at) values ($1, $2, $3);", [post.id, post.description, post.post_string, post.created_at, post.updated_at, post.deleted_at]);
            return yield this.findById(post.id);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection.execute("SELECT id, description, post_string, created_at, updated_at FROM posts WHERE id = $1;", [id]);
            if (result.length === 0)
                return null;
            return new Post_1.default(result[0].id, result[0].description, result[0].post_string, result[0].created_at.result[0].updated_at);
        });
    }
    findByDate(created_at) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection.execute("SELECT id, description, post_string, created_at, updated_at FROM posts WHERE created_at = $1;", [created_at]);
            if (result.length === 0)
                return null;
            return new Post_1.default(result[0].id, result[0].description, result[0].post_string, result[0].created_at.result[0].updated_at);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection.execute("SELECT id, description, post_string, created_at, updated_at FROM posts;");
            return result.map((post) => new Post_1.default(post.description, post.post_string, post.created_at, post.updated_at));
        });
    }
    update(post) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.execute("UPDATE posts SET description = $1, post_string = $2, updated_at = $3 where id = $4", [post.description, post.post_string, post.updated_at, post.id]);
            return post;
        });
    }
}
exports.default = PostRepositoryDatabase;
