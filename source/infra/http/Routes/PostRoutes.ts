import RepositoryFactory from "../../../domain/Interfaces/RepositoryFactoryInterface";
import CreatePostInput from "../../../useCases/createPost/CreatePostInput";
import FindPostByDateInput from "../../../useCases/findPostByDate/FindPostByDateInput";
import PostController from "../../controller/PostController";
import Http from "../Http";
import ModelRoutes from "./ModelRoutes";

export default class PostRoutes implements ModelRoutes {

    protected postController: PostController;

    constructor(readonly http: Http, repositoryFactory: RepositoryFactory) {
        this.postController = new PostController(repositoryFactory);
    }

    init(): void {

        // CREATE POST
        this.http.route("post", "/api/posts", true, async (body: CreatePostInput) => {
            return await this.postController.create(body);
        });

        // GET POSTS
        this.http.route("get", "/api/posts", false, async (params: any) => {
            
            if(params.search){

                const search = params.search
                
                return this.postController.findByDate({ search })
            
            } else {
                return this.postController.getAll();
            }
        })

        // GET POSTS BY ID
        this.http.route("get", "/api/posts/:id", true, async (params: any) => {
            return this.postController.findById(params)
        })

        // UPDATE POST
        this.http.route("put", "/api/posts/:id", true, async (params: any, body: any) => {
            return this.postController.update(body)
        })

        // DELETE POST
        this.http.route("delete", "/api/posts/:id", true, async (params: any, body: any) => {
            return this.postController.delete(params)
        })

        
    }
}