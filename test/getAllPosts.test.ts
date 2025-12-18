import GetAllPosts from "../source/useCases/getAllPosts/GetAllPosts";

describe("GetAllPosts UseCase", () => {
  const mockRepositoryFactory = {
    createPostRepository: () => ({
      getAll: jest.fn()
    })
  };

  it("deve retornar todos os posts", async () => {
    const postsMock = [{ description: "desc", post_string: "str", created_at: new Date(), updated_at: new Date() }];
    const useCase = new GetAllPosts(mockRepositoryFactory as any);
    (useCase.postRepository.getAll as jest.Mock).mockResolvedValue(postsMock);
    const result = await useCase.execute();
    expect(result.data).toBeDefined();
    expect(result.data.length).toBe(1);
  });

  it("deve lançar erro se não houver posts", async () => {
    const useCase = new GetAllPosts(mockRepositoryFactory as any);
    (useCase.postRepository.getAll as jest.Mock).mockResolvedValue(null);
    await expect(useCase.execute()).rejects.toThrow("Nenhum post cadastrado ou erro na requisição");
  });
});
  const mockRepositoryFactory = {
    createPostRepository: () => ({
      getAll: jest.fn()
    })
  };

  it("deve retornar todos os posts", async () => {
    const postsMock = [{ description: "desc", post_string: "str", created_at: new Date(), updated_at: new Date() }];
    const useCase = new GetAllPosts(mockRepositoryFactory as any);
    (useCase.postRepository.getAll as jest.Mock).mockResolvedValue(postsMock);
    const result = await useCase.execute();
    expect(result.data).toBeDefined();
    expect(result.data.length).toBe(1);
  });

  it("deve lançar erro se não houver posts", async () => {
    const useCase = new GetAllPosts(mockRepositoryFactory as any);
    (useCase.postRepository.getAll as jest.Mock).mockResolvedValue(null);
    await expect(useCase.execute()).rejects.toThrow("Nenhum post cadastrado ou erro na requisição");
});
