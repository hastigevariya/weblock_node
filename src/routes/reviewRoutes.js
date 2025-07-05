import express from "express";
import { addReview, getAllReviews, deleteReview } from "../controllers/reviewController.js";
import { reviewPhotoUpload } from "../utils/multer.js";
import { validateAccessToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/addReview", validateAccessToken, reviewPhotoUpload, addReview);
router.get("/getAllReviews", validateAccessToken, getAllReviews);
router.delete("/deleteReview/:id", validateAccessToken, deleteReview);

export default router;
