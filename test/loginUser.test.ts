import LoginUser from "../source/useCases/loginUser/LoginUser";

describe("LoginUser UseCase", () => {

    const mockRepositoryFactory = {
        createUserRepository: () => ({
            findByEmail: jest.fn()
        })
    };

    it("deve gerar um token para usuário válido", async () => {
        const userMock = { id: "1", email: "john.doe@gmail.com.br", password: "senha123" };
        const useCase = new LoginUser(mockRepositoryFactory as any);
        (useCase.userRepository.findByEmail as jest.Mock).mockResolvedValue(userMock);
        const loginOutput = await useCase.execute({ email: "john.doe@gmail.com.br", password: "senha123" });
        expect(loginOutput.accessToken).toBeDefined();
    });

    it("deve falhar se o usuário não existir", async () => {
        const useCase = new LoginUser(mockRepositoryFactory as any);
        (useCase.userRepository.findByEmail as jest.Mock).mockResolvedValue(null);
        await expect(useCase.execute({ email: "no.user@gmail.com.br", password: "123456" })).rejects.toThrow("Invalid credentials");
    });

    it("deve falhar se a senha estiver incorreta", async () => {
        const userMock = { id: "1", name: "John", email: "john.doe@gmail.com.br", password: "senha123" };
        const useCase = new LoginUser(mockRepositoryFactory as any);
        (useCase.userRepository.findByEmail as jest.Mock).mockResolvedValue(userMock);
        await expect(useCase.execute({ email: "john.doe@gmail.com.br", password: "senhaErrada" })).rejects.toThrow("Invalid credentials");
    });
});