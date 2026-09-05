/**
 * directory.js
 * Renders the lawyer directory and wires up the filter bar on lawyers.html.
 * Also used in "preview" mode (data-limit) on index.html for the homepage
 * teaser list.
 */

(function () {
  "use strict";

  var list = document.querySelector("[data-lawyer-list]");
  if (!list) return;

  var previewLimit = parseInt(list.getAttribute("data-limit") || "0", 10);
  var searchInput = document.querySelector("[data-filter-search]");
  var specialtySelect = document.querySelector("[data-filter-specialty]");
  var modeSelect = document.querySelector("[data-filter-mode]");
  var countLabel = document.querySelector("[data-filter-count]");
  var emptyState = document.querySelector("[data-empty-state]");

  var ALL_LAWYERS = [];

  function starString(rating) {
    var full = Math.round(rating);
    return "★★★★★".slice(0, full) + "☆☆☆☆☆".slice(full);
  }

  function renderRow(lawyer) {
    var specialtiesHtml = lawyer.specialties
      .map(function (s) {
        return '<span class="tag">' + s + "</span>";
      })
      .join("");

    return (
      '<article class="lawyer-row" data-lawyer-id="' + lawyer.id + '">' +
        '<div class="avatar-mono" aria-hidden="true">' + lawyer.initials + "</div>" +
        '<div class="lawyer-main">' +
          '<div class="name-line"><h3>' + lawyer.name + "</h3></div>" +
          '<div class="role">' + lawyer.title + " · " + lawyer.firm + "</div>" +
          '<div class="tag-row">' + specialtiesHtml + "</div>" +
        "</div>" +
        '<div class="lawyer-meta">' +
          '<div class="rating"><span class="star">' + starString(lawyer.rating) + "</span> " + lawyer.rating + " (" + lawyer.reviews + " reviews)</div>" +
          "<div>" + lawyer.location + "</div>" +
          "<div>" + lawyer.experienceYears + " yrs experience &middot; " + lawyer.mode.join(", ") + "</div>" +
        "</div>" +
        '<div class="lawyer-cta">' +
          '<span class="rate">' + lawyer.rate + "</span>" +
          '<a class="btn btn-primary btn-sm" href="booking.html?lawyer=' + lawyer.id + '">Book consultation</a>' +
        "</div>" +
      "</article>"
    );
  }

  function applyFilters() {
    var term = (searchInput && searchInput.value || "").trim().toLowerCase();
    var specialty = specialtySelect && specialtySelect.value || "";
    var mode = modeSelect && modeSelect.value || "";

    var filtered = ALL_LAWYERS.filter(function (l) {
      var matchesTerm =
        !term ||
        l.name.toLowerCase().indexOf(term) > -1 ||
        l.firm.toLowerCase().indexOf(term) > -1 ||
        l.location.toLowerCase().indexOf(term) > -1 ||
        l.specialties.join(" ").toLowerCase().indexOf(term) > -1;

      var matchesSpecialty = !specialty || l.specialties.indexOf(specialty) > -1;
      var matchesMode = !mode || l.mode.indexOf(mode) > -1;

      return matchesTerm && matchesSpecialty && matchesMode;
    });

    if (previewLimit) filtered = filtered.slice(0, previewLimit);

    list.innerHTML = filtered.map(renderRow).join("");

    if (countLabel) {
      countLabel.textContent = filtered.length + (filtered.length === 1 ? " lawyer found" : " lawyers found");
    }
    if (emptyState) {
      emptyState.style.display = filtered.length ? "none" : "block";
    }
  }

  function populateSpecialtyOptions() {
    if (!specialtySelect) return;
    var set = new Set();
    ALL_LAWYERS.forEach(function (l) {
      l.specialties.forEach(function (s) { set.add(s); });
    });
    Array.from(set).sort().forEach(function (s) {
      var opt = document.createElement("option");
      opt.value = s;
      opt.textContent = s;
      specialtySelect.appendChild(opt);
    });
  }

  PHLegalData.getLawyers().then(function (data) {
    ALL_LAWYERS = data;
    populateSpecialtyOptions();
    applyFilters();
  });

  [searchInput, specialtySelect, modeSelect].forEach(function (el) {
    if (!el) return;
    el.addEventListener("input", applyFilters);
    el.addEventListener("change", applyFilters);
  });
})();
