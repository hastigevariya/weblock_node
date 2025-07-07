import express from "express";
import { addBlog, getAllBlogs, getBlogById, deleteBlog } from "../controllers/blogController.js";
import { blogMainImageUpload } from "../utils/multer.js";
import { validateAccessToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/addBlog", validateAccessToken, blogMainImageUpload, addBlog);
router.get("/getAllBlogs", getAllBlogs);
router.get("/getBlogById/:id", getBlogById);
router.delete("/deleteBlog/:id", deleteBlog);

export default router;
