import Post from "../../../domain/Entity/Post";
import PostRepositoryInterface from "../../../domain/Interfaces/PostRepositoryInterface";

export default class PostRepositoryMemory implements PostRepositoryInterface {

    private posts: Post[];

    constructor() {
        this.posts = [];
    }
    
    async create(post: Post): Promise<Post> {
        // const exists = this.posts.find(existentPost => existentPost.id === post.id);
        // if (exists) throw new Error("Post já existe");
        this.posts.push(post);
        return post;
    }

    async findById(id: string): Promise<Post | null> {
        const post = this.posts.find(post => post.id === id);
        // if (!post) throw new Error("Post não encontrado");
        return post ?? null;
    }
    
    async findByDate(created_at: Date): Promise<Post> {
        const post = this.posts.find(post => post.created_at === created_at);
        if (!post) throw new Error("Não há posts nesta data");
        return post;
    }

    async getAll(): Promise<Post[]> {
        return this.posts;
    }

    async update(post: Post): Promise<Post> {
        const index = this.posts.findIndex(existingPost => existingPost.id === post.id);
        if (index === -1) throw new Error("Post não encontrado");
        this.posts[index] = post;
        return post;
    }

    async delete(id: string): Promise<string> {
        const index = this.posts.findIndex(existingPost => existingPost.id === id);
        if(index === -1) throw new Error("Post não encontrado");
        const deletedPost = this.posts[index];
        this.posts[index] = new Post(deletedPost.description, deletedPost.post_string, deletedPost.created_at, deletedPost.updated_at, new Date());
        return "Post deletado com sucesso"
    }
}