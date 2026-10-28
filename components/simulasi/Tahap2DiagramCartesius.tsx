'use client';

import React, { useState, useRef, useCallback } from 'react';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Eye,
  EyeOff,
  Compass
} from 'lucide-react';

interface Tahap2Props {
  onSuccess: () => void;
  onNextStage: () => void;
}

interface CartesiusMission {
  id: number;
  targetA: number; // center x
  targetB: number; // center y
  targetR: number; // radius
  instruction: string;
}

const MISSIONS: CartesiusMission[] = [
  {
    id: 1,
    targetA: 2,
    targetB: 1,
    targetR: 3,
    instruction: 'Gambarlah lingkaran dengan titik pusat P(2, 1) dan jari-jari r = 3 satuan pada bidang Cartesius.',
  },
  {
    id: 2,
    targetA: -2,
    targetB: 2,
    targetR: 2.5,
    instruction: 'Gambarlah lingkaran dengan titik pusat P(-2, 2) dan jari-jari r = 2.5 satuan.',
  },
  {
    id: 3,
    targetA: 0,
    targetB: 0,
    targetR: 4,
    instruction: 'Tantangan Lingkaran Baku: Gambarlah lingkaran berpusat di titik asal O(0, 0) dengan jari-jari r = 4 satuan.',
  },
  {
    id: 4,
    targetA: 1,
    targetB: -2,
    targetR: 3,
    instruction: 'Gambarlah lingkaran dengan titik pusat P(1, -2) dan jari-jari r = 3 satuan.',
  },
];

const STEP_GRID = 36; // 36px per unit Cartesius
const ORIGIN_X = 280; // center of SVG
const ORIGIN_Y = 220; // center of SVG
const SVG_W = 560;
const SVG_H = 440;

export default function Tahap2DiagramCartesius({ onSuccess, onNextStage }: Tahap2Props) {
  const [missionIndex, setMissionIndex] = useState<number>(0);
  const currentMission = MISSIONS[missionIndex];

  // Mode: Guided vs Independent
  const [isGuidedMode, setIsGuidedMode] = useState<boolean>(true);

  // User state
  const [userCenter, setUserCenter] = useState<{ a: number; b: number } | null>(null);
  const [userRadius, setUserRadius] = useState<number>(2);
  const [isDraggingCenter, setIsDraggingCenter] = useState<boolean>(false);
  const [isDraggingRadius, setIsDraggingRadius] = useState<boolean>(false);

  // Feedback
  const [feedback, setFeedback] = useState<{
    status: 'correct' | 'wrong' | null;
    message: string;
    details?: string;
    formula?: string;
  }>({ status: null, message: '' });

  const svgRef = useRef<SVGSVGElement | null>(null);

  // Math coordinates to SVG pixel coordinates
  const mathToSvg = (x: number, y: number) => ({
    px: ORIGIN_X + x * STEP_GRID,
    py: ORIGIN_Y - y * STEP_GRID,
  });

  // SVG pixels to Math coordinates (rounded to 0.5)
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
      x: Math.max(-6, Math.min(6, roundedX)),
      y: Math.max(-5, Math.min(5, roundedY)),
    };
  }, []);

  const handleCanvasClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (feedback.status === 'correct') return;
    const math = svgToMath(e.clientX, e.clientY);
    if (!userCenter) {
      setUserCenter({ a: math.x, b: math.y });
      setFeedback({
        status: null,
        message: `Pusat P(${math.x}, ${math.y}) ditentukan. Geser titik pusat atau atur jari-jarinya.`,
      });
    }
  };

  const handlePointerDownCenter = (e: React.PointerEvent) => {
    e.stopPropagation();
    setIsDraggingCenter(true);
  };

  const handlePointerDownRadius = (e: React.PointerEvent) => {
    e.stopPropagation();
    setIsDraggingRadius(true);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    if (isDraggingCenter) {
      const math = svgToMath(e.clientX, e.clientY);
      setUserCenter({ a: math.x, b: math.y });
    } else if (isDraggingRadius && userCenter) {
      const rect = svgRef.current.getBoundingClientRect();
      const scaleX = SVG_W / rect.width;
      const scaleY = SVG_H / rect.height;

      const px = (e.clientX - rect.left) * scaleX;
      const py = (e.clientY - rect.top) * scaleY;

      const centerPix = mathToSvg(userCenter.a, userCenter.b);
      const dist = Math.hypot(px - centerPix.px, py - centerPix.py);
      const r = Math.round((dist / STEP_GRID) * 2) / 2;
      setUserRadius(Math.max(1, Math.min(5, r)));
    }
  };

  const handlePointerUp = () => {
    setIsDraggingCenter(false);
    setIsDraggingRadius(false);
  };

  // Helper formatting for equation
  const formatEquation = (a: number, b: number, r: number) => {
    const rSquared = r * r;
    if (a === 0 && b === 0) {
      return `x² + y² = ${rSquared}`;
    }
    const partA = a === 0 ? 'x²' : a > 0 ? `(x - ${a})²` : `(x + ${Math.abs(a)})²`;
    const partB = b === 0 ? 'y²' : b > 0 ? `(y - ${b})²` : `(y + ${Math.abs(b)})²`;
    return `${partA} + ${partB} = ${rSquared}`;
  };

  const handlePeriksa = () => {
    if (!userCenter) {
      setFeedback({
        status: 'wrong',
        message: 'Kamu belum menentukan titik pusat lingkaran! Klik pada koordinat yang diminta.',
      });
      return;
    }

    const { a, b } = userCenter;
    const r = userRadius;

    const isCenterCorrect = a === currentMission.targetA && b === currentMission.targetB;
    const isRadiusCorrect = Math.abs(r - currentMission.targetR) < 0.2;

    if (!isCenterCorrect && !isRadiusCorrect) {
      setFeedback({
        status: 'wrong',
        message: 'Titik pusat dan jari-jari lingkaran belum sesuai instruksi.',
        details: `Titik pusatmu saat ini (${a}, ${b}) dan r = ${r}. Target instruksi: Pusat (${currentMission.targetA}, ${currentMission.targetB}) dengan r = ${currentMission.targetR}.`,
      });
    } else if (!isCenterCorrect) {
      setFeedback({
        status: 'wrong',
        message: 'Titik pusat belum berada pada koordinat yang diminta.',
        details: `Koordinat pusatmu (${a}, ${b}). Ingat: koordinat Cartesius (x, y) menunjukkan jarak x ke kanan/kiri dan y ke atas/bawah. Target: (${currentMission.targetA}, ${currentMission.targetB}).`,
      });
    } else if (!isRadiusCorrect) {
      setFeedback({
        status: 'wrong',
        message: 'Titik pusat sudah benar, tetapi jari-jari belum sesuai.',
        details: `Titik pusat (${a}, ${b}) sudah tepat! Atur panjang jari-jari menjadi tepat ${currentMission.targetR} satuan (saat ini ${r} satuan).`,
      });
    } else {
      const eq = formatEquation(a, b, r);
      setFeedback({
        status: 'correct',
        message: 'Bagus! Lingkaranmu sudah tepat sesuai instruksi pada bidang Cartesius!',
        details: `Titik pusat P(${a}, ${b}) dan jari-jari r = ${r} satuan. Semua titik pada keliling berjarak tepat ${r} satuan dari pusat.`,
        formula: eq,
      });
      onSuccess();
    }
  };

  const handleReset = () => {
    setUserCenter(null);
    setUserRadius(2);
    setFeedback({ status: null, message: '' });
  };

  const handleNextMission = () => {
    if (missionIndex < MISSIONS.length - 1) {
      setMissionIndex((prev) => prev + 1);
      handleReset();
    } else {
      onNextStage();
    }
  };

  const userPix = userCenter ? mathToSvg(userCenter.a, userCenter.b) : null;
  const radiusHandlePix = userCenter ? mathToSvg(userCenter.a + userRadius, userCenter.b) : null;

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl border border-blue-50 space-y-5 animate-fade-in">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-black uppercase tracking-wider">
            Tahap 2 • Koordinat Cartesius
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#123B8A] mt-1">
            Menggambar Lingkaran pada Diagram Cartesius
          </h2>
        </div>

        {/* Mode Toggle: Terbimbing vs Mandiri */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl">
          <button
            onClick={() => setIsGuidedMode(true)}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              isGuidedMode
                ? 'bg-white text-[#2875FB] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Mode Terbimbing</span>
          </button>
          <button
            onClick={() => setIsGuidedMode(false)}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              !isGuidedMode
                ? 'bg-white text-[#123B8A] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <EyeOff className="w-3.5 h-3.5" />
            <span>Mode Mandiri</span>
          </button>
        </div>
      </div>

      {/* Target Mission Banner */}
      <div className="p-4 rounded-2xl bg-indigo-50 border-2 border-indigo-200 flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center shrink-0 font-black text-sm">
          <Compass className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black text-indigo-800 uppercase tracking-wider">
              Tantangan {missionIndex + 1} dari {MISSIONS.length}
            </span>
            <span className="text-xs font-bold text-slate-500">
              {isGuidedMode ? 'Bantuan Koordinat: Aktif' : 'Bantuan Koordinat: Nonaktif'}
            </span>
          </div>
          <p className="text-xs sm:text-sm font-black text-[#123B8A] mt-0.5 leading-snug">
            {currentMission.instruction}
          </p>
        </div>
      </div>

      {/* Interactive Cartesian Canvas SVG */}
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-full max-w-[580px] aspect-[14/11] bg-white rounded-2xl border-2 border-slate-300 overflow-hidden shadow-inner select-none">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            className="w-full h-full cursor-crosshair touch-none"
            onClick={handleCanvasClick}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {/* Background Grid */}
            <defs>
              <pattern id="cartesianGrid" width={STEP_GRID} height={STEP_GRID} patternUnits="userSpaceOnUse">
                <path d={`M ${STEP_GRID} 0 L 0 0 0 ${STEP_GRID}`} fill="none" stroke="#F1F5F9" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width={SVG_W} height={SVG_H} fill="url(#cartesianGrid)" />

            {/* Minor grid lines */}
            {Array.from({ length: 15 }).map((_, i) => {
              const xVal = ORIGIN_X + (i - 7) * STEP_GRID;
              return (
                <line
                  key={`vx-${i}`}
                  x1={xVal}
                  y1={0}
                  x2={xVal}
                  y2={SVG_H}
                  stroke="#E2E8F0"
                  strokeWidth="1"
                />
              );
            })}
            {Array.from({ length: 13 }).map((_, i) => {
              const yVal = ORIGIN_Y + (i - 6) * STEP_GRID;
              return (
                <line
                  key={`hy-${i}`}
                  x1={0}
                  y1={yVal}
                  x2={SVG_W}
                  y2={yVal}
                  stroke="#E2E8F0"
                  strokeWidth="1"
                />
              );
            })}

            {/* Sumbu X & Sumbu Y Utama */}
            <line x1={0} y1={ORIGIN_Y} x2={SVG_W} y2={ORIGIN_Y} stroke="#334155" strokeWidth="2.5" />
            <line x1={ORIGIN_X} y1={0} x2={ORIGIN_X} y2={SVG_H} stroke="#334155" strokeWidth="2.5" />

            {/* Panah Sumbu */}
            <polygon points={`${SVG_W - 8},${ORIGIN_Y - 4} ${SVG_W},${ORIGIN_Y} ${SVG_W - 8},${ORIGIN_Y + 4}`} fill="#334155" />
            <polygon points={`${ORIGIN_X - 4},8 ${ORIGIN_X},0 ${ORIGIN_X + 4},8`} fill="#334155" />

            {/* Label Sumbu X & Y */}
            <text x={SVG_W - 14} y={ORIGIN_Y - 8} className="text-[12px] font-black fill-[#1E293B]">
              x
            </text>
            <text x={ORIGIN_X + 10} y={14} className="text-[12px] font-black fill-[#1E293B]">
              y
            </text>
            <text x={ORIGIN_X - 12} y={ORIGIN_Y + 14} className="text-[11px] font-bold fill-slate-400">
              O
            </text>

            {/* Ticks and Number Labels on Sumbu X */}
            {[-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6].map((num) => {
              const px = ORIGIN_X + num * STEP_GRID;
              return (
                <g key={`num-x-${num}`}>
                  <line x1={px} y1={ORIGIN_Y - 3} x2={px} y2={ORIGIN_Y + 3} stroke="#334155" strokeWidth="1.5" />
                  <text x={px} y={ORIGIN_Y + 14} textAnchor="middle" className="text-[10px] font-bold fill-slate-500">
                    {num}
                  </text>
                </g>
              );
            })}

            {/* Ticks and Number Labels on Sumbu Y */}
            {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map((num) => {
              const py = ORIGIN_Y - num * STEP_GRID;
              return (
                <g key={`num-y-${num}`}>
                  <line x1={ORIGIN_X - 3} y1={py} x2={ORIGIN_X + 3} y2={py} stroke="#334155" strokeWidth="1.5" />
                  <text x={ORIGIN_X - 10} y={py + 3.5} textAnchor="end" className="text-[10px] font-bold fill-slate-500">
                    {num}
                  </text>
                </g>
              );
            })}

            {/* Target Hint in Guided Mode */}
            {isGuidedMode && (
              <g>
                {/* Proyeksi Target */}
                {(() => {
                  const targetPix = mathToSvg(currentMission.targetA, currentMission.targetB);
                  return (
                    <g>
                      <line
                        x1={targetPix.px}
                        y1={ORIGIN_Y}
                        x2={targetPix.px}
                        y2={targetPix.py}
                        stroke="#818CF8"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                      />
                      <line
                        x1={ORIGIN_X}
                        y1={targetPix.py}
                        x2={targetPix.px}
                        y2={targetPix.py}
                        stroke="#818CF8"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                      />
                      <circle
                        cx={targetPix.px}
                        cy={targetPix.py}
                        r="10"
                        fill="#EEF2FF"
                        stroke="#6366F1"
                        strokeWidth="1.5"
                        strokeDasharray="2 2"
                      />
                      <text
                        x={targetPix.px + 12}
                        y={targetPix.py - 10}
                        className="text-[10px] font-black fill-[#4F46E5]"
                      >
                        Target P({currentMission.targetA}, {currentMission.targetB})
                      </text>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* Lingkaran Siswa */}
            {userPix && userCenter && radiusHandlePix && (
              <g>
                {/* Mode Terbimbing: Proyeksi garis bantu ke sumbu X & Y */}
                {isGuidedMode && (
                  <g>
                    <line
                      x1={userPix.px}
                      y1={ORIGIN_Y}
                      x2={userPix.px}
                      y2={userPix.py}
                      stroke="#EF4444"
                      strokeWidth="1.5"
                      strokeDasharray="4 2"
                    />
                    <line
                      x1={ORIGIN_X}
                      y1={userPix.py}
                      x2={userPix.px}
                      y2={userPix.py}
                      stroke="#EF4444"
                      strokeWidth="1.5"
                      strokeDasharray="4 2"
                    />
                  </g>
                )}

                {/* Lingkaran */}
                <circle
                  cx={userPix.px}
                  cy={userPix.py}
                  r={userRadius * STEP_GRID}
                  fill={feedback.status === 'correct' ? '#DCFCE7' : '#E0E7FF'}
                  fillOpacity="0.4"
                  stroke={feedback.status === 'correct' ? '#16A34A' : '#4F46E5'}
                  strokeWidth="3"
                />

                {/* Garis Jari-jari */}
                <line
                  x1={userPix.px}
                  y1={userPix.py}
                  x2={radiusHandlePix.px}
                  y2={radiusHandlePix.py}
                  stroke="#4F46E5"
                  strokeWidth="2.5"
                  strokeDasharray="3 2"
                />

                {/* Titik Handle Jari-jari (Bisa di-drag) */}
                <circle
                  cx={radiusHandlePix.px}
                  cy={radiusHandlePix.py}
                  r="7.5"
                  fill="#4F46E5"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  className="cursor-ew-resize hover:scale-125 transition-transform"
                  onPointerDown={handlePointerDownRadius}
                />

                {/* Titik Pusat P(a, b) (Bisa di-drag) */}
                <circle
                  cx={userPix.px}
                  cy={userPix.py}
                  r="8.5"
                  fill="#EF4444"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  className="cursor-move hover:scale-125 transition-transform"
                  onPointerDown={handlePointerDownCenter}
                />

                {/* Label Koordinat Pusat */}
                <text
                  x={userPix.px}
                  y={userPix.py - 14}
                  textAnchor="middle"
                  className="text-[11px] font-black fill-[#B91C1C] drop-shadow-xs"
                >
                  P({userCenter.a}, {userCenter.b})
                </text>

                {/* Label Jari-jari */}
                <text
                  x={(userPix.px + radiusHandlePix.px) / 2}
                  y={userPix.py - 8}
                  textAnchor="middle"
                  className="text-[10px] font-black fill-[#3730A3]"
                >
                  r = {userRadius}
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Input Kontrol Slider Jari-jari untuk kemudahan perangkat */}
        {userCenter && (
          <div className="w-full max-w-[580px] mt-3 p-3.5 bg-indigo-50/70 rounded-2xl border border-indigo-100 flex items-center justify-between gap-4">
            <span className="text-xs font-black text-[#123B8A] whitespace-nowrap">
              Jari-jari Lingkaran (r):
            </span>
            <input
              type="range"
              min="1"
              max="5"
              step="0.5"
              value={userRadius}
              onChange={(e) => setUserRadius(parseFloat(e.target.value))}
              className="w-full accent-[#4F46E5] cursor-pointer"
            />
            <span className="w-16 text-center font-black text-sm text-[#4F46E5] bg-white px-2 py-1 rounded-lg border border-indigo-200">
              {userRadius} sat
            </span>
          </div>
        )}
      </div>

      {/* Umpan Balik Cerdas & Tampilan Persamaan */}
      {feedback.message && (
        <div
          className={`p-4 rounded-2xl border-2 flex items-start gap-3 animate-fade-in ${
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
            <p className="text-xs sm:text-sm font-black leading-snug">{feedback.message}</p>
            {feedback.details && (
              <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                {feedback.details}
              </p>
            )}

            {/* Formula Matematika yang Dihasilkan */}
            {feedback.formula && (
              <div className="mt-2 p-3 bg-white rounded-xl border border-emerald-200 inline-block shadow-xs">
                <span className="text-[11px] font-bold text-slate-500 block">
                  Bentuk Persamaan Lingkaran:
                </span>
                <span className="text-base sm:text-lg font-black text-[#123B8A] tracking-wide font-mono">
                  {feedback.formula}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
        <button
          onClick={handleReset}
          className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset / Gambar Ulang</span>
        </button>

        <div className="flex items-center gap-2">
          {feedback.status !== 'correct' ? (
            <button
              onClick={handlePeriksa}
              className="px-6 py-2.5 rounded-full bg-[#2875FB] hover:bg-[#1C64E8] text-white font-black text-xs sm:text-sm shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Periksa Gambar</span>
              <Sparkles className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleNextMission}
              className="px-6 py-2.5 rounded-full bg-[#10B981] hover:bg-[#059669] text-white font-black text-xs sm:text-sm shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>
                {missionIndex < MISSIONS.length - 1 ? 'Tantangan Berikutnya' : 'Lanjut ke Tahap 3'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
