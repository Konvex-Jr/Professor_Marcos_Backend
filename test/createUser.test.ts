import CreateUser from "../source/useCases/createUser/CreateUser";

    describe("CreateUser UseCase", () => {
      const mockRepositoryFactory = {
        createUserRepository: () => ({
          create: jest.fn(),
          getAll: jest.fn().mockResolvedValue([])
        })
      };

      it("deve criar um usuário com sucesso", async () => {
        const useCase = new CreateUser(mockRepositoryFactory as any);
        (useCase.userRepository.create as jest.Mock).mockResolvedValue({ id: "1", name: "John", email: "john.doe@konvex.com.br", password: "senha123" });
        const input = { name: "John", email: "john.doe@konvex.com.br", password: "senha123" };
        const output = await useCase.execute(input);
        expect(output.accessToken).toBeDefined();
      });

      it("não deve criar usuário com senha inferior a seis caracteres", async () => {
        const useCase = new CreateUser(mockRepositoryFactory as any);
        const input = { name: "John", email: "john.doe@konvex.com.br", password: "12345" };
        await expect(useCase.execute(input)).rejects.toThrow("Invalid password");
      });

      it("deve chamar o método create do repositório", async () => {
        const useCase = new CreateUser(mockRepositoryFactory as any);
        (useCase.userRepository.create as jest.Mock).mockResolvedValue({ id: "1", name: "John", email: "john.doe@konvex.com.br", password: "senha123" });
        const input = { name: "John", email: "john.doe@konvex.com.br", password: "senha123" };
        await useCase.execute(input);
        expect(useCase.userRepository.create).toHaveBeenCalled();
      });
    });

    describe("CreateUser UseCase", () => {
      
      const mockRepositoryFactory = {
        createUserRepository: () => ({
          create: jest.fn(),
          getAll: jest.fn().mockResolvedValue([])
        })
      };

      it("deve criar um usuário com sucesso", async () => {
        const useCase = new CreateUser(mockRepositoryFactory as any);
        (useCase.userRepository.create as jest.Mock).mockResolvedValue({ id: "1", name: "John", email: "john.doe@konvex.com.br", password: "senha123" });
        const input = { name: "John", email: "john.doe@konvex.com.br", password: "senha123" };
        const output = await useCase.execute(input);
        expect(output.accessToken).toBeDefined();
      });

      it("não deve criar usuário com senha inferior a seis caracteres", async () => {
        const useCase = new CreateUser(mockRepositoryFactory as any);
        const input = { name: "John", email: "john.doe@konvex.com.br", password: "12345" };
        await expect(useCase.execute(input)).rejects.toThrow("Invalid password");
      });

      it("deve chamar o método create do repositório", async () => {
        const useCase = new CreateUser(mockRepositoryFactory as any);
        (useCase.userRepository.create as jest.Mock).mockResolvedValue({ id: "1", name: "John", email: "john.doe@konvex.com.br", password: "senha123" });
        const input = { name: "John", email: "john.doe@konvex.com.br", password: "senha123" };
        await useCase.execute(input);
        expect(useCase.userRepository.create).toHaveBeenCalled();
      });
    })
