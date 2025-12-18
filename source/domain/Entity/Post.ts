import { v4 as uuid } from "uuid";

// ID do Post
// Tipo de Post
// Post (arquivo de imagem)
// Descrição
// Data Criação
// Data Edição

export default class Post {
    
    readonly id: string
    readonly description: string
    readonly post_string: string
    readonly created_at: Date
    readonly updated_at: Date

    constructor(description: string, post_string: string, id?: string) {
        
        if (!id) id = uuid()
        this.id = id
        this.description = description
        this.post_string = post_string
        this.created_at = new Date()
        this.updated_at = new Date()
    
    }
}
