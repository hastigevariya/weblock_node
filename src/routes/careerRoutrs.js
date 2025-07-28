import express from "express";
import { addCareer, getAllCareer, deleteCareer, getCareerById,updateCareerById } from "../controllers/careerController.js";
import { validateAccessToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/addCareer", validateAccessToken, addCareer);
router.get("/getAllCareer", getAllCareer);
router.get("/getCareerById/:id", getCareerById);
router.put("/updateCareerById/:id", updateCareerById)
router.delete("/deleteCareer/:id", deleteCareer);

export default router;
