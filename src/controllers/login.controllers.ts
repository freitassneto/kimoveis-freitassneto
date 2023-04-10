import { Request, Response } from "express";
import { iLogin } from "../interfaces/login.interfaces";
import createLoginService from "../services/login/createLogin.service";

const createLoginController = async (req: Request, res: Response): Promise<Response> => {
  const loginData: iLogin = req.body;

  const token: string = await createLoginService(loginData);

  return res.json({ token: token });
};

export { createLoginController };
