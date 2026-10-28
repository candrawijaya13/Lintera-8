'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Info,
  X,
  Play,
  BookOpen,
  FileText,
  Gamepad2,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  HelpCircle,
  Lightbulb,
  Compass,
  ArrowRight
} from 'lucide-react';

// Type definitions
type TabType = 'video' | 'materi' | 'contoh' | 'latihan';

interface ExampleStep {
  stepNumber: number;
  title: string;
  description: string;
  mathContent: React.ReactNode;
  lunaHint: string;
}

interface ExampleData {
  id: number;
  title: string;
  problem: string;
  circleEquation: string;
  center: string;
  radiusSq: number;
  radius: number;
  point: { name: string; x: number; y: number };
  steps: ExampleStep[];
  conclusion: {
    resultValue: number;
    comparison: '<' | '=' | '>';
    statusText: string;
    statusColor: string;
    badgeBg: string;
    explanation: string;
  };
}

interface QuizQuestion {
  id: number;
  question: string;
  pointName: string;
  pointCoord: [number, number];
  circleEquationText: string;
  calcSteps: string[];
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export default function KedudukanTitikPage() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<TabType>('video');
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

  // Tab 2 (Materi) Interactive Explorer State
  const [simPointX, setSimPointX] = useState<number>(3);
  const [simPointY, setSimPointY] = useState<number>(4);
  const simRadius = 5;
  const simRadiusSq = 25;
  const simDistSq = simPointX * simPointX + simPointY * simPointY;

  let simStatus: 'inside' | 'on' | 'outside' = 'inside';
  if (simDistSq === simRadiusSq) simStatus = 'on';
  else if (simDistSq > simRadiusSq) simStatus = 'outside';

  // Tab 3 (Contoh Soal) State
  const [activeExampleIndex, setActiveExampleIndex] = useState<number>(0);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // Tab 4 (Latihan Interaktif) State
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<number, boolean>>({});
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Sound effect helper
  const playSound = (type: 'correct' | 'wrong' | 'click' | 'step') => {
    if (typeof window === 'undefined') return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      const now = audioCtx.currentTime;
      if (type === 'correct') {
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'wrong') {
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.setValueAtTime(220, now + 0.15);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'step') {
        osc.frequency.setValueAtTime(587.33, now); // D5
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else {
        osc.frequency.setValueAtTime(440, now);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      }
    } catch {
      // Audio not supported or blocked by policy
    }
  };

  // Examples dataset
  const examplesData: ExampleData[] = [
    {
      id: 1,
      title: 'Contoh 1: Titik terhadap x² + y² = r²',
      problem: 'Tentukan kedudukan titik P(4, 3) terhadap lingkaran x² + y² = 25!',
      circleEquation: 'x² + y² = 25',
      center: 'O(0, 0)',
      radiusSq: 25,
      radius: 5,
      point: { name: 'P', x: 4, y: 3 },
      steps: [
        {
          stepNumber: 1,
          title: 'Identifikasi Persamaan & Titik',
          description: 'Catat rumus persamaan lingkaran dan koordinat titik yang diuji.',
          mathContent: (
            <div className="space-y-2 text-sm sm:text-base">
              <p className="font-semibold text-slate-700">• Persamaan lingkaran: <span className="font-mono text-[#123B8A] font-bold">x² + y² = 25</span> (pusat (0, 0), r² = 25)</p>
              <p className="font-semibold text-slate-700">• Titik yang diuji: <span className="font-mono text-[#2875FB] font-bold">P(x₁, y₁) = P(4, 3)</span> → x₁ = 4, y₁ = 3</p>
            </div>
          ),
          lunaHint: 'Perhatikan nilai x = 4 dan y = 3 yang akan kita substitusikan ke ruas kiri!'
        },
        {
          stepNumber: 2,
          title: 'Substitusi Titik ke Ruas Kiri (Kuasa Titik)',
          description: 'Gantikan variabel x dan y pada ruas kiri persamaan dengan koordinat titik P.',
          mathContent: (
            <div className="space-y-2 text-sm sm:text-base">
              <p className="text-slate-700">Ruas kiri = <span className="font-mono font-bold text-slate-800">x² + y²</span></p>
              <p className="text-slate-700">Substitusikan x = 4 dan y = 3:</p>
              <p className="font-mono text-base sm:text-lg font-black text-[#123B8A] bg-blue-50/70 p-3 rounded-xl border border-blue-200">
                Ruas kiri = (4)² + (3)²
              </p>
            </div>
          ),
          lunaHint: 'Pangkatkan masing-masing bilangan terlebih dahulu sebelum menjumlahkannya!'
        },
        {
          stepNumber: 3,
          title: 'Hitung Hasil Nilai Ruas Kiri',
          description: 'Lakukan operasi kuadrat dan penjumlahan.',
          mathContent: (
            <div className="space-y-2 text-sm sm:text-base">
              <p className="font-mono text-base sm:text-lg font-black text-[#123B8A] bg-blue-50/70 p-3 rounded-xl border border-blue-200">
                (4)² + (3)² = 16 + 9 = 25
              </p>
              <p className="text-slate-700">Jadi, nilai ruas kiri diperoleh sebesar <span className="font-mono font-bold text-emerald-600 text-lg">25</span>.</p>
            </div>
          ),
          lunaHint: 'Hasilnya adalah 25. Sekarang kita bandingkan dengan r² pada ruas kanan.'
        },
        {
          stepNumber: 4,
          title: 'Bandingkan dengan Nilai r²',
          description: 'Bandingkan nilai ruas kiri (25) dengan nilai ruas kanan r² (25).',
          mathContent: (
            <div className="space-y-3 text-sm sm:text-base">
              <div className="flex items-center gap-4 bg-emerald-50 border border-emerald-300 p-4 rounded-xl">
                <span className="font-mono text-lg font-black text-[#123B8A]">25</span>
                <span className="font-black text-xl text-emerald-600">=</span>
                <span className="font-mono text-lg font-black text-[#123B8A]">25 (r²)</span>
              </div>
              <p className="text-emerald-800 font-semibold">
                Karena ruas kiri <span className="font-black">sama dengan</span> r² (25 = 25), maka titik berjarak tepat sama dengan jari-jari lingkaran.
              </p>
            </div>
          ),
          lunaHint: 'Nilai ruas kiri sama dengan r²! Artinya titik terletak tepat pada keliling lingkaran.'
        }
      ],
      conclusion: {
        resultValue: 25,
        comparison: '=',
        statusText: 'Titik P(4, 3) terletak TEPAT PADA LINGKARAN',
        statusColor: '#10B981',
        badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        explanation: 'Jarak titik P(4, 3) ke pusat O(0, 0) adalah √(4² + 3²) = √25 = 5 satuan, yang tepat sama dengan jari-jari lingkaran (r = 5).'
      }
    },
    {
      id: 2,
      title: 'Contoh 2: Titik terhadap (x - a)² + (y - b)² = r²',
      problem: 'Tentukan kedudukan titik Q(1, 2) terhadap lingkaran (x - 3)² + (y + 1)² = 16!',
      circleEquation: '(x - 3)² + (y + 1)² = 16',
      center: 'M(3, -1)',
      radiusSq: 16,
      radius: 4,
      point: { name: 'Q', x: 1, y: 2 },
      steps: [
        {
          stepNumber: 1,
          title: 'Identifikasi Persamaan & Titik',
          description: 'Lingkaran berpusat di M(3, -1) dengan jari-jari kuadrat r² = 16.',
          mathContent: (
            <div className="space-y-2 text-sm sm:text-base">
              <p className="font-semibold text-slate-700">• Persamaan: <span className="font-mono text-[#123B8A] font-bold">(x - 3)² + (y + 1)² = 16</span></p>
              <p className="font-semibold text-slate-700">• Titik uji: <span className="font-mono text-[#2875FB] font-bold">Q(x₁, y₁) = Q(1, 2)</span> → x₁ = 1, y₁ = 2</p>
            </div>
          ),
          lunaHint: 'Ingat bahwa pusatnya adalah (3, -1) karena bentuk persamaannya (x - a)² + (y - b)²!'
        },
        {
          stepNumber: 2,
          title: 'Substitusi Koordinat Titik Q ke Ruas Kiri',
          description: 'Gantikan x dengan 1 dan y dengan 2 pada ruas kiri.',
          mathContent: (
            <div className="space-y-2 text-sm sm:text-base">
              <p className="text-slate-700">Ruas kiri = <span className="font-mono font-bold text-slate-800">(x - 3)² + (y + 1)²</span></p>
              <p className="font-mono text-base sm:text-lg font-black text-[#123B8A] bg-blue-50/70 p-3 rounded-xl border border-blue-200">
                Ruas kiri = (1 - 3)² + (2 + 1)²
              </p>
            </div>
          ),
          lunaHint: 'Selesaikan operasi di dalam kurung terlebih dahulu: (1 - 3) = -2 dan (2 + 1) = 3.'
        },
        {
          stepNumber: 3,
          title: 'Hitung Hasil Nilai Ruas Kiri',
          description: 'Kuadratkan nilai di dalam kurung.',
          mathContent: (
            <div className="space-y-2 text-sm sm:text-base">
              <p className="font-mono text-base sm:text-lg font-black text-[#123B8A] bg-blue-50/70 p-3 rounded-xl border border-blue-200">
                (-2)² + (3)² = 4 + 9 = 13
              </p>
              <p className="text-slate-700">Jadi, nilai ruas kiri diperoleh sebesar <span className="font-mono font-bold text-[#2875FB] text-lg">13</span>.</p>
            </div>
          ),
          lunaHint: 'Ingat (-2)² bernilai positif 4! Jumlah totalnya adalah 13.'
        },
        {
          stepNumber: 4,
          title: 'Bandingkan dengan Nilai r²',
          description: 'Bandingkan nilai ruas kiri (13) dengan nilai ruas kanan r² (16).',
          mathContent: (
            <div className="space-y-3 text-sm sm:text-base">
              <div className="flex items-center gap-4 bg-blue-50 border border-blue-300 p-4 rounded-xl">
                <span className="font-mono text-lg font-black text-[#123B8A]">13</span>
                <span className="font-black text-xl text-[#2875FB]">&lt;</span>
                <span className="font-mono text-lg font-black text-[#123B8A]">16 (r²)</span>
              </div>
              <p className="text-[#123B8A] font-semibold">
                Karena ruas kiri <span className="font-black">lebih kecil</span> dari r² (13 &lt; 16), titik berada lebih dekat ke pusat dibandingkan panjang jari-jarinya.
              </p>
            </div>
          ),
          lunaHint: '13 lebih kecil dari 16, maka titik pasti berada di dalam daerah lingkaran!'
        }
      ],
      conclusion: {
        resultValue: 13,
        comparison: '<',
        statusText: 'Titik Q(1, 2) terletak DI DALAM LINGKARAN',
        statusColor: '#2875FB',
        badgeBg: 'bg-blue-100 text-blue-900 border-blue-300',
        explanation: 'Jarak titik Q(1, 2) ke pusat M(3, -1) adalah √13 ≈ 3,61 satuan, lebih kecil dari jari-jari lingkaran r = √16 = 4 satuan.'
      }
    },
    {
      id: 3,
      title: 'Contoh 3: Titik di Luar Lingkaran',
      problem: 'Tentukan kedudukan titik R(5, 5) terhadap lingkaran x² + y² = 20!',
      circleEquation: 'x² + y² = 20',
      center: 'O(0, 0)',
      radiusSq: 20,
      radius: 4.47,
      point: { name: 'R', x: 5, y: 5 },
      steps: [
        {
          stepNumber: 1,
          title: 'Identifikasi Persamaan & Titik',
          description: 'Lingkaran berpusat di O(0, 0) dengan r² = 20.',
          mathContent: (
            <div className="space-y-2 text-sm sm:text-base">
              <p className="font-semibold text-slate-700">• Persamaan: <span className="font-mono text-[#123B8A] font-bold">x² + y² = 20</span> (r² = 20)</p>
              <p className="font-semibold text-slate-700">• Titik uji: <span className="font-mono text-[#2875FB] font-bold">R(5, 5)</span> → x₁ = 5, y₁ = 5</p>
            </div>
          ),
          lunaHint: 'Kedua koordinat bernilai 5. Mari substitusikan ke persamaan.'
        },
        {
          stepNumber: 2,
          title: 'Substitusi ke Ruas Kiri',
          description: 'Masukkan nilai x = 5 dan y = 5.',
          mathContent: (
            <div className="space-y-2 text-sm sm:text-base">
              <p className="text-slate-700">Ruas kiri = <span className="font-mono font-bold text-slate-800">x² + y²</span></p>
              <p className="font-mono text-base sm:text-lg font-black text-[#123B8A] bg-blue-50/70 p-3 rounded-xl border border-blue-200">
                Ruas kiri = (5)² + (5)²
              </p>
            </div>
          ),
          lunaHint: '5² = 25. Jadi kita punya 25 + 25.'
        },
        {
          stepNumber: 3,
          title: 'Hitung Hasil Nilai Ruas Kiri',
          description: 'Lakukan penjumlahan kuadrat.',
          mathContent: (
            <div className="space-y-2 text-sm sm:text-base">
              <p className="font-mono text-base sm:text-lg font-black text-[#123B8A] bg-blue-50/70 p-3 rounded-xl border border-blue-200">
                25 + 25 = 50
              </p>
              <p className="text-slate-700">Nilai ruas kiri adalah <span className="font-mono font-bold text-orange-600 text-lg">50</span>.</p>
            </div>
          ),
          lunaHint: '50 jauh lebih besar dibandingkan dengan nilai r² = 20!'
        },
        {
          stepNumber: 4,
          title: 'Bandingkan dengan Nilai r²',
          description: 'Bandingkan nilai ruas kiri (50) dengan nilai ruas kanan r² (20).',
          mathContent: (
            <div className="space-y-3 text-sm sm:text-base">
              <div className="flex items-center gap-4 bg-orange-50 border border-orange-300 p-4 rounded-xl">
                <span className="font-mono text-lg font-black text-[#123B8A]">50</span>
                <span className="font-black text-xl text-[#F57200]">&gt;</span>
                <span className="font-mono text-lg font-black text-[#123B8A]">20 (r²)</span>
              </div>
              <p className="text-orange-950 font-semibold">
                Karena ruas kiri <span className="font-black">lebih besar</span> dari r² (50 &gt; 20), titik berada di luar batas keliling lingkaran.
              </p>
            </div>
          ),
          lunaHint: 'Nilainya melampaui r², membuktikan titik berada di luar lingkaran!'
        }
      ],
      conclusion: {
        resultValue: 50,
        comparison: '>',
        statusText: 'Titik R(5, 5) terletak DI LUAR LINGKARAN',
        statusColor: '#F57200',
        badgeBg: 'bg-orange-100 text-orange-900 border-orange-300',
        explanation: 'Jarak titik R(5, 5) ke pusat O(0, 0) adalah √50 ≈ 7,07 satuan, yang lebih besar daripada jari-jari lingkaran (r = √20 ≈ 4,47 satuan).'
      }
    }
  ];

  const currentExample = examplesData[activeExampleIndex];

  // Quiz Questions dataset
  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: 'Tentukan kedudukan titik A(1, 2) terhadap lingkaran x² + y² = 9!',
      pointName: 'A',
      pointCoord: [1, 2],
      circleEquationText: 'x² + y² = 9',
      calcSteps: [
        'Substitusi titik A(1, 2): (1)² + (2)² = 1 + 4 = 5',
        'Bandingkan dengan r² = 9:',
        '5 < 9 (ruas kiri < r²)'
      ],
      options: [
        { id: 'inside', text: 'Di Dalam Lingkaran', isCorrect: true },
        { id: 'on', text: 'Tepat Pada Lingkaran', isCorrect: false },
        { id: 'outside', text: 'Di Luar Lingkaran', isCorrect: false }
      ],
      explanation: 'Karena (1)² + (2)² = 5 < 9, maka titik A(1, 2) berada di dalam lingkaran.'
    },
    {
      id: 2,
      question: 'Tentukan kedudukan titik B(3, 4) terhadap lingkaran x² + y² = 25!',
      pointName: 'B',
      pointCoord: [3, 4],
      circleEquationText: 'x² + y² = 25',
      calcSteps: [
        'Substitusi titik B(3, 4): (3)² + (4)² = 9 + 16 = 25',
        'Bandingkan dengan r² = 25:',
        '25 = 25 (ruas kiri = r²)'
      ],
      options: [
        { id: 'inside', text: 'Di Dalam Lingkaran', isCorrect: false },
        { id: 'on', text: 'Tepat Pada Lingkaran', isCorrect: true },
        { id: 'outside', text: 'Di Luar Lingkaran', isCorrect: false }
      ],
      explanation: 'Karena (3)² + (4)² = 25 = 25, maka titik B(3, 4) terletak tepat pada keliling lingkaran.'
    },
    {
      id: 3,
      question: 'Tentukan kedudukan titik C(4, 2) terhadap lingkaran (x - 1)² + (y + 2)² = 16!',
      pointName: 'C',
      pointCoord: [4, 2],
      circleEquationText: '(x - 1)² + (y + 2)² = 16',
      calcSteps: [
        'Substitusi titik C(4, 2): (4 - 1)² + (2 + 2)² = (3)² + (4)² = 9 + 16 = 25',
        'Bandingkan dengan r² = 16:',
        '25 > 16 (ruas kiri > r²)'
      ],
      options: [
        { id: 'inside', text: 'Di Dalam Lingkaran', isCorrect: false },
        { id: 'on', text: 'Tepat Pada Lingkaran', isCorrect: false },
        { id: 'outside', text: 'Di Luar Lingkaran', isCorrect: true }
      ],
      explanation: 'Karena (4 - 1)² + (2 + 2)² = 25 > 16, maka titik C(4, 2) berada di luar lingkaran.'
    },
    {
      id: 4,
      question: 'Tentukan kedudukan titik D(-2, 1) terhadap lingkaran (x + 2)² + (y - 1)² = 4!',
      pointName: 'D',
      pointCoord: [-2, 1],
      circleEquationText: '(x + 2)² + (y - 1)² = 4',
      calcSteps: [
        'Substitusi titik D(-2, 1): (-2 + 2)² + (1 - 1)² = 0² + 0² = 0',
        'Bandingkan dengan r² = 4:',
        '0 < 4 (titik tepat berada di titik pusat lingkaran!)'
      ],
      options: [
        { id: 'inside', text: 'Di Dalam Lingkaran', isCorrect: true },
        { id: 'on', text: 'Tepat Pada Lingkaran', isCorrect: false },
        { id: 'outside', text: 'Di Luar Lingkaran', isCorrect: false }
      ],
      explanation: 'Karena (-2 + 2)² + (1 - 1)² = 0 < 4, titik D berada di dalam lingkaran, bahkan tepat berada di pusat lingkaran (-2, 1).'
    }
  ];

  const currentQuiz = quizQuestions[currentQuizIndex];

  const handleSelectQuizOption = (optionId: string) => {
    if (quizSubmitted[currentQuizIndex]) return;
    playSound('click');
    setSelectedAnswers(prev => ({ ...prev, [currentQuizIndex]: optionId }));
  };

  const handleConfirmQuizAnswer = () => {
    const selected = selectedAnswers[currentQuizIndex];
    if (!selected) return;

    const isCorrect = currentQuiz.options.find(o => o.id === selected)?.isCorrect;
    if (isCorrect) {
      playSound('correct');
      setQuizScore(prev => prev + 25);
    } else {
      playSound('wrong');
    }

    setQuizSubmitted(prev => ({ ...prev, [currentQuizIndex]: true }));
  };

  const handleNextQuizQuestion = () => {
    playSound('step');
    if (currentQuizIndex < quizQuestions.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    playSound('step');
    setSelectedAnswers({});
    setQuizSubmitted({});
    setCurrentQuizIndex(0);
    setQuizScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#63C9F4] font-sans select-none flex flex-col lg:flex-row overflow-x-hidden">
      
      {/* Decorative Background Circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-1/4 w-80 h-80 rounded-full bg-white/10" />
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 rounded-full bg-white/10" />
        <div className="absolute top-1/2 right-12 w-28 h-28 rounded-full bg-white/15" />
        <div className="absolute bottom-12 left-12 w-20 h-20 rounded-full bg-white/15" />
        <div className="absolute top-24 right-[20%] w-3 h-3 rounded-full bg-white/60" />
        <div className="absolute top-44 left-[22%] w-2.5 h-2.5 rounded-full bg-white/50" />
      </div>

      {/* =========================================================================
          1. SIDEBAR KIRI (Lebar ~18-20% pada desktop, konsisten dengan Unsur Lingkaran)
      ========================================================================= */}
      <aside className="w-full lg:w-72 xl:w-80 bg-[#2875FB] text-white flex flex-col justify-between shrink-0 z-20 shadow-xl border-r border-blue-400/40 p-4 sm:p-6 relative">
        
        <div>
          {/* Brand Header di Sidebar */}
          <Link href="/dashboard" className="flex items-center gap-3 mb-6 sm:mb-8 group transition-transform active:scale-95">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white p-1 shadow-md flex items-center justify-center overflow-hidden border-2 border-white/80 group-hover:rotate-3 transition-transform">
              <Image
                src="/assets/1.png"
                alt="Logo Luna LINTERA"
                width={56}
                height={56}
                className="object-cover object-top"
              />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white block leading-none">
                LINTERA
              </span>
              <span className="text-[11px] font-bold text-blue-100 tracking-wide">
                Lingkaran Interaktif
              </span>
            </div>
          </Link>

          {/* Navigasi 3 Materi Pembelajaran */}
          <nav className="flex flex-col gap-2.5" aria-label="Navigasi Materi">
            
            {/* 1. Unsur-unsur Lingkaran (Tersedia) */}
            <Link
              href="/materi/unsur-lingkaran"
              className="flex items-center justify-between px-4 py-3.5 rounded-2xl bg-white/95 hover:bg-white text-[#123B8A] font-extrabold text-sm shadow-sm transition-all hover:translate-x-1"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full border-2 border-[#123B8A] flex items-center justify-center shrink-0">
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-[#123B8A]" />
                </span>
                <span className="leading-snug">Unsur-unsur<br />Lingkaran</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            {/* 2. Kedudukan Titik pada Lingkaran (MENU AKTIF) */}
            <div className="flex items-center justify-between px-4 py-3.5 rounded-2xl bg-[#123B8A] text-white font-black text-sm shadow-md border border-blue-400/30">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-white" />
                </span>
                <span className="leading-snug">Kedudukan Titik<br />pada Lingkaran</span>
              </div>
              <ChevronRight className="w-4 h-4 text-white" />
            </div>

            {/* 3. Kedudukan Garis pada Lingkaran (Tersedia) */}
            <Link
              href="/materi/kedudukan-garis"
              className="flex items-center justify-between px-4 py-3.5 rounded-2xl bg-white/95 hover:bg-white text-[#123B8A] font-extrabold text-sm shadow-sm transition-all hover:translate-x-1"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full border-2 border-[#123B8A] flex items-center justify-center shrink-0">
                  <span className="w-5 h-0.5 bg-[#123B8A] transform rotate-45" />
                </span>
                <span className="leading-snug">Kedudukan Garis<br />pada Lingkaran</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

          </nav>
        </div>

        {/* Luna Dekoratif di Bawah Sidebar (Desktop/Tablet) */}
        <div className="hidden lg:flex flex-col items-center pt-6 mt-6 border-t border-blue-400/40 relative">
          <div className="relative w-40 h-44 flex items-end justify-center">
            {/* Sparkle yellow */}
            <div className="absolute top-2 left-4 flex gap-1 pointer-events-none">
              <span className="w-3 h-1 bg-[#FFD34E] rounded-full transform -rotate-45" />
              <span className="w-3.5 h-1 bg-[#FFD34E] rounded-full transform rotate-12" />
            </div>
            <Image
              src="/assets/1.png"
              alt="Luna maskot LINTERA"
              width={180}
              height={180}
              className="w-full h-full object-contain pointer-events-none drop-shadow-md"
            />
          </div>
          <p className="text-xs font-bold text-blue-100 text-center mt-2">
            Belajar jadi mudah bersama Luna!
          </p>
        </div>

      </aside>

      {/* =========================================================================
          2. KONTEN UTAMA
      ========================================================================= */}
      <main className="flex-1 flex flex-col justify-between p-4 sm:p-6 lg:p-8 z-10 overflow-y-auto min-h-screen">
        
        <div className="w-full max-w-6xl mx-auto space-y-6">

          {/* HEADER: Judul Halaman + Tombol Aksi */}
          <header className="w-full flex items-center justify-between pb-2">
            <div>
              <div className="relative inline-block">
                <h1 className="text-2xl sm:text-3.5xl lg:text-4xl font-black text-[#123B8A] tracking-tight">
                  Kedudukan Titik pada Lingkaran
                </h1>
                {/* Garis dekoratif kuning melengkung di bawah judul */}
                <svg
                  className="absolute -bottom-2 sm:-bottom-2.5 left-0 w-36 sm:w-56 text-[#FFD34E]"
                  viewBox="0 0 160 14"
                  fill="none"
                >
                  <path
                    d="M4 6C45 12 115 12 156 6"
                    stroke="#FFD34E"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p className="text-sm sm:text-base font-bold text-slate-700 mt-3 sm:mt-3.5">
                Pilih bagian yang ingin kamu pelajari.
              </p>
            </div>

            {/* Tombol Info & Kembali */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  playSound('click');
                  setShowInfoModal(true);
                }}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-[#123B8A] hover:bg-blue-50 flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all border border-blue-100"
                aria-label="Informasi Materi"
                title="Petunjuk Belajar"
              >
                <Info className="w-5 h-5 stroke-[2.5]" />
              </button>

              <Link
                href="/materi"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-[#123B8A] hover:bg-blue-50 flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all border border-blue-100"
                aria-label="Kembali ke Menu Materi Belajar"
                title="Kembali ke Menu Materi"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
              </Link>
            </div>
          </header>

          {/* =========================================================================
              4 KARTU NAVIGASI TAB (Sesuai Desain Referensi image_65d35d27.png)
          ========================================================================= */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4" aria-label="Pilihan Bagian Belajar">
            
            {/* Tab 1: Video Pembelajaran */}
            <button
              onClick={() => {
                playSound('click');
                setActiveTab('video');
              }}
              className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center text-center transition-all cursor-pointer shadow-md border-2 ${
                activeTab === 'video'
                  ? 'bg-gradient-to-b from-white to-blue-50/80 border-[#2875FB] ring-4 ring-blue-300/50 scale-[1.02]'
                  : 'bg-white hover:bg-white/90 border-transparent hover:border-blue-200'
              }`}
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-2.5 shadow-sm transition-transform ${
                activeTab === 'video' ? 'bg-[#2875FB] text-white rotate-3' : 'bg-blue-100 text-[#2875FB]'
              }`}>
                <Play className="w-6 h-6 fill-current ml-0.5" />
              </div>
              <span className="text-sm sm:text-base font-black text-[#123B8A] leading-tight">
                Video Pembelajaran
              </span>
              <span className="text-[11px] font-bold text-slate-500 mt-1">
                Tonton visual konsep
              </span>
            </button>

            {/* Tab 2: Materi Pembelajaran */}
            <button
              onClick={() => {
                playSound('click');
                setActiveTab('materi');
              }}
              className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center text-center transition-all cursor-pointer shadow-md border-2 ${
                activeTab === 'materi'
                  ? 'bg-gradient-to-b from-white to-blue-50/80 border-[#2875FB] ring-4 ring-blue-300/50 scale-[1.02]'
                  : 'bg-white hover:bg-white/90 border-transparent hover:border-blue-200'
              }`}
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-2.5 shadow-sm transition-transform ${
                activeTab === 'materi' ? 'bg-[#2875FB] text-white rotate-3' : 'bg-emerald-100 text-emerald-600'
              }`}>
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-sm sm:text-base font-black text-[#123B8A] leading-tight">
                Materi Pembelajaran
              </span>
              <span className="text-[11px] font-bold text-slate-500 mt-1">
                Teori rumus & syarat
              </span>
            </button>

            {/* Tab 3: Contoh Soal dan Pembahasan */}
            <button
              onClick={() => {
                playSound('click');
                setActiveTab('contoh');
              }}
              className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center text-center transition-all cursor-pointer shadow-md border-2 ${
                activeTab === 'contoh'
                  ? 'bg-gradient-to-b from-white to-blue-50/80 border-[#2875FB] ring-4 ring-blue-300/50 scale-[1.02]'
                  : 'bg-white hover:bg-white/90 border-transparent hover:border-blue-200'
              }`}
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-2.5 shadow-sm transition-transform ${
                activeTab === 'contoh' ? 'bg-[#2875FB] text-white rotate-3' : 'bg-amber-100 text-[#F57200]'
              }`}>
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-sm sm:text-base font-black text-[#123B8A] leading-tight">
                Contoh Soal
              </span>
              <span className="text-[11px] font-bold text-slate-500 mt-1">
                Langkah penyelesaian
              </span>
            </button>

            {/* Tab 4: Latihan Interaktif */}
            <button
              onClick={() => {
                playSound('click');
                setActiveTab('latihan');
              }}
              className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center text-center transition-all cursor-pointer shadow-md border-2 ${
                activeTab === 'latihan'
                  ? 'bg-gradient-to-b from-white to-blue-50/80 border-[#2875FB] ring-4 ring-blue-300/50 scale-[1.02]'
                  : 'bg-white hover:bg-white/90 border-transparent hover:border-blue-200'
              }`}
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-2.5 shadow-sm transition-transform ${
                activeTab === 'latihan' ? 'bg-[#2875FB] text-white rotate-3' : 'bg-purple-100 text-purple-600'
              }`}>
                <Gamepad2 className="w-6 h-6" />
              </div>
              <span className="text-sm sm:text-base font-black text-[#123B8A] leading-tight">
                Latihan Interaktif
              </span>
              <span className="text-[11px] font-bold text-slate-500 mt-1">
                Uji pemahaman kuis
              </span>
            </button>

          </section>

          {/* =========================================================================
              KONTEN SESUAI TAB AKTIF (Hanya 1 yang dirender dalam satu waktu)
          ========================================================================= */}
          
          {/* -----------------------------------------------------------------------
              TAB 1: VIDEO PEMBELAJARAN
          ----------------------------------------------------------------------- */}
          {activeTab === 'video' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Kolom Kiri: Player Video YouTube (16:9) */}
              <div className="lg:col-span-7 bg-white p-4 sm:p-5 rounded-3xl shadow-lg border border-white/60">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
                    <h2 className="text-base sm:text-lg font-black text-[#123B8A]">
                      Video: Kedudukan Titik terhadap Lingkaran
                    </h2>
                  </div>
                  <span className="text-xs font-black px-2.5 py-1 rounded-full bg-blue-100 text-[#123B8A]">
                    Resolusi HD
                  </span>
                </div>

                {/* 16:9 Aspect Ratio Iframe Embed */}
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 shadow-inner border border-slate-200">
                  <iframe
                    src="https://www.youtube.com/embed/DlxGOBHj7rU"
                    title="Video Pembelajaran Kedudukan Titik pada Lingkaran LINTERA"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>

                <div className="mt-3.5 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>Sumber: Video Pembelajaran Matematika SMA</span>
                  <span className="text-emerald-600 font-bold">✓ Audio & Subtitle Tersedia</span>
                </div>
              </div>

              {/* Kolom Kanan: "Tentang Video Ini" + Mini Diagram Interaktif */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                
                {/* Kartu Ringkasan Video */}
                <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-lg border border-white/60">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#2875FB] flex items-center justify-center">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-[#123B8A]">Tentang Video Ini</h3>
                      <p className="text-xs font-bold text-slate-500">Intisari Konsep Penting</p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    Video ini menjelaskan cara menentukan posisi titik <span className="font-mono font-bold text-[#123B8A]">P(x₁, y₁)</span> terhadap suatu lingkaran dengan menguji jarak titik ke pusat atau melalui substitusi persamaan.
                  </p>

                  {/* Diagram Visual Kedudukan Titik (SVG) */}
                  <div className="my-4 p-3 bg-gradient-to-b from-blue-50/50 to-indigo-50/30 rounded-2xl border border-blue-100 flex flex-col items-center">
                    <span className="text-[11px] font-bold text-[#123B8A] mb-1">
                      Visualisasi 3 Posisi Titik
                    </span>
                    <svg viewBox="0 0 240 160" className="w-full max-w-[240px] h-36 select-none">
                      {/* Grid background */}
                      <circle cx="120" cy="80" r="50" fill="#E0F2FE" fillOpacity="0.5" stroke="#2875FB" strokeWidth="2.5" strokeDasharray="3 3" />
                      
                      {/* Pusat O */}
                      <circle cx="120" cy="80" r="4.5" fill="#123B8A" />
                      <text x="114" y="96" fill="#123B8A" fontSize="11" fontWeight="bold">O(a,b)</text>

                      {/* Jari-jari line */}
                      <line x1="120" y1="80" x2="170" y2="80" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="2 2" />
                      <text x="142" y="75" fill="#64748B" fontSize="10" fontWeight="bold">r</text>

                      {/* Titik P (Di Dalam) */}
                      <line x1="120" y1="80" x2="100" y2="60" stroke="#2875FB" strokeWidth="1.5" />
                      <circle cx="100" cy="60" r="5.5" fill="#2875FB" stroke="#FFFFFF" strokeWidth="2" />
                      <text x="82" y="55" fill="#2875FB" fontSize="11" fontWeight="900">P (d &lt; r)</text>

                      {/* Titik Q (Tepat Pada Lingkaran) */}
                      <circle cx="155" cy="45" r="5.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
                      <text x="162" y="45" fill="#10B981" fontSize="11" fontWeight="900">Q (d = r)</text>

                      {/* Titik R (Di Luar Lingkaran) */}
                      <line x1="120" y1="80" x2="195" y2="115" stroke="#F57200" strokeWidth="1.5" strokeDasharray="2 2" />
                      <circle cx="195" cy="115" r="5.5" fill="#F57200" stroke="#FFFFFF" strokeWidth="2" />
                      <text x="175" y="132" fill="#F57200" fontSize="11" fontWeight="900">R (d &gt; r)</text>
                    </svg>

                    <div className="w-full grid grid-cols-3 gap-1 text-[10px] font-bold text-center mt-1">
                      <span className="px-1 py-0.5 rounded bg-blue-100 text-[#2875FB]">P: Di Dalam</span>
                      <span className="px-1 py-0.5 rounded bg-emerald-100 text-emerald-700">Q: Tepat Pada</span>
                      <span className="px-1 py-0.5 rounded bg-amber-100 text-[#F57200]">R: Di Luar</span>
                    </div>
                  </div>

                  {/* 3 Indikator Pokok */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2 text-slate-700">
                      <div className="w-2 h-2 rounded-full bg-[#2875FB] mt-1.5 shrink-0" />
                      <span><strong>Di Dalam:</strong> Jarak titik ke pusat lebih kecil dari jari-jari (<span className="font-mono">d &lt; r</span>).</span>
                    </div>
                    <div className="flex items-start gap-2 text-slate-700">
                      <div className="w-2 h-2 rounded-full bg-[#10B981] mt-1.5 shrink-0" />
                      <span><strong>Pada Lingkaran:</strong> Jarak titik ke pusat persis sama dengan jari-jari (<span className="font-mono">d = r</span>).</span>
                    </div>
                    <div className="flex items-start gap-2 text-slate-700">
                      <div className="w-2 h-2 rounded-full bg-[#F57200] mt-1.5 shrink-0" />
                      <span><strong>Di Luar:</strong> Jarak titik ke pusat lebih besar dari jari-jari (<span className="font-mono">d &gt; r</span>).</span>
                    </div>
                  </div>
                </div>

                {/* Callout Luna */}
                <div className="bg-[#FEF08A] p-4 rounded-3xl shadow-md border border-amber-300 flex items-center gap-3">
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-white/80 p-1 flex items-center justify-center border border-amber-200">
                    <Image
                      src="/assets/2.png"
                      alt="Luna Berpikir"
                      width={52}
                      height={52}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-black text-amber-900 block">Tips Belajar dari Luna:</span>
                    <p className="text-xs text-amber-950 font-medium mt-0.5">
                      Setelah menonton video, lanjutkan membaca tab <strong>Materi</strong> atau langsung coba <strong>Latihan Interaktif</strong> ya!
                    </p>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* -----------------------------------------------------------------------
              TAB 2: MATERI PEMBELAJARAN
          ----------------------------------------------------------------------- */}
          {activeTab === 'materi' && (
            <div className="space-y-6">
              
              {/* Bagian A & B: Persamaan Lingkaran & Rumus Kedudukan */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Kartu 1: Bentuk Persamaan Lingkaran */}
                <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-lg border border-white/60">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-blue-100 text-[#2875FB] flex items-center justify-center font-black">
                      1
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-black text-[#123B8A]">
                        Bentuk Persamaan Lingkaran
                      </h2>
                      <p className="text-xs font-bold text-slate-500">Baku dan Umum</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                      <span className="text-xs font-bold text-slate-500 block">Pusat O(0, 0) dan jari-jari r:</span>
                      <p className="text-base font-black font-mono text-[#123B8A] mt-1">
                        x² + y² = r²
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                      <span className="text-xs font-bold text-slate-500 block">Pusat M(a, b) dan jari-jari r:</span>
                      <p className="text-base font-black font-mono text-[#123B8A] mt-1">
                        (x − a)² + (y − b)² = r²
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                      <span className="text-xs font-bold text-slate-500 block">Bentuk Umum:</span>
                      <p className="text-base font-black font-mono text-[#123B8A] mt-1">
                        x² + y² + Ax + By + C = 0
                      </p>
                    </div>
                  </div>
                </div>

                {/* Kartu 2: Rumus Kuasa Titik & Jarak ke Pusat */}
                <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-lg border border-white/60">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-black">
                      2
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-black text-[#123B8A]">
                        Cara Menentukan Kedudukan
                      </h2>
                      <p className="text-xs font-bold text-slate-500">Metode Substitusi & Jarak Titik</p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium mb-3">
                    Untuk titik <span className="font-mono font-bold text-[#123B8A]">P(x₁, y₁)</span>, substitusikan nilai koordinat tersebut ke ruas kiri persamaan lingkaran:
                  </p>

                  <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-center">
                    <span className="text-xs font-bold text-[#123B8A] block mb-1">Nilai Ruas Kiri (K):</span>
                    <p className="text-lg sm:text-xl font-black font-mono text-[#123B8A]">
                      K = (x₁ − a)² + (y₁ − b)²
                    </p>
                    <span className="text-[11px] font-semibold text-slate-600 mt-1 block">
                      atau jarak titik ke pusat: <span className="font-mono">d = √[(x₁ − a)² + (y₁ − b)²]</span>
                    </span>
                  </div>

                  <div className="mt-4 p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-2.5">
                    <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-900 font-semibold leading-relaxed">
                      Kamu cukup membandingkan nilai <span className="font-mono font-bold">K</span> terhadap <span className="font-mono font-bold">r²</span>, tanpa harus menarik akar kuadrat!
                    </p>
                  </div>
                </div>

              </div>

              {/* 3 Kondisi Kedudukan Titik (3 Kartu Berwarna) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* 1. Di Dalam Lingkaran */}
                <div className="bg-white p-5 rounded-3xl shadow-md border-2 border-blue-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-1 rounded-full text-xs font-black bg-blue-100 text-[#2875FB]">
                        Kondisi 1
                      </span>
                      <span className="w-3.5 h-3.5 rounded-full bg-[#2875FB]" />
                    </div>
                    <h3 className="text-base font-black text-[#123B8A]">Di Dalam Lingkaran</h3>
                    <p className="text-xs text-slate-600 font-medium mt-1">
                      Jarak titik ke pusat lebih kecil daripada jari-jari lingkaran.
                    </p>
                    
                    <div className="my-3 p-3 rounded-2xl bg-blue-50 text-center border border-blue-200">
                      <span className="font-mono font-black text-lg text-[#2875FB] block">
                        K &lt; r²
                      </span>
                      <span className="text-[11px] font-bold text-slate-500">
                        atau d &lt; r
                      </span>
                    </div>
                  </div>
                  <div className="text-[11px] font-semibold text-blue-900 bg-blue-50/50 p-2 rounded-xl">
                    Contoh: Titik (1, 1) pada x² + y² = 9 karena 1² + 1² = 2 &lt; 9.
                  </div>
                </div>

                {/* 2. Tepat Pada Lingkaran */}
                <div className="bg-white p-5 rounded-3xl shadow-md border-2 border-emerald-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-700">
                        Kondisi 2
                      </span>
                      <span className="w-3.5 h-3.5 rounded-full bg-emerald-500" />
                    </div>
                    <h3 className="text-base font-black text-[#123B8A]">Tepat Pada Lingkaran</h3>
                    <p className="text-xs text-slate-600 font-medium mt-1">
                      Jarak titik ke pusat sama persis dengan jari-jari lingkaran.
                    </p>
                    
                    <div className="my-3 p-3 rounded-2xl bg-emerald-50 text-center border border-emerald-200">
                      <span className="font-mono font-black text-lg text-emerald-600 block">
                        K = r²
                      </span>
                      <span className="text-[11px] font-bold text-slate-500">
                        atau d = r
                      </span>
                    </div>
                  </div>
                  <div className="text-[11px] font-semibold text-emerald-900 bg-emerald-50/50 p-2 rounded-xl">
                    Contoh: Titik (3, 4) pada x² + y² = 25 karena 3² + 4² = 25 = 25.
                  </div>
                </div>

                {/* 3. Di Luar Lingkaran */}
                <div className="bg-white p-5 rounded-3xl shadow-md border-2 border-orange-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-1 rounded-full text-xs font-black bg-orange-100 text-[#F57200]">
                        Kondisi 3
                      </span>
                      <span className="w-3.5 h-3.5 rounded-full bg-[#F57200]" />
                    </div>
                    <h3 className="text-base font-black text-[#123B8A]">Di Luar Lingkaran</h3>
                    <p className="text-xs text-slate-600 font-medium mt-1">
                      Jarak titik ke pusat lebih besar daripada jari-jari lingkaran.
                    </p>
                    
                    <div className="my-3 p-3 rounded-2xl bg-orange-50 text-center border border-orange-200">
                      <span className="font-mono font-black text-lg text-[#F57200] block">
                        K &gt; r²
                      </span>
                      <span className="text-[11px] font-bold text-slate-500">
                        atau d &gt; r
                      </span>
                    </div>
                  </div>
                  <div className="text-[11px] font-semibold text-orange-900 bg-orange-50/50 p-2 rounded-xl">
                    Contoh: Titik (5, 5) pada x² + y² = 25 karena 5² + 5² = 50 &gt; 25.
                  </div>
                </div>

              </div>

              {/* Interactive Point Explorer Simulator */}
              <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-lg border border-white/60">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-black text-[#123B8A]">
                        Laboratorium Titik Interaktif (Simulator)
                      </h2>
                      <p className="text-xs font-bold text-slate-500">Lingkaran: x² + y² = 25 (r = 5)</p>
                    </div>
                  </div>
                  
                  {/* Preset Buttons */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-bold text-slate-500 mr-1">Preset:</span>
                    <button
                      onClick={() => { setSimPointX(2); setSimPointY(2); playSound('click'); }}
                      className="px-2.5 py-1 text-xs font-bold rounded-lg bg-blue-100 text-[#2875FB] hover:bg-blue-200 transition-colors"
                    >
                      P(2, 2)
                    </button>
                    <button
                      onClick={() => { setSimPointX(3); setSimPointY(4); playSound('click'); }}
                      className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
                    >
                      Q(3, 4)
                    </button>
                    <button
                      onClick={() => { setSimPointX(5); setSimPointY(3); playSound('click'); }}
                      className="px-2.5 py-1 text-xs font-bold rounded-lg bg-orange-100 text-[#F57200] hover:bg-orange-200 transition-colors"
                    >
                      R(5, 3)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  {/* SVG Canvas Coordinate */}
                  <div className="md:col-span-6 bg-slate-50 rounded-2xl p-4 flex flex-col items-center border border-slate-200">
                    <svg viewBox="-80 -80 160 160" className="w-full max-w-[280px] aspect-square select-none">
                      {/* Grid lines */}
                      <line x1="-75" y1="0" x2="75" y2="0" stroke="#CBD5E1" strokeWidth="1.5" />
                      <line x1="0" y1="-75" x2="0" y2="75" stroke="#CBD5E1" strokeWidth="1.5" />
                      
                      {/* Circle r = 50px (scale 10px = 1 unit) */}
                      <circle cx="0" cy="0" r="50" fill="#E0F2FE" fillOpacity="0.3" stroke="#2875FB" strokeWidth="3" />
                      
                      {/* Center O */}
                      <circle cx="0" cy="0" r="4" fill="#123B8A" />
                      <text x="3" y="12" fill="#123B8A" fontSize="8" fontWeight="bold">O(0,0)</text>

                      {/* Line to point */}
                      <line
                        x1="0"
                        y1="0"
                        x2={simPointX * 10}
                        y2={-simPointY * 10}
                        stroke={simStatus === 'inside' ? '#2875FB' : simStatus === 'on' ? '#10B981' : '#F57200'}
                        strokeWidth="2"
                        strokeDasharray="2 2"
                      />

                      {/* Point P */}
                      <circle
                        cx={simPointX * 10}
                        cy={-simPointY * 10}
                        r="6"
                        fill={simStatus === 'inside' ? '#2875FB' : simStatus === 'on' ? '#10B981' : '#F57200'}
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        className="animate-pulse"
                      />
                      <text
                        x={simPointX * 10 + 7}
                        y={-simPointY * 10 - 5}
                        fill="#123B8A"
                        fontSize="9"
                        fontWeight="black"
                      >
                        P({simPointX}, {simPointY})
                      </text>
                    </svg>

                    <div className="w-full flex items-center justify-between text-[11px] font-bold text-slate-500 mt-2">
                      <span>Jari-jari lingkaran: r = 5 (r² = 25)</span>
                      <span>Skala 1:1</span>
                    </div>
                  </div>

                  {/* Slider Controls & Live Status */}
                  <div className="md:col-span-6 space-y-4">
                    
                    {/* Slider X */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-slate-700">
                        <span>Koordinat X:</span>
                        <span className="font-mono text-[#123B8A] font-black">{simPointX}</span>
                      </div>
                      <input
                        type="range"
                        min="-7"
                        max="7"
                        step="1"
                        value={simPointX}
                        onChange={(e) => setSimPointX(parseInt(e.target.value))}
                        className="w-full accent-[#2875FB] cursor-pointer"
                      />
                    </div>

                    {/* Slider Y */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-slate-700">
                        <span>Koordinat Y:</span>
                        <span className="font-mono text-[#123B8A] font-black">{simPointY}</span>
                      </div>
                      <input
                        type="range"
                        min="-7"
                        max="7"
                        step="1"
                        value={simPointY}
                        onChange={(e) => setSimPointY(parseInt(e.target.value))}
                        className="w-full accent-[#2875FB] cursor-pointer"
                      />
                    </div>

                    {/* Calculation Output Box */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                        <span>Substitusi x² + y²:</span>
                        <span className="font-mono font-black text-[#123B8A] text-sm">
                          ({simPointX})² + ({simPointY})² = {simDistSq}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                        <span>Nilai r² lingkaran:</span>
                        <span className="font-mono font-black text-[#123B8A] text-sm">25</span>
                      </div>
                      
                      <div className="pt-2 border-t border-slate-200">
                        <span className="text-[11px] font-bold text-slate-500 block mb-1">Status Kedudukan:</span>
                        <div className={`p-2.5 rounded-xl text-center font-black text-sm border ${
                          simStatus === 'inside'
                            ? 'bg-blue-100 text-[#2875FB] border-blue-300'
                            : simStatus === 'on'
                            ? 'bg-emerald-100 text-emerald-700 border-emerald-300'
                            : 'bg-orange-100 text-[#F57200] border-orange-300'
                        }`}>
                          {simStatus === 'inside' && `Titik DI DALAM Lingkaran (${simDistSq} < 25)`}
                          {simStatus === 'on' && `Titik TEPAT PADA Lingkaran (${simDistSq} = 25)`}
                          {simStatus === 'outside' && `Titik DI LUAR Lingkaran (${simDistSq} > 25)`}
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              </div>

              {/* Tabel Rangkuman Perbandingan */}
              <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-lg border border-white/60 overflow-x-auto">
                <h3 className="text-base font-black text-[#123B8A] mb-3">
                  Tabel Rangkuman Syarat Kedudukan Titik
                </h3>
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b-2 border-slate-200 text-slate-500 font-black">
                      <th className="py-2.5 px-3">Kedudukan Titik</th>
                      <th className="py-2.5 px-3">Bentuk Baku Pusat (a,b)</th>
                      <th className="py-2.5 px-3">Jarak ke Pusat (d)</th>
                      <th className="py-2.5 px-3">Keterangan Visual</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    <tr className="hover:bg-blue-50/50">
                      <td className="py-3 px-3 font-bold text-[#2875FB]">Di Dalam Lingkaran</td>
                      <td className="py-3 px-3 font-mono">(x₁ − a)² + (y₁ − b)² &lt; r²</td>
                      <td className="py-3 px-3 font-mono">d &lt; r</td>
                      <td className="py-3 px-3 text-slate-600">Titik berada di daerah interior lingkaran</td>
                    </tr>
                    <tr className="hover:bg-emerald-50/50">
                      <td className="py-3 px-3 font-bold text-emerald-600">Tepat Pada Lingkaran</td>
                      <td className="py-3 px-3 font-mono">(x₁ − a)² + (y₁ − b)² = r²</td>
                      <td className="py-3 px-3 font-mono">d = r</td>
                      <td className="py-3 px-3 text-slate-600">Titik dilewati oleh garis keliling lingkaran</td>
                    </tr>
                    <tr className="hover:bg-orange-50/50">
                      <td className="py-3 px-3 font-bold text-[#F57200]">Di Luar Lingkaran</td>
                      <td className="py-3 px-3 font-mono">(x₁ − a)² + (y₁ − b)² &gt; r²</td>
                      <td className="py-3 px-3 font-mono">d &gt; r</td>
                      <td className="py-3 px-3 text-slate-600">Titik berada di daerah eksterior luar batas</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* -----------------------------------------------------------------------
              TAB 3: CONTOH SOAL DAN PEMBAHASAN INTERAKTIF
          ----------------------------------------------------------------------- */}
          {activeTab === 'contoh' && (
            <div className="space-y-6">
              
              {/* Selector Contoh Soal 1, 2, 3 */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {examplesData.map((ex, idx) => (
                  <button
                    key={ex.id}
                    onClick={() => {
                      playSound('click');
                      setActiveExampleIndex(idx);
                      setCurrentStepIndex(0);
                    }}
                    className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm whitespace-nowrap transition-all shadow-sm ${
                      activeExampleIndex === idx
                        ? 'bg-[#123B8A] text-white shadow-md scale-105'
                        : 'bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    Contoh {ex.id}
                  </button>
                ))}
              </div>

              {/* Kartu Soal Utama */}
              <div className="bg-white p-5 sm:p-7 rounded-3xl shadow-lg border border-white/60 space-y-6">
                
                {/* Judul & Soal */}
                <div className="border-b border-slate-100 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-100 text-[#123B8A]">
                      {currentExample.title}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      Langkah {currentStepIndex + 1} dari {currentExample.steps.length}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-[#123B8A]">
                    {currentExample.problem}
                  </h3>
                </div>

                {/* Progress Bar Langkah */}
                <div className="space-y-2">
                  <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#2875FB] to-blue-400 rounded-full transition-all duration-300"
                      style={{
                        width: `${((currentStepIndex + 1) / currentExample.steps.length) * 100}%`
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] font-bold text-slate-400">
                    <span>Langkah Awal</span>
                    <span>Substitusi</span>
                    <span>Perhitungan</span>
                    <span>Bandingkan & Simpulkan</span>
                  </div>
                </div>

                {/* Tampilan Langkah Saat Ini */}
                <div className="bg-blue-50/40 p-5 sm:p-6 rounded-2xl border border-blue-100 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#2875FB] text-white font-black text-sm flex items-center justify-center shrink-0">
                      {currentExample.steps[currentStepIndex].stepNumber}
                    </span>
                    <div>
                      <h4 className="text-base font-black text-[#123B8A]">
                        {currentExample.steps[currentStepIndex].title}
                      </h4>
                      <p className="text-xs text-slate-600 font-medium">
                        {currentExample.steps[currentStepIndex].description}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-blue-100">
                    {currentExample.steps[currentStepIndex].mathContent}
                  </div>

                  {/* Luna Hint Box */}
                  <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
                    <div className="w-10 h-10 rounded-xl bg-white p-1 shrink-0 flex items-center justify-center border border-amber-200">
                      <Image
                        src="/assets/3.png"
                        alt="Luna Catatan"
                        width={36}
                        height={36}
                        className="object-contain"
                      />
                    </div>
                    <p className="text-xs font-semibold text-amber-950">
                      <strong>Catatan Luna:</strong> {currentExample.steps[currentStepIndex].lunaHint}
                    </p>
                  </div>
                </div>

                {/* Kesimpulan Akhir (Jika berada di langkah terakhir) */}
                {currentStepIndex === currentExample.steps.length - 1 && (
                  <div className="p-5 rounded-2xl border-2 border-emerald-400 bg-emerald-50/80 space-y-2 animate-fadeIn">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
                        Kesimpulan Akhir Soal
                      </span>
                    </div>
                    <p className="text-base sm:text-lg font-black text-emerald-900">
                      {currentExample.conclusion.statusText}
                    </p>
                    <p className="text-xs sm:text-sm text-emerald-800 font-medium leading-relaxed">
                      {currentExample.conclusion.explanation}
                    </p>
                  </div>
                )}

                {/* Tombol Kontrol Navigasi Langkah */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      playSound('step');
                      setCurrentStepIndex(prev => Math.max(0, prev - 1));
                    }}
                    disabled={currentStepIndex === 0}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all ${
                      currentStepIndex === 0
                        ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                        : 'bg-white hover:bg-slate-50 text-[#123B8A] border border-slate-200 shadow-sm active:scale-95'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Langkah Sebelumnya
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        playSound('click');
                        setCurrentStepIndex(0);
                      }}
                      className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                      title="Ulangi dari Langkah 1"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    {currentStepIndex < currentExample.steps.length - 1 ? (
                      <button
                        onClick={() => {
                          playSound('step');
                          setCurrentStepIndex(prev => prev + 1);
                        }}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black bg-[#2875FB] hover:bg-[#1C64E8] text-white shadow-md active:scale-95 transition-all"
                      >
                        Langkah Berikutnya
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          playSound('correct');
                          if (activeExampleIndex < examplesData.length - 1) {
                            setActiveExampleIndex(prev => prev + 1);
                            setCurrentStepIndex(0);
                          } else {
                            setActiveTab('latihan');
                          }
                        }}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-md active:scale-95 transition-all"
                      >
                        {activeExampleIndex < examplesData.length - 1 ? 'Contoh Berikutnya' : 'Mulai Latihan Interaktif'}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* -----------------------------------------------------------------------
              TAB 4: LATIHAN INTERAKTIF
          ----------------------------------------------------------------------- */}
          {activeTab === 'latihan' && (
            <div className="space-y-6">
              
              {!quizFinished ? (
                <div className="bg-white p-5 sm:p-7 rounded-3xl shadow-lg border border-white/60 space-y-6">
                  
                  {/* Top Bar Kuis: Progress & Skor */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-black text-sm flex items-center justify-center">
                        {currentQuizIndex + 1}
                      </span>
                      <div>
                        <span className="text-xs font-bold text-slate-400 block">Pertanyaan</span>
                        <span className="text-sm font-black text-[#123B8A]">
                          Soal {currentQuizIndex + 1} dari {quizQuestions.length}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-black text-[#2875FB]">
                        Skor: {quizScore} / 100
                      </div>
                    </div>
                  </div>

                  {/* Soal Kuis */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/50 border border-blue-100">
                    <span className="text-xs font-bold text-slate-500 block mb-1">
                      Analisis Kedudukan Titik:
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-[#123B8A]">
                      {currentQuiz.question}
                    </h3>
                  </div>

                  {/* Pilihan Jawaban */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {currentQuiz.options.map((opt) => {
                      const isSelected = selectedAnswers[currentQuizIndex] === opt.id;
                      const isSubmitted = !!quizSubmitted[currentQuizIndex];

                      let btnStyle = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800';
                      if (isSelected && !isSubmitted) {
                        btnStyle = 'bg-blue-50 border-[#2875FB] text-[#123B8A] ring-2 ring-blue-300';
                      } else if (isSubmitted) {
                        if (opt.isCorrect) {
                          btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-900 ring-2 ring-emerald-300';
                        } else if (isSelected && !opt.isCorrect) {
                          btnStyle = 'bg-rose-100 border-rose-400 text-rose-900';
                        } else {
                          btnStyle = 'bg-slate-50 border-slate-200 opacity-60 text-slate-500';
                        }
                      }

                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectQuizOption(opt.id)}
                          disabled={isSubmitted}
                          className={`p-4 rounded-2xl border-2 text-left font-bold transition-all shadow-sm ${btnStyle}`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs uppercase tracking-wide opacity-70">Pilihan</span>
                            {isSubmitted && opt.isCorrect && (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            )}
                            {isSubmitted && isSelected && !opt.isCorrect && (
                              <XCircle className="w-5 h-5 text-rose-600" />
                            )}
                          </div>
                          <span className="text-sm font-black block">
                            {opt.text}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Pembahasan setelah Submit */}
                  {quizSubmitted[currentQuizIndex] && (
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 animate-fadeIn">
                      <div className="flex items-center gap-2">
                        {currentQuiz.options.find(o => o.id === selectedAnswers[currentQuizIndex])?.isCorrect ? (
                          <div className="flex items-center gap-2 text-emerald-600 font-black text-sm">
                            <CheckCircle2 className="w-5 h-5" />
                            Jawaban Kamu Benar! (+25 Poin)
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-rose-600 font-black text-sm">
                            <XCircle className="w-5 h-5" />
                            Kurang Tepat, Perhatikan Langkah Berikut:
                          </div>
                        )}
                      </div>

                      <div className="text-xs text-slate-700 space-y-1 font-semibold">
                        <p className="font-bold text-[#123B8A]">Langkah Perhitungan:</p>
                        {currentQuiz.calcSteps.map((step, sIdx) => (
                          <p key={sIdx} className="font-mono text-slate-800 bg-white p-2 rounded-lg border border-slate-200">
                            {step}
                          </p>
                        ))}
                      </div>

                      <p className="text-xs text-slate-600 font-medium">
                        {currentQuiz.explanation}
                      </p>
                    </div>
                  )}

                  {/* Tombol Aksi Kuis */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-400">
                      Pilih jawaban lalu tekan tombol verifikasi
                    </span>

                    {!quizSubmitted[currentQuizIndex] ? (
                      <button
                        onClick={handleConfirmQuizAnswer}
                        disabled={!selectedAnswers[currentQuizIndex]}
                        className={`px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all ${
                          !selectedAnswers[currentQuizIndex]
                            ? 'opacity-40 cursor-not-allowed bg-slate-200 text-slate-500'
                            : 'bg-[#2875FB] hover:bg-[#1C64E8] text-white shadow-md active:scale-95'
                        }`}
                      >
                        Periksa Jawaban
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuizQuestion}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-md active:scale-95 transition-all"
                      >
                        {currentQuizIndex < quizQuestions.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Akhir'}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                </div>
              ) : (
                /* Kartu Hasil Akhir Kuis */
                <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-white/60 text-center space-y-6 max-w-xl mx-auto">
                  <div className="relative w-36 h-36 mx-auto">
                    <Image
                      src={quizScore >= 75 ? '/assets/4.png' : '/assets/2.png'}
                      alt="Luna Evaluasi"
                      width={144}
                      height={144}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-[#2875FB] bg-blue-100 px-3 py-1 rounded-full">
                      Hasil Latihan Selesai
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#123B8A] mt-2">
                      {quizScore >= 75 ? 'Luar Biasa, Kamu Hebat!' : 'Semangat, Coba Sekali Lagi!'}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                      {quizScore >= 75
                        ? 'Kamu telah menguasai konsep kedudukan titik terhadap lingkaran dengan sangat baik!'
                        : 'Jangan menyerah! Ulangi latihan ini untuk memperkuat pemahaman rumus dan substitusi.'}
                    </p>
                  </div>

                  {/* Skor Circle Badge */}
                  <div className="inline-flex flex-col items-center justify-center w-28 h-28 rounded-full bg-gradient-to-tr from-[#2875FB] to-blue-400 text-white shadow-lg mx-auto">
                    <span className="text-3xl font-black leading-none">{quizScore}</span>
                    <span className="text-[11px] font-bold opacity-80">dari 100</span>
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-4">
                    <button
                      onClick={handleResetQuiz}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all active:scale-95"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Ulangi Latihan
                    </button>

                    <Link
                      href="/materi/kedudukan-garis"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black bg-[#2875FB] hover:bg-[#1C64E8] text-white shadow-md transition-all active:scale-95"
                    >
                      Lanjut ke Kedudukan Garis
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* =========================================================================
              3. NAVIGASI BAWAH (Materi Sebelumnya & Materi Berikutnya)
          ========================================================================= */}
          <footer className="w-full flex items-center justify-between pt-4 pb-2" aria-label="Navigasi Bawah">
            
            {/* Tombol Materi Sebelumnya */}
            {activeTab === 'video' ? (
              <Link
                href="/materi/unsur-lingkaran"
                className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl bg-white/95 hover:bg-white text-[#123B8A] font-extrabold text-xs sm:text-sm shadow-md transition-all hover:-translate-x-1 border border-blue-100"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                <span>Materi Sebelumnya (Unsur Lingkaran)</span>
              </Link>
            ) : (
              <button
                onClick={() => {
                  playSound('click');
                  if (activeTab === 'materi') setActiveTab('video');
                  else if (activeTab === 'contoh') setActiveTab('materi');
                  else if (activeTab === 'latihan') setActiveTab('contoh');
                }}
                className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl bg-white/95 hover:bg-white text-[#123B8A] font-extrabold text-xs sm:text-sm shadow-md transition-all hover:-translate-x-1 border border-blue-100"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                <span>Sub-Materi Sebelumnya</span>
              </button>
            )}

            {/* Tombol Materi Berikutnya */}
            {activeTab === 'latihan' ? (
              <Link
                href="/materi/kedudukan-garis"
                className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl bg-[#123B8A] hover:bg-[#0E2D68] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all hover:translate-x-1 border border-blue-400/30"
              >
                <span>Kedudukan Garis pada Lingkaran</span>
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
            ) : (
              <button
                onClick={() => {
                  playSound('click');
                  if (activeTab === 'video') setActiveTab('materi');
                  else if (activeTab === 'materi') setActiveTab('contoh');
                  else if (activeTab === 'contoh') setActiveTab('latihan');
                }}
                className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl bg-[#123B8A] hover:bg-[#0E2D68] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all hover:translate-x-1 border border-blue-400/30"
              >
                <span>Sub-Materi Berikutnya</span>
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            )}

          </footer>

        </div>

      </main>

      {/* =========================================================================
          4. MODAL INFO (PETUNJUK BELAJAR KEDUDUKAN TITIK)
      ========================================================================= */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-7 shadow-2xl border border-white/80 space-y-4 animate-scaleIn">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 text-[#123B8A] flex items-center justify-center">
                  <Info className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#123B8A]">Petunjuk Pembelajaran</h3>
                  <p className="text-xs font-bold text-slate-400">Kedudukan Titik pada Lingkaran</p>
                </div>
              </div>
              <button
                onClick={() => {
                  playSound('click');
                  setShowInfoModal(false);
                }}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
                aria-label="Tutup Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-100">
                <strong className="text-[#123B8A] block mb-1">🎯 Tujuan Pembelajaran:</strong>
                Peserta didik dapat menentukan dan menganalisis kedudukan suatu titik P(x₁, y₁) terhadap lingkaran dengan pusat O(0, 0) maupun M(a, b).
              </div>

              <div className="space-y-2">
                <strong className="text-slate-800 block">📌 Alur Belajar Disarankan:</strong>
                <ol className="list-decimal list-inside space-y-1 text-slate-600">
                  <li>Tonton <strong>Video Pembelajaran</strong> untuk visualisasi konsep jarak.</li>
                  <li>Pelajari rumus syarat pada <strong>Materi Pembelajaran</strong> dan coba simulator interaktif.</li>
                  <li>Buka <strong>Contoh Soal</strong> untuk melihat langkah perhitungan bertahap.</li>
                  <li>Kerjakan <strong>Latihan Interaktif</strong> untuk menguji pemahaman dan raih nilai 100!</li>
                </ol>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-amber-50 border border-amber-200">
                <Image
                  src="/assets/1.png"
                  alt="Luna"
                  width={40}
                  height={40}
                  className="object-contain shrink-0"
                />
                <p className="text-xs text-amber-900 font-semibold">
                  Jika ada langkah yang belum kamu pahami, kamu bisa mengulanginya kapan saja tanpa batas waktu!
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                playSound('click');
                setShowInfoModal(false);
              }}
              className="w-full py-3 rounded-2xl bg-[#2875FB] hover:bg-[#1C64E8] text-white font-black text-sm shadow-md transition-all active:scale-98"
            >
              Saya Siap Belajar!
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
