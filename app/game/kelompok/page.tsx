'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronLeft,
  Home,
  Play,
  Lock,
  Sparkles,
  Info,
  X,
  Volume2,
  Trophy,
  Users,
  Gift
} from 'lucide-react';
import { soundManager } from '@/lib/kotak-kejutan/sound';

export default function GameKelompokMenuPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleLockedCardClick = (gameTitle: string) => {
    soundManager.playSfx('lock');
    setToastMessage(`Permainan "${gameTitle}" sedang disiapkan untuk pembaruan berikutnya!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#FDE047] via-[#FACC15] to-[#EAB308] font-sans select-none flex flex-col justify-between overflow-x-hidden p-4 sm:p-6 lg:p-8">
      {/* =========================================================================
          BACKGROUND DEKORATIF (Kuning cerah ceria, awan, bintang, elemen matematika)
      ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Soft abstract cloud curves */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-white/30 blur-2xl" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-white/25 blur-2xl" />

        {/* Garis busur putus-putus di sisi kiri atas */}
        <svg className="absolute top-12 left-6 w-48 h-48 opacity-40" viewBox="0 0 100 100" fill="none">
          <path d="M10 90C10 45 45 10 90 10" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="6 6" />
        </svg>

        {/* Garis busur putus-putus di sisi kanan atas */}
        <svg className="absolute top-16 right-8 w-48 h-48 opacity-40" viewBox="0 0 100 100" fill="none">
          <path d="M10 10C55 10 90 45 90 90" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="6 6" />
        </svg>

        {/* Simbol Tambah (+) Halus di Kiri */}
        <div className="absolute top-44 left-10 sm:left-16 opacity-50">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
            <rect x="10" y="2" width="4" height="20" rx="2" fill="#FFFFFF" />
            <rect x="2" y="10" width="20" height="4" rx="2" fill="#FFFFFF" />
          </svg>
        </div>

        {/* Simbol Kali (×) Halus di Kanan */}
        <div className="absolute top-40 right-12 sm:right-24 opacity-50 rotate-12">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
            <rect x="10" y="2" width="4" height="20" rx="2" fill="#FFFFFF" />
            <rect x="2" y="10" width="20" height="4" rx="2" fill="#FFFFFF" />
          </svg>
        </div>

        {/* Simbol Bagi (÷) di Kanan Bawah */}
        <div className="absolute bottom-24 right-16 opacity-50">
          <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="6" r="3.5" fill="#FFFFFF" />
            <rect x="4" y="13.5" width="24" height="5" rx="2.5" fill="#FFFFFF" />
            <circle cx="16" cy="26" r="3.5" fill="#FFFFFF" />
          </svg>
        </div>

        {/* Bintang-bintang berkilau putih */}
        <div className="absolute top-24 left-1/4 opacity-70 animate-subtle-pulse">
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6.4-4.8-6.4 4.8 2.4-7.2-6-4.8h7.6z" />
          </svg>
        </div>
        <div className="absolute top-28 right-1/4 opacity-70 animate-subtle-pulse">
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6.4-4.8-6.4 4.8 2.4-7.2-6-4.8h7.6z" />
          </svg>
        </div>

        {/* Awan Minimalis di Kiri & Kanan Bawah */}
        <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-white/30 blur-xl" />
        <div className="absolute -bottom-12 -right-12 w-64 h-64 rounded-full bg-white/30 blur-xl" />
      </div>

      {/* =========================================================================
          HEADER: TOMBOL BACK (KIRI) | JUDUL UTAMA (TENGAH) | TOMBOL HOME (KANAN)
      ========================================================================= */}
      <header className="relative z-20 w-full max-w-6xl mx-auto flex items-center justify-between pt-1 sm:pt-2">
        {/* Tombol Back di Sudut Kiri Atas */}
        <Link
          href="/game"
          onClick={() => soundManager.playSfx('click')}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#2875FB] hover:bg-[#1C64E8] text-white flex items-center justify-center border-[3.5px] border-white shadow-lg shadow-blue-900/20 hover:scale-105 active:scale-95 transition-all duration-200 shrink-0 cursor-pointer"
          aria-label="Kembali ke Pemilihan Mode Game"
          title="Kembali ke Menu Game"
        >
          <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8 stroke-[3.5] -ml-0.5" />
        </Link>

        {/* Judul Bagian Tengah */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
          {/* Label Kecil: Game Matematika */}
          <div className="inline-block px-4 py-1 rounded-full bg-white/80 backdrop-blur-xs text-[#123B8A] font-black text-xs sm:text-sm tracking-wide shadow-xs mb-1.5 border border-white">
            Game Matematika
          </div>

          {/* Judul Utama: Game Kelompok dengan tipografi tebal bergaya 3D */}
          <div className="relative inline-flex items-center justify-center gap-2 sm:gap-3">
            {/* Aksen Percikan di Kiri */}
            <div className="flex flex-col items-end gap-1 pointer-events-none">
              <span className="w-4 sm:w-5 h-1.5 sm:h-2 bg-[#EA580C] rounded-full transform -rotate-35" />
              <span className="w-3 sm:w-4 h-1.5 sm:h-2 bg-[#EA580C] rounded-full transform -rotate-10" />
            </div>

            {/* Teks Judul */}
            <h1 className="text-3xl sm:text-4.5xl md:text-5xl font-black tracking-tight leading-none drop-shadow-sm">
              <span className="text-[#123B8A]">Game </span>
              <span className="text-[#EA580C]">Kelompok</span>
            </h1>

            {/* Aksen Percikan di Kanan */}
            <div className="flex flex-col items-start gap-1 pointer-events-none">
              <span className="w-4 sm:w-5 h-1.5 sm:h-2 bg-[#EA580C] rounded-full transform rotate-35" />
              <span className="w-3 sm:w-4 h-1.5 sm:h-2 bg-[#EA580C] rounded-full transform rotate-10" />
            </div>
          </div>

          {/* Slogan */}
          <p className="text-xs sm:text-sm md:text-base font-extrabold text-[#78350F] mt-1.5 drop-shadow-xs">
            Belajar bersama, berstrategi, dan raih kemenangan!
          </p>
        </div>

        {/* Tombol Home di Sudut Kanan Atas */}
        <Link
          href="/dashboard"
          onClick={() => soundManager.playSfx('click')}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#2875FB] hover:bg-[#1C64E8] text-white flex items-center justify-center border-[3.5px] border-white shadow-lg shadow-blue-900/20 hover:scale-105 active:scale-95 transition-all duration-200 shrink-0 cursor-pointer"
          aria-label="Kembali ke Beranda Dashboard LINTERA"
          title="Kembali ke Beranda"
        >
          <Home className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.8]" />
        </Link>
      </header>

      {/* =========================================================================
          AREA TIGA KARTU PERMAINAN (HORIZONTAL PADA DESKTOP)
      ========================================================================= */}
      <main className="relative z-20 w-full max-w-5xl mx-auto my-auto py-5 sm:py-7">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 items-stretch">
          {/* =====================================================================
              KARTU 1: KOTAK KEJUTAN (Aktif & Dapat Dimainkan)
          ===================================================================== */}
          <div className="group relative bg-white rounded-[32px] sm:rounded-[36px] p-3.5 sm:p-4 pb-4 sm:pb-5 flex flex-col justify-between border-[5px] sm:border-[6px] border-white shadow-xl shadow-amber-900/20 hover:shadow-2xl hover:shadow-amber-900/30 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01]">
            {/* Top Box Ilustrasi Game Kotak Kejutan */}
            <div className="relative w-full aspect-square rounded-[22px] sm:rounded-[26px] overflow-hidden bg-gradient-to-b from-[#1E3A8A] to-[#0F172A] shadow-inner border border-blue-900/40">
              <Image
                src="/assets/kotak-kejutan.png"
                alt="Game Kotak Kejutan Matematika Kelompok"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Badge Aktif */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-400 text-[#123B8A] font-black text-[11px] shadow-md border border-white flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5" />
                <span>Panggung Kuis</span>
              </div>
            </div>

            {/* Bagian Teks & Deskripsi */}
            <div className="text-center my-3 sm:my-3.5">
              <h2 className="text-2xl sm:text-[26px] font-black text-[#123B8A] leading-tight mb-1">
                Kotak Kejutan
              </h2>
              <p className="text-xs sm:text-[13px] font-bold text-slate-600 leading-snug px-1">
                Pilih kotak, pecahkan soal matematika, dan hadapi kejutan poin!
              </p>
            </div>

            {/* Tombol "Mainkan" dengan Ikon Play */}
            <Link
              href="/game/kelompok/kotak-kejutan"
              onClick={() => soundManager.playSfx('select')}
              className="w-full py-3 sm:py-3.5 px-5 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white flex items-center justify-center gap-3 shadow-[0_5px_0_#9A3412] hover:shadow-[0_6px_0_#9A3412] active:translate-y-1 active:shadow-[0_1px_0_#9A3412] transition-all duration-150 cursor-pointer text-center group/btn"
            >
              <span className="text-lg sm:text-xl font-black tracking-wide pl-2">
                Mainkan
              </span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs group-hover/btn:scale-110 transition-transform">
                <Play className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#EA580C] fill-[#EA580C] ml-0.5" />
              </div>
            </Link>
          </div>

          {/* =====================================================================
              KARTU 2: GAME BALAPAN (Aktif & Dapat Dimainkan)
          ===================================================================== */}
          <div className="group relative bg-white rounded-[32px] sm:rounded-[36px] p-3.5 sm:p-4 pb-4 sm:pb-5 flex flex-col justify-between border-[5px] sm:border-[6px] border-white shadow-xl shadow-amber-900/20 hover:shadow-2xl hover:shadow-amber-900/30 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01]">
            {/* Top Box Ilustrasi Game Balapan */}
            <div className="relative w-full aspect-square rounded-[22px] sm:rounded-[26px] overflow-hidden bg-gradient-to-b from-[#0284C7] to-[#0369A1] shadow-inner border border-sky-900/40">
              <Image
                src="/assets/game-balapan/cover-game-balapan.png"
                alt="Game Balapan Gokart Matematika Kelompok"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Badge Arena Balap */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-400 text-[#123B8A] font-black text-[11px] shadow-md border border-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sirkuit Balap</span>
              </div>
            </div>

            {/* Bagian Teks & Deskripsi */}
            <div className="text-center my-3 sm:my-3.5">
              <h2 className="text-2xl sm:text-[26px] font-black text-[#123B8A] leading-tight mb-1">
                Game Balapan
              </h2>
              <p className="text-xs sm:text-[13px] font-bold text-slate-600 leading-snug px-1">
                Pacu gokartmu, pecahkan soal matematika, dan jadilah yang pertama mencapai garis finis!
              </p>
            </div>

            {/* Tombol "Mainkan" dengan Ikon Play */}
            <Link
              href="/game/kelompok/game-balapan"
              onClick={() => soundManager.playSfx('select')}
              className="w-full py-3 sm:py-3.5 px-5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white flex items-center justify-center gap-3 shadow-[0_5px_0_#1E40AF] hover:shadow-[0_6px_0_#1E40AF] active:translate-y-1 active:shadow-[0_1px_0_#1E40AF] transition-all duration-150 cursor-pointer text-center group/btn"
            >
              <span className="text-lg sm:text-xl font-black tracking-wide pl-2">
                Mainkan
              </span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs group-hover/btn:scale-110 transition-transform">
                <Play className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#2563EB] fill-[#2563EB] ml-0.5" />
              </div>
            </Link>
          </div>

          {/* =====================================================================
              KARTU 3: GAME KELOMPOK 3 (Terkunci - Segera Hadir)
          ===================================================================== */}
          <div
            onClick={() => handleLockedCardClick('Game Kelompok 3')}
            className="group relative rounded-[32px] sm:rounded-[36px] p-3.5 sm:p-4 pb-4 sm:pb-5 flex flex-col justify-between border-[5px] sm:border-[6px] border-white shadow-lg shadow-amber-900/10 cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 bg-[#FDE68A]/80"
          >
            {/* Area Ilustrasi Siluet Lanskap Fantasi Lembut */}
            <div className="relative w-full aspect-square rounded-[22px] sm:rounded-[26px] overflow-hidden bg-gradient-to-b from-[#FCD34D] to-[#F59E0B] flex flex-col items-center justify-center p-4">
              <div className="absolute inset-0 opacity-40 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
                  <path d="M-20 200 C30 160 80 180 130 150 C170 130 200 170 230 200 Z" fill="#D97706" />
                  <path d="M-10 200 C50 170 120 185 210 200 Z" fill="#B45309" />
                  <rect x="135" y="90" width="30" height="60" rx="3" fill="#D97706" />
                  <polygon points="135,90 150,65 165,90" fill="#D97706" />
                  <circle cx="35" cy="180" r="18" fill="#92400E" />
                  <circle cx="65" cy="185" r="14" fill="#92400E" />
                  <circle cx="175" cy="182" r="16" fill="#92400E" />
                </svg>
              </div>

              {/* Ikon Gembok Emas */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center justify-center gap-6 pointer-events-none w-28">
                  <span className="w-1.5 h-4 bg-[#FDE047] rounded-full transform -rotate-45" />
                  <span className="w-1.5 h-5 bg-[#FDE047] rounded-full" />
                  <span className="w-1.5 h-4 bg-[#FDE047] rounded-full transform rotate-45" />
                </div>
                <div className="w-16 h-18 sm:w-20 sm:h-22 flex flex-col items-center justify-center filter drop-shadow-[0_6px_10px_rgba(0,0,0,0.18)]">
                  <svg className="w-16 h-20 sm:w-20 sm:h-24" viewBox="0 0 64 74" fill="none">
                    <path
                      d="M20 32V20C20 13.37 25.37 8 32 8C38.63 8 44 13.37 44 20V32"
                      stroke="#1E293B"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    <rect x="10" y="28" width="44" height="38" rx="10" fill="#FBBF24" stroke="#1E293B" strokeWidth="4" />
                    <circle cx="32" cy="43" r="4" fill="#1E293B" />
                    <polygon points="30,43 34,43 35,55 29,55" fill="#1E293B" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Bagian Teks */}
            <div className="text-center my-3 sm:my-3.5">
              <h2 className="text-2xl sm:text-[26px] font-black text-[#78350F]/80 leading-tight mb-1">
                Game Kelompok 3
              </h2>
              <p className="text-xs sm:text-[13px] font-bold text-slate-800/80 leading-snug px-1">
                Tantangan baru untuk menguji kekompakan tim.
              </p>
            </div>

            {/* Tombol Segera Hadir */}
            <button
              type="button"
              className="w-full py-3 sm:py-3.5 px-5 rounded-full bg-[#B45309]/70 text-white flex items-center justify-center gap-2.5 shadow-md cursor-pointer border border-white/50"
            >
              <Lock className="w-5 h-5 stroke-[2.5]" />
              <span className="text-base sm:text-lg font-black tracking-wide">
                Segera Hadir
              </span>
            </button>
          </div>
        </div>
      </main>

      {/* =========================================================================
          TOAST MESSAGE (Saat mengklik kartu yang terkunci)
      ========================================================================= */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#123B8A] text-white px-6 py-3 rounded-full shadow-2xl border-2 border-white/80 font-bold text-xs sm:text-sm flex items-center gap-3 animate-bounce">
          <Info className="w-5 h-5 text-amber-300 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white ml-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Footer Info */}
      <footer className="relative z-20 text-center text-[#78350F]/80 text-xs font-bold py-2">
        LINTERA • Lingkaran Interaktif untuk Matematika
      </footer>
    </div>
  );
}
