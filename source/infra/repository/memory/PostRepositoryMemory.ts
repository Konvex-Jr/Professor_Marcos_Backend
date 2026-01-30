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

    async findByDate(search: Date): Promise<Post[] | null> {
        
        const posts = this.posts.filter((post) => {

            const date_search = `${search.getFullYear()}-${(search.getMonth() + 1).toString().padStart(2, '0')}-${search.getDate()}`
            const created_str = `${post.created_at.getFullYear()}-${(post.created_at.getMonth() + 1).toString().padStart(2, '0')}-${post.created_at.getDate()}`
            
            return (date_search === created_str && !post.deleted_at)
        })
        
        return posts ?? null;
    }

    async getAll(): Promise<Post[]> {
        return this.posts;
    }

    async update(post: Post): Promise<Post | null> {
        const index = this.posts.findIndex(existingPost => existingPost.id === post.id);
        this.posts[index] = post;
        return post;
    }

    async delete(id: string): Promise<string | null> {
        const index = this.posts.findIndex(post => post.id === id);
        const post = this.posts[index]
        this.posts[index] = new Post(post.description, post.post_string, post.created_at, post.updated_at, new Date())
        return post ? "Post deletado com sucesso" : null
    }
}