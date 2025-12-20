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
const UserRoutes_1 = __importDefault(require("./Routes/UserRoutes"));
const PostRoutes_1 = __importDefault(require("./Routes/PostRoutes"));
class Router {
    constructor(http, repositoryFactory) {
        this.http = http;
        this.repositoryFactory = repositoryFactory;
        this.userRoutes = new UserRoutes_1.default(this.http, this.repositoryFactory);
        this.postRoutes = new PostRoutes_1.default(this.http, this.repositoryFactory);
    }
    init() {
        this.http.route("get", "/api/", false, () => __awaiter(this, void 0, void 0, function* () {
            return {
                message: "welcome"
            };
        }));
        this.userRoutes.init();
        this.postRoutes.init();
    }
}
exports.default = Router;
