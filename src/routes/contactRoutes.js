import express from "express";
import { addContact, getAllContacts, markContact,addSubscribe,getAllSubscribe } from "../controllers/contactController.js";
import { validateAccessToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/addContact", validateAccessToken, addContact);
router.get("/getAllContacts", validateAccessToken, getAllContacts);
router.delete("/markContact/:id", validateAccessToken, markContact);

router.post('/addSubscribe', addSubscribe);
router.get('/getAllSubscribe', validateAccessToken, getAllSubscribe);

export default router;
