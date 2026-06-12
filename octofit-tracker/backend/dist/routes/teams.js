"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_1 = __importDefault(require("../models/team"));
const teamsRouter = (0, express_1.Router)();
teamsRouter.get('/', async (_req, res, next) => {
    try {
        const teams = await team_1.default.find().sort({ createdAt: -1 }).lean();
        res.json(teams);
    }
    catch (error) {
        next(error);
    }
});
exports.default = teamsRouter;
