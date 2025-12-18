import RepositoryFactoryInterface from "../../domain/Interfaces/RepositoryFactoryInterface";
import UserRepositoryInterface from "../../domain/Interfaces/UserRepositoryInterface";
import GetAllUsersOutput from "./GetAllUsersOutput";

export default class GetAllUsers {

    readonly userRepository: UserRepositoryInterface;

    constructor(repositoryFactory: RepositoryFactoryInterface) {
        this.userRepository = repositoryFactory.createUserRepository();
    }

    async execute(): Promise<GetAllUsersOutput> {
        
        const response = await this.userRepository.getAll();
        if(!response) throw new Error('Nenhum usuário cadastrado ou erro na requisição');
        
        return {
            data: response
        }
    
    }
}