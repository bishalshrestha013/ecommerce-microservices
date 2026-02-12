import { faker } from "@faker-js/faker";
import { ICatalogRepository } from "../../interface/catalogRepository_interface";
import { MockCatalogRepository } from "../../repository/mockCatalog_repository";
import { CatalogService } from "../catalog.service";
import { Product } from "../../models/product.model";
import { describe, expect, jest } from "@jest/globals";
import { ProductFactory } from "../../utils/fixtures";

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

    test("should throw an error with unable to create product", async () => {
      const service = new CatalogService(repository);

      const reqBody = mockProduct({
        price: +faker.commerce.price(),
      });

      jest
        .spyOn(repository, "create")
        .mockImplementationOnce(() => Promise.resolve({} as Product));

      await expect(service.createProduct(reqBody)).rejects.toThrow(
        "unable to create product",
      );
    });

    test("should throw an error with product already exists", async () => {
      const service = new CatalogService(repository);

      const reqBody = mockProduct({
        price: +faker.commerce.price(),
      });

      jest
        .spyOn(repository, "create")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("product already exists")),
        );

      await expect(service.createProduct(reqBody)).rejects.toThrow(
        "product already exists",
      );
    });
  });

  describe("updateProduct", () => {
    test("should update a product", async () => {
      const service = new CatalogService(repository);

      const reqBody = mockProduct({
        price: +faker.commerce.price(),
        id: faker.number.int({ min: 10, max: 100 }),
      });

      const result = await service.updateProduct(reqBody);

      expect(result).toMatchObject(reqBody);
    });

    test("should throw an error with product doesn't exists", async () => {
      const service = new CatalogService(repository);

      jest
        .spyOn(repository, "update")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("product does not exists")),
        );

      await expect(service.updateProduct({} as Product)).rejects.toThrow(
        "product does not exists",
      );
    });
  });

  describe("getProducts", () => {
    test("should get products by offset and limit", async () => {
      const service = new CatalogService(repository);

      const randomLimit = faker.number.int({ min: 10, max: 100 });

      const products = ProductFactory.buildList(randomLimit);

      jest
        .spyOn(repository, "find")
        .mockImplementationOnce(() => Promise.resolve(products));

      const result = await service.getProducts(randomLimit, 0);

      expect(result.length).toEqual(randomLimit);
      expect(result).toEqual(products);
    });

    test("should throw an error with products doesn't exists", async () => {
      const service = new CatalogService(repository);

      jest
        .spyOn(repository, "find")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("products does not exists")),
        );

      await expect(service.getProducts(10, 0)).rejects.toThrow(
        "products does not exists",
      );
    });
  });

  describe("getProduct", () => {
    test("should get product by id", async () => {
      const service = new CatalogService(repository);

      const product = ProductFactory.build();

      jest
        .spyOn(repository, "findOne")
        .mockImplementationOnce(() => Promise.resolve(product));

      const result = await service.getProduct(product.id!);

      expect(result).toMatchObject(product as any);
    });
  });

  describe("deleteProduct", () => {
    test("should delete product by id", async () => {
      const service = new CatalogService(repository);

      const product = ProductFactory.build();

      jest
        .spyOn(repository, "delete")
        .mockImplementationOnce(() => Promise.resolve({ id: product.id! }));

      const result = await service.deleteProduct(product.id!);

      expect(result).toMatchObject({ id: product.id });
    });
  });
});
