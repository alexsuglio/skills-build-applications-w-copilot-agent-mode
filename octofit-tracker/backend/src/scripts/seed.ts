import mongoose from 'mongoose';
import { connectToDatabase } from '../config/database';
import ActivityModel from '../models/activity';
import LeaderboardModel from '../models/leaderboard';
import TeamModel from '../models/team';
import UserModel from '../models/user';
import WorkoutModel from '../models/workout';

async function seedDatabase(): Promise<void> {
  console.log('Seed the octofit_db database with test data');

  await connectToDatabase();

  await Promise.all([
    ActivityModel.deleteMany({}),
    LeaderboardModel.deleteMany({}),
    TeamModel.deleteMany({}),
    UserModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
  ]);

  const users = await UserModel.insertMany([
    {
      name: 'Avery Patel',
      email: 'avery.patel@example.com',
      fitnessGoal: 'Build endurance',
    },
    {
      name: 'Jordan Kim',
      email: 'jordan.kim@example.com',
      fitnessGoal: 'Increase strength',
    },
    {
      name: 'Casey Nguyen',
      email: 'casey.nguyen@example.com',
      fitnessGoal: 'Lose body fat',
    },
  ]);

  const teams = await TeamModel.insertMany([
    {
      name: 'Harbor Hustlers',
      city: 'Seattle',
      memberCount: 12,
    },
    {
      name: 'Sunrise Sprinters',
      city: 'Austin',
      memberCount: 9,
    },
  ]);

  await WorkoutModel.insertMany([
    {
      title: 'HIIT Cardio Blast',
      focusArea: 'Cardio',
      intensity: 'High',
      durationMinutes: 25,
      recommendedForGoal: 'Build endurance',
    },
    {
      title: 'Full Body Strength Circuit',
      focusArea: 'Strength',
      intensity: 'Medium',
      durationMinutes: 40,
      recommendedForGoal: 'Increase strength',
    },
    {
      title: 'Core & Mobility Flow',
      focusArea: 'Mobility',
      intensity: 'Low',
      durationMinutes: 30,
      recommendedForGoal: 'Lose body fat',
    },
  ]);

  await ActivityModel.insertMany([
    {
      userId: users[0]._id,
      teamId: teams[0]._id,
      type: 'Running',
      durationMinutes: 42,
      caloriesBurned: 510,
      completedAt: new Date('2026-06-08T07:30:00.000Z'),
    },
    {
      userId: users[1]._id,
      teamId: teams[1]._id,
      type: 'Weight Training',
      durationMinutes: 55,
      caloriesBurned: 430,
      completedAt: new Date('2026-06-09T17:15:00.000Z'),
    },
    {
      userId: users[2]._id,
      teamId: teams[0]._id,
      type: 'Cycling',
      durationMinutes: 60,
      caloriesBurned: 620,
      completedAt: new Date('2026-06-10T06:45:00.000Z'),
    },
  ]);

  await LeaderboardModel.insertMany([
    {
      userId: users[2]._id,
      points: 980,
      streakDays: 14,
      rank: 1,
    },
    {
      userId: users[0]._id,
      points: 910,
      streakDays: 11,
      rank: 2,
    },
    {
      userId: users[1]._id,
      points: 870,
      streakDays: 8,
      rank: 3,
    },
  ]);

  const counts = await Promise.all([
    UserModel.countDocuments(),
    TeamModel.countDocuments(),
    ActivityModel.countDocuments(),
    LeaderboardModel.countDocuments(),
    WorkoutModel.countDocuments(),
  ]);

  console.log('Seed complete:', {
    users: counts[0],
    teams: counts[1],
    activities: counts[2],
    leaderboard: counts[3],
    workouts: counts[4],
  });
}

seedDatabase()
  .catch((error: unknown) => {
    console.error('Failed to seed octofit_db', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
