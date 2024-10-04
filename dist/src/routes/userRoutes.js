"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/authController/userController"); // Import named exports
const router = express_1.default.Router();
router.post('/', (req, res, next) => {
    (0, userController_1.registerUser)(req, res);
});
router.post('/login', (req, res, next) => {
    (0, userController_1.authUser)(req, res);
});
router.get('/user', (req, res, next) => {
    (0, userController_1.getUsers)(req, res);
});
exports.default = router;
