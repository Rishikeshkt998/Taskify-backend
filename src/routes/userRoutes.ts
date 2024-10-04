import express, { Request, Response, NextFunction } from 'express';
import { registerUser, authUser, getUsers } from '../controller/authController/userController'; // Import named exports

const router = express.Router();

router.post('/', (req: Request, res: Response, next: NextFunction) => {
    registerUser(req, res);  
});

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    authUser(req, res);  
});
router.get('/user', (req: Request, res: Response, next: NextFunction) => {
    getUsers(req, res);
});

export default router;