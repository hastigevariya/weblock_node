'use strict'
import { Router } from "express";
import auth from "./authRoutes.js";
import enterpriseRoutes from "../routes/enterpriseRoutes.js";
import homeRoutes from "../routes/homeRoutes.js"


const router = Router();
router.use("/auth", auth);
router.use("/enterprise", enterpriseRoutes);
router.use("/home", homeRoutes);

export default router;