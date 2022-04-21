import { Factory, Faker } from '@mikro-orm/seeder';
import { User } from '../user.entity';

export class UserFactory extends Factory<User> {
  model = User;

  definition(faker: Faker): Partial<User> {
    return {
      username: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.lorem.text(),
    };
  }
}
