const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authenticateUser = async (req, res, next) => {
    try {
        // Get the token from the request headers
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Authorization token is missing' });
        }

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the user ID to the request for further use
        req.userId = decodedToken.userId;

        // Check if the user exists in the database (optional)
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid token. User not found' });
        }

        // Continue with the next middleware or route handler
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = { authenticateUser };
