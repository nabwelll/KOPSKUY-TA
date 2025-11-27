# KOPSKUY! - Coffee Shop PWA

Tugas Akhir Praktikum PPB 2025

## 📱 Tentang Aplikasi

KOPSKUY! adalah Progressive Web App (PWA) untuk aplikasi coffee shop yang memungkinkan pengguna untuk:
- Melihat menu kopi dan makanan
- Melihat promo yang tersedia
- Melihat detail menu dan promo
- Mendapatkan informasi tentang kedai kopi

## 🚀 Fitur

- **Progressive Web App (PWA)**: Dapat diinstal di perangkat mobile dan desktop
- **Bottom Navigation Bar**: Navigasi mudah antar halaman
- **5+ Halaman**:
  - Beranda - Tampilan utama dengan menu populer dan promo terbaru
  - Menu - Daftar lengkap menu dengan filter kategori
  - Detail Menu - Informasi lengkap tentang menu
  - Promo - Daftar promo yang tersedia
  - Detail Promo - Informasi lengkap tentang promo
  - Tentang - Informasi tentang kedai kopi

## 🛠️ Teknologi

- **Frontend**: React + Vite
- **API**: Supabase
- **PWA**: vite-plugin-pwa
- **Routing**: React Router DOM
- **Icons**: React Icons

## 📦 Instalasi

```bash
# Clone repository
git clone https://github.com/nabwelll/KOPSKUY-TA.git

# Masuk ke direktori
cd KOPSKUY-TA

# Install dependencies
npm install

# Jalankan development server
npm run dev

# Build untuk production
npm run build
```

## 🗄️ Struktur Database Supabase

### Tabel `menu`
| Kolom | Tipe | Deskripsi |
|-------|------|-----------|
| id | int | Primary key |
| name | text | Nama menu |
| category | text | Kategori (Kopi, Non-Kopi, Makanan) |
| description | text | Deskripsi menu |
| price | int | Harga dalam Rupiah |
| image_url | text | URL gambar |
| is_popular | boolean | Apakah menu populer |
| ingredients | text | Bahan-bahan |
| notes | text | Catatan tambahan |

### Tabel `promos`
| Kolom | Tipe | Deskripsi |
|-------|------|-----------|
| id | int | Primary key |
| title | text | Judul promo |
| description | text | Deskripsi promo |
| discount | int | Persentase diskon |
| image_url | text | URL gambar |
| valid_until | date | Tanggal berakhir |
| terms | text | Syarat dan ketentuan |
| promo_code | text | Kode promo |
| created_at | timestamp | Waktu dibuat |

## 📄 Lisensi

© 2025 KOPSKUY! All rights reserved.
