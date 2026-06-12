import { Router } from 'express';
import UserModel from '../models/user';

const usersRouter = Router();

usersRouter.get('/', async (_req, res, next) => {
  try {
    const users = await UserModel.find().sort({ createdAt: -1 }).lean();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
