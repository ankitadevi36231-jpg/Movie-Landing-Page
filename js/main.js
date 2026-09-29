/* ============================================================
   REELVION — shared logic: hero slider, cards, grid, search
   ============================================================ */
(function () {
  "use strict";

  const PLAY_SVG =
    '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
  const STAR_SVG =
    '<svg viewBox="0 0 24 24"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7L5.8 21l1.6-7L2 9.2l7.1-.6z"/></svg>';

  /* ---------- shared card renderer ---------------------------- */
  window.renderCard = function (m, extraClass, rank) {
    const card = document.createElement("a");
    card.className = "movie-card" + (extraClass ? " " + extraClass : "");
    card.href = "movie.html?id=" + m.id;
    card.setAttribute("data-gate", "movie.html?id=" + m.id);
    card.innerHTML =
      '<div class="card-poster">' +
      '<img src="' + m.poster + '" alt="' + m.title + ' poster" loading="lazy">' +
      '<div class="card-badges">' +
      '<span class="quality-pill">' + m.quality + "</span></div>" +
      '<span class="card-rating">' + STAR_SVG + m.rating.toFixed(1) + "</span>" +
      '<div class="card-overlay"><span class="play-circle">' + PLAY_SVG + "</span></div>" +
      (rank ? '<span class="rank-badge">' + String(rank).padStart(2, "0") + "</span>" : "") +
      "</div>" +
      '<div class="card-info">' +
      '<div class="card-title">' + m.title + "</div>" +
      '<div class="card-sub"><span>' + m.year + "</span><span>" + m.genres[0] + "</span></div>" +
      "</div>";
    card.querySelector("img").addEventListener("error", function () {
      this.onerror = null;
      this.src = posterFallback(m.title);
    });
    return card;
  };

  /* ---------- reveal-on-scroll -------------------------------- */
  function observeReveal(container) {
    if (!("IntersectionObserver" in window)) {
      container.querySelectorAll(".movie-card").forEach(function (c) { c.classList.add("revealed"); });
      return;
    }
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("revealed");
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: "60px" });
    container.querySelectorAll(".movie-card").forEach(function (c) { io.observe(c); });
  }

  window.rvObserveReveal = observeReveal;

  /* ---------- hero slider -------------------------------------- */
  const heroSection = document.getElementById("hero");
  if (heroSection) {
    const slides = featuredMovies();
    let current = 0;
    let timer = null;

    slides.forEach(function (m, i) {
      const slide = document.createElement("div");
      slide.className = "hero-slide" + (i === 0 ? " active" : "");
      slide.innerHTML =
        '<div class="hero-bg" style="background-image:url(\'' + m.backdrop + "')\"></div>" +
        '<div class="hero-shade"></div>';
      heroSection.appendChild(slide);
    });

    const content = document.createElement("div");
    content.className = "container";
    content.innerHTML = '<div class="hero-content" id="hero-content"></div>';
    heroSection.appendChild(content);

    const dots = document.createElement("div");
    dots.className = "hero-dots";
    slides.forEach(function (_, i) {
      const b = document.createElement("button");
      if (i === 0) b.classList.add("active");
      b.setAttribute("aria-label", "Slide " + (i + 1));
      b.addEventListener("click", function () { show(i); restart(); });
      dots.appendChild(b);
    });
    heroSection.appendChild(dots);

    function fillContent(m) {
      document.getElementById("hero-content").innerHTML =
        '<span class="hero-kicker">Featured on Reelvion</span>' +
        '<h1 class="hero-title">' + m.title + "</h1>" +
        '<div class="hero-meta">' +
        '<span class="rating-badge">' + STAR_SVG + m.rating.toFixed(1) + "</span>" +
        '<span class="meta-chip solid">' + m.certified + "</span>" +
        '<span class="meta-chip">' + m.year + "</span>" +
        '<span class="meta-chip">' + m.runtime + "</span>" +
        '<span class="quality-pill">' + m.quality + "</span>" +
        "</div>" +
        '<p class="hero-desc">' + m.description + "</p>" +
        '<div class="hero-actions">' +
        '<button class="btn btn-primary" id="hero-watch">' + PLAY_SVG + " Watch Now</button>" +
        '<a class="btn btn-ghost" data-gate="movie.html?id=' + m.id + '" href="movie.html?id=' + m.id + '">More Info</a>' +
        "</div>";
      document.getElementById("hero-watch").addEventListener("click", function () {
        window.location.href = "movie.html?id=" + m.id + "&watch=1";
      });
    }

    function show(i) {
      current = (i + slides.length) % slides.length;
      heroSection.querySelectorAll(".hero-slide").forEach(function (s, idx) {
        s.classList.toggle("active", idx === current);
      });
      dots.querySelectorAll("button").forEach(function (b, idx) {
        b.classList.toggle("active", idx === current);
      });
      fillContent(slides[current]);
    }

    function restart() {
      if (timer) clearInterval(timer);
      timer = setInterval(function () { show(current + 1); }, 6500);
    }

    fillContent(slides[0]);
    restart();
  }

  /* ---------- category chips + main grid ----------------------- */
  const grid = document.getElementById("movie-grid");
  if (grid) {
    const chipBar = document.getElementById("chip-bar");
    const countEl = document.getElementById("grid-count");
    let activeGenre = "All";
    let query = "";

    function renderChips() {
      const all = ["All"].concat(CATEGORIES);
      chipBar.innerHTML = "";
      all.forEach(function (g) {
        const b = document.createElement("button");
        b.className = "chip" + (g === activeGenre ? " active" : "");
        b.textContent = g;
        b.addEventListener("click", function () {
          activeGenre = g;
          chipBar.querySelectorAll(".chip").forEach(function (c) {
            c.classList.toggle("active", c === b);
          });
          renderGrid();
        });
        chipBar.appendChild(b);
      });
    }

    function renderGrid() {
      let list = moviesByGenre(activeGenre);
      if (query) {
        const q = query.toLowerCase();
        list = list.filter(function (m) {
          return (m.title + " " + m.genres.join(" ")).toLowerCase().indexOf(q) !== -1;
        });
      }
      grid.innerHTML = "";
      if (!list.length) {
        grid.innerHTML = '<div class="grid-empty">No movies match your search.</div>';
      } else {
        list.forEach(function (m) { grid.appendChild(renderCard(m)); });
      }
      if (countEl) countEl.textContent = list.length + " title" + (list.length === 1 ? "" : "s");
      observeReveal(grid);
    }

    renderChips();
    renderGrid();

    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.addEventListener("input", function () {
        query = this.value.trim();
        renderGrid();
      });
    }
  }

  /* ---------- top-rated scroller ------------------------------- */
  const topRow = document.getElementById("toprated-row");
  if (topRow) {
    topRatedMovies().forEach(function (m, i) {
      topRow.appendChild(renderCard(m, null, i + 1));
    });
    observeReveal(topRow);
  }

  /* ---------- footer category links ----------------------------- */
  const footCats = document.getElementById("footer-cats");
  if (footCats) {
    CATEGORIES.forEach(function (g) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "category.html?cat=" + encodeURIComponent(g);
      a.textContent = g;
      li.appendChild(a);
      footCats.appendChild(li);
    });
  }

  /* ---------- misc chrome --------------------------------------- */
  const navToggle = document.getElementById("nav-toggle");
  const mainNav = document.getElementById("main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      mainNav.classList.toggle("open");
    });
  }

  const toTop = document.getElementById("to-top");
  if (toTop) {
    window.addEventListener("scroll", function () {
      toTop.classList.toggle("show", window.scrollY > 500);
    });
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }



})();
