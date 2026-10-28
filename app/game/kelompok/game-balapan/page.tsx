'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronLeft,
  Home,
  Play,
  RotateCcw,
  Sparkles,
  Trophy,
  Volume2,
  VolumeX,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Users,
  Flag,
  Zap,
  ArrowRight,
  Info,
  Medal,
  Award,
  Delete,
  Check
} from 'lucide-react';

import {
  RacingTeam,
  RacingQuestion,
  FINISH_LINE_STEPS,
  TEAM_PRESETS,
} from '@/lib/game-balapan/types';
import {
  initializeRacingTeams,
  verifyAnswer,
  rollCorrectStep,
} from '@/lib/game-balapan/session';
import { racingSoundManager } from '@/lib/game-balapan/sound';

export default function GameBalapanPage() {
  // Game flow: 'setup' | 'racing' | 'winner'
  const [viewState, setViewState] = useState<'setup' | 'racing' | 'winner'>('setup');

  // --- SETUP STATE ---
  const [teamCount, setTeamCount] = useState<number>(3); // 2, 3, or 4
  const [teamNames, setTeamNames] = useState<string[]>([
    'Kelompok 1 (Oranye)',
    'Kelompok 2 (Pink)',
    'Kelompok 3 (Hijau)',
    'Kelompok 4 (Putih)',
  ]);
  const [setupError, setSetupError] = useState<string | null>(null);

  // --- RACING STATE ---
  const [teams, setTeams] = useState<RacingTeam[]>([]);
  const [activeTeamIndex, setActiveTeamIndex] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // --- QUESTION INTERACTION STATE ---
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [numericInput, setNumericInput] = useState<string>('');
  const [isAnswerLocked, setIsAnswerLocked] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    stepChange: number;
    explanation: string;
    correctAnswer: string;
  } | null>(null);

  // Winner state
  const [winnerTeam, setWinnerTeam] = useState<RacingTeam | null>(null);

  // Background Music lifecycle
  useEffect(() => {
    racingSoundManager.playBgm();
    return () => {
      racingSoundManager.stopBgm();
    };
  }, []);

  const handleToggleSound = () => {
    const isMuted = racingSoundManager.toggleMute();
    setSoundEnabled(!isMuted);
  };

  // --- START GAME ---
  const handleStartGame = () => {
    setSetupError(null);

    // Validate team names
    const activeNames = teamNames.slice(0, teamCount).map((n) => n.trim());
    for (let i = 0; i < activeNames.length; i++) {
      if (!activeNames[i]) {
        setSetupError(`Nama Kelompok ${i + 1} tidak boleh kosong!`);
        racingSoundManager.playSfx('wrong');
        return;
      }
    }

    const uniqueNames = new Set(activeNames.map((n) => n.toLowerCase()));
    if (uniqueNames.size !== activeNames.length) {
      setSetupError('Nama kelompok tidak boleh ada yang sama (duplikat)!');
      racingSoundManager.playSfx('wrong');
      return;
    }

    // Initialize 30 non-overlapping questions per team from bank
    const initializedTeams = initializeRacingTeams(teamCount, activeNames);
    setTeams(initializedTeams);
    setActiveTeamIndex(0);
    setSelectedOption(null);
    setNumericInput('');
    setIsAnswerLocked(false);
    setFeedback(null);
    setWinnerTeam(null);
    setViewState('racing');
    racingSoundManager.playBgm();
    racingSoundManager.playSfx('fanfare');
  };

  // Current active team and current question
  const currentTeam = teams[activeTeamIndex];
  const currentQuestion: RacingQuestion | undefined =
    currentTeam?.questions[currentTeam.currentQuestionIndex];

  // --- NUMERIC KEYPAD HANDLERS ---
  const handleKeypadPress = (val: string) => {
    if (isAnswerLocked) return;
    racingSoundManager.playSfx('click');

    if (val === 'DEL') {
      setNumericInput((prev) => prev.slice(0, -1));
    } else if (val === 'CLR') {
      setNumericInput('');
    } else if (val === '-') {
      // Toggle minus sign at the front
      setNumericInput((prev) => (prev.startsWith('-') ? prev.slice(1) : '-' + prev));
    } else if (val === '.') {
      if (!numericInput.includes('.')) {
        setNumericInput((prev) => (prev === '' ? '0.' : prev + '.'));
      }
    } else {
      if (numericInput.length < 8) {
        setNumericInput((prev) => prev + val);
      }
    }
  };

  // --- SUBMIT ANSWER ---
  const handleConfirmAnswer = () => {
    if (!currentTeam || !currentQuestion || isAnswerLocked) return;

    let answerStr = '';
    if (currentQuestion.type === 'pilihan-ganda') {
      if (!selectedOption) return;
      answerStr = selectedOption;
    } else {
      if (!numericInput || !numericInput.trim()) return;
      answerStr = numericInput.trim();
    }

    setIsAnswerLocked(true);

    const isCorrect = verifyAnswer(currentQuestion, answerStr);

    if (isCorrect) {
      // Roll 1, 2, or 3 steps
      const steps = rollCorrectStep();
      racingSoundManager.playSfx('correct');
      setTimeout(() => racingSoundManager.playSfx('stepForward'), 300);

      const newStep = Math.min(FINISH_LINE_STEPS, currentTeam.currentStep + steps);

      const updatedTeams = teams.map((t, idx) => {
        if (idx !== activeTeamIndex) return t;
        return {
          ...t,
          currentStep: newStep,
          correctCount: t.correctCount + 1,
          totalStepsForward: t.totalStepsForward + steps,
          history: [
            ...t.history,
            {
              questionNumber: t.currentQuestionIndex + 1,
              questionId: currentQuestion.id,
              topicLabel: currentQuestion.topicLabel,
              userAnswer: answerStr,
              correctAnswer: currentQuestion.correctAnswer,
              isCorrect: true,
              stepChange: steps,
              timestamp: Date.now(),
            },
          ],
        };
      });

      setTeams(updatedTeams);

      setFeedback({
        isCorrect: true,
        stepChange: steps,
        explanation: currentQuestion.explanation,
        correctAnswer: currentQuestion.correctAnswer,
      });

      // Check win condition immediately
      if (newStep >= FINISH_LINE_STEPS) {
        setTimeout(() => {
          setWinnerTeam(updatedTeams[activeTeamIndex]);
          setViewState('winner');
          racingSoundManager.playSfx('fanfare');
        }, 1200);
      }
    } else {
      // Wrong answer: step backward by 1, clamped at 0
      racingSoundManager.playSfx('wrong');
      setTimeout(() => racingSoundManager.playSfx('stepBackward'), 300);

      const newStep = Math.max(0, currentTeam.currentStep - 1);
      const stepChange = currentTeam.currentStep > 0 ? -1 : 0;

      const updatedTeams = teams.map((t, idx) => {
        if (idx !== activeTeamIndex) return t;
        return {
          ...t,
          currentStep: newStep,
          wrongCount: t.wrongCount + 1,
          totalStepsBackward: t.totalStepsBackward + (stepChange < 0 ? 1 : 0),
          history: [
            ...t.history,
            {
              questionNumber: t.currentQuestionIndex + 1,
              questionId: currentQuestion.id,
              topicLabel: currentQuestion.topicLabel,
              userAnswer: answerStr,
              correctAnswer: currentQuestion.correctAnswer,
              isCorrect: false,
              stepChange,
              timestamp: Date.now(),
            },
          ],
        };
      });

      setTeams(updatedTeams);

      setFeedback({
        isCorrect: false,
        stepChange,
        explanation: currentQuestion.explanation,
        correctAnswer: currentQuestion.correctAnswer,
      });
    }
  };

  // --- ADVANCE TO NEXT QUESTION ---
  const handleNextQuestion = () => {
    racingSoundManager.playSfx('click');
    setFeedback(null);
    setSelectedOption(null);
    setNumericInput('');
    setIsAnswerLocked(false);

    // Advance current team's question index
    const nextQIndex = currentTeam.currentQuestionIndex + 1;

    let updatedTeams = teams.map((t, idx) => {
      if (idx !== activeTeamIndex) return t;
      return {
        ...t,
        currentQuestionIndex: nextQIndex,
      };
    });

    setTeams(updatedTeams);

    // If current team finished all 30 questions, or we cycle to next team
    // Check if ALL teams have completed 30 questions
    const allFinished = updatedTeams.every((t) => t.currentQuestionIndex >= 30);
    if (allFinished) {
      // Pick team with maximum steps
      const sorted = [...updatedTeams].sort((a, b) => b.currentStep - a.currentStep);
      setWinnerTeam(sorted[0]);
      setViewState('winner');
      racingSoundManager.playSfx('fanfare');
      return;
    }

    // Auto-cycle to next team that still has questions left
    let nextTeamIndex = (activeTeamIndex + 1) % teams.length;
    let attempts = 0;
    while (updatedTeams[nextTeamIndex].currentQuestionIndex >= 30 && attempts < teams.length) {
      nextTeamIndex = (nextTeamIndex + 1) % teams.length;
      attempts++;
    }
    setActiveTeamIndex(nextTeamIndex);
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] font-sans select-none flex flex-col justify-between overflow-x-hidden text-white">
      {/* Visual background tracks & racing aura */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
      </div>

      {/* =========================================================================
          TOP BAR: NAVIGASI, JUDUL & SOUND CONTROL
      ========================================================================= */}
      <header className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-3 pb-2 flex items-center justify-between border-b border-white/10">
        <Link
          href="/game/kelompok"
          onClick={() => {
            racingSoundManager.stopBgm();
            racingSoundManager.playSfx('click');
          }}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          aria-label="Kembali ke Menu Game Kelompok"
          title="Kembali ke Menu Game Kelompok"
        >
          <ChevronLeft className="w-6 h-6 stroke-[3] -ml-0.5" />
        </Link>

        {/* Brand Judul Balapan */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight flex items-center gap-1.5 drop-shadow-md">
              <span className="text-[#38BDF8]">Game</span>
              <span className="text-[#FBBF24]">Balapan</span>
            </h1>
          </div>
          <p className="text-[11px] sm:text-xs font-bold text-slate-300 hidden sm:block">
            Jawab soal matematika, pacu gokartmu, dan jadilah yang pertama di garis finis!
          </p>
        </div>

        {/* Audio Toggle & Home Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleToggleSound}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 shadow-md transition-all cursor-pointer"
            title={soundEnabled ? 'Matikan Musik & Suara' : 'Nyalakan Musik & Suara'}
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5 text-amber-400" />
            ) : (
              <VolumeX className="w-5 h-5 text-slate-400" />
            )}
          </button>

          <Link
            href="/dashboard"
            onClick={() => {
              racingSoundManager.stopBgm();
              racingSoundManager.playSfx('click');
            }}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label="Kembali ke Beranda"
            title="Kembali ke Beranda"
          >
            <Home className="w-5 h-5" />
          </Link>
        </div>
      </header>

      {/* =========================================================================
          VIEW 1: SETUP SCREEN (Pengaturan Jumlah Kelompok & Informasi Balapan)
      ========================================================================= */}
      {viewState === 'setup' && (
        <main className="relative z-20 w-full max-w-5xl mx-auto my-auto px-4 sm:px-6 py-6 flex flex-col items-center gap-6">
          <div className="w-full bg-[#1E293B]/90 backdrop-blur-md rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 border-2 border-white/20 shadow-2xl flex flex-col gap-6">
            {/* Banner Ilustrasi & Pengantar Balapan */}
            <div className="flex flex-col md:flex-row items-center gap-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-900/60 via-indigo-900/60 to-blue-900/60 border border-blue-500/30">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 border-2 border-amber-400/80 shadow-md bg-sky-950">
                <Image
                  src="/assets/game-balapan/cover-game-balapan.png"
                  alt="Cover Game Balapan Gokart"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black uppercase tracking-wider mb-1.5 border border-amber-400/40">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Persiapan Sirkuit Matematika</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Pengaturan Sesi Game Balapan
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed mt-1">
                  Pilih 2 hingga 4 kelompok. Setiap kelompok mengendarai gokart warna khas dan menjawab 30 soal lingkaran tanpa batas waktu. Jawaban benar memajukan gokart 1–3 langkah acak!
                </p>
              </div>
            </div>

            {/* Error Message */}
            {setupError && (
              <div className="w-full p-3.5 rounded-2xl bg-rose-500/20 border border-rose-500 text-rose-200 text-xs sm:text-sm font-bold flex items-center gap-2.5 animate-shake">
                <AlertTriangle className="w-5 h-5 shrink-0 text-rose-400" />
                <span>{setupError}</span>
              </div>
            )}

            {/* Grid Pengaturan: Kolom 1 (Info Aturan) & Kolom 2 (Konfigurasi Kelompok) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Kolom 1: Informasi Aturan Main */}
              <div className="space-y-4">
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/60 border border-white/10 space-y-3">
                  <span className="text-sm font-black text-amber-300 flex items-center gap-1.5">
                    <Flag className="w-4 h-4 text-amber-400" />
                    <span>Aturan Pergerakan & Garis Finis:</span>
                  </span>

                  <div className="space-y-2 text-xs text-slate-200">
                    <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-emerald-300 block">Jawaban Benar:</strong>
                        <span>Maju 1, 2, atau 3 langkah secara acak (peluang seimbang 1/3).</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-start gap-2.5">
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-rose-300 block">Jawaban Salah:</strong>
                        <span>Mundur 1 langkah. Jika di garis start, gokart tetap di posisi nol.</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-start gap-2.5">
                      <Zap className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-sky-300 block">Tanpa Batas Waktu (Tanpa Timer):</strong>
                        <span>Siswa bebas berdiskusi sebelum konfirmasi. Garis finis berjarak 20 langkah!</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Komposisi Bank Soal */}
                <div className="p-4 rounded-2xl bg-slate-800/40 border border-white/5 space-y-2 text-xs">
                  <span className="font-bold text-slate-300 block">Komposisi 30 Soal per Kelompok:</span>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-700">
                      <span className="font-black text-amber-400 block text-sm">7 Soal</span>
                      <span className="text-[10px] text-slate-400">Unsur Lingkaran</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-700">
                      <span className="font-black text-sky-400 block text-sm">14 Soal</span>
                      <span className="text-[10px] text-slate-400">Kedudukan Titik</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-700">
                      <span className="font-black text-emerald-400 block text-sm">9 Soal</span>
                      <span className="text-[10px] text-slate-400">Kedudukan Garis</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kolom 2: Jumlah & Nama Kelompok */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/60 border border-white/10 space-y-4 flex flex-col justify-between">
                <div>
                  <label className="text-sm font-black text-slate-200 flex items-center justify-between mb-2">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-amber-400" />
                      <span>Jumlah Kelompok (2 - 4 Tim):</span>
                    </span>
                    <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300">
                      {teamCount} Tim Aktif
                    </span>
                  </label>

                  <div className="grid grid-cols-3 gap-2.5 mb-4">
                    {[2, 3, 4].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => {
                          racingSoundManager.playSfx('click');
                          setTeamCount(count);
                        }}
                        className={`py-2.5 rounded-xl font-black text-sm transition-all cursor-pointer border-2 ${
                          teamCount === count
                            ? 'bg-amber-400 text-slate-950 border-white shadow-md scale-102'
                            : 'bg-slate-700/60 text-slate-300 border-transparent hover:bg-slate-700'
                        }`}
                      >
                        {count} Kelompok
                      </button>
                    ))}
                  </div>

                  {/* List Nama Kelompok dengan Gokart Preview */}
                  <span className="text-xs font-black text-slate-300 uppercase tracking-wider block mb-2">
                    Karakter & Nama Kelompok:
                  </span>
                  <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                    {Array.from({ length: teamCount }).map((_, idx) => {
                      const preset = TEAM_PRESETS[idx];
                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/90 border border-slate-700"
                        >
                          <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 border border-white/20 bg-slate-950 flex items-center justify-center">
                            <Image
                              src={preset.gokartImage}
                              alt={preset.colorName}
                              width={44}
                              height={44}
                              className="object-contain"
                            />
                          </div>

                          <div className="flex-1">
                            <span className="text-[10px] font-black uppercase text-amber-400 block">
                              Gokart {preset.colorName}
                            </span>
                            <input
                              type="text"
                              value={teamNames[idx]}
                              onChange={(e) => {
                                const updated = [...teamNames];
                                updated[idx] = e.target.value;
                                setTeamNames(updated);
                              }}
                              placeholder={`Nama Kelompok ${idx + 1}`}
                              className="w-full px-2 py-1 rounded-lg bg-slate-800 border border-slate-600 text-white text-xs sm:text-sm font-bold focus:outline-none focus:border-amber-400"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Tombol Mulai Permainan */}
                <div className="pt-3 border-t border-white/10 flex items-center gap-3">
                  <Link
                    href="/game/kelompok"
                    onClick={() => {
                      racingSoundManager.stopBgm();
                      racingSoundManager.playSfx('click');
                    }}
                    className="py-3 px-5 rounded-full bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold text-xs sm:text-sm transition-all text-center cursor-pointer"
                  >
                    Kembali
                  </Link>

                  <button
                    type="button"
                    onClick={handleStartGame}
                    className="flex-1 py-3.5 px-6 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm sm:text-base shadow-[0_5px_0_#B45309] active:translate-y-1 active:shadow-[0_1px_0_#B45309] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Mulai Balapan</span>
                    <Play className="w-4 h-4 fill-current ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* =========================================================================
          VIEW 2: RACING BOARD (Arena Balapan 2D & Panel Soal Kelompok)
      ========================================================================= */}
      {viewState === 'racing' && currentTeam && currentQuestion && (
        <main className="relative z-20 w-full max-w-7xl mx-auto px-3 sm:px-6 py-4 flex flex-col gap-4 flex-1">
          {/* --- TOP ARENA: 2D RACE TRACK LANES --- */}
          <div className="w-full bg-[#0B132B] rounded-2xl p-3 sm:p-4 border-2 border-slate-700 shadow-2xl space-y-3">
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold px-1">
              <span className="flex items-center gap-2 text-amber-300">
                <Flag className="w-4 h-4 text-amber-400" />
                <span>Sirkuit Balap Gokart LINTERA</span>
              </span>
              <span className="text-slate-400 text-[11px] sm:text-xs">
                Target Finis: <strong className="text-white">{FINISH_LINE_STEPS} Langkah</strong>
              </span>
            </div>

            {/* Track Lanes */}
            <div className="space-y-2 sm:space-y-2.5">
              {teams.map((team, idx) => {
                const isCurrentActive = idx === activeTeamIndex;
                const progressPercent = Math.min(100, (team.currentStep / FINISH_LINE_STEPS) * 100);

                return (
                  <div
                    key={team.id}
                    onClick={() => {
                      if (!isAnswerLocked) {
                        racingSoundManager.playSfx('click');
                        setActiveTeamIndex(idx);
                        setSelectedOption(null);
                        setNumericInput('');
                        setFeedback(null);
                      }
                    }}
                    className={`relative w-full h-16 sm:h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      isCurrentActive
                        ? 'border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)] bg-slate-900/90'
                        : 'border-slate-700 bg-slate-950/70 hover:border-slate-500'
                    }`}
                  >
                    {/* Asphalt road track pattern */}
                    <div className="absolute inset-0 bg-[#1E293B] opacity-90" />
                    {/* Road curbs red & white top and bottom */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-repeating-linear-gradient(90deg,#EF4444_0,#EF4444_12px,#FFFFFF_12px,#FFFFFF_24px)" />
                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-repeating-linear-gradient(90deg,#EF4444_0,#EF4444_12px,#FFFFFF_12px,#FFFFFF_24px)" />

                    {/* Step hash markers */}
                    <div className="absolute inset-x-12 top-0 bottom-0 flex justify-between pointer-events-none opacity-20">
                      {[0, 5, 10, 15, 20].map((step) => (
                        <div key={step} className="h-full border-r border-dashed border-white flex flex-col justify-end pb-1 pr-1">
                          <span className="text-[9px] font-mono text-white font-bold">{step}</span>
                        </div>
                      ))}
                    </div>

                    {/* Start Line */}
                    <div className="absolute left-10 top-1.5 bottom-1.5 w-2 border-r-2 border-white/60 flex items-center justify-center">
                      <span className="text-[8px] font-black -rotate-90 text-slate-300 tracking-tighter">
                        START
                      </span>
                    </div>

                    {/* Finish Line Checkered Banner */}
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-repeating-conic-gradient(from_0deg,#000_0deg_90deg,#fff_90deg_180deg,#000_180deg_270deg,#fff_270deg_360deg) [background-size:12px_12px] opacity-75 border-l-2 border-amber-400 flex items-center justify-center">
                      <Flag className="w-4 h-4 text-amber-400 drop-shadow-md" />
                    </div>

                    {/* Team Tag on Left */}
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex items-center gap-1.5">
                      <span className={`w-6 h-6 rounded-md ${team.badgeBg} text-xs font-black flex items-center justify-center shadow-xs`}>
                        {idx + 1}
                      </span>
                      <span className="text-xs font-black text-white drop-shadow-sm hidden md:inline truncate max-w-[120px]">
                        {team.name}
                      </span>
                    </div>

                    {/* Moving Gokart Vehicle */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 transition-all duration-500 ease-out z-20 flex flex-col items-center"
                      style={{
                        // 0% starts at left ~48px, 100% ends near finish line (calc(100% - 70px))
                        left: `calc(48px + ${progressPercent * 0.85}%)`,
                      }}
                    >
                      {/* Step Indicator Badge */}
                      <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-slate-950/80 text-amber-300 border border-amber-400/50 shadow-xs mb-0.5">
                        {team.currentStep} Lkg
                      </span>

                      {/* Luna Gokart Sprite (seen from behind) */}
                      <div className="relative w-10 h-10 sm:w-12 sm:h-12 drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]">
                        <Image
                          src={team.gokartImage}
                          alt={team.name}
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* --- BOTTOM SECTION: TEAM TABS & QUESTION PANEL --- */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
            {/* Team Selector Tabs Sidebar */}
            <div className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1">
              {teams.map((t, idx) => {
                const isActive = idx === activeTeamIndex;
                return (
                  <button
                    key={t.id}
                    disabled={isAnswerLocked}
                    onClick={() => {
                      racingSoundManager.playSfx('click');
                      setActiveTeamIndex(idx);
                      setSelectedOption(null);
                      setNumericInput('');
                      setFeedback(null);
                    }}
                    className={`flex-1 p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center gap-3 ${
                      isActive
                        ? 'bg-slate-800 border-amber-400 shadow-lg scale-101'
                        : 'bg-slate-900/70 border-slate-800 hover:bg-slate-800/60 opacity-80'
                    }`}
                  >
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/20 bg-slate-950 flex items-center justify-center">
                      <Image
                        src={t.gokartImage}
                        alt={t.name}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-white truncate block">
                          {t.name}
                        </span>
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                        <span>Soal: <strong className="text-sky-300">{t.currentQuestionIndex + 1}/30</strong></span>
                        <span>•</span>
                        <span>Langkah: <strong className="text-amber-400">{t.currentStep}/{FINISH_LINE_STEPS}</strong></span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Question Answering Card */}
            <div className="lg:col-span-8 bg-[#1E293B] rounded-3xl p-5 sm:p-6 border-2 border-white/10 shadow-2xl flex flex-col justify-between space-y-4">
              {/* Question Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-black ${currentTeam.badgeBg}`}>
                    {currentTeam.name}
                  </span>
                  <span className="text-xs font-extrabold text-slate-300">
                    Soal #{currentTeam.currentQuestionIndex + 1} dari 30
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-bold">
                    {currentQuestion.topicLabel}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      currentQuestion.difficulty === 'mudah'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : currentQuestion.difficulty === 'sedang'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    {currentQuestion.difficulty.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Question Text */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-700">
                <p className="text-sm sm:text-base lg:text-lg font-bold text-white leading-relaxed">
                  {currentQuestion.question}
                </p>
              </div>

              {/* Interaction: Multiple Choice OR Numeric Keypad */}
              {!feedback && (
                <>
                  {currentQuestion.type === 'pilihan-ganda' && currentQuestion.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {currentQuestion.options.map((opt) => {
                        const isSelected = selectedOption === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => {
                              racingSoundManager.playSfx('click');
                              setSelectedOption(opt.id);
                            }}
                            className={`p-3.5 rounded-2xl text-left font-bold text-xs sm:text-sm transition-all flex items-center gap-3 border-2 cursor-pointer ${
                              isSelected
                                ? 'bg-amber-400 text-slate-950 border-white shadow-lg scale-101'
                                : 'bg-slate-800/90 hover:bg-slate-800 text-slate-200 border-slate-700'
                            }`}
                          >
                            <span
                              className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                                isSelected ? 'bg-slate-950 text-amber-400' : 'bg-slate-700 text-slate-300'
                              }`}
                            >
                              {opt.id}
                            </span>
                            <span className="leading-snug">{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {currentQuestion.type === 'isian-angka' && (
                    <div className="flex flex-col items-center gap-3 pt-1">
                      <div className="w-full max-w-xs p-3 rounded-2xl bg-slate-950 border-2 border-amber-400/80 text-center">
                        <span className="text-2xl sm:text-3xl font-black font-mono text-amber-300 min-h-[36px] block">
                          {numericInput || <span className="text-slate-600">Ketik angka...</span>}
                        </span>
                      </div>

                      {/* Keypad */}
                      <div className="grid grid-cols-3 gap-2 w-full max-w-xs">
                        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '0', '.'].map((key) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => handleKeypadPress(key)}
                            className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 font-mono font-black text-lg text-white shadow-xs cursor-pointer active:scale-95 transition-all"
                          >
                            {key}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => handleKeypadPress('DEL')}
                          className="py-2.5 rounded-xl bg-rose-600/30 hover:bg-rose-600/50 border border-rose-500/50 text-rose-300 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer active:scale-95 transition-all"
                        >
                          <Delete className="w-4 h-4" />
                          <span>Hapus</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleKeypadPress('CLR')}
                          className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 font-bold text-xs text-slate-300 cursor-pointer active:scale-95 transition-all"
                        >
                          Reset
                        </button>
                        <div className="py-2.5 rounded-xl bg-slate-900/50 border border-transparent flex items-center justify-center text-[10px] text-slate-500 font-bold">
                          Keypad
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tombol Konfirmasi Jawaban */}
                  <div className="pt-3 border-t border-white/10 flex justify-end">
                    <button
                      type="button"
                      disabled={
                        currentQuestion.type === 'pilihan-ganda'
                          ? !selectedOption
                          : !numericInput.trim()
                      }
                      onClick={handleConfirmAnswer}
                      className="py-3 px-8 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-black text-sm sm:text-base shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>Konfirmasi Jawaban</span>
                      <ArrowRight className="w-4 h-4 stroke-[3]" />
                    </button>
                  </div>
                </>
              )}

              {/* Feedback Reveal Card */}
              {feedback && (
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border-2 border-white/20 space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {feedback.isCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      ) : (
                        <XCircle className="w-6 h-6 text-rose-400" />
                      )}
                      <span className={`text-base sm:text-lg font-black ${feedback.isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {feedback.isCorrect ? 'Jawaban Benar!' : 'Jawaban Kurang Tepat!'}
                      </span>
                    </div>

                    <div className={`px-3 py-1 rounded-full text-xs font-black border ${
                      feedback.isCorrect
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    }`}>
                      {feedback.isCorrect
                        ? `Maju +${feedback.stepChange} Langkah!`
                        : feedback.stepChange < 0
                        ? 'Mundur 1 Langkah!'
                        : 'Tertahan di Garis Start (0 Lkg)'}
                    </div>
                  </div>

                  {!feedback.isCorrect && (
                    <div className="text-xs font-bold text-amber-300 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/30">
                      Kunci Jawaban yang Benar: <strong className="text-white ml-1">{feedback.correctAnswer}</strong>
                    </div>
                  )}

                  {/* Penjelasan Matematis */}
                  <div className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <strong className="text-sky-300 block mb-1">Pembahasan:</strong>
                    {feedback.explanation}
                  </div>

                  {/* Tombol Lanjut ke Soal Berikutnya */}
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      className="py-3 px-6 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>Lanjut ke Soal Berikutnya</span>
                      <ArrowRight className="w-4 h-4 stroke-[3]" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      )}

      {/* =========================================================================
          VIEW 3: WINNER PODIUM SCREEN (Kemenangan & Rekapitulasi Balapan)
      ========================================================================= */}
      {viewState === 'winner' && winnerTeam && (
        <main className="relative z-20 w-full max-w-4xl mx-auto my-auto px-4 sm:px-6 py-6 flex flex-col items-center">
          <div className="w-full bg-[#1E293B]/95 backdrop-blur-md rounded-[36px] p-6 sm:p-8 border-2 border-amber-400/80 shadow-[0_0_35px_rgba(251,191,36,0.25)] flex flex-col items-center text-center gap-6">
            {/* Header Juara */}
            <div className="flex flex-col items-center gap-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 text-amber-300 text-xs sm:text-sm font-black border border-amber-400/40">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Pemenang Garis Finis Sirkuit LINTERA</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white">
                Selamat kepada <span className="text-amber-400">{winnerTeam.name}</span>!
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-lg">
                Berhasil menyelesaikan tantangan soal matematika lingkaran dan memacu gokart melintasi garis finis terlebih dahulu!
              </p>
            </div>

            {/* Winner Luna Portrait */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl p-3 bg-gradient-to-b from-amber-400/20 to-sky-900/40 border-2 border-amber-400 shadow-xl flex items-center justify-center">
              <Image
                src={winnerTeam.gokartImage}
                alt={winnerTeam.name}
                width={160}
                height={160}
                className="object-contain"
              />
            </div>

            {/* Scoreboard Rekap Semua Kelompok */}
            <div className="w-full space-y-2.5">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 text-left">
                Peringkat & Rekapitulasi Akhir:
              </h3>
              <div className="space-y-2">
                {[...teams]
                  .sort((a, b) => b.currentStep - a.currentStep)
                  .map((t, idx) => (
                    <div
                      key={t.id}
                      className={`p-3.5 rounded-2xl flex items-center justify-between border-2 ${
                        t.id === winnerTeam.id
                          ? 'bg-amber-500/20 border-amber-400 text-white'
                          : 'bg-slate-900/80 border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs ${
                          idx === 0 ? 'bg-amber-400 text-slate-950' : 'bg-slate-700 text-slate-300'
                        }`}>
                          #{idx + 1}
                        </span>
                        <div className="text-left">
                          <span className="font-black text-sm block">{t.name}</span>
                          <span className="text-[11px] text-slate-400">
                            Benar: {t.correctCount} • Salah: {t.wrongCount} • Maju: +{t.totalStepsForward} Lkg
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-base sm:text-lg font-black text-amber-400 font-mono">
                          {t.currentStep} Langkah
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          {t.currentStep >= FINISH_LINE_STEPS ? 'Menembus Finis' : 'Posisi Akhir'}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-white/10 w-full flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  racingSoundManager.playSfx('click');
                  setViewState('setup');
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Main Lagi (Balapan Baru)</span>
              </button>

              <Link
                href="/game/kelompok"
                onClick={() => {
                  racingSoundManager.stopBgm();
                  racingSoundManager.playSfx('click');
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-700 hover:bg-slate-600 text-white font-bold text-sm sm:text-base transition-all text-center cursor-pointer"
              >
                Kembali ke Menu Game Kelompok
              </Link>
            </div>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="relative z-20 text-center text-slate-500 text-xs font-semibold py-3 border-t border-white/5">
        LINTERA • Game Kelompok Balapan Gokart Matematika
      </footer>
    </div>
  );
}
