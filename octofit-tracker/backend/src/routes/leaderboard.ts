import { Router } from 'express';

const leaderboardRouter = Router();

leaderboardRouter.get('/', (_req, res) => {
  res.json([]);
});

export default leaderboardRouter;
