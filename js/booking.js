/**
 * booking.js
 * Drives the three-step booking flow on booking.html.
 *
 * Persistence: the form first tries to POST to php/book.php (a working
 * PHP + JSON-file example meant for a local Laragon/XAMPP server, where
 * the filesystem is writable). On static hosting such as Vercel, that
 * endpoint isn't running, so on failure the booking is instead saved to
 * localStorage under "phlegal_bookings" — enough to demo a complete,
 * working flow (confirmation screen, booking reference, "my bookings"
 * lookup) without a database.
 */

(function () {
  "use strict";

  var form = document.getElementById("booking-form");
  if (!form) return;

  var steps = Array.prototype.slice.call(document.querySelectorAll(".form-panel"));
  var stepperItems = Array.prototype.slice.call(document.querySelectorAll(".stepper li"));
  var current = 0;

  var lawyerSelect = document.getElementById("lawyer-select");
  var lawyerHint = document.getElementById("lawyer-hint");
  var dateInput = document.getElementById("booking-date");
  var slotGrid = document.getElementById("slot-grid");
  var selectedSlot = null;

  var receiptLawyer = document.getElementById("receipt-lawyer");
  var receiptDate = document.getElementById("receipt-date");
  var receiptTime = document.getElementById("receipt-time");
  var receiptMode = document.getElementById("receipt-mode");
  var receiptRate = document.getElementById("receipt-rate");

  var ALL_LAWYERS = [];
  var SAMPLE_SLOTS = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

  function findLawyer(id) {
    return ALL_LAWYERS.filter(function (l) { return l.id === id; })[0];
  }

  function paramLawyerId() {
    var params = new URLSearchParams(window.location.search);
    return params.get("lawyer");
  }

  function populateLawyerSelect() {
    ALL_LAWYERS.forEach(function (l) {
      var opt = document.createElement("option");
      opt.value = l.id;
      opt.textContent = l.name + " — " + l.specialties[0];
      lawyerSelect.appendChild(opt);
    });

    var preselect = paramLawyerId();
    if (preselect && findLawyer(preselect)) {
      lawyerSelect.value = preselect;
    }
    updateLawyerHint();
  }

  function updateLawyerHint() {
    var lawyer = findLawyer(lawyerSelect.value);
    if (!lawyer) {
      lawyerHint.textContent = "";
      renderModeOptions(null);
      return;
    }
    lawyerHint.textContent =
      lawyer.title + " at " + lawyer.firm + " · " + lawyer.location + " · " + lawyer.rate;
    renderModeOptions(lawyer);
  }

  function renderModeOptions(lawyer) {
    var container = document.getElementById("mode-options");
    if (!container) return;
    var modes = lawyer ? lawyer.mode : ["In-person", "Video call", "Phone call"];
    container.innerHTML = modes
      .map(function (m, i) {
        var id = "mode-" + i;
        return (
          '<input type="radio" id="' + id + '" name="mode" value="' + m + '"' + (i === 0 ? " checked" : "") + ">" +
          '<label for="' + id + '">' + m + "</label>"
        );
      })
      .join("");
  }

  function renderSlots() {
    slotGrid.innerHTML = SAMPLE_SLOTS
      .map(function (time, i) {
        // Deterministic "already booked" demo pattern so the grid feels alive.
        var taken = (i + (dateInput.value ? dateInput.value.length : 0)) % 5 === 0;
        return (
          '<button type="button" class="slot-btn" data-time="' + time + '"' +
          (taken ? " disabled" : "") + ">" + time + "</button>"
        );
      })
      .join("");
    selectedSlot = null;
  }

  slotGrid && slotGrid.addEventListener("click", function (e) {
    var btn = e.target.closest(".slot-btn");
    if (!btn || btn.disabled) return;
    Array.prototype.forEach.call(slotGrid.querySelectorAll(".slot-btn"), function (b) {
      b.classList.remove("is-selected");
    });
    btn.classList.add("is-selected");
    selectedSlot = btn.getAttribute("data-time");
  });

  dateInput && dateInput.addEventListener("change", renderSlots);
  lawyerSelect && lawyerSelect.addEventListener("change", updateLawyerHint);

  // ---- Step navigation ---------------------------------------------------

  function showStep(index) {
    steps.forEach(function (panel, i) {
      panel.classList.toggle("is-active", i === index);
    });
    stepperItems.forEach(function (item, i) {
      item.classList.toggle("is-done", i < index);
      item.classList.toggle("is-active", i === index);
    });
    current = index;
    window.scrollTo({ top: form.offsetTop - 110, behavior: "smooth" });
  }

  function validateStep(index) {
    var panel = steps[index];
    var fields = panel.querySelectorAll("input[required], select[required], textarea[required]");
    var valid = true;

    fields.forEach(function (field) {
      var group = field.closest(".field-group");
      var fieldValid = field.checkValidity();
      if (group) group.classList.toggle("has-error", !fieldValid);
      if (!fieldValid) valid = false;
    });

    if (index === 1 && !selectedSlot) {
      var slotGroup = document.getElementById("slot-error-group");
      if (slotGroup) slotGroup.classList.add("has-error");
      valid = false;
    }

    return valid;
  }

  document.querySelectorAll("[data-next-step]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (!validateStep(current)) return;
      if (current === 1) updateReceipt();
      if (current < steps.length - 1) showStep(current + 1);
    });
  });

  document.querySelectorAll("[data-prev-step]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (current > 0) showStep(current - 1);
    });
  });

  function updateReceipt() {
    var lawyer = findLawyer(lawyerSelect.value);
    var mode = form.querySelector('input[name="mode"]:checked');
    if (receiptLawyer) receiptLawyer.textContent = lawyer ? lawyer.name : "—";
    if (receiptDate) receiptDate.textContent = dateInput.value || "—";
    if (receiptTime) receiptTime.textContent = selectedSlot || "—";
    if (receiptMode) receiptMode.textContent = mode ? mode.value : "—";
    if (receiptRate) receiptRate.textContent = lawyer ? lawyer.rate : "—";
  }

  // ---- Submission ---------------------------------------------------------

  function generateReference() {
    var year = new Date().getFullYear();
    var rand = Math.floor(1000 + Math.random() * 9000);
    return "DLB-" + year + "-" + rand;
  }

  function saveToLocalStorage(booking) {
    var key = "phlegal_bookings";
    var existing = [];
    try {
      existing = JSON.parse(localStorage.getItem(key)) || [];
    } catch (e) {
      existing = [];
    }
    existing.push(booking);
    localStorage.setItem(key, JSON.stringify(existing));
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validateStep(2)) return;

    var lawyer = findLawyer(lawyerSelect.value);
    var mode = form.querySelector('input[name="mode"]:checked');
    var reference = generateReference();

    var booking = {
      reference: reference,
      lawyerId: lawyer ? lawyer.id : null,
      lawyerName: lawyer ? lawyer.name : null,
      clientName: document.getElementById("client-name").value.trim(),
      clientEmail: document.getElementById("client-email").value.trim(),
      clientPhone: document.getElementById("client-phone").value.trim(),
      date: dateInput.value,
      time: selectedSlot,
      mode: mode ? mode.value : null,
      concern: document.getElementById("client-concern").value.trim(),
      createdAt: new Date().toISOString(),
    };

    var submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Submitting…"; }

    fetch("php/book.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    })
      .then(function (res) {
        if (!res.ok) throw new Error("php runtime unavailable");
        return res.json();
      })
      .catch(function () {
        // Static-hosting fallback — persist client-side instead.
        saveToLocalStorage(booking);
        return { ok: true, reference: reference };
      })
      .then(function () {
        showConfirmation(booking);
      });
  });

  function showConfirmation(booking) {
    steps.forEach(function (panel) { panel.classList.remove("is-active"); });
    stepperItems.forEach(function (item) { item.classList.add("is-done"); });
    document.querySelector(".stepper").style.display = "none";

    var confirmPanel = document.getElementById("confirm-panel");
    confirmPanel.classList.add("is-active");
    confirmPanel.style.display = "block";

    document.getElementById("confirm-reference").textContent = booking.reference;
    document.getElementById("confirm-summary").textContent =
      booking.lawyerName + " · " + booking.date + " at " + booking.time + " · " + booking.mode;
    document.getElementById("confirm-email").textContent = booking.clientEmail;
  }

  PHLegalData.getLawyers().then(function (data) {
    ALL_LAWYERS = data;
    populateLawyerSelect();
    renderSlots();
  });
})();
