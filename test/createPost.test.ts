import Post from "../source/domain/Entity/Post";
import RepositoryFactoryInterface from "../source/domain/Interfaces/RepositoryFactoryInterface";
import PostRepositoryDatabase from "../source/infra/repository/database/PostRepositoryDatabase";
import MemoryRepositoryFactory from "../source/infra/repository/MemoryRepositoryFactory";
import CreatePost from "../source/useCases/createPost/CreatePost";

describe("CreatePost UseCase", () => {
  
  let createPost: CreatePost
  let repositoryFactory: RepositoryFactoryInterface

  beforeEach(() => {
    repositoryFactory = new MemoryRepositoryFactory()
    createPost = new CreatePost(repositoryFactory)
  })

  test("deve criar um post com sucesso", async () => {

    const input = {
      description: "description test",
      post_string: "post_string test"
    }

    const newPost = await createPost.execute(input)

    expect(newPost.post).toBeDefined()

  });

  test("não deve criar um post caso não seja fornecido uma post_string", async () => {
    
    const input = {
      description: "description test",
      post_string: ""
    }
    
    expect(async () => {

      const postOutput = await createPost.execute(input)

    }).rejects.toThrow("String de imagem não fornecida")
  
  });

  test("deve chamar o método create do repositório", async () => {
    
    const input = {
        description: "description test",
        post_string: "post_string test"
    };

    const output = await createPost.execute(input);

    expect(output).toBeDefined()
    expect(output.post.description).toEqual("post_string test")
    expect(output.post.post_string).toEqual("post_string test")

  });
});
