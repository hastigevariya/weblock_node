import { Router } from "express";
const router = Router();
import { addTeamMember, updateTeamMember, getAllTeamMember, getTeamMemberById, deleteTeamMember } from "../controllers/teamController.js";
import { validateAccessToken } from "../middleware/auth.js";
import { teamPhotoUpload } from "../utils/multer.js";

// router.post("/addTeamMember", validateAccessToken, addTeamMember);
router.post("/addTeamMember", teamPhotoUpload, addTeamMember);
router.put("/updateTeamMember/:id", teamPhotoUpload, validateAccessToken, updateTeamMember);
router.get("/getAllTeamMember", validateAccessToken, getAllTeamMember);
router.get("/getTeamMemberById/:id", validateAccessToken, getTeamMemberById);
router.delete("/deleteTeamMember/:id", validateAccessToken, deleteTeamMember);

export default router;
