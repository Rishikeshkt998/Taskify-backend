
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
const generateToken = ( id: Types.ObjectId): string => {
    if (!process.env.JWT_SECRET_KEY) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "30d",
    });
};

export default generateToken;