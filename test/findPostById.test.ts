import FindPostById from "../source/useCases/findPostById/FindPostById";
import FindPostByIdInput from "../source/useCases/findPostById/FindPostByIdInput";

describe("FindPostById UseCase", () => {
  const mockRepositoryFactory = {
    createPostRepository: () => ({
      findById: jest.fn()
    })
  };

  it("deve retornar um post quando o ID existe", async () => {
    const postMock = { description: "desc", post_string: "str", created_at: new Date(), updated_at: new Date() };
    const useCase = new FindPostById(mockRepositoryFactory as any);
    (useCase.postRepository.findById as jest.Mock).mockResolvedValue(postMock);
    const input: FindPostByIdInput = { post_id: "1" };
    const result = await useCase.execute(input);
    expect(result.post).toBeDefined();
    expect(result.post.description).toBe(postMock.description);
  });

  it("deve lançar erro se ID não for fornecido", async () => {
    const useCase = new FindPostById(mockRepositoryFactory as any);
    await expect(useCase.execute({} as any)).rejects.toThrow("ID do post não fornecido");
  });

  it("deve lançar erro se post não encontrado", async () => {
    const useCase = new FindPostById(mockRepositoryFactory as any);
    (useCase.postRepository.findById as jest.Mock).mockResolvedValue(null);
    await expect(useCase.execute({ post_id: "1" } as any)).rejects.toThrow("Post não encontrado");
  });
});
