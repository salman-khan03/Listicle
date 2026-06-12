// PostgreSQL connection pool.
// Reads the connection string from the DATABASE_URL environment variable
// (set in your .env file). On Render, SSL is required, so we enable it.

import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  console.warn(
    "⚠️  DATABASE_URL is not set. Copy .env.example to .env and add your Render connection string."
  );
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Render's managed Postgres requires SSL. rejectUnauthorized: false
  // accepts Render's certificate without a local CA file.
  ssl: { rejectUnauthorized: false },
});

export default pool;
