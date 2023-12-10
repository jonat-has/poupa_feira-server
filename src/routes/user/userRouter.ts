import { Router } from 'express';
import userController from '../../controllers/userController';
import authToken from '../../middlewares/authToken';

const userRoutes = Router();

userRoutes.get('/auth/user', userController.getAllUser)

userRoutes.get('/auth/user/:id', authToken,userController.getOneById)

userRoutes.post('/auth/register', userController.registerUser)

userRoutes.post('/auth/login', userController.loginUser)

export default userRoutes;