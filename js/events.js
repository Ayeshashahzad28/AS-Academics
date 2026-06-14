// EVENTS + CALENDAR JS

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const TAG_LABELS = {
  workshop: "Workshop",
  seminar: "Seminar",
  webinar: "Webinar",
  career: "Career",
  "user-student": "Student Event",
  "user-teacher": "Teacher Event",
};

let calDate = new Date();
let selectedDate = null;
let selectedRole = "student";

let allEvents = [
  {
    id: 1,
    day: 8,
    month: calDate.getMonth() + 1,
    year: calDate.getFullYear(),
    type: "workshop",
    title: "React 18 Deep Dive Workshop",
    time: "10:00 AM",
    location: "Online (Zoom)",
    by: "System",
    role: "system",
  },
  {
    id: 2,
    day: 15,
    month: calDate.getMonth() + 1,
    year: calDate.getFullYear(),
    type: "seminar",
    title: "AI in Education Seminar",
    time: "2:00 PM",
    location: "AS Academics, Lahore",
    by: "System",
    role: "system",
  },
  {
    id: 3,
    day: 22,
    month: calDate.getMonth() + 1,
    year: calDate.getFullYear(),
    type: "webinar",
    title: "Data Science Career Paths Webinar",
    time: "6:00 PM",
    location: "Online (Google Meet)",
    by: "System",
    role: "system",
  },
  {
    id: 4,
    day: 28,
    month: calDate.getMonth() + 1,
    year: calDate.getFullYear(),
    type: "career",
    title: "Campus Recruitment Drive — Tech Firms",
    time: "9:00 AM",
    location: "Arfa Karim Park, Lahore",
    by: "System",
    role: "system",
  },
];
let nextId = 5;

/* ---- Calendar render ---- */
function initCalendar() {
  renderCalendar();
  renderEvents(null);
}

function renderCalendar() {
  const y = calDate.getFullYear(),
    m = calDate.getMonth();
  const titleEl = document.getElementById("calTitle");
  if (titleEl) titleEl.textContent = `${MONTHS[m]} ${y}`;

  const firstDay = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const daysInPrev = new Date(y, m, 0).getDate();
  const today = new Date();
  const evDays = allEvents
    .filter((e) => e.month - 1 === m && e.year === y)
    .map((e) => e.day);

  let html = "";
  for (let i = firstDay - 1; i >= 0; i--)
    html += `<div class="cal-cell other-month">${daysInPrev - i}</div>`;
  for (let d = 1; d <= daysInMonth; d++) {
    const isTod =
      d === today.getDate() &&
      m === today.getMonth() &&
      y === today.getFullYear();
    const hasEv = evDays.includes(d);
    const isSel =
      selectedDate &&
      selectedDate.d === d &&
      selectedDate.m === m &&
      selectedDate.y === y;
    html += `<div class="cal-cell${isTod ? " today" : ""}${hasEv ? " has-event" : ""}${isSel ? " selected" : ""}"
      onclick="onDayClick(${d},${m},${y})">${d}</div>`;
  }
  const total = firstDay + daysInMonth;
  const trailing = total % 7 === 0 ? 0 : 7 - (total % 7);
  for (let i = 1; i <= trailing; i++)
    html += `<div class="cal-cell other-month">${i}</div>`;
  const grid = document.getElementById("calGrid");
  if (grid) grid.innerHTML = html;
}

function onDayClick(d, m, y) {
  selectedDate = { d, m, y };
  renderCalendar();
  const dayEvs = allEvents.filter(
    (e) => e.day === d && e.month - 1 === m && e.year === y,
  );
  const titleEl = document.getElementById("evListTitle");
  const countEl = document.getElementById("evCount");
  if (titleEl)
    titleEl.textContent = dayEvs.length
      ? `Events on ${MONTHS[m]} ${d}, ${y}`
      : `No Events on ${MONTHS[m]} ${d}`;
  if (countEl) countEl.textContent = dayEvs.length ? `(${dayEvs.length})` : "";
  renderEvents(dayEvs);
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("calPrev")?.addEventListener("click", () => {
    calDate.setMonth(calDate.getMonth() - 1);
    selectedDate = null;
    renderCalendar();
    renderEvents(null);
    resetEvListTitle();
  });
  document.getElementById("calNext")?.addEventListener("click", () => {
    calDate.setMonth(calDate.getMonth() + 1);
    selectedDate = null;
    renderCalendar();
    renderEvents(null);
    resetEvListTitle();
  });
});

function resetEvListTitle() {
  const t = document.getElementById("evListTitle");
  const c = document.getElementById("evCount");
  if (t) t.textContent = "All Upcoming Events";
  if (c) c.textContent = "";
}

/* ---- Event cards ---- */
function renderEvents(list) {
  const evs =
    list !== null
      ? list
      : [...allEvents].sort((a, b) => {
          if (a.year !== b.year) return a.year - b.year;
          if (a.month !== b.month) return a.month - b.month;
          return a.day - b.day;
        });
  const container = document.getElementById("evList");
  if (!container) return;
  if (!evs.length) {
    container.innerHTML = `<div style="text-align:center;padding:52px 20px;color:var(--text-3)">
      <i class="fa-regular fa-calendar-xmark" style="font-size:2.8rem;display:block;margin-bottom:14px;opacity:.35"></i>
      No events for this date.<br>
      <button onclick="openModal()" style="margin-top:16px;padding:9px 20px;background:var(--accent);color:#fff;border:none;border-radius:9px;cursor:pointer;font-weight:700;font-size:.83rem">
        <i class="fa-solid fa-plus"></i> Add an Event
      </button>
    </div>`;
    return;
  }
  container.innerHTML = evs
    .map((e) => {
      const tagType =
        e.role === "student"
          ? "user-student"
          : e.role === "teacher"
            ? "user-teacher"
            : e.type;
      const tagLabel = TAG_LABELS[tagType] || TAG_LABELS[e.type];
      const addedBy =
        e.role === "student" || e.role === "teacher"
          ? `<div class="ev-added-by"><i class="fa-solid fa-circle-user"></i>Added by ${e.role}: <strong>${e.by}</strong></div>`
          : "";
      return `
    <div class="ev-card">
      <div class="ev-date-box">
        <div class="ev-day">${String(e.day).padStart(2, "0")}</div>
        <div class="ev-mon">${MONTHS[e.month - 1].slice(0, 3)}</div>
      </div>
      <div class="ev-info">
        <span class="ev-tag ${tagType}">${tagLabel}</span>
        <div class="ev-title">${e.title}</div>
        <div class="ev-meta">
          <span><i class="fa-regular fa-clock"></i>${e.time} PKT</span>
          <span><i class="fa-solid fa-location-dot"></i>${e.location}</span>
        </div>
        ${addedBy}
      </div>
      <button class="ev-reg" onclick="showToast('Registered for: ${e.title.replace(/'/g, "\\'")}')">Register</button>
    </div>`;
    })
    .join("");
}

/* ---- Modal ---- */
function openModal() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const dateEl = document.getElementById("evDate");
  if (dateEl) dateEl.value = `${yyyy}-${mm}-${dd}`;
  document.getElementById("modalOverlay")?.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modalOverlay")?.classList.remove("open");
  document.body.style.overflow = "";
  ["evName", "evTitle", "evLocation"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  const evType = document.getElementById("evType");
  if (evType) evType.value = "workshop";
  selectRole("student");
}

function closeModalOutside(e) {
  if (e.target === document.getElementById("modalOverlay")) closeModal();
}

function selectRole(r) {
  selectedRole = r;
  document
    .getElementById("roleStudent")
    ?.classList.toggle("selected", r === "student");
  document
    .getElementById("roleTeacher")
    ?.classList.toggle("selected", r === "teacher");
}

function submitEvent() {
  const name = document.getElementById("evName")?.value.trim();
  const title = document.getElementById("evTitle")?.value.trim();
  const dateStr = document.getElementById("evDate")?.value;
  const time = document.getElementById("evTime")?.value;
  const type = document.getElementById("evType")?.value;
  const location =
    document.getElementById("evLocation")?.value.trim() ||
    "AS Academics / Online";

  if (!name) {
    alert("Please enter your name.");
    return;
  }
  if (!title) {
    alert("Please enter an event title.");
    return;
  }
  if (!dateStr) {
    alert("Please select a date.");
    return;
  }

  const [y, m, d] = dateStr.split("-").map(Number);
  const timeStr = time ? formatTime(time) : "12:00 PM";

  allEvents.push({
    id: nextId++,
    day: d,
    month: m,
    year: y,
    type,
    title,
    time: timeStr,
    location,
    by: name,
    role: selectedRole,
  });
  closeModal();
  renderCalendar();

  if (
    selectedDate &&
    selectedDate.d === d &&
    selectedDate.m === m - 1 &&
    selectedDate.y === y
  ) {
    onDayClick(d, m - 1, y);
  } else if (!selectedDate) {
    renderEvents(null);
    resetEvListTitle();
  }
  showToast(`✓ Event "${title}" added!`);
}

function formatTime(t) {
  const [h, min] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hr = h % 12 || 12;
  return `${hr}:${String(min).padStart(2, "0")} ${ampm}`;
}
