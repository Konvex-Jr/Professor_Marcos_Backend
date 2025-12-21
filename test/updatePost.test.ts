import UpdatePost from "../source/useCases/updatePost/UpdatePost";
import UpdatePostInput from "../source/useCases/updatePost/UpdatePostInput";

describe("UpdatePost UseCase", () => {
  let updatePost: UpdatePost;
  let mockRepositoryFactory: any;
  let mockFindById: jest.Mock;

  beforeEach(() => {
    mockFindById = jest.fn();
    mockRepositoryFactory = {
      createPostRepository: () => ({
        findById: mockFindById
      })
    };
    updatePost = new UpdatePost(mockRepositoryFactory);
  });

  test("deve atualizar um post existente", async () => {
    const postMock = { id: "1", description: "desc", post_string: "str", created_at: new Date(), updated_at: new Date() };
    mockFindById.mockResolvedValue(postMock);
    const input: UpdatePostInput = { post: { id: "1", description: "nova desc", post_string: "novo str" } } as any;
    const result = await updatePost.execute(input);
    expect(result.post).toBeDefined();
    expect(result.post.description).toBe(input.post.description);
  });

  test("deve lançar erro se input não for fornecido", async () => {
    await expect(updatePost.execute(undefined as any)).rejects.toThrow("Post não fornecido");
  });

  test("deve lançar erro se post não encontrado", async () => {
    mockFindById.mockResolvedValue(null);
    const input: UpdatePostInput = { post: { id: "1", description: "desc", post_string: "str" } } as any;
    await expect(updatePost.execute(input)).rejects.toThrow("Post não encontrado");
  });
});
