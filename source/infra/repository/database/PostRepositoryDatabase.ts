import Post from "../../../domain/Entity/Post";
import PostRepositoryInterface from "../../../domain/Interfaces/PostRepositoryInterface";
import Connection from "../../database/Connection";

export default class PostRepositoryDatabase implements PostRepositoryInterface {

    constructor(protected connection: Connection) {}

    async create(post: Post): Promise<Post | null> {
        await this.connection.execute("INSERT INTO posts (id, description, post_string, created_at, updated_at, deleted_at) values ($1, $2, $3, $4, $5, $6);", [ post.id, post.description, post.post_string, post.created_at, post.updated_at, post.deleted_at ]);
        return await this.findById(post.id);
    }

    async findById(id: string): Promise<Post | null> {
        const result = await this.connection.execute("SELECT id, description, post_string, created_at, updated_at FROM posts WHERE id = $1;", [ id ]);
        return new Post(result[0].description, result[0].post_string, result[0].created_at, result[0].updated_at, null);
    }

    async findByDate(created_at: Date): Promise<Post | null> {
        const result = await this.connection.execute("SELECT id, description, post_string, created_at, updated_at FROM posts WHERE created_at = $1;", [ created_at ]);
        return (result ? new Post(result[0].description, result[0].post_string, result[0].created_at, result[0].updated_at, null) : null);
    }

    async getAll(): Promise<Post[]> {
        const result = await this.connection.execute("SELECT id, description, post_string, created_at, updated_at, deleted_at FROM posts;");
        return result.map((post: any) => new Post(result[0].description, result[0].post_string, result[0].created_at, result[0].updated_at, result[0].deleted_at))
    }

    async update(post: Post): Promise<Post> {
        await this.connection.execute("UPDATE posts SET description = $1, post_string = $2, updated_at = $3 WHERE id = $4;", [post.description, post.post_string, post.updated_at, post.id]);
        return post;
    }

    async delete(id: string): Promise<string> {
        await this.connection.execute("UPDATE posts SET deleted_at = $1 WHERE id = $2;", [ new Date(), id ])
        return "Post deletado com sucesso"
    }
}