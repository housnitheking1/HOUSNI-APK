import React, { useEffect } from 'react';
import { X, Shield, FileText, Scale, AlertCircle } from 'lucide-react';
import { LegalModalType } from '../types.ts';

interface LegalModalProps {
  type: LegalModalType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (type) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [type, onClose]);

  if (!type) return null;

  const contentMap: Record<
    Exclude<LegalModalType, null>,
    { title: string; icon: React.ReactNode; body: React.ReactNode }
  > = {
    about: {
      title: 'About Housni',
      icon: <Shield className="w-5 h-5 text-accent" />,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            <strong className="text-slate-900 dark:text-white">HOUSNI</strong> is a modern, high-speed mobile application and game discovery platform dedicated to providing safe, verified, and unadulterated software distribution channels for Android and iPhone ecosystems.
          </p>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white pt-2">Our Mission</h4>
          <p>
            The mobile software ecosystem is frequently flooded with misleading portals, modified executables, and intrusive bloatware. HOUSNI was architected to serve as an authentic discovery hub that bridges legitimate mobile creators with security-conscious users worldwide.
          </p>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white pt-2">Zero-Tolerance Anti-Piracy Policy</h4>
          <p>
            We strictly forbid the distribution, promotion, or hosting of pirated, cracked, or unauthorized modifications of proprietary applications.
          </p>
        </div>
      ),
    },
    privacy: {
      title: 'Privacy Policy',
      icon: <FileText className="w-5 h-5 text-accent" />,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p className="text-slate-500 dark:text-slate-400 text-xs">Last updated: 2026</p>
          <p>
            Your privacy is of paramount importance to <strong className="text-slate-900 dark:text-white">HOUSNI</strong>. This document explains how we protect information when you navigate our platform.
          </p>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white pt-2">1. Local Device Preferences</h4>
          <p>
            Interface customization preferences (such as Dark/Light theme mode and custom neon accent color selections) are stored strictly inside your local browser storage and never transmitted to external servers.
          </p>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white pt-2">2. Google AdSense & Cookies</h4>
          <p>
            HOUSNI utilizes advertising services including Google AdSense. Google uses cookies to serve relevant advertisements in accordance with Google Publisher Policies.
          </p>
        </div>
      ),
    },
    terms: {
      title: 'Terms of Service',
      icon: <Scale className="w-5 h-5 text-accent" />,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p className="text-slate-500 dark:text-slate-400 text-xs">Effective Date: 2026</p>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">1. Acceptance of Terms</h4>
          <p>
            By accessing or browsing HOUSNI, you agree to be bound by these Terms of Service and applicable international copyright treaties.
          </p>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white pt-2">2. Intellectual Property Rights</h4>
          <p>
            All registered trademarks, logos, screenshots, and software names appearing on HOUSNI remain the exclusive property of their respective developer studios and corporate owners.
          </p>
        </div>
      ),
    },
    disclaimer: {
      title: 'Legal Disclaimer',
      icon: <AlertCircle className="w-5 h-5 text-accent" />,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">Independent Discovery Platform</h4>
          <p>
            HOUSNI is an independent application discovery and cataloging platform. We are not affiliated with, endorsed by, or sponsored by Google LLC (Android / Google Play) or Apple Inc. (iOS / App Store).
          </p>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white pt-2">Trademark Acknowledgement</h4>
          <p>
            "Android" is a trademark of Google LLC. "iPhone", "iPad", "iOS", and "App Store" are registered trademarks of Apple Inc.
          </p>
        </div>
      ),
    },
  };

  const current = contentMap[type];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/75 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white/98 dark:bg-[#0B132B]/95 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-2xl dark:shadow-[0_0_50px_rgba(0,0,0,0.8)] p-6 sm:p-8 max-h-[85vh] overflow-y-auto space-y-4 backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-accent shadow-[0_0_10px_rgba(var(--accent-rgb),0.3)]">
              {current.icon}
            </div>
            <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">
              {current.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-2">{current.body}</div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white transition-colors border border-slate-200 dark:border-transparent"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
};
