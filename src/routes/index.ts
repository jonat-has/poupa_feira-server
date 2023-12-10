import { Router } from "express";
import appRoutes from "./app/appRouter";
import userRoutes from "./user/userRouter";

const routes = Router();

routes.use(userRoutes);
routes.use(appRoutes);

export default routes;