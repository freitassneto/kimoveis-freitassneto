import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";

const deleteUserService = async (idUser: number): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOneBy({ id: idUser });

  if (user?.deletedAt) throw new AppError("User is already inactive")
  if (user?.admin) throw new AppError("You can't delete admin user")

  await userRepository.softRemove(user!);
};

export default deleteUserService;
