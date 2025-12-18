import RepositoryFactoryInterface from "../../domain/Interfaces/RepositoryFactoryInterface";
import CreatePost from "../../useCases/createPost/CreatePost";
import CreatePostInput from "../../useCases/createPost/CreatePostInput";
import CreatePostOutput from "../../useCases/createPost/CreatePostOutput";
import FindPostById from "../../useCases/findPostById/FindPostById";
import FindPostByIdInput from "../../useCases/findPostById/FindPostByIdInput";
import FindPostByIdOutput from "../../useCases/findPostById/FindPostByIdOutput";
import FindPostByDate from "../../useCases/findPostByDate/FindPostByDate";
import FindPostByDateInput from "../../useCases/findPostByDate/FindPostByDateInput";
import FindPostByDateOutput from "../../useCases/findPostByDate/FindPostByDateOutput";
import GetAllPosts from "../../useCases/getAllPosts/GetAllPosts";
import GetAllPostsOutput from "../../useCases/getAllPosts/GetAllPostsOutput";

export default class PostController {

    constructor(protected repositoryFactory: RepositoryFactoryInterface) {
    }

    async createPost(input: CreatePostInput): Promise<CreatePostOutput> {
        const createPost = new CreatePost(this.repositoryFactory);
        return await createPost.execute(input);
    }

    async getAll(): Promise<GetAllPostsOutput> {
        const getAllPosts = new GetAllPosts(this.repositoryFactory);
        return await getAllPosts.execute();
    }

    async findById(input: FindPostByIdInput): Promise<FindPostByIdOutput> {
        const findById = new FindPostById(this.repositoryFactory);
        return await findById.execute(input);
    }

    async findByDate(input: FindPostByDateInput): Promise<FindPostByDateOutput> {
        const findByDate = new FindPostByDate(this.repositoryFactory);
        return await findByDate.execute(input);
    }
}