import { Router, Request, Response } from "express";
import { body } from "express-validator";

import { validateReqSchema } from "..";
import { UserPostController } from "../../controllers/users/UserPostController";
import { container } from "../../dependency-injection";

/**
 * 
 * @param router Router instance
 */
export const register = (router: Router) => {

  // User Post route
  const reqUserCreateSchema = [
    body('name')
      .exists()
      .withMessage('name is required')
      .isString()
      .withMessage('name must be a string')
      .isLength({ min: 3, max: 20 })
      .withMessage('name must be between 3 and 20 characters'),
    body('email')
      .exists()
      .withMessage('email is required')
      .isEmail()
      .withMessage('email must be a valid email address'),
  ];
  const userController: UserPostController = container.get('Apps.express.controllers.users.UserPostController');
  router.post('/user', reqUserCreateSchema, validateReqSchema, (req: Request, res: Response) => userController.run(req, res));

  
}