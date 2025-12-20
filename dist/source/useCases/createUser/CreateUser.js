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
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const fs_1 = require("fs");
const User_1 = __importDefault(require("../../domain/Entity/User"));
class CreateUser {
    constructor(repositoryFactory) {
        this.userRepository = repositoryFactory.createUserRepository();
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (input.password.length < 6)
                throw new Error("Invalid password");
            const encryptPassword = yield (0, bcrypt_1.hash)(input.password, 10);
            const user = new User_1.default(input.email, encryptPassword);
            yield this.userRepository.create(user);
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
exports.default = CreateUser;
