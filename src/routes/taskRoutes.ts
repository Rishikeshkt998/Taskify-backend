import express, { Request, Response, NextFunction } from 'express';
import { addTask,addTaskAssign,deleteTask,getTasksByManagerId,getTasksExcludingManagerId,getTasksForTeamMember,updateTask, updateTaskForUser } from '../controller/authController/taskController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/',protect,(req: Request, res: Response, next: NextFunction) => {
    addTask(req, res);
});
router.post('/assign',protect, (req: Request, res: Response, next: NextFunction) => {
    addTaskAssign(req, res);
});

router.put('/edit',protect, (req: Request, res: Response, next: NextFunction) => {
    updateTask(req, res);
});
router.put('/edituser', protect,(req: Request, res: Response, next: NextFunction) => {
    updateTaskForUser(req, res);
});
router.get('/gettask/:managerid',protect, (req: Request, res: Response, next: NextFunction) => {
    getTasksByManagerId(req, res);
});
router.get('/assigned', protect,(req: Request, res: Response, next: NextFunction) => {
    getTasksExcludingManagerId(req, res);
});

router.delete('/deletetask/:id', protect,(req: Request, res: Response, next: NextFunction) => {
    deleteTask(req, res);
});
router.get('/employee/:id',protect, (req: Request, res: Response, next: NextFunction) => {
    getTasksForTeamMember(req, res);
});

export default router;