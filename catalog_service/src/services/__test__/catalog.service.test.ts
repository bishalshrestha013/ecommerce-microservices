import { faker } from "@faker-js/faker";
import { ICatalogRepository } from "../../interface/catalogRepository_interface";
import { MockCatalogRepository } from "../../repository/mockCatalog_repository";
import { CatalogService } from "../catalog.service";

const mockProduct = (rest: any) => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    stock: faker.number.int({ min: 10, max: 100 }),
    ...rest,
  };
};

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

      const reqBody = mockProduct({
        price: +faker.commerce.price(),
      });

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
