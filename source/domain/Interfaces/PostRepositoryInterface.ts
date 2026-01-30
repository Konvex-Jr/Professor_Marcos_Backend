import UpdatePost from "../../useCases/updatePost/UpdatePost";
import UpdatePostInput from "../../useCases/updatePost/UpdatePostInput";
import Post from "../Entity/Post";

export default interface PostRepositoryInterface {
    create(post: Post): Promise<Post | null>;
    getAll(): Promise<Post[]>;
    findById(id: string): Promise<Post | null>;
    findByDate(search: Date): Promise<Post[] | null>;
    update(params: any, input: UpdatePostInput): Promise<Post>;
    delete(id: string): Promise<string | null>;
}