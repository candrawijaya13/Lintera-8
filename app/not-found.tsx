import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#63C9F4] text-[#123B8A] p-4 text-center font-sans">
      <h2 className="text-4xl font-black mb-2">404 - Halaman Tidak Ditemukan</h2>
      <p className="text-base font-semibold mb-6">
        Halaman yang Anda tuju tidak ditemukan atau sedang dalam pengembangan.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-[#2875FB] text-white font-bold hover:bg-[#1C64E8] shadow-md transition-colors"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
