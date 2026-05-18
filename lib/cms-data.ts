import type { AboutSection, FAQCategory, FAQItem, HeroSlide, NewsItem, Product, SiteSettings, Testimony } from './cms-types';

export const siteSettings: SiteSettings = {
  siteName: 'Steda Roaster',
  description:
    'Produsen mesin roasting kopi berkualitas untuk kebutuhan home roastery, coffee shop, hingga skala industri.',
  whatsappNumber: '6281225171359',
  whatsappMessage: 'Halo, saya ingin bertanya tentang produk Steda Roaster',
  email: 'info@stedaroaster.com',
  address: 'Indonesia',
  socials: {
    facebook: '#',
    tiktok: '#',
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

export const heroSlides: HeroSlide[] = [
  { id: 'hero-1', src: '/hero-1.jpg', alt: 'Mesin roasting kopi Steda Roaster' },
  { id: 'hero-2', src: '/hero-2.jpg', alt: 'Proses roasting kopi profesional' },
  { id: 'hero-3', src: '/hero-3.jpg', alt: 'Coffee roaster untuk bisnis kopi' },
];

export const products: Product[] = [
  {
    id: 1,
    slug: 'se-200-series',
    name: 'SE 200 Series',
    category: 'Home Roastery',
    tag: 'Compact Roaster',
    description: 'Solusi roaster kapasitas 200 gram untuk kebutuhan home roastery dan sample roasting.',
    image: '/product-1.jpg',
    images: ['/product-1.jpg'],
    technicalParams: {
      capacity: '200 Gram',
      power: '220V / 800W',
      heating: 'Electric Heater',
      control: 'Manual Control',
      material: 'Stainless Steel 304',
    },
    specifications: [
      'Drum rotation adjustable',
      'Real-time temperature display',
      'Compact design for home roastery',
      'Easy operation and maintenance',
    ],
  },
  {
    id: 2,
    slug: 'mre-series',
    name: 'MRE Series',
    category: 'Home Roastery',
    tag: 'Best Seller',
    description: 'Mesin roasting kopi kapasitas 1 kg untuk home roasting dan coffee shop skala kecil.',
    image: '/product-2.jpg',
    images: ['/product-2.jpg'],
    technicalParams: {
      capacity: '1 Kg',
      power: '220V / 2200W',
      heating: 'Gas',
      control: 'Digital PID',
      material: 'Stainless Steel',
    },
    specifications: ['Industrial burner', 'Digital monitoring', 'Cooling tray', 'Cyclone system'],
  },
  {
    id: 3,
    slug: 'sr5-series',
    name: 'SR5 Series',
    category: 'Small Roastery',
    tag: 'Industrial Roastery',
    description: 'Mesin roasting kopi kapasitas 5 kg untuk kebutuhan small roastery yang stabil dan produktif.',
    image: '/product-3.jpg',
    images: ['/product-3.jpg'],
    technicalParams: {
      capacity: '5 Kg',
      power: '380V',
      heating: 'Gas',
      control: 'PLC Control',
      material: 'Mild Steel + Stainless',
    },
    specifications: ['Industrial drum', 'Stable airflow', 'Cooling tray', 'Data logging'],
  },
  {
    id: 4,
    slug: 'srg5-series',
    name: 'SRG5 Series',
    category: 'Medium Roastery',
    tag: 'Industrial Roastery',
    description: 'Mesin roasting kopi kapasitas 20 kg untuk produksi medium roastery dan operasional intensif.',
    image: '/product-4.jpg',
    images: ['/product-4.jpg'],
    technicalParams: {
      capacity: '20 Kg',
      power: '380V',
      heating: 'Gas',
      control: 'Industrial PLC',
      material: 'Stainless Steel',
    },
    specifications: ['High capacity', 'Industrial airflow', 'Cyclone included', 'Heavy-duty cooling tray'],
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
