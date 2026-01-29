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
        const post = result[0]
        return post ? new Post(post.description, post.post_string, post.created_at, post.updated_at, null, post.id) : null;
    }

    async findByDate(search: Date): Promise<Post[] | null> {

        const startOfDay = `${search.getFullYear()}-${search.getMonth() + 1}-${search.getDate()} 00:00:00`;

        const endOfDay = `${search.getFullYear()}-${search.getMonth() + 1}-${search.getDate()} 23:59:59`;

        const result = await this.connection.execute("SELECT id, description, post_string, created_at, updated_at FROM posts WHERE created_at >= $1 AND created_at <= $2;", [ startOfDay, endOfDay ]);
        
        return result ? result.map((post: any) =>
            new Post(post.description, post.post_string, post.created_at, post.updated_at, null, post.id)
        ) : null
    }

    async getAll(): Promise<Post[]> {
        const result = await this.connection.execute("SELECT id, description, post_string, created_at, updated_at, deleted_at FROM posts WHERE deleted_at IS null;");
        return result.map((post: any) => new Post(post.description, post.post_string, post.created_at, post.updated_at, post.deleted_at, post.id))
    }

    async update(post: Post): Promise<Post> {
        await this.connection.execute("UPDATE posts SET description = $1, post_string = $2, updated_at = $3 WHERE id = $4;", [post.description, post.post_string, post.updated_at, post.id]);
        return new Post(post.description, post.post_string, post.created_at, post.updated_at, post.deleted_at, post.id);
    }

    async delete(id: string): Promise<string> {
        await this.connection.execute("UPDATE posts SET deleted_at = $1 WHERE id = $2;", [ new Date(), id ])
        return "Post deletado com sucesso"
    }
}