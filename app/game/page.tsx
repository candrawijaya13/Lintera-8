'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronLeft,
  User,
  Users,
  Gamepad2,
  Sparkles,
  Trophy,
  Clock,
  Zap,
  Flame,
  X
} from 'lucide-react';

export default function GameMatematikaPage() {
  const [activeModal, setActiveModal] = useState<'individu' | 'kelompok' | null>(null);

  // Sound effect helper
  const playSound = (type: 'click' | 'select' | 'pop') => {
    if (typeof window === 'undefined') return;
    try {
      const audioCtx = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      const now = audioCtx.currentTime;
      if (type === 'select') {
        osc.frequency.setValueAtTime(440, now); // A4
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.setValueAtTime(880, now + 0.2); // A5
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'pop') {
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.setValueAtTime(880, now + 0.08); // A5
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else {
        osc.frequency.setValueAtTime(520, now);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      }
    } catch {
      // Audio not supported or blocked
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#FF78AE] font-sans select-none flex flex-col justify-between overflow-x-hidden p-4 sm:p-6 lg:p-8">
      
      {/* =========================================================================
          ELEMEN DEKORATIF MATEMATIKA BACKGROUND (Sesuai Referensi image_50628797.png)
      ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        
        {/* Simbol Tambah (+) Merah Muda Tua di Kiri Atas */}
        <div className="absolute top-28 left-8 sm:left-14 opacity-75">
          <svg className="w-10 h-10 sm:w-14 sm:h-14" viewBox="0 0 40 40" fill="none">
            <rect x="15" y="4" width="10" height="32" rx="5" fill="#F34F91" />
            <rect x="4" y="15" width="32" height="10" rx="5" fill="#F34F91" />
          </svg>
        </div>

        {/* Simbol Kali (×) Putih / Kuning di Kanan Atas */}
        <div className="absolute top-36 right-10 sm:right-20 opacity-80 transform rotate-12">
          <svg className="w-8 h-8 sm:w-11 sm:h-11" viewBox="0 0 36 36" fill="none">
            <rect x="14" y="2" width="8" height="32" rx="4" fill="#FFE66D" />
            <rect x="2" y="14" width="32" height="8" rx="4" fill="#FFE66D" />
          </svg>
        </div>

        {/* Segitiga Putih Tebal di Kanan */}
        <div className="absolute top-44 right-6 sm:right-12 opacity-60">
          <svg className="w-9 h-9 sm:w-12 sm:h-12" viewBox="0 0 40 40" fill="none">
            <path
              d="M20 6L35 32H5L20 6Z"
              stroke="#FFFFFF"
              strokeWidth="5"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Simbol Bagi (÷) Lembut di Kiri Bawah */}
        <div className="absolute bottom-24 left-10 opacity-70">
          <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="6" r="3.5" fill="#FFFFFF" />
            <rect x="4" y="13.5" width="24" height="5" rx="2.5" fill="#FFFFFF" />
            <circle cx="16" cy="26" r="3.5" fill="#FFFFFF" />
          </svg>
        </div>

        {/* Simbol Tambah Lembut di Kanan Bawah */}
        <div className="absolute bottom-28 right-8 sm:right-16 opacity-60">
          <svg className="w-9 h-9 sm:w-12 sm:h-12" viewBox="0 0 36 36" fill="none">
            <rect x="14" y="3" width="8" height="30" rx="4" fill="#FFC4DA" />
            <rect x="3" y="14" width="30" height="8" rx="4" fill="#FFC4DA" />
          </svg>
        </div>

        {/* Lingkaran & Bintik Cahaya Putih */}
        <div className="absolute top-16 right-1/4 w-4 h-4 rounded-full bg-white/70" />
        <div className="absolute top-1/2 left-6 w-3 h-3 rounded-full bg-white/60" />
        <div className="absolute bottom-16 left-1/3 w-4 h-4 rounded-full bg-[#FFE66D]/70" />
        <div className="absolute top-12 left-1/3 w-3 h-3 rounded-full bg-white/50" />
        <div className="absolute top-2/3 right-1/4 w-3.5 h-3.5 rounded-full bg-white/60" />

        {/* Garis Busur Putus-Putus Halus di Kiri */}
        <svg className="absolute top-1/2 -left-4 w-44 h-44 opacity-35" viewBox="0 0 100 100" fill="none">
          <circle cx="20" cy="50" r="45" stroke="#FFFFFF" strokeWidth="2.5" strokeDasharray="6 6" />
        </svg>

        {/* Bentuk Awan / Aksen Lengkung Halus di Sudut Bawah */}
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[#F34F91]/20 blur-2xl" />
        <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-[#F34F91]/20 blur-2xl" />
      </div>

      {/* =========================================================================
          HEADER HALAMAN (Tombol Kembali, Ikon Gamepad, Judul GAME MATEMATIKA, Deskripsi)
      ========================================================================= */}
      <header className="relative z-20 w-full max-w-6xl mx-auto flex flex-col items-center pt-2 sm:pt-4">
        
        {/* Tombol Kembali di Kiri Atas (Absolute pada Desktop/Tablet) */}
        <div className="w-full flex items-center justify-between sm:justify-start">
          <Link
            href="/dashboard"
            onClick={() => playSound('click')}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F34F91] hover:bg-[#E03A7F] text-white flex items-center justify-center border-[3.5px] border-white shadow-lg shadow-pink-950/20 hover:scale-105 active:scale-95 transition-all duration-200"
            aria-label="Kembali ke Dashboard LINTERA"
            title="Kembali ke Dashboard"
          >
            <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8 stroke-[3.5] -ml-0.5" />
          </Link>

          {/* Placeholder di kanan untuk keseimbangan mobile */}
          <div className="w-12 sm:hidden" />
        </div>

        {/* Bagian Judul Utama & Ikon Gamepad (Tengah) */}
        <div className="text-center mt-1 sm:-mt-8 flex flex-col items-center">
          
          {/* Ikon Gamepad + Teks Judul dalam satu baris */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            
            {/* Flat-Cartoon Game Controller Icon */}
            <div className="w-12 h-10 sm:w-16 sm:h-13 relative filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)] flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 64 48" fill="none">
                {/* Controller Body */}
                <path
                  d="M14 12C9 12 6 17 6 24C6 34 11 42 18 42C23 42 27 36 30 32H34C37 36 41 42 46 42C53 42 58 34 58 24C58 17 55 12 50 12C42 12 37 16 32 16C27 16 22 12 14 12Z"
                  fill="#6366F1"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                />
                {/* D-Pad Buttons */}
                <rect x="15" y="21" width="4" height="12" rx="1.5" fill="#38BDF8" />
                <rect x="11" y="25" width="12" height="4" rx="1.5" fill="#38BDF8" />
                {/* Action Buttons */}
                <circle cx="48" cy="22" r="2.3" fill="#EF4444" />
                <circle cx="52.5" cy="27" r="2.3" fill="#FACC15" />
                <circle cx="43.5" cy="27" r="2.3" fill="#10B981" />
                <circle cx="48" cy="32" r="2.3" fill="#EC4899" />
              </svg>
            </div>

            {/* Judul: GAME MATEMATIKA */}
            <h1 className="text-3xl sm:text-4.5xl md:text-5.5xl lg:text-6xl font-black tracking-tight leading-none">
              <span
                className="text-white drop-shadow-[0_4px_0_#C72A66]"
                style={{
                  textShadow: '0 4px 0 #C72A66, 0 6px 12px rgba(199,42,102,0.4)'
                }}
              >
                GAME{' '}
              </span>
              <span
                className="text-[#FFE66D]"
                style={{
                  textShadow: '0 4px 0 #D97706, 0 6px 12px rgba(217,119,6,0.35)'
                }}
              >
                MATEMATIKA
              </span>
            </h1>

          </div>

          {/* Deskripsi di Bawah Judul */}
          <p className="max-w-2xl text-white font-bold text-xs sm:text-sm md:text-base leading-relaxed mt-2.5 sm:mt-3 px-2 drop-shadow-xs">
            Jelajahi permainan matematika interaktif, selesaikan tantangan, dan tingkatkan kemampuanmu melalui pengalaman belajar yang menyenangkan.
          </p>

        </div>

      </header>

      {/* =========================================================================
          AREA KARTU PILIHAN PERMAINAN (2 Kartu Utama: INDIVIDU & KELOMPOK)
      ========================================================================= */}
      <main className="relative z-20 w-full max-w-5xl mx-auto my-auto py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-stretch">
          
          {/* =====================================================================
              KARTU 1: INDIVIDU (Luna Bermain Sendiri, Background Pastel Kuning)
          ===================================================================== */}
          <div
            className="group relative bg-white rounded-[36px] sm:rounded-[42px] p-4 sm:p-5 flex flex-col justify-between border-[5px] sm:border-[6px] border-white shadow-2xl shadow-pink-950/25 transition-all duration-300 hover:-translate-y-2.5 hover:shadow-[0_24px_48px_-8px_rgba(199,42,102,0.35)]"
          >
            {/* Area Gambar Atas (Pastel Kuning + Elemen Matematika + Luna Solo) */}
            <div className="relative w-full aspect-square sm:aspect-[4/3] rounded-[28px] sm:rounded-[34px] bg-[#FFF3D1] overflow-hidden flex items-center justify-center p-3 sm:p-4">
              
              {/* Badge Simbol Tambah (+) Merah Muda di Kiri Atas */}
              <div className="absolute top-4 left-4 w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-[#FF6B8B] text-white flex items-center justify-center font-black text-xl sm:text-2xl shadow-md transform -rotate-12 pointer-events-none">
                +
              </div>

              {/* Badge Simbol Kali (×) Ungu di Kiri Tengah */}
              <div className="absolute top-24 left-3 w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-[#8B5CF6] text-white flex items-center justify-center font-black text-lg sm:text-xl shadow-md transform rotate-6 pointer-events-none">
                ×
              </div>

              {/* Badge Simbol Bagi (÷) Biru Muda di Kanan Tengah */}
              <div className="absolute top-20 right-3.5 w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-[#38BDF8] text-white flex items-center justify-center font-black text-xl sm:text-2xl shadow-md transform -rotate-6 pointer-events-none">
                ÷
              </div>

              {/* Spark Rays Kuning di Sekitar Kepala Luna */}
              <div className="absolute top-5 left-1/3 w-2.5 h-6 bg-[#FFE66D] rounded-full transform -rotate-25 pointer-events-none" />
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2.5 h-7 bg-[#FFE66D] rounded-full pointer-events-none" />
              <div className="absolute top-6 right-1/3 w-2.5 h-6 bg-[#FFE66D] rounded-full transform rotate-25 pointer-events-none" />

              {/* Gambar Karakter Luna Bermain Sendiri (Aset Utama Asli) */}
              <div className="relative w-full h-full max-h-[290px] sm:max-h-[320px] flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/assets/luna-game-solo.png"
                  alt="Karakter Luna bermain game individu"
                  width={600}
                  height={600}
                  priority
                  className="w-auto h-full max-h-full object-contain pointer-events-none drop-shadow-md"
                />
              </div>

            </div>

            {/* Bagian Bawah: Tombol Besar Pink "Individu" + Aksen Spark Kuning */}
            <div className="mt-4 sm:mt-5 flex items-center justify-center relative px-2">
              
              {/* Spark Rays Kuning di Kiri Tombol */}
              <div className="hidden sm:flex flex-col gap-1 items-end mr-3 pointer-events-none">
                <span className="w-4 h-1.5 bg-[#FFE66D] rounded-full transform -rotate-30" />
                <span className="w-5 h-1.5 bg-[#FFE66D] rounded-full transform rotate-10" />
              </div>

              {/* Tombol Utama Individu */}
              <Link
                href="/game/individu"
                onClick={() => playSound('select')}
                className="w-full max-w-sm py-3.5 sm:py-4 px-6 rounded-full bg-[#F34F91] hover:bg-[#FF3E83] text-white flex items-center justify-center gap-3 shadow-[0_6px_0_#C72A66] hover:shadow-[0_8px_0_#C72A66] hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_2px_0_#C72A66] transition-all duration-150 cursor-pointer text-center"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2.8]" />
                </div>
                <span className="text-xl sm:text-2xl font-black tracking-wide">
                  Individu
                </span>
              </Link>

              {/* Spark Rays Kuning di Kanan Tombol */}
              <div className="hidden sm:flex flex-col gap-1 items-start ml-3 pointer-events-none">
                <span className="w-4 h-1.5 bg-[#FFE66D] rounded-full transform rotate-30" />
                <span className="w-5 h-1.5 bg-[#FFE66D] rounded-full transform -rotate-10" />
              </div>

            </div>

          </div>

          {/* =====================================================================
              KARTU 2: KELOMPOK (Luna + 2 Teman Berbeda Warna, Background Pastel Biru)
          ===================================================================== */}
          <div
            className="group relative bg-white rounded-[36px] sm:rounded-[42px] p-4 sm:p-5 flex flex-col justify-between border-[5px] sm:border-[6px] border-white shadow-2xl shadow-pink-950/25 transition-all duration-300 hover:-translate-y-2.5 hover:shadow-[0_24px_48px_-8px_rgba(52,137,245,0.35)]"
          >
            {/* Area Gambar Atas (Pastel Biru + Elemen Matematika + Tiga Karakter) */}
            <div className="relative w-full aspect-square sm:aspect-[4/3] rounded-[28px] sm:rounded-[34px] bg-[#E0F2FE] overflow-hidden flex items-center justify-center p-3 sm:p-4">
              
              {/* Badge Simbol Tambah (+) Cyan di Kanan Atas */}
              <div className="absolute top-4 right-4 w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-[#38BDF8] text-white flex items-center justify-center font-black text-xl sm:text-2xl shadow-md transform rotate-12 pointer-events-none">
                +
              </div>

              {/* Spark Rays Kuning di Sekitar Tiga Karakter */}
              <div className="absolute top-5 left-1/4 w-2.5 h-6 bg-[#FFE66D] rounded-full transform -rotate-30 pointer-events-none" />
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2.5 h-7 bg-[#FFE66D] rounded-full pointer-events-none" />
              <div className="absolute top-6 right-1/4 w-2.5 h-6 bg-[#FFE66D] rounded-full transform rotate-30 pointer-events-none" />

              {/* Elemen Lingkaran Dekoratif Halus */}
              <div className="absolute top-12 left-6 w-8 h-8 rounded-full border-2 border-white/60 pointer-events-none" />
              <div className="absolute bottom-8 right-6 w-10 h-10 rounded-full border-2 border-white/60 pointer-events-none" />

              {/* Gambar Tiga Karakter Luna Bersama Teman (Aset Utama Asli) */}
              <div className="relative w-full h-full max-h-[290px] sm:max-h-[320px] flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/assets/luna-game-group.png"
                  alt="Karakter Luna bersama dua teman bermain game kelompok"
                  width={600}
                  height={600}
                  priority
                  className="w-auto h-full max-h-full object-contain pointer-events-none drop-shadow-md"
                />
              </div>

            </div>

            {/* Bagian Bawah: Tombol Besar Biru "Kelompok" + Aksen Spark Biru */}
            <div className="mt-4 sm:mt-5 flex items-center justify-center relative px-2">
              
              {/* Spark Rays Biru di Kiri Tombol */}
              <div className="hidden sm:flex flex-col gap-1 items-end mr-3 pointer-events-none">
                <span className="w-4 h-1.5 bg-[#38BDF8] rounded-full transform -rotate-30" />
                <span className="w-5 h-1.5 bg-[#38BDF8] rounded-full transform rotate-10" />
              </div>

              {/* Tombol Utama Kelompok */}
              <Link
                href="/game/kelompok"
                onClick={() => playSound('select')}
                className="w-full max-w-sm py-3.5 sm:py-4 px-6 rounded-full bg-[#3489F5] hover:bg-[#2563EB] text-white flex items-center justify-center gap-3 shadow-[0_6px_0_#1E40AF] hover:shadow-[0_8px_0_#1E40AF] hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_2px_0_#1E40AF] transition-all duration-150 cursor-pointer text-center"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2.8]" />
                </div>
                <span className="text-xl sm:text-2xl font-black tracking-wide">
                  Kelompok
                </span>
              </Link>

              {/* Spark Rays Biru di Kanan Tombol */}
              <div className="hidden sm:flex flex-col gap-1 items-start ml-3 pointer-events-none">
                <span className="w-4 h-1.5 bg-[#38BDF8] rounded-full transform rotate-30" />
                <span className="w-5 h-1.5 bg-[#38BDF8] rounded-full transform -rotate-10" />
              </div>

            </div>

          </div>

        </div>
      </main>

      {/* =========================================================================
          FOOTER / BOTTOM BRANDING
      ========================================================================= */}
      <footer className="relative z-20 w-full max-w-6xl mx-auto flex items-center justify-between pt-2 pb-1 text-white/80 text-xs font-bold">
        <span>LINTERA • Lingkaran Interaktif untuk Matematika</span>
        <span>SMA Matematika Asyik & Menyenangkan</span>
      </footer>

      {/* =========================================================================
          MODAL INTERAKTIF: PERSIAPAN MODE PERMAINAN (Placeholder Internal Terintegrasi)
      ========================================================================= */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 bg-[#123B8A]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-lg bg-white rounded-[32px] shadow-2xl p-6 sm:p-8 relative border-4 border-white text-center animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol Tutup Silang di Kanan Atas */}
            <button
              onClick={() => {
                playSound('click');
                setActiveModal(null);
              }}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
              aria-label="Tutup Jendela"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Ilustrasi Mode */}
            <div className="relative w-28 h-28 mx-auto mb-3">
              <Image
                src={activeModal === 'individu' ? '/assets/luna-game-solo.png' : '/assets/luna-game-group.png'}
                alt="Maskot Game"
                width={200}
                height={200}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Judul & Status Mode */}
            <div className="mb-4">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 ${
                  activeModal === 'individu'
                    ? 'bg-pink-100 text-[#F34F91]'
                    : 'bg-blue-100 text-[#3489F5]'
                }`}
              >
                {activeModal === 'individu' ? 'Mode Individu' : 'Mode Kelompok'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#123B8A]">
                {activeModal === 'individu'
                  ? 'Petualangan Mandiri Luna'
                  : 'Tantangan Tim Lingkaran'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-1.5 leading-relaxed">
                {activeModal === 'individu'
                  ? 'Selesaikan teka-teki lingkaran, kumpulkan bintang kecepatan, dan pecahkan rekor pribadimu!'
                  : 'Ajak teman sekelasmu membentuk tim, bergabung lewat kode ruangan, dan selesaikan misi matematika bersama-sama!'}
              </p>
            </div>

            {/* Preview Fitur yang Akan Hadir */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-left space-y-2 mb-6">
              <div className="flex items-center gap-2.5 text-xs font-bold text-slate-700">
                <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
                <span>
                  {activeModal === 'individu' ? 'Papan Peringkat Skor Pribadi' : 'Turnamen Tim & Leaderboard Kelas'}
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold text-slate-700">
                <Clock className="w-4 h-4 text-blue-500 shrink-0" />
                <span>
                  {activeModal === 'individu' ? 'Tantangan Waktu Hitung Kuadrat & Jari-Jari' : 'Mode Cepat Cepat Tanggap Antar-Kelompok'}
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold text-slate-700">
                <Sparkles className="w-4 h-4 text-purple-500 shrink-0" />
                <span>Koleksi Lencana Matematika & Kostum Luna</span>
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  playSound('click');
                  setActiveModal(null);
                }}
                className="w-full py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-sm transition-all"
              >
                Kembali ke Pilihan Mode
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
