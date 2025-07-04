'use strict'
import { Router } from "express";
import auth from "./authRoutes.js";
import enterpriseRoutes from "../routes/enterpriseRoutes.js";
import homeRoutes from "../routes/homeRoutes.js"
import aboutRoutes from "../routes/aboutRoutes.js"
import teamRoutes from "../routes/teamRoutes.js"

const router = Router();
router.use("/auth", auth);
router.use("/enterprise", enterpriseRoutes);
router.use("/home", homeRoutes);
router.use("/about", aboutRoutes);
router.use("/team", teamRoutes);

export default router;