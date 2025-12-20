"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
// ID do Usuário
// Email
// Senha
class User {
    constructor(email, password, id) {
        if (!id)
            id = (0, uuid_1.v4)();
        this.id = id;
        this.email = email;
        this.password = password;
    }
}
exports.default = User;
