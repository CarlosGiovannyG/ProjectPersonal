import { Router } from "express";
import AuthController from "../controller/AuthControllers";
import moduleJwt from "../middleware/jwt";

const router = Router();

//login
router.post("/login", AuthController.login);

//login
router.post("/refresh-token", AuthController.refreshToken);

//Forgot password
router.put("/forgot-password", AuthController.forgotPassword);

//Create new password
router.put("/new-password", AuthController.createNewPassword);

//Change password
router.post(
  "/change-password",
  [moduleJwt.checkJwt],
  AuthController.changePassword
);

export default router;
