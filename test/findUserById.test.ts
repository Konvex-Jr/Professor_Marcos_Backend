import RepositoryFactoryInterface from "../source/domain/Interfaces/RepositoryFactoryInterface";
import MemoryRepositoryFactory from "../source/infra/repository/MemoryRepositoryFactory";
import CreateUser from "../source/useCases/createUser/CreateUser";
import FindUserById from "../source/useCases/findUserById/FindUserById";

describe("FindUserById UseCase", () => {
  let findUserById: FindUserById;
  let repositoryFactory: RepositoryFactoryInterface;
  let createUser: CreateUser

  beforeEach(() => {
    repositoryFactory = new MemoryRepositoryFactory()
    findUserById = new FindUserById(repositoryFactory);
    createUser = new CreateUser(repositoryFactory)
  });

  test("deve encontrar um usuário pelo ID", async () => {
    
    const user = { id: "1", name: "John Doe", email: "john.doe@example.com", password: "senha123" };
    
    createUser.execute(user)

    const result = await findUserById.execute({ userId: "1" });
    
    expect(result.user).toBeDefined();
    expect(result.user.id).toBe(user.id);
    expect(result.user.email).toBe(user.email);
  
  });

  // test("deve lançar erro quando o userId não for fornecido", async () => {
  //   await expect(findUserById.execute({ userId: "" } as any)).rejects.toThrow("Id do usuário não fornecido");
  // });

  // test("deve lançar erro quando o usuário não for encontrado", async () => {
  //   mockFindById.mockResolvedValue(null);
  //   await expect(findUserById.execute({ userId: "1" })).rejects.toThrow("Usuário não encontrado");
  // });
});