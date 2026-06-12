import { Router } from 'express';
import TeamModel from '../models/team';

const teamsRouter = Router();

teamsRouter.get('/', async (_req, res, next) => {
  try {
    const teams = await TeamModel.find().sort({ createdAt: -1 }).lean();
    res.json(teams);
  } catch (error) {
    next(error);
  }
});

export default teamsRouter;
