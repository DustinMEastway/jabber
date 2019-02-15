import { Router } from 'express';

export const serverRouter = Router();
export const apiRouter = Router();

serverRouter.use('/api', apiRouter);
