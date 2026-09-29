/* ============================================================
   REELVION — movie detail page logic
   ============================================================ */
(function () {
  "use strict";

  const PLAY_SVG =
    '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
  const STAR_SVG =
    '<svg viewBox="0 0 24 24"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7L5.8 21l1.6-7L2 9.2l7.1-.6z"/></svg>';

  const params = new URLSearchParams(window.location.search);
  const movie = getMovie(params.get("id"));
  const wrap = document.getElementById("movie-root");

  if (!movie) {
    wrap.innerHTML =
      '<div class="container section" style="text-align:center;padding-top:140px">' +
      '<h1 class="hero-title">Movie Not Found</h1>' +
      '<p style="color:var(--muted);margin-bottom:26px">The movie you are looking for does not exist or was removed.</p>' +
      '<a class="btn btn-primary" href="index.html">Back to Home</a>' +
      "</div>";
    document.title = "Movie Not Found — Reelvion";
    return;
  }

  document.title = movie.title + " (" + movie.year + ") — Watch Free on Reelvion";

  /* ---------- hero --------------------------------------------- */
  const hero = document.getElementById("movie-hero");
  const bg = document.createElement("div");
  bg.className = "mh-bg";
  bg.style.backgroundImage = "url('" + movie.backdrop + "')";
  const shade = document.createElement("div");
  shade.className = "mh-shade";
  hero.appendChild(bg);
  hero.appendChild(shade);

  document.getElementById("mh-grid").innerHTML =
    '<div class="mh-poster"><img id="mh-poster-img" src="' + movie.poster + '" alt="' + movie.title + ' poster"></div>' +
    '<div class="mh-info">' +
    '<span class="hero-kicker">Now Streaming on Reelvion</span>' +
    '<h1 class="title">' + movie.title + "</h1>" +
    '<div class="hero-meta">' +
    '<span class="rating-badge">' + STAR_SVG + movie.rating.toFixed(1) + "</span>" +
    '<span class="meta-chip solid">' + movie.certified + "</span>" +
    '<span class="meta-chip">' + movie.year + "</span>" +
    '<span class="meta-chip">' + movie.runtime + "</span>" +
    movie.genres.map(function (g) { return '<span class="meta-chip">' + g + "</span>"; }).join("") +
    '<span class="quality-pill">' + movie.quality + "</span>" +
    "</div>" +
    '<p class="overview">' + movie.description + "</p>" +
    '<div class="mh-director"><div class="label">Director</div>' + movie.director + "</div>" +
    '<div class="mh-cast"><div class="label">Top Cast</div><div class="cast-row">' +
    movie.cast.map(function (c) { return '<span class="cast-pill">' + c + "</span>"; }).join("") +
    "</div></div>" +
    '<div class="mh-actions">' +
    '<button class="btn btn-primary" id="watch-btn">' + PLAY_SVG + " Watch Now</button>" +
    '<button class="btn btn-ghost" id="share-btn">Share</button>' +
    "</div></div>";

  const posterImg = document.getElementById("mh-poster-img");
  posterImg.addEventListener("error", function () {
    posterImg.onerror = null;
    posterImg.src = posterFallback(movie.title);
  });

  /* ---------- player modal -------------------------------------- */
  const modal = document.getElementById("player-modal");
  const video = document.getElementById("player-video");
  const pTitle = document.getElementById("player-title");
  let modalOpen = false;

  function openModal() {
    pTitle.textContent = movie.title + " (" + movie.year + ")";
    video.src = movie.video;
    modal.classList.add("open");
    modalOpen = true;
    document.body.style.overflow = "hidden";
    video.play().catch(function () { /* autoplay restrictions */ });
  }

  function closeModal() {
    modal.classList.remove("open");
    modalOpen = false;
    document.body.style.overflow = "";
    video.pause();
    video.src = "";
  }

  document.getElementById("watch-btn").addEventListener("click", function () {
    // Background monetization: fires the direct link once per
    // interval (skipped automatically when gate is disabled,
    // within the interval window, or on localhost).
    if (window.ReelvionAds) window.ReelvionAds.fireGate();
    openModal();
  });

  document.getElementById("player-close").addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modalOpen) closeModal();
  });

  /* deep link: index hero "Watch Now" sends ?watch=1 */
  if (params.get("watch") === "1") {
    window.setTimeout(function () {
      if (window.ReelvionAds) window.ReelvionAds.fireGate();
      openModal();
    }, 400);
  }

  /* ---------- share --------------------------------------------- */
  document.getElementById("share-btn").addEventListener("click", function () {
    const data = {
      title: movie.title + " — Reelvion",
      text: "Watch " + movie.title + " free on Reelvion",
      url: window.location.href
    };
    if (navigator.share) {
      navigator.share(data).catch(function () { /* cancelled */ });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(data.url).then(function () {
        const btn = document.getElementById("share-btn");
        btn.textContent = "Link Copied!";
        window.setTimeout(function () { btn.textContent = "Share"; }, 2000);
      });
    }
  });

  /* ---------- related grid --------------------------------------- */
  const rel = document.getElementById("related-grid");
  relatedMovies(movie, 6).forEach(function (m) {
    rel.appendChild(window.renderCard(m));
  });
  rel.querySelectorAll(".movie-card").forEach(function (c) { c.classList.add("revealed"); });
})();
