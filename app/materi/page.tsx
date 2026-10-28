'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Info, X } from 'lucide-react';

export default function MateriBelajarPage() {
  const [showInfoModal, setShowInfoModal] = useState(false);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-[#63C9F4] font-sans select-none pb-8 sm:pb-12">
      {/* =========================================================================
          BACKGROUND DEKORATIF BIRU FLAT (Awan minimalis, gelembung lembut, titik cahaya)
      ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft subtle radial glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-white/15 rounded-full blur-3xl" />

        {/* Lingkaran transparan dekoratif di sudut kiri atas */}
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/15" />
        <div className="absolute top-20 left-10 w-28 h-28 rounded-full bg-white/10" />
        <div className="absolute top-44 left-36 w-12 h-12 rounded-full bg-white/20" />

        {/* Lingkaran transparan di kanan atas */}
        <div className="absolute -top-12 -right-12 w-72 h-72 rounded-full bg-white/15" />
        <div className="absolute top-24 right-20 w-20 h-20 rounded-full bg-white/10" />

        {/* Awan Minimalis Vektor */}
        {/* Awan kiri atas */}
        <div className="absolute top-20 left-24 hidden lg:flex items-center opacity-80">
          <div className="w-16 h-8 bg-white/90 rounded-full" />
          <div className="w-12 h-12 bg-white/90 rounded-full -ml-8 -mt-4" />
          <div className="w-20 h-10 bg-white/90 rounded-full -ml-4" />
        </div>

        {/* Awan kanan atas */}
        <div className="absolute top-24 right-32 hidden lg:flex items-center opacity-80">
          <div className="w-20 h-10 bg-white/90 rounded-full" />
          <div className="w-14 h-14 bg-white/90 rounded-full -ml-10 -mt-5" />
          <div className="w-16 h-8 bg-white/90 rounded-full -ml-4" />
        </div>

        {/* Awan lembut di bawah kiri dan kanan */}
        <div className="absolute -bottom-10 -left-10 w-96 h-40 bg-white/25 rounded-full blur-xl" />
        <div className="absolute -bottom-10 -right-10 w-96 h-40 bg-white/25 rounded-full blur-xl" />

        {/* Bintik-bintik putih kecil */}
        <div className="absolute top-36 left-[18%] w-3 h-3 rounded-full bg-white/60" />
        <div className="absolute top-28 right-[22%] w-2.5 h-2.5 rounded-full bg-white/60" />
        <div className="absolute bottom-20 left-[12%] w-3 h-3 rounded-full bg-white/50" />
        <div className="absolute bottom-16 right-[14%] w-3.5 h-3.5 rounded-full bg-white/50" />
      </div>

      {/* =========================================================================
          HEADER (Judul Tengah + Aksen Kuning, Tombol Info & Kembali di Kanan Atas)
      ========================================================================= */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-6 sm:pt-10 pb-4 sm:pb-8 flex items-center justify-between">
        
        {/* Spacer kiri agar judul tepat di tengah pada layar desktop */}
        <div className="w-20 sm:w-28 hidden sm:block" />

        {/* Judul Tengah: Materi Belajar dengan Aksen Dekorasi Kuning */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative inline-flex items-center gap-3 sm:gap-4">
            
            {/* Aksen Kuning di Sisi Kiri */}
            <div className="flex flex-col items-end gap-1.5 pointer-events-none">
              <span className="w-5 sm:w-7 h-1.5 sm:h-2 bg-[#FFD34E] rounded-full transform -rotate-12" />
              <span className="w-3.5 sm:w-5 h-1.5 sm:h-2 bg-[#FFD34E] rounded-full transform rotate-6" />
            </div>

            {/* Teks Judul */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5.5xl font-black text-[#123B8A] tracking-tight drop-shadow-sm text-center">
              Materi Belajar
            </h1>

            {/* Aksen Kuning di Sisi Kanan */}
            <div className="flex flex-col items-start gap-1.5 pointer-events-none">
              <span className="w-5 sm:w-7 h-1.5 sm:h-2 bg-[#FFD34E] rounded-full transform rotate-12" />
              <span className="w-3.5 sm:w-5 h-1.5 sm:h-2 bg-[#FFD34E] rounded-full transform -rotate-6" />
            </div>
          </div>
        </div>

        {/* Tombol Info & Kembali di Kanan Atas (Putih Bulat, Ikon Biru, Tanpa Teks) */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            onClick={() => setShowInfoModal(true)}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-[#2875FB] hover:text-[#1C64E8] flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 border border-blue-100"
            aria-label="Informasi Materi"
            title="Informasi Materi"
          >
            <Info className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </button>

          <Link
            href="/dashboard"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-[#2875FB] hover:text-[#1C64E8] flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 border border-blue-100"
            aria-label="Kembali ke Dashboard"
            title="Kembali ke Dashboard"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </Link>
        </div>
      </header>

      {/* =========================================================================
          TIGA KARTU MATERI BELAJAR (Berjajar Horizontal, Desain Sesuai Referensi)
      ========================================================================= */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 items-stretch">
          
          {/* -------------------------------------------------------------------
              KARTU 1 — MATERI 1: Unsur-unsur Lingkaran
          ------------------------------------------------------------------- */}
          <Link
            href="/materi/unsur-lingkaran"
            className="group relative bg-[#D9F0FF] rounded-[32px] sm:rounded-[36px] p-6 sm:p-7 flex flex-col justify-between border-4 border-white shadow-xl shadow-blue-950/10 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 active:scale-[0.98] overflow-hidden"
          >
            {/* Dekorasi gelembung halus di dalam kartu */}
            <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/40 pointer-events-none" />

            <div>
              {/* Label Kecil: Materi 1 */}
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#2875FB] text-white font-black text-xs sm:text-sm tracking-wide shadow-sm">
                Materi 1
              </span>

              {/* Judul Materi */}
              <h2 className="text-xl sm:text-2xl lg:text-[26px] font-black text-[#123B8A] leading-tight mt-3 mb-2">
                Unsur-unsur<br />Lingkaran
              </h2>
            </div>

            {/* Ilustrasi Luna + Diagram Matematika Lingkaran */}
            <div className="relative w-full h-44 sm:h-48 my-3 flex items-center justify-between">
              
              {/* Karakter Luna & Tongkat Penunjuk */}
              <div className="relative w-[48%] h-full flex items-end justify-start">
                {/* Yellow rays above Luna */}
                <div className="absolute top-2 left-6 flex gap-1 pointer-events-none">
                  <span className="w-2.5 h-1 bg-[#FFD34E] rounded-full transform -rotate-45" />
                  <span className="w-3 h-1 bg-[#FFD34E] rounded-full transform rotate-12" />
                </div>

                <div className="relative w-28 sm:w-32 h-36 sm:h-40">
                  <Image
                    src="/assets/luna.png"
                    alt="Luna menjelaskan unsur-unsur lingkaran"
                    width={180}
                    height={180}
                    className="w-full h-full object-contain pointer-events-none drop-shadow-sm"
                  />
                  {/* Pointing Stick */}
                  <div className="absolute top-[48%] right-0 w-12 sm:w-14 h-1.5 bg-[#8B5A2B] rounded-full transform rotate-[25deg] origin-left shadow-xs pointer-events-none" />
                </div>
              </div>

              {/* Diagram Matematika: Lingkaran & Unsur-unsurnya */}
              <div className="w-[52%] h-full flex items-center justify-center">
                <svg className="w-36 h-36 sm:w-40 sm:h-40" viewBox="0 0 120 120" fill="none">
                  {/* Lingkaran Utama */}
                  <circle cx="60" cy="60" r="44" stroke="#2875FB" strokeWidth="4" />
                  
                  {/* Jari-jari Mendatar Hijau */}
                  <line x1="60" y1="60" x2="104" y2="60" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" />
                  
                  {/* Jari-jari Ke Atas Oranye */}
                  <line x1="60" y1="60" x2="38" y2="22" stroke="#F57200" strokeWidth="3.5" strokeLinecap="round" />
                  
                  {/* Jari-jari / Tali Busur Ungu */}
                  <line x1="60" y1="60" x2="35" y2="88" stroke="#8B5CF6" strokeWidth="3.5" strokeLinecap="round" />
                  
                  {/* Garis Putus-putus Juring/Apotema */}
                  <line x1="60" y1="60" x2="84" y2="92" stroke="#3B82F6" strokeWidth="2.5" strokeDasharray="3 3" />
                  
                  {/* Titik Pusat Navy */}
                  <circle cx="60" cy="60" r="4.5" fill="#123B8A" />
                </svg>
              </div>

            </div>

            {/* Tombol Panah Kanan (Lingkaran Putih, Ikon Biru) */}
            <div className="flex justify-end pt-1">
              <span className="w-10 h-10 rounded-full bg-white text-[#2875FB] flex items-center justify-center shadow-md group-hover:translate-x-1.5 transition-transform duration-200">
                <ArrowRight className="w-5 h-5 stroke-[3]" />
              </span>
            </div>
          </Link>

          {/* -------------------------------------------------------------------
              KARTU 2 — MATERI 2: Kedudukan Titik pada Lingkaran
          ------------------------------------------------------------------- */}
          <Link
            href="/materi/kedudukan-titik"
            className="group relative bg-[#FFE7DC] rounded-[32px] sm:rounded-[36px] p-6 sm:p-7 flex flex-col justify-between border-4 border-white shadow-xl shadow-orange-950/10 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 active:scale-[0.98] overflow-hidden"
          >
            {/* Dekorasi gelembung halus */}
            <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/40 pointer-events-none" />

            <div>
              {/* Label Kecil: Materi 2 */}
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#F57200] text-white font-black text-xs sm:text-sm tracking-wide shadow-sm">
                Materi 2
              </span>

              {/* Judul Materi */}
              <h2 className="text-xl sm:text-2xl lg:text-[26px] font-black text-[#431407] leading-tight mt-3 mb-2">
                Kedudukan Titik<br />pada Lingkaran
              </h2>
            </div>

            {/* Ilustrasi Luna + Diagram Kedudukan Titik */}
            <div className="relative w-full h-44 sm:h-48 my-3 flex items-center justify-between">
              
              {/* Karakter Luna & Tongkat Penunjuk */}
              <div className="relative w-[48%] h-full flex items-end justify-start">
                <div className="absolute top-2 left-6 flex gap-1 pointer-events-none">
                  <span className="w-2.5 h-1 bg-[#FFD34E] rounded-full transform -rotate-45" />
                  <span className="w-3 h-1 bg-[#FFD34E] rounded-full transform rotate-12" />
                </div>

                <div className="relative w-28 sm:w-32 h-36 sm:h-40">
                  <Image
                    src="/assets/luna.png"
                    alt="Luna menjelaskan kedudukan titik pada lingkaran"
                    width={180}
                    height={180}
                    className="w-full h-full object-contain pointer-events-none drop-shadow-sm"
                  />
                  {/* Pointing Stick */}
                  <div className="absolute top-[48%] right-0 w-12 sm:w-14 h-1.5 bg-[#8B5A2B] rounded-full transform rotate-[25deg] origin-left shadow-xs pointer-events-none" />
                </div>
              </div>

              {/* Diagram Matematika: Kedudukan Titik */}
              <div className="w-[52%] h-full flex items-center justify-center">
                <svg className="w-36 h-36 sm:w-40 sm:h-40" viewBox="0 0 120 120" fill="none">
                  {/* Lingkaran Luar Putus-putus sebagai Batas */}
                  <circle cx="60" cy="60" r="44" stroke="#38BDF8" strokeWidth="2.5" strokeDasharray="4 4" />
                  
                  {/* Lingkaran Padat */}
                  <circle cx="60" cy="60" r="36" stroke="#2563EB" strokeWidth="3.5" />
                  
                  {/* Garis Jari-jari putus-putus ke titik merah */}
                  <line x1="60" y1="60" x2="60" y2="16" stroke="#38BDF8" strokeWidth="2" strokeDasharray="2 2" />
                  
                  {/* Titik Pusat Navy */}
                  <circle cx="60" cy="60" r="4" fill="#123B8A" />
                  
                  {/* Titik Merah (Tepat pada Lingkaran Luar / Atas) */}
                  <circle cx="60" cy="16" r="6" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />
                  
                  {/* Titik Hijau (Pada Lingkaran) */}
                  <circle cx="95" cy="52" r="5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
                  
                  {/* Titik Ungu (Di dalam Lingkaran) */}
                  <circle cx="75" cy="78" r="5" fill="#8B5CF6" stroke="#FFFFFF" strokeWidth="1.5" />
                </svg>
              </div>

            </div>

            {/* Tombol Panah Kanan (Lingkaran Putih, Ikon Oranye) */}
            <div className="flex justify-end pt-1">
              <span className="w-10 h-10 rounded-full bg-white text-[#F57200] flex items-center justify-center shadow-md group-hover:translate-x-1.5 transition-transform duration-200">
                <ArrowRight className="w-5 h-5 stroke-[3]" />
              </span>
            </div>
          </Link>

          {/* -------------------------------------------------------------------
              KARTU 3 — MATERI 3: Kedudukan Garis pada Lingkaran
          ------------------------------------------------------------------- */}
          <Link
            href="/materi/kedudukan-garis"
            className="group relative bg-[#DCFCE7] rounded-[32px] sm:rounded-[36px] p-6 sm:p-7 flex flex-col justify-between border-4 border-white shadow-xl shadow-emerald-950/10 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 active:scale-[0.98] overflow-hidden"
          >
            {/* Dekorasi gelembung halus */}
            <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/40 pointer-events-none" />

            <div>
              {/* Label Kecil: Materi 3 */}
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#10B981] text-white font-black text-xs sm:text-sm tracking-wide shadow-sm">
                Materi 3
              </span>

              {/* Judul Materi */}
              <h2 className="text-xl sm:text-2xl lg:text-[26px] font-black text-[#064E3B] leading-tight mt-3 mb-2">
                Kedudukan Garis<br />pada Lingkaran
              </h2>
            </div>

            {/* Ilustrasi Luna + Diagram Kedudukan Garis */}
            <div className="relative w-full h-44 sm:h-48 my-3 flex items-center justify-between">
              
              {/* Karakter Luna & Tongkat Penunjuk */}
              <div className="relative w-[48%] h-full flex items-end justify-start">
                <div className="absolute top-2 left-6 flex gap-1 pointer-events-none">
                  <span className="w-2.5 h-1 bg-[#FFD34E] rounded-full transform -rotate-45" />
                  <span className="w-3 h-1 bg-[#FFD34E] rounded-full transform rotate-12" />
                </div>

                <div className="relative w-28 sm:w-32 h-36 sm:h-40">
                  <Image
                    src="/assets/luna.png"
                    alt="Luna menjelaskan kedudukan garis pada lingkaran"
                    width={180}
                    height={180}
                    className="w-full h-full object-contain pointer-events-none drop-shadow-sm"
                  />
                  {/* Pointing Stick */}
                  <div className="absolute top-[48%] right-0 w-12 sm:w-14 h-1.5 bg-[#8B5A2B] rounded-full transform rotate-[25deg] origin-left shadow-xs pointer-events-none" />
                </div>
              </div>

              {/* Diagram Matematika: Kedudukan Garis */}
              <div className="w-[52%] h-full flex items-center justify-center">
                <svg className="w-36 h-36 sm:w-40 sm:h-40" viewBox="0 0 120 120" fill="none">
                  {/* Lingkaran Utama */}
                  <circle cx="56" cy="62" r="35" stroke="#2563EB" strokeWidth="3.5" />
                  
                  {/* Garis Singgung Horizontal Merah di Atas Lingkaran */}
                  <line x1="26" y1="27" x2="86" y2="27" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="56" cy="27" r="5.5" fill="#EF4444" />
                  
                  {/* Garis Jari-jari Tegak Lurus ke Garis Singgung */}
                  <line x1="56" y1="27" x2="56" y2="62" stroke="#93C5FD" strokeWidth="2" strokeDasharray="3 3" />
                  
                  {/* Garis Memotong (Sekan) Biru Membelah Lingkaran */}
                  <line x1="32" y1="42" x2="80" y2="84" stroke="#2563EB" strokeWidth="3.5" strokeLinecap="round" />
                  <circle cx="32" cy="42" r="4.5" fill="#2563EB" />
                  <circle cx="80" cy="84" r="4.5" fill="#2563EB" />
                  
                  {/* Titik Pusat Lingkaran */}
                  <circle cx="56" cy="62" r="4" fill="#123B8A" />
                  
                  {/* Garis di Luar Lingkaran (Ungu) */}
                  <line x1="102" y1="40" x2="94" y2="86" stroke="#8B5CF6" strokeWidth="3.5" strokeLinecap="round" />
                  <circle cx="102" cy="40" r="4" fill="#8B5CF6" />
                  <circle cx="94" cy="86" r="4" fill="#8B5CF6" />
                </svg>
              </div>

            </div>

            {/* Tombol Panah Kanan (Lingkaran Putih, Ikon Hijau) */}
            <div className="flex justify-end pt-1">
              <span className="w-10 h-10 rounded-full bg-white text-[#10B981] flex items-center justify-center shadow-md group-hover:translate-x-1.5 transition-transform duration-200">
                <ArrowRight className="w-5 h-5 stroke-[3]" />
              </span>
            </div>
          </Link>

        </div>
      </main>

      {/* =========================================================================
          MODAL INFORMASI MATERI
      ========================================================================= */}
      {showInfoModal && (
        <div
          className="fixed inset-0 z-50 bg-[#123B8A]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowInfoModal(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 relative border border-blue-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-[#2875FB] flex items-center justify-center">
                  <Info className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#123B8A]">Petunjuk Materi Belajar</h3>
                  <p className="text-xs text-slate-500 font-semibold">Kurikulum Matematika Lingkaran SMA</p>
                </div>
              </div>
              <button
                onClick={() => setShowInfoModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
              <p>
                Pilih salah satu dari 3 modul materi lingkaran untuk memulai pembelajaran interaktif:
              </p>
              <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-xs text-[#123B8A] space-y-2 font-medium">
                <p>• <strong>Materi 1:</strong> Mempelajari unsur dasar pembentuk lingkaran (titik pusat, jari-jari, diameter, busur, tali busur, juring, tembereng, apotema).</p>
                <p>• <strong>Materi 2:</strong> Menentukan kedudukan titik terhadap lingkaran (x² + y² dibandingkan dengan r²).</p>
                <p>• <strong>Materi 3:</strong> Menganalisis kedudukan garis terhadap lingkaran melalui diskriminan (D &gt; 0, D = 0, D &lt; 0).</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowInfoModal(false)}
                className="px-6 py-2.5 rounded-full bg-[#2875FB] hover:bg-[#1C64E8] text-white font-bold text-sm shadow-md active:scale-95 transition-all"
              >
                Mengerti
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
