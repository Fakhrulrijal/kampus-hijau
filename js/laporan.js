const reportList = document.getElementById("reportList");
const reportForm = document.getElementById("reportForm");
const imageInput = document.getElementById("actionImage");
const previewImage = document.getElementById("previewImage");

// ===============================
//  PREVIEW FOTO OTOMATIS
// ===============================
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    previewImage.src = reader.result;
    previewImage.style.display = "block";
  };
  reader.readAsDataURL(file);
});

// ===============================
// LOAD REPORT
// ===============================
function loadReports() {
  const savedReports = JSON.parse(localStorage.getItem('reports')) || [];
  reportList.innerHTML = "";

  savedReports.forEach((r, index) => {
    const div = document.createElement("div");
    div.className = "report-item";
    div.innerHTML = `
      <p>✅ ${r.action} (${r.points} poin) - ${r.desc}</p>
      <img src="${r.image}" class="report-img">
      <button class="btn btn-small btn-delete" data-index="${index}">Hapus</button>
    `;
    reportList.appendChild(div);
  });

  document.querySelectorAll(".btn-delete").forEach(btn => {
    btn.addEventListener("click", () => deleteReport(parseInt(btn.dataset.index)));
  });
}

// ===============================
// SAVE REPORT
// ===============================
function saveReport(action, desc, points, image) {
  const savedReports = JSON.parse(localStorage.getItem('reports')) || [];
  savedReports.push({ action, desc, points, image });
  localStorage.setItem('reports', JSON.stringify(savedReports));
}

// ===============================
// DELETE REPORT
// ===============================
function deleteReport(index) {
  const savedReports = JSON.parse(localStorage.getItem('reports')) || [];
  if (index >= 0 && index < savedReports.length) {
    savedReports.splice(index, 1);
    localStorage.setItem('reports', JSON.stringify(savedReports));
    loadReports();
  }
}

// ===============================
// FORM SUBMIT
// ===============================
reportForm.addEventListener("submit", e => {
  e.preventDefault();

  const action = document.getElementById("actionType").value;
  const desc = document.getElementById("actionDesc").value.trim();
  const file = imageInput.files[0];

  if (!file) {
    alert("Foto bukti wajib diupload!");
    return;
  }

  const pointsMap = {
    tanam: 50,
    bersih: 20,
    tumbler: 5,
    hemat: 10
  };
  const points = pointsMap[action] || 0;

  const reader = new FileReader();
  reader.onload = function () {
    const imageData = reader.result;

    saveReport(action, desc, points, imageData);
    loadReports();

    reportForm.reset();
    previewImage.style.display = "none";
  };

  reader.readAsDataURL(file);
});

loadReports();
