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
const bcrypt_1 = require("bcrypt");
const fs_1 = require("fs");
const jsonwebtoken_1 = require("jsonwebtoken");
class LoginUser {
    constructor(repositoryFactory) {
        this.userRepository = repositoryFactory.createUserRepository();
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByEmail(input.email);
            if (!user)
                throw new Error("Invalid credentials");
            const isEqual = yield (0, bcrypt_1.compare)(input.password, user.password);
            if (!isEqual)
                throw new Error("Invalid credentials");
            const privateKey = (0, fs_1.readFileSync)('./private.key');
            const payload = {
                userId: user.id,
                userEmail: user.email
            };
            const accessToken = (0, jsonwebtoken_1.sign)(payload, privateKey, {
                algorithm: "RS256",
                expiresIn: "24h"
            });
            return {
                accessToken
            };
        });
    }
}
exports.default = LoginUser;
