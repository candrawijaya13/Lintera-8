'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  Home,
  BookOpen,
  LineChart,
  CircleDot,
  ArrowRight,
  Sparkles,
  Award,
  CheckCircle2,
  Clock,
  User,
  ShieldCheck,
  Zap,
  HelpCircle
} from 'lucide-react';

import { LATIHAN_TOPICS, LatihanTopicId, LatihanSessionResult } from '@/lib/latihan/types';
import {
  getStoredStudentName,
  setStoredStudentName,
  getStoredLatihanResults,
} from '@/lib/latihan/storage';

export default function LatihanMenuPage() {
  const [studentName, setStudentName] = useState<string>(() => getStoredStudentName());
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [results, setResults] = useState<Record<LatihanTopicId, LatihanSessionResult | null>>(() => getStoredLatihanResults());

  const handleSaveName = (newName: string) => {
    setStudentName(newName);
    setStoredStudentName(newName);
    setIsEditingName(false);
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#FDE047] via-[#FACC15] to-[#EAB308] font-sans select-none flex flex-col justify-between overflow-x-hidden p-4 sm:p-6 lg:p-8">
      {/* Background Ornaments (Awan, Bintang, Simbol Matematika Halus) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-white/30 blur-2xl" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-white/25 blur-2xl" />

        <svg className="absolute top-12 left-6 w-48 h-48 opacity-40" viewBox="0 0 100 100" fill="none">
          <path d="M10 90C10 45 45 10 90 10" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="6 6" />
        </svg>

        <svg className="absolute top-16 right-8 w-48 h-48 opacity-40" viewBox="0 0 100 100" fill="none">
          <path d="M10 10C55 10 90 45 90 90" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="6 6" />
        </svg>
      </div>

      {/* =========================================================================
          HEADER: TOMBOL KEMBALI, JUDUL UTAMA, & TOMBOL HOME
      ========================================================================= */}
      <header className="relative z-20 w-full max-w-6xl mx-auto flex items-center justify-between pt-1 sm:pt-2">
        <Link
          href="/dashboard"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#2875FB] hover:bg-[#1C64E8] text-white flex items-center justify-center border-[3.5px] border-white shadow-lg shadow-blue-900/20 hover:scale-105 active:scale-95 transition-all duration-200 shrink-0 cursor-pointer"
          title="Kembali ke Dashboard"
        >
          <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8 stroke-[3.5] -ml-0.5" />
        </Link>

        {/* Judul Bagian Tengah */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
          <div className="inline-block px-4 py-1 rounded-full bg-white/80 backdrop-blur-xs text-[#123B8A] font-black text-xs sm:text-sm tracking-wide shadow-xs mb-1.5 border border-white">
            Evaluasi Mandiri Siswa
          </div>

          <div className="relative inline-flex items-center justify-center gap-2 sm:gap-3">
            <h1 className="text-3xl sm:text-4.5xl md:text-5xl font-black tracking-tight leading-none drop-shadow-sm text-[#123B8A]">
              Latihan <span className="text-[#EA580C]">Soal</span>
            </h1>
          </div>

          <p className="text-xs sm:text-sm md:text-base font-extrabold text-[#78350F] mt-1.5 drop-shadow-xs">
            Uji pemahaman konsep lingkaranmu secara bertahap dan raih sertifikat resmi!
          </p>
        </div>

        <Link
          href="/dashboard"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#2875FB] hover:bg-[#1C64E8] text-white flex items-center justify-center border-[3.5px] border-white shadow-lg shadow-blue-900/20 hover:scale-105 active:scale-95 transition-all duration-200 shrink-0 cursor-pointer"
          title="Kembali ke Dashboard"
        >
          <Home className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.8]" />
        </Link>
      </header>

      {/* =========================================================================
          BANNER SISWA & ATURAN BERJENJANG
      ========================================================================= */}
      <section className="relative z-20 w-full max-w-5xl mx-auto mt-4 sm:mt-6 mb-2">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-5 border-2 border-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <User className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wide">
                Nama Siswa untuk Sertifikat:
              </span>
              {isEditingName ? (
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="px-3 py-1 rounded-lg border-2 border-amber-400 bg-white text-sm font-black text-slate-900 focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={() => handleSaveName(studentName)}
                    className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-black text-xs cursor-pointer shadow-xs"
                  >
                    Simpan
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <strong className="text-base sm:text-lg font-black text-[#123B8A]">
                    {studentName}
                  </strong>
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="text-xs font-bold text-amber-600 hover:text-amber-700 underline cursor-pointer"
                  >
                    (Ubah Nama)
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100/80 px-3.5 py-2 rounded-xl border border-slate-200">
            <Zap className="w-4 h-4 text-amber-500 shrink-0" />
            <span>20 Soal per Materi • Mudah → Sedang → Sulit → Tantangan</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          AREA TIGA KARTU MATERI LATIHAN SOAL
      ========================================================================= */}
      <main className="relative z-20 w-full max-w-5xl mx-auto my-auto py-3 sm:py-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          {LATIHAN_TOPICS.map((topic, idx) => {
            const prevResult = results[topic.id];

            return (
              <div
                key={topic.id}
                className="group relative bg-white rounded-[32px] sm:rounded-[36px] p-4 sm:p-5 flex flex-col justify-between border-[5px] sm:border-[6px] border-white shadow-xl shadow-amber-900/15 hover:shadow-2xl hover:shadow-amber-900/25 transition-all duration-300 hover:-translate-y-1.5"
              >
                <div>
                  {/* Header Badge & Nomor Modul */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      #{idx + 1}
                    </span>
                    <span className="px-3 py-0.5 rounded-full bg-amber-400 text-[#123B8A] font-black text-[11px] border border-amber-300">
                      20 Soal
                    </span>
                  </div>

                  {/* Icon Card */}
                  <div className={`w-14 h-14 rounded-2xl ${topic.iconBg} flex items-center justify-center mb-3 shadow-sm border border-slate-100 group-hover:scale-105 transition-transform`}>
                    {idx === 0 && <BookOpen className="w-7 h-7" />}
                    {idx === 1 && <CircleDot className="w-7 h-7" />}
                    {idx === 2 && <LineChart className="w-7 h-7" />}
                  </div>

                  {/* Judul & Deskripsi */}
                  <h2 className="text-xl sm:text-2xl font-black text-[#123B8A] leading-tight mb-1">
                    {topic.title}
                  </h2>
                  <span className="text-[11px] font-extrabold text-amber-600 block mb-2">
                    {topic.subtitle}
                  </span>
                  <p className="text-xs font-semibold text-slate-600 leading-relaxed mb-4">
                    {topic.description}
                  </p>

                  {/* Progress / History Info */}
                  {prevResult ? (
                    <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 mb-4 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold text-emerald-800 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Telah Selesai
                        </span>
                        <strong className="text-sm font-black text-emerald-700 font-mono">
                          Nilai: {prevResult.score}
                        </strong>
                      </div>
                      <span className="text-[10px] text-slate-500 font-semibold block">
                        Akurasi: {prevResult.correctCount}/20 Benar ({prevResult.percentage}%)
                      </span>
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 mb-4 text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Belum dikerjakan • Tanpa batas waktu</span>
                    </div>
                  )}
                </div>

                {/* Tombol Mulai Latihan */}
                <Link
                  href={`/latihan/${topic.slug}`}
                  className="w-full py-3.5 px-5 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white flex items-center justify-center gap-2 shadow-[0_5px_0_#9A3412] hover:shadow-[0_6px_0_#9A3412] active:translate-y-1 active:shadow-[0_1px_0_#9A3412] transition-all cursor-pointer text-center group/btn"
                >
                  <span className="text-base sm:text-lg font-black tracking-wide">
                    {prevResult ? 'Latihan Ulang' : 'Mulai Latihan'}
                  </span>
                  <ArrowRight className="w-4 h-4 stroke-[3] group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer Info */}
      <footer className="relative z-20 text-center text-[#78350F]/80 text-xs font-bold py-2">
        LINTERA • Media Pembelajaran Matematika Interaktif
      </footer>
    </div>
  );
}
