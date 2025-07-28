import express from "express";
import { addReview, getAllReviews, deleteReview,getReviewById,updateReviewById } from "../controllers/reviewController.js";
import { reviewPhotoUpload } from "../utils/multer.js";
import { validateAccessToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/addReview", validateAccessToken, reviewPhotoUpload, addReview);
router.get("/getAllReviews", getAllReviews);
router.get("/getReviewById/:id", getReviewById);
router.put("/updateReviewById/:id",reviewPhotoUpload, updateReviewById);
router.delete("/deleteReview/:id", deleteReview);

export default router;
