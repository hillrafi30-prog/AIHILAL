# AIHILAL — Panduan Instalasi Mudah

AIHILAL adalah starter aplikasi computer vision dengan React + Vite, Express, kamera, deteksi objek, dan pengenalan warna.

## Cara termudah di Android (Termux + Acode)

1. Pasang **Termux dari F-Droid/GitHub resmi** dan Acode.
2. Ekstrak ZIP AIHILAL ke folder yang mudah ditemukan, misalnya `Download/AIHILAL`.
3. Buka Termux, lalu jalankan:

```bash
pkg update && pkg upgrade -y
pkg install nodejs-lts unzip -y
termux-setup-storage
cd ~/storage/downloads/AIHILAL
npm install
npm run dev
```

4. Tunggu sampai muncul alamat Vite `http://localhost:5173`.
5. Buka alamat tersebut di Chrome pada HP yang sama. Backend berjalan otomatis di port 4000.
6. Di Acode, buka folder AIHILAL untuk mengedit kode. Jangan menjalankan file JSX dengan tombol preview HTML Acode; jalankan melalui Vite dari Termux.

> Jika folder ZIP berada di lokasi lain, sesuaikan perintah `cd`. Jika `nodejs-lts` tidak tersedia pada repositori Termux Anda, gunakan `pkg install nodejs -y`.

## Komputer

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`. Satu perintah ini menjalankan frontend dan backend sekaligus.

## Build frontend

```bash
npm run build
```

## Fitur yang sudah ada

- Dashboard responsif Dark Futuristic.
- Deteksi objek dari kamera atau unggah gambar memakai COCO-SSD di browser.
- Deteksi warna dari titik tengah kamera.
- API Express, health check, batas ukuran unggahan, CORS, Helmet, dan rate limit.
- Modul pemeriksaan indikasi gambar AI dengan status aman jika model khusus belum tersedia.

## Izin kamera

Kamera browser hanya berfungsi pada konteks aman: `localhost` atau situs HTTPS. Beri izin kamera ke Chrome. Tutup aplikasi lain yang sedang memakai kamera.

## Batasan penting

COCO-SSD mendeteksi objek umum (bukan mendeteksi gambar AI). Deteksi gambar AI vs foto asli belum aktif karena memerlukan model forensic khusus yang sudah dilatih dan diuji. Aplikasi sengaja tidak membuat skor palsu. PostgreSQL, akun pengguna, dan riwayat analisis belum diaktifkan pada starter ini.

## Struktur

- `frontend/src/pages`: halaman fitur.
- `frontend/src/components`: komponen UI dan animasi.
- `backend/routes`: endpoint API.
- `backend/services`: logika analisis.

## Catatan

aplikasi ini masih bersifat tahap awal
