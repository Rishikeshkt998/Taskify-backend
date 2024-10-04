import mongoose, { Schema, Document, Types } from "mongoose";
interface IActivity {
    type: "assigned" | "started" | "in progress" | "bug" | "completed" | "commented";
    activity: string;
    date: Date;
    by: Types.ObjectId; 
}

interface ISubTask {
    title: string;
    date: Date;
    tag: string;
}
export interface ITask extends Document {
    title: string;
    mangerid: Types.ObjectId;
    date: Date;
    priority: "HIGH" | "MEDIUM" | "NORMAL" | "LOW";
    stage: "TODO" | "IN PROGRESS" | "COMPLETED";
    activities: IActivity[];
    team: Types.ObjectId[]; 
    isTrashed: boolean;
}

const taskSchema: Schema<ITask> = new Schema(
    {
        title: { type: String, required: true },
        mangerid: { type: Schema.Types.ObjectId, ref: "User"},
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
                by: { type: Schema.Types.ObjectId, ref: "User" },
            },
        ],
        team: [{ type: Schema.Types.ObjectId, ref: "User" }],
        isTrashed: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
