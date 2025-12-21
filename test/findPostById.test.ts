import FindPostById from "../source/useCases/findPostById/FindPostById";
import FindPostByIdInput from "../source/useCases/findPostById/FindPostByIdInput";

describe("FindPostById UseCase", () => {
  let findPostById: FindPostById;
  let mockRepositoryFactory: any;
  let mockFindById: jest.Mock;

  beforeEach(() => {
    mockFindById = jest.fn();
    mockRepositoryFactory = {
      createPostRepository: () => ({
        findById: mockFindById
      })
    };
    findPostById = new FindPostById(mockRepositoryFactory);
  });

  test("deve retornar um post quando o ID existe", async () => {
    const postMock = { description: "desc", post_string: "str", created_at: new Date(), updated_at: new Date() };
    mockFindById.mockResolvedValue(postMock);
    const input: FindPostByIdInput = { post_id: "1" };
    const result = await findPostById.execute(input);
    expect(result.post).toBeDefined();
    expect(result.post.description).toBe(postMock.description);
  });

  test("deve lançar erro se ID não for fornecido", async () => {
    await expect(findPostById.execute({} as any)).rejects.toThrow("ID do post não fornecido");
  });

  test("deve lançar erro se post não encontrado", async () => {
    mockFindById.mockResolvedValue(null);
    await expect(findPostById.execute({ post_id: "1" } as any)).rejects.toThrow("Post não encontrado");
  });
});
