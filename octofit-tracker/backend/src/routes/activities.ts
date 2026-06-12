import { Router } from 'express';
import ActivityModel from '../models/activity';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_req, res, next) => {
  try {
    const activities = await ActivityModel.find().sort({ completedAt: -1 }).lean();
    res.json(activities);
  } catch (error) {
    next(error);
  }
});

export default activitiesRouter;
