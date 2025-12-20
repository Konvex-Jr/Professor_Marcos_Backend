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
class CreateUsersTable {
    constructor(connection) {
        this.connection = connection;
    }
    up() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.execute(`
            CREATE TABLE IF NOT EXISTS public.users (
                id UUID PRIMARY KEY,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        });
    }
    down() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.execute(`DROP TABLE IF EXISTS public.users;`);
        });
    }
}
exports.default = CreateUsersTable;
