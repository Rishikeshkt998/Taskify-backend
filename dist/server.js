"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const connect_1 = __importDefault(require("./src/db/connect"));
const userRoutes_1 = __importDefault(require("./src/routes/userRoutes"));
const taskRoutes_1 = __importDefault(require("./src/routes/taskRoutes"));
dotenv_1.default.config();
(0, connect_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const corsOptions = {
    origin: process.env.ORIGIN || "*",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization,Course-Id",
    optionsSuccessStatus: 200,
};
app.use('*', (0, cors_1.default)(corsOptions));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", process.env.ORIGIN || "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});
app.use('/api/users', userRoutes_1.default);
app.use('/api/tasks', taskRoutes_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
