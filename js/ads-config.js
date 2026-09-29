/* ============================================================
   REELVION — ADS & MONETIZATION CONFIG
   ------------------------------------------------------------
   Paste your ad-network code in the three placeholders below.
   Built for Monetag / PropellerAds style tags:
     - Popunder script
     - Social Bar script
     - Direct Link URL (used by the click-gate)
   ============================================================ */

const ADS_CONFIG = {

  /* 1) POPUNDER ------------------------------------------------
     Paste the FULL script snippet your ad network gives you, e.g.:
     '<script type="application/javascript" src="https://.../script.js" data-zone="XXXXXXX" async data-cfasync="false"></script>'
     Leave as "" to disable. Injected once per browser session. */
  POPUNDER_CODE: "<script src="https://pl31576280.profitableratecpmnetwork.com/1f/ac/d1/1facd1986abb81d27eceeb97ca4c2f1b.js"></script>",

  /* 2) SOCIAL BAR ----------------------------------------------
     Paste the social bar snippet, e.g.:
     '<script src="https://.../social-bar.js" data-zone="XXXXXXX" async></script>'
     It mounts into the #social-bar-slot container on every page.
     Leave as "" to disable. */
  SOCIAL_BAR_CODE: "<script src="https://pl31576281.profitableratecpmnetwork.com/90/40/75/904075eec7c64cfe49aa1fc7aa32eb20.js"></script>",

  /* 3) DIRECT LINK ---------------------------------------------
     The monetized URL users visit once before entering a movie
     page, e.g.:
     'https://your-network.com/click?zone=XXXXXXX&campaign=...'
     Leave as "" to skip the click-gate entirely (dev mode). */
  DIRECT_LINK_URL: "https://www.profitableratecpmnetwork.com/quh40v0r6s?key=41688e0035a87ee27ba805a7316d3cb7",

  /* Click-gate behaviour */
  GATE: {
    /* After the gate fires once, users browse freely for this
       many minutes before it can fire again. */
    INTERVAL_MINUTES: 60,

    /* Show a brief "Preparing your movie…" overlay while the
       direct link opens. */
    SHOW_OVERLAY: true,

    /* Skip the gate on localhost / file:// so development is
       never interrupted. Set false to test the gate locally. */
    SKIP_LOCALHOST: true
  }
};

/* ============================================================
   AD LOADER + CLICK-GATE ENGINE          (no need to edit below)
   ============================================================ */
(function () {
  "use strict";

  const IS_LOCAL = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) ||
                   location.protocol === "file:";

  /* ---------- script-tag aware injector ---------------------- */
  function injectAdCode(code, mount) {
    if (!code) return null;
    const holder = mount || document.body;
    const box = document.createElement("div");
    box.className = "ad-injected";
    const frag = document.createDocumentFragment();
    const tpl = document.createElement("template");
    tpl.innerHTML = code.trim();
    Array.prototype.slice.call(tpl.content.childNodes).forEach(function (node) {
      if (node.tagName === "SCRIPT") {
        const s = document.createElement("script");
        Array.prototype.slice.call(node.attributes).forEach(function (a) {
          s.setAttribute(a.name, a.value);
        });
        if (node.src) s.src = node.src;
        s.text = node.textContent || "";
        frag.appendChild(s);
      } else {
        frag.appendChild(node.cloneNode(true));
      }
    });
    box.appendChild(frag);
    holder.appendChild(box);
    return box;
  }

  /* ---------- popunder (once per session) -------------------- */
  function injectPopunder() {
    if (!ADS_CONFIG.POPUNDER_CODE) return;
    if (sessionStorage.getItem("rv_popunder_shown")) return;
    sessionStorage.setItem("rv_popunder_shown", "1");
    injectAdCode(ADS_CONFIG.POPUNDER_CODE);
  }

  /* ---------- social bar -------------------------------------- */
  function injectSocialBar() {
    if (!ADS_CONFIG.SOCIAL_BAR_CODE) return;
    const mount = document.getElementById("social-bar-slot");
    if (mount) injectAdCode(ADS_CONFIG.SOCIAL_BAR_CODE, mount);
  }

  /* ---------- click gate -------------------------------------- */
  const GATE_KEY = "rv_gate_until";
  const PENDING_KEY = "rv_pending_url";

  function gateEnabled() {
    if (!ADS_CONFIG.DIRECT_LINK_URL) return false;
    if (ADS_CONFIG.GATE.SKIP_LOCALHOST && IS_LOCAL) return false;
    return true;
  }

  function gateActive() {
    return Date.now() < parseInt(localStorage.getItem(GATE_KEY) || "0", 10);
  }

  function showOverlay() {
    if (!ADS_CONFIG.GATE.SHOW_OVERLAY) return;
    let ov = document.getElementById("gate-overlay");
    if (!ov) {
      ov = document.createElement("div");
      ov.id = "gate-overlay";
      ov.innerHTML =
        '<div class="gate-box">' +
        '<div class="gate-spinner"></div>' +
        "<p>Preparing your movie&hellip;</p>" +
        "<small>You will be taken to the stream in a moment.</small>" +
        "</div>";
      document.body.appendChild(ov);
    }
    ov.classList.add("active");
  }

  function hideOverlay() {
    const ov = document.getElementById("gate-overlay");
    if (ov) ov.classList.remove("active");
  }

  /* Gate entry point: called for every data-gate link click.
     Flow: click -> direct link opens (new tab when allowed) ->
     when the user returns to our tab -> movie page opens.       */
  function intercept(targetUrl) {
    if (!gateEnabled() || gateActive()) {
      window.location.href = targetUrl;
      return;
    }
    localStorage.setItem(GATE_KEY, String(Date.now() + ADS_CONFIG.GATE.INTERVAL_MINUTES * 60000));
    try { sessionStorage.setItem(PENDING_KEY, targetUrl); } catch (e) { /* noop */ }
    showOverlay();
    const win = window.open(ADS_CONFIG.DIRECT_LINK_URL, "_blank", "noopener");
    if (!win) {
      // Popup blocked -> same-tab redirect; the pageshow handler
      // below completes the journey when the user comes Back.
      window.location.href = ADS_CONFIG.DIRECT_LINK_URL;
    }
    // Safety: never leave the overlay stuck on screen.
    window.setTimeout(hideOverlay, 15000);
  }

  /* Fire the direct link in the background (e.g. behind the
     player modal) without navigating anywhere. */
  function fireGate() {
    if (!gateEnabled() || gateActive()) return;
    localStorage.setItem(GATE_KEY, String(Date.now() + ADS_CONFIG.GATE.INTERVAL_MINUTES * 60000));
    window.open(ADS_CONFIG.DIRECT_LINK_URL, "_blank", "noopener");
  }

  function consumePending() {
    let target = null;
    try { target = sessionStorage.getItem(PENDING_KEY); } catch (e) {}
    if (!target) return false;
    try { sessionStorage.removeItem(PENDING_KEY); } catch (e) {}
    if (window.location.href === target) return false;
    window.setTimeout(function () { window.location.href = target; }, 350);
    return true;
  }

  window.addEventListener("focus", function () {
    if (consumePending()) hideOverlay();
  });
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden && consumePending()) hideOverlay();
  });
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) { consumePending(); hideOverlay(); }
  });

  /* Every link/button carrying data-gate goes through the gate */
  document.addEventListener("click", function (ev) {
    if (!ev.target || !ev.target.closest) return;
    const el = ev.target.closest("a[data-gate], [data-gate]");
    if (!el) return;
    const href = el.getAttribute("data-gate") ||
                 (el.getAttribute("href") && el.getAttribute("href").charAt(0) !== "#" ? el.getAttribute("href") : "");
    if (!href || href.charAt(0) === "#") return;
    ev.preventDefault();
    intercept(href);
  });

  document.addEventListener("DOMContentLoaded", function () {
    injectPopunder();
    injectSocialBar();
    // Landing fresh on a page: stale pending targets are dropped.
    try { sessionStorage.removeItem(PENDING_KEY); } catch (e) {}
  });

  /* Public API */
  window.ReelvionAds = { intercept: intercept, fireGate: fireGate };


})();
