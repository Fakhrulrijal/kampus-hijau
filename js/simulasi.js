const runSim = document.getElementById("runSim");
const resetSim = document.getElementById("resetSim");

function updateSimDisplay() {
  const simResultEl = document.getElementById("simResult");
  if (!simResultEl) return;

  const dist = parseFloat(document.getElementById("dist").value) || 0;
  const transport = document.getElementById("transport").value;
  const consumption = document.getElementById("consumption").value;

  let co2 = 0;
  switch (transport) {
    case "motor": co2 = dist * 0.18; break;
    case "mobil": co2 = dist * 0.35; break;
    case "public": co2 = dist * 0.07; break;
  }
  if (consumption === "plastik") co2 += 0.05;

  const saved = Math.max(0, 3 - co2);
  simResultEl.textContent =
    `Emisi Anda ${co2.toFixed(2)} kg CO₂/hari. Menghemat ${saved.toFixed(2)} kg CO₂! Poin Simulasi: ${simPoints}`;
}

runSim.addEventListener("click", () => {
  const dist = parseFloat(document.getElementById("dist").value) || 0;
  const transport = document.getElementById("transport").value;
  const consumption = document.getElementById("consumption").value;

  let co2 = 0;
  switch (transport) {
    case "motor": co2 = dist * 0.18; break;
    case "mobil": co2 = dist * 0.35; break;
    case "public": co2 = dist * 0.07; break;
  }
  if (consumption === "plastik") co2 += 0.05;

  const saved = Math.max(0, 3 - co2);
  simPoints += Math.round(saved * 10);
  localStorage.setItem('simPoints', simPoints);
  updateSimDisplay();
  updatePointsDisplay("sim");
});

resetSim.addEventListener("click", () => {
  simPoints = 0;
  localStorage.setItem('simPoints', simPoints);
  document.getElementById("simResult").textContent = "";
  updatePointsDisplay("sim");
});
