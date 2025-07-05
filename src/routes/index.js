'use strict'
import { Router } from "express";
import auth from "./authRoutes.js";
import enterpriseRoutes from "../routes/enterpriseRoutes.js";
import homeRoutes from "../routes/homeRoutes.js"
import aboutRoutes from "../routes/aboutRoutes.js"
import teamRoutes from "../routes/teamRoutes.js"
import review from "../routes/reviewRoutes.js"
import portfolio from "../routes/portfolioRoutes.js"
import career from "../routes/careerRoutrs.js";


const router = Router();
router.use("/auth", auth);
router.use("/enterprise", enterpriseRoutes);
router.use("/home", homeRoutes);
router.use("/about", aboutRoutes);
router.use("/team", teamRoutes);
router.use("/review", review);
router.use("/portfolio", portfolio);
router.use("/career", career)

export default router;