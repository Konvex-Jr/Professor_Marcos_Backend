import GetAllUsers from "../source/useCases/getAllUsers/GetAllUsers";
import CreateUser from "../source/useCases/createUser/CreateUser";

describe("GetAllUsers UseCase", () => {
  const mockRepositoryFactory = {
    createUserRepository: () => ({
      getAll: jest.fn()
    })
  };

  it("deve retornar todos os usuários", async () => {
    const usersMock = [
      { id: "1", name: "User 1", email: "user1@example.com", password: "senha123" },
      { id: "2", name: "User 2", email: "user2@example.com", password: "senha123" },
      { id: "3", name: "User 3", email: "user3@example.com", password: "senha123" }
    ];
    const useCase = new GetAllUsers(mockRepositoryFactory as any);
    (useCase.userRepository.getAll as jest.Mock).mockResolvedValue(usersMock);
    const result = await useCase.execute();
    expect(result.data).toHaveLength(3);
    expect(result.data[0].email).toBe("user1@example.com");
    expect(result.data[1].email).toBe("user2@example.com");
    expect(result.data[2].email).toBe("user3@example.com");
  });

  it("deve retornar array vazio quando não houver usuários", async () => {
    const useCase = new GetAllUsers(mockRepositoryFactory as any);
    (useCase.userRepository.getAll as jest.Mock).mockResolvedValue([]);
    const result = await useCase.execute();
    expect(result.data).toEqual([]);
    expect(result.data).toHaveLength(0);
  });
});