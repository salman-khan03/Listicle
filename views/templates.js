// Server-side HTML templates.
// Each function returns a full HTML page as a string, which the Express
// routes send back to the browser. No frontend framework is used — just
// template literals, plain HTML, our own immersive stylesheet, and a small
// vanilla-JS file (/scripts/main.js) for the 3D tilt, particles and reveals.

// Shared <head> + page shell so every page looks consistent.
// `variant` is added as a class on <body> so the homepage hero can differ
// from the inner content pages.
function layout(title, body, variant = "page") {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <link rel="stylesheet" href="/styles.css" />
    <script src="/scripts/main.js" defer></script>
  </head>
  <body class="${variant}">
    <!-- Animated background layers -->
    <div class="bg-aurora" aria-hidden="true"></div>
    <div class="bg-grid" aria-hidden="true"></div>
    <div class="bg-orbs" aria-hidden="true">
      <span class="orb orb-1"></span>
      <span class="orb orb-2"></span>
      <span class="orb orb-3"></span>
    </div>

    <header class="site-header">
      <div class="header-inner">
        <a href="/" class="brand">
          <span class="brand-mark">◆</span>
          <span class="brand-name">LISTICLE</span>
        </a>
        <nav><a href="/" class="nav-link">All Events</a></nav>
      </div>
    </header>

    ${body}

    <footer class="site-footer">
      <p>LISTICLE · Discover live music near you · Powered by a Render PostgreSQL database</p>
    </footer>
  </body>
</html>`;
}

// One tile on the homepage grid — image with a hover-reveal overlay.
function eventCard(event) {
  return `<article class="card reveal" style="background-image:url('${event.image}')" data-href="/events/${event.slug}">
    <div class="card-base">
      <span class="card-tag">${event.genre}</span>
      <h3>${event.name}</h3>
    </div>
    <div class="card-overlay">
      <span class="card-name">${event.name}</span>
      <span class="card-line card-when">📅 ${event.date}</span>
      <span class="card-line card-where">📍 ${event.venue}</span>
      <span class="card-line card-price">🎟️ ${event.ticketPrice}</span>
      <a href="/events/${event.slug}" class="card-link">VIEW EVENT</a>
    </div>
  </article>`;
}

// The homepage: full-bleed hero + a grid of event cards.
export function homePage(events) {
  const cards = events.map(eventCard).join("\n");
  const body = `
    <section class="hero" id="hero">
      <div class="particles" id="particles" aria-hidden="true"></div>
      <div class="hero-panel" id="hero-panel">
        <p class="hero-eyebrow">A curated listicle of live music ✦</p>
        <h1 class="hero-title">LISTICLE</h1>
        <p class="hero-subtitle">For those who chase the next unforgettable night —
          concerts, open mics and festivals happening near you.</p>
        <a href="#collection" class="panel-btn" role="button">ALL EVENTS</a>
      </div>
    </section>

    <main class="content" id="collection">
      <form class="search-form" action="/search" method="GET" role="search">
        <input
          class="search-input"
          type="search"
          name="q"
          placeholder="Search by name, artist, genre, or venue…"
          aria-label="Search events"
        />
        <button class="search-btn panel-btn" type="submit">SEARCH</button>
      </form>
      <section class="event-grid">
        ${cards}
      </section>
    </main>`;
  return layout("Listicle — Discover Local Music", body, "home");
}

// A single event's detail page, showing every attribute.
export function eventPage(event) {
  const body = `
    <main class="content content-narrow">
      <a href="/" class="back-link">← All events</a>
      <article class="detail-card" id="detail-card">
        <div class="image-container">
          <img src="${event.image}" alt="${event.name}" id="detail-image" />
          <div class="image-glow" aria-hidden="true"></div>
        </div>
        <div class="detail-body">
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
          <div class="detail-actions">
            <a href="/events/${event.slug}/about" class="panel-btn ghost">ℹ️ ABOUT</a>
            <a href="/events/${event.slug}/book" class="panel-btn">🎟️ BOOK TICKETS</a>
          </div>
        </div>
      </article>
    </main>`;
  return layout(`${event.name} — Listicle`, body);
}

// "About this event" page — a focused write-up of a single event.
export function aboutPage(event) {
  const body = `
    <main class="content content-narrow">
      <a href="/events/${event.slug}" class="back-link">← Back to ${event.name}</a>
      <article class="panel-card">
        <span class="genre-tag">${event.genre}</span>
        <h1>About ${event.name}</h1>
        <p class="detail-description">${event.description}</p>
        <div class="detail-grid">
          <div><strong>Artist(s)</strong><p>${event.artists}</p></div>
          <div><strong>Date &amp; Time</strong><p>${event.date}</p></div>
          <div><strong>Venue</strong><p>${event.venue}</p></div>
          <div><strong>Genre</strong><p>${event.genre}</p></div>
        </div>
        <div class="detail-actions">
          <a href="/events/${event.slug}/book" class="panel-btn">🎟️ BOOK TICKETS</a>
        </div>
      </article>
    </main>`;
  return layout(`About ${event.name} — Listicle`, body);
}

// Booking page — a form to reserve tickets for a single event.
export function bookingPage(event, error) {
  const body = `
    <main class="content content-narrow">
      <a href="/events/${event.slug}" class="back-link">← Back to ${event.name}</a>
      <article class="panel-card">
        <span class="genre-tag">${event.genre}</span>
        <h1>Book: ${event.name}</h1>
        <p class="detail-description">
          ${event.date} · ${event.venue} · <strong>${event.ticketPrice}</strong> per ticket
        </p>
        ${error ? `<p class="form-error"><strong>${error}</strong></p>` : ""}
        <form method="POST" action="/events/${event.slug}/book" class="booking-form">
          <label>Full name
            <input type="text" name="name" placeholder="Jane Doe" required />
          </label>
          <label>Email
            <input type="email" name="email" placeholder="jane@example.com" required />
          </label>
          <label>Number of tickets
            <input type="number" name="quantity" value="1" min="1" max="10" required />
          </label>
          <button type="submit" class="panel-btn">CONFIRM BOOKING</button>
        </form>
      </article>
    </main>`;
  return layout(`Book ${event.name} — Listicle`, body);
}

// Confirmation page shown after a successful booking.
export function bookingConfirmationPage(event, booking) {
  const body = `
    <main class="content content-narrow">
      <article class="panel-card">
        <span class="genre-tag confirmed">Confirmed ✅</span>
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
        <div class="detail-actions">
          <a href="/events/${event.slug}" class="panel-btn ghost">EVENT DETAILS</a>
          <a href="/" class="panel-btn">BROWSE MORE</a>
        </div>
      </article>
    </main>`;
  return layout(`Booking Confirmed — Listicle`, body);
}

// Search results page — same card grid with a search bar pre-filled.
export function searchPage(events, query) {
  const cards = events.length
    ? events.map(eventCard).join("\n")
    : `<p class="no-results">No events matched "<strong>${query}</strong>". Try a different search.</p>`;

  const body = `
    <main class="content" id="collection">
      <form class="search-form" action="/search" method="GET" role="search">
        <input
          class="search-input"
          type="search"
          name="q"
          value="${query}"
          placeholder="Search by name, artist, genre, or venue…"
          aria-label="Search events"
          autofocus
        />
        <button class="search-btn panel-btn" type="submit">SEARCH</button>
      </form>
      <p class="search-meta">
        ${query ? `Results for "<strong>${query}</strong>" — ${events.length} found` : "All events"}
        · <a href="/">Clear search</a>
      </p>
      <section class="event-grid">
        ${cards}
      </section>
    </main>`;
  return layout(query ? `"${query}" — Listicle Search` : "All Events — Listicle", body);
}

// The 404 page, shown when no route matches.
export function notFoundPage() {
  const body = `
    <main class="content content-narrow">
      <section class="not-found">
        <h1>404</h1>
        <p>Whoops — that page hit a wrong note. We couldn't find what you were looking for.</p>
        <a href="/" class="panel-btn">← BACK TO ALL EVENTS</a>
      </section>
    </main>`;
  return layout("404 — Page Not Found", body);
}