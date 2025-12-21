import RepositoryFactory from "../../../domain/Interfaces/RepositoryFactoryInterface";
import PostController from "../../controller/PostController";
import Http from "../Http";
import ModelRoutes from "./ModelRoutes";

export default class PostRoutes implements ModelRoutes {

    protected postController: PostController;

    constructor(readonly http: Http, repositoryFactory: RepositoryFactory) {
        this.postController = new PostController(repositoryFactory);
    }

    init(): void {
        
        this.http.route("post", "/api/posts", false, async (params: any, body: any) => {
            return await this.postController.create(body);
        });

        this.http.route("get", "/api/posts", false, async () => {
            return this.postController.getAll();
        })

        this.http.route("post", "/api/users", false, async (params: any, body: any) => {
            return this.postController.findById(body);
        })
    }
}