import { Router } from "express";
const router = Router();
import { addHomeImgVdo } from "../controllers/homecontroller.js";
import { homeImgVdo } from "../utils/multer.js";
import { validateAccessToken } from "../middleware/auth.js";

router.post("/addHomeImgVdo", homeImgVdo, validateAccessToken, addHomeImgVdo);

export default router;
