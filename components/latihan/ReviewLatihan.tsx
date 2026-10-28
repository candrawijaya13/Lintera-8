'use client';

import React from 'react';
import {
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Award,
  Layers,
  HelpCircle
} from 'lucide-react';
import { LatihanSessionResult } from '@/lib/latihan/types';

interface ReviewLatihanProps {
  result: LatihanSessionResult;
  onBackToCertificate: () => void;
}

export default function ReviewLatihan({
  result,
  onBackToCertificate,
}: ReviewLatihanProps) {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 py-4">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
        <button
          onClick={onBackToCertificate}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Sertifikat</span>
        </button>

        <div className="text-right">
          <span className="text-xs font-bold text-slate-400 block">Review Pembahasan:</span>
          <span className="text-sm sm:text-base font-black text-amber-400">{result.topicTitle}</span>
        </div>
      </div>

      {/* Summary Score Bar */}
      <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          <span className="font-bold text-white">
            Skor Akhir: <strong className="text-amber-400 text-base font-mono">{result.score}/100</strong>
          </span>
        </div>
        <div className="flex items-center gap-3 font-semibold">
          <span className="text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> {result.correctCount} Benar
          </span>
          <span className="text-rose-400 flex items-center gap-1">
            <XCircle className="w-4 h-4" /> {result.wrongCount} Salah
          </span>
        </div>
      </div>

      {/* List of 20 Questions with Explanations */}
      <div className="space-y-4">
        {result.answers.map((item, idx) => (
          <div
            key={item.questionId}
            className={`p-5 rounded-2xl border-2 transition-all ${
              item.isCorrect
                ? 'bg-slate-900/90 border-emerald-500/40'
                : 'bg-slate-900/90 border-rose-500/40'
            }`}
          >
            {/* Header: Number, Difficulty, Status */}
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-slate-800 text-white font-black text-xs flex items-center justify-center">
                  #{idx + 1}
                </span>
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    item.difficulty === 'mudah'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : item.difficulty === 'sedang'
                      ? 'bg-amber-500/20 text-amber-300'
                      : item.difficulty === 'sulit'
                      ? 'bg-rose-500/20 text-rose-300'
                      : 'bg-purple-500/20 text-purple-300'
                  }`}
                >
                  {item.difficulty.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold">
                {item.isCorrect ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Benar (+1 Poin)
                  </span>
                ) : (
                  <span className="text-rose-400 flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> Salah (0 Poin)
                  </span>
                )}
              </div>
            </div>

            {/* Question Text */}
            <p className="text-sm sm:text-base font-bold text-white mb-3 leading-relaxed">
              {item.questionText}
            </p>

            {/* Answer Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px] font-semibold">Jawaban Kamu:</span>
                <span className={`font-mono font-bold text-sm ${item.isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {item.userAnswer || '(Tidak diisi)'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px] font-semibold">Kunci Jawaban:</span>
                <span className="font-mono font-bold text-sm text-amber-300">
                  {item.correctAnswer}
                </span>
              </div>
            </div>

            {/* Explanation */}
            <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5 text-xs text-slate-300 leading-relaxed">
              <strong className="text-sky-300 block mb-1">Pembahasan:</strong>
              {item.explanation}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Button */}
      <div className="flex justify-center pt-2">
        <button
          onClick={onBackToCertificate}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm shadow-md transition-all cursor-pointer"
        >
          <Award className="w-4 h-4" />
          <span>Lihat Sertifikat Kembali</span>
        </button>
      </div>
    </div>
  );
}
