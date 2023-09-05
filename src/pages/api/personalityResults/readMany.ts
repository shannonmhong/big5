import { PersonalityResult, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

// Initialize Prisma Client
const prisma = new PrismaClient();

export type ReadManyResultsDTO = {
  results: PersonalityResult[];
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const results = await prisma.personalityResult.findMany();

    if (!results) {
      res
        .status(404)
        .json({ statusCode: 404, message: "Results do not exist." });
    } else {
      res.json({
        results: results,
      } as ReadManyResultsDTO);
    }
  } catch (err: any) {
    res.status(500);
    res.json({ statusCode: 500, message: err.message });
  }
};
