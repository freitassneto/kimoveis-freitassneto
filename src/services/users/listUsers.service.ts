import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { iUsersReturn } from "../../interfaces/users.interfaces";
import { returnMultipleUserSchema } from "../../schemas/users.schemas";

const listUsersService = async (): Promise<iUsersReturn> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUsers: User[] = await userRepository.find({
    relations: {
      schedule: true
    },
    withDeleted: true
  });

  const users: iUsersReturn = returnMultipleUserSchema.parse(findUsers);

  return users;
};

export default listUsersService;
