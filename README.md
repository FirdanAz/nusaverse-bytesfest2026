# NUSAVERSE

Platform eksplorasi budaya digital Indonesia yang dibangun untuk **SDGs Creative Web Competition — BytesFest 2026**, sub-tema *Culture Verse: Preserving Heritage Through Design* (SDG 11).

NUSAVERSE menghadirkan warisan budaya nusantara — bahasa daerah, aksara tradisional, artefak, dan sejarah — dalam bentuk pengalaman web interaktif, dengan tujuan memperkuat kesadaran dan apresiasi generasi muda terhadap kekayaan budaya lokal.

Live demo: https://nusaverse.wpygroup.my.id/

## Fitur

- **Peta interaktif Indonesia** — pemetaan 38 provinsi berbasis SVG, dikelompokkan per kepulauan. Setiap wilayah menampilkan detail budaya, status pengakuan UNESCO, dan statistik terkait.
- **Localization (ID/EN)** — dukungan dua bahasa penuh menggunakan React Context API.
- **Pelestarian bahasa daerah** — pemutar audio dengan visualisasi equalizer, glosarium frasa, dan kartu aksara yang bisa dibalik untuk mempelajari pelafalan.
- **Museum virtual 3D** — showroom artefak dengan rotasi objek via drag/swipe dan hotspot annotation.
- **Linimasa sejarah** — timeline slider dari era prasejarah hingga era digital modern.
- **Nusa AI** — simulator chat pemandu budaya yang merespons berdasarkan kata kunci, dengan efek typewriter.
- **Diagram dampak SDG** — visualisasi keterkaitan fitur platform dengan SDG 4, 10, 11, dan 16.
- **Hero background animation** — sistem partikel Canvas dengan motif terinspirasi pola batik.

## Tech stack

- React 19 + Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Lucide React (icons)

## Kepatuhan terhadap ketentuan lomba

Mengacu pada Guidebook BytesFest 2026 bagian D:

- Website di-build sebagai static export (`output: 'export'`), menghasilkan berkas HTML/CSS/JS murni tanpa server-side runtime.
- Tidak ada database, `localStorage`, maupun `sessionStorage` yang digunakan. Semua state (waitlist form, filter peta, chat simulator, dll) disimpan sementara di React state dan hilang saat halaman di-refresh.

## Struktur proyek

```
src/
├── app/
│   ├── globals.css        # design tokens, custom keyframes
│   ├── layout.tsx         # font setup (Inter, Noto Serif, Playfair Display), metadata
│   └── page.tsx           # layout utama, scroll reveal listener
├── components/
│   ├── maps/
│   │   ├── HeroMap.tsx
│   │   └── InteractiveMap.tsx
│   ├── AIChat.tsx
│   ├── Crisis.tsx
│   ├── CulturalMap.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── LanguagePreservation.tsx
│   ├── Navbar.tsx
│   ├── SDGsImpact.tsx
│   ├── Timeline.tsx
│   └── CountUp.tsx
├── context/
│   └── LanguageContext.tsx
├── data/
│   ├── culturalData.ts
│   └── localization.ts
└── types/
    └── index.ts
```

## Menjalankan secara lokal

Prasyarat: Node.js versi LTS.

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

Untuk pengecekan lint (opsional):

```bash
npm run lint
```

## Build untuk submission

```bash
npm run build
```

Hasil build berupa folder `out/` berisi `index.html`, aset teroptimasi (CSS/JS/gambar), dan folder `_next/`.

Sebelum mengumpulkan karya, hapus folder `node_modules` dan `.next` sesuai ketentuan Guidebook bagian E poin 3.

## Kredit aset

Ikon menggunakan Lucide React (open-source icon library). Elemen visual lain — ilustrasi, foto, dan grafis — dibuat/disediakan oleh tim.

## Tim

- Muhammad Firdan Azhari
- Muhammad Syafi'i R Fikri
- Nama — peran

## Lisensi

Karya orisinal, dibuat khusus untuk SDGs Creative Web Competition — BytesFest 2026. Belum pernah diikutsertakan pada kompetisi lain. Hak cipta tetap menjadi milik tim pengembang.