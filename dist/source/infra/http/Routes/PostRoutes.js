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
const PostController_1 = __importDefault(require("../../controller/PostController"));
class PostRoutes {
    constructor(http, repositoryFactory) {
        this.http = http;
        this.postController = new PostController_1.default(repositoryFactory);
    }
    init() {
        // CREATE POST
        this.http.route("post", "/api/posts", true, (params, body) => __awaiter(this, void 0, void 0, function* () {
            return yield this.postController.create(body);
        }));
        // GET POSTS
        this.http.route("get", "/api/posts", false, () => __awaiter(this, void 0, void 0, function* () {
            return this.postController.getAll();
        }));
        // GET POSTS BY ID
        this.http.route("get", "/api/posts/:id", true, (params, body) => __awaiter(this, void 0, void 0, function* () {
            return this.postController.findById(params);
        }));
        // GET POST BY DATE
        this.http.route("get", "/api/posts", true, (params, body) => __awaiter(this, void 0, void 0, function* () {
            return this.postController.findByDate(body);
        }));
        // UPDATE POST
        this.http.route("put", "/api/posts/:id", true, (params, body) => __awaiter(this, void 0, void 0, function* () {
            return this.postController.update(body);
        }));
        // DELETE POST
        this.http.route("delete", "/api/posts/:id", false, (params, body) => __awaiter(this, void 0, void 0, function* () {
            return this.postController.delete(params);
        }));
    }
}
exports.default = PostRoutes;
