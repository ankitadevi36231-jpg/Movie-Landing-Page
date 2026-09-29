# Reelvion — Dark Cinema Movie Site

A premium dark-cinema movie template (pure HTML/CSS/JS — no build step, no frameworks) with
built-in ad integration slots: **Popunder**, **Social Bar** and a **Direct-Link click-gate**.

## Files

```
index.html          Home — hero slider, latest movies grid, category filter, top-rated row
movie.html          Movie detail — hero, cast, demo player modal, related movies
category.html       Category browsing — ?cat=Action, ?cat=Sci-Fi, ...
css/style.css       All styling (dark cinema theme, responsive)
js/ads-config.js    ★ Ads + click-gate config (EDIT THIS FIRST)
js/movies-data.js   Movie database (12 template movies, verified TMDB art)
js/main.js          Home-page logic + shared card renderer / chrome
js/movie.js         Movie-page logic
js/category.js      Category-page logic
favicon.svg         Brand icon
```

## 1. Configure your ads

Open **`js/ads-config.js`** — everything lives in one top-of-file block:

```js
const ADS_CONFIG = {
  POPUNDER_CODE:   "<paste your popunder <script> snippet>",
  SOCIAL_BAR_CODE: "<paste your social bar <script> snippet>",
  DIRECT_LINK_URL: "https://your-network.com/click?zone=XXXXXXX",
  GATE: {
    INTERVAL_MINUTES: 60,   // free browsing window after the gate fires
    SHOW_OVERLAY: true,     // "Preparing your movie…" overlay
    SKIP_LOCALHOST: true    // gate never fires during local development
  }
};
```

- Leave any field as `""` to disable that feature.
- `POPUNDER_CODE` injects **once per browser session** (tracked via `sessionStorage`).
- `SOCIAL_BAR_CODE` mounts into the `#social-bar-slot` container on every page.
- Script tags pasted as strings are executed properly (attributes + inline code are re-created).

## 2. How the direct-link click-gate works

1. User clicks any movie card / "More Info" link (every card carries `data-gate`).
2. The gate engine saves the intended movie URL, then opens your `DIRECT_LINK_URL`
   (new tab when the browser allows it; otherwise a same-tab redirect).
3. When the user returns to the site (tab focus / visibility change / back-navigation),
   the saved movie URL is consumed and the **movie page opens automatically**.
4. For the next `INTERVAL_MINUTES` (default 60) all clicks go straight through —
   no more gate, so the user experience stays smooth.
5. On the movie page, pressing **Watch Now** opens the player modal and fires the
   direct link in the background (only once per interval window).

Debug/testing: set `GATE.SKIP_LOCALHOST: false` and fill `DIRECT_LINK_URL` with any URL.

## 3. Add or edit movies

Edit `js/movies-data.js`. Each entry:

```js
{
  id: "my-movie",             // used in movie.html?id=my-movie (also the URL slug)
  title: "My Movie",
  year: 2024,
  rating: 8.0,                // 0-10
  runtime: "2h 5m",
  certified: "PG-13",
  quality: "4K",              // shown as badge
  genres: ["Action", "Sci-Fi"],  // must exist in CATEGORIES to appear in filters
  featured: true,             // include in the hero slider (3-6 recommended)
  director: "…",
  cast: ["…", "…"],
  poster: "https://image.tmdb.org/t/p/w500/HASH.jpg",
  backdrop: "https://image.tmdb.org/t/p/w1280/HASH.jpg",
  description: "…",
  video: "https://…/sample.mp4"   // demo player source
}
```

Broken posters automatically fall back to a branded placeholder.

## 4. Run locally

Static site — open `index.html` directly, or serve it:

```bash
python -m http.server 8080
# or
npx serve .
```

Then visit `http://localhost:8080`.

## Notes / limitations

- All 12 movies are template content with real metadata and **HEAD-verified TMDB artwork**.
- The demo player uses a public sample MP4; replace each movie's `video` field with a real stream.
- Page ad-slot containers (`#top-billboard`, `#mid-billboard`, `#movie-billboard`, `#cat-billboard`)
  are ready if you also want display/banner ads in addition to popunder/social-bar.
- Rate movie metadata/artwork as TMDB content and respect their attribution terms when deploying.
