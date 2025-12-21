import CreateUser from "../source/useCases/createUser/CreateUser";

describe("CreateUser UseCase", () => {
  let createUser: CreateUser;
  let mockRepositoryFactory: any;
  let mockCreate: jest.Mock;

  beforeEach(() => {
    mockCreate = jest.fn();
    mockRepositoryFactory = {
      createUserRepository: () => ({
        create: mockCreate,
        getAll: jest.fn().mockResolvedValue([])
      })
    };
    createUser = new CreateUser(mockRepositoryFactory);
  });

  test("deve criar um usuário com sucesso", async () => {
    mockCreate.mockResolvedValue({ id: "1", name: "John", email: "john.doe@konvex.com.br", password: "senha123" });
    const input = { name: "John", email: "john.doe@konvex.com.br", password: "senha123" };
    const output = await createUser.execute(input);
    expect(output.accessToken).toBeDefined();
  });

  test("não deve criar usuário com senha inferior a seis caracteres", async () => {
    const input = { name: "John", email: "john.doe@konvex.com.br", password: "12345" };
    await expect(createUser.execute(input)).rejects.toThrow("Invalid password");
  });

  test("deve chamar o método create do repositório", async () => {
    mockCreate.mockResolvedValue({ id: "1", name: "John", email: "john.doe@konvex.com.br", password: "senha123" });
    const input = { name: "John", email: "john.doe@konvex.com.br", password: "senha123" };
    await createUser.execute(input);
    expect(mockCreate).toHaveBeenCalled();
  });
});
