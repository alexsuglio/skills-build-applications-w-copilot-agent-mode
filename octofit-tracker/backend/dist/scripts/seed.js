"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../config/database");
const activity_1 = __importDefault(require("../models/activity"));
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const team_1 = __importDefault(require("../models/team"));
const user_1 = __importDefault(require("../models/user"));
const workout_1 = __importDefault(require("../models/workout"));
async function seedDatabase() {
    console.log('Seed the octofit_db database with test data');
    await (0, database_1.connectToDatabase)();
    await Promise.all([
        activity_1.default.deleteMany({}),
        leaderboard_1.default.deleteMany({}),
        team_1.default.deleteMany({}),
        user_1.default.deleteMany({}),
        workout_1.default.deleteMany({}),
    ]);
    const users = await user_1.default.insertMany([
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
    const teams = await team_1.default.insertMany([
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
    await workout_1.default.insertMany([
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
    await activity_1.default.insertMany([
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
    await leaderboard_1.default.insertMany([
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
        user_1.default.countDocuments(),
        team_1.default.countDocuments(),
        activity_1.default.countDocuments(),
        leaderboard_1.default.countDocuments(),
        workout_1.default.countDocuments(),
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
    .catch((error) => {
    console.error('Failed to seed octofit_db', error);
    process.exitCode = 1;
})
    .finally(async () => {
    await mongoose_1.default.disconnect();
});
