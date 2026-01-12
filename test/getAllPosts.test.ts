import RepositoryFactoryInterface from "../source/domain/Interfaces/RepositoryFactoryInterface";
import MemoryRepositoryFactory from "../source/infra/repository/MemoryRepositoryFactory";
import CreatePost from "../source/useCases/createPost/CreatePost";
import GetAllPosts from "../source/useCases/getAllPosts/GetAllPosts";

describe("GetAllPosts UseCase", () => {
  let repositoryFactory: RepositoryFactoryInterface;
  let createPost: CreatePost;
  let getAllPosts: GetAllPosts;

  beforeEach(() => {
    repositoryFactory = new MemoryRepositoryFactory();
    createPost = new CreatePost(repositoryFactory)
    getAllPosts = new GetAllPosts(repositoryFactory);
  });

  test("deve retornar todos os posts", async () => {

    const input = {
      description: "description test",
      post_string: "post_string test"
    }

    const newPost = await createPost.execute(input)

    const result = await getAllPosts.execute();

    expect(result.data).toBeDefined();
  });

  test("deve lançar erro se não houver posts", async () => {
    expect(async () => {
      await getAllPosts.execute()
    }).rejects.toThrow("Não há posts");
  });
});
