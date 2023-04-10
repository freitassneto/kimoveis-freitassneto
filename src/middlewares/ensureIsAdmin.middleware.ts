import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

const ensureIsAdmin = async (req: Request, res: Response, next: NextFunction) => {

  const userIsAdmin: string = req.user.admin;

  if (!userIsAdmin) throw new AppError("Insufficient permission", 403);

  next()

};

export { ensureIsAdmin };
