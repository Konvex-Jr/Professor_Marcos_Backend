import GetAllPosts from "../source/useCases/getAllPosts/GetAllPosts";

describe("GetAllPosts UseCase", () => {
  let getAllPosts: GetAllPosts;
  let mockRepositoryFactory: any;
  let mockGetAll: jest.Mock;

  beforeEach(() => {
    mockGetAll = jest.fn();
    mockRepositoryFactory = {
      createPostRepository: () => ({
        getAll: mockGetAll
      })
    };
    getAllPosts = new GetAllPosts(mockRepositoryFactory);
  });

  test("deve retornar todos os posts", async () => {
    const postsMock = [{ description: "desc", post_string: "str", created_at: new Date(), updated_at: new Date() }];
    mockGetAll.mockResolvedValue(postsMock);
    const result = await getAllPosts.execute();
    expect(result.data).toBeDefined();
    expect(result.data.length).toBe(1);
  });

  test("deve lançar erro se não houver posts", async () => {
    mockGetAll.mockResolvedValue(null);
    await expect(getAllPosts.execute()).rejects.toThrow("Nenhum post cadastrado ou erro na requisição");
  });
});
