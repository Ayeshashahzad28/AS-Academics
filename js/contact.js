//  CONTACT PAGE JS

function handleSubmit() {
  const btn = document.getElementById("submitBtn");
  if (!btn) return;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;
  setTimeout(() => {
    btn.style.display = "none";
    const msg = document.getElementById("successMsg");
    if (msg) msg.classList.add("show");
  }, 1700);
}
