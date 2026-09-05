/**
 * contact.js
 * Validates and submits the general contact form on contact.html.
 * Same fallback pattern as booking.js: try php/contact.php first (for a
 * local PHP host), fall back to localStorage on static hosting.
 */

(function () {
  "use strict";

  var form = document.getElementById("contact-form");
  if (!form) return;

  var successBox = document.querySelector("[data-contact-success]");

  function validate() {
    var fields = form.querySelectorAll("input[required], select[required], textarea[required]");
    var valid = true;
    fields.forEach(function (field) {
      var group = field.closest(".field-group");
      var ok = field.checkValidity();
      if (group) group.classList.toggle("has-error", !ok);
      if (!ok) valid = false;
    });
    return valid;
  }

  function saveLocally(message) {
    var key = "phlegal_messages";
    var existing = [];
    try {
      existing = JSON.parse(localStorage.getItem(key)) || [];
    } catch (e) {
      existing = [];
    }
    existing.push(message);
    localStorage.setItem(key, JSON.stringify(existing));
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate()) return;

    var message = {
      name: document.getElementById("contact-name").value.trim(),
      email: document.getElementById("contact-email").value.trim(),
      subject: document.getElementById("contact-subject").value,
      message: document.getElementById("contact-message").value.trim(),
      createdAt: new Date().toISOString(),
    };

    var submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Sending…"; }

    fetch("php/contact.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    })
      .then(function (res) {
        if (!res.ok) throw new Error("php runtime unavailable");
        return res.json();
      })
      .catch(function () {
        saveLocally(message);
        return { ok: true };
      })
      .then(function () {
        form.reset();
        form.style.display = "none";
        if (successBox) successBox.classList.add("is-visible");
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Send message"; }
      });
  });
})();
