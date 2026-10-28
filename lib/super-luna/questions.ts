export interface Question {
  id: number;
  level: number;
  title: string;
  question: string;
  type: 'multiple-choice' | 'numeric' | 'fill-blank';
  options?: string[];
  correctIndex?: number;
  correctAnswer?: string;
  hint: string;
  explanation: string;
  coinReward: number;
  dialogEmote: string; // avatar filename in sprites
}

export const LEVEL_1_QUESTIONS: Question[] = [
  {
    id: 101,
    level: 1,
    title: 'Titik Pusat Lingkaran',
    question: 'Luna menemukan sebuah lingkaran dengan titik O tepat di tengahnya. Titik A, B, dan C berada pada keliling lingkaran. Apakah nama titik O?',
    type: 'multiple-choice',
    options: ['A. Titik ujung', 'B. Titik pusat', 'C. Titik singgung', 'D. Titik potong'],
    correctIndex: 1,
    hint: 'Titik yang terletak tepat di tengah-tengah lingkaran dan memiliki jarak yang sama ke seluruh keliling.',
    explanation: 'Titik yang berada tepat di tengah lingkaran dinamakan Titik Pusat.',
    coinReward: 15,
    dialogEmote: 'dialog_1.png'
  },
  {
    id: 102,
    level: 1,
    title: 'Jari-jari Lingkaran',
    question: 'Ruas garis OA menghubungkan titik pusat O dengan titik A pada keliling lingkaran. Ruas garis OA disebut...',
    type: 'multiple-choice',
    options: ['A. Jari-jari (r)', 'B. Diameter (d)', 'C. Tali busur', 'D. Garis singgung'],
    correctIndex: 0,
    hint: 'Jarak dari pusat lingkaran ke salah satu titik di keliling lingkaran.',
    explanation: 'Ruas garis dari pusat lingkaran ke keliling disebut jari-jari (radius).',
    coinReward: 15,
    dialogEmote: 'dialog_2.png'
  },
  {
    id: 103,
    level: 1,
    title: 'Menghitung Diameter',
    question: 'Sebuah lingkaran memiliki jari-jari 7 cm. Jika AB merupakan diameter lingkaran, panjang AB adalah ....',
    type: 'multiple-choice',
    options: ['A. 3,5 cm', 'B. 7 cm', 'C. 14 cm', 'D. 21 cm'],
    correctIndex: 2,
    hint: 'Panjang diameter adalah dua kali panjang jari-jari: d = 2 × r.',
    explanation: 'Diameter = 2 × r = 2 × 7 cm = 14 cm.',
    coinReward: 20,
    dialogEmote: 'dialog_4.png'
  },
  {
    id: 104,
    level: 1,
    title: 'Tali Busur',
    question: 'Ruas garis AB menghubungkan dua titik pada keliling lingkaran dan tidak melalui titik pusat. Ruas garis AB disebut...',
    type: 'multiple-choice',
    options: ['A. Jari-jari', 'B. Diameter', 'C. Tali busur', 'D. Apotema'],
    correctIndex: 2,
    hint: 'Garis lurus yang menghubungkan dua titik sembarang pada lengkungan keliling lingkaran.',
    explanation: 'Ruas garis lurus yang menghubungkan dua titik pada keliling lingkaran disebut tali busur.',
    coinReward: 15,
    dialogEmote: 'dialog_3.png'
  },
  {
    id: 105,
    level: 1,
    title: 'Busur Lingkaran',
    question: 'Bagian lengkung pada keliling lingkaran yang menghubungkan titik A dan B disebut ....',
    type: 'multiple-choice',
    options: ['A. Tali busur AB', 'B. Busur AB', 'C. Juring AOB', 'D. Diameter AB'],
    correctIndex: 1,
    hint: 'Perhatikan kata kuncinya: bagian lengkung pada keliling lingkaran.',
    explanation: 'Garis lengkung yang merupakan bagian dari keliling lingkaran disebut busur lingkaran.',
    coinReward: 15,
    dialogEmote: 'dialog_1.png'
  },
  {
    id: 106,
    level: 1,
    title: 'Juring Lingkaran',
    question: 'Daerah dalam lingkaran yang dibatasi oleh dua jari-jari OA dan OB serta busur AB disebut ....',
    type: 'multiple-choice',
    options: ['A. Tembereng', 'B. Juring', 'C. Apotema', 'D. Tali busur'],
    correctIndex: 1,
    hint: 'Bentuknya seperti sepotong kue atau potongan pizza.',
    explanation: 'Daerah yang dibatasi oleh dua jari-jari dan sebuah busur lingkaran disebut juring lingkaran.',
    coinReward: 20,
    dialogEmote: 'dialog_4.png'
  },
  {
    id: 107,
    level: 1,
    title: 'Tembereng Lingkaran',
    question: 'Daerah dalam lingkaran yang dibatasi oleh sebuah tali busur AB dan busur kecil AB disebut ....',
    type: 'multiple-choice',
    options: ['A. Juring', 'B. Tembereng', 'C. Apotema', 'D. Sudut keliling'],
    correctIndex: 1,
    hint: 'Daerah yang terpotong oleh garis tali busur, menyerupai tembereng kapal.',
    explanation: 'Daerah yang dibatasi oleh busur dan tali busurnya disebut tembereng.',
    coinReward: 20,
    dialogEmote: 'dialog_2.png'
  },
  {
    id: 108,
    level: 1,
    title: 'Apotema',
    question: 'Ruas garis OM ditarik dari titik pusat O dan tegak lurus terhadap tali busur AB di titik M. Ruas garis OM disebut ....',
    type: 'multiple-choice',
    options: ['A. Jari-jari', 'B. Tali busur', 'C. Apotema', 'D. Diameter'],
    correctIndex: 2,
    hint: 'Garis terpendek dari titik pusat yang tegak lurus ke tali busur.',
    explanation: 'Jarak terpendek antara titik pusat lingkaran dengan tali busur disebut apotema.',
    coinReward: 20,
    dialogEmote: 'dialog_3.png'
  },
  {
    id: 109,
    level: 1,
    title: 'Jari-jari dari Diameter',
    question: 'Sebuah lingkaran memiliki diameter PQ = 26 cm. Berapa panjang jari-jari lingkaran tersebut?',
    type: 'multiple-choice',
    options: ['A. 13 cm', 'B. 52 cm', 'C. 26 cm', 'D. 12 cm'],
    correctIndex: 0,
    hint: 'r = diameter / 2 = 26 / 2.',
    explanation: 'Panjang jari-jari adalah setengah diameter: r = 26 / 2 = 13 cm.',
    coinReward: 15,
    dialogEmote: 'dialog_1.png'
  },
  {
    id: 110,
    level: 1,
    title: 'Sifat Diameter & Tali Busur',
    question: 'Perhatikan: (1) AB adalah diameter; (2) CD tali busur; (3) semua tali busur adalah diameter. Jika AB melewati pusat O dan CD tidak melewati O, manakah yang benar?',
    type: 'multiple-choice',
    options: ['A. Hanya (1)', 'B. Hanya (2)', 'C. Pernyataan (1) dan (2)', 'D. Pernyataan (1), (2), dan (3)'],
    correctIndex: 2,
    hint: 'Diameter selalu merupakan tali busur terpanjang, tapi tidak semua tali busur adalah diameter.',
    explanation: 'Pernyataan 1 dan 2 benar. Pernyataan 3 salah karena tali busur yang tidak melewati pusat bukan diameter.',
    coinReward: 25,
    dialogEmote: 'dialog_5.png'
  },
  {
    id: 111,
    level: 1,
    title: 'Aplikasi Unsur Lingkaran',
    question: 'Sebuah pizza bundar dipotong satu bagian dibatasi dua ruas garis dari pusat ke tepi dan satu lengkungan tepi. Unsur lingkaran tersebut adalah...',
    type: 'multiple-choice',
    options: ['A. Tembereng', 'B. Juring', 'C. Tali busur', 'D. Apotema'],
    correctIndex: 1,
    hint: 'Potongan pizza berbentuk segitiga melengkung dibatasi 2 jari-jari dan 1 busur.',
    explanation: 'Potongan pizza dibatasi dua jari-jari dan satu busur, sehingga berbentuk juring lingkaran.',
    coinReward: 20,
    dialogEmote: 'dialog_4.png'
  },
  {
    id: 112,
    level: 1,
    title: 'Identifikasi Lengkap',
    question: 'OA dari pusat ke keliling, AB menghubungkan dua titik keliling (tidak lewat O), OM dari O tegak lurus AB. Lengkapi berturut-turut!',
    type: 'multiple-choice',
    options: [
      'A. OA = jari-jari; AB = tali busur; OM = apotema',
      'B. OA = diameter; AB = busur; OM = juring',
      'C. OA = tali busur; AB = diameter; OM = apotema',
      'D. OA = apotema; AB = tali busur; OM = jari-jari'
    ],
    correctIndex: 0,
    hint: 'Pusat ke keliling = jari-jari, dua titik keliling = tali busur, tegak lurus dari pusat = apotema.',
    explanation: 'OA adalah jari-jari, AB adalah tali busur, dan OM adalah apotema.',
    coinReward: 30,
    dialogEmote: 'dialog_1.png'
  }
];

export const LEVEL_2_QUESTIONS: Question[] = [
  {
    id: 201,
    level: 2,
    title: 'Titik pada Lingkaran Pusat (0,0)',
    question: 'Diberikan lingkaran x² + y² = 25. Kedudukan titik A(3, 4) terhadap lingkaran adalah...',
    type: 'multiple-choice',
    options: ['A. Di dalam lingkaran', 'B. Tepat pada lingkaran', 'C. Di luar lingkaran', 'D. Di titik pusat'],
    correctIndex: 1,
    hint: 'Hitung substitusi: 3² + 4² = 9 + 16 = 25. Bandingkan dengan r² = 25.',
    explanation: 'Karena 3² + 4² = 25 = r², maka titik A terletak tepat PADA lingkaran.',
    coinReward: 15,
    dialogEmote: 'dialog_1.png'
  },
  {
    id: 202,
    level: 2,
    title: 'Titik di Dalam Lingkaran',
    question: 'Diberikan lingkaran x² + y² = 36. Kedudukan titik B(2, 3) terhadap lingkaran tersebut adalah...',
    type: 'multiple-choice',
    options: ['A. Di dalam lingkaran', 'B. Tepat pada lingkaran', 'C. Di luar lingkaran', 'D. Tidak terdefinisi'],
    correctIndex: 0,
    hint: 'Substitusi: 2² + 3² = 4 + 9 = 13. Apakah 13 lebih kecil dari 36?',
    explanation: 'Karena 2² + 3² = 13 < 36, maka titik B terletak DI DALAM lingkaran.',
    coinReward: 15,
    dialogEmote: 'dialog_2.png'
  },
  {
    id: 203,
    level: 2,
    title: 'Titik di Luar Lingkaran',
    question: 'Diberikan lingkaran x² + y² = 16. Kedudukan titik C(4, 3) terhadap lingkaran tersebut adalah...',
    type: 'multiple-choice',
    options: ['A. Di dalam lingkaran', 'B. Tepat pada lingkaran', 'C. Di luar lingkaran', 'D. Di pusat lingkaran'],
    correctIndex: 2,
    hint: 'Substitusi: 4² + 3² = 16 + 9 = 25. Bandingkan nilai 25 dengan 16.',
    explanation: 'Karena 4² + 3² = 25 > 16, maka titik C terletak DI LUAR lingkaran.',
    coinReward: 20,
    dialogEmote: 'dialog_3.png'
  },
  {
    id: 204,
    level: 2,
    title: 'Mencari Koordinat Titik Lingkaran',
    question: 'Titik P(a, 0) terletak pada lingkaran x² + y² = 49. Nilai positif dari a adalah...',
    type: 'multiple-choice',
    options: ['A. 5', 'B. 6', 'C. 7', 'D. 14'],
    correctIndex: 2,
    hint: 'Substitusi ke persamaan: a² + 0² = 49 → a² = 49.',
    explanation: 'a² = 49 → a = √49 = 7.',
    coinReward: 20,
    dialogEmote: 'dialog_4.png'
  },
  {
    id: 205,
    level: 2,
    title: 'Lingkaran Berpusat di (a,b)',
    question: 'Diberikan lingkaran (x - 1)² + (y + 2)² = 25. Kedudukan titik Q(1, 3) terhadap lingkaran adalah...',
    type: 'multiple-choice',
    options: ['A. Tepat pada lingkaran', 'B. Di dalam lingkaran', 'C. Di luar lingkaran', 'D. Di titik pusat'],
    correctIndex: 0,
    hint: 'Substitusi: (1 - 1)² + (3 + 2)² = 0² + 5² = 25.',
    explanation: 'Substitusi menghasilkan 0 + 25 = 25 = r², jadi titik Q terletak tepat PADA lingkaran.',
    coinReward: 25,
    dialogEmote: 'dialog_5.png'
  },
  {
    id: 206,
    level: 2,
    title: 'Pusat Lingkaran Bentuk Baku',
    question: 'Diberikan lingkaran (x + 2)² + (y - 3)² = 100. Koordinat titik pusat lingkaran tersebut adalah...',
    type: 'multiple-choice',
    options: ['A. (2, -3)', 'B. (-2, 3)', 'C. (-2, -3)', 'D. (2, 3)'],
    correctIndex: 1,
    hint: 'Rumus (x - a)² + (y - b)² = r² memiliki pusat di (a, b).',
    explanation: 'Bentuk (x - (-2))² + (y - 3)² = 100 menunjukkan pusat di titik (-2, 3).',
    coinReward: 15,
    dialogEmote: 'dialog_1.png'
  },
  {
    id: 207,
    level: 2,
    title: 'Parameter Titik pada Lingkaran',
    question: 'Jika titik (k, 2) terletak pada lingkaran x² + y² = 20, berapakah nilai k²?',
    type: 'multiple-choice',
    options: ['A. 16', 'B. 18', 'C. 24', 'D. 25'],
    correctIndex: 0,
    hint: 'k² + 2² = 20 → k² + 4 = 20 → k² = 20 - 4.',
    explanation: 'k² + 4 = 20 → k² = 16.',
    coinReward: 20,
    dialogEmote: 'dialog_2.png'
  },
  {
    id: 208,
    level: 2,
    title: 'Uji Kuasa Titik M',
    question: 'Kedudukan titik M(5, 5) terhadap lingkaran (x - 1)² + (y - 2)² = 16 adalah...',
    type: 'multiple-choice',
    options: ['A. Di dalam lingkaran', 'B. Tepat pada lingkaran', 'C. Di luar lingkaran', 'D. Di titik pusat'],
    correctIndex: 2,
    hint: '(5 - 1)² + (5 - 2)² = 4² + 3² = 16 + 9 = 25.',
    explanation: 'Karena 25 > 16 (nilai kuasa lebih besar dari r²), titik M berada DI LUAR lingkaran.',
    coinReward: 20,
    dialogEmote: 'dialog_3.png'
  },
  {
    id: 209,
    level: 2,
    title: 'Bentuk Umum Lingkaran',
    question: 'Lingkaran x² + y² + 4x - 6y - 12 = 0. Uji titik asal (0,0): 0² + 0² + 4(0) - 6(0) - 12 = -12 < 0. Maka (0,0) terletak di...',
    type: 'multiple-choice',
    options: ['A. Di dalam lingkaran', 'B. Pada keliling lingkaran', 'C. Di luar lingkaran', 'D. Pada garis singgung'],
    correctIndex: 0,
    hint: 'Nilai substitusi < 0 menandakan titik berada di dalam lingkaran.',
    explanation: 'Nilai negatif (-12 < 0) menunjukkan titik asal (0,0) terletak DI DALAM lingkaran.',
    coinReward: 25,
    dialogEmote: 'dialog_4.png'
  },
  {
    id: 210,
    level: 2,
    title: 'Menentukan Jari-jari',
    question: 'Sebuah lingkaran memiliki persamaan x² + y² = 64. Berapakah panjang jari-jarinya?',
    type: 'multiple-choice',
    options: ['A. 6', 'B. 8', 'C. 16', 'D. 32'],
    correctIndex: 1,
    hint: 'r² = 64 → r = √64.',
    explanation: 'r = √64 = 8 satuan panjang.',
    coinReward: 15,
    dialogEmote: 'dialog_1.png'
  },
  {
    id: 211,
    level: 2,
    title: 'Syarat Kedudukan Titik',
    question: 'Syarat mutlak agar suatu titik (x₁, y₁) terletak di dalam lingkaran x² + y² = r² adalah...',
    type: 'multiple-choice',
    options: ['A. x₁² + y₁² = r²', 'B. x₁² + y₁² < r²', 'C. x₁² + y₁² > r²', 'D. x₁ + y₁ < r'],
    correctIndex: 1,
    hint: 'Jarak titik ke pusat harus lebih pendek dari panjang jari-jari r.',
    explanation: 'Titik berada di dalam lingkaran jika dan hanya jika x₁² + y₁² < r².',
    coinReward: 20,
    dialogEmote: 'dialog_5.png'
  },
  {
    id: 212,
    level: 2,
    title: 'Titik Kuadran II',
    question: 'Kedudukan titik T(-3, 4) terhadap lingkaran x² + y² = 25 adalah...',
    type: 'multiple-choice',
    options: ['A. Di dalam lingkaran', 'B. Tepat pada lingkaran', 'C. Di luar lingkaran', 'D. Di pusat lingkaran'],
    correctIndex: 1,
    hint: '(-3)² + 4² = 9 + 16 = 25.',
    explanation: 'Nilai substitusi tepat sama dengan 25, sehingga titik T berada TEPAT PADA lingkaran.',
    coinReward: 25,
    dialogEmote: 'dialog_1.png'
  }
];

export const LEVEL_3_QUESTIONS: Question[] = [
  {
    id: 301,
    level: 3,
    title: 'Garis Sekan / Memotong Dua Titik',
    question: 'Sebuah garis memotong lingkaran di dua titik yang berbeda. Kedudukan garis tersebut terhadap lingkaran disebut ....',
    type: 'multiple-choice',
    options: ['A. Garis singgung', 'B. Garis sekant (memotong di dua titik)', 'C. Garis di luar lingkaran', 'D. Jari-jari'],
    correctIndex: 1,
    hint: 'Garis yang memotong lingkaran pada dua titik persekutuan.',
    explanation: 'Garis yang memotong lingkaran di dua titik berbeda disebut garis sekant (garis potong).',
    coinReward: 15,
    dialogEmote: 'dialog_1.png'
  },
  {
    id: 302,
    level: 3,
    title: 'Garis Singgung (Tangen)',
    question: 'Sebuah garis menyentuh lingkaran tepat di satu titik. Kedudukan garis tersebut disebut ....',
    type: 'multiple-choice',
    options: ['A. Garis singgung (tangen)', 'B. Garis sekant', 'C. Garis di luar lingkaran', 'D. Diameter'],
    correctIndex: 0,
    hint: 'Hanya memiliki tepat satu titik persekutuan dengan lingkaran.',
    explanation: 'Garis yang menyentuh lingkaran tepat di satu titik disebut garis singgung (tangent line).',
    coinReward: 15,
    dialogEmote: 'dialog_2.png'
  },
  {
    id: 303,
    level: 3,
    title: 'Garis Tidak Memotong',
    question: 'Jika suatu garis tidak memiliki titik persekutuan dengan lingkaran, kedudukan garis tersebut adalah ....',
    type: 'multiple-choice',
    options: ['A. Memotong lingkaran', 'B. Menyinggung lingkaran', 'C. Di luar lingkaran (tidak memotong)', 'D. Melalui pusat lingkaran'],
    correctIndex: 2,
    hint: 'Garis dan lingkaran sama sekali tidak saling berpotongan maupun bersinggungan.',
    explanation: 'Jika tidak ada titik persekutuan, kedudukan garis tersebut berada di luar lingkaran.',
    coinReward: 15,
    dialogEmote: 'dialog_3.png'
  },
  {
    id: 304,
    level: 3,
    title: 'Diskriminan Substitusi Garis y=3',
    question: 'Lingkaran x² + y² = 25 dipotong oleh garis y = 3. Setelah substitusi diperoleh x² - 16 = 0. Nilai diskriminan D = b² - 4ac adalah...',
    type: 'multiple-choice',
    options: ['A. 32', 'B. 64', 'C. 16', 'D. 0'],
    correctIndex: 1,
    hint: 'Dari x² + 0x - 16 = 0: a=1, b=0, c=-16. D = 0² - 4(1)(-16).',
    explanation: 'D = 0 - 4(1)(-16) = +64. Karena D > 0, garis memotong di dua titik!',
    coinReward: 25,
    dialogEmote: 'dialog_4.png'
  },
  {
    id: 305,
    level: 3,
    title: 'Kedudukan Garis y=5',
    question: 'Diketahui lingkaran x² + y² = 25 dan garis y = 5. Kedudukan garis terhadap lingkaran adalah ....',
    type: 'multiple-choice',
    options: ['A. Memotong di dua titik', 'B. Menyinggung di satu titik', 'C. Tidak memiliki titik persekutuan', 'D. Melalui pusat lingkaran'],
    correctIndex: 1,
    hint: 'Substitusi y = 5: x² + 25 = 25 → x² = 0 → x = 0 (hanya 1 titik persekutuan (0,5)).',
    explanation: 'Karena x² = 0 hanya memiliki satu solusi x = 0 (D = 0), garis y = 5 MENYINGGUNG lingkaran di titik (0, 5).',
    coinReward: 20,
    dialogEmote: 'dialog_5.png'
  },
  {
    id: 306,
    level: 3,
    title: 'Kedudukan Garis di Luar',
    question: 'Diketahui lingkaran x² + y² = 16 dan garis y = 5. Kedudukan garis terhadap lingkaran adalah ....',
    type: 'multiple-choice',
    options: ['A. Memotong di dua titik', 'B. Menyinggung di satu titik', 'C. Tidak memiliki titik persekutuan (di luar)', 'D. Melalui pusat lingkaran'],
    correctIndex: 2,
    hint: 'Jari-jari lingkaran adalah r = 4. Jarak garis y = 5 ke pusat (0,0) adalah 5 > 4.',
    explanation: 'Karena jarak garis (5) lebih besar dari jari-jari (4), garis berada di luar dan tidak berpotongan.',
    coinReward: 20,
    dialogEmote: 'dialog_1.png'
  },
  {
    id: 307,
    level: 3,
    title: 'Garis y=4 pada Lingkaran (x-2)²+(y-1)²=25',
    question: 'Lingkaran (x - 2)² + (y - 1)² = 25 dan garis y = 4. Kedudukan garis terhadap lingkaran adalah ....',
    type: 'multiple-choice',
    options: ['A. Memotong di dua titik', 'B. Menyinggung di satu titik', 'C. Tidak memiliki titik persekutuan', 'D. Garis melalui pusat'],
    correctIndex: 0,
    hint: 'Substitusi y = 4: (x - 2)² + 3² = 25 → (x - 2)² = 16 → x - 2 = ±4.',
    explanation: 'Ada dua nilai x yang memenuhi (x = 6 atau x = -2), sehingga garis MEMOTONG di dua titik.',
    coinReward: 25,
    dialogEmote: 'dialog_2.png'
  },
  {
    id: 308,
    level: 3,
    title: 'Garis Vertikal x=1',
    question: 'Lingkaran (x - 1)² + (y + 2)² = 9 dan garis x = 1 diberikan. Kedudukan garis terhadap lingkaran adalah ....',
    type: 'multiple-choice',
    options: ['A. Memotong di dua titik', 'B. Menyinggung di satu titik', 'C. Tidak memiliki titik persekutuan', 'D. Garis di luar lingkaran'],
    correctIndex: 0,
    hint: 'Substitusi x = 1: 0 + (y + 2)² = 9 → y + 2 = ±3 → y = 1 atau y = -5.',
    explanation: 'Garis x = 1 melewati pusat (1, -2) dan memotong lingkaran di dua titik berbeda.',
    coinReward: 25,
    dialogEmote: 'dialog_4.png'
  },
  {
    id: 309,
    level: 3,
    title: 'Diskriminan Lingkaran x²+y²=100 & y=6',
    question: 'Lingkaran x² + y² = 100 dan garis y = 6. Setelah substitusi didapat x² - 64 = 0. Nilai diskriminannya adalah...',
    type: 'multiple-choice',
    options: ['A. 128', 'B. 256', 'C. 64', 'D. 0'],
    correctIndex: 1,
    hint: 'D = b² - 4ac = 0² - 4(1)(-64) = 256.',
    explanation: 'D = -4(1)(-64) = 256. Nilai diskriminan adalah 256.',
    coinReward: 25,
    dialogEmote: 'dialog_3.png'
  },
  {
    id: 310,
    level: 3,
    title: 'Garis Menyinggung y=6',
    question: 'Lingkaran (x - 2)² + (y - 1)² = 25 dan garis y = 6. Kedudukan garis terhadap lingkaran adalah ....',
    type: 'multiple-choice',
    options: ['A. Memotong di dua titik', 'B. Menyinggung di satu titik', 'C. Tidak memiliki titik persekutuan', 'D. Garis melalui pusat'],
    correctIndex: 1,
    hint: '(x - 2)² + (6 - 1)² = 25 → (x - 2)² + 25 = 25 → (x - 2)² = 0.',
    explanation: 'Karena (x - 2)² = 0 memiliki tepat satu solusi x = 2, maka garis MENYINGGUNG lingkaran.',
    coinReward: 25,
    dialogEmote: 'dialog_5.png'
  },
  {
    id: 311,
    level: 3,
    title: 'Garis y=2 pada x²+y²=13',
    question: 'Lingkaran x² + y² = 13 dan garis y = 2 diberikan. Persamaan hasil substitusi adalah x² - 9 = 0. Kedudukan garis adalah...',
    type: 'multiple-choice',
    options: ['A. Memotong di dua titik', 'B. Menyinggung di satu titik', 'C. Tidak memiliki titik persekutuan', 'D. Garis di luar lingkaran'],
    correctIndex: 0,
    hint: 'x² = 9 → x = 3 atau x = -3 (dua titik potong).',
    explanation: 'Garis memotong lingkaran di dua titik yaitu (3, 2) dan (-3, 2).',
    coinReward: 20,
    dialogEmote: 'dialog_1.png'
  },
  {
    id: 312,
    level: 3,
    title: 'Diskriminan Negatif (x-3)²=-11',
    question: 'Lingkaran (x - 3)² + (y - 2)² = 25 dan garis y = 8 menghasilkan (x - 3)² = -11 (x² - 6x + 20 = 0). Nilai diskriminannya adalah...',
    type: 'multiple-choice',
    options: ['A. 44', 'B. -44', 'C. 0', 'D. -22'],
    correctIndex: 1,
    hint: 'D = (-6)² - 4(1)(20) = 36 - 80 = -44.',
    explanation: 'D = 36 - 80 = -44 < 0. Nilai diskriminan negatif membuktikan garis berada di luar lingkaran.',
    coinReward: 30,
    dialogEmote: 'dialog_2.png'
  }
];

export const LEVEL_METADATA = [
  {
    id: 1,
    title: 'Level 1: Unsur-unsur Lingkaran',
    subtitle: 'Mengenal Titik Pusat, Jari-jari, Diameter, Busur, & Tembereng',
    color: '#38BDF8',
    gradient: 'from-sky-400 to-blue-600',
    questions: LEVEL_1_QUESTIONS,
    requiredScoreToUnlockNext: 60,
    badge: 'Penjelajah Unsur'
  },
  {
    id: 2,
    title: 'Level 2: Kedudukan Titik pada Lingkaran',
    subtitle: 'Uji Posisi Titik: Di Dalam, Tepat Pada, atau Di Luar Lingkaran',
    color: '#818CF8',
    gradient: 'from-indigo-400 to-violet-600',
    questions: LEVEL_2_QUESTIONS,
    requiredScoreToUnlockNext: 60,
    badge: 'Pakar Koordinat'
  },
  {
    id: 3,
    title: 'Level 3: Kedudukan Garis pada Lingkaran',
    subtitle: 'Analisis Garis Sekan, Garis Singgung, & Nilai Diskriminan D',
    color: '#EC4899',
    gradient: 'from-pink-500 to-rose-600',
    questions: LEVEL_3_QUESTIONS,
    requiredScoreToUnlockNext: 60,
    badge: 'Master Garis Singgung'
  }
];
