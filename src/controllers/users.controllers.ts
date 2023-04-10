import { Request, Response } from "express";
import { iUser, iUserReturn, iUsersReturn } from "../interfaces/users.interfaces";
import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import listUsersService from "../services/users/listUsers.service";
import updateUserService from "../services/users/updateUser.service";

const createUserController = async (req: Request, res: Response): Promise<Response> => {
  const userData: iUser = req.body;

  const newUser: iUserReturn = await createUserService(userData);

  return res.status(201).json(newUser);
};

const listUsersController = async (req: Request, res: Response): Promise<Response> => {
  const users: iUsersReturn = await listUsersService();

  return res.status(200).json(users);
};

const updateUserController = async (req: Request, res: Response): Promise<Response> => {
  const userData: iUser = req.body;
  const userId = Number(req.params.id);
  const loggedUser = req.user;

  const updatedUser: iUserReturn = await updateUserService(userData, userId, loggedUser);

  return res.status(200).json(updatedUser);
};

const deleteUserController = async (req: Request, res: Response): Promise<Response> => {
  await deleteUserService(Number(req.params.id));

  return res.status(204).json();
};

export {
  createUserController,
  listUsersController,
  updateUserController,
  deleteUserController,
};
