import { UserCreator } from "../../../../../src/Contexts/Users/application/UserCreator";
import { User } from "../../../../../src/Contexts/Users/domain/User";
import { UserRepository } from "../../../../../src/Contexts/Users/domain/UserRepository";

describe('UserCreator', () => {
  it('shoul creates a valid user', async () => {
    const repository: UserRepository = {
      save: jest.fn()
    }
    const userCreator = new UserCreator(repository);
    const id = 1;
    const name = 'Leonardo';
    const email = 'le.salvucci@gmail.com';

    const expectedUser = new User(id, name, email);

    await userCreator.run(id, name, email);

    expect(repository.save).toHaveBeenCalledWith(expectedUser);
  });
});