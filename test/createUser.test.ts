import CreateUser from "../source/useCases/createUser/CreateUser";
import RepositoryFactoryInterface from "../source/domain/Interfaces/RepositoryFactoryInterface";
import MemoryRepositoryFactory from "../source/infra/repository/MemoryRepositoryFactory";


describe("CreateUser UseCase", () => {
  
  let createUser: CreateUser;
  let repositoryFactory: RepositoryFactoryInterface

  beforeEach(() => {
    repositoryFactory = new MemoryRepositoryFactory()
    createUser = new CreateUser(repositoryFactory)
  });

  test("deve criar um usuário com sucesso", async () => {

    const input = { name: "John", email: "john.doe@konvex.com.br", password: "senha123" };

    const output = await createUser.execute(input);

    expect(output.accessToken).toBeDefined();
  });

  test("não deve criar usuário com senha inferior a seis caracteres", async () => {
    
    const input = { name: "John", email: "john.doe@konvex.com.br", password: "12345" };
    
    expect(createUser.execute(input)).rejects.toThrow("Invalid password");
  
  });
});
