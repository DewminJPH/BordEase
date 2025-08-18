import express from "express";
import {registerUser,loginUser, getUserDetails, logout} from "../controllers/userController.js"; 

const router=express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/getUserDetails",getUserDetails);
router.get("/logout",logout);

export default router;