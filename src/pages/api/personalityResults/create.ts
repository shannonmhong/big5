import { PersonalityResult, PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { ValidatedNextApiRequest } from "../../../../prisma/interfaces";

// Initialize Prisma Client
const prisma = new PrismaClient();

export type CreateResultDTO = {
  id: number;
  user: User;
  userId: number;
  OpennessScore: number;
  ConscientiousnessScore: number;
  ExtraversionScore: number;
  AgreeablenessScore: number;
  NeuroticismScore: number;
};

export const createResult = async (
  personalityResult: CreateResultDTO
): Promise<PersonalityResult | null> => {
  let newResult;
  newResult = await prisma.personalityResult.create({
    data: {
      user: {
        connect: {
          id: personalityResult.userId,
        },
      },
      OpennessScore: personalityResult.OpennessScore,
      ConscientiousnessScore: personalityResult.ConscientiousnessScore,
      ExtraversionScore: personalityResult.ExtraversionScore,
      AgreeablenessScore: personalityResult.AgreeablenessScore,
      NeuroticismScore: personalityResult.NeuroticismScore,
    },
  });
  if (!newResult) {
    return null;
  }
  return newResult;
};

const handler = async (
  req: ValidatedNextApiRequest<CreateResultDTO>,
  res: NextApiResponse
): Promise<void> => {
  try {
    const newResult = await createResult(req.body);
    if (newResult) {
      res.status(200).json(newResult);
    } else {
      res.status(404).json({
        statusCode: 404,
        message: "Could not submit personality result data",
      });
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
