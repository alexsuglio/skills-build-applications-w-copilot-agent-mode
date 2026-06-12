import app from './app';
import { connectToDatabase, mongoUri } from './config/database';

const port = Number(process.env.PORT) || 8000;

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

// Start the OctoFit API server
export async function startServer(): Promise<void> {
  await connectToDatabase();

  app.listen(port, () => {
    console.log(`OctoFit backend running on port ${port}`);
    console.log(`API base URL: ${baseUrl}`);
    console.log(`MongoDB URI: ${mongoUri}`);
  });
}
