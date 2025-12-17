// =====================
// File Utama: main.js
// =====================

document.addEventListener("DOMContentLoaded", () => {
  // Pastikan semua elemen utama sudah siap
  updatePointsDisplay("total");
  renderLeaderboard();
  updateLeaderTable();

  // Ambil data profil untuk menampilkan nama
  const savedProfile = JSON.parse(localStorage.getItem("profileData"));
  if (savedProfile && savedProfile.name) {
    userName = savedProfile.name;
  }

  // Tombol reset total data
  const resetAllBtn = document.getElementById("resetAll");
  if (resetAllBtn) {
    resetAllBtn.addEventListener("click", () => {
      if (confirm("Yakin ingin mereset seluruh data?")) {
        localStorage.clear();
        simPoints = 0;
        actionPoints = 0;
        quizPoints = 0;
        updatePointsDisplay();
        loadReports();
        renderLeaderboard();
        updateLeaderTable();
        alert("Seluruh data berhasil direset!");
      }
    });
  }
  document.getElementById("menu-toggle").onclick = function () {
    document.getElementById("main-nav").classList.toggle("show");
  };
  // Efek transisi halaman (fade-in) langsung aktif
  const allPages = document.querySelectorAll(".page");
  allPages.forEach((page) => {
    page.style.transition = "opacity 0.4s ease";
  });

  console.log("Aplikasi Kampus Hijau UNISDA siap digunakan 🌿");
});
