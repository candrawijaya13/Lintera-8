'use client';

import React, { useState, useRef, useCallback } from 'react';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Target,
  Maximize2,
  Check
} from 'lucide-react';

interface Tahap3Props {
  onSuccess: () => void;
  onNextStage: () => void;
}

interface PointMission {
  id: number;
  circleA: number; // center x
  circleB: number; // center y
  circleR: number; // radius
  requestedPosition: 'inside' | 'on' | 'outside';
  title: string;
  instruction: string;
}

const MISSIONS: PointMission[] = [
  {
    id: 1,
    circleA: 0,
    circleB: 0,
    circleR: 5,
    requestedPosition: 'inside',
    title: 'Eksplorasi 1: Titik Di Dalam Lingkaran',
    instruction: 'Geser titik P ke posisi mana saja DI DALAM lingkaran x² + y² = 25 (r = 5). Amati nilai jarak dan kuasanya!',
  },
  {
    id: 2,
    circleA: 0,
    circleB: 0,
    circleR: 5,
    requestedPosition: 'on',
    title: 'Eksplorasi 2: Titik Tepat Pada Keliling Lingkaran',
    instruction: 'Tantangan Presisi: Geser titik P agar berada TEPAT PADA keliling lingkaran x² + y² = 25! (Tips: coba (3,4), (4,3), (5,0), (0,5), dll).',
  },
  {
    id: 3,
    circleA: 1,
    circleB: -1,
    circleR: 3,
    requestedPosition: 'outside',
    title: 'Eksplorasi 3: Titik Di Luar Lingkaran',
    instruction: 'Geser titik P agar berada DI LUAR lingkaran (x - 1)² + (y + 1)² = 9 (pusat P(1, -1), r = 3).',
  },
];

const STEP_GRID = 34; // 34px per unit
const ORIGIN_X = 270;
const ORIGIN_Y = 210;
const SVG_W = 540;
const SVG_H = 420;

export default function Tahap3KedudukanTitik({ onSuccess, onNextStage }: Tahap3Props) {
  const [missionIndex, setMissionIndex] = useState<number>(0);
  const currentMission = MISSIONS[missionIndex];

  // Point P position (Math coordinates)
  const [pointP, setPointP] = useState<{ x: number; y: number }>({ x: 2, y: 2 });
  const [isDraggingPoint, setIsDraggingPoint] = useState<boolean>(false);

  // Student prediction: 'inside' | 'on' | 'outside' | null
  const [prediction, setPrediction] = useState<'inside' | 'on' | 'outside' | null>(null);

  // Checked state & feedback
  const [feedback, setFeedback] = useState<{
    status: 'correct' | 'wrong' | null;
    message: string;
    actualPosition: 'inside' | 'on' | 'outside';
    d: number;
    r: number;
    power: number;
    rSquared: number;
    details: string;
  } | null>(null);

  const svgRef = useRef<SVGSVGElement | null>(null);

  // Math to SVG pixels
  const mathToSvg = (x: number, y: number) => ({
    px: ORIGIN_X + x * STEP_GRID,
    py: ORIGIN_Y - y * STEP_GRID,
  });

  // SVG pixels to Math coordinates
  const svgToMath = useCallback((clientX: number, clientY: number) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = SVG_W / rect.width;
    const scaleY = SVG_H / rect.height;

    const px = (clientX - rect.left) * scaleX;
    const py = (clientY - rect.top) * scaleY;

    const rawX = (px - ORIGIN_X) / STEP_GRID;
    const rawY = (ORIGIN_Y - py) / STEP_GRID;

    const roundedX = Math.round(rawX * 2) / 2;
    const roundedY = Math.round(rawY * 2) / 2;

    return {
      x: Math.max(-6.5, Math.min(6.5, roundedX)),
      y: Math.max(-5, Math.min(5, roundedY)),
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    setIsDraggingPoint(true);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDraggingPoint) return;
    const math = svgToMath(e.clientX, e.clientY);
    setPointP(math);
    setFeedback(null); // reset checked status on drag
  };

  const handlePointerUp = () => {
    setIsDraggingPoint(false);
  };

  // Real-time calculation values
  const dx = pointP.x - currentMission.circleA;
  const dy = pointP.y - currentMission.circleB;
  const power = dx * dx + dy * dy; // (x1 - a)^2 + (y1 - b)^2
  const d = Math.sqrt(power);
  const r = currentMission.circleR;
  const rSquared = r * r;

  // Determine actual mathematical position
  // Accurate tolerance of 0.08 units
  let currentComputedPos: 'inside' | 'on' | 'outside' = 'outside';
  if (Math.abs(power - rSquared) < 0.35 || Math.abs(d - r) < 0.08) {
    currentComputedPos = 'on';
  } else if (power < rSquared) {
    currentComputedPos = 'inside';
  } else {
    currentComputedPos = 'outside';
  }

  const handlePeriksa = () => {
    const isTargetAchieved = currentComputedPos === currentMission.requestedPosition;
    const isPredictionCorrect = prediction === null || prediction === currentComputedPos;

    let msg = '';
    let details = '';

    if (currentComputedPos === 'inside') {
      msg = 'Titik P berada DI DALAM lingkaran.';
      details = `Perhitungan: Nilai kuasa (x - a)² + (y - b)² = ${power.toFixed(2)}, yang mana LEBIH KECIL dari r² = ${rSquared} (jarak d = ${d.toFixed(2)} < r = ${r}).`;
    } else if (currentComputedPos === 'on') {
      msg = 'Titik P berada TEPAT PADA keliling lingkaran!';
      details = `Perhitungan: Nilai kuasa (x - a)² + (y - b)² = ${power.toFixed(2)}, SAMA DENGAN r² = ${rSquared} (jarak d = ${d.toFixed(2)} = r = ${r}).`;
    } else {
      msg = 'Titik P berada DI LUAR lingkaran.';
      details = `Perhitungan: Nilai kuasa (x - a)² + (y - b)² = ${power.toFixed(2)}, yang mana LEBIH BESAR dari r² = ${rSquared} (jarak d = ${d.toFixed(2)} > r = ${r}).`;
    }

    if (isTargetAchieved) {
      setFeedback({
        status: 'correct',
        message: `Bagus! Kamu berhasil memenuhi target: ${msg}`,
        actualPosition: currentComputedPos,
        d,
        r,
        power,
        rSquared,
        details: `${details} ${
          prediction ? (isPredictionCorrect ? 'Prediksimu juga sangat tepat!' : 'Namun prediksimu sebelumnya berbeda.') : ''
        }`,
      });
      onSuccess();
    } else {
      setFeedback({
        status: 'wrong',
        message: `Posisi saat ini belum sesuai target misi (${msg}).`,
        actualPosition: currentComputedPos,
        d,
        r,
        power,
        rSquared,
        details: `Misi meminta titik berada '${
          currentMission.requestedPosition === 'inside'
            ? 'DI DALAM'
            : currentMission.requestedPosition === 'on'
            ? 'TEPAT PADA'
            : 'DI LUAR'
        }' lingkaran. ${details}`,
      });
    }
  };

  const handleNextMission = () => {
    if (missionIndex < MISSIONS.length - 1) {
      setMissionIndex((prev) => prev + 1);
      setPointP({ x: 2, y: 2 });
      setPrediction(null);
      setFeedback(null);
    } else {
      onNextStage();
    }
  };

  const circlePix = mathToSvg(currentMission.circleA, currentMission.circleB);
  const pointPix = mathToSvg(pointP.x, pointP.y);

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl border border-blue-50 space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-800 text-xs font-black uppercase tracking-wider">
            Tahap 3 • Analisis Kedudukan Titik
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#123B8A] mt-1">
            Kedudukan Titik terhadap Lingkaran
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Misi:</span>
          <span className="px-2.5 py-1 rounded-lg bg-violet-100 text-violet-800 font-black text-xs">
            {missionIndex + 1} / {MISSIONS.length}
          </span>
        </div>
      </div>

      {/* Target Mission Banner */}
      <div className="p-4 rounded-2xl bg-violet-50 border-2 border-violet-200 flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-violet-500 text-white flex items-center justify-center shrink-0 font-black text-sm">
          <Target className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <span className="text-[11px] font-black text-violet-800 uppercase tracking-wider block">
            {currentMission.title}
          </span>
          <p className="text-xs sm:text-sm font-black text-[#123B8A] mt-0.5 leading-snug">
            {currentMission.instruction}
          </p>
        </div>
      </div>

      {/* Main Grid & Live Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* SVG Cartesian Canvas with Draggable Point P */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative w-full max-w-[540px] aspect-[14/11] bg-white rounded-2xl border-2 border-slate-300 overflow-hidden shadow-inner select-none">
            <svg
              ref={svgRef}
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              className="w-full h-full cursor-crosshair touch-none"
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            >
              {/* Minor grid lines */}
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

              {/* Lingkaran Soal */}
              <circle
                cx={circlePix.px}
                cy={circlePix.py}
                r={currentMission.circleR * STEP_GRID}
                fill="#F3E8FF"
                fillOpacity="0.45"
                stroke="#8B5CF6"
                strokeWidth="3"
              />

              {/* Pusat Lingkaran */}
              <circle cx={circlePix.px} cy={circlePix.py} r="5" fill="#6D28D9" />
              <text
                x={circlePix.px + 8}
                y={circlePix.py - 6}
                className="text-[10px] font-black fill-[#6D28D9]"
              >
                Pusat ({currentMission.circleA}, {currentMission.circleB})
              </text>

              {/* Garis Jarak dari Pusat ke Titik P */}
              <line
                x1={circlePix.px}
                y1={circlePix.py}
                x2={pointPix.px}
                y2={pointPix.py}
                stroke="#EC4899"
                strokeWidth="2"
                strokeDasharray="4 3"
              />

              {/* Titik P yang dapat digeser (Draggable) */}
              <g transform={`translate(${pointPix.px}, ${pointPix.py})`}>
                {/* Glow ring */}
                <circle r="14" fill="#F43F5E" fillOpacity="0.25" className="animate-ping" />
                <circle
                  r="9"
                  fill="#F43F5E"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  className="cursor-grab active:cursor-grabbing hover:scale-125 transition-transform"
                  onPointerDown={handlePointerDown}
                />
                <text
                  x="12"
                  y="4"
                  className="text-[11px] font-black fill-[#BE123C] drop-shadow-xs"
                >
                  P({pointP.x}, {pointP.y})
                </text>
              </g>
            </svg>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 mt-2">
            💡 Klik atau geser titik merah <strong>P</strong> untuk menguji posisinya terhadap lingkaran.
          </span>
        </div>

        {/* Real-time Math Inspector & Predictor Panel */}
        <div className="lg:col-span-5 space-y-4">
          {/* Real-time Monitor Card */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xs font-black text-[#123B8A] uppercase tracking-wider">
                Monitor Geometri Real-Time
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="space-y-2 text-xs font-bold text-slate-700">
              <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-slate-100">
                <span>Koordinat Titik P:</span>
                <span className="text-rose-600 font-mono text-sm">
                  ({pointP.x}, {pointP.y})
                </span>
              </div>
              <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-slate-100">
                <span>Jarak ke Pusat (d):</span>
                <span className="text-[#123B8A] font-mono text-sm">
                  {d.toFixed(2)} satuan
                </span>
              </div>
              <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-slate-100">
                <span>Jari-jari Lingkaran (r):</span>
                <span className="text-violet-600 font-mono text-sm">{r} satuan</span>
              </div>
              <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-slate-100">
                <span>Kuasa: (x-a)² + (y-b)²:</span>
                <span className="text-indigo-600 font-mono text-sm">
                  {power.toFixed(2)} vs r² = {rSquared}
                </span>
              </div>
            </div>
          </div>

          {/* Prediction Box */}
          <div className="p-4 bg-violet-50/70 rounded-2xl border border-violet-100 space-y-2.5">
            <span className="text-xs font-black text-[#123B8A] block">
              Tebak / Prediksi Kedudukan Titik P:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'inside', label: 'Di Dalam' },
                { id: 'on', label: 'Pada' },
                { id: 'outside', label: 'Di Luar' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setPrediction(opt.id as 'inside' | 'on' | 'outside')}
                  className={`py-2 px-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    prediction === opt.id
                      ? 'bg-violet-600 text-white shadow-sm'
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
            <span>Periksa Kedudukan Titik</span>
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
            setPointP({ x: 2, y: 2 });
            setPrediction(null);
            setFeedback(null);
          }}
          className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Posisi</span>
        </button>

        {feedback?.status === 'correct' && (
          <button
            onClick={handleNextMission}
            className="px-6 py-2.5 rounded-full bg-[#10B981] hover:bg-[#059669] text-white font-black text-xs sm:text-sm shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-2"
          >
            <span>
              {missionIndex < MISSIONS.length - 1 ? 'Eksplorasi Berikutnya' : 'Lanjut ke Tahap 4'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
