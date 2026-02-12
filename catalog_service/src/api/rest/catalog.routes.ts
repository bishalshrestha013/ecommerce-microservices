import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import { CatalogRepository } from "../../repository/catalog_repository";
import { CatalogService } from "../../services/catalog.service";
import { CreateProductRequest, UpdateProductRequest } from "../../dto/product.dto";
import { RequestValidator } from "../../utils/requestValidator";

const router: Router = Router();

export const catalogService = new CatalogService(new CatalogRepository());

// endpoints
router.post(
  "/products",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { errors, input } = await RequestValidator(
        CreateProductRequest,
        req.body,
      );

      if (errors) {
        return res.status(400).json(errors);
      }

      const data = await catalogService.createProduct(input);

      return res.status(201).json(data);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json(err.message);
    }
  },
);

router.patch(
  "/products/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { errors, input } = await RequestValidator(
        UpdateProductRequest,
        req.body,
      );

      const id = parseInt(req.params.id as string) || 0; 

      if (errors) {
        return res.status(400).json(errors);
      }

      const data = await catalogService.updateProduct({id, ...input});

      return res.status(200).json(data);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json(err.message);
    }
  },
);

export default router;
