import FindPostByDate from "../source/useCases/findPostByDate/FindPostByDate";
import FindPostByDateInput from "../source/useCases/findPostByDate/FindPostByDateInput";

describe("FindPostByDate UseCase", () => {
  let findPostByDate: FindPostByDate;
  let mockRepositoryFactory: any;
  let mockFindByDate: jest.Mock;

  beforeEach(() => {
    mockFindByDate = jest.fn();
    mockRepositoryFactory = {
      createPostRepository: () => ({
        findByDate: mockFindByDate
      })
    };
    findPostByDate = new FindPostByDate(mockRepositoryFactory);
  });

  test("deve retornar um post quando a data existe", async () => {
    const postMock = { description: "desc", post_string: "str", created_at: new Date(), updated_at: new Date() };
    mockFindByDate.mockResolvedValue(postMock);
    const input: FindPostByDateInput = { created_at: postMock.created_at };
    const result = await findPostByDate.execute(input);
    expect(result.post).toBeDefined();
    expect(result.post.description).toBe(postMock.description);
  });

  test("deve lançar erro se data não for fornecida", async () => {
    await expect(findPostByDate.execute({} as any)).rejects.toThrow("Data não fornecida");
  });

  test("deve lançar erro se post não encontrado", async () => {
    mockFindByDate.mockResolvedValue(null);
    await expect(findPostByDate.execute({ created_at: new Date() } as any)).rejects.toThrow("Post não encontrado");
  });
});


