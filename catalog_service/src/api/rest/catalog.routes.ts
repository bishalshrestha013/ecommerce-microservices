import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import { CatalogRepository } from "../../repository/catalog_repository";
import { CatalogService } from "../../services/catalog.service";

const router: Router = Router();

export const catalogService = new CatalogService(new CatalogRepository());

// endpoints
router.post(
  "/products",
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await catalogService.createProduct(req.body);

    return res.status(201).json(data);
  },
);

export default router;
