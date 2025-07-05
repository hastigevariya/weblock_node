import express from "express";
import { addCareer, getAllCareer, deleteCareer, getCareerById } from "../controllers/careerController.js";
import { validateAccessToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/addCareer", validateAccessToken, addCareer);
router.get("/getAllCareer", validateAccessToken, getAllCareer);
router.get("/getCareerById/:id", validateAccessToken, getCareerById)
router.delete("/deleteCareer/:id", validateAccessToken, deleteCareer);

export default router;
