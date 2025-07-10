import  express, { Router } from "express"
import UserController from "../controllers/userController"
import errorHandler from "../services/errorHandler"
const router:Router = express.Router()


router.route("/register").post(errorHandler(UserController.register))
router.route("/forgot-password").post(UserController.handleForgotPassword)
router.route("/verify-otp").post(UserController.verifyOtp)
router.route("/reset-password").post(UserController.resetPassword)
export default router