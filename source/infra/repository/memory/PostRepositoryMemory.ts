import Post from "../../../domain/Entity/Post";
import PostRepositoryInterface from "../../../domain/Interfaces/PostRepositoryInterface";

export default class PostRepositoryMemory implements PostRepositoryInterface {

    private posts: Post[];

    constructor() {
        this.posts = [];
    }
    
    async create(post: Post): Promise<Post> {
        this.posts.push(post);
        return post;
    }

    async findById(id: string): Promise<Post | null> {
        const post = this.posts.find(post => post.id === id);
        return post ?? null;
    }

    async findByDate(created_at: Date): Promise<Post | null> {
        const post = this.posts.find(post => post.created_at === created_at);
        return post ?? null;
    }

    async getAll(): Promise<Post[]> {
        return this.posts;
    }

    async update(post: Post): Promise<Post | null> {
        const index = this.posts.findIndex(existingPost => existingPost.id === post.id);
        this.posts[index] = post;
        return post;
    }

    async delete(id: string): Promise<string> {
        const index = this.posts.findIndex(existingPost => existingPost.id === id);
        const deletedPost = this.posts[index];
        this.posts[index] = new Post(deletedPost.description, deletedPost.post_string, deletedPost.created_at, deletedPost.updated_at, new Date());
        return "Post deletado com sucesso"
    }
}