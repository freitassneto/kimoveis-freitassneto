import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { iUserReturn, iUserUpdate } from "../../interfaces/users.interfaces";
import { returnUserSchema } from "../../schemas/users.schemas";

const updateUserService = async (newUserData: iUserUpdate, userId: number, loggedUser: any): Promise<iUserReturn> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const oldUserData: User | null = await userRepository.findOneBy({id: userId});

  if(oldUserData && oldUserData.admin && oldUserData.id !== loggedUser.id) throw new AppError("Insufficient permission", 403);

  if(oldUserData && !oldUserData.admin && newUserData.admin) newUserData.admin = false

  const user: User = userRepository.create({
    ...oldUserData,
    ...newUserData,
  });

  await userRepository.save(user);

  const updatedUser: iUserReturn = returnUserSchema.parse(user);

  return updatedUser;
};

export default updateUserService;
