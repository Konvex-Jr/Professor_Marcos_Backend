import CreatePost from "../source/useCases/createPost/CreatePost";

describe("CreatePost UseCase", () => {
  
  const mockRepositoryFactory = {
    createPostRepository: () => ({
      create: jest.fn(),
      getAll: jest.fn().mockResolvedValue([])
    })
  };

  it("deve criar um post com sucesso", async () => {
    const postMock = { description: "desc", post_string: "str", created_at: new Date(), updated_at: new Date() };
    const useCase = new CreatePost(mockRepositoryFactory as any);
    (useCase.postRepository.create as jest.Mock).mockResolvedValue(postMock);
    const input = { description: "meu primeiro post", post_string: "teste post_string", created_at: new Date(), updated_at: new Date(), deleted_at: null };
    const output = await useCase.execute(input);
    expect(output.post).toBeDefined();
    expect(output.post.description).toBe(input.description);
  });

  it("não deve criar um post caso não seja fornecido uma post_string", async () => {
    const useCase = new CreatePost(mockRepositoryFactory as any);
    const input = { description: "meu primeiro post", post_string: '', created_at: new Date(), updated_at: new Date(), deleted_at: null };
    await expect(useCase.execute(input)).rejects.toThrow("String de imagem não fornecido");
  });

  it("deve chamar o método create do repositório", async () => {
    const postMock = { description: "desc", post_string: "str", created_at: new Date(), updated_at: new Date() };
    const useCase = new CreatePost(mockRepositoryFactory as any);
    (useCase.postRepository.create as jest.Mock).mockResolvedValue(postMock);
    const input = { description: "meu primeiro post", post_string: "teste post_string", created_at: new Date(), updated_at: new Date(), deleted_at: null };
    await useCase.execute(input);
    expect(useCase.postRepository.create).toHaveBeenCalled();
  });
});
