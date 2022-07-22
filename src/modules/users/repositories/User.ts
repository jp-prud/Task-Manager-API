import { EntityRepository, Repository } from 'typeorm';
import User from '../typeorm/entities/User';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async index(): Promise<User | undefined> {
    const users = await this.index();

    return users;
  }

  public async findByName(name: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: { name },
    });

    return user;
  }
}

export default UserRepository;
