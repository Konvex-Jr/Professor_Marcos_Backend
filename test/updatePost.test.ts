import RepositoryFactoryInterface from "../source/domain/Interfaces/RepositoryFactoryInterface";
import MemoryRepositoryFactory from "../source/infra/repository/MemoryRepositoryFactory";
import CreatePost from "../source/useCases/createPost/CreatePost";
import CreatePostInput from "../source/useCases/createPost/CreatePostInput";
import UpdatePost from "../source/useCases/updatePost/UpdatePost";
import UpdatePostInput from "../source/useCases/updatePost/UpdatePostInput";

describe("UpdatePost UseCase", () => {
  let repositoryFactory: RepositoryFactoryInterface;
  let updatePost: UpdatePost;
  let createPost: CreatePost

  beforeEach(() => {
    repositoryFactory = new MemoryRepositoryFactory()
    updatePost = new UpdatePost(repositoryFactory);
    createPost = new CreatePost(repositoryFactory)
  });

  test("deve lançar erro se ID não for fornecido", async () => {
    expect(async () => {

      const input = {
        description: "desc",
        post_string: "post_str"
      }

      await updatePost.execute({ id: "" }, input)
    }).rejects.toThrow("ID do post não fornecido");
  });

  test("deve lançar erro se post não encontrado", async () => {
    
    const input = {
        description: "description test",
        post_string: "post_string test",
    }

    expect(async () => {
      await updatePost.execute({ id: "546545cb-7948-45eb-9d34-436749824d46" }, input)
    }).rejects.toThrow("Post não encontrado");
      
  });

  test("deve lançar erro se ID não estiver no formato correto", async () => {
    
    const input = {
        description: "description test",
        post_string: "post_string test",
    }

    expect(async () => {
      await updatePost.execute({ id: "546545cb-45eb-9d34" }, input)
    }).rejects.toThrow("Formato de ID incorreto");
      
  });

  test("deve atualizar um post existente", async () => {
    
    const postInput: CreatePostInput = { 
      description: "description test", 
      post_string: "post_string test"
    }

    const newPost = await createPost.execute(postInput)

    const input = {
        description: "new description test",
        post_string: "new post_string test",
    }
    
    const result = await updatePost.execute({ id: newPost.post.id }, input);

    expect(result.post).toBeDefined();
  });
});
