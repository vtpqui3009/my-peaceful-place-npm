import { Request, Response, NextFunction } from "express";
import cloudinary from "../utils/cloudinary";

interface AvatarPayload {
  url: string;
  size: number;
  resource_type: string;
  created_at: string;
}

declare global {
  namespace Express {
    interface Request {
      avatar?: AvatarPayload;
    }
  }
}

export const uploadAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.username) {
      return next();
    }
    const existingProfileFolders = await cloudinary.api.sub_folders(`profile`);
    const isExistingFolder = await existingProfileFolders.folders.some(
      (folder: any) => folder.name === req.body.username
    );
    if (!isExistingFolder) {
      await cloudinary.api.create_folder(`/profile/${req.body.username}`);
    }
    if (typeof req.file?.path !== "string") {
      return next();
    }
    const response = await cloudinary.uploader.upload(req.file.path, {
      public_id: `profile_${req.file.filename}`,
      folder: `/profile/${req.body.username}`,
    });
    const responseData = {
      url: response.url,
      size: response.bytes,
      resource_type: response.resource_type,
      created_at: response.created_at,
    };
    req.avatar = responseData;
  } catch (error) {
    console.log(error);
  }
};
