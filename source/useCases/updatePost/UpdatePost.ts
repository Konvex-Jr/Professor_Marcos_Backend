import Post from "../../domain/Entity/Post";
import RepositoryFactoryInterface from "../../domain/Interfaces/RepositoryFactoryInterface";
import PostRepositoryInterface from "../../domain/Interfaces/PostRepositoryInterface";
import UpdatePostInput from "./UpdatePostInput";
import UpdatePostOutput from "./UpdatePostOutput";

import FindPostById from "../findPostById/FindPostById";
import FindPostByDateInput from "../findPostByDate/FindPostByDateInput";
import FindPostByDateOutput from "../findPostByDate/FindPostByDateOutput";

export default class UpdatePost {

    readonly postRepository: PostRepositoryInterface;

    constructor(repositoryFactory: RepositoryFactoryInterface) {
        this.postRepository = repositoryFactory.createPostRepository();
    }

    async execute(input: UpdatePostInput): Promise<UpdatePostOutput> {
    
        if(!input) {
            throw new Error("Post não fornecido")
        }
        
        // Encontra o POST com base no ID
        const response = await this.postRepository.findById(input.post.id)

        if(!response) {
            throw new Error("Post não encontrado")
        }

        const post = new Post(response.description, response.post_string, response.created_at, new Date())

        return {
            post
        }
    }
}