import express from "express"
import { getRegisteredUser, login, logout, register } from "../controller/UserController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();


// router.get("/getUsers", getAllUsers);

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/", isAuthenticated, getRegisteredUser);



export default router;