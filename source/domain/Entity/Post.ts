import { v4 as uuid } from "uuid";

// ID do Post
// Tipo de Post
// Post (arquivo de imagem)
// Descrição
// Data Criação
// Data Edição

export default class Post {
    
    readonly id: string
    readonly post_type: string
    readonly description: string
    readonly post: string
    readonly created_at: Date
    readonly updated_at: Date

    constructor(post_type: string, description: string, post: string, id?: string) {
        
        if (!id) id = uuid()
        this.id = id
        this.post_type = post_type
        this.description = description
        this.post = post
        this.created_at = new Date()
        this.updated_at = new Date()
    
    }
}
