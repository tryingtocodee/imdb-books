//import packages
import express from "express"

//import files
import { signUpController , loginController , logoutController } from "../controller/authController.js"
import protectedRoutes from "../middleware/protectedRoutes.js"

const router = express.Router()

router.post("/signup" , protectedRoutes , signUpController )

router.post("/login" , protectedRoutes , loginController )

router.post("/logout" , protectedRoutes , logoutController )

export default router