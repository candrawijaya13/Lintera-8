import type {Metadata, Viewport} from 'next';
import { Nunito, Poppins } from 'next/font/google';
import './globals.css';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-nunito',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LINTERA - Lingkaran Interaktif untuk Matematika',
  description: 'Halaman Welcome interaktif LINTERA bersama Luna sang rubah penjelajah, mengantarkan siswa SMA menjelajahi konsep matematika lingkaran secara menyenangkan.',
  openGraph: {
    title: 'LINTERA - Lingkaran Interaktif untuk Matematika',
    description: 'Halaman Welcome interaktif LINTERA bersama Luna sang rubah penjelajah, mengantarkan siswa SMA menjelajahi konsep matematika lingkaran secara menyenangkan.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LINTERA - Lingkaran Interaktif untuk Matematika',
    description: 'Halaman Welcome interaktif LINTERA bersama Luna sang rubah penjelajah, mengantarkan siswa SMA menjelajahi konsep matematika lingkaran secara menyenangkan.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="id" suppressHydrationWarning className={`${nunito.variable} ${poppins.variable}`}>
      <body
        suppressHydrationWarning
        className={`${nunito.className} antialiased overflow-x-hidden selection:bg-amber-200 selection:text-blue-900`}
      >
        {children}
      </body>
    </html>
  );
}
