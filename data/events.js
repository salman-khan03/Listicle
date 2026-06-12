// Local music events data.
// This array is the SEED SOURCE for the database — `npm run seed` reads it
// and inserts each event into the PostgreSQL `events` table. At runtime the
// app reads from the database, not from this file.
// Every event shares the same attributes so the schema is consistent.

const events = [
  {
    slug: "midnight-echoes-live",
    name: "Midnight Echoes Live",
    artists: "Midnight Echoes, The Pale Lanterns",
    date: "Friday, June 12, 2026 — 8:00 PM",
    venue: "The Crescent Ballroom",
    genre: "Indie Rock",
    ticketPrice: "$18",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    description:
      "An intimate night of shimmering guitars and soaring choruses. Midnight Echoes return to the Crescent Ballroom with a brand-new set, joined by openers The Pale Lanterns. Expect a few unreleased tracks and a sing-along finale.",
  },
  {
    slug: "808-block-party",
    name: "808 Block Party",
    artists: "DJ Verse, Lyric Loud, Maya Sol",
    date: "Saturday, June 13, 2026 — 9:30 PM",
    venue: "Warehouse 9",
    genre: "Hip-Hop",
    ticketPrice: "$25",
    image: "/images/808-block-party.svg",
    description:
      "A high-energy showcase of the city's freshest hip-hop talent. Three headliners trade verses over thunderous 808s, with a live cypher segment open to the crowd. Doors at 9, first set at 9:30.",
  },
  {
    slug: "open-mic-tuesdays",
    name: "Open Mic Tuesdays",
    artists: "Local Performers (Sign-up at the door)",
    date: "Tuesday, June 16, 2026 — 7:00 PM",
    venue: "Brewed Awakening Café",
    genre: "Acoustic / Singer-Songwriter",
    ticketPrice: "Free",
    image:
      "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800&q=80",
    description:
      "The longest-running open mic in town. Bring a guitar, a poem, or just your voice — every performer gets a 10-minute slot. Coffee and pastries available all night. A welcoming room for first-timers.",
  },
  {
    slug: "neon-pulse-festival",
    name: "Neon Pulse Festival",
    artists: "Kilowatt, Synthia, Bass Theory, Pixel Drift",
    date: "Sunday, June 21, 2026 — 4:00 PM",
    venue: "Riverside Amphitheater",
    genre: "EDM",
    ticketPrice: "$45",
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80",
    description:
      "A six-hour outdoor electronic music festival featuring four stages, immersive light installations, and food trucks. Headliner Kilowatt closes out the night with a full audiovisual production under the stars.",
  },
  {
    slug: "strings-and-things",
    name: "Strings & Things",
    artists: "The Hollow Pines, Junebug Quartet",
    date: "Thursday, June 25, 2026 — 7:30 PM",
    venue: "Old Town Listening Room",
    genre: "Folk / Bluegrass",
    ticketPrice: "$15",
    image:
      "https://images.unsplash.com/photo-1543443258-92b04ad5ec6b?w=800&q=80",
    description:
      "A cozy, seated evening of foot-stomping bluegrass and tender folk ballads. The Hollow Pines headline with their signature five-part harmonies, supported by the up-and-coming Junebug Quartet.",
  },
  {
    slug: "jazz-after-dark",
    name: "Jazz After Dark",
    artists: "The Blue Note Collective",
    date: "Saturday, June 27, 2026 — 10:00 PM",
    venue: "The Velvet Cellar",
    genre: "Jazz",
    ticketPrice: "$20",
    image:
      "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80",
    description:
      "Late-night jazz in a candlelit basement club. The Blue Note Collective stretches out across two improvised sets, weaving standards with original compositions. Limited seating — arrive early.",
  },
];

export default events;
