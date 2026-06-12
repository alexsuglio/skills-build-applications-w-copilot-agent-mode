import { Router } from 'express';

const usersRouter = Router();

usersRouter.get('/', (_req, res) => {
  res.json([]);
});

export default usersRouter;
