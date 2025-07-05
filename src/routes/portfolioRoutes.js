import express from "express";
import { addPortfolio, getAllPortfolio, deletePortfolio, getPortfolioById } from "../controllers/portfolioController.js";
import { portfolioPhotoUpload } from "../utils/multer.js";
import { validateAccessToken } from "../middleware/auth.js";

const router = express.Router();


router.post("/addPortfolio", validateAccessToken, portfolioPhotoUpload, addPortfolio);
router.get("/getAllPortfolio", validateAccessToken, getAllPortfolio);
router.get("/getPortfolioById/:id", validateAccessToken, getPortfolioById);
router.delete("/deletePortfolio/:id", validateAccessToken, deletePortfolio);

export default router;
