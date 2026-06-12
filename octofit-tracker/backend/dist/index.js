"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    const codespaceName = process.env.CODESPACE_NAME;
    const baseUrl = codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : 'http://localhost:8000';
    res.json({
        status: 'ok',
        port,
        baseUrl,
        mongoUri,
    });
});
mongoose_1.default
    .connect(mongoUri)
    .then(() => {
    app.listen(port, () => {
        console.log(`OctoFit backend running on port ${port}`);
    });
})
    .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
});
