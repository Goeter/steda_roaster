import type { AboutPageSection, AboutSection, BenefitsSection, DistributionSection, FAQCategory, FAQHomeSection, FAQItem, FAQPageSection, FooterSection, HeroSection, HeroSlide, NewsDetailSection, NewsItem, NewsPageSection, Product, ProductDetailSection, ProductPageSection, ProductSection, SiteMetadata, SiteSettings, TestimoniesSection, Testimony } from './cms-types';


export const siteMetadata: SiteMetadata = {
  metadataBase: 'https://stedaroaster.com',
  defaultTitle: 'Steda Roaster | Mesin Roasting Kopi Berkualitas',
  titleTemplate: '%s | Steda Roaster',
  description:
    'Produsen mesin roasting kopi berkualitas untuk home roastery, coffee shop, dan kebutuhan industri.',
  keywords: ['mesin roasting kopi', 'coffee roaster', 'home roastery', 'roaster machine', 'Steda Roaster'],
  authorName: 'Steda Roaster',
  openGraphTitle: 'Steda Roaster',
  openGraphDescription: 'Mesin roasting kopi berkualitas untuk bisnis kopi Anda.',
  openGraphUrl: 'https://stedaroaster.com',
  openGraphSiteName: 'Steda Roaster',
  openGraphImage: { src: '/hero-1.jpg', width: 1200, height: 630, alt: 'Steda Roaster' },
  locale: 'id_ID',
  type: 'website',
  language: 'id',
  themeColor: '#2b1b12',
};

export const siteSettings: SiteSettings = {
  siteName: 'Steda Roaster',
  description:
    'Produsen mesin roasting kopi berkualitas untuk kebutuhan home roastery, coffee shop, hingga skala industri.',
  whatsappNumber: '6281225171359',
  whatsappMessage: 'Halo, saya ingin bertanya tentang produk Steda Roaster',
  email: 'info@stedaroaster.com',
  address: 'Sidoarjo, Indonesia',
  mapUrl: 'https://maps.app.goo.gl/TwcEPir1WrDrryfAA',
  socials: {
    instagram: 'https://www.instagram.com/coffeeroaster_steda/',
    facebook: 'https://www.facebook.com/share/1AyEXiREzL/?mibextid=wwXIfr',
    tiktok: 'https://www.tiktok.com/@stedaroaster?_r=1&_t=ZS-95Y6Wmj912D',
  },
};


export const aboutSection: AboutSection = {
  videoUrl: 'https://www.youtube.com/embed/IWxF0VOYymI',
  videoTitle: 'Steda Roaster Introduction',
  heading: 'Who We Are',
  description: [
    'Sudah lebih dari 6 tahun, kami terus melakukan inovasi dan bekerja sama dengan para ahli roaster kopi terbaik di industri ini.',
    'Baik usaha besar maupun kecil, kami tahu persis apa yang Anda butuhkan dan mengutamakan keinginan Anda.',
  ],
  ctaLabel: 'View Details',
  ctaHref: '/about',
};


export const aboutPageSection: AboutPageSection = {
  hero: {
    heading: 'About Steda Roaster',
    description: 'Crafting Precision Coffee Roasting Machines for Professionals Around the World.',
    image: { src: '/company-roaster.webp', alt: 'Steda Roaster Company' },
  },
  visionMission: {
    heading: 'Vision & Mission',
    description:
      'Our guiding principles that drive innovation, quality, and excellence in every coffee roasting machine we produce.',
    visionTitle: 'Our Vision',
    visionDescription:
      'Menjadi pemimpin global dalam industri mesin roasting kopi melalui inovasi, kualitas, dan teknologi berstandar internasional.',
    missionTitle: 'Our Mission',
    missionItems: [
      'Menghadirkan mesin roasting berkualitas tinggi.',
      'Mendukung pertumbuhan industri kopi global.',
      'Menyediakan layanan profesional dan terpercaya.',
      'Mengembangkan inovasi berbasis teknologi modern.',
    ],
  },
  cta: {
    heading: 'Discover Our Premium Coffee Roasters',
    description:
      'Explore our range of precision-engineered roasting machines designed to elevate your coffee business to the next level.',
    ctaLabel: 'View Our Products',
    ctaHref: '/products',
  },
};

export const heroSlides: HeroSlide[] = [
  { id: 'hero-1', src: '/hero-1.jpg', alt: 'Mesin roasting kopi Steda Roaster' },
  { id: 'hero-2', src: '/hero-2.jpg', alt: 'Proses roasting kopi profesional' },
  { id: 'hero-3', src: '/hero-3.jpg', alt: 'Coffee roaster untuk bisnis kopi' },
];

export const heroSection: HeroSection = {
  eyebrow: 'Premium Coffee Roasting Machine',
  heading: 'Mesin Roasting Kopi Berkualitas untuk Bisnis Anda',
  description:
    'Produsen mesin roasting kopi untuk kebutuhan skala kecil hingga industri, dirancang presisi untuk mendukung pertumbuhan bisnis kopi Anda.',
  ctaLabel: 'See Products',
  slides: heroSlides,
  slideAriaLabelPrefix: 'Go to slide',
};

export const productSection: ProductSection = {
  eyebrow: 'Our Products',
  heading: 'Explore Our Coffee Machine',
  description:
    'Kami menawarkan berbagai jenis mesin roasting kopi untuk kebutuhan home roastery, coffee shop, sampai produksi profesional.',
  ctaLabel: 'See More Products',
  ctaHref: '/products',
  allowedCategories: ['Home Roastery', 'Industrial Roastery'],
  filters: ['All Products', 'Best Seller', 'Home Roastery', 'Industrial Roastery'],
  emptyMessage: 'Produk tidak ditemukan.',
  consultation: {
    eyebrow: 'Need Consultation?',
    heading: 'Want to buy Steda Roaster products?',
    description:
      'Konsultasikan kapasitas, kebutuhan produksi, dan tipe mesin terbaik untuk bisnis kopi Anda. Tim kami siap membantu memilih produk Steda Roaster yang paling sesuai untuk skala usaha Anda.',
    ctaLabel: 'Contact via WhatsApp',
    note: 'Fast response during business hours',
  },
  previousProductAriaLabel: 'Previous product',
  nextProductAriaLabel: 'Next product',
};


export const productPageSection: ProductPageSection = {
  hero: {
    eyebrow: 'Products',
    heading: 'Our Products',
    description: 'Temukan mesin roasting kopi berkualitas tinggi untuk kebutuhan bisnis Anda.',
    image: { src: '/banner-products.webp', alt: 'Coffee roasting machines' },
  },
  searchPlaceholder: 'Search products...',
  searchAriaLabel: 'Search products',
  detailButtonLabel: 'See Detail',
  bestSellerLabel: 'Best Seller',
  detailAriaLabelPrefix: 'Lihat detail',
  productImageAltPrefix: 'Mesin roasting kopi',
};

export const productDetailSection: ProductDetailSection = {
  notFoundTitle: 'Product Not Found',
  metadataTitleSuffix: 'Steda Roaster',
  technicalParametersHeading: 'Technical Parameters',
  technicalParameterFields: [
    { key: 'capacity', label: 'Kapasitas' },
    { key: 'efficiency', label: 'Efisiensi' },
    { key: 'roastingTime', label: 'Waktu Roasting' },
    { key: 'production', label: 'Produksi' },
  ],
  specificationsHeading: 'Specifications',
  specificationFields: [
    { key: 'type', label: 'Tipe' },
    { key: 'minRoast', label: 'Min. Roast' },
    { key: 'maxRoast', label: 'Maks. Roast' },
    { key: 'ignition', label: 'Pengapian' },
    { key: 'airflow', label: 'Airflow' },
    { key: 'drum', label: 'Drum' },
    { key: 'dimensions', label: 'Dimensi' },
    { key: 'weight', label: 'Berat' },
    { key: 'electricalPower', label: 'Daya Listrik' },
    { key: 'dataLogger', label: 'Data Logger' },
  ],
  similarProductsHeading: 'Other Similar Product',
  noSimilarProductsMessage: 'Belum ada produk lain pada kategori yang sama.',
  viewAllProductsLabel: 'View All Products',
  noImageMessage: 'No product image available',
  previousImageAriaLabel: 'Previous product image',
  nextImageAriaLabel: 'Next product image',
  thumbnailAriaLabelPrefix: 'View product image',
  shareCopiedMessage: 'Link copied',
  backAriaLabel: 'Back to previous page',
  shareAriaLabel: 'Share product',
};

export const benefitsSection: BenefitsSection = {
  image: { src: '/benefits-product.jpg', alt: 'Coffee Machine' },
  heading: 'BENEFITS OF BUYING\nFROM OUR SHOP',
  description: 'Discover the Advantages: Why Choose Us for Your Next Purchase?',
  items: [
    {
      id: 1,
      title: 'Layanan & Dukungan Terbaik',
      description:
        'We only supply coffee machines with the highest European quality standards, ensuring reliable and long-lasting performance.',
    },
    {
      id: 2,
      title: 'Ketahanan Mesin Maksimal',
      description:
        'All purchases are covered by a warranty, giving our customers peace of mind in the face of technical issues.',
    },
    {
      id: 3,
      title: 'Mudah Dalam Penggunaan',
      description:
        'We always update our collection with the latest coffee machine designs that combine aesthetic beauty with extraordinary functionality.',
    },
    {
      id: 4,
      title: 'Garansi 1 Tahun',
      description:
        'We offer free shipping on all our products, providing added value to customers by saving on shipping costs.',
    },
    {
      id: 5,
      title: 'Drum Stainless Food Grade',
      description:
        'We offer free shipping on all our products, providing added value to customers by saving on shipping costs.',
    },
  ],
};

export const distributionSection: DistributionSection = {
  eyebrow: 'Distribution',
  heading: 'Mesin Steda Roaster sudah tersebar diseluruh Nusantara.',
  highlightedWord: 'Steda',
  description:
    'Percayakan kepada kami dalam solusi mesin roasting kopi profesional. Mesin Steda Roaster telah digunakan di berbagai wilayah Indonesia untuk mendukung kebutuhan roasting kopi.',
  ctaLabel: 'Explore Products',
  ctaHref: '/products',
  map: { src: '/gambar_peta.webp', alt: 'Distribution map Steda Roaster' },
  legendTitle: 'Keterangan',
  cities: [
    { name: 'Aceh', color: 'bg-red-500' },
    { name: 'Jabodetabek', color: 'bg-yellow-400' },
    { name: 'Solo', color: 'bg-green-600' },
    { name: 'Surabaya', color: 'bg-blue-900' },
    { name: 'Madura', color: 'bg-rose-600' },
    { name: 'Malang', color: 'bg-lime-500' },
    { name: 'Bondowoso', color: 'bg-purple-600' },
    { name: 'Bali', color: 'bg-orange-500' },
    { name: 'Kalimantan Tengah', color: 'bg-pink-600' },
    { name: 'Kalimantan Timur', color: 'bg-amber-800' },
    { name: 'NTT', color: 'bg-black' },
    { name: 'Jayapura', color: 'bg-neutral-700' },
  ],
};

export const testimoniesSection: TestimoniesSection = {
  eyebrow: 'Testimonies',
  heading: 'What Our Customers Say',
  description:
    'Cerita pelanggan yang menggunakan Steda Roaster untuk mendukung operasional bisnis kopi mereka.',
  previousAriaLabel: 'Previous testimony',
  nextAriaLabel: 'Next testimony',
  itemAriaLabelPrefix: 'View testimony from',
};

export const footerSection: FooterSection = {
  description: 'Precision Coffee Roasting Machine for Modern Businesses.',
  copyright: 'All rights reserved.',
  navigationTitle: 'Navigation',
  contactTitle: 'Contact Us',
  socialTitle: 'Follow Us',
};

export const products: Product[] = [
  {
    id: 1,
    slug: 'se-200-series',
    name: 'SE 200 Series',
    category: 'Home Roastery',
    tag: 'Compact Roaster',
    description: 'Solusi roaster kapasitas 200 gram untuk kebutuhan home roastery dan sample roasting.',
    detailDescription: [
      'SE 200 Series dirancang untuk home roaster, quality control, dan kebutuhan sample roasting yang membutuhkan kendali praktis dalam ukuran yang ringkas. Desainnya modern, kokoh, dan mudah ditempatkan di ruang kerja terbatas tanpa mengurangi kenyamanan operator selama proses roasting.',
      'Sistem kontrol yang sederhana memberikan akses langsung untuk memantau suhu dan mengatur proses secara bertahap. Karakter ini membantu pengguna mempelajari perubahan biji kopi selama roasting sekaligus membangun profil yang lebih konsisten dari satu batch ke batch berikutnya.',
      'Dengan kapasitas maksimal 200 gram per batch, SE 200 Series sesuai untuk eksplorasi profil, pengujian green bean, pelatihan dasar roasting, maupun produksi sampel. Pemanas elektrik membuat proses persiapan lebih praktis dan cocok digunakan pada lingkungan kerja yang memerlukan pengoperasian efisien.',
      'Area kontak biji menggunakan material stainless steel food grade untuk membantu menjaga kebersihan dan ketahanan mesin. Konstruksi yang mudah dirawat juga mempermudah pembersihan rutin sehingga performa mesin tetap terjaga untuk penggunaan harian.',
      'SE 200 Series merupakan pilihan tepat bagi pengguna yang ingin memulai perjalanan roasting kopi dengan mesin ringkas, kontrol yang mudah dipahami, dan hasil yang dapat dipantau secara presisi.',
    ],
    image: '/product-1.jpg',
    images: ['/product-1.jpg', '/product-1-alt-1.webp', '/product-1-alt-2.webp'],
    technicalParams: {
      capacity: '200 Gram / batch',
      efficiency: 'Electric heater 800W',
      roastingTime: 'Menyesuaikan profil roasting',
      production: 'Home & sample roasting',
    },
    specifications: {
      type: 'SE 200 Series',
      minRoast: '50 Gram',
      maxRoast: '200 Gram',
      ignition: 'Electric Heater',
      airflow: 'Adjustable',
      drum: 'Stainless Steel 304',
      dimensions: 'Hubungi tim Steda',
      weight: 'Hubungi tim Steda',
      electricalPower: '220V / 800W',
      dataLogger: 'Tidak tersedia',
    },
  },
  {
    id: 2,
    slug: 'mre-series',
    name: 'MRE Series',
    category: 'Home Roastery',
    tag: 'Best Seller',
    description: 'Mesin roasting kopi kapasitas 1 kg untuk home roasting dan coffee shop skala kecil.',
    detailDescription: [
      'MRE Series dirancang khusus untuk kebutuhan home roastery, kedai kopi spesial, dan usaha roasting skala kecil yang membutuhkan performa stabil dalam bentuk mesin yang ringkas. Desain modern yang dipadukan dengan konstruksi kokoh memberikan tampilan profesional sekaligus mendukung aktivitas produksi harian.',
      'Panel kontrol digital memberikan akses kepada operator untuk memantau suhu dan mengatur proses roasting dengan lebih terarah. Sistem ini membantu pengguna melakukan penyesuaian profil secara presisi sehingga karakter rasa yang diinginkan dapat dicapai secara lebih konsisten pada setiap batch.',
      'Dengan kapasitas maksimal 1 kilogram per batch, MRE Series memberikan keseimbangan antara fleksibilitas dan produktivitas. Mesin ini cocok digunakan untuk kebutuhan coffee shop, micro roastery, pengembangan profil kopi, maupun produksi rutin dalam volume kecil hingga menengah.',
      'Komponen yang bersentuhan dengan biji kopi menggunakan material yang kuat dan mudah dirawat. Sistem airflow yang dapat disesuaikan, cooling tray terintegrasi, serta konstruksi yang stabil membantu proses roasting dan pendinginan berlangsung lebih efektif.',
      'MRE Series menjadi partner yang tepat bagi pelaku usaha yang ingin meningkatkan kualitas roasting melalui kontrol yang lebih baik, performa andal, dan desain yang mudah diintegrasikan ke dalam ruang produksi.',
    ],
    image: '/product-2.jpg',
    images: ['/product-2.jpg', '/product-2-alt-1.webp', '/product-2-alt-2.webp'],
    technicalParams: {
      capacity: '1 Kg / batch',
      efficiency: 'Digital PID control',
      roastingTime: 'Menyesuaikan profil roasting',
      production: 'Coffee shop skala kecil',
    },
    specifications: {
      type: 'MRE Series',
      minRoast: '250 Gram',
      maxRoast: '1 Kg',
      ignition: 'Gas',
      airflow: 'Adjustable',
      drum: 'Stainless Steel',
      dimensions: 'Hubungi tim Steda',
      weight: 'Hubungi tim Steda',
      electricalPower: '220V / 2200W',
      dataLogger: 'Digital Monitoring',
    },
  },
  {
    id: 3,
    slug: 'sr5-series',
    name: 'SR5 Series',
    category: 'Small Roastery',
    tag: 'Industrial Roastery',
    description: 'Mesin roasting kopi kapasitas 5 kg untuk kebutuhan small roastery yang stabil dan produktif.',
    detailDescription: [
      'SR5 Series dirancang untuk memenuhi kebutuhan small roastery dan usaha kopi yang mulai meningkatkan kapasitas produksinya. Dengan desain industrial yang modern namun tetap kokoh, mesin ini memberikan kendali presisi dalam setiap proses roasting untuk membantu menghasilkan kualitas profesional di setiap batch.',
      'Panel kontrol terpisah memberikan akses penuh kepada operator untuk mengatur parameter penting seperti suhu, airflow, dan durasi roasting. Dukungan sistem PLC serta data logging memungkinkan proses pemantauan dan evaluasi profil dilakukan secara lebih terstruktur dan real-time.',
      'Dengan kapasitas maksimal 5 kilogram biji kopi per batch, SR5 Series sesuai untuk roastery skala kecil hingga menengah, kedai kopi spesial, dan bisnis yang membutuhkan konsistensi dalam volume produksi yang lebih tinggi. Performa mesin dapat disesuaikan dengan profil dan ritme produksi masing-masing pengguna.',
      'Konstruksi drum dan komponen pendukung dirancang untuk menjaga retensi panas serta distribusi udara yang stabil. Cooling tray terintegrasi membantu proses pendinginan berlangsung lebih cepat, sehingga karakter kopi dapat dipertahankan setelah proses roasting selesai.',
      'SR5 Series adalah pilihan tepat untuk roastery yang membutuhkan kontrol penuh, hasil presisi, kapasitas produktif, dan performa andal untuk mendukung pertumbuhan usaha dalam jangka panjang.',
    ],
    image: '/product-3.jpg',
    images: ['/product-3.jpg', '/product-3-alt-1.webp', '/product-3-alt-2.webp'],
    technicalParams: {
      capacity: '5 Kg / batch',
      efficiency: 'PLC control & stable airflow',
      roastingTime: 'Menyesuaikan profil roasting',
      production: 'Small roastery',
    },
    specifications: {
      type: 'SR5 Series',
      minRoast: '1 Kg',
      maxRoast: '5 Kg',
      ignition: 'Gas',
      airflow: 'Adjustable Industrial Airflow',
      drum: 'Mild Steel + Stainless',
      dimensions: 'Hubungi tim Steda',
      weight: 'Hubungi tim Steda',
      electricalPower: '380V',
      dataLogger: 'Tersedia',
    },
  },
  {
    id: 4,
    slug: 'srg5-series',
    name: 'SRG5 Series',
    category: 'Medium Roastery',
    tag: 'Industrial Roastery',
    description: 'Mesin roasting kopi kapasitas 20 kg untuk produksi medium roastery dan operasional intensif.',
    detailDescription: [
      'SRG5 Series dikembangkan untuk medium roastery dan fasilitas produksi yang membutuhkan kapasitas besar, kestabilan proses, serta ketahanan mesin dalam operasional intensif. Desain industrialnya memadukan konstruksi kokoh dengan sistem kontrol modern untuk mendukung kebutuhan produksi profesional.',
      'Industrial PLC memberikan operator akses terhadap pengaturan suhu, airflow, waktu, dan tahapan roasting secara lebih presisi. Sistem kontrol tersebut membantu menjaga konsistensi profil, mempermudah pengulangan hasil, dan mendukung pencatatan proses untuk kebutuhan quality control.',
      'Dengan kapasitas maksimal 20 kilogram per batch, SRG5 Series cocok untuk roastery yang menangani volume produksi menengah dan membutuhkan ritme kerja yang efisien. Cooling tray berukuran besar membantu mempercepat pendinginan, sedangkan sistem cyclone mendukung area produksi yang lebih bersih.',
      'Material stainless steel dan rangka heavy-duty dirancang untuk menghadapi penggunaan berulang dalam jadwal produksi yang padat. Manajemen airflow serta retensi panas yang stabil membantu distribusi energi berlangsung merata agar kualitas roasting tetap konsisten dari batch ke batch.',
      'SRG5 Series merupakan investasi produksi bagi bisnis kopi yang ingin meningkatkan kapasitas tanpa mengorbankan kontrol, konsistensi, dan keandalan mesin dalam penggunaan jangka panjang.',
    ],
    image: '/product-4.jpg',
    images: ['/product-4.jpg', '/product-4-alt-1.webp', '/product-4-alt-2.webp'],
    technicalParams: {
      capacity: '20 Kg / batch',
      efficiency: 'Industrial PLC control',
      roastingTime: 'Menyesuaikan profil roasting',
      production: 'Medium roastery',
    },
    specifications: {
      type: 'SRG5 Series',
      minRoast: '5 Kg',
      maxRoast: '20 Kg',
      ignition: 'Gas',
      airflow: 'Industrial Airflow',
      drum: 'Stainless Steel',
      dimensions: 'Hubungi tim Steda',
      weight: 'Hubungi tim Steda',
      electricalPower: '380V',
      dataLogger: 'Industrial PLC',
    },
  },
];

export const testimonies: Testimony[] = [
  {
    id: 1,
    name: 'Santi Minato',
    position: 'Marketing Director',
    text: 'Mesin Steda Roaster membantu proses produksi kami menjadi lebih stabil. Hasil roasting lebih konsisten dan tim support sangat responsif.',
  },
  {
    id: 2,
    name: 'Heru Jaya',
    position: 'Coffee Shop Owner',
    text: 'Build quality mesin terasa solid, mudah digunakan, dan cocok untuk kebutuhan coffee shop kami yang terus berkembang.',
  },
  {
    id: 3,
    name: 'Dewi Lestari',
    position: 'Roastery Manager',
    text: 'Kapasitas dan kontrol mesinnya membantu kami menjaga kualitas batch dengan lebih presisi dari awal sampai akhir.',
  },
];


export const faqHomeSection: FAQHomeSection = {
  heading: 'Frequently Asked Questions',
  description: 'Temukan jawaban untuk pertanyaan umum tentang produk dan layanan Steda Roaster.',
  ctaLabel: 'See Details FAQs',
  ctaHref: '/faqs',
  previewLimit: 4,
};

export const faqPageSection: FAQPageSection = {
  heading: 'Frequently Asked Questions',
  description: 'Temukan jawaban lengkap mengenai produk dan layanan Steda Roaster.',
  contactText: 'Ingin bertanya lebih lanjut?',
  contactCtaLabel: 'Hubungi Kami',
  backLabel: '← Back to Home',
  backHref: '/',
};

export const faqCategories: FAQCategory[] = [
  {
    title: 'About Steda Machine Roaster',
    icon: 'coffee',
    faqs: [
      {
        id: 1,
        question: 'Apa itu mesin roasting kopi Steda?',
        answer:
          'Mesin roasting kopi Steda adalah peralatan premium yang dirancang untuk memanggang biji kopi mentah dengan presisi tinggi guna menghasilkan aroma dan cita rasa terbaik.',
      },
      {
        id: 2,
        question: 'Siapa yang cocok menggunakan mesin Steda?',
        answer:
          'Mesin ini cocok untuk home roaster, kafe, roastery profesional, hingga industri kopi skala menengah dan besar.',
      },
      {
        id: 3,
        question: 'Apa keunggulan utama mesin roasting Steda?',
        answer:
          'Keunggulan utamanya meliputi kontrol suhu presisi, desain modern, efisiensi energi, serta daya tahan tinggi.',
      },
    ],
  },
  {
    title: 'Features and Specifications',
    icon: 'settings',
    faqs: [
      {
        id: 4,
        question: 'Berapa kapasitas mesin roasting Steda?',
        answer:
          'Kapasitas mesin tersedia mulai dari 200 gram hingga 20 kilogram untuk memenuhi kebutuhan skala kecil hingga industri.',
      },
      {
        id: 5,
        question: 'Apakah mesin dilengkapi dengan kontrol digital?',
        answer:
          'Ya, mesin Steda dilengkapi dengan sistem kontrol digital untuk memastikan konsistensi dan akurasi dalam proses roasting.',
      },
      {
        id: 6,
        question: 'Apa sumber energi yang digunakan?',
        answer:
          'Mesin roasting Steda menggunakan gas LPG atau natural gas yang efisien dan ramah lingkungan.',
      },
      {
        id: 7,
        question: 'Apakah tersedia garansi?',
        answer:
          'Semua produk Steda Roaster dilengkapi dengan garansi resmi selama 1 tahun serta dukungan teknis profesional.',
      },
    ],
  },
  {
    title: 'How to Use the Machine',
    icon: 'bookOpen',
    faqs: [
      {
        id: 8,
        question: 'Bagaimana cara mengoperasikan mesin roasting Steda?',
        answer:
          'Nyalakan mesin, atur suhu dan waktu roasting, masukkan biji kopi, lalu pantau proses hingga mencapai tingkat kematangan yang diinginkan.',
      },
      {
        id: 9,
        question: 'Apakah tersedia pelatihan penggunaan mesin?',
        answer:
          'Ya, Steda Roaster menyediakan pelatihan penggunaan mesin bagi pelanggan untuk memastikan pengoperasian yang optimal.',
      },
      {
        id: 10,
        question: 'Bagaimana cara merawat mesin roasting?',
        answer:
          'Lakukan pembersihan rutin pada drum dan chaff collector serta lakukan perawatan berkala untuk menjaga performa mesin.',
      },
      {
        id: 11,
        question: 'Bagaimana cara menghubungi layanan pelanggan?',
        answer:
          'Anda dapat menghubungi tim Steda Roaster melalui WhatsApp atau email resmi untuk dukungan teknis dan konsultasi.',
      },
    ],
  },
];

export const faqs: FAQItem[] = faqCategories.flatMap((category) => category.faqs);


export const newsPageSection: NewsPageSection = {
  eyebrow: 'News',
  heading: 'Latest News',
  description: 'Temukan berita terbaru, edukasi, dan informasi menarik seputar kopi dan dunia roasting.',
  defaultCategory: 'All News',
  searchPlaceholder: 'Search news...',
  emptyMessage: 'Tidak ada berita yang ditemukan.',
  readMoreLabel: 'Read More →',
};

export const newsDetailSection: NewsDetailSection = {
  notFoundTitle: 'News Not Found',
  backLabel: '← Back to News',
  backHref: '/news',
  relatedHeading: 'Latest News',
  relatedDescription: 'Latest updates and stories from Steda Roaster.',
  viewAllLabel: 'Show More News',
  readMoreLabel: 'Read more',
  relatedLimit: 3,
  previousImageAriaLabel: 'Previous image',
  nextImageAriaLabel: 'Next image',
  openImageAriaLabelPrefix: 'Open image',
};

export const newsCategories = ['All News', 'Education', 'Coffee', 'Roaster Machine', 'Our Partner'];

export const news: NewsItem[] = [
  {
    id: 1,
    slug: 'grand-opening-surabaya',
    title: 'Grand Opening Cabang Baru di Surabaya',
    excerpt: 'Steda Roaster memperluas jangkauan layanan untuk mendukung pelaku bisnis kopi di Jawa Timur.',
    category: 'Our Partner',
    publishedAt: '2026-05-01',
    author: 'Steda Roaster Team',
    images: [
      { src: 'https://images.unsplash.com/photo-1556742526-795a8eac090e?auto=format&fit=crop&w=1200&q=80', alt: 'Grand opening coffee shop' },
      { src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80', alt: 'Coffee bar interior' },
    ],
    content: [
      'Pembukaan cabang baru di Surabaya menjadi langkah penting untuk memperkuat dukungan Steda Roaster kepada pelaku industri kopi lokal.',
      'Melalui cabang ini, pelanggan dapat berkonsultasi lebih mudah mengenai pilihan mesin, kapasitas produksi, dan kebutuhan operasional roastery.',
      'Kami berharap kehadiran cabang baru ini dapat membantu semakin banyak bisnis kopi menghasilkan kualitas roasting yang konsisten.',
    ],
  },
  {
    id: 2,
    slug: 'panduan-memilih-biji-kopi',
    title: 'Panduan Memilih Biji Kopi Berkualitas',
    excerpt: 'Kenali faktor penting dalam memilih green beans sebelum masuk ke proses roasting.',
    category: 'Education',
    publishedAt: '2026-04-20',
    author: 'Steda Roaster Team',
    images: [
      { src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80', alt: 'Biji kopi berkualitas' },
      { src: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80', alt: 'Coffee beans close up' },
    ],
    content: [
      'Pemilihan green beans menjadi fondasi utama untuk menghasilkan kopi dengan karakter rasa yang baik.',
      'Perhatikan asal biji, proses pascapanen, kadar air, ukuran screen, dan konsistensi fisik sebelum menentukan profil roasting.',
      'Dengan bahan baku yang baik dan mesin yang stabil, proses roasting dapat menghasilkan cita rasa yang lebih terukur.',
    ],
  },
  {
    id: 3,
    slug: 'proses-roasting-kopi',
    title: 'Mengenal Proses Roasting Kopi Premium',
    excerpt: 'Memahami tahapan roasting membantu roaster menjaga konsistensi aroma dan rasa kopi.',
    category: 'Roaster Machine',
    publishedAt: '2026-04-10',
    author: 'Steda Roaster Team',
    images: [
      { src: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80', alt: 'Proses roasting kopi' },
      { src: 'https://images.unsplash.com/photo-1459755486867-b55449bb39ff?auto=format&fit=crop&w=1200&q=80', alt: 'Coffee brewing and roasting' },
    ],
    content: [
      'Proses roasting mengubah green beans menjadi roasted beans melalui pengaturan panas, airflow, dan waktu yang presisi.',
      'Setiap tahap, mulai dari drying, browning, first crack, hingga development, memengaruhi aroma, acidity, sweetness, dan body kopi.',
      'Mesin roasting yang stabil membantu roaster mengulang profil terbaik untuk menjaga kualitas setiap batch.',
    ],
  },
];
