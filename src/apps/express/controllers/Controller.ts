import { Request, Response } from "express";

/**
 * Interface for controllers
 */
export interface Controller {
  run(req: Request, res: Response): Promise<void>;
}