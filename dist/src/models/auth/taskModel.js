"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const taskSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    mangerid: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    date: { type: Date, default: () => new Date() },
    priority: {
        type: String,
        default: "NORMAL",
        enum: ["HIGH", "MEDIUM", "NORMAL", "LOW"],
    },
    stage: {
        type: String,
        default: "TODO",
        enum: ["TODO", "IN PROGRESS", "COMPLETED"],
    },
    activities: [
        {
            type: {
                type: String,
                default: "assigned",
                enum: ["assigned", "started", "in progress", "bug", "completed", "commented"],
            },
            activity: { type: String },
            date: { type: Date, default: () => new Date() },
            by: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
        },
    ],
    team: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    isTrashed: { type: Boolean, default: false },
}, { timestamps: true });
const Task = mongoose_1.default.model("Task", taskSchema);
exports.default = Task;
