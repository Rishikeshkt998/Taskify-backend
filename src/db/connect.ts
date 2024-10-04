import mongoose from "mongoose";
const connect = async (): Promise<void> => {
    try {
        console.log("Attempting to connect to the database.....");
        const mongoUri = process.env.MONGO_URI;

        if (!mongoUri) {
            throw new Error("MONGO_URI is not defined in the environment variables.");
        }
        await mongoose.connect(mongoUri, {});
        console.log("Connected to the database.....");
    } catch (error: any) {
        console.log("Failed to connect to the database.....", error.message);
        process.exit(1);
    }
};

export default connect;