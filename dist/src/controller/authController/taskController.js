"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTasksForTeamMember = exports.deleteTask = exports.getTasksExcludingManagerId = exports.getTasksByManagerId = exports.addTaskAssign = exports.updateTask = exports.addTask = void 0;
const taskModel_1 = __importDefault(require("../../models/auth/taskModel"));
const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, mangerid, date, stage, priority } = req.body;
    const newTask = new taskModel_1.default({
        title,
        mangerid,
        date,
        stage,
        priority,
    });
    try {
        const savedTask = yield newTask.save();
        res.status(201).json({
            success: true,
            task: savedTask,
        });
    }
    catch (error) {
        res.status(400).json({ message: 'Error adding task', error });
    }
});
exports.addTask = addTask;
const addTaskAssign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, date, team, stage, priority } = req.body;
    const newTask = new taskModel_1.default({
        title,
        date,
        team,
        stage,
        priority,
    });
    try {
        const savedTask = yield newTask.save();
        res.status(201).json({
            success: true,
            task: savedTask,
        });
    }
    catch (error) {
        res.status(400).json({ message: 'Error adding task', error });
    }
});
exports.addTaskAssign = addTaskAssign;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, title, mangerid, date, stage, priority } = req.body;
    console.log("valuess", req.body);
    try {
        const updatedTask = yield taskModel_1.default.findByIdAndUpdate(id, {
            title,
            mangerid,
            date,
            stage,
            priority,
        }, { new: true, runValidators: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({
            success: true,
            task: updatedTask,
        });
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating task', error });
    }
});
exports.updateTask = updateTask;
const getTasksByManagerId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const managerid = req.params.managerid;
    try {
        const tasks = yield taskModel_1.default.find({ mangerid: managerid });
        console.log("taskvalue", tasks);
        if (!tasks || tasks.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No tasks found for this manager.",
            });
        }
        return res.status(200).json({
            success: true,
            tasks,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching tasks.",
        });
    }
});
exports.getTasksByManagerId = getTasksByManagerId;
const getTasksExcludingManagerId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield taskModel_1.default.find({ mangerid: { $exists: false } }).populate("team").exec();
        ;
        console.log("Excluded tasks:", tasks);
        if (!tasks || tasks.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No tasks found excluding the managerid field.",
            });
        }
        return res.status(200).json({
            success: true,
            tasks,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error fetching tasks.",
            error,
        });
    }
});
exports.getTasksExcludingManagerId = getTasksExcludingManagerId;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedTask = yield taskModel_1.default.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found.",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Task deleted successfully.",
            deletedTask,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error deleting task.",
            error,
        });
    }
});
exports.deleteTask = deleteTask;
const getTasksForTeamMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const tasks = yield taskModel_1.default.find({ team: { $in: [id] } });
        if (!tasks || tasks.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No tasks found for this team member.",
            });
        }
        return res.status(200).json({
            success: true,
            tasks,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching tasks.",
            error,
        });
    }
});
exports.getTasksForTeamMember = getTasksForTeamMember;
