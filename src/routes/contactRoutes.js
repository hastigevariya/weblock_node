import express from "express";
import { addContact, getAllContacts, markContact } from "../controllers/contactController.js";
import { validateAccessToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/addContact", validateAccessToken, addContact);
router.get("/getAllContacts", validateAccessToken, getAllContacts);
router.delete("/markContact/:id", validateAccessToken, markContact);

export default router;
