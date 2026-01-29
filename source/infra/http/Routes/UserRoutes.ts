import RepositoryFactory from "../../../domain/Interfaces/RepositoryFactoryInterface";
import UserController from "../../controller/UserController";
import Http from "../Http";
import ModelRoutes from "./ModelRoutes";

export default class UserRoutes implements ModelRoutes {

    protected userController: UserController;

    constructor(readonly http: Http, repositoryFactory: RepositoryFactory) {
        this.userController = new UserController(repositoryFactory);
    }

    init(): void {

        // CREATE USER
        this.http.route("post", "/api/auth/register", false, async (params: any, body: any) => {
			return await this.userController.createUser(body);
		});

        // LOGIN LOGIN
        this.http.route("post", "/api/auth/login", false, async (params: any, body: any) => {
            return this.userController.login(body);
        });
    
        // GET USERS
        this.http.route("get", "/api/users", true, async () => {
            return this.userController.getAll();
        })

        // GET USER BY ID
        this.http.route("post", "/api/users/:id", true, async (params: any, body: any) => {
            return this.userController.findById(body);
        })
    }
}