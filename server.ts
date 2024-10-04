import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connect from './src/db/connect';
import userRoutes from './src/routes/userRoutes'
import taskRoutes from "./src/routes/taskRoutes"

dotenv.config(); 
connect(); 

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions: cors.CorsOptions = {
    origin: process.env.ORIGIN || "*",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization,Course-Id",
    optionsSuccessStatus: 200,
};

app.use('*', cors(corsOptions));

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", process.env.ORIGIN || "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});


app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});