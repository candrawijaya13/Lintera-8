'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronLeft,
  Home,
  CheckCircle2,
  Lock,
  Sparkles,
  Trophy,
  RotateCcw,
  BookOpen,
  Compass,
  Target,
  LineChart,
  ArrowRight
} from 'lucide-react';
import {
  getSimulasiProgress,
  completeSimulasiStage,
  resetSimulasiProgress,
  SimulasiProgress
} from '../../lib/simulasi/progress';
import Tahap1MenggambarLingkaran from '../../components/simulasi/Tahap1MenggambarLingkaran';
import Tahap2DiagramCartesius from '../../components/simulasi/Tahap2DiagramCartesius';
import Tahap3KedudukanTitik from '../../components/simulasi/Tahap3KedudukanTitik';
import Tahap4KedudukanGaris from '../../components/simulasi/Tahap4KedudukanGaris';

const STAGES = [
  {
    id: 1,
    title: 'Tahap 1',
    subtitle: 'Menggambar Lingkaran dengan Benar',
    shortDesc: 'Unsur & Bentuk Lingkaran Presisi',
    icon: Compass,
    lunaDialog: 'Halo! Di Tahap 1 ini, ayo pelajari unsur-unsur lingkaran dan latih kemampuanmu menggambar lingkaran sempurna yang tidak lonjong!',
  },
  {
    id: 2,
    title: 'Tahap 2',
    subtitle: 'Diagram Cartesius',
    shortDesc: 'Pusat P(a, b) & Jari-jari r',
    icon: LineChart,
    lunaDialog: 'Hebat! Di Tahap 2, kita akan menggambar lingkaran pada koordinat Cartesius dan melihat langsung rumus persamaannya!',
  },
  {
    id: 3,
    title: 'Tahap 3',
    subtitle: 'Kedudukan Titik',
    shortDesc: 'Di Dalam, Pada, & Di Luar',
    icon: Target,
    lunaDialog: 'Keren! Di Tahap 3, geser titik P untuk mengamati jarak d ke pusat dan bandingkan dengan jari-jari lingkaran!',
  },
  {
    id: 4,
    title: 'Tahap 4',
    subtitle: 'Kedudukan Garis',
    shortDesc: 'Secan, Singgung, & Di Luar',
    icon: Sparkles,
    lunaDialog: 'Tahap Puncak! Putar dan geser garis lurus untuk menyelidiki garis potong, garis singgung, dan diskriminan D!',
  },
];

export default function SimulasiInteraktifPage() {
  const [activeStage, setActiveStage] = useState<number>(1);
  const [progress, setProgress] = useState<SimulasiProgress>(() => getSimulasiProgress());
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  const handleStageSuccess = (stageId: number) => {
    const updated = completeSimulasiStage(stageId);
    setProgress(updated);
  };

  const handleNextStage = (nextId: number) => {
    if (nextId <= 4) {
      setActiveStage(nextId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFinishAll = () => {
    handleStageSuccess(4);
    setShowCelebration(true);
  };

  const handleResetAll = () => {
    if (confirm('Ulangi seluruh progres Simulasi Interaktif dari Tahap 1?')) {
      const fresh = resetSimulasiProgress();
      setProgress(fresh);
      setActiveStage(1);
      setShowCelebration(false);
    }
  };

  const currentStageInfo = STAGES.find((s) => s.id === activeStage) || STAGES[0];

  return (
    <div
      className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden font-sans select-none bg-[#F0F7FF]"
      style={{
        backgroundImage: "radial-gradient(#BFDBFE 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      {/* Soft gradient banner on top */}
      <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-sky-400/20 via-sky-300/10 to-transparent pointer-events-none" />

      {/* TOP HEADER NAVIGATION */}
      <header className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-5 pb-3 flex items-center justify-between">
        {/* Tombol Kembali ke Dashboard */}
        <Link
          href="/dashboard"
          className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white text-[#2875FB] hover:text-[#1C64E8] flex items-center justify-center border-2 border-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
          aria-label="Kembali ke Dashboard"
          title="Kembali ke Dashboard"
        >
          <ChevronLeft className="w-6 h-6 stroke-[3] -ml-0.5" />
        </Link>

        {/* Brand Center */}
        <div className="flex flex-col items-center">
          <div className="relative inline-flex items-center group">
            <span className="text-2xl sm:text-3.5xl font-black tracking-tight text-[#123B8A] flex items-center">
              L
              <span className="relative text-[#123B8A]">
                I
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#F57200]" />
              </span>
              NTERA
            </span>
            <svg className="absolute -bottom-1.5 left-2 w-20 text-[#FFD34E]" viewBox="0 0 100 16" fill="none">
              <path d="M4 4C28 14 68 14 96 4" stroke="#FFD34E" strokeWidth="6" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-[11px] sm:text-xs font-black text-[#2875FB] uppercase tracking-wider mt-1">
            Simulasi Interaktif Lingkaran
          </span>
        </div>

        {/* Home Button */}
        <Link
          href="/dashboard"
          className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white text-[#2875FB] hover:text-[#1C64E8] flex items-center justify-center border-2 border-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
          aria-label="Beranda"
          title="Beranda"
        >
          <Home className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
        </Link>
      </header>

      {/* MAIN CONTAINER */}
      <main className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex-1 flex flex-col gap-5">
        
        {/* 1. LUNA GREETING & STAGE OVERVIEW BANNER */}
        <div className="w-full bg-white/90 backdrop-blur-md rounded-3xl p-4 sm:p-5 border-2 border-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 sm:gap-4 w-full md:w-auto">
            <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-amber-100 border-2 border-amber-300 overflow-hidden shrink-0 shadow-xs flex items-center justify-center">
              <Image
                src="/assets/luna.png"
                alt="Luna Mascot"
                width={72}
                height={72}
                className="object-contain"
              />
            </div>
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black uppercase tracking-wider">
                Sahabat Belajar Luna
              </span>
              <p className="text-xs sm:text-sm font-bold text-[#123B8A] leading-snug mt-1 max-w-xl">
                {currentStageInfo.lunaDialog}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
            <button
              onClick={handleResetAll}
              className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              title="Reset seluruh progres"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Progres</span>
            </button>
          </div>
        </div>

        {/* 2. FOUR STAGES STEPPER TABS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
          {STAGES.map((stg) => {
            const isUnlocked = progress.unlockedStages.includes(stg.id);
            const isCompleted = progress.completedStages.includes(stg.id);
            const isActive = activeStage === stg.id;
            const IconComp = stg.icon;

            return (
              <button
                key={stg.id}
                onClick={() => {
                  if (isUnlocked) {
                    setActiveStage(stg.id);
                  }
                }}
                disabled={!isUnlocked}
                className={`p-3 sm:p-3.5 rounded-2xl border-2 text-left transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? 'bg-[#2875FB] border-[#1C64E8] text-white shadow-lg shadow-blue-500/20 scale-[1.02]'
                    : isCompleted
                    ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950 hover:bg-emerald-100/90'
                    : isUnlocked
                    ? 'bg-white border-blue-100 text-[#123B8A] hover:bg-blue-50/80 shadow-xs'
                    : 'bg-slate-100/80 border-slate-200 text-slate-400 cursor-not-allowed opacity-75'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-[10px] sm:text-xs font-black uppercase tracking-wider ${
                      isActive ? 'text-white/90' : isCompleted ? 'text-emerald-700' : 'text-slate-500'
                    }`}
                  >
                    {stg.title}
                  </span>
                  {isCompleted ? (
                    <CheckCircle2
                      className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-600'}`}
                    />
                  ) : !isUnlocked ? (
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                  ) : (
                    <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#2875FB]'}`} />
                  )}
                </div>

                <div>
                  <h3
                    className={`text-xs sm:text-sm font-black leading-tight ${
                      isActive ? 'text-white' : 'text-[#123B8A]'
                    }`}
                  >
                    {stg.subtitle}
                  </h3>
                  <p
                    className={`text-[10px] font-semibold mt-0.5 line-clamp-1 ${
                      isActive ? 'text-white/80' : 'text-slate-500'
                    }`}
                  >
                    {stg.shortDesc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* 3. ACTIVE STAGE COMPONENT */}
        <div className="w-full">
          {activeStage === 1 && (
            <Tahap1MenggambarLingkaran
              onSuccess={() => handleStageSuccess(1)}
              onNextStage={() => handleNextStage(2)}
            />
          )}

          {activeStage === 2 && (
            <Tahap2DiagramCartesius
              onSuccess={() => handleStageSuccess(2)}
              onNextStage={() => handleNextStage(3)}
            />
          )}

          {activeStage === 3 && (
            <Tahap3KedudukanTitik
              onSuccess={() => handleStageSuccess(3)}
              onNextStage={() => handleNextStage(4)}
            />
          )}

          {activeStage === 4 && (
            <Tahap4KedudukanGaris
              onSuccess={() => handleStageSuccess(4)}
              onFinishAll={handleFinishAll}
            />
          )}
        </div>

      </main>

      {/* 4. GRAND CELEBRATION MODAL */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 bg-[#123B8A]/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl sm:rounded-[36px] p-6 sm:p-9 max-w-lg w-full text-center space-y-5 border-4 border-amber-300 shadow-2xl animate-scale-in">
            <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
              <Trophy className="w-10 h-10" />
            </div>

            <div>
              <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
                Master Simulasi Selesai!
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#123B8A] mt-2">
                Selamat! Kamu Berhasil Menuntaskan 4 Tahap Lingkaran!
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-2 leading-relaxed">
                Kamu telah menguasai cara menggambar lingkaran dengan benar, memetakannya pada bidang Cartesius, menganalisis kedudukan titik, serta membuktikan kedudukan garis singgung dan garis sekan!
              </p>
            </div>

            <div className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl border border-amber-200 grid grid-cols-2 gap-3 text-center">
              <div>
                <span className="text-xs font-bold text-slate-500 block">Tahap Tuntas</span>
                <span className="text-xl font-black text-emerald-600">4 / 4 Tahap</span>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500 block">Status Pemahaman</span>
                <span className="text-xl font-black text-amber-600">Sangat Mahir ★</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() => setShowCelebration(false)}
                className="w-full py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs sm:text-sm transition-all cursor-pointer"
              >
                Lihat Kembali Simulasi
              </button>
              <Link
                href="/dashboard"
                className="w-full py-3.5 rounded-full bg-[#2875FB] hover:bg-[#1C64E8] text-white font-black text-xs sm:text-sm shadow-md transition-all text-center cursor-pointer"
              >
                Kembali ke Dashboard
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="relative z-20 text-center text-slate-500 text-xs font-bold py-4">
        LINTERA • Media Pembelajaran Matematika Lingkaran Interaktif SMA
      </footer>
    </div>
  );
}
