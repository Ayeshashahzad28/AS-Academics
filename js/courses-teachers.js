/* ---- COURSES DATA ---- */
const COURSES = [
  {
    cat: "tech",
    emoji: "💻",
    bg: "#070F24",
    title: "Full-Stack Web Development",
    instructor: "Dr. Adnan Mujahid",
    qual: "PhD Computer Science, LUMS",
    level: "Intermediate",
    dur: "42 hrs",
    stu: "8,200",
    price: "PKR 4,9999",
    badge: "Bestseller",
    desc: "Build complete web applications from scratch — React, Node.js, MongoDB and cloud deployment.",
    topics: [
      "React 18 & Hooks",
      "Node.js & REST API",
      "MongoDB & Mongoose",
      "AWS & Docker",
      "Auth & Security",
    ],
  },
  {
    cat: "design",
    emoji: "🎨",
    bg: "#1A070A",
    title: "UI/UX Design Professional",
    instructor: "Sana Bilal",
    qual: "MFA Design, NCA Lahore",
    level: "Beginner",
    dur: "28 hrs",
    stu: "5,400",
    price: "PKR 3,4999",
    badge: "Hot",
    desc: "Design products users love — from wireframes to polished Figma prototypes and usability testing.",
    topics: [
      "Design Thinking",
      "Figma Prototyping",
      "User Research",
      "Accessibility",
      "Portfolio Projects",
    ],
  },
  {
    cat: "business",
    emoji: "📊",
    bg: "#081514",
    title: "Digital Marketing Complete",
    instructor: "Usman Tariq",
    qual: "MBA Marketing, IBA Karachi",
    level: "All Levels",
    dur: "35 hrs",
    stu: "9,100",
    price: "PKR 2,9999",
    badge: "Trending",
    desc: "SEO, paid advertising, social media funnels, and analytics — the complete digital marketing toolkit.",
    topics: [
      "Search Engine Optimisation",
      "Google & Meta Ads",
      "Email Funnels",
      "Analytics",
      "Growth Strategies",
    ],
  },
  {
    cat: "tech",
    emoji: "🤖",
    bg: "#0A0D1C",
    title: "Machine Learning with Python",
    instructor: "Dr. Fatima Malik",
    qual: "PhD AI, NUST Islamabad",
    level: "Advanced",
    dur: "55 hrs",
    stu: "6,700",
    price: "PKR 6,4999",
    badge: "New",
    desc: "Neural networks, NLP, and computer vision — with TensorFlow, PyTorch, and real deployments.",
    topics: [
      "Python for Data Science",
      "Neural Networks",
      "NLP & Transformers",
      "Computer Vision",
      "Model Deployment",
    ],
  },
  {
    cat: "science",
    emoji: "📉",
    bg: "#0C1218",
    title: "Data Science Bootcamp",
    instructor: "Hassan Raza",
    qual: "MS Statistics, KU Karachi",
    level: "Intermediate",
    dur: "48 hrs",
    stu: "7,300",
    price: "PKR 5,4999",
    badge: "Popular",
    desc: "Transform raw data into insight with Pandas, SQL, Power BI, and compelling data storytelling.",
    topics: [
      "Pandas & NumPy",
      "SQL for Analysis",
      "Power BI Dashboards",
      "Statistical Inference",
      "Capstone Project",
    ],
  },
  {
    cat: "business",
    emoji: "💼",
    bg: "#07101A",
    title: "Financial Modelling & Valuation",
    instructor: "Ayesha Noor",
    qual: "CFA, MBA Harvard Business School",
    level: "Intermediate",
    dur: "30 hrs",
    stu: "4,200",
    price: "PKR 4,1999",
    badge: "",
    desc: "Build professional Excel models, DCF valuations and pitch decks used in real investment banking.",
    topics: [
      "Excel Modelling",
      "Discounted Cash Flow",
      "M&A Analysis",
      "Investor Pitch Decks",
      "Real Case Studies",
    ],
  },
];

function renderCourses(filter) {
  const grid = document.getElementById("coursesGrid");
  if (!grid) return;
  const list =
    filter === "all" ? COURSES : COURSES.filter((c) => c.cat === filter);
  if (!list.length) {
    grid.innerHTML =
      '<p style="color:var(--text-3);grid-column:1/-1;text-align:center;padding:40px">No courses in this category yet.</p>';
    return;
  }
  grid.innerHTML = list
    .map(
      (c) => `
    <div class="c-card">
      <div class="c-thumb" style="background:${c.bg}">
        <span>${c.emoji}</span>
        ${c.badge ? `<span class="c-badge">${c.badge}</span>` : ""}
      </div>
      <div class="c-body">
        <div class="c-meta">
          <span><i class="fa-solid fa-signal"></i>${c.level}</span>
          <span><i class="fa-regular fa-clock"></i>${c.dur}</span>
          <span><i class="fa-solid fa-users"></i>${c.stu}</span>
        </div>
        <h3 class="c-title">${c.title}</h3>
        <p class="c-desc">${c.desc}</p>
      </div>
      <div class="c-expand">
        <ul class="c-topics">
          ${c.topics.map((t) => `<li><i class="fa-solid fa-check"></i>${t}</li>`).join("")}
          <li><i class="fa-solid fa-user-tie"></i>${c.instructor} — <em>${c.qual}</em></li>
        </ul>
      </div>
      <div class="c-footer">
        <div class="c-price">${c.price} <small>/ lifetime</small></div>
        <button class="c-enroll" onclick="showToast('Enrolled in: ${c.title.replace(/'/g, "\\'")}')">Enroll Now</button>
      </div>
    </div>
  `,
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".f-btn").forEach((b) => {
    b.addEventListener("click", function () {
      document
        .querySelectorAll(".f-btn")
        .forEach((x) => x.classList.remove("active"));
      this.classList.add("active");
      renderCourses(this.dataset.filter);
    });
  });
});

// teacher data
const TEACHERS = [
  {
    emoji: "👨‍💻",
    name: "Dr. Adnan Mujahid",
    dept: "Web Development",
    qual: "PhD Computer Science, LUMS",
    bio: "Former Google Software Engineer, 14 years in full-stack development. Supervised 200+ student projects.",
    courses: 12,
    stu: "8.2k",
    rating: "4.9",
    socials: ["fab fa-linkedin-in", "fab fa-github", "fab fa-youtube"],
  },
  {
    emoji: "👩‍🎨",
    name: "Sana Bilal",
    dept: "UI/UX Design",
    qual: "MFA Design, NCA Lahore",
    bio: "Worked with Apple's design team for 6 years. Helped 50+ startups ship conversion-focused products.",
    courses: 8,
    stu: "5.4k",
    rating: "4.8",
    socials: ["fab fa-linkedin-in", "fab fa-dribbble", "fab fa-instagram"],
  },
  {
    emoji: "👨‍💼",
    name: "Usman Tariq",
    dept: "Digital Marketing",
    qual: "MBA Marketing, IBA Karachi",
    bio: "CMO at three Fortune 500 companies. Built PKR 1B+ revenue funnels across multiple industries.",
    courses: 10,
    stu: "9.1k",
    rating: "4.7",
    socials: ["fab fa-linkedin-in", "fab fa-x-twitter", "fab fa-youtube"],
  },
  {
    emoji: "👩‍🔬",
    name: "Dr. Fatima Malik",
    dept: "Artificial Intelligence",
    qual: "PhD AI & Robotics, NUST",
    bio: "Leading AI researcher with 30+ peer-reviewed publications. Advisor to NESCOM AI Lab.",
    courses: 6,
    stu: "6.7k",
    rating: "5.0",
    socials: ["fab fa-linkedin-in", "fab fa-github", "fas fa-flask"],
  },
  {
    emoji: "👨‍🏫",
    name: "Hassan Raza",
    dept: "Data Science",
    qual: "MS Statistics, Karachi University",
    bio: "Chief Data Officer at a Lahore fintech. Specialist in predictive modelling and business intelligence.",
    courses: 9,
    stu: "7.3k",
    rating: "4.9",
    socials: ["fab fa-linkedin-in", "fab fa-github", "fab fa-kaggle"],
  },
  {
    emoji: "👩‍💰",
    name: "Ayesha Noor",
    dept: "Finance & Valuation",
    qual: "CFA Charterholder, MBA Harvard",
    bio: "Investment banker turned educator with 10 years on Wall Street and in Karachi's capital markets.",
    courses: 7,
    stu: "4.2k",
    rating: "4.8",
    socials: ["fab fa-linkedin-in", "fab fa-x-twitter", "fas fa-chart-line"],
  },
  {
    emoji: "👨‍🎓",
    name: "Prof. Ali Imran",
    dept: "Physics & Mathematics",
    qual: "MSc Physics, University of Lahore",
    bio: "Makes complex calculus intuitive through real-world demonstrations. 11 years at LUMS.",
    courses: 11,
    stu: "3.8k",
    rating: "4.6",
    socials: ["fab fa-linkedin-in", "fab fa-youtube", "fas fa-atom"],
  },
  {
    emoji: "👩‍💻",
    name: "Zara Ahmed",
    dept: "Cybersecurity",
    qual: "CEH, OSCP, MS CyberSec FAST",
    bio: "Certified ethical hacker. Worked with the FIA Cybercrime Unit and major Pakistani banks.",
    courses: 5,
    stu: "2.9k",
    rating: "4.9",
    socials: ["fab fa-linkedin-in", "fab fa-github", "fas fa-shield-halved"],
  },
];

function renderTeachers() {
  const grid = document.getElementById("teachersGrid");
  if (!grid) return;
  grid.innerHTML = TEACHERS.map(
    (t) => `
    <div class="t-card">
      <div class="t-avatar">${t.emoji}</div>
      <div class="t-name">${t.name}</div>
      <div class="t-dept">${t.dept}</div>
      <div class="t-qual">${t.qual}</div>
      <p class="t-bio">${t.bio}</p>
      <div class="t-stats">
        <span><i class="fa-solid fa-book" style="color:var(--accent)"></i> <strong>${t.courses}</strong></span>
        <span><i class="fa-solid fa-users" style="color:var(--accent)"></i> <strong>${t.stu}</strong></span>
        <span><i class="fa-solid fa-star" style="color:var(--gold)"></i> <strong>${t.rating}</strong></span>
      </div>
      <div class="t-socials">
        ${t.socials.map((s) => `<a href="#" aria-label="social"><i class="${s}"></i></a>`).join("")}
      </div>
    </div>
  `,
  ).join("");
}
