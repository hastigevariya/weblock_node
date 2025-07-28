import express from "express";
import { addPortfolio, getAllPortfolio, deletePortfolio, getPortfolioById,updatePortfolioById } from "../controllers/portfolioController.js";
import { portfolioPhotoUpload } from "../utils/multer.js";
import { validateAccessToken } from "../middleware/auth.js";

const router = express.Router();


router.post("/addPortfolio", validateAccessToken, portfolioPhotoUpload, addPortfolio);
router.get("/getAllPortfolio", getAllPortfolio);
router.get("/getPortfolioById/:id", getPortfolioById);
router.put("/updatePortfolioById/:id",portfolioPhotoUpload, updatePortfolioById);
router.delete("/deletePortfolio/:id", deletePortfolio);

export default router;
