import express from "express"
import { getMessage, sendMessage } from "../controller/MessageController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.post("/sendMessage/:id", isAuthenticated, sendMessage);
router.get("/:id", isAuthenticated, getMessage);


export default router;