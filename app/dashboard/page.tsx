'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Info,
  X,
  BookOpen,
  Gamepad2,
  LineChart,
  ClipboardCheck,
  Lightbulb,
  CheckCircle2,
  Play
} from 'lucide-react';

export default function LinteraDashboard() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <div
      className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden font-sans select-none"
      style={{
        backgroundImage: "url('/assets/dashboard-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Soft atmospheric gradient to enhance readability while preserving scenery */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-400/10 via-transparent to-black/5 pointer-events-none" />

      {/* =========================================================================
          TOP RIGHT ACTION BUTTONS (Hanya Ikon, Tanpa Teks, Putih Bulat Aksen Biru)
      ========================================================================= */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-30 flex items-center gap-3">
        {/* Tombol Info */}
        <button
          onClick={() => setActiveModal('info')}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-[#2875FB] hover:text-[#1C64E8] flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 border border-blue-100"
          aria-label="Informasi LINTERA"
          title="Informasi LINTERA"
        >
          <Info className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
        </button>

        {/* Tombol Kembali ke Landing Page */}
        <Link
          href="/"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-[#2875FB] hover:text-[#1C64E8] flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 border border-blue-100"
          aria-label="Kembali ke Halaman Utama"
          title="Kembali ke Landing Page"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
        </Link>
      </div>

      {/* =========================================================================
          HERO SECTION (Logo LINTERA, Deskripsi, & Karakter Luna di Kanan)
      ========================================================================= */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-6 sm:pt-10 pb-4 flex flex-col md:flex-row items-center justify-between">
        
        {/* Bagian Kiri: Logo dan Sapaan */}
        <div className="w-full md:w-[58%] lg:w-[54%] flex flex-col items-center md:items-start text-center md:text-left mb-4 md:mb-0">
          
          {/* Logo LINTERA (Konsisten dengan Landing Page) */}
          <div className="relative inline-flex items-center group mb-1">
            <span className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#123B8A] flex items-center drop-shadow-sm">
              L
              <span className="relative text-[#123B8A]">
                I
                <span className="absolute -top-1 sm:-top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#F57200]" />
              </span>
              NTERA
            </span>
            {/* Joyful yellow smile swoop underline */}
            <svg
              className="absolute -bottom-2 sm:-bottom-3 left-3 w-28 sm:w-36 text-[#FFD34E]"
              viewBox="0 0 100 16"
              fill="none"
            >
              <path
                d="M4 4C28 14 68 14 96 4"
                stroke="#FFD34E"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Subjudul Logo */}
          <p className="text-sm sm:text-base lg:text-lg font-extrabold text-[#123B8A] mt-2 mb-3 tracking-wide">
            Lingkaran Interaktif untuk Matematika
          </p>

          {/* Deskripsi Hero dengan Aksen Garis Kuning di Kiri & Kanan */}
          <div className="relative flex items-center justify-center md:justify-start gap-2.5 sm:gap-3 max-w-lg mt-1">
            {/* Pasang garis kuning ceria di kiri */}
            <div className="hidden sm:flex flex-col gap-1 items-end pointer-events-none">
              <span className="w-3.5 h-1 bg-[#FFD34E] rounded-full transform -rotate-12" />
              <span className="w-2.5 h-1 bg-[#FFD34E] rounded-full transform rotate-6" />
            </div>

            <p className="text-xs sm:text-sm lg:text-base font-bold text-[#123B8A] leading-snug sm:leading-relaxed drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
              Ayo jelajahi berbagai aktivitas seru untuk memahami matematika bersama LINTERA!
            </p>

            {/* Pasang garis kuning ceria di kanan */}
            <div className="hidden sm:flex flex-col gap-1 items-start pointer-events-none">
              <span className="w-3.5 h-1 bg-[#FFD34E] rounded-full transform rotate-12" />
              <span className="w-2.5 h-1 bg-[#FFD34E] rounded-full transform -rotate-6" />
            </div>
          </div>
        </div>

        {/* Bagian Kanan: Karakter Luna (Besar, Ceria, Utuh) */}
        <div className="w-full md:w-[42%] lg:w-[46%] flex items-end justify-center md:justify-end relative pr-0 md:pr-4">
          <div className="relative w-52 sm:w-64 md:w-72 lg:w-80 h-44 sm:h-56 md:h-64 lg:h-72 flex items-end justify-center animate-gentle-bob">
            <Image
              src="/assets/luna.png"
              alt="Karakter Luna Maskot LINTERA"
              width={600}
              height={500}
              priority
              className="w-auto h-full max-h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.14)] pointer-events-none"
            />
          </div>
        </div>

      </header>

      {/* =========================================================================
          AREA MENU UTAMA (Satu Container Putih, 5 Kartu Menu + Sapaan Siswa)
      ========================================================================= */}
      <main className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pb-6 sm:pb-8">
        <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl sm:rounded-[32px] p-4 sm:p-6 lg:p-7 shadow-xl shadow-blue-900/10 border border-white/80 flex flex-col gap-4 sm:gap-6">
          
          {/* Baris 5 Kartu Menu Utama */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
            
            {/* KARTU 1 — MATERI BELAJAR (Navigasi ke Halaman Materi Belajar) */}
            <Link
              href="/materi"
              className="group cursor-pointer rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:scale-95 bg-[#E0F2FE] border border-blue-100"
            >
              <div>
                {/* 2D Flat Cartoon Book Icon */}
                <div className="w-16 h-14 mb-3 flex items-center justify-center">
                  <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none">
                    {/* Shadow */}
                    <ellipse cx="32" cy="54" rx="22" ry="4" fill="#93C5FD" fillOpacity="0.4" />
                    {/* Back Cover */}
                    <path d="M12 18C12 16 14 14 16 14H32V50H16C13.8 50 12 48.2 12 46V18Z" fill="#2563EB" />
                    <path d="M52 18C52 16 50 14 48 14H32V50H48C50.2 50 52 48.2 52 46V18Z" fill="#F97316" />
                    {/* White Pages */}
                    <path d="M15 17C15 15.5 16.5 14 18 14H32V47H18C16.3 47 15 45.7 15 44V17Z" fill="#FFFFFF" />
                    <path d="M49 17C49 15.5 47.5 14 46 14H32V47H46C47.7 47 49 45.7 49 44V17Z" fill="#FFFFFF" />
                    {/* Page Lines */}
                    <line x1="20" y1="22" x2="28" y2="22" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
                    <line x1="20" y1="28" x2="28" y2="28" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
                    <line x1="20" y1="34" x2="26" y2="34" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
                    <line x1="36" y1="22" x2="44" y2="22" stroke="#FDBA74" strokeWidth="2" strokeLinecap="round" />
                    <line x1="36" y1="28" x2="44" y2="28" stroke="#FDBA74" strokeWidth="2" strokeLinecap="round" />
                    {/* Bookmark Ribbon */}
                    <path d="M30 14V32L32 30L34 32V14H30Z" fill="#EF4444" />
                  </svg>
                </div>

                <h3 className="text-base sm:text-lg font-black text-[#123B8A] mb-1">
                  Materi Belajar
                </h3>
                <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                  Jelajahi materi matematika.
                </p>
              </div>

              {/* Action Circle Button */}
              <div className="mt-4 flex justify-end">
                <span className="w-8 h-8 rounded-full bg-white text-[#2875FB] flex items-center justify-center shadow-sm group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </span>
              </div>
            </Link>

            {/* KARTU 2 — GAME MATEMATIKA (Navigasi ke Halaman Game Matematika) */}
            <Link
              href="/game"
              className="group cursor-pointer rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:scale-95 bg-[#FFE4D6] border border-orange-100"
            >
              <div>
                {/* 2D Flat Cartoon Game Controller Icon */}
                <div className="w-16 h-14 mb-3 flex items-center justify-center">
                  <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none">
                    {/* Shadow */}
                    <ellipse cx="32" cy="52" rx="20" ry="4" fill="#FDBA74" fillOpacity="0.5" />
                    {/* Gamepad Body */}
                    <path
                      d="M16 22C12 22 10 26 10 32C10 40 14 46 19 46C23 46 26 41 28 37H36C38 41 41 46 45 46C50 46 54 40 54 32C54 26 52 22 48 22C42 22 38 25 32 25C26 25 22 22 16 22Z"
                      fill="#38BDF8"
                    />
                    {/* D-Pad */}
                    <rect x="18" y="29" width="4" height="10" rx="1.5" fill="#F97316" />
                    <rect x="15" y="32" width="10" height="4" rx="1.5" fill="#F97316" />
                    {/* Buttons */}
                    <circle cx="44" cy="31" r="2.2" fill="#EF4444" />
                    <circle cx="48" cy="35" r="2.2" fill="#EAB308" />
                    <circle cx="40" cy="35" r="2.2" fill="#10B981" />
                    <circle cx="44" cy="39" r="2.2" fill="#8B5CF6" />
                  </svg>
                </div>

                <h3 className="text-base sm:text-lg font-black text-[#123B8A] mb-1">
                  Game Matematika
                </h3>
                <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                  Belajar sambil bermain.
                </p>
              </div>

              {/* Action Circle Button */}
              <div className="mt-4 flex justify-end">
                <span className="w-8 h-8 rounded-full bg-white text-[#F57200] flex items-center justify-center shadow-sm group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </span>
              </div>
            </Link>

            {/* KARTU 3 — SIMULASI INTERAKTIF */}
            <Link
              href="/simulasi"
              className="group cursor-pointer rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:scale-95 bg-[#DCFCE7] border border-emerald-100"
            >
              <div>
                {/* 2D Flat Cartoon Monitor Simulation Icon */}
                <div className="w-16 h-14 mb-3 flex items-center justify-center">
                  <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none">
                    {/* Base & Stand */}
                    <ellipse cx="32" cy="53" rx="16" ry="3.5" fill="#86EFAC" fillOpacity="0.5" />
                    <rect x="29" y="42" width="6" height="8" rx="2" fill="#3B82F6" />
                    <rect x="22" y="49" width="20" height="3" rx="1.5" fill="#1D4ED8" />
                    {/* Monitor Outer */}
                    <rect x="12" y="15" width="40" height="28" rx="5" fill="#3B82F6" />
                    {/* Screen */}
                    <rect x="15" y="18" width="34" height="22" rx="3" fill="#FFFFFF" />
                    {/* Chart Line with Points */}
                    <path
                      d="M19 33L26 27L32 30L42 22"
                      stroke="#F59E0B"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="19" cy="33" r="2" fill="#F59E0B" />
                    <circle cx="26" cy="27" r="2" fill="#F59E0B" />
                    <circle cx="32" cy="30" r="2" fill="#F59E0B" />
                    <circle cx="42" cy="22" r="2" fill="#EF4444" />
                    {/* Floating Tool Dots */}
                    <circle cx="43" cy="33" r="1.5" fill="#8B5CF6" />
                    <circle cx="43" cy="37" r="1.5" fill="#10B981" />
                  </svg>
                </div>

                <h3 className="text-base sm:text-lg font-black text-[#123B8A] mb-1">
                  Simulasi Interaktif
                </h3>
                <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                  Pelajari konsep melalui simulasi.
                </p>
              </div>

              {/* Action Circle Button */}
              <div className="mt-4 flex justify-end">
                <span className="w-8 h-8 rounded-full bg-white text-[#10B981] flex items-center justify-center shadow-sm group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </span>
              </div>
            </Link>

            {/* KARTU 4 — LATIHAN SOAL */}
            <Link
              href="/latihan"
              className="group cursor-pointer rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:scale-95 bg-[#F3E8FF] border border-purple-100"
            >
              <div>
                {/* 2D Flat Cartoon Clipboard & Pencil Icon */}
                <div className="w-16 h-14 mb-3 flex items-center justify-center">
                  <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none">
                    {/* Shadow */}
                    <ellipse cx="32" cy="53" rx="16" ry="3.5" fill="#D8B4FE" fillOpacity="0.5" />
                    {/* Board */}
                    <rect x="16" y="16" width="32" height="36" rx="4" fill="#C084FC" />
                    {/* Top Clip */}
                    <rect x="25" y="12" width="14" height="6" rx="2" fill="#F59E0B" />
                    {/* Paper */}
                    <rect x="19" y="20" width="26" height="29" rx="2" fill="#FFFFFF" />
                    {/* Checklist */}
                    <rect x="22" y="25" width="4" height="4" rx="1" fill="#38BDF8" />
                    <line x1="28" y1="27" x2="41" y2="27" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
                    <rect x="22" y="32" width="4" height="4" rx="1" fill="#38BDF8" />
                    <line x1="28" y1="34" x2="38" y2="34" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
                    <rect x="22" y="39" width="4" height="4" rx="1" fill="#F97316" />
                    <line x1="28" y1="41" x2="41" y2="41" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
                    {/* Pencil */}
                    <g transform="rotate(35 48 38)">
                      <rect x="44" y="22" width="5" height="18" rx="1" fill="#3B82F6" />
                      <polygon points="44,40 49,40 46.5,45" fill="#FDBA74" />
                      <polygon points="46,43 47,43 46.5,45" fill="#1E293B" />
                    </g>
                  </svg>
                </div>

                <h3 className="text-base sm:text-lg font-black text-[#123B8A] mb-1">
                  Latihan Soal
                </h3>
                <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                  Latih kemampuan matematikamu.
                </p>
              </div>

              {/* Action Circle Button */}
              <div className="mt-4 flex justify-end">
                <span className="w-8 h-8 rounded-full bg-white text-[#8B5CF6] flex items-center justify-center shadow-sm group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </span>
              </div>
            </Link>

            {/* KARTU 5 — REFLEKSI BELAJAR */}
            <Link
              href="/refleksi"
              className="group cursor-pointer rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:scale-95 bg-[#FEF9C3] border border-amber-100"
            >
              <div>
                {/* 2D Flat Cartoon Lightbulb Idea Icon */}
                <div className="w-16 h-14 mb-3 flex items-center justify-center">
                  <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none">
                    {/* Shadow */}
                    <ellipse cx="32" cy="53" rx="14" ry="3.5" fill="#FDE047" fillOpacity="0.5" />
                    {/* Glowing Rays */}
                    <line x1="32" y1="8" x2="32" y2="12" stroke="#EAB308" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="16" y1="16" x2="19" y2="19" stroke="#EAB308" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="48" y1="16" x2="45" y2="19" stroke="#EAB308" strokeWidth="2.5" strokeLinecap="round" />
                    {/* Bulb Body */}
                    <path
                      d="M32 14C23.7 14 17 20.7 17 29C17 34.2 19.8 38.8 24 41.5V45C24 46 25 47 26 47H38C39 47 40 46 40 45V41.5C44.2 38.8 47 34.2 47 29C47 20.7 40.3 14 32 14Z"
                      fill="#F59E0B"
                    />
                    <path
                      d="M32 17C25.4 17 20 22.4 20 29C20 33.2 22.3 36.8 25.6 39H38.4C41.7 36.8 44 33.2 44 29C44 22.4 38.6 17 32 17Z"
                      fill="#FDE047"
                    />
                    {/* Filament */}
                    <path d="M28 32C28 29 36 29 36 32" stroke="#D97706" strokeWidth="2" strokeLinecap="round" fill="none" />
                    {/* Base Screws */}
                    <rect x="27" y="47" width="10" height="2.5" rx="1" fill="#78716C" />
                    <rect x="28" y="50" width="8" height="2" rx="1" fill="#57534E" />
                  </svg>
                </div>

                <h3 className="text-base sm:text-lg font-black text-[#123B8A] mb-1">
                  Refleksi Belajar
                </h3>
                <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                  Lihat kembali pemahamanmu.
                </p>
              </div>

              {/* Action Circle Button */}
              <div className="mt-4 flex justify-end">
                <span className="w-8 h-8 rounded-full bg-white text-[#F59E0B] flex items-center justify-center shadow-sm group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </span>
              </div>
            </Link>

          </div>

          {/* =========================================================================
              BAGIAN SAPAAN SISWA (Container Horizontal Biru Muda + Karakter Luna Kecil)
          ========================================================================= */}
          <div className="w-full bg-[#EBF5FF] border border-blue-100 rounded-2xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 shadow-sm">
            {/* Luna Avatar (Lingkaran Ceria) */}
            <div className="relative w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#63C9F4] border-2 border-white shadow-sm overflow-hidden shrink-0 flex items-center justify-center">
              <div className="w-16 h-16 relative -top-0.5">
                <Image
                  src="/assets/luna.png"
                  alt="Avatar Luna"
                  width={80}
                  height={80}
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Sapaan dan Ajakan Belajar */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-base sm:text-lg font-black text-[#123B8A] leading-tight">
                  Halo, Siswa!
                </h4>
                {/* Aksen Kuning Ceria */}
                <span className="text-[#FFD34E] text-base font-black animate-pulse">✦</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#123B8A]/80 leading-tight sm:leading-normal mt-0.5">
                Teruslah belajar dan jelajahi matematika dengan semangat!
              </p>
            </div>
          </div>

        </div>
      </main>

      {/* =========================================================================
          MODALS INTERAKTIF UNTUK FITUR DASHBOARD (Mencegah Dead Clicks)
      ========================================================================= */}

      {/* 1. Modal Info LINTERA */}
      {activeModal === 'info' && (
        <div
          className="fixed inset-0 z-50 bg-[#123B8A]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveModal(null)}
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
                  <h3 className="text-xl font-black text-[#123B8A]">Informasi LINTERA</h3>
                  <p className="text-xs text-slate-500 font-semibold">Lingkaran Interaktif untuk Matematika</p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
              <p>
                <strong>LINTERA</strong> dirancang untuk membantu siswa SMA mengeksplorasi konsep <strong>Lingkaran</strong> secara visual, interaktif, dan terstruktur.
              </p>
              <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-xs text-[#123B8A] space-y-1 font-medium">
                <p>• <strong>Materi Belajar:</strong> Teori dan konsep lingkaran yang disederhanakan.</p>
                <p>• <strong>Game & Simulasi:</strong> Eksperimen langsung dengan manipulasi geometri dinamis.</p>
                <p>• <strong>Latihan & Refleksi:</strong> Evaluasi pemahaman mandiri secara bertahap.</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-6 py-2.5 rounded-full bg-[#2875FB] hover:bg-[#1C64E8] text-white font-bold text-sm shadow-md active:scale-95 transition-all"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Modal Materi Belajar */}
      {activeModal === 'materi' && (
        <div
          className="fixed inset-0 z-50 bg-[#123B8A]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 relative border border-blue-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#2875FB] flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#123B8A]">Modul Materi Belajar</h3>
                  <p className="text-xs text-slate-500 font-semibold">Pilih topik lingkaran yang ingin dipelajari</p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5">
              <div className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-100 transition-colors flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-[#123B8A] text-sm">1. Unsur-Unsur Lingkaran</h4>
                  <p className="text-xs text-slate-500">Titik pusat, jari-jari, diameter, busur, tali busur, juring, & tembereng.</p>
                </div>
                <span className="w-7 h-7 rounded-full bg-white text-[#2875FB] flex items-center justify-center shadow-xs">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-100 transition-colors flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-[#123B8A] text-sm">2. Keliling & Luas Lingkaran</h4>
                  <p className="text-xs text-slate-500">Konstanta rasio π (pi), rumus praktis, dan pembuktian visual.</p>
                </div>
                <span className="w-7 h-7 rounded-full bg-white text-[#2875FB] flex items-center justify-center shadow-xs">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-100 transition-colors flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-[#123B8A] text-sm">3. Sudut Pusat & Sudut Keliling</h4>
                  <p className="text-xs text-slate-500">Hubungan relasi sudut yang menghadap busur yang sama.</p>
                </div>
                <span className="w-7 h-7 rounded-full bg-white text-[#2875FB] flex items-center justify-center shadow-xs">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-6 py-2.5 rounded-full bg-[#2875FB] text-white font-bold text-sm shadow-md active:scale-95"
              >
                Mulai Baca
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Modal Game Matematika */}
      {activeModal === 'game' && (
        <div
          className="fixed inset-0 z-50 bg-[#123B8A]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 relative border border-orange-100 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-14 h-14 rounded-full bg-orange-50 text-[#F57200] flex items-center justify-center mx-auto mb-3">
              <Gamepad2 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-[#123B8A] mb-1">Tantangan Game Luna</h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mb-5">
              Bantu Luna mengumpulkan buah apel di padang matematika dengan menyelesaikan kuis sudut lingkaran!
            </p>

            <div className="p-4 bg-orange-50/70 rounded-2xl border border-orange-100 text-left mb-6">
              <span className="text-[11px] font-bold text-[#F57200] uppercase tracking-wider block mb-1">Level 1: Tebak Sudut</span>
              <p className="text-xs font-semibold text-slate-700">
                Jika sudut pusat yang menghadap busur AB adalah 80°, berapakah besar sudut keliling yang menghadap busur yang sama?
              </p>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <button
                  onClick={() => alert('Hebat! Sudut keliling = 1/2 × Sudut pusat = 40°!')}
                  className="py-2 px-3 rounded-xl bg-white border border-orange-200 text-xs font-bold text-[#123B8A] hover:bg-orange-100 transition-colors"
                >
                  A. 40°
                </button>
                <button
                  onClick={() => alert('Coba lagi! Ingat rumus: Sudut keliling = 1/2 × Sudut pusat.')}
                  className="py-2 px-3 rounded-xl bg-white border border-orange-200 text-xs font-bold text-[#123B8A] hover:bg-orange-100 transition-colors"
                >
                  B. 160°
                </button>
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="px-6 py-2.5 rounded-full bg-[#F57200] hover:bg-[#E06400] text-white font-bold text-sm shadow-md"
            >
              Kembali ke Menu
            </button>
          </div>
        </div>
      )}

      {/* 4. Modal Simulasi Interaktif */}
      {activeModal === 'simulasi' && (
        <div
          className="fixed inset-0 z-50 bg-[#123B8A]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 relative border border-emerald-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#10B981] flex items-center justify-center">
                  <LineChart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#123B8A]">Simulasi Interaktif Lingkaran</h3>
                  <p className="text-xs text-slate-500 font-semibold">Eksplorasi perubahan geometri secara dinamis</p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 text-center mb-4">
              <div className="w-32 h-32 mx-auto relative rounded-full border-4 border-[#2875FB] bg-blue-50/40 flex items-center justify-center mb-3">
                <div className="w-2.5 h-2.5 bg-[#EF4444] rounded-full" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-0.5 bg-[#2875FB]" />
                <span className="absolute top-1/2 right-4 -translate-y-4 text-[10px] font-bold text-[#123B8A]">r = 7 cm</span>
              </div>
              <p className="text-xs font-bold text-slate-700">
                Keliling = 2 × π × r = 44 cm | Luas = π × r² = 154 cm²
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-6 py-2.5 rounded-full bg-[#10B981] hover:bg-[#059669] text-white font-bold text-sm shadow-md"
              >
                Selesai Eksplorasi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Modal Latihan Soal */}
      {activeModal === 'latihan' && (
        <div
          className="fixed inset-0 z-50 bg-[#123B8A]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 relative border border-purple-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#8B5CF6] flex items-center justify-center">
                  <ClipboardCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#123B8A]">Bank Latihan Soal</h3>
                  <p className="text-xs text-slate-500 font-semibold">Tingkatkan pemahaman konsep matematika</p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#123B8A] block">Paket 1: Konsep Dasar Lingkaran</span>
                  <span className="text-slate-500">10 Soal Pilihan Ganda • Tingkat Dasar</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 font-bold">Tersedia</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#123B8A] block">Paket 2: Juring, Busur, & Tembereng</span>
                  <span className="text-slate-500">10 Soal Analisis • Tingkat Menengah</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 font-bold">Tersedia</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#123B8A] block">Paket 3: Garis Singgung Persekutuan</span>
                  <span className="text-slate-500">8 Soal Aplikasi • Tingkat Lanjutan</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 font-bold">Tersedia</span>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-6 py-2.5 rounded-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-sm shadow-md"
              >
                Mulai Kerjakan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Modal Refleksi Belajar */}
      {activeModal === 'refleksi' && (
        <div
          className="fixed inset-0 z-50 bg-[#123B8A]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 relative border border-amber-100 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-14 h-14 rounded-full bg-amber-50 text-[#F59E0B] flex items-center justify-center mx-auto mb-3">
              <Lightbulb className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-[#123B8A] mb-1">Jurnal Refleksi Mandiri</h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mb-4">
              Bagaimana perasaanmu setelah mempelajari materi lingkaran hari ini?
            </p>

            <div className="grid grid-cols-3 gap-2.5 mb-5">
              <button
                onClick={() => alert('Senang mendengarnya! Terus pertahankan rasa ingin tahumu!')}
                className="p-3 rounded-2xl bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 transition-all text-center flex flex-col items-center"
              >
                <span className="text-2xl mb-1">🤩</span>
                <span className="text-xs font-bold text-[#123B8A]">Sangat Paham</span>
              </button>
              <button
                onClick={() => alert('Bagus sekali! Sedikit latihan lagi kamu akan mahir!')}
                className="p-3 rounded-2xl bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 transition-all text-center flex flex-col items-center"
              >
                <span className="text-2xl mb-1">😊</span>
                <span className="text-xs font-bold text-[#123B8A]">Cukup Paham</span>
              </button>
              <button
                onClick={() => alert('Jangan menyerah! Luna siap menemani belajar lagi lewat simulasi!')}
                className="p-3 rounded-2xl bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 transition-all text-center flex flex-col items-center"
              >
                <span className="text-2xl mb-1">🤔</span>
                <span className="text-xs font-bold text-[#123B8A]">Perlu Ulang</span>
              </button>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="px-6 py-2.5 rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-sm shadow-md"
            >
              Simpan Refleksi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
