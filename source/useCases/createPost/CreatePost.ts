import CreatePostInput from "./CreatePostInput";
import CreatePostOutput from "./CreatePostOutput";
import RepositoryFactoryInterface from "../../domain/Interfaces/RepositoryFactoryInterface";
import PostRepositoryInterface from "../../domain/Interfaces/PostRepositoryInterface";
import Post from "../../domain/Entity/Post";

export default class CreatePost {

    readonly postRepository: PostRepositoryInterface;

    constructor(repositoryFactory: RepositoryFactoryInterface) {
        this.postRepository = repositoryFactory.createPostRepository();
    }

    async execute(input: CreatePostInput): Promise<CreatePostOutput> {
        
        const description = input.description
        const post_string = input.post_string

        if(post_string.length === 0){
            throw new Error("String de imagem não fornecida")
        }

        const post = new Post(description, post_string, new Date(), new Date(), null)

        await this.postRepository.create(post)

        return {
            post
        }
    }

}