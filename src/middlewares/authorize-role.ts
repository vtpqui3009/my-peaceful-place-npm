import { Request, Response, NextFunction } from "express";
import { NotHavePermissionError } from "../errors/not-have-permission";

export const authorizedAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.currentUser?.isAdmin == false) {
    throw new NotHavePermissionError("Just admin is allowed to do this action");
  }

  next();
};
