"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    focusArea: { type: String, required: true, trim: true },
    intensity: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    recommendedForGoal: { type: String, required: true, trim: true },
}, {
    timestamps: true,
});
const WorkoutModel = (0, mongoose_1.model)('Workout', workoutSchema);
exports.default = WorkoutModel;
