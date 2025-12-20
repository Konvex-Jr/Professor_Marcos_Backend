"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_promise_1 = __importDefault(require("pg-promise"));
class PostgreSQLConnection {
    constructor(configDatabase) {
        this.pgp = (0, pg_promise_1.default)()(`postgres://${configDatabase.user}:${configDatabase.password}@${configDatabase.host}:${configDatabase.port}/${configDatabase.database}`);
    }
    execute(statement, params) {
        return this.pgp.query(statement, params);
    }
    close() {
        return this.pgp.$pool.end();
    }
}
exports.default = PostgreSQLConnection;
