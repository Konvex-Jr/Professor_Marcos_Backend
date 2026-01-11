import FindPostByDate from "../source/useCases/findPostByDate/FindPostByDate";
import FindPostByDateInput from "../source/useCases/findPostByDate/FindPostByDateInput";
import RepositoryFactoryInterface from "../source/domain/Interfaces/RepositoryFactoryInterface";
import CreatePost from "../source/useCases/createPost/CreatePost";
import MemoryRepositoryFactory from "../source/infra/repository/MemoryRepositoryFactory";

describe("FindPostByDate UseCase", () => {

  let findPostByDate: FindPostByDate;
  let repositoryFactory: RepositoryFactoryInterface
  let createPost: CreatePost

  beforeEach(() => {
    repositoryFactory = new MemoryRepositoryFactory()
    findPostByDate = new FindPostByDate(repositoryFactory)
    createPost = new CreatePost(repositoryFactory)
  });

  test("deve retornar um post quando a data existe", async () => {

    const inputPost = { description: "decription test", post_string: "post_string test"}
    
    const post = await createPost.execute(inputPost)

    const date = {
      created_at: new Date()
    }
      
    expect(() => {
      const findedPost = findPostByDate.execute(date)
    }).toBeDefined()
    
  });

  test("deve lançar erro se data não for fornecida", async () => {
    await expect(findPostByDate.execute({} as any)).rejects.toThrow("Data não fornecida");
  });

  test("deve lançar erro se post não encontrado", async () => {
    
    const post_input = { description: "description test", post_string: "post_string test", created_at: new Date(), updated_at: new Date() };
    const new_post = await createPost.execute(post_input);
    const input: FindPostByDateInput = { created_at: new Date(2024, 3, 15) };

    await expect(findPostByDate.execute(input)).rejects.toThrow("Não há posts nesta data"); 
  
  });
});


