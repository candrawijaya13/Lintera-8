'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  AlertTriangle,
  Gift,
  ArrowRight,
  Send,
  Users,
  ShieldAlert,
  Award,
  ChevronRight,
  Delete,
  X,
  Zap,
  Info
} from 'lucide-react';

import {
  Question,
  Team,
  BoxItem,
  Reward,
  HistoryEntry,
  GameSettings,
  AnswerStatus
} from '@/lib/kotak-kejutan/types';
import { selectSessionQuestions, getQuestionTimeLimit } from '@/lib/kotak-kejutan/questions';
import { drawRandomReward, applyRewardToTeams } from '@/lib/kotak-kejutan/rewards';
import { soundManager } from '@/lib/kotak-kejutan/sound';

const TEAM_PALETTES = [
  { name: 'Biru', bg: 'bg-blue-600', text: 'text-blue-600', border: 'border-blue-400', light: 'bg-blue-50' },
  { name: 'Oranye', bg: 'bg-orange-500', text: 'text-orange-500', border: 'border-orange-400', light: 'bg-orange-50' },
  { name: 'Hijau', bg: 'bg-emerald-600', text: 'text-emerald-600', border: 'border-emerald-400', light: 'bg-emerald-50' },
  { name: 'Merah', bg: 'bg-rose-600', text: 'text-rose-600', border: 'border-rose-400', light: 'bg-rose-50' },
  { name: 'Ungu', bg: 'bg-purple-600', text: 'text-purple-600', border: 'border-purple-400', light: 'bg-purple-50' },
  { name: 'Kuning', bg: 'bg-amber-500', text: 'text-amber-600', border: 'border-amber-400', light: 'bg-amber-50' },
];

export default function KotakKejutanPage() {
  // Game flow view: 'setup' | 'board' | 'finished'
  const [viewState, setViewState] = useState<'setup' | 'board' | 'finished'>('setup');

  // --- SETUP STATE ---
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<30 | 40>(30);
  const [teamCount, setTeamCount] = useState<number>(3);
  const [teamNames, setTeamNames] = useState<string[]>([
    'Kelompok 1',
    'Kelompok 2',
    'Kelompok 3',
    'Kelompok 4',
    'Kelompok 5',
    'Kelompok 6',
  ]);
  const [setupError, setSetupError] = useState<string | null>(null);

  // --- PLAYING STATE ---
  const [teams, setTeams] = useState<Team[]>([]);
  const [boxes, setBoxes] = useState<BoxItem[]>([]);
  const [currentTeamIndex, setCurrentTeamIndex] = useState<number>(0);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // --- QUESTION MODAL STATE ---
  const [activeBoxIndex, setActiveBoxIndex] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [numericInput, setNumericInput] = useState<string>('');
  const [modalPhase, setModalPhase] = useState<
    'answering' | 'decision' | 'pass_selection' | 'revealing' | 'result_wrong' | 'result_timeout'
  >('answering');
  const [drawnReward, setDrawnReward] = useState<Reward | null>(null);
  const [rewardRecipientTeamId, setRewardRecipientTeamId] = useState<number | null>(null);
  const [rewardSummary, setRewardSummary] = useState<string>('');
  const [showSkipConfirm, setShowSkipConfirm] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const historyCounterRef = useRef<number>(1);

  // Background Music Lifecycle: play on entry, stop when leaving
  useEffect(() => {
    soundManager.playBgm();
    return () => {
      soundManager.stopBgm();
    };
  }, []);

  // Toggle audio (BGM & SFX)
  const handleToggleSound = () => {
    const isMuted = soundManager.toggleMute();
    setSoundEnabled(!isMuted);
  };

  // Handler when timer runs out
  const handleTimeOut = useCallback(() => {
    setIsTimerRunning(false);
    soundManager.playSfx('timeout');
    setModalPhase('result_timeout');

    if (activeBoxIndex === null) return;
    const currentBox = boxes[activeBoxIndex];
    const currentTeam = teams[currentTeamIndex];
    if (!currentBox || !currentTeam) return;

    // Mark box as opened
    setBoxes((prev) =>
      prev.map((b, idx) =>
        idx === activeBoxIndex ? { ...b, status: 'opened', usedByTeamId: currentTeam.id } : b
      )
    );

    // Update team stats
    setTeams((prev) =>
      prev.map((t, idx) =>
        idx === currentTeamIndex ? { ...t, timeoutCount: t.timeoutCount + 1 } : t
      )
    );

    // Log to history
    const entry: HistoryEntry = {
      boxNumber: currentBox.boxNumber,
      teamId: currentTeam.id,
      teamName: currentTeam.name,
      questionId: currentBox.question.id,
      questionTopic: currentBox.question.topicLabel,
      difficulty: currentBox.question.difficulty,
      correctAnswer: currentBox.question.correctAnswer,
      status: 'timeout',
      scoreChangeDescription: 'Waktu habis. Tidak ada hadiah atau perubahan poin.',
      id: historyCounterRef.current++,
    };
    setHistory((prev) => [entry, ...prev]);
  }, [activeBoxIndex, boxes, currentTeamIndex, teams]);

  // --- TIMER EFFECT ---
  useEffect(() => {
    if (isTimerRunning && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimeOut();
            return 0;
          }
          if (prev <= 10) {
            soundManager.playSfx('tick');
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearTimeout(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isTimerRunning, timeLeft, handleTimeOut]);

  // --- SETUP VALIDATION & START GAME ---
  const handleStartGame = () => {
    setSetupError(null);

    // Validate team names
    const activeNames = teamNames.slice(0, teamCount).map((n) => n.trim());
    for (let i = 0; i < activeNames.length; i++) {
      if (!activeNames[i]) {
        setSetupError(`Nama Kelompok ${i + 1} tidak boleh kosong!`);
        soundManager.playSfx('wrong');
        return;
      }
    }

    // Check duplicate team names
    const uniqueNames = new Set(activeNames.map((n) => n.toLowerCase()));
    if (uniqueNames.size !== activeNames.length) {
      setSetupError('Nama kelompok tidak boleh ada yang sama (duplikat)!');
      soundManager.playSfx('wrong');
      return;
    }

    // Initialize Teams
    const initialTeams: Team[] = activeNames.map((name, idx) => ({
      id: idx + 1,
      name,
      color: TEAM_PALETTES[idx % TEAM_PALETTES.length].bg,
      score: 0,
      correctCount: 0,
      wrongCount: 0,
      timeoutCount: 0,
      skippedCount: 0,
    }));

    // Select questions
    const sessionQuestions = selectSessionQuestions(selectedQuestionCount);

    // Initialize Boxes
    const initialBoxes: BoxItem[] = sessionQuestions.map((q, idx) => ({
      boxNumber: idx + 1,
      question: q,
      status: 'closed',
    }));

    setTeams(initialTeams);
    setBoxes(initialBoxes);
    setCurrentTeamIndex(0);
    setHistory([]);
    setViewState('board');
    soundManager.playBgm();
    soundManager.playSfx('fanfare');
  };

  // --- SELECT A BOX ---
  const handleSelectBox = (boxIndex: number) => {
    const box = boxes[boxIndex];
    if (box.status !== 'closed') return;

    soundManager.playSfx('select');
    setActiveBoxIndex(boxIndex);
    setSelectedOption(null);
    setNumericInput('');
    setModalPhase('answering');
    setDrawnReward(null);
    setRewardRecipientTeamId(null);
    setRewardSummary('');
    setShowSkipConfirm(false);

    // Set and start timer based on topic and difficulty:
    // - Unsur & Titik: Mudah 30s, Sedang 60s, Sulit 90s
    // - Garis: Mudah 80s, Sedang 120s, Sulit 150s
    const limit = getQuestionTimeLimit(box.question.topic, box.question.difficulty);
    setTimeLeft(limit);
    setIsTimerRunning(true);
  };

  // --- CONFIRM ANSWER ---
  const handleConfirmAnswer = () => {
    if (activeBoxIndex === null) return;
    const currentBox = boxes[activeBoxIndex];
    const q = currentBox.question;
    const currentTeam = teams[currentTeamIndex];

    let givenAnswer = '';
    let isCorrect = false;

    if (q.type === 'pilihan-ganda') {
      if (!selectedOption) return;
      givenAnswer = selectedOption;
      isCorrect = selectedOption.toUpperCase() === q.correctAnswer.toUpperCase();
    } else {
      const cleanInput = numericInput.trim().replace(',', '.');
      if (!cleanInput) return;
      givenAnswer = cleanInput;
      // Numeric matching: compare float values or normalized strings
      const expectedNum = parseFloat(q.correctAnswer);
      const givenNum = parseFloat(cleanInput);
      if (!isNaN(expectedNum) && !isNaN(givenNum)) {
        isCorrect = Math.abs(expectedNum - givenNum) < 0.001;
      } else {
        isCorrect = cleanInput.toLowerCase() === q.correctAnswer.toLowerCase();
      }
    }

    // Stop timer immediately
    setIsTimerRunning(false);

    if (isCorrect) {
      soundManager.playSfx('correct');
      setModalPhase('decision');

      // Update team correct count
      setTeams((prev) =>
        prev.map((t, idx) =>
          idx === currentTeamIndex ? { ...t, correctCount: t.correctCount + 1 } : t
        )
      );

      // Mark box as opened
      setBoxes((prev) =>
        prev.map((b, idx) =>
          idx === activeBoxIndex ? { ...b, status: 'opened', usedByTeamId: currentTeam.id } : b
        )
      );
    } else {
      soundManager.playSfx('wrong');
      setModalPhase('result_wrong');

      // Update team wrong count
      setTeams((prev) =>
        prev.map((t, idx) =>
          idx === currentTeamIndex ? { ...t, wrongCount: t.wrongCount + 1 } : t
        )
      );

      // Mark box as opened
      setBoxes((prev) =>
        prev.map((b, idx) =>
          idx === activeBoxIndex ? { ...b, status: 'opened', usedByTeamId: currentTeam.id } : b
        )
      );

      // Log incorrect entry
      const entry: HistoryEntry = {
        boxNumber: currentBox.boxNumber,
        teamId: currentTeam.id,
        teamName: currentTeam.name,
        questionId: q.id,
        questionTopic: q.topicLabel,
        difficulty: q.difficulty,
        userAnswer: givenAnswer,
        correctAnswer: q.correctAnswer,
        status: 'incorrect',
        scoreChangeDescription: 'Jawaban salah. Tidak ada hadiah atau perubahan poin.',
        id: historyCounterRef.current++,
      };
      setHistory((prev) => [entry, ...prev]);
    }
  };

  // --- REWARD DECISION: AMBIL HADIAH ---
  const handleKeepReward = () => {
    const currentTeam = teams[currentTeamIndex];
    applyRewardAndReveal(currentTeam.id, 'keep');
  };

  // --- REWARD DECISION: LEMPAR HADIAH ---
  const handleInitiatePassReward = () => {
    soundManager.playSfx('click');
    setModalPhase('pass_selection');
  };

  const handleConfirmPassReward = (targetTeamId: number) => {
    applyRewardAndReveal(targetTeamId, 'pass');
  };

  // Apply reward once decision is locked
  const applyRewardAndReveal = (recipientId: number, action: 'keep' | 'pass') => {
    if (activeBoxIndex === null) return;
    const currentBox = boxes[activeBoxIndex];
    const currentTeam = teams[currentTeamIndex];

    const reward = drawRandomReward();
    setDrawnReward(reward);
    setRewardRecipientTeamId(recipientId);

    soundManager.playSfx('reveal');

    // Apply reward effects to teams (points minimum 0)
    const { updatedTeams, changeDescription } = applyRewardToTeams(teams, reward, recipientId);
    setTeams(updatedTeams);
    setRewardSummary(changeDescription);
    setModalPhase('revealing');

    const passedTeam = teams.find((t) => t.id === recipientId);

    // Log to history
    const entry: HistoryEntry = {
      boxNumber: currentBox.boxNumber,
      teamId: currentTeam.id,
      teamName: currentTeam.name,
      questionId: currentBox.question.id,
      questionTopic: currentBox.question.topicLabel,
      difficulty: currentBox.question.difficulty,
      correctAnswer: currentBox.question.correctAnswer,
      status: 'correct',
      actionTaken: action,
      passedToTeamId: action === 'pass' ? recipientId : undefined,
      passedToTeamName: action === 'pass' ? passedTeam?.name : undefined,
      reward,
      scoreChangeDescription: changeDescription,
      id: historyCounterRef.current++,
    };
    setHistory((prev) => [entry, ...prev]);
  };

  // --- TEACHER SKIP QUESTION ---
  const handleConfirmSkipQuestion = () => {
    if (activeBoxIndex === null) return;
    setIsTimerRunning(false);
    setShowSkipConfirm(false);

    const currentBox = boxes[activeBoxIndex];
    const currentTeam = teams[currentTeamIndex];

    // Mark box as skipped
    setBoxes((prev) =>
      prev.map((b, idx) =>
        idx === activeBoxIndex ? { ...b, status: 'skipped', usedByTeamId: currentTeam.id } : b
      )
    );

    // Update team stats
    setTeams((prev) =>
      prev.map((t, idx) =>
        idx === currentTeamIndex ? { ...t, skippedCount: t.skippedCount + 1 } : t
      )
    );

    // Log to history
    const entry: HistoryEntry = {
      boxNumber: currentBox.boxNumber,
      teamId: currentTeam.id,
      teamName: currentTeam.name,
      questionId: currentBox.question.id,
      questionTopic: currentBox.question.topicLabel,
      difficulty: currentBox.question.difficulty,
      correctAnswer: currentBox.question.correctAnswer,
      status: 'skipped',
      scoreChangeDescription: 'Dilewati oleh Guru. Tidak ada hadiah atau perubahan poin.',
      id: historyCounterRef.current++,
    };
    setHistory((prev) => [entry, ...prev]);

    // Close modal and advance turn
    closeModalAndAdvanceTurn();
  };

  // --- CLOSE MODAL AND PASS TURN ---
  const closeModalAndAdvanceTurn = () => {
    setActiveBoxIndex(null);
    setModalPhase('answering');
    setSelectedOption(null);
    setNumericInput('');
    setDrawnReward(null);

    // Check if all boxes are used
    const remainingBoxes = boxes.filter(
      (b, idx) => idx !== activeBoxIndex && b.status === 'closed'
    );

    if (remainingBoxes.length === 0) {
      soundManager.playSfx('fanfare');
      setViewState('finished');
    } else {
      // Advance to next team
      setCurrentTeamIndex((prev) => (prev + 1) % teams.length);
    }
  };

  // --- KEYPAD HELPERS ---
  const handleKeypadPress = (val: string) => {
    soundManager.playSfx('click');
    if (val === 'C') {
      setNumericInput('');
    } else if (val === 'DEL') {
      setNumericInput((prev) => prev.slice(0, -1));
    } else if (val === '-') {
      // Toggle minus sign or insert at start
      if (numericInput.startsWith('-')) {
        setNumericInput(numericInput.slice(1));
      } else {
        setNumericInput('-' + numericInput);
      }
    } else if (val === '.') {
      if (!numericInput.includes('.')) {
        setNumericInput((prev) => prev + '.');
      }
    } else {
      if (numericInput.length < 8) {
        setNumericInput((prev) => prev + val);
      }
    }
  };

  // Sort teams for leaderboard (handles ties)
  const sortedLeaderboard = [...teams].sort((a, b) => b.score - a.score || b.correctCount - a.correctCount);

  return (
    <div className="relative min-h-screen w-full bg-[#0F172A] text-white font-sans select-none flex flex-col justify-between overflow-x-hidden">
      {/* Quiz Show Stage Background Lighting & Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Spotlights */}
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute -top-32 right-1/4 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-indigo-600/10 rounded-full blur-[140px]" />

        {/* Math decorations */}
        <div className="absolute top-16 left-8 text-white/10 text-6xl font-black rotate-12">+</div>
        <div className="absolute top-28 right-12 text-white/10 text-5xl font-black -rotate-12">÷</div>
        <div className="absolute bottom-20 left-16 text-white/10 text-5xl font-black rotate-45">×</div>
        <div className="absolute bottom-16 right-20 text-white/10 text-6xl font-black -rotate-6">π</div>
      </div>

      {/* =========================================================================
          TOP BAR (Konsisten di semua state: Navigasi, Judul, Sound Toggle)
      ========================================================================= */}
      <header className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-4 pb-3 flex items-center justify-between border-b border-white/10">
        {/* Tombol Kembali */}
        <Link
          href="/game/kelompok"
          onClick={() => {
            soundManager.stopBgm();
            soundManager.playSfx('click');
          }}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          aria-label="Kembali ke Menu Game Kelompok"
          title="Kembali ke Menu Game Kelompok"
        >
          <ChevronLeft className="w-6 h-6 stroke-[3] -ml-0.5" />
        </Link>

        {/* Judul & Slogan */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-1.5 drop-shadow-md">
              <span className="text-[#38BDF8]">Kotak</span>
              <span className="text-[#FBBF24]">Kejutan</span>
            </h1>
          </div>
          <p className="text-[11px] sm:text-xs font-bold text-slate-300 hidden sm:block">
            Uji kekompakan tim, pecahkan soal matematika, dan raih kejutan poin!
          </p>
        </div>

        {/* Tombol Audio & Home */}
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
              soundManager.stopBgm();
              soundManager.playSfx('click');
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
          VIEW 1: SETUP SCREEN (Halaman Persiapan Game)
      ========================================================================= */}
      {viewState === 'setup' && (
        <main className="relative z-20 w-full max-w-5xl mx-auto my-auto px-4 sm:px-6 py-6 flex flex-col items-center gap-6">
          <div className="w-full bg-[#1E293B]/90 backdrop-blur-md rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 border-2 border-white/20 shadow-2xl flex flex-col gap-6">
            {/* Banner Ilustrasi & Pengantar Guru */}
            <div className="flex flex-col md:flex-row items-center gap-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-900/50 via-indigo-900/50 to-blue-900/50 border border-blue-500/30">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 border-2 border-amber-400/80 shadow-md">
                <Image
                  src="/assets/kotak-kejutan.png"
                  alt="Luna dan Kotak Misteri Panggung Kuis"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black uppercase tracking-wider mb-1.5 border border-amber-400/40">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Persiapan Permainan Guru</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Pengaturan Sesi Kotak Kejutan
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed mt-1">
                  Tentukan jumlah soal yang akan dimainkan serta jumlah dan nama kelompok siswa. Pastikan semua nama telah terisi dengan benar sebelum memulai panggung kuis!
                </p>
              </div>
            </div>

            {/* Error Message if Validation Fails */}
            {setupError && (
              <div className="w-full p-3.5 rounded-2xl bg-rose-500/20 border border-rose-500 text-rose-200 text-xs sm:text-sm font-bold flex items-center gap-2.5 animate-shake">
                <AlertTriangle className="w-5 h-5 shrink-0 text-rose-400" />
                <span>{setupError}</span>
              </div>
            )}

            {/* Grid 2 Kolom Pengaturan */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Kolom 1: Pengaturan Soal & Batas Waktu */}
              <div className="space-y-5">
                {/* 1. Jumlah Soal */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/60 border border-white/10 space-y-3">
                  <label className="text-sm font-black text-slate-200 flex items-center justify-between">
                    <span>1. Pilih Jumlah Kotak Soal:</span>
                    <span className="text-xs font-bold text-amber-400">Total Bank: 40 Soal</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playSfx('click');
                        setSelectedQuestionCount(30);
                      }}
                      className={`py-3 px-4 rounded-xl font-black text-sm flex flex-col items-center justify-center transition-all cursor-pointer border-2 ${
                        selectedQuestionCount === 30
                          ? 'bg-[#38BDF8] text-[#0F172A] border-white shadow-lg scale-102'
                          : 'bg-slate-700/60 text-slate-300 border-transparent hover:bg-slate-700'
                      }`}
                    >
                      <span className="text-xl font-black">30 Kotak</span>
                      <span className="text-[11px] font-semibold opacity-90">Sesi Standar Kelas</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playSfx('click');
                        setSelectedQuestionCount(40);
                      }}
                      className={`py-3 px-4 rounded-xl font-black text-sm flex flex-col items-center justify-center transition-all cursor-pointer border-2 ${
                        selectedQuestionCount === 40
                          ? 'bg-[#38BDF8] text-[#0F172A] border-white shadow-lg scale-102'
                          : 'bg-slate-700/60 text-slate-300 border-transparent hover:bg-slate-700'
                      }`}
                    >
                      <span className="text-xl font-black">40 Kotak</span>
                      <span className="text-[11px] font-semibold opacity-90">Sesi Lengkap (Maksimal)</span>
                    </button>
                  </div>
                </div>

                {/* 2. Informasi Tingkat Kesulitan & Waktu Berdasarkan Materi */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/60 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-slate-200 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-sky-400" />
                      <span>Aturan Durasi Timer Soal:</span>
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                      Otomatis
                    </span>
                  </div>

                  {/* Kategori 1: Unsur Lingkaran & Kedudukan Titik */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-black text-amber-300 block">
                      A. Unsur-unsur Lingkaran & Kedudukan Titik:
                    </span>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40">
                        <span className="block font-black text-emerald-400 text-xs sm:text-sm">30 Detik</span>
                        <span className="text-[10px] font-bold text-slate-300">Mudah</span>
                      </div>
                      <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/40">
                        <span className="block font-black text-amber-400 text-xs sm:text-sm">60 Detik</span>
                        <span className="text-[10px] font-bold text-slate-300">Sedang</span>
                      </div>
                      <div className="p-2 rounded-xl bg-rose-500/20 border border-rose-500/40">
                        <span className="block font-black text-rose-400 text-xs sm:text-sm">90 Detik</span>
                        <span className="text-[10px] font-bold text-slate-300">Sulit</span>
                      </div>
                    </div>
                  </div>

                  {/* Kategori 2: Kedudukan Garis */}
                  <div className="space-y-1.5 pt-1 border-t border-white/5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-cyan-300 block">
                        B. Kedudukan Garis terhadap Lingkaran:
                      </span>
                      <span className="text-[9px] font-extrabold text-cyan-400/90 italic">
                        Waktu Ekstra Aljabar
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40">
                        <span className="block font-black text-emerald-400 text-xs sm:text-sm">80 Detik</span>
                        <span className="text-[10px] font-bold text-slate-300">Mudah</span>
                      </div>
                      <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/40">
                        <span className="block font-black text-amber-400 text-xs sm:text-sm">120 Detik</span>
                        <span className="text-[10px] font-bold text-slate-300">Sedang (2 mnt)</span>
                      </div>
                      <div className="p-2 rounded-xl bg-rose-500/20 border border-rose-500/40">
                        <span className="block font-black text-rose-400 text-xs sm:text-sm">150 Detik</span>
                        <span className="text-[10px] font-bold text-slate-300">Sulit (2.5 mnt)</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-400 font-medium leading-relaxed pt-1">
                    *Timer akan otomatis menyesuaikan materi & tingkat kesulitan kotak yang dibuka. Peringatan berkedip aktif pada 10 detik terakhir.
                  </p>
                </div>
              </div>

              {/* Kolom 2: Pengaturan Kelompok & Nama */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/60 border border-white/10 space-y-4 flex flex-col justify-between">
                <div>
                  <label className="text-sm font-black text-slate-200 flex items-center justify-between mb-2">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-amber-400" />
                      <span>2. Jumlah Kelompok (2 - 6 Tim):</span>
                    </span>
                    <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300">
                      {teamCount} Kelompok
                    </span>
                  </label>

                  {/* Buttons 2..6 */}
                  <div className="grid grid-cols-5 gap-2 mb-4">
                    {[2, 3, 4, 5, 6].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => {
                          soundManager.playSfx('click');
                          setTeamCount(count);
                        }}
                        className={`py-2 rounded-xl font-black text-sm transition-all cursor-pointer border-2 ${
                          teamCount === count
                            ? 'bg-amber-400 text-slate-950 border-white shadow-md'
                            : 'bg-slate-700/60 text-slate-300 border-transparent hover:bg-slate-700'
                        }`}
                      >
                        {count} Tim
                      </button>
                    ))}
                  </div>

                  {/* Kolom Nama Kelompok */}
                  <span className="text-xs font-black text-slate-300 uppercase tracking-wider block mb-2">
                    Edit Nama Kelompok:
                  </span>
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {Array.from({ length: teamCount }).map((_, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span
                          className={`w-7 h-7 rounded-lg ${TEAM_PALETTES[idx].bg} text-white text-xs font-black flex items-center justify-center shrink-0 shadow-xs`}
                        >
                          {idx + 1}
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
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm font-bold focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tombol Mulai Permainan */}
                <div className="pt-3 border-t border-white/10 flex items-center gap-3">
                  <Link
                    href="/game/kelompok"
                    onClick={() => {
                      soundManager.stopBgm();
                      soundManager.playSfx('click');
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
                    <span>Mulai Permainan</span>
                    <Play className="w-4 h-4 fill-current ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* =========================================================================
          VIEW 2: GAME BOARD (Papan Permainan & Grid Kotak Bernomor)
      ========================================================================= */}
      {viewState === 'board' && (
        <main className="relative z-20 w-full max-w-7xl mx-auto px-3 sm:px-6 py-3 flex-1 flex flex-col justify-between gap-3">
          {/* Papan Skor Tim & Indikator Giliran */}
          <div className="w-full bg-[#1E293B]/90 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/15 shadow-xl flex flex-col gap-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
                  Papan Skor Kelas
                </span>
                <span className="text-[11px] text-slate-400 font-bold">
                  ({boxes.filter((b) => b.status === 'closed').length} Kotak Tersisa)
                </span>
              </div>

              {/* Indikator Giliran Aktif */}
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-sm animate-pulse">
                <span>⭐ Giliran:</span>
                <span className="underline decoration-2">
                  {teams[currentTeamIndex]?.name}
                </span>
              </div>
            </div>

            {/* Deretan Kartu Tim */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-1">
              {teams.map((t, idx) => {
                const isCurrent = idx === currentTeamIndex;
                const palette = TEAM_PALETTES[idx % TEAM_PALETTES.length];

                return (
                  <div
                    key={t.id}
                    className={`relative rounded-xl p-2.5 transition-all border-2 flex flex-col justify-between ${
                      isCurrent
                        ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-amber-400 ring-2 ring-amber-400/50 scale-102 shadow-lg shadow-amber-500/10'
                        : 'bg-slate-800/60 border-slate-700/80 opacity-85'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className={`w-3 h-3 rounded-full ${palette.bg} shrink-0`} />
                        <span className="text-xs font-black text-white truncate" title={t.name}>
                          {t.name}
                        </span>
                      </div>
                      {isCurrent && (
                        <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 shrink-0">
                          Aktif
                        </span>
                      )}
                    </div>

                    <div className="flex items-baseline justify-between mt-0.5">
                      <span className="text-[10px] font-bold text-slate-400">Skor:</span>
                      <span className="text-lg sm:text-xl font-black text-amber-300 font-mono">
                        {t.score}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Grid Kotak Bernomor (30 atau 40 Kotak) */}
          <div className="w-full bg-[#1E293B]/70 backdrop-blur-md rounded-3xl p-3 sm:p-5 border border-white/10 shadow-2xl my-auto">
            <div
              className={`grid gap-2.5 sm:gap-3.5 ${
                selectedQuestionCount === 30
                  ? 'grid-cols-5 sm:grid-cols-6 md:grid-cols-10'
                  : 'grid-cols-5 sm:grid-cols-8 md:grid-cols-10'
              }`}
            >
              {boxes.map((box, idx) => {
                const isClosed = box.status === 'closed';
                const isOpened = box.status === 'opened';
                const isSkipped = box.status === 'skipped';

                return (
                  <button
                    key={box.boxNumber}
                    disabled={!isClosed}
                    onClick={() => handleSelectBox(idx)}
                    className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center font-black transition-all duration-200 border-2 ${
                      isClosed
                        ? 'bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 border-amber-200 text-slate-950 shadow-[0_4px_0_#B45309] hover:shadow-[0_6px_0_#B45309] hover:-translate-y-1 hover:brightness-110 active:translate-y-0.5 active:shadow-[0_1px_0_#B45309] cursor-pointer'
                        : isSkipped
                        ? 'bg-slate-800/50 border-slate-700 text-slate-500 shadow-inner cursor-not-allowed opacity-50'
                        : 'bg-slate-800/80 border-slate-700 text-slate-400 shadow-inner cursor-not-allowed opacity-75'
                    }`}
                    title={
                      isClosed
                        ? `Kotak #${box.boxNumber} (Klik untuk membuka soal)`
                        : isSkipped
                        ? `Kotak #${box.boxNumber} (Dilewati oleh Guru)`
                        : `Kotak #${box.boxNumber} (Sudah digunakan)`
                    }
                  >
                    {isClosed ? (
                      <>
                        {/* Ribbon Top Icon */}
                        <div className="absolute top-1 right-1 opacity-60">
                          <Gift className="w-3.5 h-3.5 text-slate-900" />
                        </div>
                        <span className="text-xl sm:text-2xl font-black drop-shadow-xs">
                          {box.boxNumber}
                        </span>
                        <span className="text-[10px] font-extrabold uppercase tracking-tight opacity-75">
                          Kotak
                        </span>
                      </>
                    ) : isSkipped ? (
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-base sm:text-lg font-black line-through text-slate-500">
                          {box.boxNumber}
                        </span>
                        <span className="text-[9px] font-bold text-slate-500">LEWAT</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 mb-0.5" />
                        <span className="text-xs font-bold text-slate-400 font-mono">
                          #{box.boxNumber}
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Bar Info / Log Singkat */}
          <div className="w-full flex items-center justify-between text-xs text-slate-400 font-medium px-2 pb-1">
            <span className="flex items-center gap-1.5">
              <Info className="w-4 h-4 text-sky-400" />
              <span>Kelompok yang aktif memilih salah satu kotak tertutup untuk menjawab soal.</span>
            </span>

            <button
              onClick={() => {
                if (confirm('Akhiri sesi dan lihat rekapitulasi skor sekarang?')) {
                  soundManager.playSfx('fanfare');
                  setViewState('finished');
                }
              }}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 underline cursor-pointer"
            >
              Lihat Rekapitulasi Akhir
            </button>
          </div>
        </main>
      )}

      {/* =========================================================================
          QUESTION MODAL (Modal Pengerjaan Soal, Timer, Hadiah & Keputusan)
      ========================================================================= */}
      {activeBoxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#1E293B] rounded-[32px] border-2 border-white/20 shadow-2xl p-5 sm:p-7 flex flex-col justify-between max-h-[92vh] overflow-y-auto">
            
            {/* Modal Header: Nomor Kotak, Topic, Difficulty & Timer */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs sm:text-sm">
                  Kotak #{boxes[activeBoxIndex].boxNumber}
                </span>

                <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 font-black text-xs">
                  {boxes[activeBoxIndex].question.topicLabel}
                </span>

                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                    boxes[activeBoxIndex].question.difficulty === 'mudah'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : boxes[activeBoxIndex].question.difficulty === 'sedang'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}
                >
                  {boxes[activeBoxIndex].question.difficulty.toUpperCase()}
                </span>
              </div>

              {/* Timer Bar / Clock */}
              {modalPhase === 'answering' && (
                <div
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono font-black text-sm sm:text-base border ${
                    timeLeft <= 10
                      ? 'bg-rose-600/30 border-rose-500 text-rose-300 animate-pulse'
                      : 'bg-slate-800 border-slate-700 text-amber-300'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>{timeLeft}s</span>
                </div>
              )}
            </div>

            {/* Content Body Based on Modal Phase */}
            <div className="py-4 space-y-4">
              
              {/* PHASE 1: ANSWERING */}
              {modalPhase === 'answering' && (
                <>
                  {/* Giliran Tim Info */}
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 bg-slate-800/60 p-2.5 rounded-xl border border-white/5">
                    <span>
                      Giliran Menjawab:{' '}
                      <strong className="text-amber-400">{teams[currentTeamIndex]?.name}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowSkipConfirm(true)}
                      className="text-xs text-rose-400 hover:text-rose-300 underline font-semibold cursor-pointer"
                    >
                      Lewati Soal (Guru)
                    </button>
                  </div>

                  {/* Question Text */}
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10">
                    <p className="text-sm sm:text-base lg:text-lg font-bold text-white leading-relaxed">
                      {boxes[activeBoxIndex].question.question}
                    </p>
                  </div>

                  {/* Multiple Choice Options */}
                  {boxes[activeBoxIndex].question.type === 'pilihan-ganda' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {boxes[activeBoxIndex].question.options?.map((opt) => {
                        const isSelected = selectedOption === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => {
                              soundManager.playSfx('click');
                              setSelectedOption(opt.id);
                            }}
                            className={`p-3.5 rounded-2xl text-left font-bold text-xs sm:text-sm transition-all flex items-center gap-3 border-2 cursor-pointer ${
                              isSelected
                                ? 'bg-amber-400 text-slate-950 border-white shadow-lg'
                                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700'
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

                  {/* Numeric Keypad Input */}
                  {boxes[activeBoxIndex].question.type === 'isian-angka' && (
                    <div className="flex flex-col items-center gap-3 pt-1">
                      {/* Input Display Box */}
                      <div className="w-full max-w-xs p-3 rounded-2xl bg-slate-950 border-2 border-amber-400/80 text-center">
                        <span className="text-2xl sm:text-3xl font-black font-mono text-amber-300 min-h-[36px] block">
                          {numericInput || <span className="text-slate-600">Ketik angka...</span>}
                        </span>
                      </div>

                      {/* On-Screen Keypad */}
                      <div className="grid grid-cols-3 gap-2 w-full max-w-xs">
                        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '0', 'DEL'].map((key) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => handleKeypadPress(key)}
                            className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-white font-black text-base shadow-sm border border-slate-700 transition-all cursor-pointer flex items-center justify-center"
                          >
                            {key === 'DEL' ? <Delete className="w-5 h-5 text-rose-400" /> : key}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Konfirmasi Jawaban Button */}
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      disabled={
                        boxes[activeBoxIndex].question.type === 'pilihan-ganda'
                          ? !selectedOption
                          : !numericInput.trim()
                      }
                      onClick={handleConfirmAnswer}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-black text-sm sm:text-base shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Konfirmasi Jawaban</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}

              {/* PHASE 2: DECISION (Jawaban Benar! Ambil Hadiah atau Lempar Hadiah) */}
              {modalPhase === 'decision' && (
                <div className="text-center space-y-4 animate-scale-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border-2 border-emerald-400">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                      Luar Biasa!
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                      Jawaban Benar!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md mx-auto leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-white/5">
                      <strong className="text-emerald-300 block mb-1">Pembahasan:</strong>
                      {boxes[activeBoxIndex].question.explanation}
                    </p>
                  </div>

                  {/* Decision Options */}
                  <div className="p-4 rounded-2xl bg-amber-400/10 border-2 border-amber-400/30 space-y-3">
                    <p className="text-sm font-black text-amber-300">
                      Tentukan Keputusan Kelompok ({teams[currentTeamIndex]?.name}):
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
                      <button
                        type="button"
                        onClick={handleKeepReward}
                        className="p-4 rounded-2xl bg-gradient-to-b from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm sm:text-base shadow-lg transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Gift className="w-6 h-6" />
                        <span>Ambil Hadiah</span>
                        <span className="text-[11px] font-semibold opacity-85">
                          Hadiah untuk tim sendiri
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={handleInitiatePassReward}
                        className="p-4 rounded-2xl bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-black text-sm sm:text-base shadow-lg transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Send className="w-6 h-6" />
                        <span>Lempar Hadiah</span>
                        <span className="text-[11px] font-semibold opacity-85">
                          Berikan ke kelompok lain
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* PHASE 3: PASS SELECTION (Pilih Tim Tujuan Lempar Hadiah) */}
              {modalPhase === 'pass_selection' && (
                <div className="text-center space-y-4 animate-scale-in">
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Pilih Kelompok Sasaran Hadiah:
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Pilih kelompok lawan yang akan menerima isi kotak kejutan ini:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-md mx-auto">
                    {teams
                      .filter((_, idx) => idx !== currentTeamIndex)
                      .map((otherTeam) => (
                        <button
                          key={otherTeam.id}
                          type="button"
                          onClick={() => handleConfirmPassReward(otherTeam.id)}
                          className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border-2 border-white/20 text-white font-black text-sm flex items-center justify-between transition-all cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <span className={`w-3.5 h-3.5 rounded-full ${otherTeam.color}`} />
                            <span>{otherTeam.name}</span>
                          </div>
                          <span className="text-xs text-amber-400 font-mono font-bold">
                            Skor: {otherTeam.score}
                          </span>
                        </button>
                      ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setModalPhase('decision')}
                    className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                  >
                    Batal Lempar (Kembali ke Pilihan)
                  </button>
                </div>
              )}

              {/* PHASE 4: REVEALING (Pengungkapan Hadiah & Efek Poin) */}
              {modalPhase === 'revealing' && drawnReward && (
                <div className="text-center space-y-4 animate-scale-in">
                  <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                    <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl animate-ping" />
                    <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-b from-amber-300 to-amber-500 border-4 border-white shadow-2xl flex items-center justify-center text-slate-950">
                      <Gift className="w-12 h-12 animate-bounce" />
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                      Isi Kotak Kejutan Terungkap!
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                      {drawnReward.name}
                    </h3>
                    <p className="text-sm font-bold text-slate-200 mt-1">
                      {drawnReward.description}
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 text-xs sm:text-sm font-black text-amber-300 max-w-md mx-auto leading-relaxed">
                    {rewardSummary}
                  </div>

                  <button
                    type="button"
                    onClick={closeModalAndAdvanceTurn}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#38BDF8] hover:bg-[#0284C7] text-slate-950 font-black text-sm sm:text-base shadow-lg transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                  >
                    <span>Lanjut ke Giliran Berikutnya</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* PHASE 5: RESULT WRONG (Jawaban Salah) */}
              {modalPhase === 'result_wrong' && (
                <div className="text-center space-y-4 animate-scale-in">
                  <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 mx-auto flex items-center justify-center border-2 border-rose-400">
                    <XCircle className="w-10 h-10" />
                  </div>

                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-rose-400">
                      Kurang Tepat!
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                      Jawaban Salah
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md mx-auto leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-white/5">
                      <strong className="text-amber-300 block mb-1">
                        Kunci Jawaban:{' '}
                        {boxes[activeBoxIndex].question.type === 'pilihan-ganda'
                          ? boxes[activeBoxIndex].question.correctAnswer
                          : boxes[activeBoxIndex].question.correctAnswer}
                      </strong>
                      {boxes[activeBoxIndex].question.explanation}
                    </p>
                  </div>

                  <p className="text-xs text-slate-400 font-bold">
                    Tidak ada hadiah yang dapat diambil atau dilempar. Giliran akan dilanjutkan ke kelompok berikutnya.
                  </p>

                  <button
                    type="button"
                    onClick={closeModalAndAdvanceTurn}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-700 hover:bg-slate-600 text-white font-black text-sm sm:text-base shadow-lg transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                  >
                    <span>Lanjut ke Giliran Berikutnya</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* PHASE 6: RESULT TIMEOUT (Waktu Habis) */}
              {modalPhase === 'result_timeout' && (
                <div className="text-center space-y-4 animate-scale-in">
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center border-2 border-amber-400">
                    <Clock className="w-10 h-10" />
                  </div>

                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                      Waktu Habis!
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                      Waktu Menjawab Telah Berakhir
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md mx-auto leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-white/5">
                      <strong className="text-amber-300 block mb-1">
                        Kunci Jawaban: {boxes[activeBoxIndex].question.correctAnswer}
                      </strong>
                      {boxes[activeBoxIndex].question.explanation}
                    </p>
                  </div>

                  <p className="text-xs text-slate-400 font-bold">
                    Waktu telah habis sebelum jawaban dikonfirmasi. Tidak ada hadiah untuk giliran ini.
                  </p>

                  <button
                    type="button"
                    onClick={closeModalAndAdvanceTurn}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-700 hover:bg-slate-600 text-white font-black text-sm sm:text-base shadow-lg transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                  >
                    <span>Lanjut ke Giliran Berikutnya</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>

            {/* CONFIRMATION MODAL TO SKIP QUESTION */}
            {showSkipConfirm && (
              <div className="absolute inset-0 z-50 bg-slate-950/95 backdrop-blur-md rounded-[32px] p-6 flex flex-col items-center justify-center text-center space-y-4">
                <ShieldAlert className="w-12 h-12 text-rose-400" />
                <h4 className="text-xl font-black text-white">Lewati Soal Ini?</h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-sm leading-relaxed">
                  Soal ini akan ditandai dengan status dilewati (skipped) untuk keperluan guru. Tidak ada kelompok yang akan bertambah atau berkurang poinnya.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowSkipConfirm(false)}
                    className="px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer"
                  >
                    Batal (Lanjutkan Menjawab)
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmSkipQuestion}
                    className="px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-md cursor-pointer"
                  >
                    Ya, Lewati Soal
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 3: FINISHED SCREEN (Layar Akhir Permainan, Podium & Rekapitulasi)
      ========================================================================= */}
      {viewState === 'finished' && (
        <main className="relative z-20 w-full max-w-5xl mx-auto my-auto px-4 sm:px-6 py-6 flex flex-col items-center gap-6 animate-scale-in">
          <div className="w-full bg-[#1E293B]/90 backdrop-blur-md rounded-[36px] p-6 sm:p-8 border-2 border-white/20 shadow-2xl flex flex-col gap-6">
            
            {/* Banner Kemenangan */}
            <div className="text-center space-y-2">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 text-slate-950 mx-auto flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Trophy className="w-10 h-10 animate-bounce" />
              </div>

              <span className="inline-block px-4 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-400/40">
                Permainan Selesai
              </span>

              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Selamat Kepada Para Penjelajah!
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-lg mx-auto">
                Seluruh kotak kejutan telah dibuka. Berikut adalah hasil akhir perolehan poin dan rekapitulasi kekompakan kelompok!
              </p>
            </div>

            {/* Podium Peringkat 1, 2, 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 items-end">
              {/* Posisi 2 */}
              {sortedLeaderboard.length > 1 && (
                <div className="order-2 sm:order-1 bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-center flex flex-col items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-slate-400 text-slate-950 font-black text-sm flex items-center justify-center mb-1">
                    2
                  </span>
                  <span className="text-sm font-black text-white truncate max-w-full">
                    {sortedLeaderboard[1].name}
                  </span>
                  <span className="text-2xl font-black text-slate-200 font-mono mt-1">
                    {sortedLeaderboard[1].score} Poin
                  </span>
                  <span className="text-[11px] text-slate-400 font-semibold mt-1">
                    {sortedLeaderboard[1].correctCount} Benar • {sortedLeaderboard[1].wrongCount} Salah
                  </span>
                </div>
              )}

              {/* Posisi 1 (Pemenang Utama) */}
              {sortedLeaderboard.length > 0 && (
                <div className="order-1 sm:order-2 bg-gradient-to-b from-amber-500/30 to-amber-600/10 p-5 rounded-3xl border-2 border-amber-400 text-center flex flex-col items-center justify-between shadow-xl shadow-amber-500/10">
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-black uppercase mb-1">
                    <Sparkles className="w-4 h-4" />
                    <span>Juara 1</span>
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-lg sm:text-xl font-black text-amber-300 truncate max-w-full">
                    {sortedLeaderboard[0].name}
                  </span>
                  <span className="text-3xl sm:text-4xl font-black text-white font-mono my-1">
                    {sortedLeaderboard[0].score} Poin
                  </span>
                  <span className="text-xs text-amber-200 font-bold">
                    {sortedLeaderboard[0].correctCount} Benar • {sortedLeaderboard[0].wrongCount} Salah
                  </span>
                </div>
              )}

              {/* Posisi 3 */}
              {sortedLeaderboard.length > 2 && (
                <div className="order-3 bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-center flex flex-col items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-amber-700 text-amber-100 font-black text-sm flex items-center justify-center mb-1">
                    3
                  </span>
                  <span className="text-sm font-black text-white truncate max-w-full">
                    {sortedLeaderboard[2].name}
                  </span>
                  <span className="text-2xl font-black text-slate-200 font-mono mt-1">
                    {sortedLeaderboard[2].score} Poin
                  </span>
                  <span className="text-[11px] text-slate-400 font-semibold mt-1">
                    {sortedLeaderboard[2].correctCount} Benar • {sortedLeaderboard[2].wrongCount} Salah
                  </span>
                </div>
              )}
            </div>

            {/* Tabel Lengkap Rekapitulasi */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-black text-slate-300 uppercase tracking-wider">
                Rekapitulasi Semua Kelompok:
              </h3>

              <div className="overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-900/90 text-slate-400 text-[11px] uppercase font-black">
                    <tr>
                      <th className="py-3 px-4">Peringkat</th>
                      <th className="py-3 px-4">Nama Kelompok</th>
                      <th className="py-3 px-4 text-center">Benar</th>
                      <th className="py-3 px-4 text-center">Salah</th>
                      <th className="py-3 px-4 text-center">Waktu Habis</th>
                      <th className="py-3 px-4 text-center">Dilewati</th>
                      <th className="py-3 px-4 text-right">Skor Akhir</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 bg-slate-800/40 font-bold">
                    {sortedLeaderboard.map((team, idx) => {
                      const rank = idx + 1;
                      return (
                        <tr key={team.id} className="hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4 font-mono font-black text-amber-400">
                            #{rank}
                          </td>
                          <td className="py-3 px-4 text-white">
                            <div className="flex items-center gap-2">
                              <span className={`w-3 h-3 rounded-full ${team.color}`} />
                              <span>{team.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center text-emerald-400 font-mono">
                            {team.correctCount}
                          </td>
                          <td className="py-3 px-4 text-center text-rose-400 font-mono">
                            {team.wrongCount}
                          </td>
                          <td className="py-3 px-4 text-center text-amber-300 font-mono">
                            {team.timeoutCount}
                          </td>
                          <td className="py-3 px-4 text-center text-slate-400 font-mono">
                            {team.skippedCount}
                          </td>
                          <td className="py-3 px-4 text-right text-base font-black text-amber-300 font-mono">
                            {team.score}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Riwayat Kotak & Hadiah */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-black text-slate-300 uppercase tracking-wider">
                Catatan Hadiah & Peristiwa ({history.length} Interaksi):
              </h3>
              <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                {history.map((h, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-900/60 border border-white/5 text-xs flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-amber-400 shrink-0">
                        Kotak #{h.boxNumber}
                      </span>
                      <span className="text-slate-300 font-bold">• {h.teamName}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-black ${
                          h.status === 'correct'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : h.status === 'incorrect'
                            ? 'bg-rose-500/20 text-rose-300'
                            : h.status === 'timeout'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-slate-700 text-slate-400'
                        }`}
                      >
                        {h.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="text-right text-[11px] font-medium text-slate-400">
                      {h.scoreChangeDescription}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons: Main Lagi & Kembali ke Menu Game Kelompok */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  soundManager.playSfx('click');
                  setViewState('setup');
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Main Lagi (Sesi Baru)</span>
              </button>

              <Link
                href="/game/kelompok"
                onClick={() => {
                  soundManager.stopBgm();
                  soundManager.playSfx('click');
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
        LINTERA • Game Kelompok Kotak Kejutan
      </footer>
    </div>
  );
}
