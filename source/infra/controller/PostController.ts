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
import PostRepositoryInterface from "../../domain/Interfaces/PostRepositoryInterface";
import UpdatePostInput from "../../useCases/updatePost/UpdatePostInput";
import UpdatePostOutput from "../../useCases/updatePost/UpdatePostOutput";
import UpdatePost from "../../useCases/updatePost/UpdatePost";
import DeletePostInput from "../../useCases/deletePost/DeletePostInput";
import DeletePostOutput from "../../useCases/deletePost/DeletePostOutput";
import DeletePost from "../../useCases/deletePost/DeletePost";

export default class PostController {

    constructor(protected repositoryFactory: RepositoryFactoryInterface) {
    }

    async create(input: CreatePostInput): Promise<CreatePostOutput> {
        const createPost = new CreatePost(this.repositoryFactory)
        return await createPost.execute(input)
    }

    async getAll(): Promise<GetAllPostsOutput> {
        const getAllPosts = new GetAllPosts(this.repositoryFactory)
        return await getAllPosts.execute()
    }

    async findById(input: FindPostByIdInput): Promise<FindPostByIdOutput> {
        const findById = new FindPostById(this.repositoryFactory)
        return await findById.execute(input)
    }

    async findByDate(input: FindPostByDateInput): Promise<FindPostByDateOutput> {
        const findByDate = new FindPostByDate(this.repositoryFactory)
        return await findByDate.execute(input)
    }

    async update(input: UpdatePostInput): Promise<UpdatePostOutput> {
        const updatePost = new UpdatePost(this.repositoryFactory)
        return await updatePost.execute(input)
    }

    async delete(input: DeletePostInput): Promise<DeletePostOutput> {
        const deletePost = new DeletePost(this.repositoryFactory)
        return await deletePost.execute(input)
    }

}