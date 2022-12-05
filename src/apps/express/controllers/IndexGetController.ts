import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from './Controller';

/**
 * Main index route controller, just return a Hello World message
 */
export default class IndexGetController implements Controller {
  async run(req: Request, res: Response) {
    res.status(httpStatus.OK).send('Hello world');
  }
}