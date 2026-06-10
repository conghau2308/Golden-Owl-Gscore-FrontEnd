import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import './globals.css';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';

const rubik = Rubik({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tra Cứu Điểm THPT',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={rubik.className}>
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 flex flex-col min-h-screen">
            <div className="flex items-center gap-2 px-4 py-3 border-b sticky top-0 bg-background z-10">
              <SidebarTrigger />
              <span className="text-sm text-muted-foreground">THPT Quốc Gia 2024</span>
            </div>
            <div className="flex-1 p-6 max-w-3xl mx-auto w-full">
              {children}
            </div>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}