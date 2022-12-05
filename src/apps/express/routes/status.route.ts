import { Router, Request, Response } from "express";
import StatusGetController from "../controllers/StatusGetController";
import { container } from "../dependency-injection";

/**
 * 
 * @param router Router instance
 * @dev This has all index routes
 */
export const register = (router: Router) => {
  const controller: StatusGetController = container.get('Apps.express.controllers.status.StatusGetController');
  router.get('/status', (req: Request, res: Response) => controller.run(req, res));
}