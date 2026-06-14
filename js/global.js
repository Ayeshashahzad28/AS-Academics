// GLOBAL JS — routing, theme, navbar, toast, scroll

/* ---- THEME ---- */
(function () {
  const saved = localStorage.getItem("asa-theme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
})();

function toggleTheme() {
  const html = document.documentElement;
  const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
  html.setAttribute("data-theme", next);
  localStorage.setItem("asa-theme", next);
  const icon = document.getElementById("themeIcon");
  if (icon)
    icon.className = next === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
}

/* ---- PAGE ROUTING ---- */
function showPage(name) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document
    .querySelectorAll(".nav-links a[data-page]")
    .forEach((a) => a.classList.remove("active"));
  const pg = document.getElementById("page-" + name);
  if (pg) pg.classList.add("active");
  const link = document.querySelector(`.nav-links a[data-page="${name}"]`);
  if (link) link.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
  closeNav();
  if (name === "events") initCalendar();
  if (name === "courses") renderCourses("all");
  if (name === "teachers") renderTeachers();
  if (name === "home") runStats();
}

document.addEventListener("DOMContentLoaded", function () {
  /* nav link clicks */
  document.querySelectorAll(".nav-links a[data-page]").forEach((a) => {
    a.addEventListener("click", () => showPage(a.dataset.page));
  });

  /* hamburger */
  const ham = document.getElementById("hamburger");
  if (ham)
    ham.addEventListener("click", function () {
      this.classList.toggle("open");
      document.getElementById("navLinks").classList.toggle("open");
    });

  /* theme toggle icon init */
  const icon = document.getElementById("themeIcon");
  if (icon) {
    const cur = document.documentElement.getAttribute("data-theme");
    icon.className = cur === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
  }

  /* scroll */
  window.addEventListener("scroll", () => {
    document
      .getElementById("btt")
      ?.classList.toggle("show", window.scrollY > 320);
  });

  /* init home */
  runStats();
});

function closeNav() {
  document.getElementById("navLinks")?.classList.remove("open");
  document.getElementById("hamburger")?.classList.remove("open");
}

/* ---- TOAST ---- */
function showToast(msg) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3400);
}

/* ---- NEWSLETTER ---- */
function handleNL() {
  const inp = document.getElementById("nlEmail");
  if (!inp) return;
  if (!inp.value || !inp.value.includes("@")) {
    inp.style.outline = "3px solid rgba(255,255,255,.5)";
    setTimeout(() => (inp.style.outline = ""), 1500);
    return;
  }
  const v = inp.value;
  inp.value = "";
  inp.placeholder = "✓ Subscribed!";
  setTimeout(() => (inp.placeholder = "Enter your email address"), 3000);
  showToast("Subscribed with " + v);
}
