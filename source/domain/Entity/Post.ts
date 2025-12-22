import { v4 as uuid } from "uuid";

// ID do Post
// Tipo de Post
// Post (arquivo de imagem)
// Descrição
// Data Criação
// Data Edição
// Data Exclusão

export default class Post {
    
    readonly id: string 
    readonly description: string
    readonly post_string: string
    readonly created_at: Date
    readonly updated_at: Date
    readonly deleted_at: Date | null

    constructor(description: string, post_string: string, created_at: Date, updated_at: Date, deleted_at: Date | null, id?: string) {

        if(!id) id = uuid()
        this.id = id
        this.description = description
        this.post_string = post_string
        this.created_at = created_at
        this.updated_at = updated_at
        this.deleted_at = deleted_at
    
    }
}
