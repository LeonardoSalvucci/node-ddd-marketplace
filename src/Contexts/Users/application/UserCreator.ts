import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

/**
 * Create a user use case
 */
export class UserCreator {
  constructor(private repository: UserRepository) {}

  async run(id: number, name: string, email: string) {
    const user = new User(id, name, email);

    return this.repository.save(user);
  }
}