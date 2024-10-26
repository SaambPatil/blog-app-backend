import express from "express";
const router = express.Router();

import {
  createUser,
  getAllUsers,
  getUserById,
  deleteAllUsers,
  deleteUserById,
} from "../controllers/userControllers.mjs";


router.post("/users", createUser);
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.delete("/users", deleteAllUsers);
router.delete("/users/:id", deleteUserById);

export default router;
