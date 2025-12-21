import GetAllUsers from "../source/useCases/getAllUsers/GetAllUsers";

describe("GetAllUsers UseCase", () => {
  let getAllUsers: GetAllUsers;
  let mockRepositoryFactory: any;
  let mockGetAll: jest.Mock;

  beforeEach(() => {
    mockGetAll = jest.fn();
    mockRepositoryFactory = {
      createUserRepository: () => ({
        getAll: mockGetAll
      })
    };
    getAllUsers = new GetAllUsers(mockRepositoryFactory);
  });

  test("deve retornar todos os usuários", async () => {
    const usersMock = [
      { id: "1", name: "User 1", email: "user1@example.com", password: "senha123" },
      { id: "2", name: "User 2", email: "user2@example.com", password: "senha123" },
      { id: "3", name: "User 3", email: "user3@example.com", password: "senha123" }
    ];
    mockGetAll.mockResolvedValue(usersMock);
    const result = await getAllUsers.execute();
    expect(result.data).toHaveLength(3);
    expect(result.data[0].email).toBe("user1@example.com");
    expect(result.data[1].email).toBe("user2@example.com");
    expect(result.data[2].email).toBe("user3@example.com");
  });

  test("deve retornar array vazio quando não houver usuários", async () => {
    mockGetAll.mockResolvedValue([]);
    const result = await getAllUsers.execute();
    expect(result.data).toEqual([]);
    expect(result.data).toHaveLength(0);
  });
});