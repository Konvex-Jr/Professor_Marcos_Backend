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
const express_1 = __importDefault(require("express"));
class ExpressHttp {
    constructor(auth) {
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.json());
        // @ts-ignore
        this.app.all('*', function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type, access-token');
            next();
        });
        // @ts-ignore
        this.app.options('*', function (req, res, next) {
            res.end();
        });
        this.auth = auth;
    }
    publicRoutes(method, url, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            this.app[method](url, function (req, res) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const result = yield callback(req.params, req.body);
                        res.json(result);
                    }
                    catch (exception) {
                        console.error(exception);
                        res.status(422).json({
                            message: exception.message
                        });
                    }
                });
            });
        });
    }
    privateRoutes(method, url, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            this.app[method](url, this.auth.execute.bind(this.auth), function (req, res) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const result = yield callback(req.params, req.body);
                        res.json(result);
                    }
                    catch (exception) {
                        res.status(422).json({
                            message: exception.message
                        });
                    }
                });
            });
        });
    }
    route(method, url, auth, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (auth)
                this.privateRoutes(method, url, callback);
            else
                this.publicRoutes(method, url, callback);
        });
    }
    listen(port) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.listen(port);
        });
    }
}
exports.default = ExpressHttp;
