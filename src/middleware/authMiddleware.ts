import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from "../models/auth/userModel"
import asyncHandler from 'express-async-handler';
dotenv.config()
declare global {
    namespace Express {
        interface Request {
            user?: any; 
        }
    }
}
const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            console.log(token, 'hiii');
            console.log("hiiii",process.env.JWT_SECRET_KEY)
            // const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as { id: string };
            // req.user = await User.findById(decoded.id).select('-password');
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as { id: string };
            console.log('Decoded ID:', decoded); 
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

export { protect };
