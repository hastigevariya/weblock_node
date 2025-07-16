'use strict'
import { Router } from "express";
import auth from "./authRoutes.js";
import enterpriseRoutes from "../routes/enterpriseRoutes.js";
import homeRoutes from "../routes/homeRoutes.js";
import aboutRoutes from "../routes/aboutRoutes.js";
import teamRoutes from "../routes/teamRoutes.js";
import reviewRoutes from "../routes/reviewRoutes.js";
import portfolioRoutes from "../routes/portfolioRoutes.js";
import careerRoutrs from "../routes/careerRoutrs.js";
import jobRoutes from "../routes/jobRoutes.js";
import blogRoutes from "../routes/blogRoutes.js";
import contactRoutes from "../routes/contactRoutes.js";
import caseStudyRoutes from "../routes/caseStudyRoutes.js"

const router = Router();
router.use("/auth", auth);
router.use("/enterprise", enterpriseRoutes);
router.use("/home", homeRoutes);
router.use("/about", aboutRoutes);
router.use("/team", teamRoutes);
router.use("/review", reviewRoutes);
router.use("/portfolio", portfolioRoutes);
router.use("/career", careerRoutrs);
router.use("/addjobapplication", jobRoutes);
router.use("/blog", blogRoutes);
router.use("/contact", contactRoutes);
router.use("/caseStudy", caseStudyRoutes)

export default router;