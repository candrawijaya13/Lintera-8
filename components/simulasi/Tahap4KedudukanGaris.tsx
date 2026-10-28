'use client';

import React, { useState, useRef, useCallback } from 'react';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Sparkles,
  Target,
  Compass,
  Trophy,
  Sliders
} from 'lucide-react';

interface Tahap4Props {
  onSuccess: () => void;
  onFinishAll: () => void;
}

interface LineMission {
  id: number;
  circleA: number;
  circleB: number;
  circleR: number;
  requestedCondition: 'intersect' | 'tangent' | 'outside';
  title: string;
  instruction: string;
}

const MISSIONS: LineMission[] = [
  {
    id: 1,
    circleA: 0,
    circleB: 0,
    circleR: 4,
    requestedCondition: 'intersect',
    title: 'Eksplorasi 1: Garis Secan (Memotong di 2 Titik)',
    instruction: 'Atur posisi dan kemiringan garis agar MEMOTONG lingkaran x² + y² = 16 di DUA titik yang berbeda!',
  },
  {
    id: 2,
    circleA: 0,
    circleB: 0,
    circleR: 4,
    requestedCondition: 'tangent',
    title: 'Eksplorasi 2: Garis Singgung Lingkaran (Tepat 1 Titik)',
    instruction: 'Tantangan Presisi: Atur garis agar MENYINGGUNG lingkaran tepat di SATU titik! (Tips: geser konstanta c hingga jarak garis ke pusat sama dengan jari-jari r = 4, misal y = 4 atau x = 4).',
  },
  {
    id: 3,
    circleA: 0,
    circleB: 0,
    circleR: 4,
    requestedCondition: 'outside',
    title: 'Eksplorasi 3: Garis di Luar Lingkaran (Tidak Berpotongan)',
    instruction: 'Atur garis agar berada DI LUAR lingkaran dan sama sekali tidak memiliki titik persekutuan.',
  },
];

const STEP_GRID = 34; // 34px per unit
const ORIGIN_X = 270;
const ORIGIN_Y = 210;
const SVG_W = 540;
const SVG_H = 420;

export default function Tahap4KedudukanGaris({ onSuccess, onFinishAll }: Tahap4Props) {
  const [missionIndex, setMissionIndex] = useState<number>(0);
  const currentMission = MISSIONS[missionIndex];

  // Line Equation: y = m*x + c (or x = k if vertical)
  // Let's use slope m and y-intercept c
  const [slopeM, setSlopeM] = useState<number>(0); // horizontal by default
  const [interceptC, setInterceptC] = useState<number>(2); // offset

  // Prediction: 'intersect' | 'tangent' | 'outside' | null
  const [prediction, setPrediction] = useState<'intersect' | 'tangent' | 'outside' | null>(null);

  // Feedback state
  const [feedback, setFeedback] = useState<{
    status: 'correct' | 'wrong' | null;
    message: string;
    condition: 'intersect' | 'tangent' | 'outside';
    d: number;
    r: number;
    discriminantSign: string;
    details: string;
    intersectionPoints?: Array<{ x: number; y: number }>;
  } | null>(null);

  const svgRef = useRef<SVGSVGElement | null>(null);

  // Math to SVG pixels
  const mathToSvg = (x: number, y: number) => ({
    px: ORIGIN_X + x * STEP_GRID,
    py: ORIGIN_Y - y * STEP_GRID,
  });

  // Calculate Distance from Center (a, b) to Line: m*x - y + c = 0
  // Line: A*x + B*y + C = 0 -> A = m, B = -1, C = c
  const a = currentMission.circleA;
  const b = currentMission.circleB;
  const r = currentMission.circleR;

  const A = slopeM;
  const B = -1;
  const C = interceptC;

  // d = |A*a + B*b + C| / sqrt(A^2 + B^2)
  const dist = Math.abs(A * a + B * b + C) / Math.hypot(A, B);

  // Accurate condition determination
  const tolerance = 0.12; // tolerance for tangent line
  let currentCondition: 'intersect' | 'tangent' | 'outside' = 'outside';
  if (Math.abs(dist - r) <= tolerance) {
    currentCondition = 'tangent';
  } else if (dist < r) {
    currentCondition = 'intersect';
  } else {
    currentCondition = 'outside';
  }

  // Calculate intersection points:
  // Circle: (x - a)^2 + (y - b)^2 = r^2
  // Line: y = m*x + c -> y - b = m*x + (c - b)
  // Let X = x - a, Y = y - b = m*(X + a) + (c - b) = m*X + (m*a + c - b)
  // Let k = m*a + c - b
  // X^2 + (m*X + k)^2 = r^2
  // X^2 * (1 + m^2) + 2*m*k*X + (k^2 - r^2) = 0
  const k = slopeM * a + interceptC - b;
  const qa = 1 + slopeM * slopeM;
  const qb = 2 * slopeM * k;
  const qc = k * k - r * r;
  const D = qb * qb - 4 * qa * qc;

  const intersectionPoints: Array<{ x: number; y: number }> = [];
  if (D >= -0.05) {
    const validD = Math.max(0, D);
    const X1 = (-qb + Math.sqrt(validD)) / (2 * qa);
    const X2 = (-qb - Math.sqrt(validD)) / (2 * qa);

    const x1 = X1 + a;
    const y1 = slopeM * x1 + interceptC;
    const x2 = X2 + a;
    const y2 = slopeM * x2 + interceptC;

    if (Math.abs(x1 - x2) < 0.05 && Math.abs(y1 - y2) < 0.05) {
      intersectionPoints.push({ x: x1, y: y1 });
    } else {
      intersectionPoints.push({ x: x1, y: y1 });
      intersectionPoints.push({ x: x2, y: y2 });
    }
  }

  // Generate SVG Line coordinates spanning the view (-8 to +8)
  const pStart = mathToSvg(-7.5, slopeM * -7.5 + interceptC);
  const pEnd = mathToSvg(7.5, slopeM * 7.5 + interceptC);
  const circlePix = mathToSvg(a, b);

  const handlePeriksa = () => {
    const isTargetAchieved = currentCondition === currentMission.requestedCondition;
    const isPredictionCorrect = prediction === null || prediction === currentCondition;

    let conditionName = '';
    let details = '';

    if (currentCondition === 'intersect') {
      conditionName = 'Garis MEMOTONG lingkaran di DUA titik berbeda (Garis Secan).';
      details = `Jarak dari pusat ke garis (d = ${dist.toFixed(2)}) LEBIH KECIL dari jari-jari (r = ${r}). Nilai diskriminan D > 0 (${D.toFixed(1)}). Memotong di titik: ${intersectionPoints
        .map((p) => `(${p.x.toFixed(1)}, ${p.y.toFixed(1)})`)
        .join(' dan ')}.`;
    } else if (currentCondition === 'tangent') {
      conditionName = 'Garis MENYINGGUNG lingkaran tepat di SATU titik (Garis Singgung).';
      details = `Jarak dari pusat ke garis (d = ${dist.toFixed(2)}) SAMA DENGAN jari-jari (r = ${r}). Nilai diskriminan D = 0. Titik singgung berada di sekitar (${intersectionPoints[0]?.x.toFixed(
        1
      )}, ${intersectionPoints[0]?.y.toFixed(1)}).`;
    } else {
      conditionName = 'Garis berada DI LUAR lingkaran dan TIDAK BERPOTONGAN.';
      details = `Jarak dari pusat ke garis (d = ${dist.toFixed(2)}) LEBIH BESAR dari jari-jari (r = ${r}). Nilai diskriminan D < 0 (${D.toFixed(1)}). Tidak ada titik persekutuan.`;
    }

    if (isTargetAchieved) {
      setFeedback({
        status: 'correct',
        message: `Bagus! Kamu berhasil memenuhi target: ${conditionName}`,
        condition: currentCondition,
        d: dist,
        r,
        discriminantSign: D > 0.05 ? 'D > 0' : Math.abs(D) <= 0.05 ? 'D = 0' : 'D < 0',
        details: `${details} ${
          prediction ? (isPredictionCorrect ? 'Prediksimu juga terbukti tepat!' : 'Namun prediksimu berbeda.') : ''
        }`,
        intersectionPoints,
      });
      onSuccess();
    } else {
      setFeedback({
        status: 'wrong',
        message: `Kondisi saat ini belum sesuai target misi (${conditionName}).`,
        condition: currentCondition,
        d: dist,
        r,
        discriminantSign: D > 0.05 ? 'D > 0' : Math.abs(D) <= 0.05 ? 'D = 0' : 'D < 0',
        details: `Misi meminta kondisi '${
          currentMission.requestedCondition === 'intersect'
            ? 'MEMOTONG di 2 titik'
            : currentMission.requestedCondition === 'tangent'
            ? 'MENYINGGUNG tepat 1 titik'
            : 'DI LUAR lingkaran'
        }'. ${details}`,
        intersectionPoints,
      });
    }
  };

  const handleNextMission = () => {
    if (missionIndex < MISSIONS.length - 1) {
      setMissionIndex((prev) => prev + 1);
      setSlopeM(0);
      setInterceptC(2);
      setPrediction(null);
      setFeedback(null);
    } else {
      onFinishAll();
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl border border-blue-50 space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-black uppercase tracking-wider">
            Tahap 4 • Hubungan Garis & Lingkaran
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#123B8A] mt-1">
            Kedudukan Garis terhadap Lingkaran
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Misi:</span>
          <span className="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-800 font-black text-xs">
            {missionIndex + 1} / {MISSIONS.length}
          </span>
        </div>
      </div>

      {/* Target Mission Banner */}
      <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-200 flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 font-black text-sm">
          <Target className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <span className="text-[11px] font-black text-rose-800 uppercase tracking-wider block">
            {currentMission.title}
          </span>
          <p className="text-xs sm:text-sm font-black text-[#123B8A] mt-0.5 leading-snug">
            {currentMission.instruction}
          </p>
        </div>
      </div>

      {/* Grid Canvas & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* SVG Cartesian Canvas */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative w-full max-w-[540px] aspect-[14/11] bg-white rounded-2xl border-2 border-slate-300 overflow-hidden shadow-inner select-none">
            <svg ref={svgRef} viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full h-full">
              {/* Minor grid */}
              {Array.from({ length: 17 }).map((_, i) => {
                const xVal = ORIGIN_X + (i - 8) * STEP_GRID;
                return (
                  <line
                    key={`gx-${i}`}
                    x1={xVal}
                    y1={0}
                    x2={xVal}
                    y2={SVG_H}
                    stroke="#F1F5F9"
                    strokeWidth="1"
                  />
                );
              })}
              {Array.from({ length: 13 }).map((_, i) => {
                const yVal = ORIGIN_Y + (i - 6) * STEP_GRID;
                return (
                  <line
                    key={`gy-${i}`}
                    x1={0}
                    y1={yVal}
                    x2={SVG_W}
                    y2={yVal}
                    stroke="#F1F5F9"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Sumbu X & Y */}
              <line x1={0} y1={ORIGIN_Y} x2={SVG_W} y2={ORIGIN_Y} stroke="#475569" strokeWidth="2" />
              <line x1={ORIGIN_X} y1={0} x2={ORIGIN_X} y2={SVG_H} stroke="#475569" strokeWidth="2" />

              {/* Ticks and Labels */}
              {[-6, -4, -2, 2, 4, 6].map((num) => (
                <text
                  key={`nx-${num}`}
                  x={ORIGIN_X + num * STEP_GRID}
                  y={ORIGIN_Y + 14}
                  textAnchor="middle"
                  className="text-[9px] font-bold fill-slate-400"
                >
                  {num}
                </text>
              ))}
              {[-4, -2, 2, 4].map((num) => (
                <text
                  key={`ny-${num}`}
                  x={ORIGIN_X - 8}
                  y={ORIGIN_Y - num * STEP_GRID + 3}
                  textAnchor="end"
                  className="text-[9px] font-bold fill-slate-400"
                >
                  {num}
                </text>
              ))}

              {/* Lingkaran */}
              <circle
                cx={circlePix.px}
                cy={circlePix.py}
                r={r * STEP_GRID}
                fill="#FFE4E6"
                fillOpacity="0.4"
                stroke="#F43F5E"
                strokeWidth="3"
              />
              <circle cx={circlePix.px} cy={circlePix.py} r="5" fill="#BE123C" />
              <text
                x={circlePix.px + 8}
                y={circlePix.py - 6}
                className="text-[10px] font-black fill-[#BE123C]"
              >
                Pusat ({a}, {b})
              </text>

              {/* Garis Lurus Interaktif */}
              <line
                x1={pStart.px}
                y1={pStart.py}
                x2={pEnd.px}
                y2={pEnd.py}
                stroke={
                  currentCondition === 'intersect'
                    ? '#2563EB'
                    : currentCondition === 'tangent'
                    ? '#16A34A'
                    : '#94A3B8'
                }
                strokeWidth="3.5"
              />

              {/* Titik Perpotongan / Titik Singgung Lingkaran */}
              {intersectionPoints.map((pt, idx) => {
                const ptPix = mathToSvg(pt.x, pt.y);
                return (
                  <g key={`pt-${idx}`} transform={`translate(${ptPix.px}, ${ptPix.py})`}>
                    <circle r="6" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
                    <text
                      x="10"
                      y="4"
                      className="text-[10px] font-black fill-[#B45309] drop-shadow-xs"
                    >
                      ({pt.x.toFixed(1)}, {pt.y.toFixed(1)})
                    </text>
                  </g>
                );
              })}

              {/* Label Persamaan Garis di Sisi */}
              <text
                x={pEnd.px - 10}
                y={pEnd.py - 10}
                textAnchor="end"
                className="text-[11px] font-black fill-[#1E293B] drop-shadow-xs"
              >
                g: y = {slopeM !== 0 ? `${slopeM}x + ` : ''}
                {interceptC}
              </text>
            </svg>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 mt-2">
            💡 Gunakan slider di sebelah kanan untuk menggeser posisi garis (c) dan memutar kemiringannya (m).
          </span>
        </div>

        {/* Sliders & Math Inspector */}
        <div className="lg:col-span-5 space-y-4">
          {/* Sliders for line position & rotation */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3.5">
            <div className="flex items-center gap-2 text-xs font-black text-[#123B8A] uppercase tracking-wider">
              <Sliders className="w-4 h-4 text-[#2875FB]" />
              <span>Kontrol Posisi & Rotasi Garis</span>
            </div>

            {/* Slider 1: Pergeseran Posisi / Intercept c */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Pergeseran Garis (c):</span>
                <span className="text-[#2875FB] font-mono font-black">{interceptC}</span>
              </div>
              <input
                type="range"
                min="-6"
                max="6"
                step="0.5"
                value={interceptC}
                onChange={(e) => {
                  setInterceptC(parseFloat(e.target.value));
                  setFeedback(null);
                }}
                className="w-full accent-[#2875FB] cursor-pointer"
              />
            </div>

            {/* Slider 2: Kemiringan / Rotasi Gradien m */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Kemiringan / Sudut (m):</span>
                <span className="text-[#2875FB] font-mono font-black">{slopeM}</span>
              </div>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.5"
                value={slopeM}
                onChange={(e) => {
                  setSlopeM(parseFloat(e.target.value));
                  setFeedback(null);
                }}
                className="w-full accent-[#2875FB] cursor-pointer"
              />
            </div>
          </div>

          {/* Real-time Geometry Monitor */}
          <div className="p-3.5 bg-white rounded-2xl border border-slate-200 space-y-2 text-xs font-bold text-slate-700">
            <div className="flex justify-between items-center">
              <span>Jarak Pusat ke Garis (d):</span>
              <span className="font-mono text-sm text-[#123B8A]">{dist.toFixed(2)} sat</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Jari-jari Lingkaran (r):</span>
              <span className="font-mono text-sm text-rose-600">{r} sat</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Jumlah Titik Potong:</span>
              <span className="font-mono text-sm font-black text-amber-600">
                {intersectionPoints.length} Titik
              </span>
            </div>
          </div>

          {/* Prediction Box */}
          <div className="p-3.5 bg-rose-50/70 rounded-2xl border border-rose-100 space-y-2">
            <span className="text-xs font-black text-[#123B8A] block">
              Prediksi Kedudukan Garis Saat Ini:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'intersect', label: 'Memotong (2 Titik)' },
                { id: 'tangent', label: 'Menyinggung (1 Titik)' },
                { id: 'outside', label: 'Di Luar (0 Titik)' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setPrediction(opt.id as 'intersect' | 'tangent' | 'outside')}
                  className={`py-2 px-1 rounded-xl text-[11px] font-black transition-all cursor-pointer ${
                    prediction === opt.id
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Periksa Button */}
          <button
            onClick={handlePeriksa}
            className="w-full py-3 rounded-2xl bg-[#2875FB] hover:bg-[#1C64E8] text-white font-black text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Periksa Kedudukan Garis</span>
          </button>
        </div>
      </div>

      {/* Umpan Balik Cerdas */}
      {feedback && (
        <div
          className={`p-4 sm:p-5 rounded-2xl border-2 flex items-start gap-3 animate-fade-in ${
            feedback.status === 'correct'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-rose-50 border-rose-300 text-rose-950'
          }`}
        >
          {feedback.status === 'correct' ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
          )}
          <div className="space-y-1.5 flex-1">
            <p className="text-sm font-black leading-snug">{feedback.message}</p>
            <p className="text-xs font-semibold text-slate-700 leading-relaxed">
              {feedback.details}
            </p>
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
        <button
          onClick={() => {
            setSlopeM(0);
            setInterceptC(2);
            setPrediction(null);
            setFeedback(null);
          }}
          className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Garis</span>
        </button>

        {feedback?.status === 'correct' && (
          <button
            onClick={handleNextMission}
            className="px-6 py-2.5 rounded-full bg-[#10B981] hover:bg-[#059669] text-white font-black text-xs sm:text-sm shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-2"
          >
            <span>
              {missionIndex < MISSIONS.length - 1
                ? 'Eksplorasi Berikutnya'
                : 'Selesaikan Seluruh Simulasi! 🎉'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
