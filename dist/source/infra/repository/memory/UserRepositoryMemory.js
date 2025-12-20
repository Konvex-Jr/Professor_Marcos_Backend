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
class UserRepositoryMemory {
    constructor() {
        this.users = [];
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = this.users.find(existentUser => existentUser.email === user.email);
            if (exists)
                throw new Error("Email already exists");
            this.users.push(user);
            return user;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.users.find(user => user.id === id);
            if (!user)
                throw new Error("Usuário não encontrado");
            return user;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.users.find(user => user.email === email);
            if (!user)
                throw new Error("Usuário não encontrado");
            return user;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users;
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.users.findIndex(existingUser => existingUser.id === user.id);
            if (index === -1)
                throw new Error("Usuário não encontrado");
            this.users[index] = user;
            return user;
        });
    }
}
exports.default = UserRepositoryMemory;
