import fs from 'fs';
import { User } from '../../domain/User';
import { UserRepository } from '../../domain/UserRepository';

/**
 * User repository implementation using files as persistancy
 */
export class FileUserRepository implements UserRepository {
  private FILE_PATH = `${__dirname}/users`;

  /**
   * 
   * @param user User to save
   * @dev This method is not atomic, it can fail if the file is being read or written at the same time
   */
  async save(user: User): Promise<void> {
    fs.promises.writeFile(this.filePath(user.id), JSON.stringify(user), {flag: 'w'});
  }

  private filePath(userId: number): string {
    return `${this.FILE_PATH}/${userId}.json`;
  }
}