import Post from "../../../domain/Entity/Post";
import PostRepositoryInterface from "../../../domain/Interfaces/PostRepositoryInterface";
import Connection from "../../database/Connection";

export default class PostRepositoryDatabase implements PostRepositoryInterface {

    constructor(protected connection: Connection) {}

    async create(post: Post): Promise<Post | null> {
        const exists = await this.findById(post.id);

        console.log(post.id);
        console.log(post.description);
        console.log(post.post_string);
        console.log(post.created_at);
        console.log(post.updated_at);
        console.log(post.deleted_at);

        if (exists) throw new Error("Post já existe");
        
        await this.connection.execute("INSERT INTO posts (id, description, post_string, created_at, updated_at, deleted_at) values ($1, $2, $3, $4, $5, $6);", [ post.id, post.description, post.post_string, post.created_at, post.updated_at, post.deleted_at ]);
        return await this.findById(post.id);
    }

    async findById(id: string): Promise<Post | null> {
        const result = await this.connection.execute("SELECT id, description, post_string, created_at, updated_at FROM posts WHERE id = $1;", [ id ]);
        if (result.length === 0) return null;
        return new Post(result[0].id, result[0].description, result[0].post_string, result[0].created_at, result[0].updated_at);
    }

    async findByDate(created_at: Date): Promise<Post | null> {
        const result = await this.connection.execute("SELECT id, description, post_string, created_at, updated_at FROM posts WHERE created_at = $1;", [ created_at ]);
        if (result.length === 0) return null;
        return new Post(result[0].id, result[0].description, result[0].post_string, result[0].created_at. result[0].updated_at);
    }

    async getAll(): Promise<Post[]> {
        const result = await this.connection.execute("SELECT id, description, post_string, created_at, updated_at FROM posts;");
        return result.map((post: Post) => new Post(post.description, post.post_string, post.created_at, post.updated_at));
    }

    async update(post: Post): Promise<Post> {
        await this.connection.execute("UPDATE posts SET description = $1, post_string = $2, updated_at = $3 where id = $4", [post.description, post.post_string, post.updated_at, post.id]);
        return post;
    }
}