# Express development documentation

This application use the dependency injection pattern and SOLID Principles, you have to follow this rules to develop

## Controllers

For first Single Responsibility of SOLID, each endpoint must be a class implementing Controller interface and acts only for validating parameters and returning response. For example, if we want to create an endpoint to list all users we have to create something like UsersGetController.ts.

```Typescript
  import { Request, Response } from 'express';
  import httpStatus from 'http-status';
  import { Controller } from './Controller';

  export default class UsersGetController implements Controller {
    async run(req: Request, res: Response) {
      const usersRepository = container.get('Contexts.domains.users.UserRepository')
      res.status(httpStatus.OK).send(await usersRepository.getAll());
    }
  }
```

As we use dependency injection, we must declare this controller class as a service (and anothers injections if needed) in the yml file, inside dependency-injection folder. Take care about loading tree of services, for example, in previous case, a folder users must exists inside dependency-injection and an application.yml file declaring it's name, class and arguments.

```yaml
services:
  Apps.express.controllers.users.UserGetController:
    class: ../../controllers/UserGetController
    arguments: ["@Contexts.domains.users.UserRepository"] # All domain logic is declared on another module called contexts, this stands for clean architecture that separate domain, application and infrastructure as a good practice.
```

## Routes

Routes must be declared in a "domain" file, for example `users.routes.ts` where everything related to that domain is in that file.

For declare a route to the users example we have to do this

```Typescript
  import { Router, Request, Response } from "express";
  import UserGetController from "../controllers/UserGetController";
  import { container } from "../dependency-injection";

  /**
   *
   * @param router Router instance
   * @dev This has all index routes
   */
  export const register = (router: Router) => {
    const controller: UserGetController = container.get('Apps.express.controllers.users.UserGetController');
    router.get('/', (req: Request, res: Response) => controller.run(req, res));
  }
```

Validations are handled by express-validator, and must be set on routes files. This is because, probably, we share some validations on this endpoints.
Here is an example if we want to validate an email field in body on a post request. Note that validateReqSchema is defined on index.ts of routes folder.

```Typescript
  import { Router, Request, Response } from 'express';
  import container from '../dependency-injection';
  import { body } from 'express-validator';
  import { validateReqSchema } from '.';

  export const register = (router: Router) => {
    const reqSchema = [
      body('email').exists().isString().isEmail()
    ];

    const controller = container.get('Apps.express.controllers.users.UsersPutController');
    router.put('/update', reqSchema, validateReqSchema, (req: Request, res: Response) =>
      controller.run(req, res)
    );
  };
```
