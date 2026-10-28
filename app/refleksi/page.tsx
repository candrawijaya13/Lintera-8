'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Lightbulb,
  CheckCircle2,
  Sparkles,
  Calendar,
  User,
  History,
  Smile
} from 'lucide-react';
import {
  getStoredStudentName,
  setStoredStudentName,
  getStoredRefleksiHistory,
  saveRefleksiData,
  RefleksiData
} from '@/lib/latihan/storage';

const COMPREHENSION_LEVELS = [
  {
    id: 'Masih perlu bimbingan',
    label: 'Masih perlu bimbingan',
    desc: 'Masih butuh bantuan dan contoh soal tambahan',
    emoji: '🌱',
    color: 'from-amber-400 to-orange-400',
    bgColor: 'bg-amber-50 border-amber-300 text-amber-900',
    selectedBg: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-orange-600 shadow-md',
  },
  {
    id: 'Mulai memahami',
    label: 'Mulai memahami',
    desc: 'Memahami konsep dasar namun perlu latihan',
    emoji: '💡',
    color: 'from-sky-400 to-blue-500',
    bgColor: 'bg-sky-50 border-sky-300 text-sky-900',
    selectedBg: 'bg-gradient-to-r from-sky-500 to-blue-600 text-white border-blue-700 shadow-md',
  },
  {
    id: 'Sudah memahami',
    label: 'Sudah memahami',
    desc: 'Mampu menyelesaikan soal secara mandiri',
    emoji: '⭐',
    color: 'from-indigo-400 to-purple-500',
    bgColor: 'bg-indigo-50 border-indigo-300 text-indigo-900',
    selectedBg: 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-purple-700 shadow-md',
  },
  {
    id: 'Sangat memahami',
    label: 'Sangat memahami',
    desc: 'Menguasai konsep dan siap membantu teman',
    emoji: '🚀',
    color: 'from-emerald-400 to-teal-500',
    bgColor: 'bg-emerald-50 border-emerald-300 text-emerald-900',
    selectedBg: 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-teal-700 shadow-md',
  },
];

export default function RefleksiPage() {
  const [studentName, setStudentName] = useState<string>(() => getStoredStudentName());
  const [selectedLevel, setSelectedLevel] = useState<string>('Sudah memahami');
  const [understood, setUnderstood] = useState<string>('');
  const [difficult, setDifficult] = useState<string>('');
  const [nextStep, setNextStep] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [history, setHistory] = useState<RefleksiData[]>(() => getStoredRefleksiHistory());
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setStudentName(val);
    setStoredStudentName(val);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!understood.trim() && !difficult.trim() && !nextStep.trim()) {
      alert('Silakan isi setidaknya satu pertanyaan refleksi sebelum menyimpan.');
      return;
    }

    saveRefleksiData({
      studentName: studentName.trim() || 'Siswa LINTERA',
      comprehensionLevel: selectedLevel,
      understood: understood.trim() || 'Tidak ada catatan.',
      difficult: difficult.trim() || 'Tidak ada kesulitan berarti.',
      nextStep: nextStep.trim() || 'Melanjutkan ke materi berikutnya.',
    });

    setHistory(getStoredRefleksiHistory());
    setIsSaved(true);

    // Scroll to top of banner
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetForm = () => {
    setUnderstood('');
    setDifficult('');
    setNextStep('');
    setIsSaved(false);
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col font-sans select-none bg-gradient-to-b from-amber-50/70 via-sky-50/40 to-indigo-50/50"
      style={{
        backgroundImage: "url('/assets/dashboard-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] pointer-events-none" />

      {/* TOP NAVIGATION BAR */}
      <nav className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-5 pb-3 flex items-center justify-between">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 text-[#123B8A] font-extrabold text-sm shadow-md hover:shadow-lg hover:bg-blue-50 transition-all border border-blue-100"
        >
          <ArrowLeft className="w-4 h-4 stroke-[3]" />
          <span>Kembali ke Dashboard</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-200 shadow-sm text-xs font-bold text-[#123B8A]">
            <User className="w-3.5 h-3.5 text-amber-500" />
            <input
              type="text"
              value={studentName}
              onChange={handleNameChange}
              placeholder="Nama Siswa"
              className="bg-transparent border-none outline-none font-bold text-[#123B8A] w-28 sm:w-36 text-xs"
              title="Klik untuk mengubah nama siswa"
            />
          </div>

          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-slate-700 text-xs font-extrabold shadow-sm border border-slate-200 hover:bg-slate-50 transition-all"
          >
            <History className="w-3.5 h-3.5 text-purple-600" />
            <span>Riwayat ({history.length})</span>
          </button>
        </div>
      </nav>

      {/* MAIN CONTAINER */}
      <main className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 pb-12 flex-1">
        {/* HEADER HERO BANNER */}
        <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-200/80 mb-6 text-center relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-44 h-44 bg-gradient-to-br from-amber-200/50 to-orange-200/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-gradient-to-tr from-sky-200/40 to-blue-200/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-400 text-white flex items-center justify-center shadow-md shadow-orange-300/40 mb-3 animate-gentle-bob">
              <Lightbulb className="w-9 h-9 stroke-[2.5]" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#123B8A] tracking-tight mb-2">
              Refleksi Belajar
            </h1>
            <p className="text-sm sm:text-base font-bold text-slate-600 max-w-xl mx-auto leading-relaxed">
              Luangkan waktu sejenak untuk mengenali pemahaman dan pengalaman belajarmu hari ini.
            </p>
          </div>
        </div>

        {/* NOTIFIKASI SUKSES SIMPAN */}
        {isSaved && (
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl p-5 shadow-lg border border-emerald-400 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-white stroke-[2.5]" />
              </div>
              <div>
                <p className="text-base font-black">
                  Refleksimu berhasil disimpan. Terus semangat belajar!
                </p>
                <p className="text-xs text-emerald-100 font-medium">
                  Catatan tersimpan di riwayat belajar perangkat ini.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleResetForm}
                className="px-4 py-2 rounded-full bg-white text-emerald-700 font-black text-xs shadow hover:bg-emerald-50 transition-all"
              >
                Tulis Refleksi Baru
              </button>
              <Link
                href="/dashboard"
                className="px-4 py-2 rounded-full bg-emerald-700/80 hover:bg-emerald-800 text-white font-black text-xs transition-all"
              >
                Dashboard
              </Link>
            </div>
          </div>
        )}

        {/* RIWAYAT MODAL / SECTION */}
        {showHistory && (
          <div className="bg-white/95 rounded-3xl p-6 shadow-xl border border-purple-200 mb-6 animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg font-black text-[#123B8A]">Riwayat Refleksi Belajarmu</h2>
              </div>
              <button
                onClick={() => setShowHistory(false)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                Tutup
              </button>
            </div>

            {history.length === 0 ? (
              <p className="text-center py-6 text-sm text-slate-500 font-semibold">
                Belum ada catatan refleksi yang tersimpan. Isi formulir di bawah untuk memulai!
              </p>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-purple-200 transition-all text-xs space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-extrabold text-slate-600">{item.formattedDate}</span>
                        <span className="text-slate-400">•</span>
                        <span className="font-bold text-[#123B8A]">{item.studentName}</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-black text-[11px]">
                        {item.comprehensionLevel}
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-2 pt-2 border-t border-slate-200/60">
                      <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                        <span className="font-bold text-emerald-700 block mb-0.5">Sudah dipahami:</span>
                        <p className="text-slate-700 font-medium leading-relaxed">{item.understood}</p>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                        <span className="font-bold text-orange-700 block mb-0.5">Masih sulit:</span>
                        <p className="text-slate-700 font-medium leading-relaxed">{item.difficult}</p>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                        <span className="font-bold text-blue-700 block mb-0.5">Langkah berikutnya:</span>
                        <p className="text-slate-700 font-medium leading-relaxed">{item.nextStep}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* FORMULIR REFLEKSI */}
        <form onSubmit={handleSave} className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-xl border border-white/80 space-y-6">
          {/* BAGIAN 1: PILIHAN TINGKAT PEMAHAMAN */}
          <div>
            <label className="block text-sm sm:text-base font-black text-[#123B8A] mb-2 flex items-center gap-2">
              <Smile className="w-5 h-5 text-amber-500" />
              <span>Bagaimana tingkat pemahamanmu terhadap materi hari ini?</span>
            </label>
            <p className="text-xs text-slate-500 font-medium mb-3">
              Pilih satu yang paling menggambarkan keadaan belajarmu saat ini:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {COMPREHENSION_LEVELS.map((level) => {
                const isSelected = selectedLevel === level.id;
                return (
                  <button
                    key={level.id}
                    type="button"
                    onClick={() => setSelectedLevel(level.id)}
                    className={`p-4 rounded-2xl border-2 transition-all flex flex-col text-left cursor-pointer ${
                      isSelected
                        ? level.selectedBg
                        : `${level.bgColor} hover:brightness-95`
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{level.emoji}</span>
                      {isSelected && (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <span className="font-black text-sm block mb-1">
                      {level.label}
                    </span>
                    <span className={`text-[11px] leading-tight ${isSelected ? 'text-white/90' : 'text-slate-600'}`}>
                      {level.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="h-px bg-slate-100 w-full" />

          {/* BAGIAN 2: TIGA PERTANYAAN UTAMA */}
          <div className="space-y-5">
            {/* PERTANYAAN 1 */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm sm:text-base font-black text-[#123B8A]">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black shrink-0">
                  1
                </div>
                <span>Apa yang sudah kamu pahami?</span>
              </label>
              <textarea
                value={understood}
                onChange={(e) => setUnderstood(e.target.value)}
                rows={3}
                placeholder="Contoh: Saya sudah paham rumus persamaan lingkaran dengan pusat (0,0) dan cara menentukan posisi titik di dalam atau di luar lingkaran..."
                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-[#2875FB] focus:ring-2 focus:ring-blue-100 outline-none text-xs sm:text-sm text-slate-800 font-semibold placeholder:text-slate-400 placeholder:font-normal transition-all"
              />
            </div>

            {/* PERTANYAAN 2 */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm sm:text-base font-black text-[#123B8A]">
                <div className="w-7 h-7 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center text-xs font-black shrink-0">
                  2
                </div>
                <span>Bagian mana yang masih terasa sulit?</span>
              </label>
              <textarea
                value={difficult}
                onChange={(e) => setDifficult(e.target.value)}
                rows={3}
                placeholder="Contoh: Menghitung nilai diskriminan D saat menentukan kedudukan garis terhadap lingkaran masih sering salah tanda aljabar..."
                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-[#2875FB] focus:ring-2 focus:ring-blue-100 outline-none text-xs sm:text-sm text-slate-800 font-semibold placeholder:text-slate-400 placeholder:font-normal transition-all"
              />
            </div>

            {/* PERTANYAAN 3 */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm sm:text-base font-black text-[#123B8A]">
                <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center text-xs font-black shrink-0">
                  3
                </div>
                <span>Apa yang akan kamu lakukan selanjutnya?</span>
              </label>
              <textarea
                value={nextStep}
                onChange={(e) => setNextStep(e.target.value)}
                rows={3}
                placeholder="Contoh: Saya akan mencoba Latihan Soal paket Kedudukan Garis dan mengulang simulasi interaktif pada tahap 4..."
                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-[#2875FB] focus:ring-2 focus:ring-blue-100 outline-none text-xs sm:text-sm text-slate-800 font-semibold placeholder:text-slate-400 placeholder:font-normal transition-all"
              />
            </div>
          </div>

          <div className="h-px bg-slate-100 w-full" />

          {/* ACTION BUTTONS */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-2">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm text-center transition-all"
            >
              Kembali ke Dashboard
            </Link>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#2875FB] to-[#1C64E8] hover:from-[#1C64E8] hover:to-[#123B8A] text-white font-black text-sm shadow-lg shadow-blue-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Simpan Refleksi</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
