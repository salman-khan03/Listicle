-- Schema for the Local Beats Listicle app.
-- One row per music event. Every event shares the same attributes.

DROP TABLE IF EXISTS events;

CREATE TABLE events (
  id            SERIAL PRIMARY KEY,
  slug          TEXT UNIQUE NOT NULL,   -- used in the URL, e.g. /events/808-block-party
  name          TEXT NOT NULL,
  artists       TEXT NOT NULL,
  event_date    TEXT NOT NULL,          -- stored as a pre-formatted display string
  venue         TEXT NOT NULL,
  genre         TEXT NOT NULL,
  ticket_price  TEXT NOT NULL,
  image         TEXT NOT NULL,
  description   TEXT NOT NULL
);
