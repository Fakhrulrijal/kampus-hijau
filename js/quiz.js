// =====================
// Modul Kuis Kampus Hijau
// =====================
const quizContainer = document.getElementById("quizContainer");
const startQuizBtn = document.getElementById("startQuiz");
const nextQuestionBtn = document.getElementById("nextQuestion");
const quizResult = document.getElementById("quizResult");

let currentQuestion = 0;
let score = 0;
let quizData = [
  {
    question: "Apa tujuan utama dari program Kampus Hijau?",
    options: [
      "Meningkatkan konsumsi energi",
      "Mengurangi dampak lingkungan dan meningkatkan kesadaran hijau",
      "Menambah penggunaan plastik sekali pakai",
      "Meningkatkan emisi karbon di kampus"
    ],
    correct: 1
  },
  {
    question: "Manakah contoh aksi ramah lingkungan di kampus?",
    options: [
      "Membuang sampah sembarangan",
      "Menanam pohon di sekitar kampus",
      "Menggunakan kendaraan pribadi setiap hari",
      "Meninggalkan peralatan listrik menyala"
    ],
    correct: 1
  },
  {
    question: "Apa manfaat menggunakan botol minum (tumbler)?",
    options: [
      "Meningkatkan limbah plastik",
      "Menghemat air",
      "Mengurangi penggunaan botol sekali pakai",
      "Membuat sampah bertambah"
    ],
    correct: 2
  },
  {
    question: "Apa yang dimaksud dengan emisi karbon?",
    options: [
      "Gas yang dilepaskan ke udara dari aktivitas manusia",
      "Bahan kimia untuk pupuk tanaman",
      "Energi yang dihasilkan dari air",
      "Polusi suara dari kendaraan"
    ],
    correct: 0
  },
  {
    question: "Bagaimana cara menghemat energi di kampus?",
    options: [
      "Menyalakan lampu saat tidak digunakan",
      "Menggunakan AC sepanjang waktu",
      "Mematikan peralatan listrik saat tidak digunakan",
      "Meninggalkan komputer menyala terus"
    ],
    correct: 2
  }
];

function loadQuestion() {
  const q = quizData[currentQuestion];
  quizContainer.innerHTML = `
    <h3>${q.question}</h3>
    <div class="options">
      ${q.options
        .map(
          (opt, i) => `
          <label class="quiz-option">
            <input type="radio" name="answer" value="${i}">
            <span>${opt}</span>
          </label>
        `
        )
        .join("")}
    </div>
  `;
}



function startQuiz() {
  currentQuestion = 0;
  score = 0;
  quizResult.textContent = "";
  startQuizBtn.style.display = "none";
  nextQuestionBtn.style.display = "inline-block";
  loadQuestion();
}

function nextQuestion() {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) {
    alert("Pilih salah satu jawaban dulu!");
    return;
  }

  const answer = parseInt(selected.value);
  if (answer === quizData[currentQuestion].correct) score += 20;

  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  quizContainer.innerHTML = "";
  nextQuestionBtn.style.display = "none";
  startQuizBtn.style.display = "inline-block";
  quizResult.textContent = `Nilai akhir Anda: ${score} poin`;

  // Simpan poin kuis
  quizPoints = score;
  localStorage.setItem("quizPoints", quizPoints);
  updatePointsDisplay("quiz");
}

if (startQuizBtn && nextQuestionBtn) {
  startQuizBtn.addEventListener("click", startQuiz);
  nextQuestionBtn.addEventListener("click", nextQuestion);
}

// ========== TOMBOL RESET NILAI KUIS ==========
const resetQuiz = document.getElementById('resetQuiz');

if (resetQuiz) {
  resetQuiz.style.display = 'inline-block'; // tampilkan tombol reset

  resetQuiz.addEventListener('click', () => {
    if (confirm('Apakah Anda yakin ingin mereset nilai kuis dan mulai ulang?')) {
      // Hapus semua data kuis & poin yang tersimpan
      localStorage.removeItem('quizScores');
      localStorage.removeItem('quizProgress');
      localStorage.removeItem('totalPoints');
      localStorage.removeItem('quizData');
      localStorage.removeItem('quizResult');
      localStorage.removeItem('currentQuestion');
      localStorage.removeItem('answeredQuestions');

      // Kalau poin disimpan di tempat lain, hapus juga
      if (localStorage.getItem('points')) {
        localStorage.removeItem('points');
      }
      if (localStorage.getItem('quizPoints')) {
        localStorage.removeItem('quizPoints');
      }

      alert('Nilai kuis dan poin berhasil direset! Anda bisa memulai lagi dari awal.');
      location.reload();
    }
  });
}
