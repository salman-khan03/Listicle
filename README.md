# Local Beats 🎶

A Listicle web app for discovering local music events — concerts, open mic nights, and festivals happening near you. Built with a vanilla HTML/CSS/JS frontend served by an Express backend, styled with Picocss.

## Required Features (Unit 2)

The following **required** functionality is completed:

- [x] **The web app uses only HTML, CSS, and JavaScript without a frontend framework**
- [x] **Data is supplied to the app using a Render PostgreSQL database**
- [x] **The web app is connected to a Render PostgreSQL database**
- [x] **The database contains an appropriately structured table for the list items**

The following **stretch** features are implemented:

- [ ] **Users can search for items with a specific attribute**

### Carried over from Unit 1

- [x] Vanilla HTML/CSS/JS, no frontend framework
- [x] Functional, styled front page with a title; six unique list items
- [x] Each item shows 3+ attributes and has its own detail page (e.g. `/events/808-block-party`)
- [x] Custom 404 page; styled with Picocss
- [x] List items displayed as responsive cards (stretch)

## Video Walkthrough

Here's a walkthrough of implemented features:

<img src='https://imgflip.com/gif/au74f4' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...

## Setup & How to Run

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Create a PostgreSQL database on Render**
   - Go to the [Render Dashboard](https://dashboard.render.com/) → **New +** → **PostgreSQL**.
   - Give it a name, pick the free tier, and create it.
   - Once it's live, copy the **External Database URL** from the database's *Connections* page.

3. **Configure your connection string**

   ```bash
   cp .env.example .env
   ```

   Paste your External Database URL into `.env` as `DATABASE_URL`.

4. **Seed the database** (creates the `events` table and inserts the data)

   ```bash
   npm run seed
   ```

5. **Start the app**

   ```bash
   npm start
   ```

   Then open http://localhost:3000 in your browser.

## Project Structure

```
Listicle/
├── server.js            # Express server: async routes that query the database
├── config/
│   └── database.js      # PostgreSQL connection pool (reads DATABASE_URL)
├── db/
│   ├── schema.sql       # CREATE TABLE definition for events
│   ├── seed.js          # Creates the table and inserts the seed data
│   └── events.js        # Query functions (getAllEvents, getEventBySlug)
├── data/
│   └── events.js        # Seed data source for the events table
├── views/
│   └── templates.js     # Server-side HTML template functions
├── public/
│   ├── styles.css       # Custom styles (layered on top of Picocss)
│   └── images/          # Local image assets
├── .env.example         # Template for your Render connection string
└── package.json
```

## Database Schema

The `events` table:

| Column         | Type   | Notes                                  |
| -------------- | ------ | -------------------------------------- |
| `id`           | SERIAL | Primary key                            |
| `slug`         | TEXT   | Unique; used in the URL                |
| `name`         | TEXT   |                                        |
| `artists`      | TEXT   |                                        |
| `event_date`   | TEXT   | Pre-formatted display string           |
| `venue`        | TEXT   |                                        |
| `genre`        | TEXT   |                                        |
| `ticket_price` | TEXT   |                                        |
| `image`        | TEXT   |                                        |
| `description`  | TEXT   |                                        |

## Routes

| Route                  | Description                                |
| ---------------------- | ------------------------------------------ |
| `GET /`                | Homepage — lists all events from the DB    |
| `GET /events/:slug`    | Detail page for a single event from the DB |
| `*` (any other route)  | Custom 404 page                            |

## Notes

This is **Part 2** of the Listicle project. The event data now lives in a Render PostgreSQL database instead of a static array. The routes and templates from Unit 1 are largely unchanged — only the data source changed, from an in-memory array to live database queries.

## License

    Copyright 2026 Salman Khan

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
