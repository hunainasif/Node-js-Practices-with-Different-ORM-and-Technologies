import express from "express";
import {
  createUser,
  getSingleUser,
  loginUser,
} from "../controllers/user.controller";
const router = express.Router();

router.post("/createUser", createUser);

router.post("/loginUser", loginUser);

router.get("/getSingleUser/:id", getSingleUser);

export default router;
