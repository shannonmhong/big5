import seedrandom, { PRNG } from "seedrandom";
import { PrismaClient } from "@prisma/client";
import { User, PersonalityResult } from "@prisma/client";

const prisma = new PrismaClient();
import { faker } from "@faker-js/faker";

// Function to seed faker with a specific seed
const seedFaker = (seed: PRNG | null) => {
  if (seed) {
    faker.seed(seed() * 10);
  }
};

export const generateRandomUserData = () => {
  const num = seedrandom();
  seedFaker(num);
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const age = faker.number.int({ min: 18, max: 80 });
  const zipCode = faker.location.zipCode();
  const race = faker.helpers.arrayElement([
    "White",
    "Black",
    "Asian",
    "American Indian or Alaska Native",
    "Native Hawaiian or other Pacific Islander",
    "Other",
  ]);

  return {
    firstName,
    lastName,
    age,
    zipCode,
    race,
  };
};

export const generateRandomPersonalityResultData = (userId: number) => {
  const num = seedrandom();
  seedFaker(num);

  const opennessScore = faker.number.int({ min: 0, max: 100 });
  const conscientiousnessScore = faker.number.int({ min: 0, max: 100 });
  const extraversionScore = faker.number.int({ min: 0, max: 100 });
  const agreeablenessScore = faker.number.int({ min: 0, max: 100 });
  const neuroticismScore = faker.number.int({ min: 0, max: 100 });

  return {
    userId,
    OpennessScore: opennessScore,
    ConscientiousnessScore: conscientiousnessScore,
    ExtraversionScore: extraversionScore,
    AgreeablenessScore: agreeablenessScore,
    NeuroticismScore: neuroticismScore,
  };
};

async function seedDatabase() {
  // Initialize a counter
  let idCounter: number = 1;

  // Function to generate a unique numerical ID
  function generateUniqueId(): number {
    return idCounter++;
  }
  try {
    // Create users and personality results
    const users: User[] = [];
    const personalityResults: PersonalityResult[] = [];

    for (let i = 0; i < 10; i++) {
      const uniqueId: number = generateUniqueId();
      const userData = generateRandomUserData();
      const personalityResultData =
        generateRandomPersonalityResultData(uniqueId);

      const user = await prisma.user.create({
        data: userData,
      });

      const personalityResult = await prisma.personalityResult.create({
        data: {
          ...personalityResultData,
        },
      });

      users.push(user);
      personalityResults.push(personalityResult);
    }

    console.log("Seed script executed successfully.");

    // Close Prisma client
    await prisma.$disconnect();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seedDatabase();
