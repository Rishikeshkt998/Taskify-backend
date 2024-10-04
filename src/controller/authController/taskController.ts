
import { Request, Response } from 'express';
import Task from '../../models/auth/taskModel';
import mongoose from 'mongoose';

const addTask = async (req: Request, res: Response) => {
    const { title, mangerid, date,  stage,priority } = req.body;
    const newTask = new Task({
        title,
        mangerid,
        date,
        stage,
        priority,

    });

    try {
        const savedTask = await newTask.save();
        res.status(201).json({
            success: true,
            task: savedTask,
        });
    } catch (error) {
        res.status(400).json({ message: 'Error adding task', error });
    }
};
const addTaskAssign = async (req: Request, res: Response) => {
    const { title, date,team, stage, priority } = req.body;
    const newTask = new Task({
        title,
        date,
        team,
        stage,
        priority,

    });

    try {
        const savedTask = await newTask.save();
        res.status(201).json({
            success: true,
            task: savedTask,
        });
    } catch (error) {
        res.status(400).json({ message: 'Error adding task', error });
    }
};
const updateTask = async (req: Request, res: Response) => {
     
    const {  id,title, mangerid, date, stage, priority } = req.body;
    console.log("valuess",req.body)

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            {
                title,
                mangerid,
                date,
                stage,
                priority,
            },
            { new: true, runValidators: true } 
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({
            success: true,
            task: updatedTask,
        });
    } catch (error) {
        res.status(400).json({ message: 'Error updating task', error });
    }
};
const getTasksByManagerId = async (req: Request, res: Response) => {
    const  managerid  = req.params.managerid; 

    try {
        const tasks = await Task.find({ mangerid:managerid });
        console.log("taskvalue",tasks)

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
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching tasks.",
        });
    }
};

const getTasksExcludingManagerId = async (req: Request, res: Response) => {
    try {

        const tasks = await Task.find({ mangerid: { $exists: false } }).populate("team").exec();;

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
    } catch (error) {
        console.error(error); 
        return res.status(500).json({
            success: false,
            message: "Error fetching tasks.",
            error, 
        });
    }
};
const deleteTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; 

        const deletedTask = await Task.findByIdAndDelete(id);

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
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error deleting task.",
            error,
        });
    }
};


const getTasksForTeamMember = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {

        const tasks = await Task.find({ team: { $in: [id] } });

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
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching tasks.",
            error,
        });
    }
};



export { addTask, updateTask, addTaskAssign, getTasksByManagerId, getTasksExcludingManagerId,deleteTask,getTasksForTeamMember };