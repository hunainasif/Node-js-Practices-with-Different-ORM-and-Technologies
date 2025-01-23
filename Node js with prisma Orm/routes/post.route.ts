import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getSinglePost,
  updatePost,
} from "../controllers/post.controller";
const router = express.Router();

router.post("/createPost", createPost);

router.get("/getAllPosts", getAllPosts);

router.get("/getSinglePost/:id", getSinglePost);

router.put("/updatePost/:id", updatePost);

router.delete("/deleteUser/:id", deletePost);

export default router;
