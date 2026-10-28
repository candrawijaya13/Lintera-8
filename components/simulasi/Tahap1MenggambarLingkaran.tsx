'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  ArrowRight,
  Sparkles,
  Info,
  Maximize2
} from 'lucide-react';

interface Tahap1Props {
  onSuccess: () => void;
  onNextStage: () => void;
}

type UnsurType = 'pusat' | 'jari_jari' | 'diameter' | 'keliling' | null;

interface Mission {
  id: number;
  targetCenterX: number; // grid coords (0 to 12)
  targetCenterY: number; // grid coords (0 to 8)
  targetRadius: number; // grid units
  instruction: string;
}

const MISSIONS: Mission[] = [
  {
    id: 1,
    targetCenterX: 6,
    targetCenterY: 4,
    targetRadius: 3,
    instruction: 'Tentukan titik pusat pada tanda target P(6, 4), lalu tarik penanda jari-jari hingga panjangnya tepat 3 satuan.',
  },
  {
    id: 2,
    targetCenterX: 4,
    targetCenterY: 4,
    targetRadius: 2,
    instruction: 'Tentukan titik pusat pada tanda target P(4, 4), lalu bentuk lingkaran dengan panjang jari-jari tepat 2 satuan.',
  },
  {
    id: 3,
    targetCenterX: 7,
    targetCenterY: 4,
    targetRadius: 3.5,
    instruction: 'Tantangan Mahir: Letakkan titik pusat pada P(7, 4), lalu atur jari-jari lingkaran sebesar 3.5 satuan.',
  },
];

const GRID_SIZE = 40; // pixels per unit
const CANVAS_COLS = 13;
const CANVAS_ROWS = 9;
const SVG_WIDTH = CANVAS_COLS * GRID_SIZE; // 520
const SVG_HEIGHT = CANVAS_ROWS * GRID_SIZE; // 360

export default function Tahap1MenggambarLingkaran({ onSuccess, onNextStage }: Tahap1Props) {
  // Unsur Explorer State
  const [selectedUnsur, setSelectedUnsur] = useState<UnsurType>('pusat');

  // Drawing Activity State
  const [missionIndex, setMissionIndex] = useState<number>(0);
  const currentMission = MISSIONS[missionIndex];

  // User drawing state (in grid units)
  const [userCenter, setUserCenter] = useState<{ x: number; y: number } | null>(null);
  const [userRadius, setUserRadius] = useState<number>(0); // in grid units
  const [isDrawingRadius, setIsDrawingRadius] = useState<boolean>(false);

  // Feedback State
  const [feedback, setFeedback] = useState<{
    status: 'correct' | 'wrong' | null;
    message: string;
    details?: string;
  }>({ status: null, message: '' });

  const [hasCompletedMission, setHasCompletedMission] = useState<boolean>(false);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Unsur Explanations
  const unsurInfo = {
    pusat: {
      name: 'Titik Pusat (O)',
      desc: 'Titik yang berada tepat di tengah-tengah lingkaran. Jarak dari titik pusat ke setiap titik pada garis keliling lingkaran selalu sama.',
      color: '#EF4444',
    },
    jari_jari: {
      name: 'Jari-jari (r)',
      desc: 'Ruas garis lurus yang menghubungkan titik pusat lingkaran dengan sembarang titik pada lengkungan keliling lingkaran. Rumus: r = ½ × d.',
      color: '#2563EB',
    },
    diameter: {
      name: 'Diameter (d)',
      desc: 'Ruas garis lurus terpanjang yang menghubungkan dua titik pada keliling lingkaran dan selalu melewati titik pusat. Rumus: d = 2 × r.',
      color: '#F59E0B',
    },
    keliling: {
      name: 'Keliling Lingkaran',
      desc: 'Panjang seluruh garis lengkung tertutup yang membentuk tepi lingkaran. Rumus keliling: K = 2 × π × r atau K = π × d.',
      color: '#10B981',
    },
  };

  // Convert SVG Mouse/Touch coordinates to Grid units
  const getGridCoords = useCallback((e: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const scaleX = SVG_WIDTH / rect.width;
    const scaleY = SVG_HEIGHT / rect.height;

    const pixelX = (clientX - rect.left) * scaleX;
    const pixelY = (clientY - rect.top) * scaleY;

    // Grid coordinates rounded to 0.5 units
    const gx = Math.round((pixelX / GRID_SIZE) * 2) / 2;
    const gy = Math.round((pixelY / GRID_SIZE) * 2) / 2;

    return {
      x: Math.max(0, Math.min(CANVAS_COLS - 1, gx)),
      y: Math.max(0, Math.min(CANVAS_ROWS - 1, gy)),
    };
  }, []);

  const handleCanvasClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (feedback.status === 'correct') return;
    const { x, y } = getGridCoords(e);

    // If user has not set center, set center
    if (!userCenter) {
      setUserCenter({ x, y });
      setUserRadius(1); // default initial radius
      setFeedback({
        status: null,
        message: 'Titik pusat telah diletakkan! Sekarang tarik penanda biru atau geser pengatur ukuran untuk menentukan jari-jari.',
      });
    }
  };

  const handleRadiusPointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    setIsDrawingRadius(true);
  };

  const handleSvgPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDrawingRadius || !userCenter || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = SVG_WIDTH / rect.width;
    const scaleY = SVG_HEIGHT / rect.height;

    const px = (e.clientX - rect.left) * scaleX;
    const py = (e.clientY - rect.top) * scaleY;

    const cx = userCenter.x * GRID_SIZE;
    const cy = userCenter.y * GRID_SIZE;

    const distPixels = Math.hypot(px - cx, py - cy);
    const radiusUnits = Math.round((distPixels / GRID_SIZE) * 2) / 2;
    setUserRadius(Math.max(0.5, Math.min(4.5, radiusUnits)));
  };

  const handleSvgPointerUp = () => {
    setIsDrawingRadius(false);
  };

  const handlePeriksa = () => {
    if (!userCenter) {
      setFeedback({
        status: 'wrong',
        message: 'Kamu belum menentukan titik pusat lingkaran! Klik pada area kanvas untuk menentukan titik pusat.',
      });
      return;
    }

    const targetX = currentMission.targetCenterX;
    const targetY = currentMission.targetCenterY;
    const targetR = currentMission.targetRadius;

    const centerDist = Math.hypot(userCenter.x - targetX, userCenter.y - targetY);
    const radiusDiff = Math.abs(userRadius - targetR);

    // Tolerance
    const isCenterExact = centerDist < 0.25;
    const isRadiusExact = radiusDiff < 0.25;

    if (!isCenterExact && !isRadiusExact) {
      setFeedback({
        status: 'wrong',
        message: 'Titik pusat dan panjang jari-jari belum sesuai instruksi.',
        details: `Petunjuk: Letakkan titik pusat di (${targetX}, ${targetY}) dan atur panjang jari-jari menjadi ${targetR} satuan.`,
      });
    } else if (!isCenterExact) {
      setFeedback({
        status: 'wrong',
        message: 'Titik pusatmu belum tepat pada koordinat target.',
        details: `Posisi pusatmu saat ini (${userCenter.x}, ${userCenter.y}). Geser atau klik kembali tepat pada tanda target kuning (${targetX}, ${targetY}).`,
      });
    } else if (!isRadiusExact) {
      setFeedback({
        status: 'wrong',
        message: 'Titik pusat sudah tepat! Namun panjang jari-jarinya belum sesuai.',
        details: `Jari-jarimu saat ini ${userRadius} satuan. Sesuaikan penanda hingga tepat ${targetR} satuan.`,
      });
    } else {
      setFeedback({
        status: 'correct',
        message: 'Bagus sekali! Kamu berhasil menggambar lingkaran dengan pusat dan jari-jari yang tepat!',
        details: `Pusat O(${targetX}, ${targetY}), Jari-jari r = ${targetR} satuan, Diameter d = ${targetR * 2} satuan. Lingkaran memiliki bentuk sempurna dan tidak lonjong karena skala vertikal dan horizontal seimbang.`,
      });
      setHasCompletedMission(true);
      onSuccess();
    }
  };

  const handleReset = () => {
    setUserCenter(null);
    setUserRadius(0);
    setFeedback({ status: null, message: '' });
    setHasCompletedMission(false);
  };

  const handleNextMission = () => {
    if (missionIndex < MISSIONS.length - 1) {
      setMissionIndex((prev) => prev + 1);
      handleReset();
    } else {
      onNextStage();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. BAGIAN EKSPLORASI UNSUR-UNSUR LINGKARAN */}
      <section className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl border border-blue-50 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <span className="px-3 py-1 rounded-full bg-blue-100 text-[#2875FB] text-xs font-black uppercase tracking-wider">
              Bagian 1 • Pengenalan Visual
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#123B8A] mt-1">
              Unsur-unsur Utama Lingkaran
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-semibold max-w-sm">
            Klik tombol unsur di bawah untuk menyorot bagian lingkaran secara visual dan memahami fungsinya.
          </p>
        </div>

        {/* Visual Explorer Interactive Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          {/* Interactive SVG Diagram */}
          <div className="lg:col-span-6 flex justify-center bg-sky-50/60 rounded-2xl p-4 border border-sky-100">
            <svg viewBox="0 0 320 280" className="w-full max-w-[300px] h-auto drop-shadow-sm">
              {/* Lingkaran Luar / Keliling */}
              <circle
                cx="160"
                cy="140"
                r="100"
                fill="#EFF6FF"
                stroke={selectedUnsur === 'keliling' ? '#10B981' : '#93C5FD'}
                strokeWidth={selectedUnsur === 'keliling' ? 6 : 3}
                className="transition-all duration-300"
              />

              {/* Diameter Line (A to B) */}
              <line
                x1="60"
                y1="140"
                x2="260"
                y2="140"
                stroke={selectedUnsur === 'diameter' ? '#F59E0B' : '#E2E8F0'}
                strokeWidth={selectedUnsur === 'diameter' ? 5 : 2}
                strokeDasharray={selectedUnsur === 'diameter' ? 'none' : '4 4'}
                className="transition-all duration-300"
              />

              {/* Jari-jari Line (O to Top Right) */}
              <line
                x1="160"
                y1="140"
                x2="230.7"
                y2="69.3"
                stroke={selectedUnsur === 'jari_jari' ? '#2563EB' : '#94A3B8'}
                strokeWidth={selectedUnsur === 'jari_jari' ? 5 : 2.5}
                className="transition-all duration-300"
              />

              {/* Titik Pusat O */}
              <circle
                cx="160"
                cy="140"
                r={selectedUnsur === 'pusat' ? 9 : 6}
                fill={selectedUnsur === 'pusat' ? '#EF4444' : '#1E293B'}
                stroke="#FFFFFF"
                strokeWidth={2.5}
                className="transition-all duration-300"
              />

              {/* Labels */}
              <text x="160" y="162" textAnchor="middle" className="text-[12px] font-black fill-[#1E293B]">
                O (Pusat)
              </text>
              <text x="202" y="98" textAnchor="middle" className="text-[11px] font-bold fill-[#2563EB]">
                r (Jari-jari)
              </text>
              <text x="210" y="132" textAnchor="middle" className="text-[11px] font-bold fill-[#F59E0B]">
                d (Diameter)
              </text>
              <text x="260" y="155" textAnchor="middle" className="text-[10px] font-bold fill-slate-400">
                B
              </text>
              <text x="50" y="155" textAnchor="middle" className="text-[10px] font-bold fill-slate-400">
                A
              </text>
            </svg>
          </div>

          {/* Interactive Buttons & Description Card */}
          <div className="lg:col-span-6 space-y-3.5">
            <div className="grid grid-cols-2 gap-2">
              {(['pusat', 'jari_jari', 'diameter', 'keliling'] as const).map((key) => {
                const info = unsurInfo[key];
                const isActive = selectedUnsur === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedUnsur(key)}
                    className={`p-3 rounded-2xl border-2 text-left font-black text-xs sm:text-sm transition-all duration-200 cursor-pointer flex items-center justify-between ${
                      isActive
                        ? 'bg-blue-50 border-[#2875FB] text-[#123B8A] shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{info.name}</span>
                    <span
                      className="w-3.5 h-3.5 rounded-full"
                      style={{ backgroundColor: info.color }}
                    />
                  </button>
                );
              })}
            </div>

            {selectedUnsur && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/70 to-indigo-50/70 border border-blue-100 animate-fade-in">
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: unsurInfo[selectedUnsur].color }}
                  />
                  <h3 className="text-sm font-black text-[#123B8A]">
                    {unsurInfo[selectedUnsur].name}
                  </h3>
                </div>
                <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                  {unsurInfo[selectedUnsur].desc}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. AKTIVITAS MENGGAMBAR LINGKARAN SENDIRI */}
      <section className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl border border-blue-50 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
              Bagian 2 • Aktivitas Menggambar
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#123B8A] mt-1">
              Kanvas Gambar Lingkaran Presisi
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Misi:</span>
            <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-[#2875FB] font-black text-xs">
              {missionIndex + 1} / {MISSIONS.length}
            </span>
          </div>
        </div>

        {/* Instruksi Misi */}
        <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-400 text-white flex items-center justify-center shrink-0 font-black text-sm">
            !
          </div>
          <div>
            <span className="text-[11px] font-black text-amber-800 uppercase tracking-wider block">
              Instruksi Gambar
            </span>
            <p className="text-xs sm:text-sm font-black text-[#123B8A] mt-0.5 leading-snug">
              {currentMission.instruction}
            </p>
          </div>
        </div>

        {/* Kanvas Grid SVG Interaktif */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[560px] aspect-[13/9] bg-slate-50 rounded-2xl border-2 border-slate-200 overflow-hidden shadow-inner select-none">
            <svg
              ref={svgRef}
              viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
              className="w-full h-full cursor-crosshair touch-none"
              onClick={handleCanvasClick}
              onPointerMove={handleSvgPointerMove}
              onPointerUp={handleSvgPointerUp}
              onPointerLeave={handleSvgPointerUp}
            >
              {/* 1:1 Scale Grid Lines */}
              <defs>
                <pattern id="grid" width={GRID_SIZE} height={GRID_SIZE} patternUnits="userSpaceOnUse">
                  <path d={`M ${GRID_SIZE} 0 L 0 0 0 ${GRID_SIZE}`} fill="none" stroke="#E2E8F0" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="url(#grid)" />

              {/* Target Position Marker (Kuning) */}
              <g
                transform={`translate(${currentMission.targetCenterX * GRID_SIZE}, ${
                  currentMission.targetCenterY * GRID_SIZE
                })`}
              >
                <circle r="12" fill="#FEF08A" fillOpacity="0.7" stroke="#EAB308" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="-8" y1="0" x2="8" y2="0" stroke="#CA8A04" strokeWidth="2" />
                <line x1="0" y1="-8" x2="0" y2="8" stroke="#CA8A04" strokeWidth="2" />
                <text x="14" y="4" className="text-[10px] font-bold fill-[#854D0E]">
                  Target ({currentMission.targetCenterX}, {currentMission.targetCenterY})
                </text>
              </g>

              {/* Lingkaran yang Digambar Siswa */}
              {userCenter && userRadius > 0 && (
                <g>
                  {/* Circle Body */}
                  <circle
                    cx={userCenter.x * GRID_SIZE}
                    cy={userCenter.y * GRID_SIZE}
                    r={userRadius * GRID_SIZE}
                    fill={feedback.status === 'correct' ? '#DCFCE7' : '#DBEAFE'}
                    fillOpacity="0.45"
                    stroke={feedback.status === 'correct' ? '#16A34A' : '#2563EB'}
                    strokeWidth={3}
                  />

                  {/* Radius Guide Line */}
                  <line
                    x1={userCenter.x * GRID_SIZE}
                    y1={userCenter.y * GRID_SIZE}
                    x2={(userCenter.x + userRadius) * GRID_SIZE}
                    y2={userCenter.y * GRID_SIZE}
                    stroke="#2563EB"
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                  />

                  {/* Radius Label */}
                  <text
                    x={(userCenter.x + userRadius / 2) * GRID_SIZE}
                    y={userCenter.y * GRID_SIZE - 8}
                    textAnchor="middle"
                    className="text-[11px] font-black fill-[#1E40AF]"
                  >
                    r = {userRadius} satuan
                  </text>

                  {/* Interactive Draggable Radius Handle */}
                  <circle
                    cx={(userCenter.x + userRadius) * GRID_SIZE}
                    cy={userCenter.y * GRID_SIZE}
                    r="8"
                    fill="#2563EB"
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                    className="cursor-ew-resize hover:scale-125 transition-transform"
                    onPointerDown={handleRadiusPointerDown}
                  />
                </g>
              )}

              {/* Titik Pusat Siswa */}
              {userCenter && (
                <g transform={`translate(${userCenter.x * GRID_SIZE}, ${userCenter.y * GRID_SIZE})`}>
                  <circle r="7" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="10" y="4" className="text-[11px] font-black fill-[#B91C1C]">
                    Pusat ({userCenter.x}, {userCenter.y})
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Pengatur Ukuran Jari-jari Tambahan (Slider) untuk kemudahan siswa di perangkat HP / Touch */}
          {userCenter && (
            <div className="w-full max-w-[560px] mt-3 p-3.5 bg-blue-50/70 rounded-2xl border border-blue-100 flex items-center justify-between gap-4">
              <span className="text-xs font-black text-[#123B8A] whitespace-nowrap">
                Atur Jari-jari (r):
              </span>
              <input
                type="range"
                min="0.5"
                max="4.5"
                step="0.5"
                value={userRadius}
                onChange={(e) => setUserRadius(parseFloat(e.target.value))}
                className="w-full accent-[#2875FB] cursor-pointer"
              />
              <span className="w-16 text-center font-black text-sm text-[#2875FB] bg-white px-2 py-1 rounded-lg border border-blue-200">
                {userRadius} sat
              </span>
            </div>
          )}
        </div>

        {/* Umpan Balik Cerdas */}
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
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-black leading-snug">{feedback.message}</p>
              {feedback.details && (
                <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                  {feedback.details}
                </p>
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
            <span>Coba Lagi / Hapus</span>
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
                  {missionIndex < MISSIONS.length - 1 ? 'Misi Berikutnya' : 'Lanjut ke Tahap 2'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
