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

  test("deve atualizar um post existente", async () => {
    
    const postInput: CreatePostInput = { 
      description: "description test", 
      post_string: "post_string test"
    }

    const newPost = await createPost.execute(postInput)

    const input = {
      post: {
        id: newPost.post.id,
        description: "new description",
        post_string: "new post_string",
        created_at: newPost.post.created_at,
        updated_at: newPost.post.updated_at,
        deleted_at: newPost.post.deleted_at
      }
    }
    
    const result = await updatePost.execute(input);

    expect(result.post).toBeDefined();
  });

  test("deve lançar erro se input não for fornecido", async () => {
    expect(async () => {
      await updatePost.execute(undefined as any)
    }).rejects.toThrow("Post não fornecido");
  });

  test("deve lançar erro se post não encontrado", async () => {
    
    const input = {
      post: {
        id: "1",
        description: "description test",
        post_string: "post_string test",
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      }
    }

    expect(async () => {
      await updatePost.execute(input)
    }).rejects.toThrow("Post não encontrado");
      
  });
});
