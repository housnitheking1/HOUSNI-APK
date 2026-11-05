import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { LegalModal } from './components/LegalModal.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { CategoryPage } from './pages/CategoryPage.tsx';
import { AppDetailPage } from './pages/AppDetailPage.tsx';
import { DownloadPage } from './pages/DownloadPage.tsx';
import { LegalModalType } from './types.ts';

function AppLayout() {
  const [legalModal, setLegalModal] = useState<LegalModalType>(null);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#070B14] dark:text-slate-100 selection:bg-accent selection:text-white transition-colors duration-200">
      {/* 1. Header and Navigation */}
      <Header />

      {/* 2. Main Page Content (Route-Based) */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/app/:packageId" element={<AppDetailPage />} />
          <Route path="/download/:packageId" element={<DownloadPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* 3. Footer */}
      <Footer onOpenLegal={(type) => setLegalModal(type)} />

      {/* Legal Modal Viewer */}
      <LegalModal
        type={legalModal}
        onClose={() => setLegalModal(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </ThemeProvider>
  );
}
