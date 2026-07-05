import { IslandData, LanguageData, ArtifactData, EraData, AIResponse } from "@/types";

export const ISLANDS_DATA: Record<string, IslandData> = {
      sumatra: {
        title_id: "Sumatra",
        title_en: "Sumatra Island",
        meta_id: "Kepulauan Sumatra",
        meta_en: "Sumatra Archipelago",
        langs: "52 Bahasa Daerah",
        unesco: "Hutan Hujan Sumatra",
        desc_id: "Situs kerajaan Sriwijaya purba yang perkasa. Wilayah ini kaya akan kebudayaan bernuansa melayu, tarian tradisional piring di Minangkabau, dan tradisi lompat batu yang menantang maut di Pulau Nias.",
        desc_en: "Home of the powerful ancient Sriwijaya kingdom. Rich with Malay-influenced traditions, Minangkabau plate dances, and Nias Island's death-defying stone jumping rituals.",
        image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=600&q=80"
      },
      java: {
        title_id: "Jawa",
        title_en: "Java Island",
        meta_id: "Pusat Kebudayaan Kerajaan",
        meta_en: "Royal Cultural Hub",
        langs: "5 Bahasa Daerah Utama",
        unesco: "Batik, Candi Borobudur & Wayang",
        desc_id: "Episentrum kerajaan Hindu-Buddha dan Islam di masa lalu. Menyimpan warisan agung berupa batik tulis halus, musik gamelan yang mistik, pertunjukan wayang kulit, serta kemegahan candi Borobudur.",
        desc_en: "The historical epicenter of great Hindu-Buddhist and Islamic sultanates. Hosts masterworks of hand-drawn Batik, mystical gamelan music, shadow puppetry, and Borobudur Temple.",
        image: "https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=600&q=80"
      },
      kalimantan: {
        title_id: "Kalimantan",
        title_en: "Borneo (Kalimantan)",
        meta_id: "Hutan Hujan & Suku Dayak",
        meta_en: "Dayak Tribes & Rainforests",
        langs: "80+ Bahasa Daerah",
        unesco: "Hutan Tropis Kalimantan",
        desc_id: "Paru-paru dunia dengan peradaban sungai yang kental. Wilayah suku Dayak yang melestarikan arsitektur rumah lamin panjang, tari perang kancet papatai, dan anyaman manik-manik bermotif kosmis.",
        desc_en: "The lungs of the earth with robust riverine traditions. Home to the Dayak tribe who preserve longhouse architecture, Kancet Papatai war dances, and cosmic bead weavings.",
        image: "https://images.unsplash.com/photo-1504470695779-75300268aa0e?auto=format&fit=crop&w=600&q=80"
      },
      sulawesi: {
        title_id: "Sulawesi",
        title_en: "Sulawesi Island",
        meta_id: "Pelaut Phinisi & Toraja",
        meta_en: "Phinisi Sailors & Toraja Traditions",
        langs: "62 Bahasa Daerah",
        unesco: "Situs Praaksara Maros & Kapal Phinisi",
        desc_id: "Pertemuan kebudayaan unik. Terkenal akan keahlian maritim suku Bugis pembuat kapal phinisi tradisional, ritual pemakaman Rambu Solo yang agung di Tana Toraja, dan tarian kipas pakarena.",
        desc_en: "A cultural crossroads. Renowned for the seafaring Bugis who build Phinisi ships, the grand Rambu Solo funeral ceremonies in Tana Toraja, and Pakarena fan dances.",
        image: "https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&w=600&q=80"
      },
      nusatenggara: {
        title_id: "Bali & Nusa Tenggara",
        title_en: "Bali & Lesser Sunda",
        meta_id: "Ritual Adat & Pulau Komodo",
        meta_en: "Sacred Rituals & Landscapes",
        langs: "40+ Bahasa Daerah",
        unesco: "Sistem Subak Bali",
        desc_id: "Daerah dengan estetika ritual spiritual tertinggi. Mulai dari sistem pengairan subak Hindu Bali, tari kecak kolosal, upacara ngaben, hingga tenun ikat ikat lombok dan ketukan musik mbojo.",
        desc_en: "Regions of supreme spiritual aesthetic. Home to the Subak water temples of Bali, colossal Kecak fire dances, Ngaben cremations, and Lombok's handwoven ikat textiles.",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80"
      },
      papua: {
        title_id: "Papua & Maluku",
        title_en: "Papua & Maluku Islands",
        meta_id: "Rempah Nusantara & Melanesia",
        meta_en: "Melanesian Roots & Spice Islands",
        langs: "300+ Bahasa Daerah",
        unesco: "Warisan Budaya Raja Ampat",
        desc_id: "Lumbung kekayaan bahasa dunia. Merupakan wilayah suku Asmat pembuat patung kayu magis, tradisi tifa kolosal, kepulauan rempah Maluku dengan musik tifa, serta tarian perang adat.",
        desc_en: "One of the world's greatest linguistic sanctuaries. Home to the Asmat woodcarvers, colossal Tifa drum dances, and Maluku's historic Spice Islands.",
        image: "https://images.unsplash.com/photo-1598751337485-0d51f7b7677d?auto=format&fit=crop&w=600&q=80"
      }
    };

export const LANGUAGES_DATA: Record<string, LanguageData> = {
      jawa: {
        name: "Bahasa Jawa",
        region_id: "Jawa Tengah & Jawa Timur",
        region_en: "Central & East Java",
        status: "vulnerable",
        script: "ꦤꦸꦱꦤ꧀ꦵꦫ",
        phrase: '"Sugeng rawuh ing NUSAVERSE."',
        translation_id: "Selamat datang di NUSAVERSE.",
        translation_en: "Welcome to NUSAVERSE.",
        alphabet: [
          { native: "ꦲ", roman: "ha", sound: "ha" },
          { native: "ꦤ", roman: "na", sound: "na" },
          { native: "ꦪ", roman: "ya", sound: "ya" },
          { native: "ꦫ", roman: "ra", sound: "ra" },
          { native: "ꦏ", roman: "ka", sound: "ka" },
          { native: "ꦢ", roman: "da", sound: "da" },
          { native: "ꦠ", roman: "ta", sound: "ta" },
          { native: "ꦱ", roman: "sa", sound: "sa" }
        ]
      },
      sunda: {
        name: "Bahasa Sunda",
        region_id: "Jawa Barat & Banten",
        region_en: "West Java & Banten",
        status: "vulnerable",
        script: "ᮞᮥᮔ᮪ᮓ",
        phrase: '"Wilujeng sumping di NUSAVERSE."',
        translation_id: "Selamat datang di NUSAVERSE.",
        translation_en: "Welcome to NUSAVERSE.",
        alphabet: [
          { native: "ᮃ", roman: "a", sound: "ah" },
          { native: "ᮊ", roman: "ka", sound: "kah" },
          { native: "ᮎ", roman: "ca", sound: "chah" },
          { native: "ᮒ", roman: "ta", sound: "tah" },
          { native: "ᮔ", roman: "na", sound: "nah" },
          { native: "ᮕ", roman: "pa", sound: "pah" },
          { native: "ᮘ", roman: "ba", sound: "bah" },
          { native: "ᮙ", roman: "ma", sound: "mah" }
        ]
      },
      batak: {
        name: "Bahasa Batak Toba",
        region_id: "Sumatra Utara",
        region_en: "North Sumatra",
        status: "endangered",
        script: "ᯅᯗᯕ᯲",
        phrase: '"Horas! Selamat ro tu NUSAVERSE."',
        translation_id: "Selamat datang di NUSAVERSE.",
        translation_en: "Welcome to NUSAVERSE.",
        alphabet: [
          { native: "a", roman: "a", sound: "ah" },
          { native: "ᯅ", roman: "ba", sound: "bah" },
          { native: "ᯆ", roman: "pa", sound: "pah" },
          { native: "ᯇ", roman: "na", sound: "nah" },
          { native: "ᯈ", roman: "wa", sound: "wah" },
          { native: "ᯉ", roman: "ma", sound: "mah" },
          { native: "ᯊ", roman: "ta", sound: "tah" },
          { native: "ᯋ", roman: "da", sound: "dah" }
        ]
      },
      bugis: {
        name: "Bahasa Bugis",
        region_id: "Sulawesi Selatan",
        region_en: "South Sulawesi",
        status: "endangered",
        script: "ᨅᨘᨙᨁ",
        phrase: '"Salama\' pole ring NUSAVERSE."',
        translation_id: "Selamat datang di NUSAVERSE.",
        translation_en: "Welcome to NUSAVERSE.",
        alphabet: [
          { native: "ᨀ", roman: "ka", sound: "ka" },
          { native: "ᨁ", roman: "ga", sound: "ga" },
          { native: "ᨂ", roman: "nga", sound: "nga" },
          { native: "ᨃ", roman: "ngka", sound: "ngka" },
          { native: "ᨄ", roman: "pa", sound: "pa" },
          { native: "ᨅ", roman: "ba", sound: "ba" },
          { native: "ᨆ", roman: "ma", sound: "ma" },
          { native: "ᨇ", roman: "mpa", sound: "mpa" }
        ]
      },
      asmat: {
        name: "Bahasa Asmat",
        region_id: "Papua Selatan",
        region_en: "South Papua",
        status: "critical",
        script: "ASMAT",
        phrase: '"Ase yim ar ap ti NUSAVERSE."',
        translation_id: "Selamat datang di NUSAVERSE.",
        translation_en: "Welcome to NUSAVERSE.",
        alphabet: [
          { native: "A", roman: "a", sound: "ah" },
          { native: "S", roman: "s", sound: "es" },
          { native: "M", roman: "m", sound: "em" },
          { native: "A", roman: "a", sound: "ah" },
          { native: "T", roman: "t", sound: "te" },
          { native: "F", roman: "f", sound: "ef" },
          { native: "O", roman: "o", sound: "oh" },
          { native: "P", roman: "p", sound: "pe" }
        ]
      }
    };

export const ARTIFACTS_DATA: ArtifactData[] = [
      {
        id: "kris",
        category: "weapons",
        title_id: "Kris Singo Barong",
        title_en: "Singo Barong Kris",
        origin_id: "Jawa Timur",
        origin_en: "East Java",
        era_id: "Abad ke-16 Masehi",
        era_en: "16th Century",
        desc_id: "Senjata tikam legendaris dengan ukiran kepala singa berlapis emas pada pangkal bilahnya, menyimbolkan kekuatan, martabat raja, dan tameng pelindung spiritual.",
        desc_en: "A legendary dagger carved with a gold-coated lion head at the blade base, symbolizing power, royal status, and spiritual armor.",
        image: "https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=600&q=80",
        hotspot_1_title_id: "Hulu Singo",
        hotspot_1_title_en: "Lion Hilt",
        hotspot_1_desc_id: "Pegangan berukir megah melambangkan kewibawaan spiritual raja Jawa kuno.",
        hotspot_1_desc_en: "Magnificently carved handle representing the spiritual authority of ancient Javanese kings.",
        hotspot_2_title_id: "Bilah Luk Ganjil",
        hotspot_2_title_en: "Odd-numbered Curves",
        hotspot_2_desc_id: "Lekukan berjumlah 11 (ganjil) menyimbolkan tekad spiritual yang kokoh.",
        hotspot_2_desc_en: "11 curves representing firm, unwavering spiritual devotion.",
        h1_top: "35%", h1_left: "53%",
        h2_top: "60%", h2_left: "48%"
      },
      {
        id: "wayang",
        category: "sacred",
        title_id: "Wayang Kulit",
        title_en: "Leather Wayang Puppet",
        origin_id: "Jawa Tengah",
        origin_en: "Central Java",
        era_id: "Abad ke-15 Masehi",
        era_en: "15th Century",
        desc_id: "Boneka kulit tradisional untuk teater bayangan pewayangan Jawa, memerankan karakter ksatria Mahabharata dan menjadi sarana dakwah spiritual kuno.",
        desc_en: "Traditional leather puppet used in Javanese shadow theater, portraying epic Mahabharata characters for historical moral teachings.",
        image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=600&q=80",
        hotspot_1_title_id: "Ukiran Tatah",
        hotspot_1_title_en: "Ornate Chiselwork",
        hotspot_1_desc_id: "Ukiran lubang halus pada kulit kerbau untuk memproyeksikan bayangan indah.",
        hotspot_1_desc_en: "Intricate micro-holes chiseled on water buffalo hide to create detailed shadow outlines.",
        hotspot_2_title_id: "Cempurit Tanduk",
        hotspot_2_title_en: "Horn Handle",
        hotspot_2_desc_id: "Gagang kemudi dari tanduk kerbau keruh asli untuk kendali gerakan lentur.",
        hotspot_2_desc_en: "Steering stick made from buffalo horn providing flexible, lifelike puppet movement.",
        h1_top: "25%", h1_left: "52%",
        h2_top: "70%", h2_left: "50%"
      },
      {
        id: "batik",
        category: "textiles",
        title_id: "Batik Sogan Solo",
        title_en: "Classic Sogan Batik",
        origin_id: "Surakarta",
        origin_en: "Solo, Central Java",
        era_id: "Abad ke-17 Masehi",
        era_en: "17th Century",
        desc_id: "Batik tulis klasik bermotif sakral Parang Rusak dengan pewarnaan alami cokelat keemasan khas keraton Mataram Surakarta.",
        desc_en: "A classic hand-drawn batik featuring the sacred Parang Rusak motif in natural golden-brown clay dye from the Surakarta Palace.",
        image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=600&q=80",
        hotspot_1_title_id: "Motif Parang",
        hotspot_1_title_en: "Parang Wave Motif",
        hotspot_1_desc_id: "Pola ombak diagonal melambangkan pantang menyerah dan tekad kesatria.",
        hotspot_1_desc_en: "Diagonal wave patterns symbolizing resilience and chivalrous determination.",
        hotspot_2_title_id: "Malam Lilin Tulis",
        hotspot_2_title_en: "Hand-applied Wax",
        hotspot_2_desc_id: "Garis lilin malam ditulis tangan menggunakan canting tembaga mikro secara presisi.",
        hotspot_2_desc_en: "Hot beeswax lines drawn manually using micro copper canting tools.",
        h1_top: "30%", h1_left: "48%",
        h2_top: "65%", h2_left: "52%"
      }
    ];

export const ERAS_DATA: EraData[] = [
      {
        id: 0,
        year: "~2500 SM",
        title_id: "Masa Prasejarah Nusantara",
        title_en: "Prehistoric Era",
        desc_id: "Peradaban awal ditandai dengan lukisan dinding goa di Maros (Sulawesi) serta perkakas batu prasejarah melambangkan hubungan harmonis manusia pertama dengan alam.",
        desc_en: "Early civilization marked by cave wall paintings in Maros (Sulawesi) and stone tools symbolizing early man's harmony with nature.",
        image: "https://images.unsplash.com/photo-1504470695779-75300268aa0e?auto=format&fit=crop&w=800&q=80",
        color: "#040406",
        events: [
          { year: "40,000 SM", text_id: "Lukisan goa tangan tertua ditemukan di tebing Maros, Sulawesi.", text_en: "Oldest cave stencil paintings discovered in Maros, Sulawesi." },
          { year: "2,500 SM", text_id: "Migrasi bangsa Austronesia memperkenalkan teknik bertani di kepulauan nusantara.", text_en: "Austronesian migration introduces agriculture to the archipelago." }
        ],
        marquee: ["Lukisan Goa Maros ✦", "Migrasi Austronesia ✦", "Zaman Megalitikum ✦", "Sarkofagus Batu ✦"]
      },
      {
        id: 1,
        year: "Abad 4–15 M",
        title_id: "Era Kerajaan Klasik Hindu-Buddha",
        title_en: "Classical Hindu-Buddhist Era",
        desc_id: "Masuknya pengaruh aksara Pallawa dari India melahirkan tulisan pertama prasasti Yupa, serta pembangunan mahakarya dunia seperti candi Borobudur dan Prambanan.",
        desc_en: "The arrival of Pallava script from India births the first Yupa inscriptions, alongside masterworks Borobudur and Prambanan.",
        image: "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&w=800&q=80",
        color: "#081C15",
        events: [
          { year: "400 M", text_id: "Prasasti Yupa Kutai menandai catatan sejarah tulisan tertua nusantara.", text_en: "Kutai Yupa Inscription marks the oldest written record in Indonesia." },
          { year: "825 M", text_id: "Pembangunan Candi Buddha Borobudur selesai di bawah dinasti Syailendra.", text_en: "Construction of Borobudur Buddhist temple completed under Shailendra dynasty." }
        ],
        marquee: ["Prasasti Yupa ✦", "Candi Borobudur ✦", "Kerajaan Kutai Kartanegara ✦", "Candi Prambanan ✦"]
      },
      {
        id: 2,
        year: "Abad 7–16 M",
        title_id: "Zaman Kejayaan Kerajaan Maritim",
        title_en: "Maritime Empires Golden Age",
        desc_id: "Sriwijaya menguasai perdagangan emas dan rempah Selat Malaka, disusul kebangkitan Majapahit yang menyatukan wilayah nusantara di bawah Sumpah Palapa Patih Gajah Mada.",
        desc_en: "Sriwijaya controls the Malacca gold and spice trade, followed by Majapahit uniting the archipelago under Prime Minister Gajah Mada's Palapa Oath.",
        image: "https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&w=800&q=80",
        color: "#05192C",
        events: [
          { year: "683 M", text_id: "Kerajaan Sriwijaya menjadi pusat studi agama Buddha terbesar di Asia Tenggara.", text_en: "Sriwijaya Kingdom becomes the largest Buddhist studies hub in Southeast Asia." },
          { year: "1336 M", text_id: "Patih Gajah Mada mengikrarkan Sumpah Palapa untuk menyatukan Nusantara.", text_en: "Prime Minister Gajah Mada declares the Palapa Oath to unite Nusantara." }
        ],
        marquee: ["Sumpah Palapa ✦", "Selat Malaka Trade ✦", "Majapahit Armada ✦", "Prasasti Kedukan Bukit ✦"]
      },
      {
        id: 3,
        year: "Abad 16–20 M",
        title_id: "Masa Perjuangan & Kolonialisme",
        title_en: "Colonial & Resistance Era",
        desc_id: "Masuknya armada Eropa demi monopoli rempah memicu perlawanan sengit di berbagai daerah, melahirkan pahlawan nasional, serta pembentukan identitas nasional baru.",
        desc_en: "European fleets arriving for spice monopoly trigger fierce local resistance, forging national heroes and new shared identities.",
        image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80",
        color: "#230A0A",
        events: [
          { year: "1602 M", text_id: "Kongsi dagang VOC didirikan, memulai monopoli rempah di Maluku.", text_en: "VOC trading charter established, starting spice monopolies in Maluku." },
          { year: "1928 M", text_id: "Kongres Pemuda melahirkan ikrar Sumpah Pemuda (Satu Nusa, Bangsa, Bahasa).", text_en: "Youth Pledge Congress births the unified Oath: One homeland, nation, language." }
        ],
        marquee: ["Sumpah Pemuda 1928 ✦", "Monopoli Rempah ✦", "Perang Diponegoro ✦", "Kesenian Kebangkitan ✦"]
      },
      {
        id: 4,
        year: "1945–1998 M",
        title_id: "Fajar Kemerdekaan & Konsolidasi",
        title_en: "Independence & Nation Building",
        desc_id: "Proklamasi kemerdekaan 17 Agustus 1945 memulai babak baru konsolidasi negara kepulauan berdaulat, merumuskan ideologi Pancasila, dan integrasi bahasa persatuan Indonesia.",
        desc_en: "Independence Proclamation on August 17, 1945 starts sovereign nation building, drafting Pancasila, and integrating Indonesian as the national tongue.",
        image: "https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&w=800&q=80",
        color: "#1A0F03",
        events: [
          { year: "1945 M", text_id: "Proklamasi Kemerdekaan RI dibacakan oleh Soekarno-Hatta di Jakarta.", text_en: "Indonesian Independence Proclamation read by Soekarno-Hatta in Jakarta." },
          { year: "1955 M", text_id: "Penyelenggaraan Konferensi Asia Afrika (KAA) pertama kali di Bandung.", text_en: "First historic Asian-African Conference (KAA) hosted in Bandung." }
        ],
        marquee: ["Proklamasi 1945 ✦", "Konferensi Asia Afrika ✦", "Pancasila Draft ✦", "Kelahiran Bahasa Indonesia ✦"]
      },
      {
        id: 5,
        year: "1998–2026 M",
        title_id: "Era Reformasi & Kebangkitan Digital",
        title_en: "Reform & Digital Awakening Era",
        desc_id: "Indonesia memasuki era keterbukaan informasi, demokratisasi seni, serta integrasi teknologi digital untuk melestarikan warisan leluhur secara mandiri.",
        desc_en: "Indonesia enters open democracy, art democratization, and digital integration to preserve ancestral heritages autonomously.",
        image: "https://images.unsplash.com/photo-1598751337485-0d51f7b7677d?auto=format&fit=crop&w=800&q=80",
        color: "#07111F",
        events: [
          { year: "2009 M", text_id: "UNESCO menetapkan Batik Indonesia sebagai Warisan Kemanusiaan Takbenda.", text_en: "UNESCO designates Indonesian Batik as Masterpiece of Oral and Intangible Heritage." },
          { year: "2026 M", text_id: "NUSAVERSE diluncurkan sebagai platform digital pelestarian nusantara terpadu.", text_en: "NUSAVERSE launched as a unified digital platform for archipelago preservation." }
        ],
        marquee: ["UNESCO Batik 2009 ✦", "Pelestarian Digital ✦", "Internet Desa ✦", "Kesenian Metaverse ✦"]
      }
    ];

export const AI_RESPONSES: Record<string, AIResponse> = {
      wayang: {
        id_user: "Ceritakan asal usul Wayang Kulit",
        en_user: "Explain the history of Wayang shadow puppets",
        id_ai: "Wayang Kulit bermula sejak era prasejarah sebagai medium pemujaan arwah leluhur (Hyang). Pengaruh Hindu-Buddha merubah cerita menjadi kisah Ramayana/Mahabharata, lalu Sunan Kalijaga (era Islam) memodifikasi bentuknya menjadi pipih artistik agar sesuai dengan nilai kebudayaan lokal.",
        en_ai: "Wayang Kulit originated in prehistoric times as a medium to revere ancestral spirits (Hyang). Hindu-Buddhist periods integrated Ramayana/Mahabharata epics, and later Islamic saints modified the puppet designs into stylized flat leather models to align with local values."
      },
      bahasa: {
        id_user: "Berapa sisa bahasa daerah yang terancam punah?",
        en_user: "How many local languages are at risk of extinction?",
        id_ai: "Dari 718 bahasa daerah yang teridentifikasi (Badan Bahasa Kemendikbud, 2024), 29 bahasa berstatus terancam punah dan 8 di antaranya sudah masuk kategori kritis. Wilayah timur Indonesia seperti Maluku dan Papua paling rentan karena penutur muda aktifnya terus menyusut.",
        en_ai: "Of the 718 identified regional languages (Badan Bahasa, Ministry of Education, 2024), 29 are classified as endangered and 8 of those are critically endangered. Eastern Indonesia — Maluku and Papua — is most vulnerable as active young speaker numbers keep shrinking."
      },
      candi: {
        id_user: "Mengapa Candi Borobudur dibangun?",
        en_user: "Why was Borobudur Temple constructed?",
        id_ai: "Candi Borobudur dibangun oleh Dinasti Syailendra sekitar abad ke-9 sebagai tempat suci untuk memuliakan Buddha sekaligus sebagai panduan ziarah spiritual manusia menuju pencerahan (Nirwana) melalui relief Kamadhatu, Rupadhatu, dan Arupadhatu.",
        en_ai: "Borobudur Temple was built by the Shailendra Dynasty around the 9th century to honor Buddha and serve as a spiritual pilgrimage guide towards enlightenment (Nirvana) detailed across Kamadhatu, Rupadhatu, and Arupadhatu reliefs."
      },
      majapahit: {
        id_user: "Seberapa luas kekuasaan Majapahit dan Sriwijaya?",
        en_user: "How far did Majapahit and Sriwijaya's power extend?",
        id_ai: "Sriwijaya (abad 7–13) menguasai jalur emas dan rempah Selat Malaka serta menjadi pusat studi Buddha terbesar Asia Tenggara. Kejayaan maritim berlanjut lewat Majapahit, yang di bawah Patih Gajah Mada mengikrarkan Sumpah Palapa pada 1336 M untuk menyatukan wilayah Nusantara.",
        en_ai: "Sriwijaya (7th–13th century) controlled the Malacca gold and spice trade and became Southeast Asia's largest Buddhist studies hub. Maritime dominance continued under Majapahit, whose Prime Minister Gajah Mada declared the 1336 CE Palapa Oath to unite the archipelago."
      },
      batik: {
        id_user: "Kapan Batik diakui sebagai warisan dunia?",
        en_user: "When was Batik recognized as a world heritage?",
        id_ai: "UNESCO menetapkan Batik Indonesia sebagai Warisan Kemanusiaan untuk Budaya Lisan dan Nonbendawi pada tahun 2009. Setiap motif batik daerah punya makna filosofis berbeda — misalnya motif Parang dari Yogyakarta melambangkan kesinambungan perjuangan hidup.",
        en_ai: "UNESCO designated Indonesian Batik as a Masterpiece of Oral and Intangible Heritage of Humanity in 2009. Each regional batik motif carries distinct philosophical meaning — for example, Yogyakarta's Parang motif symbolizes life's continuous struggle."
      },
      suku: {
        id_user: "Berapa banyak suku bangsa di Indonesia?",
        en_user: "How many ethnic groups exist in Indonesia?",
        id_ai: "Berdasarkan Sensus Penduduk BPS tahun 2010, Indonesia memiliki sekitar 1.340 kelompok suku bangsa yang tersebar di 38 provinsi. Suku Jawa merupakan yang terbesar, sementara ratusan suku lain di Papua dan Nusa Tenggara masih menjaga tradisi lisan yang belum terdokumentasi luas.",
        en_ai: "According to BPS's 2010 Population Census, Indonesia has around 1,340 ethnic groups spread across 38 provinces. The Javanese are the largest group, while hundreds of smaller groups in Papua and Nusa Tenggara still maintain oral traditions that remain largely undocumented."
      },
      kemerdekaan: {
        id_user: "Bagaimana peran bahasa dalam kemerdekaan Indonesia?",
        en_user: "What role did language play in Indonesia's independence?",
        id_ai: "Sumpah Pemuda 1928 mengikrarkan \"satu bahasa, Bahasa Indonesia\" sebagai alat pemersatu ratusan suku dan bahasa daerah. Setelah Proklamasi 1945, Bahasa Indonesia (dari akar Bahasa Melayu) resmi menjadi bahasa negara sekaligus perekat identitas nasional di tengah keberagaman bahasa daerah.",
        en_ai: "The 1928 Youth Pledge declared \"one language, Indonesian\" as the unifying tool across hundreds of ethnic groups and regional languages. After the 1945 Proclamation, Indonesian (rooted in Malay) officially became the national language, binding identity amid vast linguistic diversity."
      }
    };

export const AI_KEYWORD_MAP: Record<string, string[]> = {
      wayang: ["wayang", "puppet", "kulit"],
      bahasa: ["bahasa", "punah", "language", "extinct", "endanger"],
      candi: ["candi", "borobudur", "prambanan", "temple"],
      majapahit: ["majapahit", "sriwijaya", "gajah mada", "maritim", "maritime"],
      batik: ["batik"],
      suku: ["suku", "etnis", "ethnic", "tribe"],
      kemerdekaan: ["kemerdekaan", "proklamasi", "independence", "sumpah pemuda", "1945"]
    };
