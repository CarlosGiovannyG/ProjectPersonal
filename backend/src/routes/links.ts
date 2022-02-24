import { Router } from "express";
import LinksController from "../controller/LinksController";
import moduleJwt from "../middleware/jwt";
import checkRole from "../middleware/role";

const router = Router();

// Create new link
router.post("/", [moduleJwt.checkJwt], LinksController.newLink);

// Get all links
router.get(
  "/",
  [moduleJwt.checkJwt, checkRole(["admin"])],
  LinksController.getAll
);

// Get one link
router.get("/:id", [moduleJwt.checkJwt], LinksController.getById);

// Get one link
router.get("/:id/user", [moduleJwt.checkJwt], LinksController.getByIdUser);

// Edit link
router.patch("/:id", [moduleJwt.checkJwt], LinksController.editLink);

// Delete link
router.delete("/:id", [moduleJwt.checkJwt], LinksController.deleteLink);

export default router;
