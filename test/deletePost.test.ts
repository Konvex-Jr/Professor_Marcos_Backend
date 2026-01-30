import RepositoryFactoryInterface from "../source/domain/Interfaces/RepositoryFactoryInterface";
import MemoryRepositoryFactory from "../source/infra/repository/MemoryRepositoryFactory";
import CreatePost from "../source/useCases/createPost/CreatePost";
import CreatePostInput from "../source/useCases/createPost/CreatePostInput";
import DeletePost from "../source/useCases/deletePost/DeletePost";
import DeletePostInput from "../source/useCases/deletePost/DeletePostInput";

describe("UpdatePost UseCase", () => {
  let repositoryFactory: RepositoryFactoryInterface;
  let deletePost: DeletePost;

  beforeEach(() => {
    repositoryFactory = new MemoryRepositoryFactory()
    deletePost = new DeletePost(repositoryFactory);
  });

  test("deve lançar erro se ID não estiver no formato correto", async () => {
    
        const input = {
            id: '1'
        }

        expect(async () => {
            const response = await deletePost.execute(input)
        }).rejects.toThrow("Formato de ID incorreto")

  });

  test("lança erro caso não encontre um post", async () => {
    
        const input = {
            id: '8295fd9c-616e-4f6d-b814-360396cf7342'
        }

        expect(async () => {
            const response = await deletePost.execute(input)
        }).rejects.toThrow("Post não encontrado")

  });

  test("retorna 'Post deletado com sucesso' com um ID válido ", async () => {
    
    const createPost = new CreatePost(repositoryFactory)

    const inputPost = {
      description: "description test",
      post_string: "post_string test"
    }

    const newPost = await createPost.execute(inputPost)

    const inputID = {
      id: newPost.post.id
    }
    
    const response = await deletePost.execute(inputID)      

    expect(response.message).toBeDefined()

  });
});
