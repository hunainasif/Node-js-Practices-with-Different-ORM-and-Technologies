import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// createUser
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json("Please Register with comleter credentials");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
      },
    });
    const data = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(data, `heyiamthedeveloper`);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

// loginUser

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json("Internal Server Error");
    }

    let user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      res.status(400).json("Please login with correct credentials");
      return;
    }

    let passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      res.status(400).json("Please Login with correct credentials");
      return;
    }

    const data = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(data, `heyiamthedeveloper`);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

// getSingleUser

export const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        posts: true,
      },
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};
