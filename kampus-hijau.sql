-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 17 Des 2025 pada 07.29
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kampus-hijau`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `aksi_hijau`
--

CREATE TABLE `aksi_hijau` (
  `aksi_id` int(11) NOT NULL,
  `profil_id` int(11) NOT NULL,
  `aksi_type` varchar(255) NOT NULL,
  `deskripsi` text NOT NULL,
  `bukti_foto` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pengaturan`
--

CREATE TABLE `pengaturan` (
  `pengaturan_id` int(11) NOT NULL,
  `setting_key` varchar(255) NOT NULL,
  `setting_value` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `peringkat`
--

CREATE TABLE `peringkat` (
  `pringkat_` int(11) NOT NULL,
  `profil_id` int(11) NOT NULL,
  `points` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `profil`
--

CREATE TABLE `profil` (
  `profil_id` int(11) NOT NULL,
  `nim` varchar(20) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `prodi` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `foto_profil` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `profil_points`
--

CREATE TABLE `profil_points` (
  `profil_id` int(11) NOT NULL,
  `total_point` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `simulasi`
--

CREATE TABLE `simulasi` (
  `simulasi_id` int(11) NOT NULL,
  `profil_id` int(11) NOT NULL,
  `jarak` float NOT NULL,
  `transportasi` enum('motor','mobil','public') NOT NULL,
  `konsumsi` enum('plastik','nonplastik') NOT NULL,
  `emisi` float NOT NULL,
  `point_diperoleh` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `aksi_hijau`
--
ALTER TABLE `aksi_hijau`
  ADD PRIMARY KEY (`aksi_id`),
  ADD KEY `profil_id` (`profil_id`);

--
-- Indeks untuk tabel `pengaturan`
--
ALTER TABLE `pengaturan`
  ADD PRIMARY KEY (`pengaturan_id`),
  ADD UNIQUE KEY `setting_key` (`setting_key`);

--
-- Indeks untuk tabel `peringkat`
--
ALTER TABLE `peringkat`
  ADD PRIMARY KEY (`pringkat_`),
  ADD KEY `profil_id` (`profil_id`);

--
-- Indeks untuk tabel `profil`
--
ALTER TABLE `profil`
  ADD PRIMARY KEY (`profil_id`),
  ADD UNIQUE KEY `nim` (`nim`);

--
-- Indeks untuk tabel `profil_points`
--
ALTER TABLE `profil_points`
  ADD PRIMARY KEY (`profil_id`);

--
-- Indeks untuk tabel `simulasi`
--
ALTER TABLE `simulasi`
  ADD PRIMARY KEY (`simulasi_id`),
  ADD KEY `profil_id` (`profil_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `aksi_hijau`
--
ALTER TABLE `aksi_hijau`
  MODIFY `aksi_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `pengaturan`
--
ALTER TABLE `pengaturan`
  MODIFY `pengaturan_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `peringkat`
--
ALTER TABLE `peringkat`
  MODIFY `pringkat_` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `profil`
--
ALTER TABLE `profil`
  MODIFY `profil_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `simulasi`
--
ALTER TABLE `simulasi`
  MODIFY `simulasi_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `aksi_hijau`
--
ALTER TABLE `aksi_hijau`
  ADD CONSTRAINT `aksi_hijau_ibfk_1` FOREIGN KEY (`profil_id`) REFERENCES `profil` (`profil_id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `peringkat`
--
ALTER TABLE `peringkat`
  ADD CONSTRAINT `peringkat_ibfk_1` FOREIGN KEY (`profil_id`) REFERENCES `profil` (`profil_id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `profil_points`
--
ALTER TABLE `profil_points`
  ADD CONSTRAINT `profil_points_ibfk_1` FOREIGN KEY (`profil_id`) REFERENCES `profil` (`profil_id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `simulasi`
--
ALTER TABLE `simulasi`
  ADD CONSTRAINT `simulasi_ibfk_1` FOREIGN KEY (`profil_id`) REFERENCES `profil` (`profil_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
