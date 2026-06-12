import { startServer } from './server';

startServer().catch((error: unknown) => {
  console.error('Failed to start backend server', error);
  process.exit(1);
});
