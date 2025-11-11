const profileForm = document.getElementById('profileForm');
const nameInput = document.getElementById('name');
const nimInput = document.getElementById('nim');
const prodiInput = document.getElementById('prodi');
let userName = "Anda";

const savedProfile = JSON.parse(localStorage.getItem('profileData'));
if (savedProfile) {
  nameInput.value = savedProfile.name;
  nimInput.value = savedProfile.nim;
  prodiInput.value = savedProfile.prodi;
  userName = savedProfile.name || "Anda";
}

profileForm.addEventListener('submit', e => {
  e.preventDefault();
  const profileData = {
    name: nameInput.value,
    nim: nimInput.value,
    prodi: prodiInput.value
  };
  localStorage.setItem('profileData', JSON.stringify(profileData));
  alert('Profil berhasil disimpan!');
});

downloadCert.addEventListener('click', async () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });

  const name = nameInput.value || "Nama Mahasiswa";
  const nim = nimInput.value || "-";
  const prodi = prodiInput.value || "-"; // ✅ ambil dari input
  const poin = getTotalPoints();
  const today = new Date();
  const monthNames = [
    "Januari","Februari","Maret","April","Mei","Juni",
    "Juli","Agustus","September","Oktober","November","Desember"
  ];
  const tanggalSekarang = `Lamongan, ${today.getDate()} ${monthNames[today.getMonth()]} ${today.getFullYear()}`;
  const yOffset = 50;
  const pageWidth = doc.internal.pageSize.getWidth();

  // Judul
  doc.setFont("helvetica", "bold").setFontSize(26)
     .text("SERTIFIKAT KAMPUS HIJAU UNISDA", pageWidth / 2, 100 + yOffset, { align: "center" });

  // "Diberikan kepada"
  doc.setFont("helvetica", "normal").setFontSize(16)
     .text("Diberikan kepada:", pageWidth / 2, 150 + yOffset, { align: "center" });

  // Nama & identitas
  doc.setFontSize(20)
     .text(name, pageWidth / 2, 180 + yOffset, { align: "center" })
     .setFontSize(14)
     .text(`NIM: ${nim}`, pageWidth / 2, 200 + yOffset, { align: "center" })
     .text(`Program Studi: ${prodi}`, pageWidth / 2, 220 + yOffset, { align: "center" }) // ✅ ditambahkan baris ini
     .text(`Atas kontribusi mencapai ${poin} poin dalam kegiatan Kampus Hijau UNISDA.`, pageWidth / 2, 260 + yOffset, { align: "center" })
     .setFontSize(12)
     .text(tanggalSekarang, pageWidth / 2, 300 + yOffset, { align: "center" });

  // Nama universitas di atas QR Code
  doc.setFontSize(12);
  doc.text("Universitas Islam Darul ‘Ulum Lamongan", pageWidth / 2, 330 + yOffset, { align: "center" });

  // QR Code
  const qrData = `Nama: ${name}\nNIM: ${nim}\nProdi: ${prodi}\nPoin: ${poin}`;
  const qrBase64 = await QRCode.toDataURL(qrData, { width: 100 });
  doc.addImage(qrBase64, 'PNG', pageWidth / 2 - 50, 350 + yOffset, 100, 100);

  // Simpan file PDF
  doc.save(`Sertifikat_Kampus_Hijau_${name}.pdf`);
});


