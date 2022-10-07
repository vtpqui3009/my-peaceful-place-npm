import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
interface Avatar {
  url: string;
  size: number;
  resource_type: string;
  created_at: string;
}
interface UserPayload {
  id: string;
  email: string;
  username: string;
  avatar: Avatar;
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
export const currentUser = (
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
    req.currentUser = payload;
  } catch (err) {}

  next();
};
