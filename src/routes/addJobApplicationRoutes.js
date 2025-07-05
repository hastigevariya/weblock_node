import express from "express";
import {
    addJobApplication,
    getAllJobApplications,
    getJobApplicationById,
    deleteJobApplication
} from "../controllers/addJobApplicationController.js";
import { validateAccessToken } from "../middleware/auth.js";
import { jobAppUpload } from "../utils/multer.js";
const router = express.Router();

router.post("/addJobApplication", validateAccessToken, jobAppUpload, addJobApplication);
router.get("/getAllJobApplications", validateAccessToken, getAllJobApplications);
router.get("/getJobApplicationById/:id", validateAccessToken, getJobApplicationById);
router.delete("/deleteJobApplication/:id", validateAccessToken, deleteJobApplication);

export default router;
