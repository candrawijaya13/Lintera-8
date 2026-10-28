'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, GitCommit, Sparkles, CheckCircle2 } from 'lucide-react';

export default function KedudukanGarisPage() {
  // Line: y = mx + c with circle x^2 + y^2 = 25 (r = 5)
  // Let m = 0 for pure horizontal line y = c (simple, visual, clear)
  // Or general line. When y = c, x^2 + c^2 = 25 => x^2 = 25 - c^2 => D ~ 25 - c^2
  const [lineC, setLineC] = useState<number>(3); // y = 3
  const radius = 5;

  const diff = radius * radius - lineC * lineC;

  let stateTitle = '';
  let stateBadge = '';
  let stateDesc = '';
  let stateD = '';
  let lineColor = '';

  if (Math.abs(lineC) < radius) {
    stateTitle = 'Garis Memotong Lingkaran di 2 Titik';
    stateBadge = 'bg-blue-100 text-[#2563EB] border-blue-200';
    stateDesc = 'Garis membelah lingkaran sehingga memiliki 2 titik potong (garis sekan).';
    stateD = 'D > 0 (D bernilai positif)';
    lineColor = '#2563EB';
  } else if (Math.abs(lineC) === radius) {
    stateTitle = 'Garis Menyinggung Lingkaran di 1 Titik';
    stateBadge = 'bg-red-100 text-red-800 border-red-200';
    stateDesc = 'Garis menyentuh tepat di satu titik pada keliling lingkaran (garis singgung/tangen).';
    stateD = 'D = 0 (D sama dengan nol)';
    lineColor = '#EF4444';
  } else {
    stateTitle = 'Garis Tidak Memotong / Di Luar Lingkaran';
    stateBadge = 'bg-purple-100 text-purple-800 border-purple-200';
    stateDesc = 'Garis berada sepenuhnya di luar lingkaran dan tidak memiliki titik sekutu.';
    stateD = 'D < 0 (D bernilai negatif)';
    lineColor = '#8B5CF6';
  }

  return (
    <div className="relative min-h-screen w-full bg-[#63C9F4] font-sans select-none flex flex-col justify-between p-4 sm:p-8">
      {/* Top Header */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between pb-4">
        <Link
          href="/materi"
          className="w-11 h-11 rounded-full bg-white text-[#2875FB] hover:text-[#1C64E8] flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all border border-blue-100"
          aria-label="Kembali ke Materi Belajar"
          title="Kembali ke Materi Belajar"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </Link>

        <div className="text-center">
          <span className="text-xs font-black uppercase tracking-wider text-white/90 bg-white/20 px-3 py-1 rounded-full">
            Materi 3 • Analisis Diskriminan (D)
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-[#123B8A] drop-shadow-xs mt-1">
            Kedudukan Garis pada Lingkaran
          </h1>
        </div>

        <div className="w-11" />
      </header>

      {/* Main Content */}
      <main className="w-full max-w-6xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: Visual Plane with Circle and Moving Line */}
        <div className="lg:col-span-6 bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-white flex flex-col items-center justify-between">
          <div className="w-full flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Lingkaran x² + y² = 25 & Garis y = {lineC}</span>
            <span className={`text-xs font-black px-3 py-1 rounded-full border ${stateBadge}`}>
              {stateD}
            </span>
          </div>

          {/* Canvas SVG */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center my-4 bg-slate-50 rounded-2xl border border-slate-100 p-2">
            <svg viewBox="-8 -8 16 16" className="w-full h-full">
              {/* Grid Lines */}
              {[-6, -4, -2, 2, 4, 6].map((coord) => (
                <g key={coord}>
                  <line x1={coord} y1="-7.5" x2={coord} y2="7.5" stroke="#E2E8F0" strokeWidth="0.08" />
                  <line x1="-7.5" y1={coord} x2="7.5" y2={coord} stroke="#E2E8F0" strokeWidth="0.08" />
                </g>
              ))}

              {/* Sumbu Koordinat */}
              <line x1="-7.5" y1="0" x2="7.5" y2="0" stroke="#94A3B8" strokeWidth="0.15" />
              <line x1="0" y1="-7.5" x2="0" y2="7.5" stroke="#94A3B8" strokeWidth="0.15" />

              {/* Lingkaran x² + y² = 25 (r = 5) */}
              <circle cx="0" cy="0" r="5" stroke="#2563EB" strokeWidth="0.35" fill="#3B82F6" fillOpacity="0.08" />

              {/* Garis Horizontal y = lineC */}
              <line
                x1="-7"
                y1={-lineC}
                x2="7"
                y2={-lineC}
                stroke={lineColor}
                strokeWidth="0.3"
                className="transition-all duration-200"
              />

              {/* Titik Perpotongan / Singgung */}
              {diff > 0 && (
                <>
                  <circle cx={Math.sqrt(diff)} cy={-lineC} r="0.45" fill={lineColor} stroke="#FFFFFF" strokeWidth="0.1" />
                  <circle cx={-Math.sqrt(diff)} cy={-lineC} r="0.45" fill={lineColor} stroke="#FFFFFF" strokeWidth="0.1" />
                </>
              )}
              {diff === 0 && (
                <circle cx={0} cy={-lineC} r="0.55" fill={lineColor} stroke="#FFFFFF" strokeWidth="0.15" />
              )}

              {/* Titik Pusat O */}
              <circle cx="0" cy="0" r="0.35" fill="#123B8A" />
            </svg>
          </div>

          {/* Banner Status Hasil */}
          <div className={`w-full p-3.5 rounded-2xl border text-center ${stateBadge}`}>
            <span className="font-black text-sm block">{stateTitle}</span>
            <span className="text-xs font-semibold mt-0.5 block">{stateDesc}</span>
          </div>
        </div>

        {/* Right Column: Theory, Slider & Presets */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-4">
          
          {/* Card Teori Diskriminan (D) */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-xl border-4 border-white flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#10B981] flex items-center justify-center">
                <GitCommit className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Metode Diskriminan</span>
                <h3 className="text-xl font-black text-[#123B8A]">D = b² - 4ac</h3>
              </div>
            </div>

            <div className="space-y-2 text-xs font-bold text-slate-700">
              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-between">
                <span>1. D &gt; 0 (Memotong 2 Titik):</span>
                <span className="font-mono text-[#2563EB]">Garis Sekan</span>
              </div>
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-100 flex items-center justify-between">
                <span>2. D = 0 (Menyinggung 1 Titik):</span>
                <span className="font-mono text-red-700">Garis Singgung (Tangen)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-between">
                <span>3. D &lt; 0 (Tidak Memotong):</span>
                <span className="font-mono text-purple-700">Garis Luar</span>
              </div>
            </div>
          </div>

          {/* Slider Pengatur Posisi Garis */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-xl border-4 border-white flex flex-col gap-4">
            <span className="text-xs font-bold text-slate-500">Geser Posisi Garis (y = c):</span>

            <div>
              <div className="flex justify-between text-xs font-bold text-[#123B8A] mb-1">
                <span>Konstanta c:</span>
                <span className="font-mono bg-blue-50 px-2.5 py-0.5 rounded font-black text-[#2875FB]">
                  y = {lineC}
                </span>
              </div>
              <input
                type="range"
                min="-7"
                max="7"
                value={lineC}
                onChange={(e) => setLineC(parseInt(e.target.value))}
                className="w-full accent-[#10B981] cursor-pointer"
              />
            </div>

            {/* Tombol Cepat 3 Kasus */}
            <div className="pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 block mb-2">Uji Cepat 3 Kondisi:</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setLineC(3)}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all text-center ${
                    Math.abs(lineC) < radius ? 'bg-blue-100 text-[#2563EB] ring-2 ring-blue-300' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  D &gt; 0 (y = 3)
                </button>
                <button
                  onClick={() => setLineC(5)}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all text-center ${
                    Math.abs(lineC) === radius ? 'bg-red-100 text-red-700 ring-2 ring-red-300' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  D = 0 (y = 5)
                </button>
                <button
                  onClick={() => setLineC(7)}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all text-center ${
                    Math.abs(lineC) > radius ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-300' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  D &lt; 0 (y = 7)
                </button>
              </div>
            </div>
          </div>

          {/* Luna Note */}
          <div className="bg-[#DCFCE7] border border-emerald-200 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#10B981] border-2 border-white overflow-hidden shrink-0 flex items-center justify-center">
              <Image src="/assets/luna.png" alt="Luna" width={60} height={60} className="object-cover object-top" />
            </div>
            <p className="text-xs sm:text-sm font-bold text-[#064E3B] leading-snug">
              <strong>Tips dari Luna:</strong> Garis singgung adalah garis yang tegak lurus dengan jari-jari lingkaran pada titik singgungnya. Nilai diskriminannya selalu tepat $0$!
            </p>
          </div>

        </div>

      </main>
    </div>
  );
}
