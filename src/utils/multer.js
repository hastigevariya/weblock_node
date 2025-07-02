import multer, { diskStorage } from 'multer';
import { mkdir } from "fs";
import path from 'path';
const enterpriseLogoStorage = diskStorage({
    destination: function (req, file, cb) {
        const dir = './public/enterpriseLogo';
        mkdir(dir, { recursive: true }, (error) => cb(error, dir));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const first4Chars = file.originalname.slice(0, 4);
        cb(null, Date.now() + 'enterprise-logo' + first4Chars + ext);
    },
});
export const homeBannerenterpriseLogo = multer({
    storage: enterpriseLogoStorage,
    limits: { fileSize: 1 * 1024 * 1024 },
}).single('image');

const homeImgVdoStorage = diskStorage({
    destination: function (req, file, cb) {
        const dir = './public/homeImgVdo';
        mkdir(dir, { recursive: true }, (error) => cb(error, dir));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const first4Chars = file.originalname.slice(0, 4);
        cb(null, Date.now() + 'home-img-vdo' + first4Chars + ext);
    },
});
export const homeImgVdo = multer({
    storage: homeImgVdoStorage,
}).single('media')






