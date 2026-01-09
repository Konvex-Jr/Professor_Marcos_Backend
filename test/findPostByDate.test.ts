import FindPostByDate from "../source/useCases/findPostByDate/FindPostByDate";
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
    
    // Criar um Post
    // Procurar pela Data

    const inputPost = { description: "decription test", post_string: "post_string test"}
    
    const post = await createPost.execute(inputPost)

    const date = new Date("11/11/2025")


    
  });

  test("deve lançar erro se data não for fornecida", async () => {
    await expect(findPostByDate.execute({} as any)).rejects.toThrow("Data não fornecida");
  });

  // test("deve lançar erro se post não encontrado", async () => {
  //   mockFindByDate.mockResolvedValue(null);
  //   await expect(findPostByDate.execute({ created_at: new Date() } as any)).rejects.toThrow("Post não encontrado");
  // });
});


