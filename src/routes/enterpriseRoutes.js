import { Router } from "express";
const router = Router();
import {
    addEnterpriseLogo,
    getAllEnterpriseLogo,
    deleteEnterpriseLogo
} from "../controllers/enterpriseController.js";
import { validateAccessToken } from "../middleware/auth.js";
import { homeBannerenterpriseLogo } from "../utils/multer.js";
router.post("/addEnterpriseLogo", homeBannerenterpriseLogo, validateAccessToken, addEnterpriseLogo);
router.get("/getAllEnterpriseLogo", getAllEnterpriseLogo);
router.delete("/deleteEnterpriseLogo/:id", deleteEnterpriseLogo);
export default router;
