import { CulinaryData } from "@/types";

export const CULINARY_DATA: CulinaryData[] = [
  // ─── MAIN DISHES ───
  {
    id: "rendang",
    category: "main-dishes",
    title_id: "Rendang",
    title_en: "Rendang",
    province_id: "Sumatra Barat",
    province_en: "West Sumatra",
    description_id: "Hidangan daging sapi tradisional Minangkabau yang dimasak perlahan dalam campuran santan dan rempah-rempah hingga kering dan berwarna cokelat gelap.",
    description_en: "A traditional Minangkabau beef dish slowly cooked in a rich coconut milk and spice mixture until dry and dark brown.",
    history_id: "Rendang lahir dari kearifan lokal masyarakat Minangkabau dalam mengawetkan daging secara alami untuk perjalanan jauh melintasi samudra. Melalui teknik karamelisasi santan lambat (marandang), hidangan ini dapat bertahan berminggu-minggu tanpa lemari pendingin, menjadikannya bekal andalan para perantau Minang sejak abad ke-16.",
    history_en: "Rendang was born from Minangkabau ancestral wisdom of preserving meat naturally for long journeys across the ocean. Through the slow coconut milk caramelization technique (marandang), it can last for weeks without refrigeration, making it the staple travel ration for Minang migrants since the 16th century.",
    ingredients: [
      { name_id: "Daging Sapi", name_en: "Beef" },
      { name_id: "Santan Kelapa", name_en: "Coconut Milk" },
      { name_id: "Serai", name_en: "Lemongrass" },
      { name_id: "Daun Jeruk Purut", name_en: "Kaffir Lime Leaves" },
      { name_id: "Daun Kunyit", name_en: "Turmeric Leaves" },
      { name_id: "Bawang Merah & Putih", name_en: "Shallots & Garlic" },
      { name_id: "Cabai Merah", name_en: "Red Chili" },
      { name_id: "Jahe & Lengkuas", name_en: "Ginger & Galangal" }
    ],
    preparation: [
      {
        step: 1,
        title_id: "Persiapan Rempah",
        title_en: "Spice Grinding",
        desc_id: "Menghaluskan bawang merah, bawang putih, cabai, jahe, lengkuas, dan kunyit dengan batu giling tradisional (lado ulek).",
        desc_en: "Grind shallots, garlic, chilies, ginger, galangal, and turmeric using a traditional stone mortar."
      },
      {
        step: 2,
        title_id: "Pemasakan Gulai",
        title_en: "Gulai Boiling",
        desc_id: "Merebus santan bersama bumbu halus dan dedaunan wangi hingga mengeluarkan minyak kelapa alami.",
        desc_en: "Boil coconut milk with ground spices and aromatic leaves until natural coconut oil starts to separate."
      },
      {
        step: 3,
        title_id: "Tahap Kalio",
        title_en: "Kalio Stage",
        desc_id: "Memasukkan daging sapi dan memasaknya hingga kuah mengental menjadi cokelat kemerahan pekat (kalio).",
        desc_en: "Add beef and cook until the liquid thickens into a rich reddish-brown sauce (known as kalio)."
      },
      {
        step: 4,
        title_id: "Marandang",
        title_en: "Marandang Drying",
        desc_id: "Mengaduk terus di atas api kayu bakar kecil hingga minyak terserap kembali dan kelapa menempel kering hitam.",
        desc_en: "Stir continuously over low firewood heat until the oil reabsorbs and spices turn into a dry dark coating."
      }
    ],
    culturalMeaning: [
      {
        title_id: "Daging (Kepala Adat)",
        title_en: "Beef (Clan Leaders)",
        desc_id: "Daging sapi melambangkan Niniak Mamak (pemimpin adat) yang dihormati dalam sistem kekerabatan Minang.",
        desc_en: "Beef represents Niniak Mamak (clan leaders) who are highly respected in the Minang social system."
      },
      {
        title_id: "Kelapa (Cendekiawan)",
        title_en: "Coconut (Intellectuals)",
        desc_id: "Santan kelapa melambangkan Cadiak Pandai (kaum intelektual) yang merekatkan kebersamaan masyarakat.",
        desc_en: "Coconut milk symbolizes Cadiak Pandai (intellectuals) who bind the community together."
      },
      {
        title_id: "Cabai (Alim Ulama)",
        title_en: "Chili (Religious Leaders)",
        desc_id: "Cabai yang pedas melambangkan Alim Ulama yang tegas dalam menuntun syariat agama.",
        desc_en: "Spicy chili represents Alim Ulama (clerics) who are firm and sharp in guiding religious law."
      }
    ],
    recognition: {
      title_id: "Warisan Budaya Takbenda Nasional Indonesia (2013)",
      title_en: "National Intangible Cultural Heritage of Indonesia (2013)"
    },
    flavorProfile: {
      spiciness: 3,
      sweetness: 1,
      savory: 3,
      richness: 3,
      texture: 2
    },
    gallery: [
      "/assets/images/culinarys/rendang.jfif"
    ],
    relatedItems: ["pempek", "sambal-roa"]
  },
  {
    id: "gudeg",
    category: "main-dishes",
    title_id: "Gudeg",
    title_en: "Gudeg",
    province_id: "DI Yogyakarta",
    province_en: "DI Yogyakarta",
    description_id: "Sajian nangka muda yang dimasak perlahan bersama santan, gula jawa, dan daun jati untuk memberikan warna cokelat kemerahan alami yang khas.",
    description_en: "A young jackfruit dish slowly stewed with coconut milk, palm sugar, and teak leaves to yield a natural reddish-brown color.",
    history_id: "Gudeg berakar dari masa pembangunan Kerajaan Mataram Islam di hutan Mentaok pada abad ke-16. Para pekerja penebang pohon mengolah nangka muda yang melimpah dalam kuali raksasa (gentong) dengan mengaduknya menggunakan dayung kayu (hanggudek), yang kemudian menjadi asal mula nama hidangan ini.",
    history_en: "Gudeg originated during the construction of the Islamic Mataram Kingdom in the Mentaok forest in the 16th century. Forest-clearing workers slow-cooked abundant young jackfruits in massive clay pots, stirring them with wooden oars (hanggudek), which gave birth to the name of the dish.",
    ingredients: [
      { name_id: "Nangka Muda (Gori)", name_en: "Young Jackfruit" },
      { name_id: "Santan Kelapa", name_en: "Coconut Milk" },
      { name_id: "Gula Jawa", name_en: "Palm Sugar" },
      { name_id: "Daun Jati", name_en: "Teak Leaves" },
      { name_id: "Ketumbar", name_en: "Coriander" },
      { name_id: "Bawang Merah", name_en: "Shallots" },
      { name_id: "Kemiri", name_en: "Candlenuts" },
      { name_id: "Lengkuas", name_en: "Galangal" }
    ],
    preparation: [
      {
        step: 1,
        title_id: "Pelapisan Daun Jati",
        title_en: "Teak Leaf Layering",
        desc_id: "Menyusun daun jati di dasar kendil tanah liat tradisional untuk mencegah gosong dan memberi warna cokelat kemerahan alami.",
        desc_en: "Line the bottom of a traditional clay pot with teak leaves to prevent burning and impart a natural reddish-brown hue."
      },
      {
        step: 2,
        title_id: "Penyusunan Bahan",
        title_en: "Layering Jackfruit",
        desc_id: "Memasukkan potongan nangka muda bersama bumbu halus kemiri, ketumbar, lengkuas, dan gula merah Jawa.",
        desc_en: "Layer chopped young jackfruit with crushed candlenuts, coriander, galangal, and red palm sugar."
      },
      {
        step: 3,
        title_id: "Slow Stewing",
        title_en: "Slow Stewing",
        desc_id: "Menuangkan santan kental lalu memasaknya dengan api arang kecil selama minimal 12 jam hingga air menyusut habis.",
        desc_en: "Pour thick coconut milk and simmer over low charcoal embers for at least 12 hours until all liquid evaporates."
      },
      {
        step: 4,
        title_id: "Penginapan (Aging)",
        title_en: "Overnight Aging",
        desc_id: "Mendiamkan gudeg semalaman agar bumbu meresap sempurna ke dalam serat nangka sebelum disajikan hangat.",
        desc_en: "Let the cooked jackfruit sit overnight so the spices absorb deeply into the fibers before serving warm."
      }
    ],
    culturalMeaning: [
      {
        title_id: "Kesabaran (Sabar)",
        title_en: "Patience (Sabar)",
        desc_id: "Proses memasak yang memakan waktu belasan jam mengajarkan nilai kesabaran dan kehati-hatian dalam budaya Jawa.",
        desc_en: "The cooking process, which spans over 12 hours, teaches the value of patience and mindfulness in Javanese culture."
      },
      {
        title_id: "Ketenteraman (Harmoni)",
        title_en: "Harmony (Harmoni)",
        desc_id: "Rasa manis manis gurih yang menyatu melambangkan ketenteraman hidup batiniah dan harmoni sosial di Yogyakarta.",
        desc_en: "The sweet and savory flavors blended together symbolize inner peace and social harmony in Yogyakarta."
      }
    ],
    recognition: {
      title_id: "Warisan Budaya Takbenda Nasional Indonesia (2016)",
      title_en: "National Intangible Cultural Heritage of Indonesia (2016)"
    },
    flavorProfile: {
      spiciness: 0,
      sweetness: 3,
      savory: 2,
      richness: 3,
      texture: 2
    },
    gallery: [
      "/assets/images/culinarys/gudeg.jfif"
    ],
    relatedItems: ["klepon", "es-cendol"]
  },
  {
    id: "papeda",
    category: "main-dishes",
    title_id: "Papeda",
    title_en: "Papeda",
    province_id: "Papua",
    province_en: "Papua",
    description_id: "Makanan pokok khas Papua dan Maluku berbahan dasar tepung sagu mentah yang disiram air mendidih hingga membentuk jeli bening kenyal, disajikan bersama kuah ikan kuning.",
    description_en: "A staple starch dish of Papua and Maluku made from raw sago flour mixed with boiling water to form a sticky clear gel, served with yellow fish soup.",
    history_id: "Papeda merupakan warisan prasejarah masyarakat kepulauan rempah Melanesia yang telah memanfaatkan pohon sagu (Metroxylon sagu) sebagai sumber karbohidrat utama selama ribuan tahun. Hidangan ini dimasak dalam gerabah tanah liat tradisional (semeri) dan dimakan menggunakan sumpit bambu khusus (gata-gata).",
    history_en: "Papeda is a prehistoric heritage of Melanesian islanders who have utilized the sago palm (Metroxylon sagu) as their primary carbohydrate source for millennia. It is traditionally prepared in a clay pot (semeri) and eaten using split bamboo utensils (gata-gata).",
    ingredients: [
      { name_id: "Tepung Sagu Basah", name_en: "Raw Wet Sago Starch" },
      { name_id: "Air Mendidih", name_en: "Boiling Water" },
      { name_id: "Perasan Jeruk Nipis", name_en: "Lime Juice" },
      { name_id: "Daun Kemangi", name_en: "Lemon Basil" },
      { name_id: "Kunyit (Ikan Kuning)", name_en: "Turmeric (for Fish Soup)" },
      { name_id: "Ikan Tongkol/Cakalang", name_en: "Tuna/Skipjack Fish" }
    ],
    preparation: [
      {
        step: 1,
        title_id: "Pengenceran Sagu",
        title_en: "Sago Dissolving",
        desc_id: "Melarutkan tepung sagu mentah dengan sedikit air dingin dan perasan jeruk nipis di dalam wadah gerabah tanah liat.",
        desc_en: "Dissolve raw sago starch with a small amount of cold water and lime juice inside a traditional clay bowl."
      },
      {
        step: 2,
        title_id: "Penyiraman Air Panas",
        title_en: "Boiling Water Pour",
        desc_id: "Menyiram adonan sagu encer secara perlahan dengan air mendidih bergolak sambil diaduk cepat memutar.",
        desc_en: "Pour bubbling boiling water slowly into the sago mixture while stirring rapidly in a circular motion."
      },
      {
        step: 3,
        title_id: "Pengadukan Cepat",
        title_en: "Stirring to Gel",
        desc_id: "Mengaduk kuat-kuat hingga seluruh adonan berubah warna menjadi bening transparan dan bertekstur kental kenyal liat.",
        desc_en: "Stir vigorously until the entire white mixture turns clear, transparent, and transforms into a thick, sticky gel."
      },
      {
        step: 4,
        title_id: "Penyajian Kuah Kuning",
        title_en: "Serving with Soup",
        desc_id: "Menggulung papeda dengan gata-gata bambu, lalu meletakkannya di piring berisi ikan kuah kuning kunyit kemangi asam.",
        desc_en: "Roll the papeda gel using split bamboo sticks (gata-gata) and drop into a plate filled with aromatic yellow turmeric fish soup."
      }
    ],
    culturalMeaning: [
      {
        title_id: "Pohon Kehidupan (Sagu)",
        title_en: "Tree of Life",
        desc_id: "Sagu dianggap sebagai ibu bumi atau pohon kehidupan karena menyokong kelangsungan hidup manusia Papua sejak zaman purba.",
        desc_en: "Sago is revered as the mother earth or tree of life because it has supported Papuan human survival since prehistoric times."
      },
      {
        title_id: "Persaudaraan (Helai)",
        title_en: "Kinsmanship (Helai)",
        desc_id: "Tradisi memakan papeda bersama dalam satu wadah gerabah besar (helai) menyimbolkan ikatan persaudaraan erat antarklan suku.",
        desc_en: "The tradition of eating papeda together from a single large clay bowl (helai) symbolizes strong kinsmanship and unity between tribal clans."
      }
    ],
    recognition: {
      title_id: "Warisan Budaya Takbenda Nasional Indonesia (2015)",
      title_en: "National Intangible Cultural Heritage of Indonesia (2015)"
    },
    flavorProfile: {
      spiciness: 2,
      sweetness: 1,
      savory: 3,
      richness: 2,
      texture: 3
    },
    gallery: [
      "/assets/images/culinarys/papeda.jfif"
    ],
    relatedItems: ["sambal-roa", "rendang"]
  },

  // ─── TRADITIONAL CAKES ───
  {
    id: "klepon",
    category: "traditional-cakes",
    title_id: "Klepon",
    title_en: "Klepon",
    province_id: "Jawa Tengah",
    province_en: "Central Java",
    description_id: "Kue basah tradisional berbentuk bulat berbahan ketan hijau pandan yang diisi gula merah cair dan dibalur parutan kelapa segar.",
    description_en: "A round traditional wet cake made of green pandan-flavored glutinous rice flour, filled with liquid palm sugar and coated in shredded coconut.",
    history_id: "Klepon pertama kali diperkenalkan ke publik Eropa pada awal abad ke-20 oleh imigran Indonesia asal Pasuruan, Jawa Timur. Kue ketan berisi kejutan gula cair ini telah lama disajikan dalam berbagai upacara adat selamatan Jawa sebagai perlambang kesederhanaan.",
    history_en: "Klepon was first introduced to the European public in the early 20th century by Indonesian immigrants from Pasuruan, East Java. This sticky rice cake with a liquid sugar surprise inside has long been served in Javanese gratitude rituals (selamatan) to symbolize humility.",
    ingredients: [
      { name_id: "Tepung Ketan", name_en: "Glutinous Rice Flour" },
      { name_id: "Daun Pandan", name_en: "Pandan Leaves" },
      { name_id: "Gula Jawa Aren", name_en: "Javanese Palm Sugar" },
      { name_id: "Kelapa Setengah Tua", name_en: "Medium-ripe Shredded Coconut" },
      { name_id: "Garam Halus", name_en: "Fine Salt" }
    ],
    preparation: [
      {
        step: 1,
        title_id: "Pengukusan Kelapa",
        title_en: "Coconut Steaming",
        desc_id: "Memarut kelapa setengah tua, mencampurnya dengan sedikit garam, lalu mengukusnya agar tidak mudah basi dan beraroma gurih kontras.",
        desc_en: "Grate medium-ripe coconut, mix with a pinch of salt, and steam to prevent spoilage and release a contrasting savory aroma."
      },
      {
        step: 2,
        title_id: "Pencampuran Ketan",
        title_en: "Ketan Mixing",
        desc_id: "Menguleni tepung ketan dengan air perasan daun pandan wangi hingga kalis dan mudah dibentuk bulat-bulat kecil.",
        desc_en: "Knead glutinous rice flour with fresh pandan juice until smooth and easily pliable into small balls."
      },
      {
        step: 3,
        title_id: "Pengisian Gula",
        title_en: "Sugar Filling",
        desc_id: "Mengambil sedikit adonan ketan, memipihkannya, meletakkan potongan gula merah aren di tengah, lalu merapatkan membulat.",
        desc_en: "Pinch a small piece of dough, flatten it, place a small chunk of palm sugar in the center, and wrap it tightly into a sphere."
      },
      {
        step: 4,
        title_id: "Perebusan & Pembaluran",
        title_en: "Boiling & Coating",
        desc_id: "Merebus bulatan ketan dalam air mendidih hingga mengapung tanda gula meleleh, lalu langsung menggulingkannya di atas parutan kelapa.",
        desc_en: "Boil the dough balls in boiling water until they float (indicating the sugar has melted), then roll directly in shredded coconut."
      }
    ],
    culturalMeaning: [
      {
        title_id: "Sensasi Kejutan (Kejutan Manis)",
        title_en: "Liquid Surprise",
        desc_id: "Letusan gula merah cair saat klepon digigit melambangkan berkah tak terduga yang datang setelah usaha keras.",
        desc_en: "The burst of liquid palm sugar when bitten symbolizes unexpected blessings that arrive after persistent effort."
      },
      {
        title_id: "Kesederhanaan (Kerukunan)",
        title_en: "Simplicity",
        desc_id: "Bahan-bahan lokal yang sederhana merepresentasikan filosofi hidup bersahaja dan kerukunan warga desa Jawa.",
        desc_en: "The humble local ingredients represent the Javanese philosophy of humble living and community cohesion."
      }
    ],
    recognition: {
      title_id: "Warisan Budaya Takbenda Jawa Tengah",
      title_en: "Intangible Cultural Heritage of Central Java"
    },
    flavorProfile: {
      spiciness: 0,
      sweetness: 3,
      savory: 2,
      richness: 2,
      texture: 3
    },
    gallery: [
      "/assets/images/culinarys/klepon.jfif"
    ],
    relatedItems: ["es-cendol", "gudeg"]
  },
  {
    id: "bika-ambon",
    category: "traditional-cakes",
    title_id: "Bika Ambon",
    title_en: "Bika Ambon",
    province_id: "Sumatra Utara",
    province_en: "North Sumatra",
    description_id: "Kue basah tradisional berongga khas Medan bertekstur kenyal lembut yang diolah menggunakan ragi alami nira kelapa (tuak nira) dengan aroma daun pandan dan serai.",
    description_en: "A traditional spongy honeycomb cake from Medan with a soft chewy texture, prepared using natural fermented coconut sap yeast.",
    history_id: "Meskipun menyandang nama 'Ambon', kue ini merupakan ikon kuliner Medan, Sumatra Utara. Menurut sejarah lisan, nama 'Ambon' disematkan karena kue ini pertama kali dijual secara komersial dan populer di simpang Jalan Ambon di kota Medan pada era kolonial Belanda.",
    history_en: "Despite bearing the name 'Ambon', this cake is a culinary icon of Medan, North Sumatra. According to oral history, it was named after Ambon Street in Medan, where the cake was first baked and popularized commercially during the Dutch colonial era.",
    ingredients: [
      { name_id: "Tepung Sagu & Terigu", name_en: "Sago & Wheat Flour" },
      { name_id: "Santan Rebus Serai", name_en: "Steeped Lemongrass Coconut Milk" },
      { name_id: "Kuning Telur Bebek", name_en: "Duck Egg Yolks" },
      { name_id: "Ragi Tuak Nira", name_en: "Natural Coconut Sap Yeast" },
      { name_id: "Kunyit Bubuk", name_en: "Turmeric Powder" }
    ],
    preparation: [
      {
        step: 1,
        title_id: "Aktivasi Ragi Nira",
        title_en: "Yeast Activation",
        desc_id: "Membuat biang ragi alami menggunakan tuak kelapa manis hangat agar menghasilkan tekstur berongga sarang lebah.",
        desc_en: "Prepare the natural starter yeast using warm sweet coconut sap to create the honeycomb texture."
      },
      {
        step: 2,
        title_id: "Pembuatan Adonan",
        title_en: "Batter Preparation",
        desc_id: "Mengocok kuning telur bebek, mencampurnya dengan tepung sagu, santan kunyit kuning, dan air ragi hingga larut homogen.",
        desc_en: "Whip duck egg yolks, combine with sago starch, golden turmeric coconut milk, and yeast starter until smooth."
      },
      {
        step: 3,
        title_id: "Fermentasi Lambat",
        title_en: "Slow Fermentation",
        desc_id: "Mendiamkan adonan selama 7-10 jam hingga berbusa penuh tanda proses pelepasan gas karbon dioksida pembentuk rongga.",
        desc_en: "Let the batter rest for 7-10 hours until fully foamy, allowing gas bubbles to form the sponge cavities."
      },
      {
        step: 4,
        title_id: "Pemanggangan Terbuka",
        title_en: "Open Baking",
        desc_id: "Memanggang adonan dalam loyang besi tebal di atas api bawah tanpa ditutup hingga muncul rongga-rongga udara ke permukaan.",
        desc_en: "Bake in a thick iron pan over bottom heat without a lid until air holes rise and stabilize on the surface."
      }
    ],
    culturalMeaning: [
      {
        title_id: "Akulturasi Sumatra-Maluku",
        title_en: "Inter-island Acculturation",
        desc_id: "Hubungan nama Ambon dengan Medan mencerminkan migrasi sejarah antarpulau dan pembauran komunitas kolonial.",
        desc_en: "The link between Ambon and Medan reflects historical migration patterns and colonial inter-island trade."
      },
      {
        title_id: "Kecermatan Proses",
        title_en: "Meticulous Process",
        desc_id: "Waktu fermentasi yang lama melambangkan kehati-hatian dan ketekunan yang diperlukan dalam merencanakan masa depan.",
        desc_en: "The extensive fermentation process symbolizes the careful planning and patience required in life."
      }
    ],
    recognition: {
      title_id: "Warisan Kuliner Klasik Sumatra Utara",
      title_en: "Classic Culinary Heritage Asset of North Sumatra"
    },
    flavorProfile: {
      spiciness: 0,
      sweetness: 3,
      savory: 2,
      richness: 3,
      texture: 3
    },
    gallery: [
      "/assets/images/culinarys/bika ambon.jfif"
    ],
    relatedItems: ["lapis-legit", "es-cendol"]
  },
  {
    id: "lapis-legit",
    category: "traditional-cakes",
    title_id: "Lapis Legit",
    title_en: "Lapis Legit",
    province_id: "Jawa Timur",
    province_en: "East Java",
    description_id: "Kue lapis premium tradisional yang kaya akan mentega, kuning telur, dan rempah spekuk (kayu manis, cengkih, kapulaga) dengan puluhan lapisan tipis berwarna cokelat keemasan.",
    description_en: "A premium layered cake rich in butter, egg yolks, and spekkoek spices, baked layer by layer into dozens of thin golden-brown sheets.",
    history_id: "Lapis Legit (Spekkoek) dikembangkan pada masa kolonial Hindia Belanda. Ibu-ibu lokal memodifikasi kue spons Eropa dengan menambahkan rempah-rempah eksotis nusantara seperti cengkih Maluku dan kayu manis, menjadikannya sajian mewah bagi para pejabat Belanda.",
    history_en: "Lapis Legit (known as Spekkoek) was created during the Dutch East Indies colonial era. Local women modified European sponge cakes by infusing exotic local spices like cloves and cinnamon, turning it into a luxury treat for colonial elites.",
    ingredients: [
      { name_id: "Kuning Telur (30-40 butir)", name_en: "Egg Yolks (30-40 yolks)" },
      { name_id: "Mentega Butter Premium", name_en: "Premium Butter" },
      { name_id: "Gula Kastor", name_en: "Castor Sugar" },
      { name_id: "Bubuk Spekuk", name_en: "Spekkoek Spice Blend" },
      { name_id: "Tepung Terigu Rendah Gluten", name_en: "Low-gluten Flour" }
    ],
    preparation: [
      {
        step: 1,
        title_id: "Pengocokan Lemak",
        title_en: "Creaming Fat",
        desc_id: "Mengocok mentega butter premium hingga sangat mengembang pucat untuk menghasilkan kelembapan tinggi.",
        desc_en: "Whip high-grade butter until light, pale, and fluffy to achieve a moist crumb texture."
      },
      {
        step: 2,
        title_id: "Penyatuan Telur & Rempah",
        title_en: "Egg & Spice Whipping",
        desc_id: "Mengocok kuning telur dan gula hingga kental berjejak, lalu mencampurnya dengan bubuk spekuk harum.",
        desc_en: "Beat egg yolks and sugar until thick, then fold in Spekkoek spice powder."
      },
      {
        step: 3,
        title_id: "Pemanggangan Berlapis",
        title_en: "Layered Baking",
        desc_id: "Menuangkan adonan tipis-tipis (sekitar 2-3 milimeter) lalu memanggangnya lapis demi lapis menggunakan grill atas.",
        desc_en: "Pour thin layers (about 2-3 mm) and bake them sheet by sheet using top grill heat."
      },
      {
        step: 4,
        title_id: "Pengepresan Lapisan",
        title_en: "Layer Pressing",
        desc_id: "Menekan lembut setiap lapisan matang dengan alat penekan khusus agar menyatu padat merata sebelum menuang lapisan baru.",
        desc_en: "Gently press each baked layer using a flat metal tool to ensure even compaction before pouring the next batter."
      }
    ],
    culturalMeaning: [
      {
        title_id: "Kemakmuran Berlapis",
        title_en: "Layered Prosperity",
        desc_id: "Lapisan bertumpuk yang presisi melambangkan harapan akan rezeki dan kemakmuran yang terus bertumpuk di masa depan.",
        desc_en: "The stacked layers represent wishes for continuous, accumulating prosperity and luck in the future."
      },
      {
        title_id: "Penghormatan Tamu Agung",
        title_en: "Honor for Guests",
        desc_id: "Karena bahan dan prosesnya yang mahal, kue ini melambangkan penghormatan tertinggi kepada tamu agung saat Lebaran dan Imlek.",
        desc_en: "Due to its high cost and preparation time, it symbolizes the highest respect for honored guests during holidays."
      }
    ],
    recognition: {
      title_id: "Warisan Kuliner Akulturasi Indo-Eropa",
      title_en: "Indo-European Fusion Culinary Heritage Asset"
    },
    flavorProfile: {
      spiciness: 0,
      sweetness: 3,
      savory: 3,
      richness: 3,
      texture: 3
    },
    gallery: [
      "/assets/images/culinarys/lapis legit.jfif"
    ],
    relatedItems: ["bika-ambon", "klepon"]
  },

  // ─── SNACKS ───
  {
    id: "pempek",
    category: "snacks",
    title_id: "Pempek",
    title_en: "Pempek",
    province_id: "Sumatra Selatan",
    province_en: "South Sumatra",
    description_id: "Kudapan olahan daging ikan tenggiri dan tepung sagu khas Palembang yang disajikan bersama kuah cuko asam pedas manis yang kental.",
    description_en: "A savory Palembang fish cake made of mackerel meat and sago flour, served with a thick, sweet, spicy, and sour vinegar sauce (cuko).",
    history_id: "Pempek telah dikenal sejak masa Kesultanan Palembang Darussalam pada abad ke-16. Menurut tradisi lisan, hidangan ini awalnya dijajakan oleh orang Tionghoa paruh baya yang akrab dipanggil 'Apek'. Kata 'Pempek' lahir dari panggilan para pembeli yang memanggil penjual tersebut: 'Pek, empek!'.",
    history_en: "Pempek has been known since the Palembang Darussalam Sultanate in the 16th century. According to oral history, it was originally peddled by elderly Chinese immigrants called 'Apek'. The name 'Pempek' originated from customers calling out to the vendors: 'Pek, empek!'.",
    ingredients: [
      { name_id: "Daging Ikan Tenggiri", name_en: "Mackerel Fish Meat" },
      { name_id: "Tepung Sagu Tani", name_en: "Sago Flour" },
      { name_id: "Air Es", name_en: "Ice Water" },
      { name_id: "Bawang Putih (Cuko)", name_en: "Garlic (Cuko)" },
      { name_id: "Gula Merah Aren", name_en: "Palm Aren Sugar" },
      { name_id: "Asam Jawa", name_en: "Tamarind" },
      { name_id: "Cabai Rawit", name_en: "Bird's Eye Chili" }
    ],
    preparation: [
      {
        step: 1,
        title_id: "Pengulenan Adonan",
        title_en: "Dough Kneading",
        desc_id: "Mencampur daging ikan giling halus dengan air es, garam, lalu menambahkan sagu sedikit demi sedikit agar tekstur kenyal pas.",
        desc_en: "Mix ground fish meat with ice water, salt, and fold in sago flour gradually to achieve the ideal chewy consistency."
      },
      {
        step: 2,
        title_id: "Pembentukan Pempek",
        title_en: "Shaping the Cake",
        desc_id: "Membentuk adonan menjadi kapal selam (diisi telur mentah), lenjer (silinder), atau adaan (bulat bawang).",
        desc_en: "Shape the dough into 'kapal selam' (filled with raw egg), 'lenjer' (cylindrical shape), or 'adaan' (round onion-infused balls)."
      },
      {
        step: 3,
        title_id: "Perebusan & Penggorengan",
        title_en: "Boiling & Frying",
        desc_id: "Merebus pempek hingga mengapung matang, meniriskan, lalu menggorengnya dalam minyak panas hingga berkulit renyah emas.",
        desc_en: "Boil the cakes until they float, drain, and deep-fry in hot oil until a thin crispy golden skin forms."
      },
      {
        step: 4,
        title_id: "Penyeduhan Cuko",
        title_en: "Cuko Brew",
        desc_id: "Merebus gula aren hitam, asam jawa, bawang putih geprek, dan cabai rawit hingga kuah kental, lalu menyaringnya.",
        desc_en: "Boil black palm sugar, tamarind, crushed garlic, and chilies until thick, then strain to make the cuko sauce."
      }
    ],
    culturalMeaning: [
      {
        title_id: "Asimilasi Budaya",
        title_en: "Cultural Assimilation",
        desc_id: "Pempek menggambarkan keharmonisan akulturasi budaya kuliner Melayu Palembang dengan pendatang Tionghoa.",
        desc_en: "Pempek reflects the harmonious culinary acculturation between Palembang Malays and Chinese immigrants."
      },
      {
        title_id: "Kebersamaan (Ngangkat Cuko)",
        title_en: "Togetherness (Cuko Sipping)",
        desc_id: "Tradisi meminum kuah cuko langsung dari piring kecil melambangkan keterbukaan sosial masyarakat Palembang.",
        desc_en: "The tradition of drinking the spicy vinegar directly from the saucer represents the open, welcoming nature of Palembang society."
      }
    ],
    recognition: {
      title_id: "Warisan Budaya Takbenda Nasional Indonesia (2014)",
      title_en: "National Intangible Cultural Heritage of Indonesia (2014)"
    },
    flavorProfile: {
      spiciness: 3,
      sweetness: 2,
      savory: 3,
      richness: 2,
      texture: 3
    },
    gallery: [
      "/assets/images/culinarys/pempek.jfif"
    ],
    relatedItems: ["rendang", "siomay-bandung"]
  },
  {
    id: "lumpia-semarang",
    category: "snacks",
    title_id: "Lumpia Semarang",
    title_en: "Semarang Spring Roll",
    province_id: "Jawa Tengah",
    province_en: "Central Java",
    description_id: "Kudapan renyah khas Semarang berisi rebung bambu muda manis, telur bebek, dan udang kering giling, dibungkus kulit gandum tipis lalu digoreng garing.",
    description_en: "A crispy Semarang spring roll filled with sweet bamboo shoots, duck egg, and dried shrimp, wrapped in a thin pastry sheet and fried.",
    history_id: "Lumpia Semarang diciptakan pada abad ke-19 oleh pasangan suami istri Tjoa Tha Yoe (pendatang Tionghoa) dan Mbak Wasih (warga lokal Jawa). Mereka menyatukan resep lumpia Tiongkok yang asin dengan kegemaran orang Jawa akan rasa manis rebung.",
    history_en: "Semarang Spring Roll was created in the 19th century by Tjoa Tha Yoe (a Chinese immigrant) and Mbak Wasih (a local Javanese woman). They fused the savory Chinese spring roll filling with the sweet Javanese palate for young bamboo shoots.",
    ingredients: [
      { name_id: "Rebung Bambu Muda", name_en: "Young Bamboo Shoots" },
      { name_id: "Udang Kupas", name_en: "Peeled Shrimps" },
      { name_id: "Kulit Lumpia Tipis", name_en: "Thin Roll Pastry" },
      { name_id: "Ebi (Udang Kering)", name_en: "Dried Shrimp (Ebi)" },
      { name_id: "Saus Bawang Kental", name_en: "Thick Garlic Dip" }
    ],
    preparation: [
      {
        step: 1,
        title_id: "Penghilangan Bau Rebung",
        title_en: "Bamboo Deodorizing",
        desc_id: "Merebus rebung muda berulang kali dengan garam hingga bau langu khas rebung hilang, lalu meniriskan halus.",
        desc_en: "Boil young bamboo shoots multiple times with salt to strip away the strong grassy odor, then drain well."
      },
      {
        step: 2,
        title_id: "Penulisan Isian",
        title_en: "Filling Sauté",
        desc_id: "Menumis rebung cincang bersama udang, ebi tumbuk, bawang putih, kecap manis, dan telur bebek orak-arik hingga kering.",
        desc_en: "Sauté chopped shoots with shrimp, crushed ebi, garlic, sweet soy sauce, and duck eggs until fully dried."
      },
      {
        step: 3,
        title_id: "Pembungkusan (Wrapping)",
        title_en: "Wrapping the Roll",
        desc_id: "Meletakkan tumisan di atas kulit lumpia tipis, melipat sudutnya rapat, lalu merekatkan ujungnya dengan putih telur.",
        desc_en: "Place filling on the pastry sheet, fold the corners tightly, and seal the edges using raw egg whites."
      },
      {
        step: 4,
        title_id: "Goreng Garing",
        title_en: "Deep Frying",
        desc_id: "Menggoreng lumpia dalam minyak banyak hingga berwarna kuning keemasan garing, disajikan hangat dengan saus bawang manis.",
        desc_en: "Deep-fry the rolls in hot oil until golden-brown and crispy, served warm with sweet garlic dipping sauce."
      }
    ],
    culturalMeaning: [
      {
        title_id: "Simbol Akulturasi Cinta",
        title_en: "Symbol of Love and Fusion",
        desc_id: "Lumpia lahir dari asimilasi perkawinan campuran yang harmonis antara budaya Tionghoa dan Jawa di Semarang.",
        desc_en: "Lumpia was born from the marriage and culinary assimilation between Chinese and Javanese communities in Semarang."
      },
      {
        title_id: "Tekstur Kehidupan",
        title_en: "Texture of Life",
        desc_id: "Perpaduan renyah di luar dan kelembutan manis rebung di dalam melambangkan kejutan manis dalam kerasnya perjuangan hidup.",
        desc_en: "The combination of a crispy outer shell and sweet interior symbolizes sweet outcomes derived from hard work."
      }
    ],
    recognition: {
      title_id: "Warisan Budaya Takbenda Nasional Indonesia (2014)",
      title_en: "National Intangible Cultural Heritage of Indonesia (2014)"
    },
    flavorProfile: {
      spiciness: 0,
      sweetness: 3,
      savory: 3,
      richness: 2,
      texture: 3
    },
    gallery: [
      "/assets/images/culinarys/lumpia.jfif"
    ],
    relatedItems: ["pempek", "siomay-bandung"]
  },
  {
    id: "siomay-bandung",
    category: "snacks",
    title_id: "Siomay Bandung",
    title_en: "Bandung Siomay",
    province_id: "Jawa Barat",
    province_en: "West Java",
    description_id: "Kudapan kukus berbahan dasar daging ikan tenggiri dan tapioka yang disajikan bersama tahu, kentang, kubis kukus, dan disiram saus kacang pedas manis.",
    description_en: "A steamed fish dumpling made from mackerel fish and tapioca, served with tofu, potatoes, cabbage, and covered in sweet-spicy peanut sauce.",
    history_id: "Siomay diadaptasi dari resep 'Shumai' kuliner Tionghoa. Pendatang Tionghoa di Bandung mulai menyesuaikan bahan isian babi dengan daging ikan tenggiri lokal yang segar dan halal, lalu mengganti saus kecap asin dengan siraman bumbu kacang tanah giling khas Sunda.",
    history_en: "Siomay was adapted from Chinese 'Shumai' dumplings. Chinese migrants in Bandung swapped pork filling for locally sourced halal mackerel fish, replacing soy sauce with sweet-savory Sundanese ground peanut dressing.",
    ingredients: [
      { name_id: "Daging Ikan Tenggiri Giling", name_en: "Ground Mackerel Fish" },
      { name_id: "Labu Siam (untuk Kelembutan)", name_en: "Chayote (for Moistness)" },
      { name_id: "Tepung Tapioka", name_en: "Tapioca Flour" },
      { name_id: "Kacang Tanah Sangrai", name_en: "Roasted Peanuts" },
      { name_id: "Tahu & Telur Rebus", name_en: "Tofu & Boiled Eggs" }
    ],
    preparation: [
      {
        step: 1,
        title_id: "Pengadukan Isian",
        title_en: "Filling Preparation",
        desc_id: "Mencampur ikan giling, labu siam parut kukus (untuk menjaga kelembapan), bawang putih haluskan, garam, dan tapioka.",
        desc_en: "Mix ground fish, grated chayote (keeps the dumpling moist), garlic, salt, and tapioca flour."
      },
      {
        step: 2,
        title_id: "Pembentukan & Pengukusan",
        title_en: "Shaping & Steaming",
        desc_id: "Membentuk siomay bulat tidak beraturan, mengisikannya ke tahu belah, lalu mengukus bersama kentang dan kol gulung.",
        desc_en: "Shape the dumplings, fill halved tofu sheets, and steam them together with potatoes and cabbage rolls."
      },
      {
        step: 3,
        title_id: "Pemasakan Bumbu Kacang",
        title_en: "Peanut Sauce Cooking",
        desc_id: "Menghaluskan kacang tanah sangrai, cabai merah kering, bawang putih, lalu memasaknya di wajan dengan air, gula jawa, dan asam jawa.",
        desc_en: "Blend roasted peanuts, dried chilies, and garlic, then simmer with water, palm sugar, and tamarind until oil separates."
      },
      {
        step: 4,
        title_id: "Penyajian (Plating)",
        title_en: "Plating",
        desc_id: "Memotong siomay kukus di piring saji, menyiram kuah kacang kental hangat, kecap manis, dan perasan jeruk limau kasturi.",
        desc_en: "Cut steamed dumplings on a plate, pour warm thick peanut sauce, sweet soy sauce, and squeeze fresh key lime juice."
      }
    ],
    culturalMeaning: [
      {
        title_id: "Fleksibilitas Bahan",
        title_en: "Ingredient Flexibility",
        desc_id: "Penggunaan labu siam di dalam adonan mencerminkan kecerdikan juru masak lokal Sunda dalam merekayasa kelembutan makanan.",
        desc_en: "Mixing chayote into the dough reflects Sundanese culinary ingenuity in naturally engineering food moistness."
      },
      {
        title_id: "Kebersamaan Jalanan (Street Food)",
        title_en: "Street Food Unity",
        desc_id: "Sebagai makanan jalanan paling populer, siomay melambangkan demokratisasi kuliner yang dinikmati semua kelas sosial.",
        desc_en: "As a highly popular street food, siomay represents a culinary equalizer enjoyed by all social classes."
      }
    ],
    recognition: {
      title_id: "Warisan Kuliner Jalanan Terpopuler Jawa Barat",
      title_en: "Popular Street Food Heritage of West Java"
    },
    flavorProfile: {
      spiciness: 2,
      sweetness: 3,
      savory: 3,
      richness: 2,
      texture: 3
    },
    gallery: [
      "/assets/images/culinarys/siomay.jfif"
    ],
    relatedItems: ["pempek", "lumpia-semarang"]
  },

  // ─── BEVERAGES ───
  {
    id: "es-cendol",
    category: "beverages",
    title_id: "Es Cendol",
    title_en: "Es Cendol",
    province_id: "Jawa Barat",
    province_en: "West Java",
    description_id: "Minuman manis dingin berisi butiran cendol tepung beras pandan hijau suji, disiram santan gurih dan saus gula merah aren cair.",
    description_en: "A sweet cold dessert drink containing green rice flour drops flavored with pandan and suji, topped with coconut milk and liquid palm sugar.",
    history_id: "Es Cendol merupakan modifikasi dari dawet Jawa kuno yang tercatat dalam prasasti abad ke-12. Di Jawa Barat, istilah 'Cendol' lahir dari sensasi rasa jeli tepung beras saat disedot melewati sedotan bambu, yang memicu lidah bergoyang bergumam kata 'jendol' atau 'cendol'.",
    history_en: "Es Cendol is a modification of ancient Javanese dawet recorded in 12th-century stone inscriptions. In West Java, the term 'Cendol' arose from the mouthfeel of the rice jelly droplets slipping through bamboo straws, prompting the Sundanese word 'jendol' (bump/bulge) which evolved into 'cendol'.",
    ingredients: [
      { name_id: "Tepung Beras & Sagu", name_en: "Rice & Sago Flour" },
      { name_id: "Daun Suji & Pandan", name_en: "Suji & Pandan Leaves" },
      { name_id: "Air Kapur Sirih", name_en: "Limestone Water" },
      { name_id: "Santan Kelapa", name_en: "Coconut Milk" },
      { name_id: "Gula Aren Cair", name_en: "Liquid Palm Sugar" },
      { name_id: "Es Batu Kepruk", name_en: "Crushed Ice" }
    ],
    preparation: [
      {
        step: 1,
        title_id: "Ekstraksi Warna Alami",
        title_en: "Leaf Pressing",
        desc_id: "Memeras daun suji dan pandan wangi segar untuk menghasilkan ekstrak warna hijau zamrud alami pembawa aroma harum.",
        desc_en: "Squeeze fresh suji and aromatic pandan leaves to extract a natural emerald-green juice carrying a rich fragrance."
      },
      {
        step: 2,
        title_id: "Pemasakan Bubur",
        title_en: "Jelly Cooking",
        desc_id: "Memasak tepung beras, tepung sagu, dan air kapur sirih dalam air ekstrak pandan hingga mengental liat.",
        desc_en: "Cook rice flour, sago flour, and lime water in the pandan extract until it forms a thick, sticky gelatinous paste."
      },
      {
        step: 3,
        title_id: "Pencetakan Cendol",
        title_en: "Droplet Pressing",
        desc_id: "Menekan adonan bubur panas melewati saringan cetakan khusus langsung ke baskom air es agar memadat membulat lonjong.",
        desc_en: "Press the hot paste through a perforated tin filter directly into a basin of ice water to solidify it into teardrop jelly shapes."
      },
      {
        step: 4,
        title_id: "Penyusunan Gelas",
        title_en: "Assembly",
        desc_id: "Menyusun saus gula aren pekat di dasar gelas, memasukkan cendol hijau, menyiram santan gurih, dan menambahkan es serut.",
        desc_en: "Pour thick palm sugar syrup at the glass bottom, add green jellies, splash savory coconut milk, and top with crushed ice."
      }
    ],
    culturalMeaning: [
      {
        title_id: "Kesejukan Jiwa",
        title_en: "Cooling of the Soul",
        desc_id: "Es cendol melambangkan kesejukan dan penyegaran jiwa di tengah terik khatulistiwa nusantara.",
        desc_en: "Es cendol symbolizes cooling relief and refreshment of the soul amid the hot tropical heat of the archipelago."
      },
      {
        title_id: "Kelimpahan Bumi",
        title_en: "Earthly Abundance",
        desc_id: "Penggabungan santan, beras, pandan, dan aren melambangkan kelimpahan hasil bumi agraris tanah Sunda.",
        desc_en: "The combination of coconut milk, rice, pandan, and sugar cane represents the abundance of agricultural yields in the Sundanese soil."
      }
    ],
    recognition: {
      title_id: "Karya Budaya Takbenda Jawa Barat",
      title_en: "Intangible Cultural Asset of West Java"
    },
    flavorProfile: {
      spiciness: 0,
      sweetness: 3,
      savory: 2,
      richness: 2,
      texture: 3
    },
    gallery: [
      "/assets/images/culinarys/cendol.jfif"
    ],
    relatedItems: ["klepon", "es-pisang-ijo"]
  },
  {
    id: "es-pisang-ijo",
    category: "beverages",
    title_id: "Es Pisang Ijo",
    title_en: "Green Banana Ice",
    province_id: "Sulawesi Selatan",
    province_en: "South Sulawesi",
    description_id: "Minuman khas Makassar berupa pisang raja matang dibungkus adonan dadar ketan hijau pandan, disajikan di atas bubur sumsum santan gurih dengan siraman es serut, sirup merah DHT coco pandan, dan susu kental manis.",
    description_en: "A Makassar cold specialty featuring ripe banana wrapped in green pandan crepes, served over savory white rice flour porridge with shaved ice, red DHT syrup, and condensed milk.",
    history_id: "Es Pisang Ijo lahir di pesisir Makassar sejak era Kerajaan Gowa-Tallo. Warna hijau adonan kulit luar merupakan lambang kemuliaan budaya suku Bugis-Makassar, serta penanda keramahan tuan rumah yang menyambut kerabat jauh.",
    history_en: "Es Pisang Ijo originated along the coasts of Makassar during the Gowa-Tallo Kingdom. The green outer crepe wrap represents prestige in Bugis-Makassar custom and serves as a host's greeting of hospitality for visiting relatives.",
    ingredients: [
      { name_id: "Pisang Raja Matang", name_en: "Ripe Plantain/Raja Banana" },
      { name_id: "Tepung Beras (Bubur)", name_en: "Rice Flour (Porridge)" },
      { name_id: "Tepung Terigu (Kulit)", name_en: "Wheat Flour (Crepe)" },
      { name_id: "Daun Pandan Saji", name_en: "Pandan Juice" },
      { name_id: "Sirup Merah DHT", name_en: "Red DHT Coco-Pandan Syrup" },
      { name_id: "Susu Kental Manis", name_en: "Condensed Milk" }
    ],
    preparation: [
      {
        step: 1,
        title_id: "Pengukusan Pisang",
        title_en: "Banana Steaming",
        desc_id: "Mengukus pisang raja beserta kulitnya hingga matang manis merata, kemudian mengupas kulitnya dan merapikan bentuknya.",
        desc_en: "Steam the plantains in their skins until sweet and tender, then peel and set aside."
      },
      {
        step: 2,
        title_id: "Penyelubungan Kulit Hijau",
        title_en: "Green Skin Wrapping",
        desc_id: "Membuat adonan tepung terigu pandan hijau, memipihkannya tipis, lalu membungkus pisang raja kukus hingga tertutup rapat.",
        desc_en: "Prepare the green pandan wheat flour dough, roll thin, and wrap tightly around the steamed banana."
      },
      {
        step: 3,
        title_id: "Pemasakan Bubur Sumsum",
        title_en: "Porridge Boiling",
        desc_id: "Merebus santan encer, tepung beras, garam, dan daun pandan sambil diaduk konstan hingga mengental menjadi bubur putih halus gurih.",
        desc_en: "Simmer coconut milk, rice flour, salt, and pandan leaves, stirring constantly until thick, smooth, and savory."
      },
      {
        step: 4,
        title_id: "Penataan Mangkok",
        title_en: "Serving Bowl Setup",
        desc_id: "Meletakkan bubur sumsum di dasar mangkok, mengiris serong pisang ijo kukus di atasnya, menumpuk es serut, lalu menyiram sirup merah DHT.",
        desc_en: "Ladle white porridge, slice the green banana diagonally on top, cover with shaved ice, and drizzle red DHT syrup."
      }
    ],
    culturalMeaning: [
      {
        title_id: "Kemakmuran (Pisang Raja)",
        title_en: "Prosperity (Pisang Raja)",
        desc_id: "Penggunaan Pisang Raja melambangkan status ningrat dan berkah melimpah yang dinikmati bersama.",
        desc_en: "Using 'Raja' (Royal) bananas represents nobility and sharing abundant blessings with neighbors."
      },
      {
        title_id: "Keramahan Bugis-Makassar",
        title_en: "Bugis-Makassar Hospitality",
        desc_id: "Warna hijau dadar pisang melambangkan kedamaian hidup berdampingan dan kesucian niat silaturahmi.",
        desc_en: "The green wrap symbolizes peaceful coexistence and honest intentions when hosting guests."
      }
    ],
    recognition: {
      title_id: "Karya Kuliner Unggulan Sulawesi Selatan",
      title_en: "Premier Culinary Asset of South Sulawesi"
    },
    flavorProfile: {
      spiciness: 0,
      sweetness: 3,
      savory: 2,
      richness: 2,
      texture: 3
    },
    gallery: [
      "/assets/images/culinarys/pisang ijo.jfif"
    ],
    relatedItems: ["es-cendol", "bir-pletok"]
  },
  {
    id: "bir-pletok",
    category: "beverages",
    title_id: "Bir Pletok",
    title_en: "Bir Pletok",
    province_id: "DKI Jakarta",
    province_en: "Jakarta",
    description_id: "Minuman herbal tradisional suku Betawi berkhasiat hangat tanpa alkohol, terbuat dari rebusan serutan kayu secang merah, jahe merah, serai, cengkih, dan pala.",
    description_en: "A traditional non-alcoholic Betawi herbal beverage made from red sappan wood, red ginger, lemongrass, cloves, and nutmeg.",
    history_id: "Bir Pletok lahir di kalangan masyarakat Betawi pada zaman kolonial Belanda. Terinspirasi dari kebiasaan perwira Belanda meminum bir beralkohol untuk menghangatkan tubuh, warga Betawi menciptakan minuman hangat alternatif halal menggunakan kayu secang pembentuk warna merah anggur.",
    history_en: "Bir Pletok was invented by Betawi locals during the Dutch colonial era. Inspired by Dutch soldiers drinking alcoholic beer to warm up, Betawi natives crafted a non-alcoholic warm drink using red sappan wood to mimic the deep red wine color.",
    ingredients: [
      { name_id: "Kayu Secang (Merah)", name_en: "Sappan Wood (Red Color)" },
      { name_id: "Jahe Emprit/Merah", name_en: "Red Ginger" },
      { name_id: "Pala & Cengkih", name_en: "Nutmeg & Cloves" },
      { name_id: "Serai & Pandan", name_en: "Lemongrass & Pandan" },
      { name_id: "Kapulaga Betawi", name_en: "Cardamom" }
    ],
    preparation: [
      {
        step: 1,
        title_id: "Pememaran Jahe",
        title_en: "Ginger Crushing",
        desc_id: "Membakar jahe merah sebentar lalu mememarnya (digeprek) agar minyak jahe aromatik pedas keluar maksimal.",
        desc_en: "Lightly grill red ginger and crush it to release the aromatic gingerols and heat."
      },
      {
        step: 2,
        title_id: "Rebusan Rempah",
        title_en: "Spice Decoction",
        desc_id: "Merebus jahe geprek, serai wangi, kapulaga, pala pecah, cengkih, dan pandan dalam air mendidih selama 1 jam.",
        desc_en: "Boil crushed ginger, lemongrass, cardamom, cracked nutmeg, cloves, and pandan in boiling water for 1 hour."
      },
      {
        step: 3,
        title_id: "Pewarnaan Secang",
        title_en: "Sappan Wood Coloration",
        desc_id: "Memasukkan serutan kayu secang hingga air rebusan berubah menjadi merah tua keunguan alami.",
        desc_en: "Add sappan wood shavings until the liquid turns into a natural deep wine-red color."
      },
      {
        step: 4,
        title_id: "Pengocokan (Pletok)",
        title_en: "Shaking (Pletok)",
        desc_id: "Mengocok ramuan hangat di dalam tabung bambu dengan es batu hingga mengeluarkan busa putih layaknya bir asli Belanda.",
        desc_en: "Shake the warm brew inside a hollow bamboo tube with ice cubes until white froth forms on top, resembling beer."
      }
    ],
    culturalMeaning: [
      {
        title_id: "Simbol Kemandirian Budaya",
        title_en: "Cultural Resilience",
        desc_id: "Nama 'Bir' yang tanpa alkohol melambangkan kreativitas suku Betawi meniru tradisi kolonial tanpa melanggar hukum agama.",
        desc_en: "The name 'Bir' (Beer) represents Betawi creativity in mimicking colonial habits without compromising religious standards."
      },
      {
        title_id: "Kelegaan (Bunyi Pletok)",
        title_en: "Relief (Pletok Sound)",
        desc_id: "Bunyi 'pletok' saat sumbat bambu dikocok es melambangkan kelegaan batiniah dan ekspresi kebahagiaan pesta adat.",
        desc_en: "The 'pletok' popping sound when bamboo is shaken with ice represents relief and communal joy during celebrations."
      }
    ],
    recognition: {
      title_id: "Warisan Budaya Takbenda Betawi (2014)",
      title_en: "Betawi Intangible Cultural Heritage of Jakarta (2014)"
    },
    flavorProfile: {
      spiciness: 3,
      sweetness: 2,
      savory: 1,
      richness: 2,
      texture: 1
    },
    gallery: [
      "/assets/images/culinarys/birpletok.jfif"
    ],
    relatedItems: ["es-pisang-ijo", "sambal-terasi"]
  },

  // ─── TRADITIONAL CONDIMENTS ───
  {
    id: "sambal-roa",
    category: "traditional-condiments",
    title_id: "Sambal Roa",
    title_en: "Roa Chili Paste",
    province_id: "Sulawesi Utara",
    province_en: "North Sulawesi",
    description_id: "Sambal khas Manado yang terbuat dari campuran cabai merah pedas dengan abon daging ikan roa asap kering yang ditumbuk halus.",
    description_en: "A signature Manado chili condiment made from a mixture of hot red chilies and finely pounded, dry-smoked Roa fish meat.",
    history_id: "Sambal Roa lahir dari budaya bahari suku Minahasa yang memanfaatkan melimpahnya ikan Roa (Hemiramphus) di perairan Sulawesi Utara. Guna mengawetkan ikan hasil tangkapan, nelayan mengasapinya hingga mengering keras, lalu mengolahnya bersama cabai segar menjadi sambal beraroma asap pekat.",
    history_en: "Sambal Roa was born from Minahasan maritime culture, which utilized the abundance of Roa fish (Hemiramphus) in North Sulawesi waters. To preserve the catch, fishermen smoked the fish until hard and dry, then ground it with fresh chilies to make a deeply aromatic, smoky paste.",
    ingredients: [
      { name_id: "Daging Ikan Roa Asap", name_en: "Smoked Roa Fish Meat" },
      { name_id: "Cabai Rawit Merah", name_en: "Red Bird's Eye Chilies" },
      { name_id: "Bawang Merah", name_en: "Shallots" },
      { name_id: "Bawang Putih", name_en: "Garlic" },
      { name_id: "Minyak Kelapa", name_en: "Coconut Oil" },
      { name_id: "Tomat Merah", name_en: "Red Tomato" }
    ],
    preparation: [
      {
        step: 1,
        title_id: "Pembersihan Ikan",
        title_en: "Fish Cleaning",
        desc_id: "Memisahkan kepala, kulit, dan duri dari tubuh ikan roa asap kering untuk mengambil daging ikan murninya.",
        desc_en: "Separate the head, skin, and bones from the dry-smoked roa fish bodies to extract pure smoked fish meat."
      },
      {
        step: 2,
        title_id: "Penumbukan Daging",
        title_en: "Meat Pounding",
        desc_id: "Menumbuk daging ikan roa asap kering dengan lesung kayu hingga menjadi serpihan abon halus beraroma asap.",
        desc_en: "Pound the smoked fish meat with a wooden mortar until it turns into a fine, smoky shredded powder."
      },
      {
        step: 3,
        title_id: "Penulisan Bumbu",
        title_en: "Chili Grinding",
        desc_id: "Mengulek halus cabai rawit pedas merah, bawang merah, bawang putih, dan tomat segar dengan sedikit minyak kelapa.",
        desc_en: "Grind hot red chilies, shallots, garlic, and fresh tomatoes together with a splash of coconut oil."
      },
      {
        step: 4,
        title_id: "Penunisan Sambal",
        title_en: "Stir-Frying",
        desc_id: "Menumis bumbu halus bersama abon ikan roa hingga matang kecokelatan kering dan mengeluarkan minyak aromatik asap.",
        desc_en: "Stir-fry the ground chilies with the powdered smoked roa fish until dry, browned, and releasing a deep smoky oil."
      }
    ],
    culturalMeaning: [
      {
        title_id: "Identitas Bahari (Nelayan)",
        title_en: "Maritime Identity",
        desc_id: "Ikan Roa melambangkan kedaulatan maritim dan hubungan erat suku Minahasa dengan kekayaan laut Sulawesi.",
        desc_en: "Roa fish represents maritime sovereignty and the close relationship of the Minahasa tribe with the Celebes Sea."
      },
      {
        title_id: "Ketangguhan (Pedas Berapi)",
        title_en: "Resilience",
        desc_id: "Tingkat kepedasan yang ekstrem melambangkan sifat berani, berapi-api, dan ketangguhan karakter masyarakat Manado.",
        desc_en: "The extreme spiciness represents the brave, fiery, and resilient character of Manado people."
      }
    ],
    recognition: {
      title_id: "Karya Warisan Kuliner Minahasa",
      title_en: "Minahasa Culinary Heritage Asset"
    },
    flavorProfile: {
      spiciness: 3,
      sweetness: 1,
      savory: 3,
      richness: 2,
      texture: 2
    },
    gallery: [
      "/assets/images/culinarys/sambal roa.jfif"
    ],
    relatedItems: ["rendang", "sambal-matah"]
  },
  {
    id: "sambal-terasi",
    category: "traditional-condiments",
    title_id: "Sambal Terasi",
    title_en: "Terasi Shrimp Paste Sambal",
    province_id: "Jawa Barat",
    province_en: "West Java",
    description_id: "Sambal ulek mentah atau matang berbahan cabai merah, bawang merah, tomat, dan terasi udang fermentasi khas Sunda yang mengeluarkan aroma gurih menyengat.",
    description_en: "A traditional ground chili paste cooked with shallots, tomatoes, and fermented shrimp paste (terasi) giving off a strong savory aroma.",
    history_id: "Sejarah terasi tertulis sejak prasasti Cirebon abad ke-15. Syarif Hidayatullah (Sunan Gunung Jati) menjadikan terasi udang buatan pesisir Cirebon (rebon) sebagai upeti berharga kepada Kerajaan Galuh Pakuan, yang melambangkan kedaulatan dan kearifan pangan lokal pesisir Jawa.",
    history_en: "Terasi has been documented since 15th-century Cirebon records. Sunan Gunung Jati used fermented shrimp paste (rebon) as royal tribute to the Galuh Pakuan Kingdom, representing the high dietary value BET-cultural sovereignty of coastal Java.",
    ingredients: [
      { name_id: "Terasi Udang Cirebon", name_en: "Fermented Shrimp Paste (Terasi)" },
      { name_id: "Cabai Merah Keriting", name_en: "Curly Red Chilies" },
      { name_id: "Cabai Rawit Merah", name_en: "Bird's Eye Chilies" },
      { name_id: "Tomat Merah Ranum", name_en: "Ripe Red Tomato" },
      { name_id: "Bawang Merah Jawa", name_en: "Shallots" }
    ],
    preparation: [
      {
        step: 1,
        title_id: "Pemanggangan Terasi",
        title_en: "Terasi Roasting",
        desc_id: "Membakar terasi udang di atas api arang atau menyangrainya hingga mengembang harum menyengat khas umami fermentasi.",
        desc_en: "Roast or grill the terasi shrimp paste block to activate its deep, pungent fermented umami scent."
      },
      {
        step: 2,
        title_id: "Penggorengan Bahan",
        title_en: "Ingredient Sauté",
        desc_id: "Menggoreng cabai merah, cabai rawit, bawang merah, dan tomat merah hingga layu lunak dengan minyak kelapa.",
        desc_en: "Sauté red chilies, bird's eye chilies, shallots, and tomato in coconut oil until soft."
      },
      {
        step: 3,
        title_id: "Proses Ulek Tradisional",
        title_en: "Stone Grinding",
        desc_id: "Menumbuk halus terasi bakar dan bumbu goreng di dalam cobek batu (lesung) hingga tercampur rata namun bertekstur.",
        desc_en: "Grind the roasted terasi and sautéed ingredients in a stone mortar (cobek) to mix thoroughly while keeping some texture."
      },
      {
        step: 4,
        title_id: "Penyiraman Minyak",
        title_en: "Oil Splash",
        desc_id: "Menyiram sambal ulek dengan sedikit minyak goreng panas bekas sisa tumisan rempah, lalu menyiram perasan jeruk limau.",
        desc_en: "Splash hot cooking oil leftover from the sauté over the ground paste, then squeeze fresh key lime juice."
      }
    ],
    culturalMeaning: [
      {
        title_id: "Akulturasi Agraris-Bahari",
        title_en: "Agrarian-Maritime Blend",
        desc_id: "Terasi (Bahari/Udang) yang diolah dengan Cabai (Agraris/Bumi) melambangkan integrasi hubungan harmoni petani dan nelayan.",
        desc_en: "Terasi (maritime shrimp) combined with chilies (agricultural soil) symbolizes the synthesis of farmers and fishermen."
      },
      {
        title_id: "Kesatuan Rasa (Penyatu Lauk)",
        title_en: "Flavor Harmonizer",
        desc_id: "Masyarakat Sunda memandang sambal terasi sebagai pemersatu segala lauk pauk, pembawa nikmat dalam kesederhanaan.",
        desc_en: "Sundanese view sambal terasi as the ultimate unifying element for all dishes, showing joy in food simplicity."
      }
    ],
    recognition: {
      title_id: "Warisan Cita Rasa Akulturasi Cirebonan",
      title_en: "Culinary Flavor Asset of Cirebon Acculturation"
    },
    flavorProfile: {
      spiciness: 3,
      sweetness: 1,
      savory: 3,
      richness: 2,
      texture: 2
    },
    gallery: [
      "/assets/images/culinarys/sambal terasi.jfif"
    ],
    relatedItems: ["sambal-roa", "bir-pletok"]
  },
  {
    id: "sambal-matah",
    category: "traditional-condiments",
    title_id: "Sambal Matah",
    title_en: "Matah Raw Sambal",
    province_id: "Bali",
    province_en: "Bali",
    description_id: "Sambal iris mentah khas Bali terbuat dari campuran serai, bawang merah, cabai rawit pedas, daun jeruk purut, minyak kelapa tanak, dan terasi bakar.",
    description_en: "A signature Balinese raw sliced condiment made from chopped lemongrass, shallots, bird's eye chilies, kaffir lime leaves, and warm coconut oil.",
    history_id: "Sambal Matah berakar dari ritual sesaji persembahan masyarakat Hindu Bali. Karakter mentahnya ('Matah') merupakan cerminan filosofi Tri Hita Karana, menyajikan bahan-bahan segar langsung dari alam tanpa merusak elemen kesegaran alaminya.",
    history_en: "Sambal Matah originates from the Hindu Balinese ritual offerings. Its raw ('Matah') character represents the Tri Hita Karana philosophy, celebrating fresh ingredients harvested directly from nature without cooking them.",
    ingredients: [
      { name_id: "Bawang Merah Sliced", name_en: "Sliced Shallots" },
      { name_id: "Serai (Irisan Putih)", name_en: "Lemongrass (White tender part)" },
      { name_id: "Daun Jeruk Purut", name_en: "Kaffir Lime Leaves" },
      { name_id: "Terasi Bali Bakar", name_en: "Grilled Balinese Terasi" },
      { name_id: "Minyak Kelapa Kampung", name_en: "Traditional Coconut Oil" }
    ],
    preparation: [
      {
        step: 1,
        title_id: "Pengirisan Halus",
        title_en: "Fine Slicing",
        desc_id: "Mengiris tipis-tipis bawang merah, bagian dalam serai, cabai rawit merah, dan membuang tulang daun jeruk lalu diiris rambut.",
        desc_en: "Finely slice shallots, the tender core of lemongrass, chilies, and shred kaffir lime leaves without their ribs."
      },
      {
        step: 2,
        title_id: "Pencampuran Wadah",
        title_en: "Mixing Bowl",
        desc_id: "Mencampur semua irisan mentah dalam mangkok kaca, menambahkan terasi bakar hancur, garam, dan sedikit air jeruk nipis.",
        desc_en: "Combine the raw slices in a bowl with crumbled roasted terasi, salt, and a splash of lime juice."
      },
      {
        step: 3,
        title_id: "Peremasan Ringan",
        title_en: "Gentle Kneading",
        desc_id: "Meremas-remas adonan dengan tangan secara lembut agar sari rasa bawang dan minyak serai keluar menyatu.",
        desc_en: "Gently press the mixture with clean fingers to release shallot juices and aromatic lemongrass oils."
      },
      {
        step: 4,
        title_id: "Penyiraman Minyak Panas",
        title_en: "Hot Oil Splash",
        desc_id: "Memanaskan minyak kelapa asli kelenteng betina, lalu menyiramkannya panas-panas di atas adonan mentah hingga berdesis aroma.",
        desc_en: "Heat raw homemade coconut oil until hot, then splash directly over the raw mixture to release a fresh scent."
      }
    ],
    culturalMeaning: [
      {
        title_id: "Filosofi Kesegaran Alam",
        title_en: "Natural Purity Philosophy",
        desc_id: "Penyajian mentah melambangkan kesucian, kejujuran niat, dan penghargaan terhadap kesegaran ciptaan Dewata.",
        desc_en: "The raw preparation represents purity, honesty, and deep appreciation for the pristine gifts of the Gods."
      },
      {
        title_id: "Keharmonisan Tekstur",
        title_en: "Texture Harmony",
        desc_id: "Kerenyahan bawang dan serai mentah yang meledak di lidah melambangkan dinamisnya harmoni tari kehidupan Bali.",
        desc_en: "The crisp crunch of raw shallots and lemongrass represents the dynamic rhythm of Balinese life dances."
      }
    ],
    recognition: {
      title_id: "Karya Warisan Kuliner Kebanggaan Krama Bali",
      title_en: "Intangible Cultural Culinary Asset of Balinese Krama"
    },
    flavorProfile: {
      spiciness: 3,
      sweetness: 1,
      savory: 2,
      richness: 2,
      texture: 3
    },
    gallery: [
      "/assets/images/culinarys/sambal matah.jfif"
    ],
    relatedItems: ["sambal-roa", "sambal-terasi"]
  }
];
