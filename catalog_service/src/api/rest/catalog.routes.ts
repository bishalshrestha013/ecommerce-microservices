import { Router } from "express";
import type { Request, Response, NextFunction } from "express";

const router: Router = Router();

// endpoints
router.post("/products", (req: Request, res: Response, next: NextFunction) => {
  return res.status(201).json({});
});

export default router;
