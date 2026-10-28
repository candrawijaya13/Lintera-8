'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronLeft,
  Home,
  Play,
  Sparkles,
  Trophy,
  Star,
  Lock,
  CheckCircle2,
  Volume2,
  VolumeX,
  RotateCcw,
  Award,
  Zap,
  BookOpen
} from 'lucide-react';
import SuperLunaCanvasGame from '@/components/super-luna/SuperLunaCanvasGame';
import { LEVEL_METADATA } from '@/lib/super-luna/questions';
import {
  getPlayerProgress,
  saveLevelResult,
  resetPlayerProgress,
  PlayerProgress,
  DEFAULT_PROGRESS
} from '@/lib/super-luna/progress';
import { soundManager } from '@/lib/super-luna/sound';

export default function SuperLunaPage() {
  const [currentView, setCurrentView] = useState<'lobby' | 'levels' | 'playing' | 'victory_all'>('lobby');
  const [selectedLevelId, setSelectedLevelId] = useState<number>(1);
  const [progress, setProgress] = useState<PlayerProgress>(() => getPlayerProgress());
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => !soundManager.isMuted);

  const handleToggleSound = () => {
    const isMuted = soundManager.toggleMute();
    setSoundEnabled(!isMuted);
  };

  const handleStartPlaying = (levelId: number) => {
    soundManager.playSfx('jump');
    soundManager.playBgm();
    setSelectedLevelId(levelId);
    setCurrentView('playing');
  };

  const handleLevelComplete = (score: number, coins: number, maxScore: number) => {
    const updated = saveLevelResult(selectedLevelId, score, maxScore, coins);
    setProgress(updated);

    if (selectedLevelId === 3 && updated.allCompleted) {
      setCurrentView('victory_all');
    } else {
      setCurrentView('levels');
    }
  };

  const handleExitPlaying = () => {
    setCurrentView('levels');
  };

  // Calculate total stars
  const totalStars = Object.values(progress.levelResults).reduce(
    (acc, curr) => acc + (curr.stars || 0),
    0
  );

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#38BDF8] via-[#60A5FA] to-[#93C5FD] font-sans select-none flex flex-col justify-between overflow-x-hidden p-3 sm:p-5 lg:p-7">
      
      {/* Background clouds & rolling green hill */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute top-10 left-12 w-44 h-16 bg-white/70 rounded-full blur-xs" />
        <div className="absolute top-6 left-24 w-28 h-28 bg-white/70 rounded-full blur-xs" />
        <div className="absolute top-16 right-20 w-56 h-20 bg-white/70 rounded-full blur-xs" />
        <div className="absolute top-10 right-32 w-32 h-32 bg-white/70 rounded-full blur-xs" />

        <div className="absolute -bottom-8 left-0 right-0 h-28 bg-[#84CC16] border-t-8 border-[#4D7C0F]" />
        <div className="absolute -bottom-20 left-0 right-0 h-20 bg-[#78350F]" />
      </div>

      {/* Top Header Navigation */}
      <header className="relative z-20 w-full max-w-5xl mx-auto flex items-center justify-between pb-3">
        <Link
          href="/game/individu"
          className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#F43F5E] hover:bg-[#E11D48] text-white flex items-center justify-center border-[3px] border-white shadow-lg hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
          aria-label="Kembali ke Mode Individu"
          title="Kembali ke Mode Individu"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[3.5] -ml-0.5" />
        </Link>

        {/* Global Game Status Banner */}
        <div className="flex items-center gap-3 sm:gap-4 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-2 rounded-full border-2 border-white shadow-lg">
          {/* Total Coins */}
          <div className="flex items-center gap-1.5 font-black text-amber-500 text-sm sm:text-base">
            <span className="w-6 h-6 rounded-full bg-amber-400 border-2 border-amber-600 flex items-center justify-center text-white text-xs font-black shadow-xs">
              ★
            </span>
            <span>{progress.totalCoins}</span>
          </div>

          <div className="w-px h-5 bg-slate-300" />

          {/* Total Stars */}
          <div className="flex items-center gap-1.5 font-black text-amber-500 text-sm sm:text-base">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            <span>{totalStars} / 9</span>
          </div>

          <div className="w-px h-5 bg-slate-300" />

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className="text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
          </button>
        </div>

        <Link
          href="/dashboard"
          className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#F43F5E] hover:bg-[#E11D48] text-white flex items-center justify-center border-[3px] border-white shadow-lg hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
          aria-label="Kembali ke Beranda"
          title="Kembali ke Beranda"
        >
          <Home className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.8]" />
        </Link>
      </header>

      {/* Main Dynamic View */}
      <main className="relative z-20 w-full max-w-5xl mx-auto my-auto py-2">

        {/* 1. LOBBY / TITLE SCREEN */}
        {currentView === 'lobby' && (
          <div className="bg-white rounded-[36px] sm:rounded-[44px] p-6 sm:p-10 border-[6px] border-white shadow-2xl shadow-sky-950/20 text-center space-y-6 max-w-2xl mx-auto animate-scale-in">
            {/* Promo Banner / Mascot */}
            <div className="relative w-52 h-44 sm:w-64 sm:h-52 mx-auto rounded-3xl overflow-hidden shadow-md border-4 border-amber-300">
              <Image
                src="/assets/super-luna.png"
                alt="Super Luna Platformer"
                fill
                priority
                className="object-cover"
              />
            </div>

            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-black uppercase tracking-wider mb-2">
                Game Petualangan Edukasi Matematika Lingkaran
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-[#123B8A] tracking-tight">
                SUPER LUNA
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-2 max-w-lg mx-auto leading-relaxed">
                Bantu Luna menjelajahi pulau terapung geometri! Berlari, melompat, memukul balok misteri matematika, kumpulkan koin bintang, dan kuasai konsep lingkaran SMA!
              </p>
            </div>

            {/* Quick stats badge */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-md mx-auto p-3 bg-sky-50 rounded-2xl border border-sky-100 text-center">
              <div>
                <span className="text-[11px] font-bold text-slate-500 block">Total Bintang</span>
                <span className="text-base sm:text-lg font-black text-amber-500">★ {totalStars}</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-500 block">Total Koin</span>
                <span className="text-base sm:text-lg font-black text-amber-500">🪙 {progress.totalCoins}</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-500 block">Tingkat Level</span>
                <span className="text-base sm:text-lg font-black text-[#123B8A]">
                  {progress.unlockedLevels.length} / 3
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
              <button
                onClick={() => {
                  soundManager.playSfx('jump');
                  soundManager.playBgm();
                  setCurrentView('levels');
                }}
                className="w-full py-4 px-8 rounded-full bg-gradient-to-r from-[#F43F5E] to-[#FF2E63] hover:from-[#E11D48] hover:to-[#F43F5E] text-white font-black text-base sm:text-lg shadow-[0_6px_0_#9F1239] active:translate-y-1 active:shadow-[0_2px_0_#9F1239] transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>Pilih & Mulai Level</span>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#F43F5E]">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* 2. LEVEL SELECT SCREEN */}
        {currentView === 'levels' && (
          <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
            {/* Title */}
            <div className="text-center space-y-1">
              <span className="px-4 py-1 rounded-full bg-white/90 text-[#123B8A] font-black text-xs uppercase tracking-wider shadow-xs">
                Peta Dunia Matematika Super Luna
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white drop-shadow-md">
                Pilih Pulau Petualangan
              </h2>
              <p className="text-xs sm:text-sm font-bold text-white/90">
                Selesaikan setiap level dengan skor minimal 60% untuk membuka pulau berikutnya!
              </p>
            </div>

            {/* 3 Level Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {LEVEL_METADATA.map((lvl) => {
                const isUnlocked = progress.unlockedLevels.includes(lvl.id);
                const result = progress.levelResults[lvl.id];
                const stars = result?.stars || 0;

                return (
                  <div
                    key={lvl.id}
                    className={`relative rounded-3xl p-6 border-[5px] transition-all duration-200 flex flex-col justify-between ${
                      isUnlocked
                        ? 'bg-white border-white shadow-xl hover:-translate-y-1 hover:shadow-2xl'
                        : 'bg-white/80 border-slate-200 opacity-80 backdrop-blur-xs'
                    }`}
                  >
                    {/* Top Level Badge */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-black ${
                            isUnlocked
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          Level {lvl.id}
                        </span>

                        {isUnlocked ? (
                          <div className="flex items-center gap-1 text-amber-400">
                            {[1, 2, 3].map((starIdx) => (
                              <Star
                                key={starIdx}
                                className={`w-4 h-4 ${
                                  starIdx <= stars
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'fill-slate-200 text-slate-300'
                                }`}
                              />
                            ))}
                          </div>
                        ) : (
                          <span className="p-1 rounded-full bg-slate-200 text-slate-600">
                            <Lock className="w-4 h-4" />
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-black text-[#123B8A] leading-snug mb-2">
                        {lvl.title.replace(`Level ${lvl.id}: `, '')}
                      </h3>
                      <p className="text-xs text-slate-600 font-semibold leading-relaxed mb-4">
                        {lvl.subtitle}
                      </p>

                      {/* Best score display */}
                      {isUnlocked && result && (
                        <div className="mb-4 p-2.5 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-between text-xs font-bold text-[#123B8A]">
                          <span>Skor Terbaik:</span>
                          <span className="font-black text-emerald-600">
                            {result.score} Poin
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action button */}
                    {isUnlocked ? (
                      <button
                        onClick={() => handleStartPlaying(lvl.id)}
                        className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-[#2875FB] to-[#1C64E8] hover:from-[#1C64E8] hover:to-[#123B8A] text-white font-black text-sm shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>{result ? 'Main Lagi' : 'Mulai Petualangan'}</span>
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full py-3 px-5 rounded-2xl bg-slate-200 text-slate-500 font-black text-sm flex items-center justify-center gap-2 cursor-not-allowed"
                      >
                        <Lock className="w-4 h-4" />
                        <span>Terkunci (Selesaikan Lv {lvl.id - 1})</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setCurrentView('lobby')}
                className="px-6 py-2.5 rounded-full bg-white/90 hover:bg-white text-slate-700 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                Kembali ke Menu Utama
              </button>
              <button
                onClick={() => {
                  if (confirm('Ulangi seluruh kemajuan permainan Super Luna?')) {
                    const fresh = resetPlayerProgress();
                    setProgress(fresh);
                  }
                }}
                className="px-4 py-2.5 rounded-full bg-rose-500/80 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Kemajuan</span>
              </button>
            </div>
          </div>
        )}

        {/* 3. PLAYING CANVAS ENGINE */}
        {currentView === 'playing' && (
          <div className="animate-fade-in">
            <SuperLunaCanvasGame
              levelId={selectedLevelId}
              onExit={handleExitPlaying}
              onComplete={handleLevelComplete}
              soundEnabled={soundEnabled}
              onToggleSound={handleToggleSound}
            />
          </div>
        )}

        {/* 4. GRAND VICTORY CERTIFICATE */}
        {currentView === 'victory_all' && (
          <div className="bg-white rounded-[36px] sm:rounded-[44px] p-6 sm:p-10 border-[6px] border-amber-300 shadow-2xl text-center space-y-6 max-w-xl mx-auto animate-scale-in">
            <div className="w-24 h-24 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
              <Trophy className="w-12 h-12" />
            </div>

            <div>
              <span className="px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-black uppercase tracking-wider">
                Sertifikat Kehormatan Juara
              </span>
              <h2 className="text-2xl sm:text-3.5xl font-black text-[#123B8A] mt-2">
                Selamat! Kamu Menaklukkan Super Luna!
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
                Luna sangat bangga padamu! Seluruh pulau Unsur Lingkaran, Kedudukan Titik, dan Kedudukan Garis telah kamu selesaikan dengan gemilang!
              </p>
            </div>

            {/* Achievement card */}
            <div className="p-5 bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 rounded-2xl border-2 border-amber-200 space-y-3">
              <div className="flex items-center justify-center gap-1 text-amber-500">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div>
                  <span className="text-xs font-bold text-slate-500 block">Total Koin Bintang</span>
                  <span className="text-2xl font-black text-amber-500">🪙 {progress.totalCoins}</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-500 block">Total Bintang</span>
                  <span className="text-2xl font-black text-amber-500">★ {totalStars} / 9</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => setCurrentView('levels')}
                className="w-full py-3.5 rounded-full bg-[#2875FB] hover:bg-[#1C64E8] text-white font-black text-sm shadow-md transition-all cursor-pointer"
              >
                Jelajahi Peta Level Lagi
              </button>
              <Link
                href="/game/individu"
                className="w-full py-3.5 rounded-full bg-[#F43F5E] hover:bg-[#E11D48] text-white font-black text-sm shadow-md transition-all text-center cursor-pointer"
              >
                Kembali ke Mode Individu
              </Link>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="relative z-20 text-center text-white/90 text-xs font-bold py-2 drop-shadow-xs">
        LINTERA • Super Luna Platformer Matematika SMA
      </footer>

    </div>
  );
}
