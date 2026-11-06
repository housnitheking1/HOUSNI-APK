import React from 'react';
import { ShieldCheck, CheckCircle2, Lock, FileCode, Check, X, ExternalLink, AlertCircle } from 'lucide-react';
import { FDroidApp } from '../types.ts';
import { useLanguage } from '../context/LanguageContext.tsx';

interface SecurityAuditModalProps {
  app: FDroidApp | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SecurityAuditModal: React.FC<SecurityAuditModalProps> = ({ app, isOpen, onClose }) => {
  const { t, isRTL } = useLanguage();
  if (!isOpen || !app) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-lg rounded-3xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-accent/40 p-6 sm:p-7 shadow-2xl space-y-5 relative ${
          isRTL ? 'text-right' : 'text-left'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center shrink-0 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-display font-black text-slate-900 dark:text-white">
                  {t('auditModalTitle')}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/20">
                  VERIFIED SAFE
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {t('auditPackageAudit')} <span className="font-mono text-slate-700 dark:text-slate-300">{app.name}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audit Verification Points */}
        <div className="space-y-3">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="text-xs space-y-0.5">
              <h4 className="font-bold text-slate-900 dark:text-white">{t('auditCryptoTitle')}</h4>
              <p className="text-slate-500 dark:text-slate-400">
                {t('auditCryptoDesc')}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="text-xs space-y-0.5">
              <h4 className="font-bold text-slate-900 dark:text-white">{t('auditCleanTitle')}</h4>
              <p className="text-slate-500 dark:text-slate-400">
                {t('auditCleanDesc')}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="text-xs space-y-0.5">
              <h4 className="font-bold text-slate-900 dark:text-white">{t('auditTrackersTitle')}</h4>
              <p className="text-slate-500 dark:text-slate-400">
                {t('auditTrackersDesc')}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
              <Lock className="w-4 h-4" />
            </div>
            <div className="text-xs space-y-0.5">
              <h4 className="font-bold text-slate-900 dark:text-white">{t('auditDirectTitle')}</h4>
              <p className="text-slate-500 dark:text-slate-400">
                {t('auditDirectDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* Technical Signature Details */}
        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-400 break-all space-y-1">
          <div><strong className="text-slate-800 dark:text-slate-200 font-sans">{isRTL ? 'اسم الحزمة:' : 'Package ID:'}</strong> {app.id}</div>
          <div><strong className="text-slate-800 dark:text-slate-200 font-sans">{isRTL ? 'اسم الملف:' : 'File Name:'}</strong> {app.apkName}</div>
          <div><strong className="text-slate-800 dark:text-slate-200 font-sans">{isRTL ? 'الإصدار:' : 'Version:'}</strong> v{app.versionName || '1.0'} ({app.versionCode || 1})</div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-accent bg-accent-hover transition-colors shadow-xs cursor-pointer"
        >
          {t('auditClose')}
        </button>
      </div>
    </div>
  );
};
