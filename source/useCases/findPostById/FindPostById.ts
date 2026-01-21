import Post from "../../domain/Entity/Post";
import RepositoryFactoryInterface from "../../domain/Interfaces/RepositoryFactoryInterface";
import PostRepositoryInterface from "../../domain/Interfaces/PostRepositoryInterface";
import FindPostByIdInput from "./FindPostByIdInput";
import FindPostByIdOutput from "./FindPostByIdOutput";

export default class FindPostById {

    readonly postRepository: PostRepositoryInterface;

    constructor(repositoryFactory: RepositoryFactoryInterface) {
        this.postRepository = repositoryFactory.createPostRepository();
    }

    async execute(input: FindPostByIdInput): Promise<FindPostByIdOutput> {

        // Criar validação de formato UUID para o Database
        
        if(!input.id) throw new Error("ID do post não fornecido")

        const response = await this.postRepository.findById(input.id);
        
        if (!response) throw new Error("Post não encontrado")
        
        const post = new Post(response.description, response.post_string, response.created_at, response.updated_at, response.deleted_at, response.id)

        return { 
            post
        }

    }
}