import { Router } from "express";
const router = Router();
import { addHomeImgVdo, getAllHomeImgVdo, deleteHomeImgVdo } from "../controllers/homeController.js";
import { homeImgVdo } from "../utils/multer.js";
import { validateAccessToken } from "../middleware/auth.js";

router.post("/addHomeImgVdo", homeImgVdo, validateAccessToken, addHomeImgVdo);
router.get("/getAllHomeImgVdo", validateAccessToken, getAllHomeImgVdo);
router.get("/deleteHomeImgVdo", validateAccessToken, deleteHomeImgVdo);

export default router;
