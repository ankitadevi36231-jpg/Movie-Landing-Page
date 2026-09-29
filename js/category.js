/* ============================================================
   REELVION — category page logic
   (shared chrome — nav, footer links, back-to-top — is handled
   by main.js which is also loaded on this page)
   ============================================================ */
(function () {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  const cat = params.get("cat") || "All";
  const grid = document.getElementById("cat-grid");
  const titleEl = document.getElementById("cat-title");
  const countEl = document.getElementById("cat-count");
  const chipBar = document.getElementById("chip-bar");

  const isValid = cat === "All" || CATEGORIES.indexOf(cat) !== -1;
  const activeGenre = isValid ? cat : "All";

  titleEl.innerHTML = activeGenre === "All"
    ? 'All <span>Movies</span>'
    : activeGenre + " <span>Movies</span>";
  document.title = activeGenre + " Movies — Reelvion";

  /* chips let the user switch category without leaving the page */
  ["All"].concat(CATEGORIES).forEach(function (g) {
    const b = document.createElement("button");
    b.className = "chip" + (g === activeGenre ? " active" : "");
    b.textContent = g;
    b.addEventListener("click", function () {
      window.location.href = "category.html?cat=" + encodeURIComponent(g);
    });
    chipBar.appendChild(b);
  });

  const list = moviesByGenre(activeGenre);
  if (!list.length) {
    grid.innerHTML = '<div class="grid-empty">No movies in this category yet.</div>';
  } else {
    list.forEach(function (m) { grid.appendChild(window.renderCard(m)); });
  }
  countEl.textContent = list.length + " title" + (list.length === 1 ? "" : "s") +
    (isValid ? "" : " (unknown category — showing all)");

  grid.querySelectorAll(".movie-card").forEach(function (c) { c.classList.add("revealed"); });
})();
