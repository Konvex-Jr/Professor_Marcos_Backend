import FindUserById from "../source/useCases/findUserById/FindUserById";

describe("FindUserById UseCase", () => {
  const mockRepositoryFactory = {
    createUserRepository: () => ({
      findById: jest.fn()
    })
  };

  it("deve encontrar um usuário pelo ID", async () => {
    const userMock = { id: "1", name: "John Doe", email: "john.doe@example.com", password: "senha123" };
    const useCase = new FindUserById(mockRepositoryFactory as any);
    (useCase.userRepository.findById as jest.Mock).mockResolvedValue(userMock);
    const result = await useCase.execute({ userId: "1" });
    expect(result.user).toBeDefined();
    expect(result.user.id).toBe(userMock.id);
    expect(result.user.email).toBe(userMock.email);
  });

  it("deve lançar erro quando o userId não for fornecido", async () => {
    const useCase = new FindUserById(mockRepositoryFactory as any);
    await expect(useCase.execute({ userId: "" } as any)).rejects.toThrow("Id do usuário não fornecido");
  });

  it("deve lançar erro quando o usuário não for encontrado", async () => {
    const useCase = new FindUserById(mockRepositoryFactory as any);
    (useCase.userRepository.findById as jest.Mock).mockResolvedValue(null);
    await expect(useCase.execute({ userId: "1" })).rejects.toThrow("Usuário não encontrado");
  });
});