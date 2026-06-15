// Express web server for the Local Beats Listicle app.
// Unit 2: data now comes from a Render PostgreSQL database instead of a
// static array. Routes are async and query the database for each request.

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import { getAllEvents, getEventBySlug, searchEvents } from "./db/events.js";
import {
  homePage,
  searchPage,
  eventPage,
  aboutPage,
  bookingPage,
  bookingConfirmationPage,
  notFoundPage,
} from "./views/templates.js";

dotenv.config();

// Recreate __dirname (not available by default in ES modules).
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Parse HTML form submissions (the booking form posts urlencoded data).
app.use(express.urlencoded({ extended: true }));

// Serve static assets (our stylesheet, any images) from /public.
app.use(express.static(path.join(__dirname, "public")));

// Homepage — render the full list of events from the database.
app.get("/", async (req, res, next) => {
  try {
    const events = await getAllEvents();
    res.send(homePage(events));
  } catch (err) {
    next(err);
  }
});

// Search — filter events by name, artist, genre, or venue.
app.get("/search", async (req, res, next) => {
  try {
    const q = (req.query.q || "").trim();
    const events = q ? await searchEvents(q) : await getAllEvents();
    res.send(searchPage(events, q));
  } catch (err) {
    next(err);
  }
});

// Detail page — each event has its own route, e.g. /events/808-block-party.
app.get("/events/:slug", async (req, res, next) => {
  try {
    const event = await getEventBySlug(req.params.slug);

    // If the slug doesn't match any event, show the 404 page.
    if (!event) {
      return res.status(404).send(notFoundPage());
    }

    res.send(eventPage(event));
  } catch (err) {
    next(err);
  }
});

// About page — a focused write-up for a single event.
app.get("/events/:slug/about", async (req, res, next) => {
  try {
    const event = await getEventBySlug(req.params.slug);
    if (!event) return res.status(404).send(notFoundPage());
    res.send(aboutPage(event));
  } catch (err) {
    next(err);
  }
});

// Booking page — show the ticket reservation form.
app.get("/events/:slug/book", async (req, res, next) => {
  try {
    const event = await getEventBySlug(req.params.slug);
    if (!event) return res.status(404).send(notFoundPage());
    res.send(bookingPage(event));
  } catch (err) {
    next(err);
  }
});

// Handle a booking form submission and show a confirmation.
app.post("/events/:slug/book", async (req, res, next) => {
  try {
    const event = await getEventBySlug(req.params.slug);
    if (!event) return res.status(404).send(notFoundPage());

    const name = (req.body.name || "").trim();
    const email = (req.body.email || "").trim();
    const quantity = parseInt(req.body.quantity, 10);

    // Basic server-side validation in case the browser checks are bypassed.
    if (!name || !email || !Number.isInteger(quantity) || quantity < 1) {
      return res
        .status(400)
        .send(bookingPage(event, "Please fill in your name, email, and a valid ticket quantity."));
    }

    res.send(bookingConfirmationPage(event, { name, email, quantity }));
  } catch (err) {
    next(err);
  }
});

// 404 — runs for any request that didn't match a route above.
app.use((req, res) => {
  res.status(404).send(notFoundPage());
});

// Error handler — if a database query fails, log it and show a 500.
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err.message);
  res.status(500).send("Something went wrong. Please try again later.");
});

app.listen(PORT, () => {
  console.log(`🎶 Listicle is running at http://localhost:${PORT}`);
});
