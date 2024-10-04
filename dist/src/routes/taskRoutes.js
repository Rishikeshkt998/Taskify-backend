"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = require("../controller/authController/taskController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/', authMiddleware_1.protect, (req, res, next) => {
    (0, taskController_1.addTask)(req, res);
});
router.post('/assign', authMiddleware_1.protect, (req, res, next) => {
    (0, taskController_1.addTaskAssign)(req, res);
});
router.put('/edit', authMiddleware_1.protect, (req, res, next) => {
    (0, taskController_1.updateTask)(req, res);
});
router.put('/edituser', authMiddleware_1.protect, (req, res, next) => {
    (0, taskController_1.updateTaskForUser)(req, res);
});
router.get('/gettask/:managerid', authMiddleware_1.protect, (req, res, next) => {
    (0, taskController_1.getTasksByManagerId)(req, res);
});
router.get('/assigned', authMiddleware_1.protect, (req, res, next) => {
    (0, taskController_1.getTasksExcludingManagerId)(req, res);
});
router.delete('/deletetask/:id', authMiddleware_1.protect, (req, res, next) => {
    (0, taskController_1.deleteTask)(req, res);
});
router.get('/employee/:id', authMiddleware_1.protect, (req, res, next) => {
    (0, taskController_1.getTasksForTeamMember)(req, res);
});
exports.default = router;
