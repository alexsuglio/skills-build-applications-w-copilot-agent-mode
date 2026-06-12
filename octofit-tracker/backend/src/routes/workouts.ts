import { Router } from 'express';
import WorkoutModel from '../models/workout';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_req, res, next) => {
  try {
    const workouts = await WorkoutModel.find().sort({ createdAt: -1 }).lean();
    res.json(workouts);
  } catch (error) {
    next(error);
  }
});

export default workoutsRouter;
