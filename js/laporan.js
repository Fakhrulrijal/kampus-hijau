const reportList = document.getElementById("reportList");
const reportForm = document.getElementById("reportForm");

function loadReports() {
  const savedReports = JSON.parse(localStorage.getItem('reports')) || [];
  reportList.innerHTML = "";
  savedReports.forEach((r, index) => {
    const div = document.createElement("div");
    div.innerHTML = `✅ ${r.action} (${r.points} poin) ${r.desc ? "- " + r.desc : ""}
      <button class="btn btn-small btn-delete" data-index="${index}">Hapus</button>`;
    reportList.appendChild(div);
  });
  reportList.querySelectorAll(".btn-delete").forEach(btn => {
    btn.addEventListener("click", () => deleteReport(parseInt(btn.dataset.index)));
  });
}

function saveReport(action, desc, points) {
  const savedReports = JSON.parse(localStorage.getItem('reports')) || [];
  savedReports.push({ action, desc, points });
  localStorage.setItem('reports', JSON.stringify(savedReports));
}

function deleteReport(index) {
  const savedReports = JSON.parse(localStorage.getItem('reports')) || [];
  if (index >= 0 && index < savedReports.length) {
    actionPoints -= savedReports[index].points;
    savedReports.splice(index, 1);
    localStorage.setItem('reports', JSON.stringify(savedReports));
    localStorage.setItem('actionPoints', actionPoints);
    loadReports();
    updatePointsDisplay("action");
  }
}

reportForm.addEventListener("submit", e => {
  e.preventDefault();
  const action = document.getElementById("actionType").value;
  const desc = document.getElementById("actionDesc").value.trim();
  const pointsMap = { tanam: 50, bersih: 20, tumbler: 5, hemat: 10 };
  const points = pointsMap[action] || 0;

  actionPoints += points;
  localStorage.setItem('actionPoints', actionPoints);
  saveReport(action, desc, points);
  loadReports();
  updatePointsDisplay("action");
});

loadReports();
