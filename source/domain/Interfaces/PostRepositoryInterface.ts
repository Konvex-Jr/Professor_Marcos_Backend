import Post from "../Entity/Post";

export default interface PostRepositoryInterface {
    create(post: Post): Promise<Post | null>;
    getAll(): Promise<Post[]>;
    findById(id: string): Promise<Post | null>;
    findByDate(date: Date): Promise<Post | null>;
    update(post: Post): Promise<Post | null>;
    delete(id: string): Promise<string>;
}