'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Info,
  X,
  Volume2,
  VolumeX,
  BookOpen,
  Sparkles,
  Lightbulb,
  ChevronRight,
  CircleDot
} from 'lucide-react';

interface ElementDetail {
  id: string;
  name: string;
  symbol: string;
  badgeName: string;
  badgeBg: string;
  definition: string;
  formulaDisplay?: {
    main: React.ReactNode;
    legend: { key: string; desc: string }[];
  };
  audioText: string;
  lunaTip: string;
  lunaPose: string;
  color: string;
}

const circleElementsData: Record<string, ElementDetail> = {
  'titik-pusat': {
    id: 'titik-pusat',
    name: 'Titik Pusat',
    symbol: '(O)',
    badgeName: 'Titik Pusat (O)',
    badgeBg: 'bg-blue-100 text-[#123B8A]',
    definition:
      'Titik pusat adalah titik yang berada tepat di tengah-tengah lingkaran. Titik pusat memiliki jarak yang sama terhadap setiap titik pada keliling lingkaran.',
    formulaDisplay: {
      main: <span className="text-base font-bold text-[#123B8A]">Notasi: <span className="font-mono text-lg text-[#2875FB]">O</span></span>,
      legend: [
        { key: 'O', desc: 'titik pusat lingkaran' },
        { key: 'Jarak ke keliling', desc: 'selalu konstan sebesar r' }
      ]
    },
    audioText:
      'Titik pusat adalah titik yang berada tepat di tengah-tengah lingkaran. Titik pusat memiliki jarak yang selalu sama terhadap setiap titik pada keliling lingkaran, disimbolkan dengan huruf O.',
    lunaTip:
      'Semua titik pada tepi lingkaran memiliki jarak yang sama persis menuju titik pusat O!',
    lunaPose: '/assets/luna-magnifier.png',
    color: '#123B8A'
  },
  'jari-jari': {
    id: 'jari-jari',
    name: 'Jari-Jari',
    symbol: '(r)',
    badgeName: 'Jari-Jari (r)',
    badgeBg: 'bg-emerald-100 text-emerald-800',
    definition:
      'Jari-jari adalah ruas garis yang menghubungkan titik pusat lingkaran dengan satu titik pada keliling lingkaran.',
    formulaDisplay: {
      main: (
        <div className="flex items-center gap-2 text-base font-black text-[#123B8A]">
          <span>Rumus:</span>
          <span className="font-mono text-lg text-emerald-600">r</span>
          <span>=</span>
          <div className="inline-flex flex-col items-center leading-none text-base">
            <span className="font-mono text-emerald-600 pb-0.5 border-b-2 border-slate-700">d</span>
            <span className="font-mono pt-0.5">2</span>
          </div>
        </div>
      ),
      legend: [
        { key: 'r', desc: 'jari-jari' },
        { key: 'd', desc: 'diameter' }
      ]
    },
    audioText:
      'Jari-jari adalah ruas garis yang menghubungkan titik pusat lingkaran dengan satu titik pada keliling lingkaran. Panjang jari-jari sama dengan setengah dari diameter, atau r sama dengan d per dua.',
    lunaTip:
      'Ingat bahwa panjang diameter selalu dua kali panjang jari-jari (d = 2r).',
    lunaPose: '/assets/luna-pointing.png',
    color: '#10B981'
  },
  diameter: {
    id: 'diameter',
    name: 'Diameter',
    symbol: '(d)',
    badgeName: 'Diameter (d)',
    badgeBg: 'bg-rose-100 text-rose-800',
    definition:
      'Diameter adalah ruas garis lurus yang menghubungkan dua titik pada keliling lingkaran dan melalui titik pusat lingkaran.',
    formulaDisplay: {
      main: (
        <div className="flex items-center gap-2 text-base font-black text-[#123B8A]">
          <span>Rumus:</span>
          <span className="font-mono text-lg text-rose-600">d</span>
          <span>=</span>
          <span className="font-mono text-lg text-[#123B8A]">2 · r</span>
        </div>
      ),
      legend: [
        { key: 'd', desc: 'diameter' },
        { key: 'r', desc: 'jari-jari' }
      ]
    },
    audioText:
      'Diameter adalah ruas garis lurus yang menghubungkan dua titik pada keliling lingkaran dan wajib melalui titik pusat. Diameter membagi lingkaran menjadi dua bagian yang sama besar.',
    lunaTip:
      'Diameter adalah tali busur terpanjang yang ada pada sebuah lingkaran!',
    lunaPose: '/assets/luna-clipboard.png',
    color: '#F43F5E'
  },
  busur: {
    id: 'busur',
    name: 'Busur',
    symbol: '︵',
    badgeName: 'Busur Lingkaran',
    badgeBg: 'bg-amber-100 text-amber-800',
    definition:
      'Busur adalah garis lengkung yang merupakan bagian dari keliling lingkaran yang menghubungkan dua titik sembarang pada lingkaran.',
    formulaDisplay: {
      main: (
        <div className="flex items-center gap-2 text-base font-black text-[#123B8A]">
          <span>Panjang Busur:</span>
          <span className="font-mono text-[#F57200]">
            (α / 360°) × 2πr
          </span>
        </div>
      ),
      legend: [
        { key: 'α', desc: 'sudut pusat (derajat)' },
        { key: '2πr', desc: 'keliling lingkaran' }
      ]
    },
    audioText:
      'Busur adalah bagian lengkung dari keliling lingkaran yang menghubungkan dua titik. Panjang busur sebanding dengan besar sudut pusat yang menghadapinya.',
    lunaTip:
      'Ada busur minor (lengkung kecil) dan busur mayor (lengkung besar). Jika tidak disebutkan, yang dimaksud adalah busur minor!',
    lunaPose: '/assets/luna-thinking.png',
    color: '#F59E0B'
  },
  'tali-busur': {
    id: 'tali-busur',
    name: 'Tali Busur',
    symbol: '—',
    badgeName: 'Tali Busur',
    badgeBg: 'bg-purple-100 text-purple-800',
    definition:
      'Tali busur adalah ruas garis lurus yang menghubungkan dua titik pada keliling lingkaran tanpa harus melalui titik pusat.',
    formulaDisplay: {
      main: (
        <div className="flex items-center gap-2 text-base font-bold text-[#123B8A]">
          <span>Ruas Garis:</span>
          <span className="font-mono text-purple-600 font-bold">Ruas BD</span>
        </div>
      ),
      legend: [
        { key: 'Titik B & D', desc: 'titik pada keliling' },
        { key: 'Garis lurus', desc: 'menghubungkan kedua titik' }
      ]
    },
    audioText:
      'Tali busur adalah ruas garis yang menghubungkan dua titik pada keliling lingkaran. Bedanya dengan busur, tali busur berbentuk garis lurus seperti senar pada busur panah.',
    lunaTip:
      'Bayangkan busur panah! Busurnya adalah garis lengkung kayu, sedangkan tali busurnya adalah senar lurus penarik panah.',
    lunaPose: '/assets/luna-pointing.png',
    color: '#8B5CF6'
  },
  juring: {
    id: 'juring',
    name: 'Juring',
    symbol: '⌔',
    badgeName: 'Juring Lingkaran',
    badgeBg: 'bg-yellow-100 text-yellow-900',
    definition:
      'Juring adalah daerah di dalam lingkaran yang dibatasi oleh dua buah jari-jari dan satu busur yang diapit oleh kedua jari-jari tersebut.',
    formulaDisplay: {
      main: (
        <div className="flex items-center gap-2 text-base font-black text-[#123B8A]">
          <span>Luas Juring:</span>
          <span className="font-mono text-amber-700">
            (α / 360°) × πr²
          </span>
        </div>
      ),
      legend: [
        { key: 'α', desc: 'sudut pusat' },
        { key: 'πr²', desc: 'luas lingkaran total' }
      ]
    },
    audioText:
      'Juring adalah daerah di dalam lingkaran yang dibatasi oleh dua jari-jari dan sebuah busur. Bentuknya menyerupai sepotong kue pizza atau potongan pai yang lezat.',
    lunaTip:
      'Mudah mengingat juring: bayangkan satu potongan pizza yang ditarik dari loyangnya!',
    lunaPose: '/assets/luna-thinking.png',
    color: '#EAB308'
  },
  tembereng: {
    id: 'tembereng',
    name: 'Tembereng',
    symbol: '◖',
    badgeName: 'Tembereng',
    badgeBg: 'bg-sky-100 text-sky-800',
    definition:
      'Tembereng adalah daerah di dalam lingkaran yang dibatasi oleh sebuah tali busur dan busur yang bersesuaian.',
    formulaDisplay: {
      main: (
        <div className="flex items-center gap-2 text-base font-black text-[#123B8A]">
          <span>Luas Tembereng:</span>
          <span className="font-mono text-[#2875FB] text-sm">
            Luas Juring − Luas Segitiga
          </span>
        </div>
      ),
      legend: [
        { key: 'Luas Juring', desc: 'daerah juring pembuat' },
        { key: 'Luas Segitiga', desc: 'segitiga di antara 2 jari-jari' }
      ]
    },
    audioText:
      'Tembereng adalah daerah di dalam lingkaran yang dibatasi oleh sebuah tali busur dan busur lingkarannya. Luas tembereng didapat dari luas juring dikurangi luas segitiga di dalamnya.',
    lunaTip:
      'Tembereng adalah pinggiran kerak pizza setelah bagian segitiganya kamu potong!',
    lunaPose: '/assets/luna-clipboard.png',
    color: '#0284C7'
  },
  apotema: {
    id: 'apotema',
    name: 'Apotema',
    symbol: '⊥',
    badgeName: 'Apotema',
    badgeBg: 'bg-teal-100 text-teal-800',
    definition:
      'Apotema adalah ruas garis yang menghubungkan titik pusat lingkaran secara tegak lurus (90°) dengan suatu tali busur.',
    formulaDisplay: {
      main: (
        <div className="flex items-center gap-2 text-base font-black text-[#123B8A]">
          <span>Sifat:</span>
          <span className="font-mono text-teal-700 font-bold">
            Apotema ⊥ Tali Busur
          </span>
        </div>
      ),
      legend: [
        { key: '⊥', desc: 'tegak lurus membentuk 90°' },
        { key: 'Jarak terpendek', desc: 'dari titik pusat ke tali busur' }
      ]
    },
    audioText:
      'Apotema adalah ruas garis dari titik pusat lingkaran yang tegak lurus sembilan puluh derajat terhadap tali busur. Apotema selalu membagi tali busur menjadi dua bagian yang sama panjang.',
    lunaTip:
      'Apotema selalu membentuk sudut siku-siku 90° dengan tali busur dan membagi tali busur tepat di tengah!',
    lunaPose: '/assets/luna-pointing.png',
    color: '#0D9488'
  }
};

export default function UnsurLingkaranPage() {
  const [activeElement, setActiveElement] = useState<string>('jari-jari');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const current = circleElementsData[activeElement] || circleElementsData['jari-jari'];

  // Initialize SpeechSynthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const handleSelectElement = (id: string) => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsPlayingAudio(false);
    setActiveElement(id);
  };

  const handleToggleAudio = () => {
    if (!synthRef.current) {
      alert('Fitur suara tidak didukung di peramban ini.');
      return;
    }

    if (isPlayingAudio) {
      synthRef.current.cancel();
      setIsPlayingAudio(false);
    } else {
      synthRef.current.cancel(); // clear previous
      const utterance = new SpeechSynthesisUtterance(current.audioText);
      utterance.lang = 'id-ID';
      utterance.rate = 0.95;
      utterance.pitch = 1.05;

      utterance.onend = () => {
        setIsPlayingAudio(false);
      };
      utterance.onerror = () => {
        setIsPlayingAudio(false);
      };

      utteranceRef.current = utterance;
      synthRef.current.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#63C9F4] font-sans select-none flex flex-col lg:flex-row overflow-x-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full bg-white/10" />
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 rounded-full bg-white/10" />
        <div className="absolute top-1/2 right-10 w-24 h-24 rounded-full bg-white/15" />
        <div className="absolute bottom-10 left-10 w-16 h-16 rounded-full bg-white/15" />
        <div className="absolute top-24 right-[15%] w-3 h-3 rounded-full bg-white/60" />
        <div className="absolute top-44 left-[18%] w-2.5 h-2.5 rounded-full bg-white/50" />
      </div>

      {/* =========================================================================
          1. SIDEBAR KIRI (Lebar ~18-20% pada desktop, berisi navigasi materi & Luna)
      ========================================================================= */}
      <aside className="w-full lg:w-72 xl:w-80 bg-[#2875FB] text-white flex flex-col justify-between shrink-0 z-20 shadow-xl border-r border-blue-400/40 p-4 sm:p-6 relative">
        
        <div>
          {/* Brand Header di Sidebar */}
          <Link href="/dashboard" className="flex items-center gap-3 mb-6 sm:mb-8 group transition-transform active:scale-95">
            <div className="w-12 h-12 rounded-full bg-[#63C9F4] border-2 border-white overflow-hidden shadow-sm flex items-center justify-center shrink-0">
              <Image
                src="/assets/luna.png"
                alt="Logo LINTERA"
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

          {/* Navigasi 3 Materi */}
          <nav className="flex flex-col gap-2.5" aria-label="Navigasi Materi">
            
            {/* 1. Unsur-unsur Lingkaran (Menu Aktif) */}
            <div className="flex items-center justify-between px-4 py-3.5 rounded-2xl bg-[#123B8A] text-white font-black text-sm shadow-md border border-blue-400/30">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center shrink-0">
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-white" />
                </span>
                <span className="leading-snug">Unsur-unsur<br />Lingkaran</span>
              </div>
              <ChevronRight className="w-4 h-4 text-white" />
            </div>

            {/* 2. Kedudukan Titik pada Lingkaran (Menu Tersedia) */}
            <Link
              href="/materi/kedudukan-titik"
              className="flex items-center justify-between px-4 py-3.5 rounded-2xl bg-white/95 hover:bg-white text-[#123B8A] font-extrabold text-sm shadow-sm transition-all hover:translate-x-1"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full border-2 border-dashed border-[#123B8A] flex items-center justify-center shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#123B8A]" />
                </span>
                <span className="leading-snug">Kedudukan Titik<br />pada Lingkaran</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            {/* 3. Kedudukan Garis pada Lingkaran (Menu Tersedia) */}
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

        {/* Luna Dekoratif di Bawah Sidebar (Hanya Desktop/Tablet) */}
        <div className="hidden lg:flex flex-col items-center pt-6 mt-6 border-t border-blue-400/40 relative">
          <div className="relative w-40 h-44 flex items-end justify-center animate-gentle-bob">
            {/* Sparkle yellow */}
            <div className="absolute top-2 left-4 flex gap-1 pointer-events-none">
              <span className="w-3 h-1 bg-[#FFD34E] rounded-full transform -rotate-45" />
              <span className="w-3.5 h-1 bg-[#FFD34E] rounded-full transform rotate-12" />
            </div>
            <Image
              src="/assets/luna-pointing.png"
              alt="Luna menjelaskan unsur lingkaran"
              width={180}
              height={180}
              className="w-full h-full object-contain pointer-events-none drop-shadow-md"
            />
          </div>
        </div>

      </aside>

      {/* =========================================================================
          2. KONTEN UTAMA (Header + 2 Kolom Layout)
      ========================================================================= */}
      <div className="flex-1 flex flex-col justify-between p-4 sm:p-6 lg:p-8 z-10 overflow-y-auto">
        
        {/* Header Konten: Judul Unsur-unsur Lingkaran & Tombol Aksi Kanan */}
        <header className="w-full flex items-center justify-between pb-4 sm:pb-6">
          <div>
            <div className="relative inline-block">
              <h1 className="text-2xl sm:text-4xl lg:text-4.5xl font-black text-[#123B8A] tracking-tight">
                Unsur-unsur Lingkaran
              </h1>
              {/* Garis dekoratif kuning di bawah judul */}
              <svg
                className="absolute -bottom-2 sm:-bottom-2.5 left-0 w-36 sm:w-48 text-[#FFD34E]"
                viewBox="0 0 160 14"
                fill="none"
              >
                <path
                  d="M4 6C45 12 115 12 156 6"
                  stroke="#FFD34E"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Tombol Info & Kembali (Putih Bulat, Ikon Biru, Tanpa Tulisan) */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              onClick={() => setShowInfoModal(true)}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-[#2875FB] hover:text-[#1C64E8] flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all border border-blue-100"
              aria-label="Info Cara Belajar"
              title="Informasi Panduan"
            >
              <Info className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </button>

            {/* Tombol Kembali mengarah ke Dashboard LINTERA */}
            <Link
              href="/dashboard"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-[#2875FB] hover:text-[#1C64E8] flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all border border-blue-100"
              aria-label="Kembali ke Dashboard"
              title="Kembali ke Dashboard"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </Link>
          </div>
        </header>

        {/* Tata Letak Dua Kolom */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch my-auto">
          
          {/* -------------------------------------------------------------------
              KOLOM KIRI: DIAGRAM INTERAKTIF
          ------------------------------------------------------------------- */}
          <section className="lg:col-span-6 bg-white/95 backdrop-blur-md rounded-3xl sm:rounded-[32px] p-5 sm:p-7 shadow-xl shadow-blue-900/10 border-4 border-white flex flex-col justify-between relative">
            
            {/* Header Diagram */}
            <div className="w-full flex items-center justify-between mb-2">
              <h2 className="text-base sm:text-lg font-black text-[#123B8A]">
                Diagram Interaktif
              </h2>
              <span className={`text-xs font-black px-3.5 py-1.5 rounded-full ${current.badgeBg}`}>
                {current.badgeName}
              </span>
            </div>

            {/* Canvas Diagram Lingkaran Interaktif (Dengan O, A, B, C, D) */}
            <div className="relative w-full aspect-square max-w-[340px] sm:max-w-[380px] mx-auto my-2 flex items-center justify-center">
              <svg viewBox="0 0 280 280" className="w-full h-full drop-shadow-sm select-none">
                
                {/* 1. Juring Area (Sector O-A-C) saat Juring Aktif */}
                {activeElement === 'juring' && (
                  <path
                    d="M140 140 L240 140 A100 100 0 0 0 190 53.4 Z"
                    fill="#FEF08A"
                    fillOpacity="0.85"
                    stroke="#EAB308"
                    strokeWidth="2.5"
                    className="animate-pulse"
                  />
                )}

                {/* 2. Tembereng Area (Segment BD) saat Tembereng Aktif */}
                {activeElement === 'tembereng' && (
                  <path
                    d="M40 140 A100 100 0 0 0 74 214 L40 140 Z"
                    fill="#BAE6FD"
                    fillOpacity="0.85"
                    stroke="#0284C7"
                    strokeWidth="2.5"
                    className="animate-pulse"
                  />
                )}

                {/* Lingkaran Dasar (Abu-abu kebiruan netral) */}
                <circle
                  cx="140"
                  cy="140"
                  r="100"
                  stroke="#94A3B8"
                  strokeWidth="3.5"
                  fill="none"
                />

                {/* 3. Busur Highlight (Lengkung Lingkaran AC atau BD) saat Busur Aktif */}
                {activeElement === 'busur' && (
                  <path
                    d="M240 140 A100 100 0 0 0 190 53.4"
                    stroke="#F59E0B"
                    strokeWidth="8"
                    strokeLinecap="round"
                    fill="none"
                  />
                )}

                {/* Garis Horizontal B - O - C (Garis Bantu Dasar) */}
                <line
                  x1="40"
                  y1="140"
                  x2="240"
                  y2="140"
                  stroke={activeElement === 'diameter' ? '#F43F5E' : '#CBD5E1'}
                  strokeWidth={activeElement === 'diameter' ? '5.5' : '2'}
                  strokeDasharray={activeElement === 'diameter' ? undefined : '4 4'}
                  strokeLinecap="round"
                />

                {/* 4. Diameter Label saat Diameter Aktif */}
                {activeElement === 'diameter' && (
                  <text x="134" y="130" fill="#F43F5E" fontSize="14" fontWeight="bold">d</text>
                )}

                {/* Garis Jari-Jari O ke A */}
                <line
                  x1="140"
                  y1="140"
                  x2="190"
                  y2="53.4"
                  stroke={activeElement === 'jari-jari' ? '#10B981' : '#CBD5E1'}
                  strokeWidth={activeElement === 'jari-jari' ? '6' : '2.5'}
                  strokeLinecap="round"
                />

                {/* Huruf r pada Jari-Jari saat Jari-Jari Aktif */}
                {activeElement === 'jari-jari' && (
                  <text x="156" y="98" fill="#10B981" fontSize="17" fontWeight="bold">r</text>
                )}

                {/* Garis Tali Busur B ke D */}
                <line
                  x1="40"
                  y1="140"
                  x2="74"
                  y2="214"
                  stroke={activeElement === 'tali-busur' ? '#8B5CF6' : '#CBD5E1'}
                  strokeWidth={activeElement === 'tali-busur' ? '5.5' : '2.5'}
                  strokeLinecap="round"
                />

                {/* 5. Apotema (Garis tegak lurus dari O ke Tali Busur BD) */}
                <line
                  x1="140"
                  y1="140"
                  x2="57"
                  y2="177"
                  stroke={activeElement === 'apotema' ? '#0D9488' : '#E2E8F0'}
                  strokeWidth={activeElement === 'apotema' ? '4.5' : '1.5'}
                  strokeDasharray={activeElement === 'apotema' ? undefined : '2 2'}
                  strokeLinecap="round"
                />

                {/* Kotak Siku-siku 90° Apotema */}
                {activeElement === 'apotema' && (
                  <g>
                    <rect x="58" y="170" width="8" height="8" fill="none" stroke="#0D9488" strokeWidth="1.5" transform="rotate(-30 58 170)" />
                    <text x="88" y="152" fill="#0D9488" fontSize="11" fontWeight="bold">Apotema</text>
                  </g>
                )}

                {/* Titik Pusat O */}
                <circle
                  cx="140"
                  cy="140"
                  r={activeElement === 'titik-pusat' ? '8' : '5'}
                  fill="#123B8A"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  className={activeElement === 'titik-pusat' ? 'animate-ping-once' : ''}
                />
                <text x="126" y="132" fill="#123B8A" fontSize="15" fontWeight="900">O</text>

                {/* Titik A */}
                <circle
                  cx="190"
                  cy="53.4"
                  r={activeElement === 'jari-jari' ? '7' : '5'}
                  fill={activeElement === 'jari-jari' ? '#10B981' : '#94A3B8'}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
                <text x="194" y="44" fill="#123B8A" fontSize="15" fontWeight="900">A</text>

                {/* Sparkle di dekat A saat Jari-jari aktif */}
                {activeElement === 'jari-jari' && (
                  <g transform="translate(204, 38)">
                    <rect x="0" y="0" width="3" height="8" rx="1.5" fill="#FFD34E" transform="rotate(25)" />
                    <rect x="6" y="6" width="3" height="8" rx="1.5" fill="#FFD34E" transform="rotate(70)" />
                  </g>
                )}

                {/* Titik B */}
                <circle cx="40" cy="140" r="5" fill="#94A3B8" stroke="#FFFFFF" strokeWidth="2" />
                <text x="20" y="145" fill="#123B8A" fontSize="15" fontWeight="900">B</text>

                {/* Titik C */}
                <circle cx="240" cy="140" r="5" fill="#94A3B8" stroke="#FFFFFF" strokeWidth="2" />
                <text x="250" y="145" fill="#123B8A" fontSize="15" fontWeight="900">C</text>

                {/* Titik D */}
                <circle cx="74" cy="214" r="5" fill="#94A3B8" stroke="#FFFFFF" strokeWidth="2" />
                <text x="60" y="235" fill="#123B8A" fontSize="15" fontWeight="900">D</text>

              </svg>
            </div>

            {/* Teks Petunjuk di Bagian Bawah Diagram */}
            <div className="w-full bg-[#EBF5FF] rounded-2xl p-3 flex items-center gap-2.5 text-xs font-bold text-[#123B8A]">
              <Lightbulb className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <span>Tekan tombol unsur di sebelah kanan untuk melihat posisinya pada diagram!</span>
            </div>

          </section>

          {/* -------------------------------------------------------------------
              KOLOM KANAN: 3 KARTU (PENJELASAN + 8 TOMBOL + TIPS LUNA)
          ------------------------------------------------------------------- */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4">
            
            {/* 1. KARTU PENJELASAN UNSUR (Atas) */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-xl shadow-blue-900/10 border-4 border-white flex flex-col justify-between relative">
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2875FB] flex items-center justify-center">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                      DEFINISI UNSUR
                    </span>
                  </div>

                  {/* Tombol Audio Penjelasan Berbahasa Indonesia */}
                  <button
                    onClick={handleToggleAudio}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      isPlayingAudio
                        ? 'bg-[#2875FB] text-white ring-4 ring-blue-200 animate-pulse'
                        : 'bg-blue-50 text-[#2875FB] hover:bg-blue-100'
                    }`}
                    aria-label={isPlayingAudio ? 'Hentikan Suara' : 'Dengarkan Penjelasan'}
                    title={isPlayingAudio ? 'Hentikan Suara' : 'Dengarkan Penjelasan'}
                  >
                    {isPlayingAudio ? (
                      <VolumeX className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <Volume2 className="w-4 h-4 stroke-[2.5]" />
                    )}
                  </button>
                </div>

                {/* Nama Unsur */}
                <h3 className="text-xl sm:text-2xl font-black text-[#123B8A] mb-1.5">
                  {current.name} {current.symbol}
                </h3>

                {/* Penjelasan Singkat */}
                <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed mb-3">
                  {current.definition}
                </p>
              </div>

              {/* Rumus / Notasi Matematika yang Diformat Bersih (Tanpa kode mentah LaTeX) */}
              {current.formulaDisplay && (
                <div className="bg-[#FFFBEB] border border-amber-200/80 rounded-2xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#F57200] shrink-0" />
                    <div>{current.formulaDisplay.main}</div>
                  </div>

                  <div className="border-t sm:border-t-0 sm:border-l border-amber-200 pt-2 sm:pt-0 sm:pl-4 flex flex-col text-[11px] text-slate-600 font-semibold leading-tight">
                    {current.formulaDisplay.legend.map((item, idx) => (
                      <span key={idx}>
                        <strong className="font-mono text-[#123B8A]">{item.key}</strong> = {item.desc}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* 2. KARTU PILIH UNSUR LINGKARAN (Tengah: 4 Kolom × 2 Baris) */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 shadow-xl shadow-blue-900/10 border-4 border-white">
              <h3 className="text-xs sm:text-sm font-black text-[#123B8A] mb-3">
                Pilih Unsur Lingkaran:
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                
                {/* 1. Titik Pusat */}
                <button
                  onClick={() => handleSelectElement('titik-pusat')}
                  className={`py-2.5 px-2.5 rounded-2xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 border ${
                    activeElement === 'titik-pusat'
                      ? 'bg-[#2875FB] text-white border-[#2875FB] shadow-md scale-102'
                      : 'bg-[#F8FAFC] hover:bg-blue-50 text-[#123B8A] border-slate-200/70'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${activeElement === 'titik-pusat' ? 'bg-white' : 'bg-[#123B8A]'}`} />
                  <span>Titik Pusat</span>
                </button>

                {/* 2. Jari-Jari */}
                <button
                  onClick={() => handleSelectElement('jari-jari')}
                  className={`py-2.5 px-2.5 rounded-2xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 border ${
                    activeElement === 'jari-jari'
                      ? 'bg-[#2875FB] text-white border-[#2875FB] shadow-md scale-102'
                      : 'bg-[#F8FAFC] hover:bg-blue-50 text-[#123B8A] border-slate-200/70'
                  }`}
                >
                  <CircleDot className="w-3.5 h-3.5" />
                  <span>Jari-Jari</span>
                </button>

                {/* 3. Diameter */}
                <button
                  onClick={() => handleSelectElement('diameter')}
                  className={`py-2.5 px-2.5 rounded-2xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 border ${
                    activeElement === 'diameter'
                      ? 'bg-[#2875FB] text-white border-[#2875FB] shadow-md scale-102'
                      : 'bg-[#F8FAFC] hover:bg-blue-50 text-[#123B8A] border-slate-200/70'
                  }`}
                >
                  <span className={`w-4 h-0.5 transform -rotate-45 ${activeElement === 'diameter' ? 'bg-white' : 'bg-rose-500'}`} />
                  <span>Diameter</span>
                </button>

                {/* 4. Busur */}
                <button
                  onClick={() => handleSelectElement('busur')}
                  className={`py-2.5 px-2.5 rounded-2xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 border ${
                    activeElement === 'busur'
                      ? 'bg-[#2875FB] text-white border-[#2875FB] shadow-md scale-102'
                      : 'bg-[#F8FAFC] hover:bg-blue-50 text-[#123B8A] border-slate-200/70'
                  }`}
                >
                  <span className={`w-3.5 h-2 rounded-t-full border-t-2 ${activeElement === 'busur' ? 'border-white' : 'border-amber-500'}`} />
                  <span>Busur</span>
                </button>

                {/* 5. Tali Busur */}
                <button
                  onClick={() => handleSelectElement('tali-busur')}
                  className={`py-2.5 px-2.5 rounded-2xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 border ${
                    activeElement === 'tali-busur'
                      ? 'bg-[#2875FB] text-white border-[#2875FB] shadow-md scale-102'
                      : 'bg-[#F8FAFC] hover:bg-blue-50 text-[#123B8A] border-slate-200/70'
                  }`}
                >
                  <span className={`w-4 h-0.5 ${activeElement === 'tali-busur' ? 'bg-white' : 'bg-purple-500'}`} />
                  <span>Tali Busur</span>
                </button>

                {/* 6. Juring */}
                <button
                  onClick={() => handleSelectElement('juring')}
                  className={`py-2.5 px-2.5 rounded-2xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 border ${
                    activeElement === 'juring'
                      ? 'bg-[#2875FB] text-white border-[#2875FB] shadow-md scale-102'
                      : 'bg-[#F8FAFC] hover:bg-blue-50 text-[#123B8A] border-slate-200/70'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-tr-full border-t-2 border-r-2 ${activeElement === 'juring' ? 'border-white' : 'border-yellow-500'}`} />
                  <span>Juring</span>
                </button>

                {/* 7. Tembereng */}
                <button
                  onClick={() => handleSelectElement('tembereng')}
                  className={`py-2.5 px-2.5 rounded-2xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 border ${
                    activeElement === 'tembereng'
                      ? 'bg-[#2875FB] text-white border-[#2875FB] shadow-md scale-102'
                      : 'bg-[#F8FAFC] hover:bg-blue-50 text-[#123B8A] border-slate-200/70'
                  }`}
                >
                  <span className={`w-3.5 h-2 rounded-t-full border-t-2 border-x-2 ${activeElement === 'tembereng' ? 'border-white' : 'border-sky-500'}`} />
                  <span>Tembereng</span>
                </button>

                {/* 8. Apotema */}
                <button
                  onClick={() => handleSelectElement('apotema')}
                  className={`py-2.5 px-2.5 rounded-2xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 border ${
                    activeElement === 'apotema'
                      ? 'bg-[#2875FB] text-white border-[#2875FB] shadow-md scale-102'
                      : 'bg-[#F8FAFC] hover:bg-blue-50 text-[#123B8A] border-slate-200/70'
                  }`}
                >
                  <span className={`font-mono font-bold ${activeElement === 'apotema' ? 'text-white' : 'text-teal-600'}`}>⊥</span>
                  <span>Apotema</span>
                </button>

              </div>
            </div>

            {/* 3. KARTU TIPS DARI LUNA (Bawah) */}
            <div className="bg-[#EBF5FF] border border-blue-200/80 rounded-3xl p-4 sm:p-4.5 flex items-center gap-4 shadow-sm relative overflow-hidden">
              {/* Gambar Luna yang bervariasi sesuai unsur */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 flex items-center justify-center">
                <Image
                  src={current.lunaPose}
                  alt="Luna maskot LINTERA"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain pointer-events-none drop-shadow-sm"
                />
              </div>

              {/* Teks Tips Luna yang Berubah Sesuai Unsur */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-black text-[#123B8A] flex items-center gap-1.5 mb-0.5">
                  <span>Tips dari Luna:</span>
                  <span className="text-[#FFD34E]">✦</span>
                </h4>
                <p className="text-xs sm:text-[13px] font-bold text-[#123B8A]/90 leading-relaxed">
                  {current.lunaTip}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* =========================================================================
          MODAL INFORMASI PANDUAN BELAJAR
      ========================================================================= */}
      {showInfoModal && (
        <div
          className="fixed inset-0 z-50 bg-[#123B8A]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowInfoModal(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 relative border border-blue-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-[#2875FB] flex items-center justify-center">
                  <Info className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#123B8A]">Petunjuk Belajar Unsur Lingkaran</h3>
                  <p className="text-xs text-slate-500 font-semibold">Panduan Eksplorasi Interaktif</p>
                </div>
              </div>
              <button
                onClick={() => setShowInfoModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-slate-600 text-xs sm:text-sm leading-relaxed">
              <p>
                Selamat datang di laboratorium <strong>Unsur-unsur Lingkaran LINTERA</strong>! Berikut cara belajar yang seru bersama Luna:
              </p>
              <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-xs text-[#123B8A] space-y-2 font-medium">
                <p>1. <strong>Pilih Unsur:</strong> Tekan salah satu dari 8 tombol unsur lingkaran untuk melihat sorotan warna pada diagram.</p>
                <p>2. <strong>Pelajari Definisi & Rumus:</strong> Perhatikan kotak keterangan di sebelah kanan untuk memahami rumus dan sifat geometrinya.</p>
                <p>3. <strong>Dengarkan Audio:</strong> Klik tombol speaker pada kartu penjelasan untuk mendengarkan Luna menjelaskan unsur tersebut dalam bahasa Indonesia.</p>
                <p>4. <strong>Baca Tips Luna:</strong> Simak tips cepat di bagian bawah untuk trik mengingat konsep lingkaran.</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowInfoModal(false)}
                className="px-6 py-2.5 rounded-full bg-[#2875FB] hover:bg-[#1C64E8] text-white font-bold text-sm shadow-md active:scale-95 transition-all"
              >
                Mengerti
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
