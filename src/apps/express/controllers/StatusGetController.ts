import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from './Controller';

/**
 * Status route controller, just return a 200 OK status
 */
export default class StatusGetController implements Controller {
  async run(req: Request, res: Response) {
    res.status(httpStatus.OK).send();
  }
}