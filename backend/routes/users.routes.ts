import { Router } from "express";
import {
  getUserByIdController,
  listUsersController,
  loginUserController,
  registerUserController,
} from "../controllers/users.controller.js";
import {
  validateLoginUser,
  validateRegisterUser,
} from "../middlewares/users.middlewares.js";

const router = Router();

router.post("/auth/register", validateRegisterUser, registerUserController);
router.post("/auth/login", validateLoginUser, loginUserController);
router.get("/", listUsersController);
router.get("/:id", getUserByIdController);

export default router;