import { User } from '../../../../../src/Contexts/Users/domain/User';
import { FileUserRepository } from '../../../../../src/Contexts/Users/infrastructure/presistence/FileUserRepository';;
describe('Save User', () => {
  it('should save a valid user', async () => {
    const repository = new FileUserRepository();
    const user = new User(new Date().getTime(), 'Leonardo', 'le.salvucci@gmail.com');

    await repository.save(user);
  });
});