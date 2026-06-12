"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    city: { type: String, required: true, trim: true },
    memberCount: { type: Number, required: true, min: 1 },
}, {
    timestamps: true,
});
const TeamModel = (0, mongoose_1.model)('Team', teamSchema);
exports.default = TeamModel;
