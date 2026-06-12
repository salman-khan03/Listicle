// Server-side HTML templates.
// Each function returns a full HTML page as a string, which the Express
// routes send back to the browser. No frontend framework is used — just
// template literals, plain HTML, Picocss, and our own stylesheet.

// Shared <head> + page shell so every page looks consistent.
function layout(title, body) {
  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <!-- Picocss for clean, classless styling -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
    />
    <!-- Our own custom styles -->
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <header class="container">
      <nav>
        <ul>
          <li><a href="/"><strong>🎶 Listicle</strong></a></li>
        </ul>
        <ul>
          <li><a href="/">All Events</a></li>
        </ul>
      </nav>
    </header>
    <main class="container">
      ${body}
    </main>
    <footer class="container">
      <small>Listicle — Discover live music near you. Built with Express.</small>
    </footer>
  </body>
</html>`;
}

// One card on the homepage list.
function eventCard(event) {
  return `<article class="event-card">
    <a href="/events/${event.slug}" class="card-link">
      <img src="${event.image}" alt="${event.name}" class="card-image" />
      <div class="card-body">
        <span class="genre-tag">${event.genre}</span>
        <h3>${event.name}</h3>
        <p class="card-artists">${event.artists}</p>
        <footer class="card-meta">
          <span>📅 ${event.date}</span>
          <span>🎟️ ${event.ticketPrice}</span>
        </footer>
      </div>
    </a>
  </article>`;
}

// The homepage: a title + a grid of event cards.
export function homePage(events) {
  const cards = events.map(eventCard).join("\n");
  const body = `
    <hgroup>
      <h1>Discover Local Music</h1>
      <p>Find upcoming concerts, open mic nights, and festivals happening near you.</p>
    </hgroup>
    <section class="event-grid">
      ${cards}
    </section>`;
  return layout("Listicle — Discover Local Music", body);
}

// A single event's detail page, showing every attribute.
export function eventPage(event) {
  const body = `
    <a href="/" class="back-link">← Back to all events</a>
    <article class="event-detail">
      <img src="${event.image}" alt="${event.name}" class="detail-image" />
      <span class="genre-tag">${event.genre}</span>
      <h1>${event.name}</h1>
      <p class="detail-description">${event.description}</p>
      <div class="detail-grid">
        <div><strong>Artist(s)</strong><p>${event.artists}</p></div>
        <div><strong>Date &amp; Time</strong><p>${event.date}</p></div>
        <div><strong>Venue</strong><p>${event.venue}</p></div>
        <div><strong>Genre</strong><p>${event.genre}</p></div>
        <div><strong>Ticket Price</strong><p>${event.ticketPrice}</p></div>
      </div>
      <div class="detail-actions" role="group">
        <a href="/events/${event.slug}/about" role="button" class="secondary">ℹ️ About This Event</a>
        <a href="/events/${event.slug}/book" role="button">🎟️ Book Tickets</a>
      </div>
    </article>`;
  return layout(`${event.name} — Listicle`, body);
}

// "About this event" page — a focused write-up of a single event.
export function aboutPage(event) {
  const body = `
    <a href="/events/${event.slug}" class="back-link">← Back to ${event.name}</a>
    <article class="event-detail">
      <span class="genre-tag">${event.genre}</span>
      <h1>About ${event.name}</h1>
      <p class="detail-description">${event.description}</p>
      <div class="detail-grid">
        <div><strong>Artist(s)</strong><p>${event.artists}</p></div>
        <div><strong>Date &amp; Time</strong><p>${event.date}</p></div>
        <div><strong>Venue</strong><p>${event.venue}</p></div>
        <div><strong>Genre</strong><p>${event.genre}</p></div>
      </div>
      <div class="detail-actions" role="group">
        <a href="/events/${event.slug}/book" role="button">🎟️ Book Tickets</a>
      </div>
    </article>`;
  return layout(`About ${event.name} — Listicle`, body);
}

// Booking page — a form to reserve tickets for a single event.
export function bookingPage(event, error) {
  const body = `
    <a href="/events/${event.slug}" class="back-link">← Back to ${event.name}</a>
    <article class="event-detail">
      <span class="genre-tag">${event.genre}</span>
      <h1>Book: ${event.name}</h1>
      <p class="detail-description">
        ${event.date} · ${event.venue} · <strong>${event.ticketPrice}</strong> per ticket
      </p>
      ${error ? `<p style="color: var(--pico-color-red-500)"><strong>${error}</strong></p>` : ""}
      <form method="POST" action="/events/${event.slug}/book">
        <label>
          Full name
          <input type="text" name="name" placeholder="Jane Doe" required />
        </label>
        <label>
          Email
          <input type="email" name="email" placeholder="jane@example.com" required />
        </label>
        <label>
          Number of tickets
          <input type="number" name="quantity" value="1" min="1" max="10" required />
        </label>
        <button type="submit">Confirm Booking</button>
      </form>
    </article>`;
  return layout(`Book ${event.name} — Listicle`, body);
}

// Confirmation page shown after a successful booking.
export function bookingConfirmationPage(event, booking) {
  const body = `
    <article class="event-detail">
      <span class="genre-tag">Confirmed ✅</span>
      <h1>You're going to ${event.name}!</h1>
      <p class="detail-description">
        Thanks, ${booking.name}. We've reserved
        <strong>${booking.quantity} ticket(s)</strong> for you.
        A confirmation has been sent to <strong>${booking.email}</strong>.
      </p>
      <div class="detail-grid">
        <div><strong>Event</strong><p>${event.name}</p></div>
        <div><strong>Date &amp; Time</strong><p>${event.date}</p></div>
        <div><strong>Venue</strong><p>${event.venue}</p></div>
        <div><strong>Tickets</strong><p>${booking.quantity} × ${event.ticketPrice}</p></div>
      </div>
      <div class="detail-actions" role="group">
        <a href="/events/${event.slug}" role="button" class="secondary">Event details</a>
        <a href="/" role="button">Browse more events</a>
      </div>
    </article>`;
  return layout(`Booking Confirmed — Listicle`, body);
}

// The 404 page, shown when no route matches.
export function notFoundPage() {
  const body = `
    <section class="not-found">
      <h1>404</h1>
      <p>Whoops — that page hit a wrong note. We couldn't find what you were looking for.</p>
      <a href="/" role="button">Back to all events</a>
    </section>`;
  return layout("404 — Page Not Found", body);
}
