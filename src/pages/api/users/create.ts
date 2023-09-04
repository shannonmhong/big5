import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { ValidatedNextApiRequest } from "../../../../prisma/interfaces";

// Initialize Prisma Client
const prisma = new PrismaClient();

export type CreateUserDTO = {
  firstName?: string;
  lastName?: string;
  age?: number;
  zipCode?: string;
  ethnicity?: string;
};

export const createUser = async (user: CreateUserDTO): Promise<User | null> => {
  let newUser;
  newUser = await prisma.user.create({
    data: {
      firstName: user?.firstName || undefined,
      lastName: user?.lastName || undefined,
      age: user?.age || undefined,
      zipCode: user?.zipCode || undefined,
      ethnicity: user?.ethnicity || undefined,
    },
  });
  if (!newUser) {
    return null;
  }
  return newUser;
};

const handler = async (
  req: ValidatedNextApiRequest<CreateUserDTO>,
  res: NextApiResponse
): Promise<void> => {
  try {
    const newUser = await createUser(req.body);
    if (newUser) {
      res.status(200).json(newUser);
    } else {
      res
        .status(404)
        .json({ statusCode: 404, message: "Could not create user" });
    }
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  handler(req as NextApiRequest, res);
};
