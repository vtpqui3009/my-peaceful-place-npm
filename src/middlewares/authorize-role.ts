import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { NotHavePermissionError } from "../errors/not-have-permission";
interface UserPayload {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
  defaultProvidedStorageCapacity: string;
  remainningStorageCapacity: string;
  isDeleted: boolean;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}
export const authorizeAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      "vievie1009"
      // process.env.JWT_KEY!
    ) as UserPayload;
    if (req.currentUser?.isAdmin) {
      next();
    } else {
      throw new NotHavePermissionError("Just admin can do this action");
    }
    req.currentUser = payload;
  } catch (err) {}

  next();
};
