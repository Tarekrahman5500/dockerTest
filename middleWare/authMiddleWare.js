import jwt from "jsonwebtoken";
import User from "../models/userModel";

export const protect = async(req, res, next) => {
   try {
        const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            status: 'error',
            message: 'Authentication required',
        });
    }

    const token = authHeader.split(' ')[1]; // Extract the token from the "Bearer" header

    if (!token) {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid token format',
        });
    }

    const decodedToken = await new Promise((resolve, reject) => {
            jwt.verify(token, 'your-secret-key', (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        });

        // The decoded token should contain user information (e.g., userId, username)
        const { userId } = decodedToken;

        // Check if the user exists in the database
        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'User not found',
            });
        }

        // Attach user information to the request object
        req.user = user;

        // Continue to the next middleware or route
        next();
   } catch (err) {
       next(err)
   }
}