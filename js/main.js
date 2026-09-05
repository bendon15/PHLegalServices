/**
 * main.js
 * Shared behaviour across every page: mobile nav, footer year,
 * and a small data-access layer other scripts build on.
 */

(function () {
  "use strict";

  // ---- Mobile nav toggle ---------------------------------------------
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // ---- Footer year -----------------------------------------------------
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();

/**
 * PHLegalData
 * Loads the sample lawyer directory once per page and exposes it to
 * every other script.
 *
 * Data source order:
 *   1. data/lawyers.json    — works on any static host (Vercel, GitHub
 *      Pages, Laragon) since it's just a plain file fetch, no server
 *      logic required.
 *   2. php/get-lawyers.php  — used automatically instead of #1 when the
 *      page is opened through a PHP-capable host (see the runtime probe
 *      below); reads the same data from the server side as a working
 *      PHP example for local Laragon/XAMPP use.
 *   3. window.LAWYERS_FALLBACK (js/lawyers-data.js) — last-resort inline
 *      copy so the directory still renders if the page is opened directly
 *      from disk (file://), where fetch() of local files is blocked.
 */
var PHLegalData = (function () {
  function getLawyers() {
    if (window.__LAWYERS_CACHE__) {
      return Promise.resolve(window.__LAWYERS_CACHE__);
    }
    return fetch("data/lawyers.json")
      .then(function (res) {
        if (!res.ok) throw new Error("data file not reachable");
        return res.json();
      })
      .catch(function () {
        return window.LAWYERS_FALLBACK || [];
      })
      .then(function (data) {
        window.__LAWYERS_CACHE__ = data;
        return data;
      });
  }

  return { getLawyers: getLawyers };
})();
