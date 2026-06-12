"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = startServer;
const app_1 = __importDefault(require("./app"));
const database_1 = require("./config/database");
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
async function startServer() {
    await (0, database_1.connectToDatabase)();
    app_1.default.listen(port, () => {
        console.log(`OctoFit backend running on port ${port}`);
        console.log(`API base URL: ${baseUrl}`);
        console.log(`MongoDB URI: ${database_1.mongoUri}`);
    });
}
