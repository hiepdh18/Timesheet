import { Request } from 'express';
import util from 'util';
import { v4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import multer, { FileFilterCallback } from 'multer';

const multerConst = {
  maxSize: 1024 * 1024 * 5,
  fileMime: ['image/jpg', 'image/png', 'image/jpeg','application/octet-stream'],
  fileExt: ['.jpg', '.png', '.jpeg', '.mp4', '.mov', '.flv', '.wmv', '.avi'],
};

class MulterConfig {
  private storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: any) => {
      try {
        const dir = './public/avatars/';
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
      } catch (error) {
        cb(error, null);
      }
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
      cb(null, v4() + '-' + file.originalname)
    }
  });

  private fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    try {
      console.log(file.mimetype)
      console.log(path.extname(file.originalname))
      const mime = multerConst.fileMime.includes(file.mimetype);
      const ext = multerConst.fileExt.includes(path.extname(file.originalname));
      if (mime && ext) return cb(null, true);
      return cb(new Error('Only images are allowed'));
    } catch (error) {
      return cb(error, false);
    }
  }
  public upload = multer({
    storage: this.storage,
    fileFilter: this.fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 }
  });
}
var upload = new MulterConfig().upload;


export const uploadOne = util.promisify(upload.single('file'));
