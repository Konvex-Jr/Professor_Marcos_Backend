import FindPostByDate from "../source/useCases/findPostByDate/FindPostByDate";
import FindPostByDateInput from "../source/useCases/findPostByDate/FindPostByDateInput";
import RepositoryFactoryInterface from "../source/domain/Interfaces/RepositoryFactoryInterface";
import CreatePost from "../source/useCases/createPost/CreatePost";
import MemoryRepositoryFactory from "../source/infra/repository/MemoryRepositoryFactory";

describe("FindPostByDate UseCase", () => {

  let repositoryFactory: RepositoryFactoryInterface
  let findPostByDate: FindPostByDate;
  let createPost: CreatePost

  beforeEach(() => {
    repositoryFactory = new MemoryRepositoryFactory()
    findPostByDate = new FindPostByDate(repositoryFactory)
    createPost = new CreatePost(repositoryFactory)
  });

  test("deve lançar erro se data não for fornecida", async () => {
    await expect(findPostByDate.execute({} as any)).rejects.toThrow("Data não fornecida");
  });

  test("deve lançar erro se post não encontrado", async () => {
    
    const post_input = { description: "description test", post_string: "post_string test", created_at: new Date(), updated_at: new Date() };
    const new_post = await createPost.execute(post_input);
    const input: FindPostByDateInput = { search: "2024-11-20" };

    await expect(findPostByDate.execute(input)).rejects.toThrow("Post não encontrado"); 
  
  });

   test("deve retornar um post quando a data existe", async () => {

    const inputPost = { description: "decription test", post_string: "post_string test"}
    
    const newPost = await createPost.execute(inputPost)

    const date = {
      search: `${newPost.post.created_at.getFullYear()}-${(newPost.post.created_at.getMonth() + 1).toString().padStart(2, '0')}-${newPost.post.created_at.getDate()}`
    }

    const findedPost = await findPostByDate.execute(date)
      
    expect(findedPost).toBeDefined()
    
  });
});


