import express, { Request, Response, NextFunction } from 'express';
import { addTask,addTaskAssign,deleteTask,getTasksByManagerId,getTasksExcludingManagerId,getTasksForTeamMember,updateTask } from '../controller/authController/taskController';

const router = express.Router();

router.post('/', (req: Request, res: Response, next: NextFunction) => {
    addTask(req, res);
});
router.post('/assign', (req: Request, res: Response, next: NextFunction) => {
    addTaskAssign(req, res);
});

router.put('/edit', (req: Request, res: Response, next: NextFunction) => {
    updateTask(req, res);
});
router.get('/gettask/:managerid', (req: Request, res: Response, next: NextFunction) => {
    getTasksByManagerId(req, res);
});
router.get('/assigned', (req: Request, res: Response, next: NextFunction) => {
    getTasksExcludingManagerId(req, res);
});

router.delete('/deletetask/:id', (req: Request, res: Response, next: NextFunction) => {
    deleteTask(req, res);
});
router.get('/employee/:id', (req: Request, res: Response, next: NextFunction) => {
    getTasksForTeamMember(req, res);
});

export default router;