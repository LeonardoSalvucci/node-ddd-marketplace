import { Router, Request, Response } from 'express';
import glob from 'glob';
import { ValidationError, validationResult } from 'express-validator';
import httpStatus from 'http-status';

/**
 * 
 * @param router Router instance
 * @dev This function will register all routes in the routes folder
 */
export function registerRoutes(router: Router) {
  const routes = glob.sync('**/*.route.ts', { cwd: __dirname });
  routes.forEach((route: string) => register(route, router));
}

/**
 * 
 * @param routePath Route path
 * @param router Router instance
 * @dev This function will register a route into the router
 */
function register(routePath: string, router: Router) {
  const route = require(`${__dirname}/${routePath}`);
  route.register(router);
}

/**
 * 
 * @param req Request instance
 * @param res Response instance
 * @param next 
 * @returns 
 * @dev This function will validate the request body and params and return a 422 error if there are any errors
 */
export function validateReqSchema(req: Request, res: Response, next: () => void) {
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    next()
    return
  }
  const errors = validationErrors.array().map((error: ValidationError) => ({ [error.param]: error.msg }));

  return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({errors});
}