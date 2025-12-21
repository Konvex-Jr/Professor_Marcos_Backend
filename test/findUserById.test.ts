import FindUserById from "../source/useCases/findUserById/FindUserById";

describe("FindUserById UseCase", () => {
  let findUserById: FindUserById;
  let mockRepositoryFactory: any;
  let mockFindById: jest.Mock;

  beforeEach(() => {
    mockFindById = jest.fn();
    mockRepositoryFactory = {
      createUserRepository: () => ({
        findById: mockFindById
      })
    };
    findUserById = new FindUserById(mockRepositoryFactory);
  });

  test("deve encontrar um usuário pelo ID", async () => {
    const userMock = { id: "1", name: "John Doe", email: "john.doe@example.com", password: "senha123" };
    mockFindById.mockResolvedValue(userMock);
    const result = await findUserById.execute({ userId: "1" });
    expect(result.user).toBeDefined();
    expect(result.user.id).toBe(userMock.id);
    expect(result.user.email).toBe(userMock.email);
  });

  test("deve lançar erro quando o userId não for fornecido", async () => {
    await expect(findUserById.execute({ userId: "" } as any)).rejects.toThrow("Id do usuário não fornecido");
  });

  test("deve lançar erro quando o usuário não for encontrado", async () => {
    mockFindById.mockResolvedValue(null);
    await expect(findUserById.execute({ userId: "1" })).rejects.toThrow("Usuário não encontrado");
  });
});