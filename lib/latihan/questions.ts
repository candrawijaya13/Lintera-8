import { LatihanQuestion, LatihanTopicId } from './types';

export const LATIHAN_QUESTIONS: LatihanQuestion[] = [
  {
    "id": "LAT-UNS-01",
    "topic": "unsur-lingkaran",
    "topicTitle": "Unsur-Unsur Lingkaran",
    "number": 1,
    "difficulty": "mudah",
    "difficultyLabel": "Mudah",
    "type": "pilihan-ganda",
    "question": "Titik yang tepat berada di tengah-tengah lingkaran dan berjarak sama ke semua titik pada keliling lingkaran disebut...",
    "options": [
      {
        "id": "A",
        "text": "Titik potong"
      },
      {
        "id": "B",
        "text": "Titik pusat"
      },
      {
        "id": "C",
        "text": "Titik fokus"
      },
      {
        "id": "D",
        "text": "Titik koordinat"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Titik pusat adalah titik acuan di tengah lingkaran yang memiliki jarak konstan (jari-jari) ke setiap titik pada garis lengkung lingkaran."
  },
  {
    "id": "LAT-UNS-02",
    "topic": "unsur-lingkaran",
    "topicTitle": "Unsur-Unsur Lingkaran",
    "number": 2,
    "difficulty": "mudah",
    "difficultyLabel": "Mudah",
    "type": "isian-angka",
    "question": "Jika suatu lingkaran memiliki jari-jari sepanjang 12 cm, berapakah panjang diameternya dalam satuan cm?",
    "correctAnswer": "24",
    "explanation": "Panjang diameter adalah dua kali panjang jari-jari: d = 2 × r = 2 × 12 cm = 24 cm."
  },
  {
    "id": "LAT-UNS-03",
    "topic": "unsur-lingkaran",
    "topicTitle": "Unsur-Unsur Lingkaran",
    "number": 3,
    "difficulty": "mudah",
    "difficultyLabel": "Mudah",
    "type": "pilihan-ganda",
    "question": "Garis lurus yang menghubungkan dua titik pada keliling lingkaran tanpa harus melalui titik pusat disebut...",
    "options": [
      {
        "id": "A",
        "text": "Tali busur"
      },
      {
        "id": "B",
        "text": "Jari-jari"
      },
      {
        "id": "C",
        "text": "Apotema"
      },
      {
        "id": "D",
        "text": "Busur"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Tali busur adalah ruas garis lurus yang kedua ujungnya terletak pada keliling lingkaran. Jika melalui titik pusat, tali busur tersebut menjadi diameter."
  },
  {
    "id": "LAT-UNS-04",
    "topic": "unsur-lingkaran",
    "topicTitle": "Unsur-Unsur Lingkaran",
    "number": 4,
    "difficulty": "mudah",
    "difficultyLabel": "Mudah",
    "type": "pilihan-ganda",
    "question": "Daerah di dalam lingkaran yang dibatasi oleh dua buah jari-jari dan sebuah busur di hadapannya dinamakan...",
    "options": [
      {
        "id": "A",
        "text": "Tembereng"
      },
      {
        "id": "B",
        "text": "Apotema"
      },
      {
        "id": "C",
        "text": "Juring"
      },
      {
        "id": "D",
        "text": "Sudut keliling"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Juring (sektor lingkaran) adalah daerah yang dibatasi oleh dua jari-jari dan satu busur lingkaran."
  },
  {
    "id": "LAT-UNS-05",
    "topic": "unsur-lingkaran",
    "topicTitle": "Unsur-Unsur Lingkaran",
    "number": 5,
    "difficulty": "mudah",
    "difficultyLabel": "Mudah",
    "type": "isian-angka",
    "question": "Sebuah taman berbentuk lingkaran memiliki garis tengah (diameter) sepanjang 30 meter. Berapakah jari-jari taman tersebut dalam meter?",
    "correctAnswer": "15",
    "explanation": "Jari-jari adalah setengah dari diameter: r = d / 2 = 30 / 2 = 15 meter."
  },
  {
    "id": "LAT-UNS-06",
    "topic": "unsur-lingkaran",
    "topicTitle": "Unsur-Unsur Lingkaran",
    "number": 6,
    "difficulty": "sedang",
    "difficultyLabel": "Sedang",
    "type": "pilihan-ganda",
    "question": "Garis terpendek yang ditarik dari titik pusat lingkaran dan tegak lurus terhadap tali busur disebut...",
    "options": [
      {
        "id": "A",
        "text": "Jari-jari"
      },
      {
        "id": "B",
        "text": "Diameter"
      },
      {
        "id": "C",
        "text": "Apotema"
      },
      {
        "id": "D",
        "text": "Garis singgung"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Apotema adalah ruas garis yang menghubungkan titik pusat lingkaran secara tegak lurus dengan titik tengah suatu tali busur."
  },
  {
    "id": "LAT-UNS-07",
    "topic": "unsur-lingkaran",
    "topicTitle": "Unsur-Unsur Lingkaran",
    "number": 7,
    "difficulty": "sedang",
    "difficultyLabel": "Sedang",
    "type": "isian-angka",
    "question": "Pada lingkaran dengan jari-jari 10 cm, terdapat tali busur sepanjang 16 cm. Berapakah panjang garis apotema terhadap tali busur tersebut dalam cm?",
    "correctAnswer": "6",
    "explanation": "Apotema membagi tali busur menjadi dua bagian sama panjang (8 cm). Berdasarkan teorema Pythagoras: apotema = √(10² - 8²) = √(100 - 64) = √36 = 6 cm."
  },
  {
    "id": "LAT-UNS-08",
    "topic": "unsur-lingkaran",
    "topicLabel": "Unsur-Unsur Lingkaran",
    "number": 8,
    "difficulty": "sedang",
    "difficultyLabel": "Sedang",
    "type": "pilihan-ganda",
    "question": "Daerah di dalam lingkaran yang dibatasi oleh sebuah tali busur dan busur yang bersesuaian disebut...",
    "options": [
      {
        "id": "A",
        "text": "Tembereng"
      },
      {
        "id": "B",
        "text": "Juring"
      },
      {
        "id": "C",
        "text": "Apotema"
      },
      {
        "id": "D",
        "text": "Busur mayor"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Tembereng adalah daerah bidang datar pada lingkaran yang dibatasi oleh tali busur dan busurnya."
  },
  {
    "id": "LAT-UNS-09",
    "topic": "unsur-lingkaran",
    "topicTitle": "Unsur-Unsur Lingkaran",
    "number": 9,
    "difficulty": "sedang",
    "difficultyLabel": "Sedang",
    "type": "isian-angka",
    "question": "Suatu juring memiliki sudut pusat 60° pada lingkaran dengan luas total 180 cm². Berapakah luas juring tersebut dalam cm²?",
    "correctAnswer": "30",
    "explanation": "Luas juring = (sudut pusat / 360°) × Luas lingkaran = (60° / 360°) × 180 = 1/6 × 180 = 30 cm²."
  },
  {
    "id": "LAT-UNS-10",
    "topic": "unsur-lingkaran",
    "topicTitle": "Unsur-Unsur Lingkaran",
    "number": 10,
    "difficulty": "sedang",
    "difficultyLabel": "Sedang",
    "type": "pilihan-ganda",
    "question": "Jika sudut pusat AOB besarnya 110°, maka besar sudut keliling ACB yang menghadap busur AB yang sama adalah...",
    "options": [
      {
        "id": "A",
        "text": "45°"
      },
      {
        "id": "B",
        "text": "55°"
      },
      {
        "id": "C",
        "text": "70°"
      },
      {
        "id": "D",
        "text": "220°"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Besar sudut keliling = 1/2 × Sudut pusat = 1/2 × 110° = 55°."
  },
  {
    "id": "LAT-UNS-11",
    "topic": "unsur-lingkaran",
    "topicTitle": "Unsur-Unsur Lingkaran",
    "number": 11,
    "difficulty": "sulit",
    "difficultyLabel": "Sulit",
    "type": "isian-angka",
    "question": "Pada lingkaran berpusat O, jari-jari r = 13 cm. Jika panjang apotema tali busur PQ adalah 5 cm, berapakah panjang tali busur PQ dalam cm?",
    "correctAnswer": "24",
    "explanation": "Setengah tali busur = √(13² - 5²) = √(169 - 25) = √144 = 12 cm. Maka panjang tali busur PQ = 2 × 12 = 24 cm."
  },
  {
    "id": "LAT-UNS-12",
    "topic": "unsur-lingkaran",
    "topicTitle": "Unsur-Unsur Lingkaran",
    "number": 12,
    "difficulty": "sulit",
    "difficultyLabel": "Sulit",
    "type": "pilihan-ganda",
    "question": "Semua sudut keliling yang menghadap ke arah diameter lingkaran besarnya selalu...",
    "options": [
      {
        "id": "A",
        "text": "Lancip (kurang dari 90°)"
      },
      {
        "id": "B",
        "text": "Tepat 90° (siku-siku)"
      },
      {
        "id": "C",
        "text": "Tepat 180° (lurus)"
      },
      {
        "id": "D",
        "text": "Tumpul (lebih dari 90°)"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Diameter membentuk sudut pusat 180°. Oleh karena itu, sudut keliling yang menghadap diameter bernilai 1/2 × 180° = 90°."
  },
  {
    "id": "LAT-UNS-13",
    "topic": "unsur-lingkaran",
    "topicTitle": "Unsur-Unsur Lingkaran",
    "number": 13,
    "difficulty": "sulit",
    "difficultyLabel": "Sulit",
    "type": "isian-angka",
    "question": "Pada segiempat tali busur ABCD, besar sudut A adalah 68°. Berapakah besar sudut C yang berhadapan dengan sudut A dalam derajat?",
    "correctAnswer": "112",
    "explanation": "Pada segiempat tali busur, jumlah dua sudut yang berhadapan adalah 180°: ∠C = 180° - 68° = 112°."
  },
  {
    "id": "LAT-UNS-14",
    "topic": "unsur-lingkaran",
    "topicTitle": "Unsur-Unsur Lingkaran",
    "number": 14,
    "difficulty": "sulit",
    "difficultyLabel": "Sulit",
    "type": "pilihan-ganda",
    "question": "Panjang busur lingkaran dengan sudut pusat 40° adalah 6 cm. Berapakah keliling lingkaran tersebut?",
    "options": [
      {
        "id": "A",
        "text": "36 cm"
      },
      {
        "id": "B",
        "text": "48 cm"
      },
      {
        "id": "C",
        "text": "54 cm"
      },
      {
        "id": "D",
        "text": "72 cm"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Keliling = (360° / 40°) × 6 cm = 9 × 6 = 54 cm."
  },
  {
    "id": "LAT-UNS-15",
    "topic": "unsur-lingkaran",
    "topicTitle": "Unsur-Unsur Lingkaran",
    "number": 15,
    "difficulty": "sulit",
    "difficultyLabel": "Sulit",
    "type": "isian-angka",
    "question": "Dari titik P di luar lingkaran ditarik garis singgung PT ke lingkaran dengan jari-jari 8 cm. Jika jarak titik P ke pusat lingkaran O adalah 17 cm, berapakah panjang garis singgung PT dalam cm?",
    "correctAnswer": "15",
    "explanation": "Garis singgung tegak lurus jari-jari di titik singgung T: PT = √(OP² - OT²) = √(17² - 8²) = √(289 - 64) = √225 = 15 cm."
  },
  {
    "id": "LAT-UNS-16",
    "topic": "unsur-lingkaran",
    "topicTitle": "Unsur-Unsur Lingkaran",
    "number": 16,
    "difficulty": "tantangan",
    "difficultyLabel": "Tantangan",
    "type": "pilihan-ganda",
    "question": "Pada lingkaran berpusat O, tali busur AB dan CD berjarak sama dari titik pusat O. Pernyataan yang PASTI BENAR adalah...",
    "options": [
      {
        "id": "A",
        "text": "Panjang tali busur AB sama dengan panjang tali busur CD"
      },
      {
        "id": "B",
        "text": "Tali busur AB dan CD harus sejajar"
      },
      {
        "id": "C",
        "text": "Panjang busur AB dua kali busur CD"
      },
      {
        "id": "D",
        "text": "Salah satu tali busur adalah diameter"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Tali busur yang memiliki jarak apotema yang sama ke titik pusat pasti memiliki panjang yang sama besar."
  },
  {
    "id": "LAT-UNS-17",
    "topic": "unsur-lingkaran",
    "topicTitle": "Unsur-Unsur Lingkaran",
    "number": 17,
    "difficulty": "tantangan",
    "difficultyLabel": "Tantangan",
    "type": "isian-angka",
    "question": "Dua titik pada keliling lingkaran membagi lingkaran menjadi busur minor dan busur mayor dengan perbandingan 2 : 7. Berapakah besar sudut pusat busur minor dalam derajat?",
    "correctAnswer": "80",
    "explanation": "Total perbandingan = 2 + 7 = 9 bagian = 360°. Sudut busur minor = (2 / 9) × 360° = 80°."
  },
  {
    "id": "LAT-UNS-18",
    "topic": "unsur-lingkaran",
    "topicTitle": "Unsur-Unsur Lingkaran",
    "number": 18,
    "difficulty": "tantangan",
    "difficultyLabel": "Tantangan",
    "type": "pilihan-ganda",
    "question": "Diketahui segitiga sama sisi ABC terinjeksi di dalam lingkaran (segitiga dalam lingkaran). Berapakah besar sudut pusat yang menghadap busur AB?",
    "options": [
      {
        "id": "A",
        "text": "60°"
      },
      {
        "id": "B",
        "text": "90°"
      },
      {
        "id": "C",
        "text": "120°"
      },
      {
        "id": "D",
        "text": "150°"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Segitiga sama sisi membagi lingkaran menjadi 3 busur sama panjang: Sudut pusat = 360° / 3 = 120°."
  },
  {
    "id": "LAT-UNS-19",
    "topic": "unsur-lingkaran",
    "topicTitle": "Unsur-Unsur Lingkaran",
    "number": 19,
    "difficulty": "tantangan",
    "difficultyLabel": "Tantangan",
    "type": "isian-angka",
    "question": "Sebuah lingkaran memiliki jari-jari 25 cm. Jika sebuah tali busur memiliki panjang 40 cm, berapakah jarak apotema dari titik pusat ke tali busur tersebut dalam cm?",
    "correctAnswer": "15",
    "explanation": "Setengah tali busur = 40 / 2 = 20 cm. Jarak apotema = √(25² - 20²) = √(625 - 400) = √225 = 15 cm."
  },
  {
    "id": "LAT-UNS-20",
    "topic": "unsur-lingkaran",
    "topicTitle": "Unsur-Unsur Lingkaran",
    "number": 20,
    "difficulty": "tantangan",
    "difficultyLabel": "Tantangan",
    "type": "isian-angka",
    "question": "Dua buah lingkaran masing-masing berjari-jari 9 cm dan 4 cm. Jarak antara kedua pusat lingkaran adalah 13 cm. Berapakah panjang garis singgung persekutuan luar kedua lingkaran dalam cm?",
    "correctAnswer": "12",
    "explanation": "Panjang garis singgung persekutuan luar: d = √(p² - (R - r)²) = √(13² - (9 - 4)²) = √(169 - 25) = √144 = 12 cm."
  },
  {
    "id": "LAT-TIT-01",
    "topic": "kedudukan-titik",
    "topicTitle": "Kedudukan Titik terhadap Lingkaran",
    "number": 1,
    "difficulty": "mudah",
    "difficultyLabel": "Mudah",
    "type": "pilihan-ganda",
    "question": "Kedudukan titik A(3, 4) terhadap lingkaran x² + y² = 25 adalah...",
    "options": [
      {
        "id": "A",
        "text": "Di dalam lingkaran"
      },
      {
        "id": "B",
        "text": "Tepat pada lingkaran"
      },
      {
        "id": "C",
        "text": "Di luar lingkaran"
      },
      {
        "id": "D",
        "text": "Di titik pusat lingkaran"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Substitusi (3, 4): 3² + 4² = 9 + 16 = 25. Karena nilainya tepat sama dengan r² (25), titik A terletak tepat pada keliling lingkaran."
  },
  {
    "id": "LAT-TIT-02",
    "topic": "kedudukan-titik",
    "topicTitle": "Kedudukan Titik terhadap Lingkaran",
    "number": 2,
    "difficulty": "mudah",
    "difficultyLabel": "Mudah",
    "type": "pilihan-ganda",
    "question": "Kedudukan titik B(1, 2) terhadap lingkaran x² + y² = 16 adalah...",
    "options": [
      {
        "id": "A",
        "text": "Di dalam lingkaran"
      },
      {
        "id": "B",
        "text": "Pada lingkaran"
      },
      {
        "id": "C",
        "text": "Di luar lingkaran"
      },
      {
        "id": "D",
        "text": "Di sumbu simetri"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Substitusi (1, 2): 1² + 2² = 1 + 4 = 5. Karena 5 < 16 (d² < r²), titik B berada di dalam lingkaran."
  },
  {
    "id": "LAT-TIT-03",
    "topic": "kedudukan-titik",
    "topicTitle": "Kedudukan Titik terhadap Lingkaran",
    "number": 3,
    "difficulty": "mudah",
    "difficultyLabel": "Mudah",
    "type": "pilihan-ganda",
    "question": "Kedudukan titik C(4, 3) terhadap lingkaran x² + y² = 20 adalah...",
    "options": [
      {
        "id": "A",
        "text": "Di dalam lingkaran"
      },
      {
        "id": "B",
        "text": "Pada lingkaran"
      },
      {
        "id": "C",
        "text": "Di luar lingkaran"
      },
      {
        "id": "D",
        "text": "Di pusat lingkaran"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Substitusi (4, 3): 4² + 3² = 16 + 9 = 25. Karena 25 > 20 (d² > r²), titik C berada di luar lingkaran."
  },
  {
    "id": "LAT-TIT-04",
    "topic": "kedudukan-titik",
    "topicTitle": "Kedudukan Titik terhadap Lingkaran",
    "number": 4,
    "difficulty": "mudah",
    "difficultyLabel": "Mudah",
    "type": "isian-angka",
    "question": "Jika titik P(k, 0) terletak tepat pada lingkaran x² + y² = 49 dengan k > 0, berapakah nilai k?",
    "correctAnswer": "7",
    "explanation": "Substitusi (k, 0): k² + 0² = 49 ⇒ k² = 49 ⇒ k = 7 (karena k positif)."
  },
  {
    "id": "LAT-TIT-05",
    "topic": "kedudukan-titik",
    "topicTitle": "Kedudukan Titik terhadap Lingkaran",
    "number": 5,
    "difficulty": "mudah",
    "difficultyLabel": "Mudah",
    "type": "isian-angka",
    "question": "Berapakah jarak titik asal (0, 0) ke titik P(9, 12)?",
    "correctAnswer": "15",
    "explanation": "Jarak d = √(9² + 12²) = √(81 + 144) = √225 = 15."
  },
  {
    "id": "LAT-TIT-06",
    "topic": "kedudukan-titik",
    "topicTitle": "Kedudukan Titik terhadap Lingkaran",
    "number": 6,
    "difficulty": "sedang",
    "difficultyLabel": "Sedang",
    "type": "pilihan-ganda",
    "question": "Kedudukan titik P(5, 1) terhadap lingkaran (x - 2)² + (y - 1)² = 9 adalah...",
    "options": [
      {
        "id": "A",
        "text": "Di dalam lingkaran"
      },
      {
        "id": "B",
        "text": "Pada lingkaran"
      },
      {
        "id": "C",
        "text": "Di luar lingkaran"
      },
      {
        "id": "D",
        "text": "Di pusat lingkaran"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Substitusi (5, 1): (5 - 2)² + (1 - 1)² = 3² + 0² = 9. Karena sama dengan r² (9), titik P tepat pada lingkaran."
  },
  {
    "id": "LAT-TIT-07",
    "topic": "kedudukan-titik",
    "topicTitle": "Kedudukan Titik terhadap Lingkaran",
    "number": 7,
    "difficulty": "sedang",
    "difficultyLabel": "Sedang",
    "type": "isian-angka",
    "question": "Berapakah nilai kuasa K dari titik P(2, 6) terhadap lingkaran (x - 2)² + (y - 2)² = 9? (K = (x-a)² + (y-b)² - r²)",
    "correctAnswer": "7",
    "explanation": "K = (2 - 2)² + (6 - 2)² - 9 = 0 + 4² - 9 = 16 - 9 = 7."
  },
  {
    "id": "LAT-TIT-08",
    "topic": "kedudukan-titik",
    "topicTitle": "Kedudukan Titik terhadap Lingkaran",
    "number": 8,
    "difficulty": "sedang",
    "difficultyLabel": "Sedang",
    "type": "pilihan-ganda",
    "question": "Sebuah menara radar memiliki jangkauan sinyal (x - 1)² + (y + 3)² = 36. Pesawat berada di koordinat (4, 1). Posisi pesawat adalah...",
    "options": [
      {
        "id": "A",
        "text": "Di dalam jangkauan radar"
      },
      {
        "id": "B",
        "text": "Tepat pada batas radar"
      },
      {
        "id": "C",
        "text": "Di luar jangkauan radar"
      },
      {
        "id": "D",
        "text": "Di titik pusat stasiun"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Substitusi (4, 1): (4 - 1)² + (1 - (-3))² = 3² + 4² = 9 + 16 = 25. Karena 25 < 36, pesawat berada di dalam jangkauan radar."
  },
  {
    "id": "LAT-TIT-09",
    "topic": "kedudukan-titik",
    "topicTitle": "Kedudukan Titik terhadap Lingkaran",
    "number": 9,
    "difficulty": "sedang",
    "difficultyLabel": "Sedang",
    "type": "isian-angka",
    "question": "Berapakah jari-jari lingkaran x² + y² - 6x + 8y = 0?",
    "correctAnswer": "5",
    "explanation": "Pusat (-A/2, -B/2) = (3, -4). Jari-jari r = √(3² + (-4)² - 0) = √(9 + 16) = √25 = 5."
  },
  {
    "id": "LAT-TIT-10",
    "topic": "kedudukan-titik",
    "topicTitle": "Kedudukan Titik terhadap Lingkaran",
    "number": 10,
    "difficulty": "sedang",
    "difficultyLabel": "Sedang",
    "type": "pilihan-ganda",
    "question": "Kedudukan titik (-1, 3) terhadap lingkaran x² + y² - 4x + 2y - 20 = 0 adalah...",
    "options": [
      {
        "id": "A",
        "text": "Di dalam lingkaran"
      },
      {
        "id": "B",
        "text": "Pada lingkaran"
      },
      {
        "id": "C",
        "text": "Di luar lingkaran"
      },
      {
        "id": "D",
        "text": "Di pusat"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Substitusi (-1, 3): (-1)² + 3² - 4(-1) + 2(3) - 20 = 1 + 9 + 4 + 6 - 20 = 0. Karena nilainya tepat 0, titik berada tepat pada lingkaran."
  },
  {
    "id": "LAT-TIT-11",
    "topic": "kedudukan-titik",
    "topicTitle": "Kedudukan Titik terhadap Lingkaran",
    "number": 11,
    "difficulty": "sulit",
    "difficultyLabel": "Sulit",
    "type": "isian-angka",
    "question": "Titik (a, 6) terletak pada lingkaran x² + y² = 100 dengan a > 0. Berapakah nilai a?",
    "correctAnswer": "8",
    "explanation": "a² + 6² = 100 ⇒ a² + 36 = 100 ⇒ a² = 64 ⇒ a = 8."
  },
  {
    "id": "LAT-TIT-12",
    "topic": "kedudukan-titik",
    "topicTitle": "Kedudukan Titik terhadap Lingkaran",
    "number": 12,
    "difficulty": "sulit",
    "difficultyLabel": "Sulit",
    "type": "pilihan-ganda",
    "question": "Titik P(m, 2) berada di dalam lingkaran x² + y² = 13. Nilai bulat m positif terbesar yang memenuhi adalah...",
    "options": [
      {
        "id": "A",
        "text": "m = 1"
      },
      {
        "id": "B",
        "text": "m = 2"
      },
      {
        "id": "C",
        "text": "m = 3"
      },
      {
        "id": "D",
        "text": "m = 4"
      }
    ],
    "correctAnswer": "B",
    "explanation": "m² + 2² < 13 ⇒ m² < 9 ⇒ -3 < m < 3. Bilangan bulat positif terbesar yang kurang dari 3 adalah m = 2."
  },
  {
    "id": "LAT-TIT-13",
    "topic": "kedudukan-titik",
    "topicTitle": "Kedudukan Titik terhadap Lingkaran",
    "number": 13,
    "difficulty": "sulit",
    "difficultyLabel": "Sulit",
    "type": "isian-angka",
    "question": "Berapakah jarak terdekat titik P(7, 24) ke keliling lingkaran x² + y² = 100?",
    "correctAnswer": "15",
    "explanation": "Jarak P ke pusat O adalah OP = √(7² + 24²) = √625 = 25. Jari-jari lingkaran r = √100 = 10. Jarak terdekat = 25 - 10 = 15."
  },
  {
    "id": "LAT-TIT-14",
    "topic": "kedudukan-titik",
    "topicTitle": "Kedudukan Titik terhadap Lingkaran",
    "number": 14,
    "difficulty": "sulit",
    "difficultyLabel": "Sulit",
    "type": "isian-angka",
    "question": "Berapakah panjang garis singgung yang ditarik dari titik P(13, 0) ke lingkaran x² + y² = 25?",
    "correctAnswer": "12",
    "explanation": "OP = 13, r = 5. Panjang garis singgung = √(13² - 5²) = √(169 - 25) = √144 = 12."
  },
  {
    "id": "LAT-TIT-15",
    "topic": "kedudukan-titik",
    "topicTitle": "Kedudukan Titik terhadap Lingkaran",
    "number": 15,
    "difficulty": "sulit",
    "difficultyLabel": "Sulit",
    "type": "pilihan-ganda",
    "question": "Titik pusat lingkaran x² + y² - 10x + 6y + 14 = 0 adalah...",
    "options": [
      {
        "id": "A",
        "text": "(5, -3)"
      },
      {
        "id": "B",
        "text": "(-5, 3)"
      },
      {
        "id": "C",
        "text": "(10, -6)"
      },
      {
        "id": "D",
        "text": "(-10, 6)"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Pusat = (-A/2, -B/2) = (-(-10)/2, -(6)/2) = (5, -3)."
  },
  {
    "id": "LAT-TIT-16",
    "topic": "kedudukan-titik",
    "topicTitle": "Kedudukan Titik terhadap Lingkaran",
    "number": 16,
    "difficulty": "tantangan",
    "difficultyLabel": "Tantangan",
    "type": "isian-angka",
    "question": "Titik P(k, 1) terletak pada lingkaran x² + y² - 8x - 2y + 8 = 0. Berapakah nilai k jika k > 4?",
    "correctAnswer": "7",
    "explanation": "Substitusi y = 1: k² + 1 - 8k - 2 + 8 = 0 ⇒ k² - 8k + 7 = 0 ⇒ (k - 7)(k - 1) = 0. Karena k > 4, k = 7."
  },
  {
    "id": "LAT-TIT-17",
    "topic": "kedudukan-titik",
    "topicTitle": "Kedudukan Titik terhadap Lingkaran",
    "number": 17,
    "difficulty": "tantangan",
    "difficultyLabel": "Tantangan",
    "type": "pilihan-ganda",
    "question": "Titik A(1, p) berada di dalam lingkaran x² + y² - 2x - 6y - 6 = 0. Batas-batas nilai p yang memenuhi adalah...",
    "options": [
      {
        "id": "A",
        "text": "-1 < p < 7"
      },
      {
        "id": "B",
        "text": "-2 < p < 8"
      },
      {
        "id": "C",
        "text": "0 < p < 6"
      },
      {
        "id": "D",
        "text": "-3 < p < 5"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Substitusi (1, p): 1² + p² - 2(1) - 6p - 6 < 0 ⇒ p² - 6p - 7 < 0 ⇒ (p - 7)(p + 1) < 0 ⇒ -1 < p < 7."
  },
  {
    "id": "LAT-TIT-18",
    "topic": "kedudukan-titik",
    "topicTitle": "Kedudukan Titik terhadap Lingkaran",
    "number": 18,
    "difficulty": "tantangan",
    "difficultyLabel": "Tantangan",
    "type": "isian-angka",
    "question": "Lingkaran berpusat di P(4, -3) dan menyinggung sumbu X. Berapakah jari-jari lingkaran tersebut?",
    "correctAnswer": "3",
    "explanation": "Lingkaran yang menyinggung sumbu X memiliki jari-jari r = |y_pusat| = |-3| = 3."
  },
  {
    "id": "LAT-TIT-19",
    "topic": "kedudukan-titik",
    "topicTitle": "Kedudukan Titik terhadap Lingkaran",
    "number": 19,
    "difficulty": "tantangan",
    "difficultyLabel": "Tantangan",
    "type": "isian-angka",
    "question": "Berapakah jari-jari lingkaran yang berpusat di (-5, 2) dan menyinggung sumbu Y?",
    "correctAnswer": "5",
    "explanation": "Lingkaran yang menyinggung sumbu Y memiliki jari-jari r = |x_pusat| = |-5| = 5."
  },
  {
    "id": "LAT-TIT-20",
    "topic": "kedudukan-titik",
    "topicTitle": "Kedudukan Titik terhadap Lingkaran",
    "number": 20,
    "difficulty": "tantangan",
    "difficultyLabel": "Tantangan",
    "type": "isian-angka",
    "question": "Dari titik P(20, 0) ditarik garis singgung ke lingkaran x² + y² = 144. Berapakah panjang garis singgung tersebut?",
    "correctAnswer": "16",
    "explanation": "OP = 20, r = √144 = 12. Panjang garis singgung = √(20² - 12²) = √(400 - 144) = √256 = 16."
  },
  {
    "id": "LAT-GAR-01",
    "topic": "kedudukan-garis",
    "topicTitle": "Kedudukan Garis terhadap Lingkaran",
    "number": 1,
    "difficulty": "mudah",
    "difficultyLabel": "Mudah",
    "type": "pilihan-ganda",
    "question": "Jika persamaan kuadrat sekutu antara garis dan lingkaran memiliki nilai diskriminan D > 0, kedudukan garis terhadap lingkaran adalah...",
    "options": [
      {
        "id": "A",
        "text": "Memotong lingkaran di dua titik berbeda"
      },
      {
        "id": "B",
        "text": "Menyinggung lingkaran di tepat satu titik"
      },
      {
        "id": "C",
        "text": "Tidak memotong maupun menyinggung lingkaran"
      },
      {
        "id": "D",
        "text": "Melewati titik pusat lingkaran"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Nilai diskriminan D > 0 memiliki dua akar real berbeda, yang berarti garis memotong lingkaran di dua titik sekutu (garis potong / sekan)."
  },
  {
    "id": "LAT-GAR-02",
    "topic": "kedudukan-garis",
    "topicTitle": "Kedudukan Garis terhadap Lingkaran",
    "number": 2,
    "difficulty": "mudah",
    "difficultyLabel": "Mudah",
    "type": "pilihan-ganda",
    "question": "Kedudukan garis horizontal y = 5 terhadap lingkaran x² + y² = 25 adalah...",
    "options": [
      {
        "id": "A",
        "text": "Memotong di dua titik"
      },
      {
        "id": "B",
        "text": "Menyinggung di satu titik"
      },
      {
        "id": "C",
        "text": "Di luar lingkaran"
      },
      {
        "id": "D",
        "text": "Tepat di diameter"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Jari-jari r = 5. Garis y = 5 berjarak tepat 5 satuan dari pusat (0,0), sehingga garis menyinggung lingkaran di titik (0, 5)."
  },
  {
    "id": "LAT-GAR-03",
    "topic": "kedudukan-garis",
    "topicTitle": "Kedudukan Garis terhadap Lingkaran",
    "number": 3,
    "difficulty": "mudah",
    "difficultyLabel": "Mudah",
    "type": "pilihan-ganda",
    "question": "Kedudukan garis vertikal x = 2 terhadap lingkaran x² + y² = 16 adalah...",
    "options": [
      {
        "id": "A",
        "text": "Memotong lingkaran di dua titik"
      },
      {
        "id": "B",
        "text": "Menyinggung lingkaran"
      },
      {
        "id": "C",
        "text": "Berada di luar lingkaran"
      },
      {
        "id": "D",
        "text": "Melewati titik pusat"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Jarak garis ke pusat adalah d = 2. Jari-jari lingkaran r = 4. Karena d < r (2 < 4), garis memotong lingkaran di dua titik."
  },
  {
    "id": "LAT-GAR-04",
    "topic": "kedudukan-garis",
    "topicTitle": "Kedudukan Garis terhadap Lingkaran",
    "number": 4,
    "difficulty": "mudah",
    "difficultyLabel": "Mudah",
    "type": "isian-angka",
    "question": "Berapakah jarak d dari titik pusat (0, 0) ke garis horizontal y = 8?",
    "correctAnswer": "8",
    "explanation": "Jarak titik pusat (0, 0) ke garis y = 8 adalah |8 - 0| = 8."
  },
  {
    "id": "LAT-GAR-05",
    "topic": "kedudukan-garis",
    "topicTitle": "Kedudukan Garis terhadap Lingkaran",
    "number": 5,
    "difficulty": "mudah",
    "difficultyLabel": "Mudah",
    "type": "pilihan-ganda",
    "question": "Jika diskriminan D < 0, maka kedudukan garis terhadap lingkaran adalah...",
    "options": [
      {
        "id": "A",
        "text": "Memotong di dua titik"
      },
      {
        "id": "B",
        "text": "Menyinggung di satu titik"
      },
      {
        "id": "C",
        "text": "Tidak berpotongan (di luar lingkaran)"
      },
      {
        "id": "D",
        "text": "Membagi lingkaran menjadi dua juring"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Nilai D < 0 menunjukkan tidak ada titik potong real, sehingga garis berada di luar lingkaran."
  },
  {
    "id": "LAT-GAR-06",
    "topic": "kedudukan-garis",
    "topicTitle": "Kedudukan Garis terhadap Lingkaran",
    "number": 6,
    "difficulty": "sedang",
    "difficultyLabel": "Sedang",
    "type": "pilihan-ganda",
    "question": "Kedudukan garis y = x terhadap lingkaran x² + y² = 18 adalah...",
    "options": [
      {
        "id": "A",
        "text": "Memotong di dua titik"
      },
      {
        "id": "B",
        "text": "Menyinggung di satu titik"
      },
      {
        "id": "C",
        "text": "Tidak memotong lingkaran"
      },
      {
        "id": "D",
        "text": "Melewati pusat saja"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Substitusi y = x: x² + x² = 18 ⇒ 2x² = 18 ⇒ x² = 9 ⇒ x = ±3. Garis memotong di dua titik (3, 3) dan (-3, -3)."
  },
  {
    "id": "LAT-GAR-07",
    "topic": "kedudukan-garis",
    "topicTitle": "Kedudukan Garis terhadap Lingkaran",
    "number": 7,
    "difficulty": "sedang",
    "difficultyLabel": "Sedang",
    "type": "isian-angka",
    "question": "Berapakah nilai diskriminan (D) dari sistem garis y = 3 dan lingkaran x² + y² = 25?",
    "correctAnswer": "64",
    "explanation": "Substitusi y = 3: x² + 9 = 25 ⇒ x² - 16 = 0. Nilai a = 1, b = 0, c = -16. Diskriminan D = b² - 4ac = 0 - 4(1)(-16) = 64."
  },
  {
    "id": "LAT-GAR-08",
    "topic": "kedudukan-garis",
    "topicTitle": "Kedudukan Garis terhadap Lingkaran",
    "number": 8,
    "difficulty": "sedang",
    "difficultyLabel": "Sedang",
    "type": "pilihan-ganda",
    "question": "Kedudukan garis y = 2x + 5 terhadap lingkaran x² + y² = 5 adalah...",
    "options": [
      {
        "id": "A",
        "text": "Memotong di dua titik"
      },
      {
        "id": "B",
        "text": "Menyinggung lingkaran di satu titik"
      },
      {
        "id": "C",
        "text": "Tidak memotong lingkaran"
      },
      {
        "id": "D",
        "text": "Melewati pusat lingkaran"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Substitusi: x² + (2x + 5)² = 5 ⇒ 5x² + 20x + 20 = 0 ⇒ x² + 4x + 4 = 0 ⇒ (x + 2)² = 0. Diskriminan D = 0, sehingga garis menyinggung di (-2, 1)."
  },
  {
    "id": "LAT-GAR-09",
    "topic": "kedudukan-garis",
    "topicTitle": "Kedudukan Garis terhadap Lingkaran",
    "number": 9,
    "difficulty": "sedang",
    "difficultyLabel": "Sedang",
    "type": "isian-angka",
    "question": "Berapakah jarak d dari pusat (0, 0) ke garis 3x + 4y - 15 = 0?",
    "correctAnswer": "3",
    "explanation": "Jarak d = |3(0) + 4(0) - 15| / √(3² + 4²) = 15 / 5 = 3."
  },
  {
    "id": "LAT-GAR-10",
    "topic": "kedudukan-garis",
    "topicTitle": "Kedudukan Garis terhadap Lingkaran",
    "number": 10,
    "difficulty": "sedang",
    "difficultyLabel": "Sedang",
    "type": "pilihan-ganda",
    "question": "Kedudukan garis 3x + 4y - 25 = 0 terhadap lingkaran x² + y² = 25 adalah...",
    "options": [
      {
        "id": "A",
        "text": "Memotong di dua titik"
      },
      {
        "id": "B",
        "text": "Menyinggung di satu titik"
      },
      {
        "id": "C",
        "text": "Berada di luar lingkaran"
      },
      {
        "id": "D",
        "text": "Melewati pusat"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Jarak d = |3(0) + 4(0) - 25| / 5 = 25 / 5 = 5. Jari-jari r = 5. Karena d = r, garis menyinggung lingkaran."
  },
  {
    "id": "LAT-GAR-11",
    "topic": "kedudukan-garis",
    "topicTitle": "Kedudukan Garis terhadap Lingkaran",
    "number": 11,
    "difficulty": "sulit",
    "difficultyLabel": "Sulit",
    "type": "isian-angka",
    "question": "Berapakah nilai konstanta k positif agar garis y = 2x + k menyinggung lingkaran x² + y² = 5?",
    "correctAnswer": "5",
    "explanation": "Rumus garis singgung: k = r√(1 + m²) = √5 × √(1 + 2²) = √5 × √5 = 5."
  },
  {
    "id": "LAT-GAR-12",
    "topic": "kedudukan-garis",
    "topicTitle": "Kedudukan Garis terhadap Lingkaran",
    "number": 12,
    "difficulty": "sulit",
    "difficultyLabel": "Sulit",
    "type": "pilihan-ganda",
    "question": "Garis 4x - 3y + 20 = 0 terhadap lingkaran x² + y² = 9 berkedudukan...",
    "options": [
      {
        "id": "A",
        "text": "Memotong di dua titik"
      },
      {
        "id": "B",
        "text": "Menyinggung"
      },
      {
        "id": "C",
        "text": "Berada di luar lingkaran"
      },
      {
        "id": "D",
        "text": "Melewati pusat"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Jarak d = |4(0) - 3(0) + 20| / √(4² + (-3)²) = 20 / 5 = 4. Jari-jari r = √9 = 3. Karena d > r (4 > 3), garis berada di luar lingkaran."
  },
  {
    "id": "LAT-GAR-13",
    "topic": "kedudukan-garis",
    "topicTitle": "Kedudukan Garis terhadap Lingkaran",
    "number": 13,
    "difficulty": "sulit",
    "difficultyLabel": "Sulit",
    "type": "isian-angka",
    "question": "Berapakah nilai c positif agar garis y = x + c menyinggung lingkaran x² + y² = 18?",
    "correctAnswer": "6",
    "explanation": "c = r√(1 + m²) = √18 × √(1 + 1²) = √18 × √2 = √36 = 6."
  },
  {
    "id": "LAT-GAR-14",
    "topic": "kedudukan-garis",
    "topicTitle": "Kedudukan Garis terhadap Lingkaran",
    "number": 14,
    "difficulty": "sulit",
    "difficultyLabel": "Sulit",
    "type": "pilihan-ganda",
    "question": "Persamaan garis singgung lingkaran x² + y² = 25 di titik (3, 4) adalah...",
    "options": [
      {
        "id": "A",
        "text": "3x + 4y = 25"
      },
      {
        "id": "B",
        "text": "4x + 3y = 25"
      },
      {
        "id": "C",
        "text": "3x - 4y = 25"
      },
      {
        "id": "D",
        "text": "-3x + 4y = 25"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Persamaan garis singgung di titik (x1, y1) pada lingkaran x² + y² = r² adalah x1·x + y1·y = r² ⇒ 3x + 4y = 25."
  },
  {
    "id": "LAT-GAR-15",
    "topic": "kedudukan-garis",
    "topicTitle": "Kedudukan Garis terhadap Lingkaran",
    "number": 15,
    "difficulty": "sulit",
    "difficultyLabel": "Sulit",
    "type": "isian-angka",
    "question": "Berapakah nilai konstanta k positif agar garis horizontal y = k menyinggung lingkaran (x - 2)² + (y - 3)² = 16 di bagian paling atas?",
    "correctAnswer": "7",
    "explanation": "Pusat di (2, 3), jari-jari r = √16 = 4. Garis horizontal tertinggi adalah y = y_pusat + r = 3 + 4 = 7."
  },
  {
    "id": "LAT-GAR-16",
    "topic": "kedudukan-garis",
    "topicTitle": "Kedudukan Garis terhadap Lingkaran",
    "number": 16,
    "difficulty": "tantangan",
    "difficultyLabel": "Tantangan",
    "type": "pilihan-ganda",
    "question": "Garis x + y = c memotong lingkaran x² + y² = 8 di dua titik berbeda jika dan hanya jika...",
    "options": [
      {
        "id": "A",
        "text": "-4 < c < 4"
      },
      {
        "id": "B",
        "text": "c < -4 atau c > 4"
      },
      {
        "id": "C",
        "text": "-8 < c < 8"
      },
      {
        "id": "D",
        "text": "c = 4"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Jarak d = |c| / √2. Syarat memotong di dua titik: d < r ⇒ |c| / √2 < √8 ⇒ |c| < √16 = 4 ⇒ -4 < c < 4."
  },
  {
    "id": "LAT-GAR-17",
    "topic": "kedudukan-garis",
    "topicTitle": "Kedudukan Garis terhadap Lingkaran",
    "number": 17,
    "difficulty": "tantangan",
    "difficultyLabel": "Tantangan",
    "type": "isian-angka",
    "question": "Berapakah nilai c bulat positif terbesar agar garis y = -x + c memotong lingkaran x² + y² = 18 di dua titik berbeda?",
    "correctAnswer": "5",
    "explanation": "Jarak d = |c| / √2 < √18 ⇒ |c| < 6. Karena c adalah bilangan bulat positif dan c < 6, nilai terbesar yang mungkin adalah c = 5."
  },
  {
    "id": "LAT-GAR-18",
    "topic": "kedudukan-garis",
    "topicTitle": "Kedudukan Garis terhadap Lingkaran",
    "number": 18,
    "difficulty": "tantangan",
    "difficultyLabel": "Tantangan",
    "type": "pilihan-ganda",
    "question": "Persamaan garis singgung lingkaran (x - 1)² + (y - 2)² = 25 di titik (4, 6) adalah...",
    "options": [
      {
        "id": "A",
        "text": "3x + 4y - 36 = 0"
      },
      {
        "id": "B",
        "text": "3x + 4y + 36 = 0"
      },
      {
        "id": "C",
        "text": "4x + 3y - 36 = 0"
      },
      {
        "id": "D",
        "text": "3x - 4y + 16 = 0"
      }
    ],
    "correctAnswer": "A",
    "explanation": "(x1 - a)(x - a) + (y1 - b)(y - b) = r² ⇒ (4 - 1)(x - 1) + (6 - 2)(y - 2) = 25 ⇒ 3(x - 1) + 4(y - 2) = 25 ⇒ 3x - 3 + 4y - 8 = 25 ⇒ 3x + 4y - 36 = 0."
  },
  {
    "id": "LAT-GAR-19",
    "topic": "kedudukan-garis",
    "topicTitle": "Kedudukan Garis terhadap Lingkaran",
    "number": 19,
    "difficulty": "tantangan",
    "difficultyLabel": "Tantangan",
    "type": "isian-angka",
    "question": "Berapakah panjang tali busur yang terbentuk dari perpotongan garis horizontal y = 3 dengan lingkaran x² + y² = 25?",
    "correctAnswer": "8",
    "explanation": "Substitusi y = 3: x² + 9 = 25 ⇒ x² = 16 ⇒ x = ±4. Titik potong adalah (-4, 3) dan (4, 3). Panjang tali busur = 4 - (-4) = 8."
  },
  {
    "id": "LAT-GAR-20",
    "topic": "kedudukan-garis",
    "topicTitle": "Kedudukan Garis terhadap Lingkaran",
    "number": 20,
    "difficulty": "tantangan",
    "difficultyLabel": "Tantangan",
    "type": "isian-angka",
    "question": "Garis y = 3x + c menyinggung lingkaran x² + y² = 10. Berapakah nilai c positif?",
    "correctAnswer": "10",
    "explanation": "c = r√(1 + m²) = √10 × √(1 + 3²) = √10 × √10 = 10."
  }
];

export function getQuestionsByTopic(topicId: LatihanTopicId): LatihanQuestion[] {
  return LATIHAN_QUESTIONS.filter((q) => q.topic === topicId).sort((a, b) => a.number - b.number);
}
