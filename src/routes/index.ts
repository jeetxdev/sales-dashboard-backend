import Router from 'express';
import dashboardRouter from './dashboard.route';

const defaultRouter = Router();

defaultRouter.use('/dashboard', dashboardRouter);

export default defaultRouter;
