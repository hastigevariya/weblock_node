import express from "express";
import { addAboutMedia, getActiveAboutMedia } from "../controllers/aboutController.js";
import { aboutImgVdo } from "../utils/multer.js";

const router = express.Router();

router.post("/addAboutMedia", aboutImgVdo, addAboutMedia);
router.get("/getAboutMedia", getActiveAboutMedia);

export default router;

// const mainImage = req.uploadedImages.find(file => file.field === 'mainImage');
//     req.body.mainImage = mainImage?.s3Url;

//     const imageUrls = req.uploadedImages.filter(file => file.field === 'image').map(file => file.s3Url);
