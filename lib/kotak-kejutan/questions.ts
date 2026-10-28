import { Question, QuestionDifficulty, QuestionTopic } from './types';

/**
 * Konfigurasi terpusat durasi batas waktu menjawab soal
 * berdasarkan materi dan tingkat kesulitan:
 * - Unsur-unsur lingkaran: Mudah (30s), Sedang (60s), Sulit (90s)
 * - Kedudukan titik: Mudah (30s), Sedang (60s), Sulit (90s)
 * - Kedudukan garis: Mudah (80s), Sedang (120s), Sulit (150s)
 */
export function getQuestionTimeLimit(topic: QuestionTopic, difficulty: QuestionDifficulty): number {
  if (topic === 'kedudukan-garis') {
    if (difficulty === 'mudah') return 80;
    if (difficulty === 'sedang') return 120;
    if (difficulty === 'sulit') return 150;
  }
  if (difficulty === 'mudah') return 30;
  if (difficulty === 'sedang') return 60;
  return 90; // sulit
}

export const QUESTION_BANK: Question[] = [
  // =========================================================================
  // MATERI 1: UNSUR-UNSUR LINGKARAN (8 SOAL: 3 MUDAH, 3 SEDANG, 2 SULIT)
  // =========================================================================
  {
    id: 'Q-UNS-01',
    topic: 'unsur-unsur-lingkaran',
    topicLabel: 'Unsur-unsur Lingkaran',
    difficulty: 'mudah',
    type: 'pilihan-ganda',
    isContextual: false,
    question:
      'Ruas garis lurus yang menghubungkan dua titik pada keliling lingkaran dan melalui titik pusat lingkaran disebut...',
    options: [
      { id: 'A', text: 'Tali Busur' },
      { id: 'B', text: 'Jari-jari' },
      { id: 'C', text: 'Diameter' },
      { id: 'D', text: 'Apotema' },
    ],
    correctAnswer: 'C',
    explanation:
      'Diameter adalah ruas garis lurus yang menghubungkan dua titik pada keliling lingkaran dan wajib melalui titik pusat (d = 2r).',
    timeLimit: 30,
  },
  {
    id: 'Q-UNS-02',
    topic: 'unsur-unsur-lingkaran',
    topicLabel: 'Unsur-unsur Lingkaran',
    difficulty: 'mudah',
    type: 'isian-angka',
    isContextual: true,
    question:
      'Sebuah bianglala raksasa di pasar malam memiliki diameter 28 meter. Berapakah panjang jari-jari bianglala tersebut dalam satuan meter?',
    correctAnswer: '14',
    explanation:
      'Jari-jari (r) adalah setengah dari diameter (d), sehingga r = 28 / 2 = 14 meter.',
    timeLimit: 30,
  },
  {
    id: 'Q-UNS-03',
    topic: 'unsur-unsur-lingkaran',
    topicLabel: 'Unsur-unsur Lingkaran',
    difficulty: 'mudah',
    type: 'pilihan-ganda',
    isContextual: false,
    question:
      'Daerah di dalam lingkaran yang dibatasi oleh dua buah jari-jari dan satu busur lingkaran disebut...',
    options: [
      { id: 'A', text: 'Juring' },
      { id: 'B', text: 'Tembereng' },
      { id: 'C', text: 'Apotema' },
      { id: 'D', text: 'Busur Mayor' },
    ],
    correctAnswer: 'A',
    explanation:
      'Juring adalah daerah di dalam lingkaran yang dibatasi oleh dua jari-jari dan sebuah busur yang diapit oleh kedua jari-jari tersebut (menyerupai potongan pizza).',
    timeLimit: 30,
  },
  {
    id: 'Q-UNS-04',
    topic: 'unsur-unsur-lingkaran',
    topicLabel: 'Unsur-unsur Lingkaran',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    isContextual: true,
    question:
      'Sebuah pizza berbentuk lingkaran dipotong menjadi 6 potongan juring yang sama besar melalui titik pusatnya. Berapakah besar sudut pusat dari masing-masing potongan pizza tersebut?',
    options: [
      { id: 'A', text: '45°' },
      { id: 'B', text: '60°' },
      { id: 'C', text: '72°' },
      { id: 'D', text: '90°' },
    ],
    correctAnswer: 'B',
    explanation:
      'Satu putaran lingkaran penuh memiliki sudut 360°. Jika dibagi 6 juring sama besar, sudut pusat tiap juring = 360° / 6 = 60°.',
    timeLimit: 60,
  },
  {
    id: 'Q-UNS-05',
    topic: 'unsur-unsur-lingkaran',
    topicLabel: 'Unsur-unsur Lingkaran',
    difficulty: 'sedang',
    type: 'isian-angka',
    isContextual: false,
    question:
      'Sebuah lingkaran berjari-jari 10 cm memiliki tali busur dengan panjang 12 cm. Berapakah panjang garis apotema dari pusat lingkaran ke tali busur tersebut (dalam cm)?',
    correctAnswer: '8',
    explanation:
      'Apotema tegak lurus membagi tali busur sama panjang (12 / 2 = 6 cm). Dengan teorema Pythagoras: apotema = √(10² - 6²) = √(100 - 36) = √64 = 8 cm.',
    timeLimit: 60,
  },
  {
    id: 'Q-UNS-06',
    topic: 'unsur-unsur-lingkaran',
    topicLabel: 'Unsur-unsur Lingkaran',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    isContextual: true,
    question:
      'Sebuah jam dinding bundar menunjukkan pukul 04.00 tepat. Berapakah besar sudut pusat terkecil yang dibentuk oleh jarum pendek dan jarum panjang jam tersebut?',
    options: [
      { id: 'A', text: '90°' },
      { id: 'B', text: '100°' },
      { id: 'C', text: '120°' },
      { id: 'D', text: '150°' },
    ],
    correctAnswer: 'C',
    explanation:
      'Setiap 1 jam (angka pada jam) mewakili 360° / 12 = 30°. Pada pukul 04.00 jarum jam menunjuk angka 4 dan jarum menit menunjuk 12 (selisih 4 strip angka), maka sudut = 4 × 30° = 120°.',
    timeLimit: 60,
  },
  {
    id: 'Q-UNS-07',
    topic: 'unsur-unsur-lingkaran',
    topicLabel: 'Unsur-unsur Lingkaran',
    difficulty: 'sulit',
    type: 'isian-angka',
    isContextual: true,
    question:
      'Sebuah taman bunga berbentuk lingkaran memiliki jari-jari 21 meter. Pada taman terdapat area khusus juring mawar dengan sudut pusat 60°. Berapakah luas juring bunga mawar tersebut dalam m²? (Gunakan π = 22/7)',
    correctAnswer: '231',
    explanation:
      'Luas juring = (α / 360°) × π × r² = (60° / 360°) × (22/7) × 21 × 21 = (1/6) × 22 × 3 × 21 = 231 m².',
    timeLimit: 90,
  },
  {
    id: 'Q-UNS-08',
    topic: 'unsur-unsur-lingkaran',
    topicLabel: 'Unsur-unsur Lingkaran',
    difficulty: 'sulit',
    type: 'pilihan-ganda',
    isContextual: false,
    question:
      'Manakah pernyataan berikut ini yang paling TEPAT mengenai hubungan unsur-unsur pada suatu lingkaran?',
    options: [
      { id: 'A', text: 'Apotema selalu lebih panjang daripada jari-jari lingkaran' },
      { id: 'B', text: 'Tali busur terpanjang pada suatu lingkaran adalah diameternya' },
      { id: 'C', text: 'Apotema menghubungkan dua titik sembarang pada keliling lingkaran' },
      { id: 'D', text: 'Tembereng dibatasi oleh dua jari-jari dan satu busur' },
    ],
    correctAnswer: 'B',
    explanation:
      'Diameter adalah tali busur yang melalui titik pusat dan merupakan tali busur terpanjang pada lingkaran. Tembereng dibatasi oleh tali busur dan busur.',
    timeLimit: 90,
  },

  // =========================================================================
  // MATERI 2: KEDUDUKAN TITIK TERHADAP LINGKARAN (16 SOAL: 6 MUDAH, 6 SEDANG, 4 SULIT)
  // =========================================================================
  {
    id: 'Q-TIT-01',
    topic: 'kedudukan-titik',
    topicLabel: 'Kedudukan Titik',
    difficulty: 'mudah',
    type: 'pilihan-ganda',
    isContextual: false,
    question:
      'Tentukan kedudukan titik P(2, 3) terhadap lingkaran x² + y² = 25!',
    options: [
      { id: 'A', text: 'Di dalam lingkaran' },
      { id: 'B', text: 'Tepat pada lingkaran' },
      { id: 'C', text: 'Di luar lingkaran' },
      { id: 'D', text: 'Di titik pusat lingkaran' },
    ],
    correctAnswer: 'A',
    explanation:
      'Substitusi P(2, 3) ke ruas kiri: 2² + 3² = 4 + 9 = 13. Karena 13 < 25 (r²), maka titik P berada di dalam lingkaran.',
    timeLimit: 30,
  },
  {
    id: 'Q-TIT-02',
    topic: 'kedudukan-titik',
    topicLabel: 'Kedudukan Titik',
    difficulty: 'mudah',
    type: 'pilihan-ganda',
    isContextual: false,
    question:
      'Kedudukan titik Q(3, 4) terhadap lingkaran x² + y² = 25 adalah...',
    options: [
      { id: 'A', text: 'Di dalam lingkaran' },
      { id: 'B', text: 'Tepat pada lingkaran' },
      { id: 'C', text: 'Di luar lingkaran' },
      { id: 'D', text: 'Di titik pusat' },
    ],
    correctAnswer: 'B',
    explanation:
      'Substitusi Q(3, 4): 3² + 4² = 9 + 16 = 25. Karena nilai ruas kiri sama dengan r² (25 = 25), titik Q terletak tepat pada lingkaran.',
    timeLimit: 30,
  },
  {
    id: 'Q-TIT-03',
    topic: 'kedudukan-titik',
    topicLabel: 'Kedudukan Titik',
    difficulty: 'mudah',
    type: 'pilihan-ganda',
    isContextual: true,
    question:
      'Radar pemantau mercusuar menjangkau area melingkar dengan persamaan x² + y² = 100 (satuan mil laut). Sebuah kapal nelayan berada pada koordinat (8, 7). Di manakah posisi kapal tersebut terhadap jangkauan radar?',
    options: [
      { id: 'A', text: 'Di dalam jangkauan radar' },
      { id: 'B', text: 'Tepat pada batas radar' },
      { id: 'C', text: 'Di luar jangkauan radar' },
      { id: 'D', text: 'Tepat di pusat radar' },
    ],
    correctAnswer: 'C',
    explanation:
      'Uji koordinat kapal (8, 7): 8² + 7² = 64 + 49 = 113. Karena 113 > 100, kapal berada di luar jangkauan radar mercusuar.',
    timeLimit: 30,
  },
  {
    id: 'Q-TIT-04',
    topic: 'kedudukan-titik',
    topicLabel: 'Kedudukan Titik',
    difficulty: 'mudah',
    type: 'isian-angka',
    isContextual: false,
    question:
      'Titik A(k, 0) terletak tepat PADA lingkaran x² + y² = 36. Jika k merupakan bilangan positif, berapakah nilai k?',
    correctAnswer: '6',
    explanation:
      'Substitusi A(k, 0) ke persamaan: k² + 0² = 36 ⇒ k² = 36. Karena k bernilai positif, k = √36 = 6.',
    timeLimit: 30,
  },
  {
    id: 'Q-TIT-05',
    topic: 'kedudukan-titik',
    topicLabel: 'Kedudukan Titik',
    difficulty: 'mudah',
    type: 'pilihan-ganda',
    isContextual: true,
    question:
      'Lapangan lari melingkar memiliki batas luar x² + y² = 64. Seorang wasit berdiri di koordinat (-4, 5). Di manakah posisi wasit tersebut terhadap batas lapangan lari?',
    options: [
      { id: 'A', text: 'Di dalam batas lapangan' },
      { id: 'B', text: 'Tepat pada garis batas lapangan' },
      { id: 'C', text: 'Di luar batas lapangan' },
      { id: 'D', text: 'Tidak dapat ditentukan' },
    ],
    correctAnswer: 'A',
    explanation:
      'Substitusi (-4, 5): (-4)² + 5² = 16 + 25 = 41. Karena 41 < 64, wasit berada di dalam batas lapangan.',
    timeLimit: 30,
  },
  {
    id: 'Q-TIT-06',
    topic: 'kedudukan-titik',
    topicLabel: 'Kedudukan Titik',
    difficulty: 'mudah',
    type: 'pilihan-ganda',
    isContextual: false,
    question:
      'Jika titik T(1, -2) diuji terhadap lingkaran x² + y² = 5, maka kedudukan titik T adalah...',
    options: [
      { id: 'A', text: 'Di dalam lingkaran' },
      { id: 'B', text: 'Tepat pada lingkaran' },
      { id: 'C', text: 'Di luar lingkaran' },
      { id: 'D', text: 'Di pusat koordinat' },
    ],
    correctAnswer: 'B',
    explanation:
      '1² + (-2)² = 1 + 4 = 5. Karena hasilnya sama dengan 5 (r²), titik T terletak tepat pada keliling lingkaran.',
    timeLimit: 30,
  },
  {
    id: 'Q-TIT-07',
    topic: 'kedudukan-titik',
    topicLabel: 'Kedudukan Titik',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    isContextual: false,
    question:
      'Kedudukan titik A(5, 1) terhadap lingkaran berpusat di P(2, -3) dengan persamaan (x - 2)² + (y + 3)² = 25 adalah...',
    options: [
      { id: 'A', text: 'Di dalam lingkaran' },
      { id: 'B', text: 'Tepat pada lingkaran' },
      { id: 'C', text: 'Di luar lingkaran' },
      { id: 'D', text: 'Di titik fokus lingkaran' },
    ],
    correctAnswer: 'B',
    explanation:
      'Substitusi A(5, 1): (5 - 2)² + (1 + 3)² = 3² + 4² = 9 + 16 = 25. Karena 25 = 25, titik A terletak tepat pada lingkaran.',
    timeLimit: 60,
  },
  {
    id: 'Q-TIT-08',
    topic: 'kedudukan-titik',
    topicLabel: 'Kedudukan Titik',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    isContextual: true,
    question:
      'Pemancar Wi-Fi di perpustakaan memiliki jangkauan melingkar dengan persamaan (x - 1)² + (y - 2)² = 20. Seorang siswa membaca di meja belajar berkoordinat (4, 4). Apakah siswa tersebut berada dalam jangkauan sinyal Wi-Fi?',
    options: [
      { id: 'A', text: 'Ya, berada di dalam jangkauan' },
      { id: 'B', text: 'Ya, tepat di batas terluar jangkauan' },
      { id: 'C', text: 'Tidak, berada di luar jangkauan' },
      { id: 'D', text: 'Tidak, sinyal terhalang dinding' },
    ],
    correctAnswer: 'A',
    explanation:
      'Substitusi (4, 4): (4 - 1)² + (4 - 2)² = 3² + 2² = 9 + 4 = 13. Karena 13 < 20, siswa berada di dalam jangkauan sinyal Wi-Fi.',
    timeLimit: 60,
  },
  {
    id: 'Q-TIT-09',
    topic: 'kedudukan-titik',
    topicLabel: 'Kedudukan Titik',
    difficulty: 'sedang',
    type: 'isian-angka',
    isContextual: false,
    question:
      'Titik P(6, a) terletak PADA lingkaran x² + y² = 100. Jika a merupakan bilangan positif, berapakah nilai a?',
    correctAnswer: '8',
    explanation:
      '6² + a² = 100 ⇒ 36 + a² = 100 ⇒ a² = 64. Karena a > 0, maka a = √64 = 8.',
    timeLimit: 60,
  },
  {
    id: 'Q-TIT-10',
    topic: 'kedudukan-titik',
    topicLabel: 'Kedudukan Titik',
    difficulty: 'sedang',
    type: 'isian-angka',
    isContextual: true,
    question:
      'Kolam air mancur bundar memiliki pusat di (-2, 3) dan persamaan batas (x + 2)² + (y - 3)² = 49. Berapakah nilai kuadrat jarak (d²) dari sebuah tiang lampu di koordinat (4, -1) ke titik pusat kolam?',
    correctAnswer: '52',
    explanation:
      'd² = (x₁ - a)² + (y₁ - b)² = (4 - (-2))² + (-1 - 3)² = 6² + (-4)² = 36 + 16 = 52. (Karena 52 > 49, tiang lampu berada di luar kolam).',
    timeLimit: 60,
  },
  {
    id: 'Q-TIT-11',
    topic: 'kedudukan-titik',
    topicLabel: 'Kedudukan Titik',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    isContextual: false,
    question:
      'Tentukan kedudukan titik B(2, -1) terhadap lingkaran x² + y² - 4x + 6y - 12 = 0!',
    options: [
      { id: 'A', text: 'Di dalam lingkaran' },
      { id: 'B', text: 'Tepat pada lingkaran' },
      { id: 'C', text: 'Di luar lingkaran' },
      { id: 'D', text: 'Di titik puncak lingkaran' },
    ],
    correctAnswer: 'A',
    explanation:
      'Substitusi (2, -1) ke bentuk umum: 2² + (-1)² - 4(2) + 6(-1) - 12 = 4 + 1 - 8 - 6 - 12 = -21. Karena nilai kuasa K = -21 < 0, titik B terletak di dalam lingkaran.',
    timeLimit: 60,
  },
  {
    id: 'Q-TIT-12',
    topic: 'kedudukan-titik',
    topicLabel: 'Kedudukan Titik',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    isContextual: true,
    question:
      'Lampu mercusuar berputar membentuk area jangkauan (x - 3)² + (y - 2)² = 25. Sebuah perahu patroli berada pada koordinat (7, 5). Bagaimanakah posisi perahu terhadap batas jangkauan cahaya mercusuar?',
    options: [
      { id: 'A', text: 'Di dalam area cahaya' },
      { id: 'B', text: 'Tepat pada batas cahaya' },
      { id: 'C', text: 'Di luar area cahaya' },
      { id: 'D', text: 'Di pusat mercusuar' },
    ],
    correctAnswer: 'B',
    explanation:
      '(7 - 3)² + (5 - 2)² = 4² + 3² = 16 + 9 = 25. Karena nilainya tepat 25 (r²), perahu berada tepat pada batas cahaya mercusuar.',
    timeLimit: 60,
  },
  {
    id: 'Q-TIT-13',
    topic: 'kedudukan-titik',
    topicLabel: 'Kedudukan Titik',
    difficulty: 'sulit',
    type: 'pilihan-ganda',
    isContextual: false,
    question:
      'Agar titik (a, 2) berada DI LUAR lingkaran x² + y² - 2x - 4y - 20 = 0, maka nilai a yang memenuhi adalah...',
    options: [
      { id: 'A', text: '-4 < a < 6' },
      { id: 'B', text: 'a < -4 atau a > 6' },
      { id: 'C', text: 'a < -6 atau a > 4' },
      { id: 'D', text: '-6 < a < 4' },
    ],
    correctAnswer: 'B',
    explanation:
      'Substitusi (a, 2): a² + 2² - 2a - 4(2) - 20 > 0 ⇒ a² + 4 - 2a - 8 - 20 > 0 ⇒ a² - 2a - 24 > 0 ⇒ (a - 6)(a + 4) > 0. Pembuat nol a = 6 atau a = -4. Nilai pertidaksamaannya adalah a < -4 atau a > 6.',
    timeLimit: 90,
  },
  {
    id: 'Q-TIT-14',
    topic: 'kedudukan-titik',
    topicLabel: 'Kedudukan Titik',
    difficulty: 'sulit',
    type: 'isian-angka',
    isContextual: true,
    question:
      'Zona getaran gempa bumi dimodelkan oleh x² + y² = 169 (dalam km). Sebuah stasiun pengamat cuaca berada pada koordinat (5, y) dengan y > 0 dan terletak tepat di batas luar zona getaran. Berapakah nilai y stasiun tersebut?',
    correctAnswer: '12',
    explanation:
      '5² + y² = 169 ⇒ 25 + y² = 169 ⇒ y² = 144 ⇒ y = √144 = 12 (karena y > 0).',
    timeLimit: 90,
  },
  {
    id: 'Q-TIT-15',
    topic: 'kedudukan-titik',
    topicLabel: 'Kedudukan Titik',
    difficulty: 'sulit',
    type: 'isian-angka',
    isContextual: false,
    question:
      'Diberikan persamaan lingkaran (x - 1)² + (y + 2)² = 40. Jika titik (m, 4) terletak tepat PADA lingkaran tersebut dan m > 0, berapakah nilai m?',
    correctAnswer: '3',
    explanation:
      '(m - 1)² + (4 + 2)² = 40 ⇒ (m - 1)² + 36 = 40 ⇒ (m - 1)² = 4 ⇒ m - 1 = 2 ⇒ m = 3 (karena m > 0).',
    timeLimit: 90,
  },
  {
    id: 'Q-TIT-16',
    topic: 'kedudukan-titik',
    topicLabel: 'Kedudukan Titik',
    difficulty: 'sulit',
    type: 'pilihan-ganda',
    isContextual: true,
    question:
      'Satelit memetakan pusaran badai dengan persamaan (x - 4)² + (y + 1)² = 50. Pesawat penjelajah cuaca berada pada koordinat (9, 4). Apakah pesawat tersebut berada di dalam, pada batas, atau di luar pusaran badai?',
    options: [
      { id: 'A', text: 'Di dalam pusaran badai' },
      { id: 'B', text: 'Tepat pada batas pusaran badai' },
      { id: 'C', text: 'Di luar pusaran badai' },
      { id: 'D', text: 'Di pusat pusaran badai' },
    ],
    correctAnswer: 'B',
    explanation:
      '(9 - 4)² + (4 - (-1))² = 5² + 5² = 25 + 25 = 50. Karena d² = r² = 50, pesawat berada tepat pada batas pusaran badai.',
    timeLimit: 90,
  },

  // =========================================================================
  // MATERI 3: KEDUDUKAN GARIS TERHADAP LINGKARAN (16 SOAL: 4 MUDAH, 6 SEDANG, 6 SULIT)
  // =========================================================================
  {
    id: 'Q-GAR-01',
    topic: 'kedudukan-garis',
    topicLabel: 'Kedudukan Garis',
    difficulty: 'mudah',
    type: 'pilihan-ganda',
    isContextual: false,
    question:
      'Jika diskriminan (D) dari persamaan kuadrat sekutu antara garis dan lingkaran bernilai D > 0, maka kedudukan garis terhadap lingkaran adalah...',
    options: [
      { id: 'A', text: 'Memotong lingkaran di dua titik berbeda' },
      { id: 'B', text: 'Menyinggung lingkaran di satu titik' },
      { id: 'C', text: 'Tidak memotong maupun menyinggung lingkaran' },
      { id: 'D', text: 'Melewati titik pusat lingkaran' },
    ],
    correctAnswer: 'A',
    explanation:
      'Nilai D > 0 menunjukkan terdapat 2 akar real berbeda, yang berarti garis memotong lingkaran di 2 titik sekutu berbeda (garis sekan).',
    timeLimit: 80,
  },
  {
    id: 'Q-GAR-02',
    topic: 'kedudukan-garis',
    topicLabel: 'Kedudukan Garis',
    difficulty: 'mudah',
    type: 'pilihan-ganda',
    isContextual: false,
    question:
      'Kedudukan garis vertikal x = 5 terhadap lingkaran x² + y² = 25 adalah...',
    options: [
      { id: 'A', text: 'Memotong di dua titik' },
      { id: 'B', text: 'Menyinggung di satu titik' },
      { id: 'C', text: 'Di luar lingkaran' },
      { id: 'D', text: 'Tidak memotong' },
    ],
    correctAnswer: 'B',
    explanation:
      'Substitusi x = 5: 5² + y² = 25 ⇒ y² = 0 ⇒ y = 0. Terdapat tepat 1 titik potong yaitu (5, 0), sehingga garis menyinggung lingkaran.',
    timeLimit: 80,
  },
  {
    id: 'Q-GAR-03',
    topic: 'kedudukan-garis',
    topicLabel: 'Kedudukan Garis',
    difficulty: 'mudah',
    type: 'pilihan-ganda',
    isContextual: true,
    question:
      'Jalur pipa air bersih membentang lurus dengan persamaan y = 6. Area kebun anggur berbentuk lingkaran dengan model x² + y² = 25. Apakah pipa air tersebut memotong area kebun anggur?',
    options: [
      { id: 'A', text: 'Memotong kebun di dua titik' },
      { id: 'B', text: 'Menyinggung batas kebun di satu titik' },
      { id: 'C', text: 'Tidak memotong kebun (berada di luar)' },
      { id: 'D', text: 'Tepat melewati pusat kebun' },
    ],
    correctAnswer: 'C',
    explanation:
      'Jari-jari kebun r = √25 = 5. Jarak garis y = 6 ke pusat (0,0) adalah 6. Karena 6 > 5 (jarak d > r), garis pipa berada sepenuhnya di luar kebun.',
    timeLimit: 80,
  },
  {
    id: 'Q-GAR-04',
    topic: 'kedudukan-garis',
    topicLabel: 'Kedudukan Garis',
    difficulty: 'mudah',
    type: 'isian-angka',
    isContextual: false,
    question:
      'Berapakah nilai diskriminan (D) dari sistem persamaan garis y = 3 dan lingkaran x² + y² = 25?',
    correctAnswer: '64',
    explanation:
      'Substitusi y = 3: x² + 3² = 25 ⇒ x² - 16 = 0. Persamaan kuadrat: ax² + bx + c = 0 dengan a = 1, b = 0, c = -16. Diskriminan D = b² - 4ac = 0² - 4(1)(-16) = 64.',
    timeLimit: 80,
  },
  {
    id: 'Q-GAR-05',
    topic: 'kedudukan-garis',
    topicLabel: 'Kedudukan Garis',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    isContextual: false,
    question:
      'Tentukan kedudukan garis y = x + 5 terhadap lingkaran x² + y² = 25!',
    options: [
      { id: 'A', text: 'Memotong lingkaran di dua titik' },
      { id: 'B', text: 'Menyinggung lingkaran di satu titik' },
      { id: 'C', text: 'Tidak memotong lingkaran' },
      { id: 'D', text: 'Berada di luar lingkaran' },
    ],
    correctAnswer: 'A',
    explanation:
      'Substitusi: x² + (x + 5)² = 25 ⇒ x² + x² + 10x + 25 = 25 ⇒ 2x² + 10x = 0 ⇒ 2x(x + 5) = 0. Ada 2 titik potong di x = 0 dan x = -5, sehingga garis memotong lingkaran di dua titik.',
    timeLimit: 120,
  },
  {
    id: 'Q-GAR-06',
    topic: 'kedudukan-garis',
    topicLabel: 'Kedudukan Garis',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    isContextual: true,
    question:
      'Lintasan rel kereta komuter dimodelkan dengan garis horizontal y = 7. Zona rambatan sinyal stasiun berpusat di (0,0) dengan persamaan x² + y² = 49. Bagaimana kedudukan rel kereta terhadap zona sinyal?',
    options: [
      { id: 'A', text: 'Memotong zona sinyal di dua titik' },
      { id: 'B', text: 'Menyinggung zona sinyal di satu titik' },
      { id: 'C', text: 'Berada di luar zona sinyal' },
      { id: 'D', text: 'Tepat membelah zona sinyal' },
    ],
    correctAnswer: 'B',
    explanation:
      'Jari-jari sinyal r = √49 = 7. Garis y = 7 berjarak tepat 7 satuan dari pusat (0,0), sehingga rel kereta menyinggung batas zona sinyal di titik (0, 7).',
    timeLimit: 120,
  },
  {
    id: 'Q-GAR-07',
    topic: 'kedudukan-garis',
    topicLabel: 'Kedudukan Garis',
    difficulty: 'sedang',
    type: 'isian-angka',
    isContextual: false,
    question:
      'Garis y = mx menyinggung lingkaran x² + (y - 5)² = 25 di titik (0, 0). Berapakah kemiringan (gradien) m dari garis singgung tersebut?',
    correctAnswer: '0',
    explanation:
      'Pusat lingkaran di (0, 5) dan jari-jari r = 5. Garis singgung di titik terendah (0, 0) adalah garis mendatar (sumbu X) dengan gradien m = 0.',
    timeLimit: 120,
  },
  {
    id: 'Q-GAR-08',
    topic: 'kedudukan-garis',
    topicLabel: 'Kedudukan Garis',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    isContextual: true,
    question:
      'Berkas sinar laser lurus memiliki lintasan y = 2x + 10. Sasaran lingkaran target memiliki model x² + y² = 20. Bagaimanakah interaksi berkas laser dengan lingkaran target?',
    options: [
      { id: 'A', text: 'Menembus target di dua titik berbeda' },
      { id: 'B', text: 'Menyinggung target di tepat satu titik' },
      { id: 'C', text: 'Tidak mengenai target sama sekali' },
      { id: 'D', text: 'Mengenai tepat titik pusat target' },
    ],
    correctAnswer: 'B',
    explanation:
      'Substitusi y = 2x + 10: x² + (2x + 10)² = 20 ⇒ 5x² + 40x + 80 = 0 ⇒ x² + 8x + 16 = 0 ⇒ D = 8² - 4(1)(16) = 0. Karena D = 0, laser menyinggung target tepat di 1 titik (-4, 2).',
    timeLimit: 120,
  },
  {
    id: 'Q-GAR-09',
    topic: 'kedudukan-garis',
    topicLabel: 'Kedudukan Garis',
    difficulty: 'sedang',
    type: 'isian-angka',
    isContextual: false,
    question:
      'Garis horizontal y = c menyinggung lingkaran x² + y² = 36 di bagian atas lingkaran (c > 0). Berapakah nilai konstanta c?',
    correctAnswer: '6',
    explanation:
      'Jari-jari lingkaran adalah r = √36 = 6. Garis horizontal yang menyinggung lingkaran di bagian atas adalah y = 6, sehingga nilai c = 6.',
    timeLimit: 120,
  },
  {
    id: 'Q-GAR-10',
    topic: 'kedudukan-garis',
    topicLabel: 'Kedudukan Garis',
    difficulty: 'sedang',
    type: 'pilihan-ganda',
    isContextual: true,
    question:
      'Jalan arteri dirancang lurus dengan persamaan x + y = 6. Kolam bundaran kota memiliki model x² + y² = 16. Apakah jalan arteri memotong bundaran kota?',
    options: [
      { id: 'A', text: 'Memotong bundaran di dua titik' },
      { id: 'B', text: 'Menyinggung bundaran di satu titik' },
      { id: 'C', text: 'Tidak memotong bundaran (di luar)' },
      { id: 'D', text: 'Melewati pusat bundaran' },
    ],
    correctAnswer: 'C',
    explanation:
      'Jarak pusat (0,0) ke garis x + y - 6 = 0 adalah d = |0 + 0 - 6| / √(1² + 1²) = 6 / √2 = 3√2 ≈ 4,24. Jari-jari bundaran r = √16 = 4. Karena d > r (4,24 > 4), jalan arteri berada di luar bundaran.',
    timeLimit: 120,
  },
  {
    id: 'Q-GAR-11',
    topic: 'kedudukan-garis',
    topicLabel: 'Kedudukan Garis',
    difficulty: 'sulit',
    type: 'pilihan-ganda',
    isContextual: false,
    question:
      'Agar garis y = 2x + k menyinggung lingkaran x² + y² = 5, nilai konstanta k yang memenuhi adalah...',
    options: [
      { id: 'A', text: 'k = 5 atau k = -5' },
      { id: 'B', text: 'k = 10 atau k = -10' },
      { id: 'C', text: 'k = 25 atau k = -25' },
      { id: 'D', text: 'k = √5 atau k = -√5' },
    ],
    correctAnswer: 'A',
    explanation:
      'Persamaan garis singgung dengan gradien m = 2 pada lingkaran r² = 5 adalah y = mx ± r√(1 + m²). Di sini k = ± √5 × √(1 + 2²) = ± √5 × √5 = ± 5. Jadi k = 5 atau k = -5.',
    timeLimit: 150,
  },
  {
    id: 'Q-GAR-12',
    topic: 'kedudukan-garis',
    topicLabel: 'Kedudukan Garis',
    difficulty: 'sulit',
    type: 'isian-angka',
    isContextual: true,
    question:
      'Pesawat terbang melintas pada jalur lurus y = x + 4. Jangkauan sensor pangkalan udara adalah x² + y² = 8. Berapakah nilai diskriminan (D) interaksi lintasan pesawat dengan lingkaran sensor?',
    correctAnswer: '0',
    explanation:
      'Substitusi y = x + 4: x² + (x + 4)² = 8 ⇒ 2x² + 8x + 8 = 0 ⇒ x² + 4x + 4 = 0. Nilai diskriminan D = b² - 4ac = 4² - 4(1)(4) = 16 - 16 = 0 (menyinggung).',
    timeLimit: 150,
  },
  {
    id: 'Q-GAR-13',
    topic: 'kedudukan-garis',
    topicLabel: 'Kedudukan Garis',
    difficulty: 'sulit',
    type: 'pilihan-ganda',
    isContextual: false,
    question:
      'Kedudukan garis 3x + 4y - 25 = 0 terhadap lingkaran x² + y² = 25 adalah...',
    options: [
      { id: 'A', text: 'Memotong lingkaran di dua titik berbeda' },
      { id: 'B', text: 'Menyinggung lingkaran di tepat satu titik' },
      { id: 'C', text: 'Berada sepenuhnya di luar lingkaran' },
      { id: 'D', text: 'Melewati titik pusat lingkaran' },
    ],
    correctAnswer: 'B',
    explanation:
      'Jarak pusat (0,0) ke garis: d = |3(0) + 4(0) - 25| / √(3² + 4²) = 25 / 5 = 5. Jari-jari lingkaran r = √25 = 5. Karena d = r = 5, garis menyinggung lingkaran di titik (3, 4).',
    timeLimit: 150,
  },
  {
    id: 'Q-GAR-14',
    topic: 'kedudukan-garis',
    topicLabel: 'Kedudukan Garis',
    difficulty: 'sulit',
    type: 'pilihan-ganda',
    isContextual: true,
    question:
      'Saluran pipa gas mengikuti garis y = mx melalui titik pusat koordinat. Tangki bahan bakar bawah tanah berpusat di (4, 0) dengan radius 2, bermodel (x - 4)² + y² = 4. Jika pipa gas menyinggung tangki di kuadran I, berapakah gradien m dari pipa tersebut?',
    options: [
      { id: 'A', text: 'm = 1/√3 (sudut 30°)' },
      { id: 'B', text: 'm = 1 (sudut 45°)' },
      { id: 'C', text: 'm = √3 (sudut 60°)' },
      { id: 'D', text: 'm = 2' },
    ],
    correctAnswer: 'A',
    explanation:
      'Jarak pusat (4,0) ke garis mx - y = 0 adalah d = |4m| / √(m² + 1). Syarat menyinggung d = r = 2: 4m / √(m² + 1) = 2 ⇒ 2m = √(m² + 1) ⇒ 4m² = m² + 1 ⇒ 3m² = 1 ⇒ m = 1/√3 (karena m > 0 di kuadran I).',
    timeLimit: 150,
  },
  {
    id: 'Q-GAR-15',
    topic: 'kedudukan-garis',
    topicLabel: 'Kedudukan Garis',
    difficulty: 'sulit',
    type: 'isian-angka',
    isContextual: false,
    question:
      'Garis y = x + c memotong lingkaran x² + y² = 18 di dua titik berbeda. Jika c merupakan bilangan bulat positif, berapakah nilai c terbesar yang mungkin?',
    correctAnswer: '5',
    explanation:
      'Jarak pusat (0,0) ke garis x - y + c = 0 adalah |c| / √2. Syarat memotong di 2 titik: d < r ⇒ |c| / √2 < √18 ⇒ |c| < √36 = 6. Karena c adalah bilangan bulat positif dan c < 6, nilai terbesar yang mungkin adalah c = 5.',
    timeLimit: 150,
  },
  {
    id: 'Q-GAR-16',
    topic: 'kedudukan-garis',
    topicLabel: 'Kedudukan Garis',
    difficulty: 'sulit',
    type: 'isian-angka',
    isContextual: true,
    question:
      'Batas utara pendaratan helikopter dirancang sepanjang garis horizontal y = k. Radar darat memantau area (x - 2)² + (y - 3)² = 16. Berapakah nilai k positif tertinggi di mana batas pendaratan masih menyinggung jangkauan radar?',
    correctAnswer: '7',
    explanation:
      'Pusat radar di (2, 3) dan jari-jari r = √16 = 4. Garis horizontal tertinggi yang menyinggung lingkaran radar adalah y = y_pusat + r = 3 + 4 = 7, sehingga k = 7.',
    timeLimit: 150,
  },
];

// Helper to shuffle an array immutably
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Selects session questions for 30 or 40 items.
 * If 40 items: returns all 40 questions shuffled.
 * If 30 items: strictly selects 6 Unsur, 12 Titik, and 12 Garis, preserving difficulties, and shuffles.
 */
export function selectSessionQuestions(mode: 30 | 40): Question[] {
  if (mode === 40) {
    return shuffleArray(QUESTION_BANK);
  }

  // Sesi 30 soal:
  // - Unsur-unsur: 6 soal (2 mudah, 2 sedang, 2 sulit)
  // - Titik: 12 soal (5 mudah, 4 sedang, 3 sulit)
  // - Garis: 12 soal (3 mudah, 5 sedang, 4 sulit)
  // Total = 6 + 12 + 12 = 30 soal
  const unsurAll = QUESTION_BANK.filter((q) => q.topic === 'unsur-unsur-lingkaran');
  const titikAll = QUESTION_BANK.filter((q) => q.topic === 'kedudukan-titik');
  const garisAll = QUESTION_BANK.filter((q) => q.topic === 'kedudukan-garis');

  const pickFromGroup = (list: Question[], targetCount: number): Question[] => {
    const shuffled = shuffleArray(list);
    return shuffled.slice(0, targetCount);
  };

  const selectedUnsur = pickFromGroup(unsurAll, 6);
  const selectedTitik = pickFromGroup(titikAll, 12);
  const selectedGaris = pickFromGroup(garisAll, 12);

  const combined = [...selectedUnsur, ...selectedTitik, ...selectedGaris];
  return shuffleArray(combined);
}
