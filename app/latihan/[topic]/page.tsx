'use client';

import React, { useState, useMemo, use } from 'react';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import {
  ChevronLeft,
  Home,
  CheckCircle2,
  XCircle,
  ArrowRight,
  HelpCircle,
  Delete,
  RotateCcw,
  Sparkles,
  Award,
  Layers,
  BookOpen
} from 'lucide-react';

import {
  LatihanTopicId,
  LatihanQuestion,
  LatihanAnswerRecord,
  LatihanSessionResult,
  LATIHAN_TOPICS,
} from '@/lib/latihan/types';
import { getQuestionsByTopic } from '@/lib/latihan/questions';
import {
  getStoredStudentName,
  setStoredStudentName,
  saveLatihanResult,
} from '@/lib/latihan/storage';
import SertifikatLatihan from '@/components/latihan/SertifikatLatihan';
import ReviewLatihan from '@/components/latihan/ReviewLatihan';

interface PageProps {
  params: Promise<{ topic: string }>;
}

export default function LatihanTopicPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();

  const topicId = resolvedParams.topic as LatihanTopicId;
  const topicInfo = LATIHAN_TOPICS.find((t) => t.id === topicId);

  // If topic is invalid, return 404
  if (!topicInfo) {
    notFound();
  }

  // Questions for this topic (strictly 20 questions in progressive order)
  const questions = useMemo(() => getQuestionsByTopic(topicId), [topicId]);
  const [studentName, setStudentName] = useState<string>(() => getStoredStudentName());

  // Exercise Flow: 'intro' | 'active' | 'certificate' | 'review'
  const [flowState, setFlowState] = useState<'intro' | 'active' | 'certificate' | 'review'>('intro');

  // Active question state
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [numericInput, setNumericInput] = useState<string>('');
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [currentFeedback, setCurrentFeedback] = useState<{
    isCorrect: boolean;
    explanation: string;
    correctAnswer: string;
  } | null>(null);

  // Collected answers
  const [records, setRecords] = useState<LatihanAnswerRecord[]>([]);
  const [finalResult, setFinalResult] = useState<LatihanSessionResult | null>(null);

  const currentQ = questions[currentIndex];

  // --- START EXERCISE ---
  const handleStartExercise = () => {
    if (studentName.trim()) {
      setStoredStudentName(studentName.trim());
    }
    setCurrentIndex(0);
    setSelectedOption(null);
    setNumericInput('');
    setIsLocked(false);
    setCurrentFeedback(null);
    setRecords([]);
    setFinalResult(null);
    setFlowState('active');
  };

  // --- KEYPAD INPUT HANDLERS ---
  const handleKeypadPress = (val: string) => {
    if (isLocked) return;

    if (val === 'DEL') {
      setNumericInput((prev) => prev.slice(0, -1));
    } else if (val === 'CLR') {
      setNumericInput('');
    } else if (val === '-') {
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

  // --- CHECK / SUBMIT ANSWER ---
  const handleCheckAnswer = () => {
    if (!currentQ || isLocked) return;

    let given = '';
    if (currentQ.type === 'pilihan-ganda') {
      if (!selectedOption) return;
      given = selectedOption;
    } else {
      if (!numericInput.trim()) return;
      given = numericInput.trim();
    }

    setIsLocked(true);

    // Verify
    let isCorrect = false;
    if (currentQ.type === 'pilihan-ganda') {
      isCorrect = given.trim().toUpperCase() === currentQ.correctAnswer.trim().toUpperCase();
    } else {
      const numGiven = parseFloat(given.replace(',', '.'));
      const numTarget = parseFloat(currentQ.correctAnswer.replace(',', '.'));
      if (!isNaN(numGiven) && !isNaN(numTarget)) {
        const tol = currentQ.numericTolerance ?? 0.001;
        isCorrect = Math.abs(numGiven - numTarget) <= tol;
      } else {
        isCorrect = given.trim().toLowerCase() === currentQ.correctAnswer.trim().toLowerCase();
      }
    }

    setCurrentFeedback({
      isCorrect,
      explanation: currentQ.explanation,
      correctAnswer: currentQ.correctAnswer,
    });

    // Record answer
    const newRecord: LatihanAnswerRecord = {
      questionId: currentQ.id,
      questionNumber: currentIndex + 1,
      questionText: currentQ.question,
      difficulty: currentQ.difficulty,
      type: currentQ.type,
      userAnswer: given,
      correctAnswer: currentQ.correctAnswer,
      isCorrect,
      explanation: currentQ.explanation,
    };

    setRecords((prev) => [...prev, newRecord]);
  };

  // --- NEXT QUESTION OR FINISH ---
  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setNumericInput('');
      setIsLocked(false);
      setCurrentFeedback(null);
    } else {
      // Finished all 20 questions!
      const correctCount = records.filter((r) => r.isCorrect).length;
      const wrongCount = 20 - correctCount;
      const score = Math.round((correctCount / 20) * 100);
      const percentage = Math.round((correctCount / 20) * 100);

      const now = new Date();
      const formattedDate = new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(now);

      const result: LatihanSessionResult = {
        topicId: topicInfo.id,
        topicTitle: topicInfo.title,
        studentName: studentName.trim() || 'Siswa LINTERA',
        completedAt: now.toISOString(),
        formattedDate,
        totalQuestions: 20,
        correctCount,
        wrongCount,
        score,
        percentage,
        answers: records,
      };

      saveLatihanResult(result);
      setFinalResult(result);
      setFlowState('certificate');
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] font-sans select-none flex flex-col justify-between text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
      </div>

      {/* Header Navigasi */}
      <header className="relative z-30 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-3 flex items-center justify-between border-b border-white/10 print:hidden">
        <Link
          href="/latihan"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Kembali ke Menu Latihan"
        >
          <ChevronLeft className="w-6 h-6 stroke-[3] -ml-0.5" />
        </Link>

        <div className="flex flex-col items-center text-center">
          <span className="text-xs font-black uppercase text-amber-400 tracking-wider">
            Latihan Soal Matematika
          </span>
          <h1 className="text-base sm:text-xl font-black text-white">
            {topicInfo.title}
          </h1>
        </div>

        <Link
          href="/dashboard"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Kembali ke Dashboard"
        >
          <Home className="w-5 h-5" />
        </Link>
      </header>

      {/* =========================================================================
          STAGE 1: INTRO SCREEN (Nama Siswa & Info 20 Soal Berjenjang)
      ========================================================================= */}
      {flowState === 'intro' && (
        <main className="relative z-20 w-full max-w-3xl mx-auto my-auto px-4 sm:px-6 py-6 flex flex-col items-center">
          <div className="w-full bg-[#1E293B]/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-2 border-white/20 shadow-2xl flex flex-col gap-6">
            {/* Header Pengantar */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/80 border border-white/10">
              <div className={`w-14 h-14 rounded-2xl ${topicInfo.iconBg} flex items-center justify-center shrink-0 shadow-md`}>
                <BookOpen className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                  20 Soal Berjenjang Tanpa Timer
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  {topicInfo.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                  {topicInfo.description}
                </p>
              </div>
            </div>

            {/* Input Nama Siswa untuk Sertifikat */}
            <div className="space-y-2 p-4 rounded-2xl bg-slate-800/60 border border-white/10">
              <label className="text-xs font-black uppercase tracking-wider text-slate-200 block">
                Nama Lengkap Siswa (Dicantumkan pada Sertifikat):
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Masukkan nama lengkap kamu..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-sm sm:text-base focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
              />
              <span className="text-[11px] text-slate-400 block">
                *Nama ini akan tertera otomatis di sertifikat kelulusan latihan setelah kamu menyelesaikan ke-20 soal.
              </span>
            </div>

            {/* Skema Tingkat Kesulitan Berjenjang */}
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-300 block">
                Tahapan Tingkat Kesulitan:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
                <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30">
                  <span className="font-black text-emerald-400 block text-sm">Soal 1–5</span>
                  <span className="text-[11px] text-slate-300 font-bold">Mudah</span>
                </div>
                <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30">
                  <span className="font-black text-amber-400 block text-sm">Soal 6–10</span>
                  <span className="text-[11px] text-slate-300 font-bold">Sedang</span>
                </div>
                <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30">
                  <span className="font-black text-rose-400 block text-sm">Soal 11–15</span>
                  <span className="text-[11px] text-slate-300 font-bold">Sulit</span>
                </div>
                <div className="p-3 rounded-xl bg-purple-500/15 border border-purple-500/30">
                  <span className="font-black text-purple-300 block text-sm">Soal 16–20</span>
                  <span className="text-[11px] text-slate-300 font-bold">Tantangan</span>
                </div>
              </div>
            </div>

            {/* Action Start */}
            <div className="pt-2 flex items-center justify-between border-t border-white/10">
              <Link
                href="/latihan"
                className="py-3 px-5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs sm:text-sm transition-all"
              >
                Pilih Materi Lain
              </Link>

              <button
                type="button"
                onClick={handleStartExercise}
                className="py-3.5 px-8 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm sm:text-base shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Mulai Latihan</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        </main>
      )}

      {/* =========================================================================
          STAGE 2: ACTIVE QUESTION SOLVING (1 Soal per Halaman, Keypad / PG, Pembahasan)
      ========================================================================= */}
      {flowState === 'active' && currentQ && (
        <main className="relative z-20 w-full max-w-4xl mx-auto my-auto px-4 sm:px-6 py-4 flex flex-col gap-4">
          {/* Progress Bar & Difficulty Tag */}
          <div className="w-full bg-[#1E293B]/80 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-0.5 rounded-full text-xs font-black ${
                    currentQ.difficulty === 'mudah'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : currentQ.difficulty === 'sedang'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : currentQ.difficulty === 'sulit'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                  }`}
                >
                  {currentQ.difficultyLabel} — Soal {currentIndex + 1} dari 20
                </span>
              </div>

              <span className="text-slate-400 font-mono">
                {Math.round(((currentIndex + 1) / 20) * 100)}%
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-sky-400 transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / 20) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="w-full bg-[#1E293B] rounded-3xl p-5 sm:p-7 border-2 border-white/10 shadow-2xl space-y-5">
            {/* Pertanyaan */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-700">
              <p className="text-sm sm:text-base lg:text-lg font-bold text-white leading-relaxed">
                {currentQ.question}
              </p>
            </div>

            {/* Interaction Options (Before Feedback) */}
            {!currentFeedback && (
              <>
                {/* 1. Multiple Choice */}
                {currentQ.type === 'pilihan-ganda' && currentQ.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {currentQ.options.map((opt) => {
                      const isSelected = selectedOption === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedOption(opt.id)}
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

                {/* 2. Numeric Keypad */}
                {currentQ.type === 'isian-angka' && (
                  <div className="flex flex-col items-center gap-3 pt-1">
                    <div className="w-full max-w-xs p-3 rounded-2xl bg-slate-950 border-2 border-amber-400/80 text-center">
                      <span className="text-2xl sm:text-3xl font-black font-mono text-amber-300 min-h-[36px] block">
                        {numericInput || <span className="text-slate-600">Ketik angka...</span>}
                      </span>
                    </div>

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

                {/* Tombol Periksa Jawaban */}
                <div className="pt-3 border-t border-white/10 flex justify-end">
                  <button
                    type="button"
                    disabled={
                      currentQ.type === 'pilihan-ganda'
                        ? !selectedOption
                        : !numericInput.trim()
                    }
                    onClick={handleCheckAnswer}
                    className="py-3 px-8 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-black text-sm sm:text-base shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Periksa Jawaban</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </>
            )}

            {/* Feedback & Pembahasan */}
            {currentFeedback && (
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border-2 border-white/20 space-y-3 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {currentFeedback.isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <XCircle className="w-6 h-6 text-rose-400" />
                    )}
                    <span className={`text-base sm:text-lg font-black ${currentFeedback.isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {currentFeedback.isCorrect ? 'Jawaban Benar! (+1 Poin)' : 'Jawaban Kurang Tepat (0 Poin)'}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-slate-400 font-mono">
                    Soal {currentIndex + 1} / 20
                  </span>
                </div>

                {!currentFeedback.isCorrect && (
                  <div className="text-xs font-bold text-amber-300 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/30">
                    Kunci Jawaban yang Benar: <strong className="text-white ml-1">{currentFeedback.correctAnswer}</strong>
                  </div>
                )}

                {/* Pembahasan Matematis */}
                <div className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <strong className="text-sky-300 block mb-1">Pembahasan:</strong>
                  {currentFeedback.explanation}
                </div>

                {/* Tombol Lanjut ke Soal Berikutnya */}
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="py-3 px-6 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>
                      {currentIndex + 1 < questions.length
                        ? 'Soal Berikutnya'
                        : 'Lihat Hasil & Sertifikat'}
                    </span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      )}

      {/* =========================================================================
          STAGE 3: CERTIFICATE VIEW (Setelah 20 Soal Selesai)
      ========================================================================= */}
      {flowState === 'certificate' && finalResult && (
        <main className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <SertifikatLatihan
            result={finalResult}
            onReset={handleStartExercise}
            onBackToMenu={() => router.push('/latihan')}
            onReview={() => setFlowState('review')}
          />
        </main>
      )}

      {/* =========================================================================
          STAGE 4: REVIEW VIEW (Meninjau Pembahasan Lengkap 20 Soal)
      ========================================================================= */}
      {flowState === 'review' && finalResult && (
        <main className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <ReviewLatihan
            result={finalResult}
            onBackToCertificate={() => setFlowState('certificate')}
          />
        </main>
      )}

      {/* Footer */}
      <footer className="relative z-20 text-center text-slate-500 text-xs font-semibold py-3 border-t border-white/5 print:hidden">
        LINTERA • Media Pembelajaran Matematika Interaktif
      </footer>
    </div>
  );
}
