'use client';

import React, { useRef } from 'react';
import {
  Printer,
  RotateCcw,
  ArrowLeft,
  Award,
  CheckCircle2,
  XCircle,
  Sparkles,
  Calendar,
  Layers,
  Star
} from 'lucide-react';
import { LatihanSessionResult } from '@/lib/latihan/types';

interface SertifikatLatihanProps {
  result: LatihanSessionResult;
  onReset: () => void;
  onBackToMenu: () => void;
  onReview: () => void;
}

export default function SertifikatLatihan({
  result,
  onReset,
  onBackToMenu,
  onReview,
}: SertifikatLatihanProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  // Determine appreciation message based on score
  let appreciation = '';
  let badgeColor = '';
  if (result.score >= 90) {
    appreciation = 'Istimewa! Kamu menunjukkan penguasaan konsep lingkaran yang luar biasa matang dan presisi!';
    badgeColor = 'from-amber-400 via-yellow-300 to-amber-500';
  } else if (result.score >= 75) {
    appreciation = 'Sangat Bagus! Pemahamanmu terhadap materi ini sudah sangat kuat. Pertahankan prestasimu!';
    badgeColor = 'from-blue-400 via-sky-300 to-blue-500';
  } else if (result.score >= 60) {
    appreciation = 'Bagus! Kamu telah berhasil menuntaskan 20 soal tantangan. Terus berlatih agar semakin mahir!';
    badgeColor = 'from-emerald-400 via-teal-300 to-emerald-500';
  } else {
    appreciation = 'Semangat! Setiap langkah latihan adalah kemajuan. Pelajari pembahasannya dan coba lagi!';
    badgeColor = 'from-purple-400 via-indigo-300 to-purple-500';
  }

  return (
    <div className="w-full flex flex-col items-center gap-6 py-4">
      {/* Action Bar (Hidden on print) */}
      <div className="w-full max-w-4xl flex flex-wrap items-center justify-between gap-3 print:hidden">
        <button
          onClick={onBackToMenu}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Menu Latihan</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onReview}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-amber-300 font-bold text-xs sm:text-sm border border-amber-400/30 transition-all cursor-pointer"
          >
            <Layers className="w-4 h-4" />
            <span>Tinjau Pembahasan 20 Soal</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / Unduh PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Certificate Card */}
      <div
        ref={printRef}
        id="certificate-printable-area"
        className="relative w-full max-w-4xl bg-gradient-to-br from-[#FFFDF7] via-[#FFFBEB] to-[#FEF3C7] text-slate-900 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 border-[10px] sm:border-[14px] border-[#1E3A8A] shadow-2xl overflow-hidden font-sans select-none print:m-0 print:p-8 print:w-full print:max-w-none print:border-[10px] print:shadow-none"
      >
        {/* Ornamen Sudut Sertifikat (Geometric Corner Accents) */}
        <div className="absolute top-2 left-2 w-12 h-12 border-t-4 border-l-4 border-amber-500 rounded-tl-xl pointer-events-none" />
        <div className="absolute top-2 right-2 w-12 h-12 border-t-4 border-r-4 border-amber-500 rounded-tr-xl pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-12 h-12 border-b-4 border-l-4 border-amber-500 rounded-bl-xl pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-12 h-12 border-b-4 border-r-4 border-amber-500 rounded-br-xl pointer-events-none" />

        {/* Lingkaran Air Watermark Background */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full border-[16px] border-amber-400/15 pointer-events-none" />
        <div className="absolute -left-16 -top-16 w-64 h-64 rounded-full border-[12px] border-blue-900/10 pointer-events-none" />

        {/* Inner Content */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-4 sm:space-y-5">
          {/* Header Brand */}
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/10 text-blue-900 text-xs font-black uppercase tracking-widest border border-blue-900/20 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>LINTERA • Lingkaran Interaktif untuk Matematika</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-4.5xl font-black text-[#123B8A] uppercase tracking-wide drop-shadow-xs">
              Sertifikat Penyelesaian Latihan
            </h1>
            <div className="w-36 sm:w-48 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mt-1" />
          </div>

          {/* Diberikan kepada */}
          <div className="w-full pt-1">
            <span className="text-xs sm:text-sm text-slate-500 font-semibold uppercase tracking-wider block">
              Diberikan dengan bangga kepada:
            </span>
            <div className="my-1.5 py-1 px-4 inline-block border-b-2 border-slate-400 min-w-[240px] sm:min-w-[340px]">
              <span className="text-2xl sm:text-3.5xl lg:text-4xl font-black text-slate-900 tracking-tight">
                {result.studentName}
              </span>
            </div>
          </div>

          {/* Atas pencapaian materi */}
          <div className="max-w-2xl text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            Telah berhasil menyelesaikan secara tuntas seluruh rangkaian evaluasi berjenjang (Mudah, Sedang, Sulit, hingga Tantangan) pada materi pembelajaran matematika SMA:
            <div className="mt-1">
              <strong className="text-base sm:text-xl font-black text-[#1E3A8A] block">
                {result.topicTitle}
              </strong>
            </div>
          </div>

          {/* Statistik Skor Card */}
          <div className="w-full max-w-xl grid grid-cols-3 gap-2.5 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-white/90 border border-amber-200/80 shadow-md">
            {/* Total Soal */}
            <div className="p-2 sm:p-3 rounded-xl bg-slate-50 flex flex-col items-center text-center">
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase">Total Soal</span>
              <span className="text-lg sm:text-2xl font-black text-slate-800">
                {result.totalQuestions}
              </span>
              <span className="text-[10px] font-semibold text-slate-400">4 Tingkat</span>
            </div>

            {/* Benar & Salah */}
            <div className="p-2 sm:p-3 rounded-xl bg-slate-50 flex flex-col items-center text-center">
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase">Jawaban</span>
              <div className="flex items-center gap-1.5 text-xs sm:text-base font-black">
                <span className="text-emerald-600 flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-0.5 inline" /> {result.correctCount}
                </span>
                <span className="text-slate-400">/</span>
                <span className="text-rose-600 flex items-center">
                  <XCircle className="w-3.5 h-3.5 mr-0.5 inline" /> {result.wrongCount}
                </span>
              </div>
              <span className="text-[10px] font-semibold text-slate-400">Akurasi {result.percentage}%</span>
            </div>

            {/* Nilai Akhir */}
            <div className="p-2 sm:p-3 rounded-xl bg-amber-500/10 border border-amber-400/40 flex flex-col items-center text-center">
              <span className="text-[10px] sm:text-xs font-black text-amber-800 uppercase">Nilai Akhir</span>
              <span className="text-2xl sm:text-3.5xl font-black text-amber-600 font-mono">
                {result.score}
              </span>
              <span className="text-[10px] font-bold text-amber-700">Skala 100</span>
            </div>
          </div>

          {/* Pesan Apresiasi */}
          <p className="text-xs sm:text-sm font-semibold italic text-slate-600 max-w-xl px-2">
            “{appreciation}”
          </p>

          {/* Footer Sertifikat: Tanggal & Tanda Penghargaan Resmi */}
          <div className="w-full pt-4 border-t border-slate-300/80 flex items-center justify-between text-left text-xs text-slate-600 px-2 sm:px-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <span className="block text-[10px] uppercase font-bold text-slate-400">Tanggal Penyelesaian:</span>
                <span className="font-bold text-slate-800">{result.formattedDate}</span>
              </div>
            </div>

            {/* Seal / Badge Emas */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr ${badgeColor} text-slate-950 flex flex-col items-center justify-center shadow-md border-2 border-white font-black text-[9px] uppercase tracking-tighter`}>
                <Award className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                <span>Verified</span>
              </div>
              <div className="hidden sm:block text-right">
                <span className="text-[10px] uppercase font-black text-blue-900 block">LINTERA Media</span>
                <span className="text-[9px] text-slate-400 font-semibold">Media Belajar Interaktif</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer: Reset / Ulangi */}
      <div className="w-full max-w-4xl flex items-center justify-center gap-3 pt-2 print:hidden">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm border border-slate-700 transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Ulangi Latihan ({result.topicTitle})</span>
        </button>
      </div>

      {/* Global Print Styles (Only print the certificate) */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #certificate-printable-area, #certificate-printable-area * {
            visibility: visible;
          }
          #certificate-printable-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            border-width: 8px !important;
          }
        }
      `}</style>
    </div>
  );
}
