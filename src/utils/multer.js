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


const aboutMediaStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = './public/aboutMedia';
        mkdir(dir, { recursive: true }, (err) => cb(err, dir));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const first4Chars = file.originalname.slice(0, 4);
        cb(null, `${Date.now()}-about-img-vdo-${first4Chars}${ext}`);
    }
});
export const aboutImgVdo = multer({
    storage: aboutMediaStorage,
}).single("media");

const teamStorage = diskStorage({
    destination: function (req, file, cb) {
        const dir = './public/teamMember';
        mkdir(dir, { recursive: true }, (err) => cb(err, dir));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}-${file.originalname.slice(0, 4)}${ext}`);
    },
});

export const teamPhotoUpload = multer({
    storage: teamStorage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB size limit
}).single("photo");

// reviewStorage
const reviewStorage = diskStorage({
    destination: function (req, file, cb) {
        const dir = './public/review';
        mkdir(dir, { recursive: true }, (err) => cb(err, dir));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const first4Chars = file.originalname.slice(0, 4);
        cb(null, `${Date.now()}-review-${first4Chars}${ext}`);
    }
});

export const reviewPhotoUpload = multer({
    storage: reviewStorage,
    limits: { fileSize: 2 * 1024 * 1024 }, // optional size limit
}).single("photo");





