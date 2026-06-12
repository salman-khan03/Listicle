// Seed script: creates the `events` table and fills it with our event data.
// Run once (or whenever you want to reset the data) with:  npm run seed

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import pool from "../config/database.js";
import events from "../data/events.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seed() {
  try {
    // 1. Create the table from schema.sql (drops it first if it exists).
    const schema = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf-8");
    await pool.query(schema);
    console.log("✅ Created table 'events'");

    // 2. Insert every event. Parameterized query ($1, $2, ...) avoids
    //    SQL-injection issues and handles quotes/special characters safely.
    const insert = `
      INSERT INTO events
        (slug, name, artists, event_date, venue, genre, ticket_price, image, description)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;

    for (const e of events) {
      await pool.query(insert, [
        e.slug,
        e.name,
        e.artists,
        e.date,
        e.venue,
        e.genre,
        e.ticketPrice,
        e.image,
        e.description,
      ]);
    }

    console.log(`✅ Seeded ${events.length} events`);
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

seed();
