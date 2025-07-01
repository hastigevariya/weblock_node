import multer, { diskStorage } from 'multer';
import { mkdir } from "fs";
import path from 'path';

const homeBannerStorage = diskStorage({
    destination: function (req, file, cb) {
        const dir = './public/banner';
        mkdir(dir, { recursive: true }, (error) => cb(error, dir));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const first4Chars = file.originalname.slice(0, 4);
        cb(null, Date.now() + 'home-banner' + first4Chars + ext);
    },
});
export const homeBanner = multer({
    storage: homeBannerStorage,
    limits: { fileSize: 1 * 1024 * 1024 },
}).single('image');

