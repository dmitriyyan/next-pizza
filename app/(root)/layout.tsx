import { Header } from '@/widgets/header';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Next Pizza | Главная',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <>
      <main className="min-h-screen">
        <Header />
        {children}
      </main>
      {modal}
    </>
  );
}
