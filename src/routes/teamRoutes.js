import { Router } from "express";
const router = Router();
import { addTeamMember, updateTeamMember, getAllTeamMember, getTeamMemberById, deleteTeamMember } from "../controllers/teamController.js";
import { validateAccessToken } from "../middleware/auth.js";
import { teamPhotoUpload } from "../utils/multer.js";

// router.post("/addTeamMember", validateAccessToken, addTeamMember);
router.post("/addTeamMember", validateAccessToken, teamPhotoUpload, addTeamMember);
router.put("/updateTeamMember/:id", teamPhotoUpload, updateTeamMember);
router.get("/getAllTeamMember", getAllTeamMember);
router.get("/getTeamMemberById/:id", getTeamMemberById);
router.delete("/deleteTeamMember/:id", deleteTeamMember);

export default router;
