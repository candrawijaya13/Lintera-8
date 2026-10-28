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
  ArrowRight
} from 'lucide-react';

export default function ModeIndividuPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sound effect helper
  const playSound = (type: 'click' | 'lock' | 'start') => {
    if (typeof window === 'undefined') return;
    try {
      const audioCtx = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      const now = audioCtx.currentTime;
      if (type === 'start') {
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
        osc.frequency.setValueAtTime(1046.5, now + 0.3); // C6
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      } else if (type === 'lock') {
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.setValueAtTime(190, now + 0.1);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else {
        osc.frequency.setValueAtTime(540, now);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      }
    } catch {
      // Audio not supported
    }
  };

  const handleLockedCardClick = (gameTitle: string) => {
    playSound('lock');
    setToastMessage(`Permainan "${gameTitle}" sedang dalam tahap pengembangan dan akan segera hadir!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#FFB6D0] font-sans select-none flex flex-col justify-between overflow-x-hidden p-4 sm:p-6 lg:p-8">
      
      {/* =========================================================================
          BACKGROUND DEKORATIF (Flat Pastel Pink, Bentuk Geometris, Garis Lengkung)
      ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        
        {/* Soft abstract cloud curves */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-white/20 blur-2xl" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-white/20 blur-2xl" />

        {/* Garis busur putus-putus di sisi kiri atas */}
        <svg className="absolute top-12 left-6 w-48 h-48 opacity-40" viewBox="0 0 100 100" fill="none">
          <path d="M10 90C10 45 45 10 90 10" stroke="#FFFFFF" strokeWidth="2.5" strokeDasharray="5 5" />
        </svg>

        {/* Garis busur putus-putus di sisi kanan atas */}
        <svg className="absolute top-16 right-8 w-48 h-48 opacity-40" viewBox="0 0 100 100" fill="none">
          <path d="M10 10C55 10 90 45 90 90" stroke="#FFFFFF" strokeWidth="2.5" strokeDasharray="5 5" />
        </svg>

        {/* Simbol Tambah (+) Halus di Kiri */}
        <div className="absolute top-44 left-10 sm:left-16 opacity-40">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
            <rect x="10" y="2" width="4" height="20" rx="2" fill="#FFFFFF" />
            <rect x="2" y="10" width="20" height="4" rx="2" fill="#FFFFFF" />
          </svg>
        </div>

        {/* Simbol Tambah (+) Halus di Kanan */}
        <div className="absolute top-40 right-12 sm:right-24 opacity-40">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
            <rect x="10" y="2" width="4" height="20" rx="2" fill="#FFFFFF" />
            <rect x="2" y="10" width="20" height="4" rx="2" fill="#FFFFFF" />
          </svg>
        </div>

        {/* Lingkaran Transparan Lembut di Sudut-Sudut */}
        <div className="absolute top-28 left-1/4 w-12 h-12 rounded-full border-2 border-white/40" />
        <div className="absolute top-32 right-1/4 w-10 h-10 rounded-full border-2 border-white/40" />
        <div className="absolute bottom-28 left-8 w-6 h-6 rounded-full bg-white/40" />
        <div className="absolute bottom-24 right-10 w-7 h-7 rounded-full bg-white/40" />

        {/* Aksen Bunga / Kelopak Lembut di Sudut Kiri Bawah */}
        <div className="absolute -bottom-10 -left-10 w-44 h-44 sm:w-56 sm:h-56 opacity-60">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <ellipse cx="30" cy="80" rx="28" ry="18" fill="#FFAEC8" transform="rotate(-30 30 80)" />
            <ellipse cx="60" cy="85" rx="26" ry="16" fill="#FFAEC8" transform="rotate(20 60 85)" />
            <ellipse cx="40" cy="65" rx="24" ry="15" fill="#FF88B4" transform="rotate(-10 40 65)" />
          </svg>
        </div>

        {/* Aksen Bunga / Kelopak Lembut di Sudut Kanan Bawah */}
        <div className="absolute -bottom-10 -right-10 w-44 h-44 sm:w-56 sm:h-56 opacity-60">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <ellipse cx="70" cy="80" rx="28" ry="18" fill="#FFAEC8" transform="rotate(30 70 80)" />
            <ellipse cx="40" cy="85" rx="26" ry="16" fill="#FFAEC8" transform="rotate(-20 40 85)" />
            <ellipse cx="60" cy="65" rx="24" ry="15" fill="#FF88B4" transform="rotate(10 60 65)" />
          </svg>
        </div>

      </div>

      {/* =========================================================================
          HEADER: TOMBOL BACK (KIRI) | JUDUL UTAMA (TENGAH) | TOMBOL HOME (KANAN)
      ========================================================================= */}
      <header className="relative z-20 w-full max-w-6xl mx-auto flex items-center justify-between pt-1 sm:pt-2">
        
        {/* Tombol Back di Sudut Kiri Atas */}
        <Link
          href="/game"
          onClick={() => playSound('click')}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F43F5E] hover:bg-[#E11D48] text-white flex items-center justify-center border-[3.5px] border-white shadow-lg shadow-pink-900/20 hover:scale-105 active:scale-95 transition-all duration-200 shrink-0"
          aria-label="Kembali ke Pemilihan Mode Game"
          title="Kembali ke Menu Game"
        >
          <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8 stroke-[3.5] -ml-0.5" />
        </Link>

        {/* Judul Bagian Tengah */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
          
          {/* Label Kecil: Game Matematika */}
          <div className="inline-block px-4 py-1 rounded-full bg-white/70 backdrop-blur-xs text-[#9F1239] font-black text-xs sm:text-sm tracking-wide shadow-xs mb-1.5 border border-white/80">
            Game Matematika
          </div>

          {/* Judul Utama: Mode Individu (dengan aksen percikan pink) */}
          <div className="relative inline-flex items-center justify-center gap-2 sm:gap-3">
            
            {/* Aksen Percikan Pink di Kiri */}
            <div className="flex flex-col items-end gap-1 pointer-events-none">
              <span className="w-4 sm:w-5 h-1.5 sm:h-2 bg-[#F43F5E] rounded-full transform -rotate-35" />
              <span className="w-3 sm:w-4 h-1.5 sm:h-2 bg-[#F43F5E] rounded-full transform -rotate-10" />
            </div>

            {/* Teks Judul */}
            <h1 className="text-3xl sm:text-4.5xl md:text-5xl font-black tracking-tight leading-none drop-shadow-xs">
              <span className="text-[#123B8A]">Mode </span>
              <span className="text-[#F43F5E]">Individu</span>
            </h1>

            {/* Aksen Percikan Pink di Kanan */}
            <div className="flex flex-col items-start gap-1 pointer-events-none">
              <span className="w-4 sm:w-5 h-1.5 sm:h-2 bg-[#F43F5E] rounded-full transform rotate-35" />
              <span className="w-3 sm:w-4 h-1.5 sm:h-2 bg-[#F43F5E] rounded-full transform rotate-10" />
            </div>

          </div>

          {/* Subjudul */}
          <p className="text-xs sm:text-sm md:text-base font-extrabold text-[#1E293B] mt-1.5 drop-shadow-xs">
            Pilih permainan dan tantang kemampuanmu!
          </p>

        </div>

        {/* Tombol Home di Sudut Kanan Atas */}
        <Link
          href="/dashboard"
          onClick={() => playSound('click')}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F43F5E] hover:bg-[#E11D48] text-white flex items-center justify-center border-[3.5px] border-white shadow-lg shadow-pink-900/20 hover:scale-105 active:scale-95 transition-all duration-200 shrink-0"
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
              KARTU 1: SUPER LUNA (Aktif & Dapat Dimainkan)
          ===================================================================== */}
          <div
            className="group relative bg-white rounded-[32px] sm:rounded-[36px] p-3.5 sm:p-4 pb-4 sm:pb-5 flex flex-col justify-between border-[5px] sm:border-[6px] border-white shadow-xl shadow-pink-900/15 hover:shadow-2xl hover:shadow-pink-900/25 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01]"
          >
            {/* Top Box Ilustrasi Game Super Luna */}
            <div className="relative w-full aspect-square rounded-[22px] sm:rounded-[26px] overflow-hidden bg-sky-200 shadow-inner border border-sky-100">
              <Image
                src="/assets/super-luna.png"
                alt="Game Super Luna Platformer Matematika"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Detail Informasi Game */}
            <div className="text-center my-3 sm:my-3.5 px-2">
              
              {/* Judul: SUPER LUNA bergaya 3D Arcade */}
              <div className="flex items-center justify-center gap-1.5 mb-1.5">
                {/* Sparkle yellow left */}
                <span className="w-2 h-4 bg-[#FBBF24] rounded-full transform -rotate-25 pointer-events-none" />
                
                <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-none">
                  <span
                    className="text-white"
                    style={{
                      textShadow: '0 2px 0 #1E3A8A, 0 3px 6px rgba(30,58,138,0.4)',
                      WebkitTextStroke: '1px #1E3A8A'
                    }}
                  >
                    SUPER{' '}
                  </span>
                  <span
                    className="text-[#FBBF24]"
                    style={{
                      textShadow: '0 2px 0 #92400E, 0 3px 6px rgba(146,64,14,0.4)',
                      WebkitTextStroke: '1px #92400E'
                    }}
                  >
                    LUNA
                  </span>
                </h2>

                {/* Sparkle yellow right */}
                <span className="w-2 h-4 bg-[#FBBF24] rounded-full transform rotate-25 pointer-events-none" />
              </div>

              {/* Deskripsi */}
              <p className="text-[12px] sm:text-[13px] font-bold text-slate-700 leading-snug">
                Petualangan seru bersama Luna dengan tantangan matematika!
              </p>
            </div>

            {/* Tombol "Mainkan" */}
            <Link
              href="/game/super-luna"
              onClick={() => playSound('start')}
              className="w-full py-3 sm:py-3.5 px-5 rounded-full bg-[#F43F5E] hover:bg-[#FF2E63] text-white flex items-center justify-center gap-3 shadow-[0_5px_0_#BE123C] hover:shadow-[0_6px_0_#BE123C] active:translate-y-1 active:shadow-[0_1px_0_#BE123C] transition-all duration-150 cursor-pointer text-center group/btn"
            >
              <span className="text-lg sm:text-xl font-black tracking-wide pl-2">
                Mainkan
              </span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs group-hover/btn:scale-110 transition-transform">
                <Play className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#F43F5E] fill-[#F43F5E] ml-0.5" />
              </div>
            </Link>

          </div>

          {/* =====================================================================
              KARTU 2: SEGERA HADIR (Biru Pastel / Lavender - Terkunci)
          ===================================================================== */}
          <div
            onClick={() => handleLockedCardClick('Misi Kastil Lingkaran')}
            className="group relative rounded-[32px] sm:rounded-[36px] p-3.5 sm:p-4 pb-4 sm:pb-5 flex flex-col justify-between border-[5px] sm:border-[6px] border-white shadow-lg shadow-pink-900/10 cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 bg-[#AEC2F2]"
          >
            {/* Area Ilustrasi Siluet Kastil & Hills */}
            <div className="relative w-full aspect-square rounded-[22px] sm:rounded-[26px] overflow-hidden bg-gradient-to-b from-[#B4C5F4] to-[#99B2EC] flex flex-col items-center justify-center p-4">
              
              {/* Siluet Kastil Vektor Latar Belakang */}
              <div className="absolute inset-0 opacity-40 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
                  {/* Bukit / Hills */}
                  <path d="M-20 200 C30 160 80 180 130 150 C170 130 200 170 230 200 Z" fill="#6B85CC" />
                  <path d="M-10 200 C50 170 120 185 210 200 Z" fill="#5A74BC" />
                  {/* Siluet Kastil / Menara di Kanan */}
                  <rect x="135" y="90" width="30" height="60" rx="3" fill="#6B85CC" />
                  <polygon points="135,90 150,65 165,90" fill="#6B85CC" />
                  <rect x="148" y="55" width="2" height="12" fill="#5A74BC" />
                  <polygon points="150,55 160,59 150,63" fill="#5A74BC" />
                  {/* Pepohonan di Bawah */}
                  <circle cx="35" cy="180" r="18" fill="#526EBA" />
                  <circle cx="65" cy="185" r="14" fill="#526EBA" />
                  <circle cx="175" cy="182" r="16" fill="#526EBA" />
                </svg>
              </div>

              {/* Ikon Gembok Emas Menyala dengan Sinar Kuning */}
              <div className="relative z-10 flex flex-col items-center">
                
                {/* Sinar Kuning / Sparks */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center justify-center gap-6 pointer-events-none w-28">
                  <span className="w-1.5 h-4 bg-[#FDE047] rounded-full transform -rotate-45" />
                  <span className="w-1.5 h-5 bg-[#FDE047] rounded-full" />
                  <span className="w-1.5 h-4 bg-[#FDE047] rounded-full transform rotate-45" />
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 -left-4 pointer-events-none">
                  <span className="w-4 h-1.5 bg-[#FDE047] rounded-full block" />
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 -right-4 pointer-events-none">
                  <span className="w-4 h-1.5 bg-[#FDE047] rounded-full block" />
                </div>

                {/* Gembok Emas */}
                <div className="w-16 h-18 sm:w-20 sm:h-22 flex flex-col items-center justify-center filter drop-shadow-[0_6px_10px_rgba(0,0,0,0.18)]">
                  <svg className="w-16 h-20 sm:w-20 sm:h-24" viewBox="0 0 64 74" fill="none">
                    {/* Shackle Navy Tebal */}
                    <path
                      d="M20 32V20C20 13.37 25.37 8 32 8C38.63 8 44 13.37 44 20V32"
                      stroke="#1E293B"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    {/* Lock Body Kuning Keemasan */}
                    <rect x="10" y="28" width="44" height="38" rx="10" fill="#FBBF24" stroke="#1E293B" strokeWidth="4" />
                    {/* Keyhole */}
                    <circle cx="32" cy="43" r="4" fill="#1E293B" />
                    <polygon points="30,43 34,43 35,55 29,55" fill="#1E293B" />
                  </svg>
                </div>

              </div>

            </div>

            {/* Spacer tengah agar kartu seimbang */}
            <div className="my-3 sm:my-3.5 h-10 flex items-center justify-center">
              <span className="text-xs font-bold text-blue-900/70">
                Mode Petualangan Baru
              </span>
            </div>

            {/* Banner Melengkung: Segera Hadir */}
            <div className="w-full py-3 sm:py-3.5 px-5 rounded-full bg-[#4C62A8] text-white flex items-center justify-center shadow-[0_4px_0_#33457B] transition-transform group-hover:scale-102">
              <span className="text-base sm:text-lg font-black tracking-wide">
                Segera Hadir
              </span>
            </div>

          </div>

          {/* =====================================================================
              KARTU 3: SEGERA HADIR (Pink Pastel - Terkunci)
          ===================================================================== */}
          <div
            onClick={() => handleLockedCardClick('Tantangan Puncak Sudut')}
            className="group relative rounded-[32px] sm:rounded-[36px] p-3.5 sm:p-4 pb-4 sm:pb-5 flex flex-col justify-between border-[5px] sm:border-[6px] border-white shadow-lg shadow-pink-900/10 cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 bg-[#F5A9C0]"
          >
            {/* Area Ilustrasi Siluet Pegunungan & Bendera */}
            <div className="relative w-full aspect-square rounded-[22px] sm:rounded-[26px] overflow-hidden bg-gradient-to-b from-[#F7AFC5] to-[#EB9AB3] flex flex-col items-center justify-center p-4">
              
              {/* Siluet Pegunungan Vektor Latar Belakang */}
              <div className="absolute inset-0 opacity-40 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
                  {/* Gunung & Bukit */}
                  <polygon points="100,55 40,160 160,160" fill="#B35277" />
                  <polygon points="45,95 -10,180 100,180" fill="#A04468" />
                  <polygon points="160,105 105,185 215,185" fill="#A04468" />
                  {/* Bendera di Puncak Gunung */}
                  <rect x="99" y="42" width="2" height="15" fill="#882C50" />
                  <polygon points="101,43 114,48 101,53" fill="#882C50" />
                  {/* Pepohonan Bawah */}
                  <circle cx="35" cy="180" r="16" fill="#8E3155" />
                  <circle cx="65" cy="185" r="14" fill="#8E3155" />
                  <circle cx="165" cy="182" r="16" fill="#8E3155" />
                </svg>
              </div>

              {/* Ikon Gembok Emas Menyala dengan Sinar Kuning */}
              <div className="relative z-10 flex flex-col items-center">
                
                {/* Sinar Kuning / Sparks */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center justify-center gap-6 pointer-events-none w-28">
                  <span className="w-1.5 h-4 bg-[#FDE047] rounded-full transform -rotate-45" />
                  <span className="w-1.5 h-5 bg-[#FDE047] rounded-full" />
                  <span className="w-1.5 h-4 bg-[#FDE047] rounded-full transform rotate-45" />
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 -left-4 pointer-events-none">
                  <span className="w-4 h-1.5 bg-[#FDE047] rounded-full block" />
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 -right-4 pointer-events-none">
                  <span className="w-4 h-1.5 bg-[#FDE047] rounded-full block" />
                </div>

                {/* Gembok Emas */}
                <div className="w-16 h-18 sm:w-20 sm:h-22 flex flex-col items-center justify-center filter drop-shadow-[0_6px_10px_rgba(0,0,0,0.18)]">
                  <svg className="w-16 h-20 sm:w-20 sm:h-24" viewBox="0 0 64 74" fill="none">
                    {/* Shackle Navy Tebal */}
                    <path
                      d="M20 32V20C20 13.37 25.37 8 32 8C38.63 8 44 13.37 44 20V32"
                      stroke="#1E293B"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    {/* Lock Body Kuning Keemasan */}
                    <rect x="10" y="28" width="44" height="38" rx="10" fill="#FBBF24" stroke="#1E293B" strokeWidth="4" />
                    {/* Keyhole */}
                    <circle cx="32" cy="43" r="4" fill="#1E293B" />
                    <polygon points="30,43 34,43 35,55 29,55" fill="#1E293B" />
                  </svg>
                </div>

              </div>

            </div>

            {/* Spacer tengah agar kartu seimbang */}
            <div className="my-3 sm:my-3.5 h-10 flex items-center justify-center">
              <span className="text-xs font-bold text-pink-950/70">
                Mode Tantangan Khusus
              </span>
            </div>

            {/* Banner Melengkung: Segera Hadir */}
            <div className="w-full py-3 sm:py-3.5 px-5 rounded-full bg-[#963F63] text-white flex items-center justify-center shadow-[0_4px_0_#6D2442] transition-transform group-hover:scale-102">
              <span className="text-base sm:text-lg font-black tracking-wide">
                Segera Hadir
              </span>
            </div>

          </div>

        </div>
      </main>

      {/* =========================================================================
          FOOTER / BOTTOM BRANDING
      ========================================================================= */}
      <footer className="relative z-20 w-full max-w-6xl mx-auto flex items-center justify-between pt-2 pb-1 text-[#1E293B]/70 text-xs font-bold">
        <span>LINTERA • Lingkaran Interaktif untuk Matematika</span>
        <span>Game Matematika SMA</span>
      </footer>

      {/* =========================================================================
          TOAST NOTIFIKASI KARTU SEGERA HADIR
      ========================================================================= */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1E293B] text-white px-5 py-3 rounded-2xl shadow-2xl border-2 border-white/20 flex items-center gap-3 animate-bounce">
          <Lock className="w-5 h-5 text-amber-400 shrink-0" />
          <p className="text-xs sm:text-sm font-bold">{toastMessage}</p>
          <button
            onClick={() => setToastMessage(null)}
            className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
}
