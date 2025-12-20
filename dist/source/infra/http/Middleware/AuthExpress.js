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
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const fs_1 = require("fs");
class ExpressAuth {
    constructor(repositoryFactory) {
        this.userRepository = repositoryFactory.createUserRepository();
    }
    execute(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!request.headers || !request.headers['access-token']) {
                return response.status(403).json({
                    message: 'Token is required'
                });
            }
            const token = request.headers['access-token'];
            try {
                const publicKey = (0, fs_1.readFileSync)('./public.key', 'utf8');
                const data = (0, jsonwebtoken_1.verify)(token, publicKey, { algorithms: ["RS256"] });
                const user = yield this.userRepository.findById(data.userId);
                request.body.user = user;
                return next();
            }
            catch (e) {
                return response.status(401).json({
                    message: 'Invalid token'
                });
            }
        });
    }
}
exports.default = ExpressAuth;
