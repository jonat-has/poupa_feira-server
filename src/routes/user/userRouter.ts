import { Router } from 'express';
import userController from '../../controllers/userController';
import authToken from '../../middlewares/authToken';

const userRoutes = Router();

userRoutes.post('/auth/register', userController.registerUser)

userRoutes.post('/auth/login', userController.loginUser)

userRoutes.post('/auth/recover', userController.recoverUserInfo)
export default userRoutes;