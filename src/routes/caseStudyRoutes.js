import express from "express";
import { addCaseStudy, getAllCaseStudy, getCaseStudyById, deleteCaseStudy } from "../controllers/caseStudyController.js";
import { validateAccessToken } from "../middleware/auth.js";
import { caseStudyUpload } from "../utils/multer.js";

const router = express.Router();

router.post("/addCaseStudy", validateAccessToken, caseStudyUpload, addCaseStudy);
router.get("/getAllCaseStudy", validateAccessToken, getAllCaseStudy);
router.get("/getCaseStudyById/:id", validateAccessToken, getCaseStudyById);
router.delete("/deleteCaseStudy/:id", validateAccessToken, deleteCaseStudy);


export default router;
