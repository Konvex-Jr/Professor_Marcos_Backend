import Post from "../../domain/Entity/Post";
import RepositoryFactoryInterface from "../../domain/Interfaces/RepositoryFactoryInterface";
import PostRepositoryInterface from "../../domain/Interfaces/PostRepositoryInterface";
import FindPostByDateInput from "./FindPostByDateInput";
import FindPostByDateOutput from "./FindPostByDateOutput";

export default class FindPostByDate {

    readonly postRepository: PostRepositoryInterface;

    constructor(repositoryFactory: RepositoryFactoryInterface) {
        this.postRepository = repositoryFactory.createPostRepository();
    }

    async execute(input: FindPostByDateInput): Promise<FindPostByDateOutput> {
        
        if(!input.created_at) throw new Error("Data não fornecida")
        
        const response = await this.postRepository.findByDate(input.created_at);
        
        if (!response) throw new Error("Post não encontrado")
    
        const post = new Post(response.description, response.post_string, response.created_at, response.updated_at, response.deleted_at, response.id)

        return {
            post
        }
    }
}