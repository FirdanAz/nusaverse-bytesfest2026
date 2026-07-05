# NUSAVERSE — Budaya Nusantara dalam Dimensi Digital

NUSAVERSE adalah platform penemuan budaya digital Indonesia yang melestarikan dan memperkenalkan warisan leluhur melalui visual interaktif, arsip bahasa daerah, museum virtual 3D, dan linimasa sejarah nusantara. 

Proyek ini dibuat untuk berpartisipasi dalam **SDGs Creative Web Competition - BytesFest 2026** di bawah sub-tema **Culture Verse: Preserving Heritage Through Design (SDG 11)**.

---

## 🚀 Fitur Utama & Interaktivitas

1. **Multibahasa (Localization)**: Dukungan penuh dua bahasa (Bahasa Indonesia & English) menggunakan React Context API.
2. **Animasi Latar Belakang Hero (HTML5 Canvas)**: Sistem partikel interaktif bernuansa siber batik yang terus memancar dan terhubung.
3. **Peta Interaktif Indonesia (SVG)**: Pemetaan visual 38 provinsi di Indonesia yang dikelompokkan per kepulauan. Klik pulau untuk menampilkan detail kebudayaan, unesco, dan statistiknya.
4. **Pelestarian Suara (Endangered Languages)**: Demonstrasi pemutar audio interaktif dengan visualisasi bar equalizer, glosarium frasa aksara tradisional, dan kartu aksara 3D yang dapat dibalik (flip) untuk dipelajari pelafalannya.
5. **Museum Virtual 3D (3D Showroom Mockup)**: Pengalaman rotasi objek artefak 3D dengan menggeser tetikus (drag/swipe) secara horizontal dilengkapi emas pin hotspot annotations.
6. **Linimasa Sejarah Nusantara**: Pengendali geser (timeline slider) interaktif dari era Prasejarah hingga Modern Digital.
7. **Nusa AI (Assistant Chat Simulator)**: Simulator AI pemandu budaya nusantara yang merespons secara dinamis berdasarkan input kata kunci pengguna disertai efek mengetik (typewriter effect).
8. **SDGs Impact connection**: Diagram keterkaitan antara fitur-fitur NUSAVERSE dengan 4 pilar SDGs (4, 10, 11, 16) menggunakan jalur garis SVG dinamis yang menyala (glow) saat disorot kursor.

---

## 🛠️ Tech Stack & Kepatuhan Lomba

Proyek ini dibangun menggunakan arsitektur modern berstandar profesional:
- **Core Framework**: React 19 & Next.js 16 (App Router)
- **Programming Language**: TypeScript (Strict-typing)
- **Styling Engine**: Tailwind CSS v4 & CSS Variables
- **Icons Library**: Lucide React
- **Kepatuhan Regulasi Lomba (Guidebook Section D)**:
  - **Static Web Only**: Dikonfigurasi menggunakan static export (`output: 'export'`) sehingga menghasilkan berkas murni HTML/CSS/JS tanpa ketergantungan server Node.js.
  - **No Storage & Database**: Semua penyimpanan data/kondisi bersifat memori (in-memory React state) tanpa menggunakan database, `localStorage`, maupun `sessionStorage` demi memenuhi syarat *no storage* lomba.

---

## 📂 Struktur Proyek

```text
src/
├── app/
│   ├── favicon.ico
│   ├── globals.css      # Desain sistem tokens, variabel & custom keyframes
│   ├── layout.tsx       # Set up Google Fonts (Inter, Noto Serif, Playfair Display) & SEO Metadata
│   └── page.tsx         # Struktur layout utama dan Scroll Reveal global listener
├── components/
│   ├── maps/
│   │   ├── HeroMap.tsx        # SVG Peta Indonesia statis untuk hero section
│   │   └── InteractiveMap.tsx # SVG Peta Indonesia interaktif lengkap dengan event handlers
│   ├── AIChat.tsx             # Nusa AI chatbot simulator
│   ├── Crisis.tsx             # Pengingat countdown punahnya bahasa & grafik SVG
│   ├── CulturalMap.tsx        # Fitur filter peta & panel detail wilayah
│   ├── Footer.tsx             # Footer links & Waitlist signup form + Modal
│   ├── Hero.tsx               # Hero banner dengan Canvas particles background
│   ├── LanguagePreservation.tsx # Modul suara bahasa daerah & aksara flip-cards
│   ├── Navbar.tsx             # Navigasi sticky responsif & language switcher
│   ├── SDGsImpact.tsx         # Pilar SDGs & diagram garis interaktif
│   ├── Timeline.tsx           # Era slider linimasa sejarah
│   └── CountUp.tsx            # Komponen animasi angka membesar
├── context/
│   └── LanguageContext.tsx    # Context untuk sistem localization Bahasa (ID/EN)
├── data/
│   ├── culturalData.ts        # Kumpulan data mentah budaya, artefak & obrolan AI
│   └── localization.ts        # Kamus terjemahan lokal (ID/EN)
├── types/
│   └── index.ts               # Type-safe model TypeScript interfaces
```

---

## 💻 Cara Menjalankan Proyek Secara Lokal

Sebelum memulai, pastikan Anda telah memasang [Node.js](https://nodejs.org/) (versi LTS direkomendasikan).

### 1. Pasang Dependensi
Pasang semua paket library yang dibutuhkan dengan menjalankan perintah berikut di terminal:
```bash
npm install
```

### 2. Jalankan Mode Pengembangan (Development Server)
Jalankan server lokal untuk melihat perubahan kode secara langsung:
```bash
npm run dev
```
Buka browser Anda dan akses tautan [http://localhost:3000](http://localhost:3000).

### 3. Lakukan Linter Check (Opsional)
Untuk memastikan tidak ada kesalahan struktur kode TypeScript & ESLint:
```bash
npm run lint
```

---

## 📦 Cara Membangun Berkas Statis (Build & Export)

Sesuai dengan ketentuan perlombaan **BytesFest 2026** yang meminta berkas web statis siap saji (front-end saja):

### 1. Bangun Berkas Produksi Statis
Jalankan perintah berikut untuk mengompilasi dan mengekspor proyek menjadi halaman statis:
```bash
npm run build
```

### 2. Hasil Build
Setelah proses berhasil, direktori bernama **`out/`** akan terbentuk di folder utama proyek. Direktori ini berisi:
- `index.html` (Hasil *generate* rute utama)
- Berkas aset teroptimasi (CSS, JS, gambar, metadata, dll.)
- Folder `_next/` (Aset statis internal framework)

*Catatan: Sebelum mengumpulkan karya, Anda diminta menghapus folder modul dan cache (`node_modules` dan `.next`) seperti yang tertulis dalam panduan perlombaan (Bagian E, Poin 3).*
