import { User } from "./User";

/**
 * User repository interface
 */
export interface UserRepository {
  save(user: User): Promise<void>;
}