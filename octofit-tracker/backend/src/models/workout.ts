import { InferSchemaType, Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    focusArea: { type: String, required: true, trim: true },
    intensity: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    recommendedForGoal: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  },
);

export type Workout = InferSchemaType<typeof workoutSchema>;

const WorkoutModel = model<Workout>('Workout', workoutSchema);

export default WorkoutModel;
