import { Request, Response } from "express";
import httpStatus from "http-status";
import { UserCreator } from "../../../../Contexts/Users/application/UserCreator";
import { Controller } from "../Controller";

/**
 * User post body type
 */
type UserPostRequest = Request & {
  body: {
    name: string;
    email: string;
  }
}

/**
 * User post controller, create a new user
 * Body params:
 * - name: string
 * - email: string
 */
export class UserPostController implements Controller {
  constructor(private _userCreator: UserCreator) {}

  async run(req: UserPostRequest, res: Response): Promise<void> {
    try {
      const { name, email } = req.body;
      const id = new Date().getTime()
      await this._userCreator.run(id, name, email);
      res.status(httpStatus.CREATED).json({ id });
    } catch(error) {
      console.log(error)
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}