import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma";

// createPost
export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, userId } = req.body;

    if (!title || !description || !userId) {
      res.status(400).json("Pleas fill the form correctly");
      return;
    }

    const post = await prisma.posts.create({
      data: {
        title,
        description,
        userId,
      },
    });
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

// getAllPosts

export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await prisma.posts.findMany();

    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

// getSinglePost

export const getSinglePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await prisma.posts.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json("Internal Server error");
  }
};

// updatePost

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description } = req.body;
    const updatePost = await prisma.posts.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        title,
        description,
      },
    });
    res.status(200).json({ updatePost });
  } catch (error) {
    res.status(500).json("Internal Server error");
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await prisma.posts.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json("Post Deleted");
  } catch (error) {
    res.status(500).json("Internal Server error");
  }
};
