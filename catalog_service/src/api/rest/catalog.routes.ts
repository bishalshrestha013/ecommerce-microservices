import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import { CatalogRepository } from "../../repository/catalog_repository";
import { CatalogService } from "../../services/catalog.service";
import { CreateProductRequest } from "../../dto/product.dto";
import { RequestValidator } from "../../utils/requestValidator";

const router: Router = Router();

export const catalogService = new CatalogService(new CatalogRepository());

// endpoints
router.post(
  "/products",
  async (req: Request, res: Response, next: NextFunction) => {
    const { errors, input } = await RequestValidator(
      CreateProductRequest,
      req.body,
    );

    if (errors) {
      return res.status(400).json(errors);
    }

    const data = await catalogService.createProduct(input);

    return res.status(201).json(data);
  },
);

export default router;
