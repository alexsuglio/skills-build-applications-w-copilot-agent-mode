import { InferSchemaType, Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true, min: 0 },
    streakDays: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  {
    timestamps: true,
  },
);

export type LeaderboardEntry = InferSchemaType<typeof leaderboardSchema>;

const LeaderboardModel = model<LeaderboardEntry>('Leaderboard', leaderboardSchema);

export default LeaderboardModel;
