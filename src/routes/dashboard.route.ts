import { Router, Request, Response } from 'express';

const dashboardRouter = Router();
dashboardRouter.get('/', (req: Request, res: Response) => {
  res.send('Dashboard');
});

export default dashboardRouter;
