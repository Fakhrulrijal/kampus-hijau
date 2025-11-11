// Navigasi antar halaman
const pages = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll(".main-nav a");

function showPage(targetId) {
  pages.forEach(page => {
    if (page.id === targetId) {
      page.classList.add("active");
      page.style.display = "block";
      page.style.opacity = 0;
      setTimeout(() => (page.style.opacity = 1), 50); // fade in halus
    } else {
      page.classList.remove("active");
      page.style.display = "none";
    }
  });

  navLinks.forEach(link => {
    const target = link.getAttribute("href").substring(1);
    link.classList.toggle("active", target === targetId);
  });
}

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = link.getAttribute("href").substring(1);
    showPage(target);
    if (target === "simulasi") updatePointsDisplay("sim");
    if (target === "aksi") updatePointsDisplay("action");
    if (target === "kuis") updatePointsDisplay("quiz");
  });
});

showPage("home");