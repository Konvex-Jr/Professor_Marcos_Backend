import DeletePostInput from "./DeletePostInput";
import DeletePostOutput from "./DeletePostOutput";
import RepositoryFactoryInterface from "../../domain/Interfaces/RepositoryFactoryInterface";
import PostRepositoryInterface from "../../domain/Interfaces/PostRepositoryInterface";

export default class DeletePost {

    readonly postRepository: PostRepositoryInterface;

    constructor(repositoryFactory: RepositoryFactoryInterface) {
        this.postRepository = repositoryFactory.createPostRepository();
    }

    async execute(input: DeletePostInput): Promise<DeletePostOutput> {
        
        const id = input.id

        const REGEX = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

        if(!REGEX.test(input.id)) throw new Error("Formato de ID incorreto")

        if(!(await this.postRepository.findById(id))) throw new Error("Post não encontrado")

        const response = await this.postRepository.delete(id)

        return {
            message: "Post deletado com sucesso"
        }
    }

}