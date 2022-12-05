import { Router, Request, Response } from "express";
import IndexGetController from "../controllers/IndexGetController";
import { container } from "../dependency-injection";

/**
 * 
 * @param router Router instance
 * @dev This has all index routes
 */
export const register = (router: Router) => {
  const controller: IndexGetController = container.get('Apps.express.controllers.IndexGetController');
  router.get('/', (req: Request, res: Response) => controller.run(req, res));
}