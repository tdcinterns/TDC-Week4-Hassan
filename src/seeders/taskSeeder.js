const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const generateRandomUser = async () => {
  const randomUsername = `user_${Math.floor(Math.random() * 1000)}`;
  const randomname = `user_${Math.floor(Math.random() * 1000)}`;

  return {
    title: randomUsername,
    description: randomname
  };
};

const seedData = async () => {
  try {
    const numberOfUsers = 10; 

    for (let i = 0; i < numberOfUsers; i++) {
      const randomUser = await generateRandomUser();
      await prisma.task.create({
        data: randomUser,
      });
    }

    console.log(`Seed data inserted successfully with ${numberOfUsers} random users`);
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
};

seedData();
