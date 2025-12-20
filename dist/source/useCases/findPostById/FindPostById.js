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
const Post_1 = __importDefault(require("../../domain/Entity/Post"));
class FindPostById {
    constructor(repositoryFactory) {
        this.postRepository = repositoryFactory.createPostRepository();
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!input.post_id)
                throw new Error("ID do post não fornecido");
            const response = yield this.postRepository.findById(input.post_id);
            if (!response)
                throw new Error("Post não encontrado");
            const post = new Post_1.default(response.description, response.post_string, response.created_at, response.updated_at);
            return {
                post
            };
        });
    }
}
exports.default = FindPostById;
