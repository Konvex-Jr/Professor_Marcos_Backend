import FindPostByDate from "../source/useCases/findPostByDate/FindPostByDate";
import FindPostByDateInput from "../source/useCases/findPostByDate/FindPostByDateInput";

describe("FindPostByDate UseCase", () => {
  const mockRepositoryFactory = {
    createPostRepository: () => ({
      findByDate: jest.fn()
    })
  };

  it("deve retornar um post quando a data existe", async () => {
    const postMock = { description: "desc", post_string: "str", created_at: new Date(), updated_at: new Date() };
    const useCase = new FindPostByDate(mockRepositoryFactory as any);
    (useCase.postRepository.findByDate as jest.Mock).mockResolvedValue(postMock);
    const input: FindPostByDateInput = { created_at: postMock.created_at };
    const result = await useCase.execute(input);
    expect(result.post).toBeDefined();
    expect(result.post.description).toBe(postMock.description);
  });

  it("deve lançar erro se data não for fornecida", async () => {
    const useCase = new FindPostByDate(mockRepositoryFactory as any);
    await expect(useCase.execute({} as any)).rejects.toThrow("Data não fornecida");
  });

  it("deve lançar erro se post não encontrado", async () => {
    const useCase = new FindPostByDate(mockRepositoryFactory as any);
    (useCase.postRepository.findByDate as jest.Mock).mockResolvedValue(null);
    await expect(useCase.execute({ created_at: new Date() } as any)).rejects.toThrow("Post não encontrado");
  });
});


