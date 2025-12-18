import UpdatePost from "../source/useCases/updatePost/UpdatePost";
import UpdatePostInput from "../source/useCases/updatePost/UpdatePostInput";

describe("UpdatePost UseCase", () => {
  const mockRepositoryFactory = {
    createPostRepository: () => ({
      findById: jest.fn()
    })
  };

  it("deve atualizar um post existente", async () => {
    const postMock = { id: "1", description: "desc", post_string: "str", created_at: new Date(), updated_at: new Date() };
    const useCase = new UpdatePost(mockRepositoryFactory as any);
    (useCase.postRepository.findById as jest.Mock).mockResolvedValue(postMock);
    const input: UpdatePostInput = { post: { id: "1", description: "nova desc", post_string: "novo str" } } as any;
    const result = await useCase.execute(input);
    expect(result.post).toBeDefined();
    expect(result.post.description).toBe(input.post.description);
  });

  it("deve lançar erro se input não for fornecido", async () => {
    const useCase = new UpdatePost(mockRepositoryFactory as any);
    await expect(useCase.execute(undefined as any)).rejects.toThrow("Post não fornecido");
  });

  it("deve lançar erro se post não encontrado", async () => {
    const useCase = new UpdatePost(mockRepositoryFactory as any);
    (useCase.postRepository.findById as jest.Mock).mockResolvedValue(null);
    const input: UpdatePostInput = { post: { id: "1", description: "desc", post_string: "str" } } as any;
    await expect(useCase.execute(input)).rejects.toThrow("Post não encontrado");
  });
});
