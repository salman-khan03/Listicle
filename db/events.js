// Database queries for events.
// Each function returns plain JavaScript objects whose keys match what the
// view templates expect (e.g. `ticketPrice`, `date`), so the templates from
// Unit 1 keep working unchanged. We do that with SQL column aliases.

import pool from "../config/database.js";

// Columns are stored in snake_case (SQL convention) but aliased back to the
// camelCase names the templates use. Quoted aliases preserve capitalization.
const SELECT_COLUMNS = `
  slug,
  name,
  artists,
  event_date   AS date,
  venue,
  genre,
  ticket_price AS "ticketPrice",
  image,
  description
`;

// Get every event for the homepage list.
export async function getAllEvents() {
  const { rows } = await pool.query(
    `SELECT ${SELECT_COLUMNS} FROM events ORDER BY id`
  );
  return rows;
}

// Search events by name, artists, genre, or venue (case-insensitive).
export async function searchEvents(query) {
  const { rows } = await pool.query(
    `SELECT ${SELECT_COLUMNS} FROM events
     WHERE name ILIKE $1 OR artists ILIKE $1 OR genre ILIKE $1 OR venue ILIKE $1
     ORDER BY id`,
    [`%${query}%`]
  );
  return rows;
}

// Get a single event by its slug for the detail page.
// Returns undefined if no event matches.
export async function getEventBySlug(slug) {
  const { rows } = await pool.query(
    `SELECT ${SELECT_COLUMNS} FROM events WHERE slug = $1`,
    [slug]
  );
  return rows[0];
}
