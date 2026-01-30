import Post from "../../domain/Entity/Post";
import RepositoryFactoryInterface from "../../domain/Interfaces/RepositoryFactoryInterface";
import PostRepositoryInterface from "../../domain/Interfaces/PostRepositoryInterface";
import UpdatePostInput from "./UpdatePostInput";
import UpdatePostOutput from "./UpdatePostOutput";

export default class UpdatePost {

    readonly postRepository: PostRepositoryInterface;

    constructor(repositoryFactory: RepositoryFactoryInterface) {
        this.postRepository = repositoryFactory.createPostRepository();
    }

    async execute(params: any, input: UpdatePostInput): Promise<UpdatePostOutput> {
                
        const { id } = params

        if(!id) throw new Error("ID do post não fornecido")
        
        const REGEX = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        
        if(!REGEX.test(id)) throw new Error("Formato de ID incorreto")
            
        const response = await this.postRepository.findById(id)
            
        if(!response) throw new Error("Post não encontrado")
                
        const post = await this.postRepository.update(params, input)

        return {
            post
        }
    }
}