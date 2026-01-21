import RepositoryFactoryInterface from "../source/domain/Interfaces/RepositoryFactoryInterface";
import MemoryRepositoryFactory from "../source/infra/repository/MemoryRepositoryFactory";
import CreatePost from "../source/useCases/createPost/CreatePost";
import CreatePostInput from "../source/useCases/createPost/CreatePostInput";
import FindPostById from "../source/useCases/findPostById/FindPostById";
import FindPostByIdInput from "../source/useCases/findPostById/FindPostByIdInput";

describe("FindPostById UseCase", () => {
  
  let findPostById: FindPostById;
  let repositoryFactory: RepositoryFactoryInterface;
  let createPost: CreatePost

  beforeEach(() => {
    repositoryFactory = new MemoryRepositoryFactory();
    findPostById = new FindPostById(repositoryFactory);
    createPost = new CreatePost(repositoryFactory);
  }); 

  test("deve retornar um post quando o ID existe", async () => {
    const post_input = { description: "description test", post_string: "post_string test", created_at: new Date(), updated_at: new Date() };
    
    const new_post = await createPost.execute(post_input)
    expect(new_post.post).toBeDefined();
    
    const input: FindPostByIdInput = { id: new_post.post.id };
    const result = await findPostById.execute(input);

    expect(result.post).toBeDefined()

  });

  test("deve lançar erro se ID não for fornecido", async () => {
    await expect(findPostById.execute({} as any)).rejects.toThrow("ID do post não fornecido");
  });

  test("deve lançar erro se post não encontrado", async () => {

    const post_input = { description: "description test", post_string: "post_string test", created_at: new Date(), updated_at: new Date() };
    const new_post = await createPost.execute(post_input);
    const input: FindPostByIdInput = { id: "1" };

    await expect(findPostById.execute(input)).rejects.toThrow("Post não encontrado");
  });
});
