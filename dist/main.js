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
const dotenv_1 = require("dotenv");
const PostgreSQLConnection_1 = __importDefault(require("./infra/database/PostgreSQLConnection"));
const ExpressHttp_1 = __importDefault(require("./infra/http/ExpressHttp"));
const Router_1 = __importDefault(require("./infra/http/Router"));
const DatabaseRepositoryFactory_1 = __importDefault(require("./infra/repository/DatabaseRepositoryFactory"));
const AuthExpress_1 = __importDefault(require("./infra/http/Middleware/AuthExpress"));
const _01_create_users_table_1 = __importDefault(require("./infra/migrations/01.create_users_table"));
const _02_create_posts_table_1 = __importDefault(require("./infra/migrations/02.create_posts_table"));
(0, dotenv_1.config)();
console.log("🚀 Iniciando aplicação...");
console.log("📋 Variáveis de ambiente carregadas:");
console.log({
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_USERNAME: process.env.DB_USERNAME ? "***" : "não definido",
    PORT: process.env.PORT || 5432,
});
function runMigrations(connection) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("\n📦 Executando migrations...");
        const migrations = [
            { name: "users", instance: new _01_create_users_table_1.default(connection) },
            { name: "posts", instance: new _02_create_posts_table_1.default(connection) }
        ];
        for (const migration of migrations) {
            try {
                console.log(`  ⏳ Executando migration '${migration.name}'...`);
                yield migration.instance.up();
                console.log(`  ✅ Migration '${migration.name}' executada com sucesso!`);
            }
            catch (err) {
                console.error(`  ❌ Erro ao executar a migration '${migration.name}':`, err);
                throw err;
            }
        }
        console.log("✅ Todas as migrations foram executadas!\n");
    });
}
function listRoutes(http) {
    const stack = http["app"]._router.stack;
    const results = [];
    function traverse(stack, prefix = "") {
        stack.forEach((layer) => {
            var _a, _b, _c, _d;
            if (layer.route) {
                const methods = Object.keys(layer.route.methods)
                    .map(m => m.toUpperCase())
                    .join(", ");
                results.push(`${methods} ${prefix}${layer.route.path}`);
            }
            else if (layer.name === "router" && layer.handle.stack) {
                const newPrefix = ((_d = (_c = (_b = (_a = layer.regexp) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.replace("^\\", "")) === null || _c === void 0 ? void 0 : _c.replace("\\/?(?=\\/|$)", "")) === null || _d === void 0 ? void 0 : _d.replace(/\\\//g, "/")) || "";
                traverse(layer.handle.stack, prefix + newPrefix);
            }
        });
    }
    traverse(stack);
    console.log("\n🛣️  === Rotas registradas ===");
    results.forEach(r => console.log(`  ${r}`));
    console.log("========================\n");
}
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        try {
            console.log("1️⃣  Conectando ao banco de dados...");
            const connection = new PostgreSQLConnection_1.default({
                user: (_a = process.env.DB_USERNAME) !== null && _a !== void 0 ? _a : "",
                password: (_b = process.env.DB_PASSWORD) !== null && _b !== void 0 ? _b : "",
                database: (_c = process.env.DB_DATABASE) !== null && _c !== void 0 ? _c : "",
                host: (_d = process.env.DB_HOST) !== null && _d !== void 0 ? _d : "",
                port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
            });
            console.log("✅ Conexão com banco de dados estabelecida!\n");
            console.log("2️⃣  Executando migrations...");
            yield runMigrations(connection);
            console.log("3️⃣  Inicializando dependências...");
            const repositoryFactory = new DatabaseRepositoryFactory_1.default(connection);
            const auth = new AuthExpress_1.default(repositoryFactory);
            const http = new ExpressHttp_1.default(auth);
            const router = new Router_1.default(http, repositoryFactory);
            console.log("✅ Dependências inicializadas!\n");
            console.log("4️⃣  Registrando rotas...");
            router.init();
            listRoutes(http);
            const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
            console.log(`5️⃣  Iniciando servidor na porta ${PORT}...`);
            yield http.listen(PORT);
            console.log("\n" + "=".repeat(50));
            console.log(`✅ Server running on http://localhost:${PORT}`);
            console.log("✅ Bootstrap concluído com sucesso!");
            console.log("=".repeat(50) + "\n");
            console.log("🔐 Middleware de autenticação ativo");
            console.log("📝 Pronto para receber requisições!\n");
        }
        catch (err) {
            console.error("\n❌ Erro no bootstrap do servidor:");
            console.error(err);
            process.exit(1);
        }
    });
}
bootstrap();
