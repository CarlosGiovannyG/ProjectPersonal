import { Router } from "express";
import UserController from "../controller/UserController";
import moduleJwt from "../middleware/jwt";
import checkRole from "../middleware/role";

const router = Router();

// Create new user
router.post("/", UserController.newUser);

// Get all Users
router.get(
  "/",
  [moduleJwt.checkJwt, checkRole(["admin"])],
  UserController.getAll
);

// Get one user
router.get("/:id", [moduleJwt.checkJwt], UserController.getById);

// Edit user
router.patch("/:id", [moduleJwt.checkJwt], UserController.editUser);

// Delete user
router.delete(
  "/:id",
  [moduleJwt.checkJwt, checkRole(["admin"])],
  UserController.deleteUser
);

export default router;
