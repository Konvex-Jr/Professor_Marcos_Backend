"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
// ID do Post
// Tipo de Post
// Post (arquivo de imagem)
// Descrição
// Data Criação
// Data Edição
// Data Exclusão
class Post {
    constructor(description, post_string, created_at, updated_at, deleted_at, id) {
        if (!id)
            id = (0, uuid_1.v4)();
        this.id = id;
        this.description = description;
        this.post_string = post_string;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }
}
exports.default = Post;
