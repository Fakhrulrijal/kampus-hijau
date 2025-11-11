const ctx = document.getElementById("leaderChart");
let leaderboardChart;
const leaderTableBody = document.querySelector("#leaderTable tbody");

// Fungsi utama untuk menggabungkan semua data peserta
function getLeaderboardData() {
  const total = getTotalPoints(); // Ambil poin pengguna
  const user = { name: userName, prodi: "Informatika", points: total }; // Data pengguna

  const others = [
    { name: "Ayu Chandra", prodi: "Informatika", points: 80 },
    { name: "Budi Setiawan", prodi: "Sistem Informasi", points: 65 },
    { name: "Sinta Dwi Aristya", prodi: "Teknik Komputer", points: 90 },
    { name: "Dwi Aryanova", prodi: "Informatika", points: 80 },
    { name: "Ahmad Sidik", prodi: "Sistem Informasi", points: 65 },
    { name: "M. Ari Laksanudin", prodi: "Teknik Komputer", points: 90 }
  ];

  return [user, ...others];
}


function renderLeaderboard() {
  const lbData = getLeaderboardData();
  const labels = lbData.map(u => u.name);
  const data = lbData.map(u => u.points);

  if (!ctx) return;

  if (leaderboardChart) {
    leaderboardChart.data.labels = labels;
    leaderboardChart.data.datasets[0].data = data;
    leaderboardChart.update();
  } else {
    leaderboardChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: "Poin",
          data,
          backgroundColor: "rgba(46, 204, 113, 0.8)"
        }]
      },
      options: {
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }
}


function updateLeaderTable() {
  const allUsers = getLeaderboardData().sort((a, b) => b.points - a.points);

  leaderTableBody.innerHTML = "";
  allUsers.forEach((u, index) => {
    let medal = index === 0 ? " 🥇" : index === 1 ? " 🥈" : index === 2 ? " 🥉" : "";
    leaderTableBody.innerHTML += `
      <tr>
        <td>${u.name}${medal}</td>
        <td>${u.prodi}</td>
        <td>${u.points}</td>
      </tr>`;
  });
}
