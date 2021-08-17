import { Request } from 'express';
import util from 'util';
import { v4 } from 'uuid';
import fs from 'fs';
import multer, { FileFilterCallback } from 'multer';

class MulterConfig {
  private storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: any) => {
      try {
        console.log("HIEPPP");
        const dir = 'public/avatar/';
        fs.mkdirSync(dir, { recursive: true });
        return cb(null, dir);
      } catch (error) {
        return cb(error, null);
      }
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
      cb(null, v4() + '-' + file.originalname)
    }
  });

  private fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true)
    } else {
      cb(null, false)
    }
  }
  public upload = multer({
    // dest: 'public/avatar/'
    storage: this.storage,
    fileFilter: this.fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 }
  });
}
const upload = new MulterConfig().upload;
export const uploadOne = util.promisify(upload.single('file'));
