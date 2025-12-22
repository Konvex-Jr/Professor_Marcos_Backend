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
const CreatePost_1 = __importDefault(require("../../useCases/createPost/CreatePost"));
const FindPostById_1 = __importDefault(require("../../useCases/findPostById/FindPostById"));
const FindPostByDate_1 = __importDefault(require("../../useCases/findPostByDate/FindPostByDate"));
const GetAllPosts_1 = __importDefault(require("../../useCases/getAllPosts/GetAllPosts"));
const UpdatePost_1 = __importDefault(require("../../useCases/updatePost/UpdatePost"));
const DeletePost_1 = __importDefault(require("../../useCases/deletePost/DeletePost"));
class PostController {
    constructor(repositoryFactory) {
        this.repositoryFactory = repositoryFactory;
    }
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const createPost = new CreatePost_1.default(this.repositoryFactory);
            return yield createPost.execute(input);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const getAllPosts = new GetAllPosts_1.default(this.repositoryFactory);
            return yield getAllPosts.execute();
        });
    }
    findById(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const findById = new FindPostById_1.default(this.repositoryFactory);
            return yield findById.execute(input);
        });
    }
    findByDate(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const findByDate = new FindPostByDate_1.default(this.repositoryFactory);
            return yield findByDate.execute(input);
        });
    }
    update(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatePost = new UpdatePost_1.default(this.repositoryFactory);
            return yield updatePost.execute(input);
        });
    }
    delete(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletePost = new DeletePost_1.default(this.repositoryFactory);
            return yield deletePost.execute(input);
        });
    }
}
exports.default = PostController;
