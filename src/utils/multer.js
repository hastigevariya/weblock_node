// import multer, { diskStorage } from 'multer';
// import { mkdir } from "fs";
// import path from 'path';
// const enterpriseLogoStorage = diskStorage({
//     destination: function (req, file, cb) {
//         const dir = './public/enterpriseLogo';
//         mkdir(dir, { recursive: true }, (error) => cb(error, dir));
//     },
//     filename: function (req, file, cb) {
//         const ext = path.extname(file.originalname);
//         const first4Chars = file.originalname.slice(0, 4);
//         cb(null, Date.now() + 'enterprise-logo' + first4Chars + ext);
//     },
// });
// export const homeBannerenterpriseLogo = multer({
//     storage: enterpriseLogoStorage,
//     limits: { fileSize: 1 * 1024 * 1024 },
// }).single('image');

// const homeImgVdoStorage = diskStorage({
//     destination: function (req, file, cb) {
//         const dir = './public/homeImgVdo';
//         mkdir(dir, { recursive: true }, (error) => cb(error, dir));
//     },
//     filename: function (req, file, cb) {
//         const ext = path.extname(file.originalname);
//         const first4Chars = file.originalname.slice(0, 4);
//         cb(null, Date.now() + 'home-img-vdo' + first4Chars + ext);
//     },
// });
// export const homeImgVdo = multer({
//     storage: homeImgVdoStorage,
// }).single('media')


// const aboutMediaStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const dir = './public/aboutMedia';
//         mkdir(dir, { recursive: true }, (err) => cb(err, dir));
//     },
//     filename: function (req, file, cb) {
//         const ext = path.extname(file.originalname);
//         const first4Chars = file.originalname.slice(0, 4);
//         cb(null, `${Date.now()}-about-img-vdo-${first4Chars}${ext}`);
//     }
// });
// export const aboutImgVdo = multer({
//     storage: aboutMediaStorage,
// }).single("media");

// const teamStorage = diskStorage({
//     destination: function (req, file, cb) {
//         const dir = './public/teamMember';
//         mkdir(dir, { recursive: true }, (err) => cb(err, dir));
//     },
//     filename: function (req, file, cb) {
//         const ext = path.extname(file.originalname);
//         cb(null, `${Date.now()}-${file.originalname.slice(0, 4)}${ext}`);
//     },
// });

// export const teamPhotoUpload = multer({
//     storage: teamStorage,
//     limits: { fileSize: 2 * 1024 * 1024 }, // 2MB size limit
// }).single("photo");

// const reviewStorage = diskStorage({
//     destination: function (req, file, cb) {
//         const dir = './public/review';
//         mkdir(dir, { recursive: true }, (err) => cb(err, dir));
//     },
//     filename: function (req, file, cb) {
//         const ext = path.extname(file.originalname);
//         const first4Chars = file.originalname.slice(0, 4);
//         cb(null, `${Date.now()}-review-${first4Chars}${ext}`);
//     }
// });
// export const reviewPhotoUpload = multer({
//     storage: reviewStorage,
//     limits: { fileSize: 2 * 1024 * 1024 }, // optional size limit
// }).single("photo");


// Portfolio Storage
// const portfolioStorage = diskStorage({
//     destination: function (req, file, cb) {
//         const dir = './public/portfolio';
//         mkdir(dir, { recursive: true }, (err) => cb(err, dir));
//     },
//     filename: function (req, file, cb) {
//         const ext = path.extname(file.originalname);
//         const first4Chars = file.originalname.slice(0, 4);
//         cb(null, `${Date.now()}-portfolio-${first4Chars}${ext}`);
//     }
// });

// export const portfolioPhotoUpload = multer({
//     storage: portfolioStorage,
//     limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
// }).fields([
//     { name: "image", maxCount: 1 },
//     { name: "mainImage", maxCount: 1 }
// ]);

// const jobApplicationStorage = diskStorage({
//     destination: function (req, file, cb) {
//         const dir = './public/jobApplications';  // Follow your structure
//         mkdir(dir, { recursive: true }, (err) => cb(err, dir));
//     },
//     filename: function (req, file, cb) {
//         const ext = path.extname(file.originalname);
//         const first4Chars = file.originalname.slice(0, 4);
//         cb(null, `${Date.now()}-jobapp-${first4Chars}${ext}`);
//     }
// });
// const jobAppFileFilter = (req, file, cb) => {
//     const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
//     if (allowedTypes.includes(file.mimetype)) cb(null, true);
//     else cb(new Error("Only PDF, JPEG, PNG files are allowed"), false);
// };
// export const jobAppUpload = multer({
//     storage: jobApplicationStorage,
//     fileFilter: jobAppFileFilter,
//     limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
// }).single("file");  // field name must match in form-data


// const blogStorage = diskStorage({
//     destination: function (req, file, cb) {
//         const dir = './public/blogs';
//         mkdir(dir, { recursive: true }, (err) => cb(err, dir));
//     },
//     filename: function (req, file, cb) {
//         const ext = path.extname(file.originalname);
//         const first4Chars = file.originalname.slice(0, 4);
//         cb(null, `${Date.now()}-blog-${first4Chars}${ext}`);
//     }
// });
// export const blogMainImageUpload = multer({
//     storage: blogStorage,
//     fileFilter: (req, file, cb) => {
//         const allowedTypes = /jpeg|jpg|png|webp/;
//         const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//         const mimetype = allowedTypes.test(file.mimetype);

//         if (extname && mimetype) {
//             return cb(null, true);
//         } else {
//             cb(new Error("Only images are allowed (jpeg, jpg, png, webp)"));
//         }
//     },
//     limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
// }).single("mainImage");


// const caseStudyStorage = diskStorage({
//     destination: (req, file, cb) => {
//         const dir = './public/caseStudy';
//         mkdir(dir, { recursive: true }, (err) => cb(err, dir));
//     },
//     filename: (req, file, cb) => {
//         const ext = path.extname(file.originalname);
//         const first4 = file.originalname.slice(0, 4);
//         cb(null, `${Date.now()}-case-${first4}${ext}`);
//     }
// });
// export const caseStudyUpload = multer({
//     storage: caseStudyStorage,
//     limits: { fileSize: 2 * 1024 * 1024 }
// }).fields([
//     { name: "mainImage", maxCount: 1 },
//     { name: "logo", maxCount: 1 },
//     { name: "image", maxCount: 1 },
//     { name: "typographyImage", maxCount: 1 }
// ]);



// import multer from 'multer';
// import path from 'path';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();
import fs from 'fs';
const isProduction = process.env.ENVIRONMENT === 'production';
export const s3 = new S3Client({
    region: process.env.AWS_REGION || "",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
});
const saveLocally = async (file, folderName, filePrefix, fieldname) => {
    console.log(file)
    const timestamp = Date.now();
    const first4Chars = file.originalname.slice(0, 4);
    const ext = file.originalname.includes('.') ? file.originalname.slice(file.originalname.lastIndexOf('.')) : '.jpg';
    const filename = `${filePrefix}-${timestamp}-${first4Chars}${ext}`;
    const localFolder = `${process.cwd()}/public/${folderName}`;
    if (!fs.existsSync(localFolder)) {
        fs.mkdirSync(localFolder, { recursive: true });
    }
    const filePath = `${localFolder}/${filename}`;
    fs.writeFileSync(filePath, file.buffer);
    console.log('s3Url', `http://192.168.29.239:${process.env.PORT}/${folderName}/${filename}`, '::::', 'field:', fieldname);
    return {
        field: fieldname,
        fileName: filename,
        originalName: file.originalname,
        s3Url: `http://192.168.29.239:${process.env.PORT}/${folderName}/${filename}`,
        // s3Url: `https://molimornode-production.up.railway.app/${folderName}/${filename}`,
    };
};
const storage = multer.memoryStorage();
export const createS3Uploader = ({ folderName, filePrefix = '', fieldType = 'single', fieldName, customFields = [], fileSizeMB, } = {}) => {
    const limits = {
        fileSize: fileSizeMB * 1024 * 1024,
    };
    const upload = multer({
        storage,
        limits,
    });
    let multerUpload;
    if (fieldType === 'single') {
        multerUpload = upload.single(fieldName);
    } else if (fieldType === 'array') {
        multerUpload = upload.array(fieldName, customFields?.[0]?.maxCount || 1);
    } else if (fieldType === 'fields') {
        multerUpload = upload.fields(customFields);
    } else {
        throw new Error("Invalid fieldType for uploader");
    };
    return [
        multerUpload,
        async (req, res, next) => {
            try {
                const files = req.files || (req.file ? { [fieldName]: [req.file] } : {});
                req.uploadedImages = [];
                for (const [key, fileArray] of Object.entries(files)) {
                    for (const file of fileArray) {
                        if (isProduction) {
                            const timestamp = Date.now();
                            const first4Chars = file.originalname.slice(0, 4);
                            const ext = path.extname(file.originalname);
                            const isBlob = ext === '.blob'; // or use mimetype check if needed
                            const finalExt = isBlob ? '.jpg' : ext; // Default to .jpg if it's a blob
                            const finalMime = isBlob ? 'image/jpeg' : file.mimetype; // Default to image/jpeg if it's a blob
                            const filename = `${filePrefix}-${timestamp}-${first4Chars}${finalExt}`;
                            const s3Key = `${folderName}/${filename}`;
                            const command = new PutObjectCommand({
                                Bucket: process.env.AWS_BUCKET_NAME,
                                Key: s3Key,
                                Body: file.buffer,
                                ContentType: finalMime,//file.mimetype,//ext,
                                ContentDisposition: "inline",
                            });
                            await s3.send(command);
                            const s3Url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`;
                            req.uploadedImages.push({
                                field: key,
                                fileName: filename,
                                originalName: file.originalname,
                                s3Url,
                            });
                            console.log('[S3 Upload] uploadedImages =>', req.uploadedImages);
                        } else {
                            console.log(file)
                            const localFile = await saveLocally(file, folderName, filePrefix, file.fieldname);
                            req.uploadedImages.push({
                                field: key,
                                ...localFile,
                            });
                        };
                    }
                };
                next();
            } catch (error) {
                console.error('[S3 Upload] Error occurred during file upload:', error);
                next(error);
            };
        },
    ];
};

export const homeBannerenterpriseLogo = createS3Uploader({
    folderName: 'enterpriseLogo',
    filePrefix: 'enterprise-logo',
    fieldType: 'single',
    fieldName: 'image',
    fileSizeMB: 1,
});

export const homeImgVdo = createS3Uploader({
    folderName: 'homeImgVdo',
    filePrefix: 'home-img-vdo',
    fieldType: 'single',
    fieldName: 'media',
    fileSizeMB: 1,
});

export const aboutImgVdo = createS3Uploader({
    folderName: 'aboutMedia',
    filePrefix: 'about-img-vdo',
    fieldType: 'single',
    fieldName: 'media',
    fileSizeMB: 100,
});

export const teamPhotoUpload = createS3Uploader({
    folderName: 'teamMember',
    filePrefix: 'team-member',
    fieldType: 'single',
    fieldName: 'photo',
    fileSizeMB: 1,
});

export const reviewPhotoUpload = createS3Uploader({
    folderName: 'review',
    filePrefix: 'review',
    fieldType: 'single',
    fieldName: 'photo',
    fileSizeMB: 1,
});


export const portfolioPhotoUpload = createS3Uploader({
    folderName: 'portfolio',
    filePrefix: 'portfolio',
    fieldType: 'fields',
    customFields: [
        { name: 'image', maxCount: 1 },
        { name: 'mainImage', maxCount: 1 },
        { name: 'homeImage', maxCount: 1 },
        { name: 'logo', maxCount: 1 },
        { name: 'profileImage', maxCount: 1 },
    ],
    fileSizeMB: 1,
});

export const jobAppUpload = createS3Uploader({
    folderName: 'jobApplications',
    filePrefix: 'job-app',
    fieldType: 'single',
    fieldName: 'file',
    fileSizeMB: 1,
});

// export const blogMainImageUpload = createS3Uploader({
//     folderName: 'blogs',
//     filePrefix: 'blog-main',
//     fieldType: 'single',
//     fieldName: 'mainImage',
//     fileSizeMB: 1,
// });

const maxDetailImages = 10;

const detailImageFields = Array.from({ length: maxDetailImages }, (_, i) => ({
    name: `details[${i}][image]`,
    maxCount: 1
}));
export const blogMainImageUpload = createS3Uploader({
    folderName: 'blogs',
    filePrefix: 'blogs',
    fieldType: 'fields',
    customFields: [
        { name: 'mainImage', maxCount: 1 },
        ...detailImageFields
    ],
    fileSizeMB: 1,
});

export const caseStudyUpload = createS3Uploader({
    folderName: 'caseStudy',
    filePrefix: 'case-study',
    fieldType: 'fields',
    customFields: [
        { name: 'mainImage', maxCount: 1 },
        { name: 'logo', maxCount: 1 },
        { name: "colorImage", maxCount: 1 },
        { name: "mobTypographyImage", maxCount: 1 },
        { name: "typographyImage", maxCount: 1 }
    ],
    fileSizeMB: 1,
});
