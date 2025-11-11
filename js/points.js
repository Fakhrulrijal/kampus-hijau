let simPoints = parseInt(localStorage.getItem('simPoints')) || 0;
let actionPoints = parseInt(localStorage.getItem('actionPoints')) || 0;
let quizPoints = parseInt(localStorage.getItem('quizPoints')) || 0;

const userPointsEl = document.getElementById("userPoints");
const totalPointsEl = document.getElementById("totalPoints");
const pointsBar = document.getElementById("pointsBar");
const downloadCert = document.getElementById("downloadCert");

function getTotalPoints() {
  return simPoints + actionPoints + quizPoints;
}

function updatePointsDisplay(category = "total") {
  let points = 0;
  switch(category) {
    case "sim": points = simPoints; break;
    case "action": points = actionPoints; break;
    case "quiz": points = quizPoints; break;
    default: points = getTotalPoints();
  }

  userPointsEl.textContent = getTotalPoints();
  totalPointsEl.textContent = getTotalPoints();
  pointsBar.style.width = Math.min(points, 100) + "%";

  if (getTotalPoints() >= 100) {
    downloadCert.disabled = false;
    downloadCert.style.background = "#2b7a4b";
  } else {
    downloadCert.disabled = true;
    downloadCert.style.background = "#bdc3c7";
  }

  renderLeaderboard();
  updateLeaderTable();
}
