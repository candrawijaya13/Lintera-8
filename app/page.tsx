'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Menu,
  X,
  RotateCcw,
  Sparkles,
  BookOpen,
  Info,
  Mail,
  Send,
  Layers,
  ChevronRight,
  LayoutDashboard,
  CheckCircle2
} from 'lucide-react';

export default function LinteraWelcomePage() {
  // Navigation & Modal states
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDashboardPlaceholder, setShowDashboardPlaceholder] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  // Orientation state
  const [isPortrait, setIsPortrait] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  // Testing toggle to simulate mobile portrait on desktop browser
  const [forcePortraitPreview, setForcePortraitPreview] = useState(false);

  useEffect(() => {
    const handleOrientation = () => {
      const isPortraitMode = window.innerHeight > window.innerWidth;
      const isMobile =
        window.matchMedia('(max-width: 900px)').matches ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        (window.innerWidth <= 850 && window.innerHeight > window.innerWidth);

      setIsMobileDevice(isMobile);
      setIsPortrait(isPortraitMode && isMobile);
    };

    handleOrientation();
    window.addEventListener('resize', handleOrientation);
    window.addEventListener('orientationchange', handleOrientation);

    return () => {
      window.removeEventListener('resize', handleOrientation);
      window.removeEventListener('orientationchange', handleOrientation);
    };
  }, []);

  const shouldShowOrientationOverlay = (isPortrait && isMobileDevice) || forcePortraitPreview;

  return (
    <main className="relative w-screen h-[100dvh] min-h-[500px] flex flex-col overflow-hidden bg-[#63C9F4] select-none">
      {/* =========================================================================
          PORTRAIT ROTATION OVERLAY (Active only on mobile portrait or preview)
      ========================================================================= */}
      {shouldShowOrientationOverlay && (
        <div
          id="orientation-overlay"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 text-center text-white bg-[#123B8A]/95 backdrop-blur-md transition-opacity duration-300"
          role="dialog"
          aria-modal="true"
          aria-label="Pemberitahuan Rotasi Perangkat"
        >
          <div className="relative mb-6 flex items-center justify-center">
            {/* Phone rotation icon with animated circular arrow */}
            <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-white/10 border border-white/20 shadow-inner">
              <div className="animate-rotate-phone">
                <svg
                  className="w-12 h-12 text-[#FFD34E]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
              </div>
            </div>
            {/* Curved arrow orbit */}
            <div className="absolute -inset-2 rounded-full border border-dashed border-[#FFD34E]/60 pointer-events-none animate-spin-slow" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FFD34E] mb-3 tracking-wide">
            Putar perangkatmu
          </h2>

          <p className="text-white/90 text-sm sm:text-base max-w-xs leading-relaxed font-medium mb-8">
            Gunakan posisi landscape untuk pengalaman belajar LINTERA yang lebih nyaman.
          </p>

          <div className="flex flex-col gap-3 w-full max-w-xs">
            {/* Emergency override button for testing / evaluator convenience */}
            <button
              onClick={() => {
                setForcePortraitPreview(false);
                setIsPortrait(false);
              }}
              className="px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-xs text-white/90 border border-white/30 font-semibold transition-all"
            >
              Lanjutkan tetap dalam posisi ini (Pratinjau)
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          TOP NAVBAR (Tinggi 80-100px desktop, minimalis, ceria, rounded)
      ========================================================================= */}
      <header
        className="w-full h-16 sm:h-20 lg:h-24 bg-white/95 backdrop-blur-md border-b border-blue-100/70 z-30 px-4 sm:px-8 lg:px-14 flex items-center justify-between shrink-0 shadow-sm"
        role="banner"
      >
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 group transition-transform active:scale-95"
            aria-label="LINTERA Beranda"
          >
            {/* Custom SVG Logo matching exact reference letterforms */}
            <div className="relative flex items-center">
              <span className="text-3xl sm:text-4xl lg:text-4.5xl font-black tracking-tight text-[#123B8A] font-sans flex items-center">
                L
                <span className="relative text-[#123B8A]">
                  I
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#F57200]" />
                </span>
                NTERA
              </span>
              {/* Joyful yellow smile swoop underline under 'INTE' */}
              <svg
                className="absolute -bottom-1.5 left-2 w-20 sm:w-28 text-[#FFD34E]"
                viewBox="0 0 100 16"
                fill="none"
              >
                <path
                  d="M4 4C28 14 68 14 96 4"
                  stroke="#FFD34E"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </Link>

          {/* Subtitle text */}
          <div className="hidden sm:flex flex-col border-l-2 border-blue-100 pl-3.5 py-0.5">
            <span className="text-xs sm:text-[13px] font-bold text-[#123B8A] leading-tight">
              Lingkaran Interaktif
            </span>
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 leading-tight">
              untuk Matematika SMA
            </span>
          </div>
        </div>

        {/* Right: Navigation items and Round Hamburger Button */}
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
          <nav
            className="hidden md:flex items-center gap-6 lg:gap-8 text-sm lg:text-base font-bold text-[#123B8A]"
            aria-label="Menu Utama"
          >
            <button
              onClick={() => setActiveModal('tentang')}
              className="text-[#123B8A] hover:text-[#2875FB] transition-colors py-1 relative group"
            >
              Tentang
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2875FB] rounded-full transition-all duration-200 group-hover:w-full" />
            </button>
            <button
              onClick={() => setActiveModal('fitur')}
              className="text-[#123B8A] hover:text-[#2875FB] transition-colors py-1 relative group"
            >
              Fitur
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2875FB] rounded-full transition-all duration-200 group-hover:w-full" />
            </button>
            <button
              onClick={() => setActiveModal('kontak')}
              className="text-[#123B8A] hover:text-[#2875FB] transition-colors py-1 relative group"
            >
              Kontak
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2875FB] rounded-full transition-all duration-200 group-hover:w-full" />
            </button>
          </nav>

          {/* Hamburger Menu Button (Round, matching reference design) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#EBF5FF] hover:bg-[#D7ECFF] active:scale-95 text-[#123B8A] flex items-center justify-center transition-all border border-blue-200/80 shadow-sm"
            aria-label="Buka Menu"
            title="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </header>

      {/* =========================================================================
          HERO SECTION (Horizontal 2-Column with direct Landscape background)
      ========================================================================= */}
      <section
        className="relative flex-1 w-full overflow-hidden flex items-stretch"
        style={{
          backgroundImage: "url('/assets/landscape.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
        }}
        aria-label="Bagian Sambutan LINTERA"
      >
        {/* Soft atmospheric gradient overlay to ensure text contrast while retaining full scenery vibrancy */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/20 to-transparent pointer-events-none sm:w-3/5" />

        {/* Content Container (Two columns: Text left, Luna right) */}
        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 flex flex-row items-center justify-between">
          
          {/* ---------------------------------------------------------------
              LEFT COLUMN: Sambutan, Penjelasan, & Tombol Mulai Jelajahi
          --------------------------------------------------------------- */}
          <div className="w-[56%] sm:w-[50%] lg:w-[48%] flex flex-col justify-center py-2 sm:py-6 pr-2">
            
            {/* Title with yellow playful accents */}
            <div className="relative inline-block mb-2 sm:mb-4">
              {/* Yellow playful rays / sparkles at top-left & top-right of "Halo," */}
              <div className="absolute -top-3.5 -left-3 sm:-top-5 sm:-left-5 pointer-events-none">
                <svg className="w-6 h-6 sm:w-9 sm:h-9 text-[#FFD34E]" viewBox="0 0 36 36" fill="currentColor">
                  <path d="M12 2C13 6 15 10 18 12C15 14 13 18 12 22C11 18 9 14 6 12C9 10 11 6 12 2Z" />
                </svg>
              </div>
              <div className="absolute top-1 -right-4 sm:-right-6 pointer-events-none">
                <svg className="w-4 h-4 sm:w-7 sm:h-7 text-[#FFD34E]" viewBox="0 0 36 36" fill="currentColor">
                  <path d="M18 6C19 10 21 13 24 15C21 17 19 20 18 24C17 20 15 17 12 15C15 13 17 10 18 6Z" />
                </svg>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] select-none">
                <span className="block text-[#123B8A] drop-shadow-sm">Halo,</span>
                <span className="relative inline-block text-[#F57200] drop-shadow-sm">
                  Penjelajah!
                  {/* Underline yellow curve accent below Penjelajah! */}
                  <svg
                    className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 text-[#FFD34E]"
                    viewBox="0 0 240 16"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M3 10C50 3 180 3 237 11"
                      stroke="#FFD34E"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>
            </div>

            {/* Description Text (Maksimal 3 baris pada desktop) */}
            <p className="mt-2 sm:mt-3 text-xs sm:text-base md:text-lg lg:text-xl font-bold text-[#123B8A]/90 max-w-md sm:max-w-lg leading-snug sm:leading-relaxed drop-shadow-sm">
              Siap menjelajahi dunia matematika yang seru dan menyenangkan bersama LINTERA?
            </p>

            {/* Main Action Button "Mulai Belajar" -> Navigasi ke Dashboard LINTERA */}
            <div className="mt-4 sm:mt-6 lg:mt-8">
              <Link
                href="/dashboard"
                className="group inline-flex items-center gap-3 sm:gap-4 pl-5 sm:pl-7 pr-3 sm:pr-4 py-2.5 sm:py-3.5 lg:py-4 rounded-full bg-[#2875FB] hover:bg-[#1C64E8] text-white font-extrabold text-sm sm:text-lg lg:text-xl shadow-lg hover:shadow-xl shadow-blue-500/30 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300"
                aria-label="Mulai Belajar LINTERA Dashboard"
              >
                <span>Mulai Belajar</span>
                <span className="w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-white text-[#2875FB] flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1 shadow-sm">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 stroke-[2.5]" />
                </span>
              </Link>
            </div>

            {/* Mobile test orientation helper toggle (discreet) */}
            <div className="mt-4 hidden lg:flex items-center gap-2">
              <button
                onClick={() => setForcePortraitPreview(!forcePortraitPreview)}
                className="text-[11px] text-slate-500/80 hover:text-slate-700 bg-white/40 hover:bg-white/80 px-2.5 py-1 rounded-full border border-blue-200/50 transition-all flex items-center gap-1.5"
                title="Simulasikan tampilan overlay saat perangkat diputar ke portrait"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Simulasi Layar Portrait HP</span>
              </button>
            </div>
          </div>

          {/* ---------------------------------------------------------------
              RIGHT COLUMN: Karakter Luna (Visual Utama, Tidak Terpotong)
          --------------------------------------------------------------- */}
          <div className="w-[44%] sm:w-[50%] lg:w-[52%] h-full flex items-end justify-center relative pb-1 sm:pb-3">
            
            {/* Wooden Math Signpost (+, ÷, ×) from reference design */}
            <div className="absolute right-0 sm:right-2 lg:right-6 bottom-4 sm:bottom-8 lg:bottom-12 z-10 hidden sm:flex flex-col items-center pointer-events-none select-none drop-shadow-md">
              {/* Wooden pole top */}
              <div className="w-4 sm:w-5 h-4 sm:h-6 bg-[#8B5A2B] rounded-t-sm" />
              {/* Arrow 1: Coral Red with + */}
              <div className="relative w-16 sm:w-20 lg:w-24 h-6 sm:h-8 bg-[#FF6B6B] rounded-l-md flex items-center justify-center text-white font-black text-sm sm:text-base border-y-2 border-[#D94C4C] shadow-sm transform -rotate-1">
                <span className="ml-1">+</span>
                <div className="absolute -right-2 top-0 bottom-0 w-0 h-0 border-t-[12px] sm:border-t-[16px] border-t-transparent border-b-[12px] sm:border-b-[16px] border-b-transparent border-l-[8px] border-l-[#FF6B6B]" />
              </div>
              {/* Arrow 2: Golden Yellow with ÷ */}
              <div className="relative w-16 sm:w-20 lg:w-24 h-6 sm:h-8 bg-[#FFD34E] rounded-r-md flex items-center justify-center text-white font-black text-sm sm:text-base border-y-2 border-[#D8AB24] shadow-sm my-1 transform rotate-1">
                <span className="mr-1">÷</span>
                <div className="absolute -left-2 top-0 bottom-0 w-0 h-0 border-t-[12px] sm:border-t-[16px] border-t-transparent border-b-[12px] sm:border-b-[16px] border-b-transparent border-r-[8px] border-r-[#FFD34E]" />
              </div>
              {/* Arrow 3: Sky Blue with × */}
              <div className="relative w-16 sm:w-20 lg:w-24 h-6 sm:h-8 bg-[#54A0FF] rounded-l-md flex items-center justify-center text-white font-black text-sm sm:text-base border-y-2 border-[#377ED8] shadow-sm transform -rotate-1">
                <span className="ml-1">×</span>
                <div className="absolute -right-2 top-0 bottom-0 w-0 h-0 border-t-[12px] sm:border-t-[16px] border-t-transparent border-b-[12px] sm:border-b-[16px] border-b-transparent border-l-[8px] border-l-[#54A0FF]" />
              </div>
              {/* Pole base in grass */}
              <div className="w-4 sm:w-5 h-12 sm:h-20 bg-[#8B5A2B] rounded-b-sm" />
            </div>

            {/* Floating Pi (π) Star Icon above Luna's tail from reference */}
            <div className="absolute top-4 sm:top-8 right-12 sm:right-28 lg:right-36 z-10 hidden sm:flex items-center gap-1.5 pointer-events-none drop-shadow-sm">
              <svg className="w-6 h-6 text-[#FFD34E]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {/* Dashed flight trail */}
              <span className="text-xs sm:text-sm font-black text-[#2875FB]/70 tracking-widest">
                ·· π ··
              </span>
            </div>

            {/* LUNA CHARACTER (Original Asset, object-fit contain, no clipping) */}
            <div className="relative w-full h-[85%] max-h-[580px] flex items-end justify-center animate-gentle-bob">
              <Image
                src="/assets/luna.png"
                alt="Luna, rubah oranye penjelajah ceria maskot LINTERA"
                width={800}
                height={600}
                priority
                className="w-auto h-full max-h-[95%] object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)] pointer-events-none"
              />
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          HAMBURGER / DRAWER MOBILE MENU
      ========================================================================= */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm flex justify-end"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-72 sm:w-80 h-full bg-white shadow-2xl p-6 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-[#123B8A]">Menu LINTERA</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveModal('tentang');
                  }}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl hover:bg-blue-50 text-[#123B8A] font-bold text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Info className="w-5 h-5 text-[#2875FB]" />
                    <span>Tentang LINTERA</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveModal('fitur');
                  }}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl hover:bg-blue-50 text-[#123B8A] font-bold text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Layers className="w-5 h-5 text-[#F57200]" />
                    <span>Fitur Pembelajaran</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveModal('kontak');
                  }}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl hover:bg-blue-50 text-[#123B8A] font-bold text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#FFD34E]" />
                    <span>Kontak & Pengembang</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-400 font-medium">
                © 2026 LINTERA • Matematika SMA Menyenangkan
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: TENTANG LINTERA
      ========================================================================= */}
      {activeModal === 'tentang' && (
        <div
          className="fixed inset-0 z-50 bg-[#123B8A]/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 relative overflow-hidden animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2875FB] flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#123B8A]">
                    Tentang LINTERA
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    Lingkaran Interaktif untuk Matematika
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                <strong className="text-[#123B8A]">LINTERA</strong> adalah media pembelajaran matematika interaktif berbasis web yang dirancang khusus untuk membantu siswa SMA memahami materi <strong>Lingkaran</strong> secara visual, intuitif, dan bermakna.
              </p>
              <p>
                Bersama <strong>Luna</strong>, rubah penjelajah yang ceria dan penuh rasa ingin tahu, siswa diajak mengeksplorasi konsep keliling, luas, sudut pusat, sudut keliling, garis singgung, hingga aplikasi lingkaran dalam kehidupan nyata tanpa rasa takut atau bosan.
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-6 py-2.5 rounded-full bg-[#2875FB] hover:bg-[#1C64E8] text-white font-bold text-sm transition-all shadow-md active:scale-95"
              >
                Mengerti
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: FITUR LINTERA
      ========================================================================= */}
      {activeModal === 'fitur' && (
        <div
          className="fixed inset-0 z-50 bg-[#123B8A]/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#F57200] flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#123B8A]">
                    Fitur Pembelajaran
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    Eksplorasi matematika interaktif
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100">
                <h4 className="font-bold text-[#123B8A] text-sm mb-1">
                  1. Laboratorium Lingkaran
                </h4>
                <p className="text-xs text-slate-600">
                  Ubah jari-jari secara dinamis dan amati perubahan keliling, luas, serta rasio konstanta π secara langsung.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100">
                <h4 className="font-bold text-[#123B8A] text-sm mb-1">
                  2. Sudut & Tali Busur
                </h4>
                <p className="text-xs text-slate-600">
                  Tarik titik-titik pada keliling lingkaran untuk membuktikan sifat sudut pusat dan sudut keliling seketika.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <h4 className="font-bold text-[#123B8A] text-sm mb-1">
                  3. Juring & Tembereng
                </h4>
                <p className="text-xs text-slate-600">
                  Visualisasi potongan kue lingkaran dan perhitungan luas tembereng dengan langkah yang mudah dimengerti.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100">
                <h4 className="font-bold text-[#123B8A] text-sm mb-1">
                  4. Misi Petualangan Luna
                </h4>
                <p className="text-xs text-slate-600">
                  Kuis gamifikasi bergradasi dengan feedback langsung dari Luna untuk menguji pemahaman siswa.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-6 py-2.5 rounded-full bg-[#2875FB] hover:bg-[#1C64E8] text-white font-bold text-sm transition-all shadow-md active:scale-95"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: KONTAK
      ========================================================================= */}
      {activeModal === 'kontak' && (
        <div
          className="fixed inset-0 z-50 bg-[#123B8A]/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#63C9F4] flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#2875FB]" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#123B8A]">
                    Hubungi Tim LINTERA
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    Saran & masukan untuk pembelajaran matematika
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {contactSuccess ? (
              <div className="py-8 text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-[#123B8A]">Pesan Terkirim!</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Terima kasih atas dukungannya untuk media pembelajaran matematika LINTERA.
                </p>
                <button
                  onClick={() => {
                    setContactSuccess(false);
                    setActiveModal(null);
                  }}
                  className="mt-5 px-5 py-2 rounded-full bg-[#2875FB] text-white font-bold text-xs"
                >
                  Kembali
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setContactSuccess(true);
                }}
                className="space-y-3"
              >
                <div>
                  <label className="block text-xs font-bold text-[#123B8A] mb-1">
                    Nama Kamu
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nama siswa atau pendidik..."
                    className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2875FB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#123B8A] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="nama@sekolah.sch.id"
                    className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2875FB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#123B8A] mb-1">
                    Pesan / Saran
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tuliskan saran perbaikan materi lingkaran atau fitur..."
                    className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2875FB]"
                  />
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 rounded-full text-slate-500 text-xs font-bold hover:bg-slate-100"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-[#2875FB] hover:bg-[#1C64E8] text-white text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Pesan</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL / VIEW: PLACEHOLDER DASHBOARD
          "Ketika tombol diklik, arahkan ke halaman Dashboard.
           Jika halaman Dashboard belum dibuat, buat placeholder sederhana yang bisa dikembangkan nanti."
      ========================================================================= */}
      {showDashboardPlaceholder && (
        <div
          className="fixed inset-0 z-50 bg-[#123B8A]/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 relative text-center overflow-hidden border border-blue-100">
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#63C9F4] via-[#2875FB] to-[#FFD34E]" />

            <div className="w-16 h-16 rounded-full bg-blue-50 text-[#2875FB] flex items-center justify-center mx-auto mb-4 border border-blue-100">
              <LayoutDashboard className="w-8 h-8" />
            </div>

            <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-[#F57200] font-black text-xs uppercase tracking-wider mb-2">
              Gerbang Dashboard Pembelajaran
            </span>

            <h3 className="text-2xl sm:text-3xl font-black text-[#123B8A] mb-2">
              Selamat Datang di LINTERA!
            </h3>

            <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-6 font-medium">
              Luna sedang menyiapkan papan petualangan materi lingkaran. Halaman Dashboard utama siap disambungkan ke tahap pengembangan berikutnya!
            </p>

            {/* Quick Preview of Upcoming Modules */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 text-left">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center">
                <span className="w-7 h-7 rounded-full bg-blue-100 text-[#2875FB] font-bold text-xs flex items-center justify-center mb-1.5">
                  1
                </span>
                <span className="text-[11px] font-bold text-[#123B8A]">
                  Unsur Lingkaran
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center">
                <span className="w-7 h-7 rounded-full bg-amber-100 text-[#F57200] font-bold text-xs flex items-center justify-center mb-1.5">
                  2
                </span>
                <span className="text-[11px] font-bold text-[#123B8A]">
                  Keliling & Luas
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center">
                <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 font-bold text-xs flex items-center justify-center mb-1.5">
                  3
                </span>
                <span className="text-[11px] font-bold text-[#123B8A]">
                  Sudut & Busur
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setShowDashboardPlaceholder(false)}
                className="px-6 py-2.5 rounded-full bg-[#123B8A] hover:bg-[#0E2F6E] active:scale-95 text-white font-bold text-sm transition-all shadow-md"
              >
                Kembali ke Welcome Page
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
