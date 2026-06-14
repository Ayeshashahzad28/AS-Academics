// HOME PAGE JS — hero slider + stats counter

/* ---- HERO SLIDER ---- */
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  const dotsWrap = document.getElementById("sliderDots");
  if (!slides.length || !dotsWrap) return;

  let cur = 0,
    timer;

  function goTo(n) {
    slides[cur].classList.remove("active");
    cur = ((n % slides.length) + slides.length) % slides.length;
    slides[cur].classList.add("active");
    document
      .querySelectorAll(".dot")
      .forEach((d, i) => d.classList.toggle("active", i === cur));
  }

  slides.forEach((_, i) => {
    const d = document.createElement("button");
    d.className = "dot" + (i === 0 ? " active" : "");
    d.setAttribute("aria-label", "Slide " + (i + 1));
    d.onclick = () => {
      goTo(i);
      resetT();
    };
    dotsWrap.appendChild(d);
  });

  function resetT() {
    clearInterval(timer);
    timer = setInterval(() => goTo(cur + 1), 5500);
  }

  document.getElementById("saPrev")?.addEventListener("click", () => {
    goTo(cur - 1);
    resetT();
  });
  document.getElementById("saNext")?.addEventListener("click", () => {
    goTo(cur + 1);
    resetT();
  });
  resetT();
});

/* stats counter */
let statsRan = false;
function runStats() {
  if (statsRan) return;
  statsRan = true;
  document.querySelectorAll("[data-target]").forEach((el) => {
    const end = +el.dataset.target;
    const sfx = el.dataset.suffix || "+";
    let n = 0;
    const step = Math.ceil(end / 70);
    const t = setInterval(() => {
      n = Math.min(n + step, end);
      el.textContent = n.toLocaleString() + sfx;
      if (n >= end) clearInterval(t);
    }, 16);
  });
}
