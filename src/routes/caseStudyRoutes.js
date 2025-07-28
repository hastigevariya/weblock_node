import express from "express";
import { addCaseStudy, getAllCaseStudy, getCaseStudyById, deleteCaseStudy,updateCaseStudyById } from "../controllers/caseStudyController.js";
import { validateAccessToken } from "../middleware/auth.js";
import { caseStudyUpload } from "../utils/multer.js";

const router = express.Router();

router.post("/addCaseStudy", validateAccessToken, caseStudyUpload, addCaseStudy);
router.get("/getAllCaseStudy", getAllCaseStudy);
router.get("/getCaseStudyById/:id", getCaseStudyById);
router.put("/updateCaseStudyById/:id", caseStudyUpload, updateCaseStudyById);
router.delete("/deleteCaseStudy/:id", deleteCaseStudy);

export default router;
