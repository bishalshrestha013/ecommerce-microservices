import { ICatalogRepository } from "../../interface/catalogRepository_interface";
import { MockCatalogRepository } from "../../repository/mockCatalog_repository";
import { CatalogService } from "../catalog.service";

describe("catalogService", () => {
  let repository: ICatalogRepository;

  // Setup pre-requisites for the tests
  beforeEach(() => {
    repository = new MockCatalogRepository();
  });

  // Clean up after each test
  afterEach(() => {
    repository = {} as ICatalogRepository;
  });

  describe("createProduct", () => {
    test("should create a product", async () => {
      const service = new CatalogService(repository);

      const reqBody = {
        name: "Iphone",
        description: "Smart phone",
        price: 100,
        stock: 20,
      };

      const result = await service.createProduct(reqBody);

      expect(result).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        description: expect.any(String),
        price: expect.any(Number),
        stock: expect.any(Number),
      });
    });
    test("should throw an error with product already exists", () => {});
  });
});
