const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

const prisma = new PrismaClient(); 

app.use(express.json());

// Routes
app.use('/api/users', taskRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Close Prisma client when the application exits
process.on('beforeExit', async () => {
    await prisma.$disconnect();
});

module.exports = app;