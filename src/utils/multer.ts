import { Express, Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";

const multerUpload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    cb(null, true);
  },
});
export default multerUpload;
