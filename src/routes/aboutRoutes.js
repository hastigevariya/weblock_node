import express from "express";
import { addAboutMedia, getActiveAboutMedia } from "../controllers/aboutController.js";
import { aboutImgVdo } from "../utils/multer.js";

const router = express.Router();

router.post("/addAboutMedia", aboutImgVdo, addAboutMedia);
router.get("/getAboutMedia", getActiveAboutMedia);

export default router;