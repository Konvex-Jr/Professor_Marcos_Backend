import RepositoryFactoryInterface from "../../domain/Interfaces/RepositoryFactoryInterface";
import PostRepositoryInterface from "../../domain/Interfaces/PostRepositoryInterface";
import GetAllPostsOutput from "./GetAllPostsOutput";

export default class GetAllPosts {

    readonly postRepository: PostRepositoryInterface;

    constructor(repositoryFactory: RepositoryFactoryInterface) {
        this.postRepository = repositoryFactory.createPostRepository();
    }

    async execute(): Promise<GetAllPostsOutput> {
        
        const response = await this.postRepository.getAll();
        if(!response) throw new Error('Nenhum post cadastrado ou erro na requisição');
    
        return { data: response };
    
    }
}