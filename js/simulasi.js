// Inisialisasi Poin dari LocalStorage
let simPoints = parseInt(localStorage.getItem("simPoints"), 10) || 0;
const MAX_SIM_POINTS = 150;

// Fungsi untuk memperbarui hasil simulasi
function updateSimDisplay() {
  const simResultEl = document.getElementById("simResult");
  if (!simResultEl) return;

  const dist = parseFloat(document.getElementById("dist").value) || 0;
  const transport = document.getElementById("transport").value;
  const consumption = document.getElementById("consumption").value;

  let co2 = 0;
  switch (transport) {
    case "motor":
      co2 = dist * 0.18;
      break;
    case "mobil":
      co2 = dist * 0.35;
      break;
    case "public":
      co2 = dist * 0.07;
      break;
  }
  if (consumption === "plastik") co2 += 0.05;

  const saved = Math.max(0, 3 - co2);
  simResultEl.textContent = `Emisi Anda ${co2.toFixed(
    2
  )} kg CO₂/hari. Menghemat ${saved.toFixed(
    2
  )} kg CO₂! Poin Simulasi: ${simPoints}/${MAX_SIM_POINTS}`;

  updatePointsDisplay("sim");
}

// Fungsi untuk memperbarui tampilan poin
function updatePointsDisplay() {
  const simPointsDisplay = document.getElementById("simPointsDisplay");
  if (simPointsDisplay) {
    simPointsDisplay.textContent = `Total Poin: ${simPoints}`;
  }
}

// Tombol jalankan simulasi
const runSim = document.getElementById("runSim");
runSim.addEventListener("click", () => {
  console.log("Simulasi dimulai...");
  const dist = parseFloat(document.getElementById("dist").value) || 0;
  const transport = document.getElementById("transport").value;
  const consumption = document.getElementById("consumption").value;

  let co2 = 0;
  switch (transport) {
    case "motor":
      co2 = dist * 0.18;
      break;
    case "mobil":
      co2 = dist * 0.35;
      break;
    case "public":
      co2 = dist * 0.07;
      break;
  }
  if (consumption === "plastik") co2 += 0.05;

  const saved = Math.max(0, 3 - co2);
  const earned = Math.round(saved * 10);

  // Batasi total poin maksimal 150
  simPoints = Math.min(MAX_SIM_POINTS, simPoints + earned);

  // Simpan poin ke LocalStorage
  localStorage.setItem("simPoints", simPoints);

  console.log(`Emisi CO₂: ${co2.toFixed(2)} kg`);
  console.log(`Poin yang didapat: ${earned}`);
  console.log(`Total Poin saat ini: ${simPoints}`);

  updateSimDisplay();
});

// Tombol reset simulasi
const resetSim = document.getElementById("resetSim");
resetSim.addEventListener("click", () => {
  console.log("Simulasi direset...");
  simPoints = 0;
  localStorage.setItem("simPoints", simPoints);
  document.getElementById("simResult").textContent = "";
  updatePointsDisplay();
});

// Menampilkan poin saat halaman dimuat
updatePointsDisplay();
