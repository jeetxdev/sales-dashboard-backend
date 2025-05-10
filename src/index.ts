import app from './app';
import db from './db';
const PORT = process.env.PORT || 8000;

async function checkDatabaseConnection() {
  try {
    await db.execute('SELECT 1');
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    throw error;
  }
}

async function startServer() {
  try {
    await checkDatabaseConnection();
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  } catch {
    process.exit(1);
  }
}

startServer();
