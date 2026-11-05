import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck, AlertCircle, CheckCircle2, Lock } from 'lucide-react';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          'error-callback'?: (error: any) => void;
          'expired-callback'?: () => void;
          theme?: 'auto' | 'light' | 'dark';
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

interface TurnstileCaptchaProps {
  onVerify: (token: string) => void;
  isVerified: boolean;
}

export const TurnstileCaptcha: React.FC<TurnstileCaptchaProps> = ({
  onVerify,
  isVerified,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Turnstile site key from environment
  // Cloudflare provides public test sitekeys:
  // '1x00000000000000000000AA' always passes
  // '2x00000000000000000000AB' always blocks
  const siteKey = (import.meta as any).env?.VITE_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey) {
      return;
    }

    // Load Cloudflare Turnstile script if siteKey is configured
    const scriptId = 'cf-turnstile-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.onload = () => setScriptLoaded(true);
      script.onerror = () => setHasError(true);
      document.head.appendChild(script);
    } else {
      setScriptLoaded(true);
    }
  }, [siteKey]);

  useEffect(() => {
    if (!scriptLoaded || !siteKey || !containerRef.current || !window.turnstile) {
      return;
    }

    try {
      if (widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current);
      }

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme: 'auto',
        callback: (token: string) => {
          onVerify(token);
        },
        'error-callback': (err) => {
          console.error('Turnstile CAPTCHA error:', err);
          setHasError(true);
        },
      });
    } catch (e) {
      console.error('Failed to initialize Turnstile:', e);
      setHasError(true);
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // ignore cleanup error
        }
      }
    };
  }, [scriptLoaded, siteKey, onVerify]);

  if (isVerified) {
    return (
      <div className="p-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-2.5 shadow-xs animate-in fade-in">
        <CheckCircle2 className="w-5 h-5" />
        <span className="text-sm font-bold">Security Verification Passed</span>
      </div>
    );
  }

  // If siteKey is configured, render the Turnstile widget
  if (siteKey) {
    return (
      <div className="space-y-3 flex flex-col items-center">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <Lock className="w-4 h-4 text-accent" />
          <span>Complete Security Check to Continue</span>
        </div>
        <div ref={containerRef} className="my-2 min-h-[65px] flex items-center justify-center" />
        {hasError && (
          <p className="text-xs text-rose-500 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>CAPTCHA challenge failed to load. Please refresh the page.</span>
          </p>
        )}
      </div>
    );
  }

  // If siteKey is NOT configured: Show clear setup message as required by user prompt
  // (Do not pretend verification succeeded automatically without credentials)
  return (
    <div className="p-4 sm:p-5 rounded-2xl border border-amber-300 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-950/20 text-slate-800 dark:text-slate-200 space-y-3 text-left">
      <div className="flex items-start gap-2.5">
        <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs sm:text-sm font-display font-bold text-amber-800 dark:text-amber-300">
            Cloudflare Turnstile CAPTCHA Not Configured
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
            In production, real bot protection is provided by Cloudflare Turnstile. To enable real CAPTCHA challenges, add your <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[11px] text-accent">VITE_TURNSTILE_SITE_KEY</code> environment variable in your deployment settings.
          </p>
        </div>
      </div>

      <div className="pt-2 border-t border-amber-200 dark:border-amber-900/50 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-[11px] text-slate-500 dark:text-slate-400">
          Development / Preview Verification:
        </span>
        <button
          type="button"
          onClick={() => onVerify('demo-verified-token-' + Date.now())}
          className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold text-white bg-accent bg-accent-hover transition-all flex items-center justify-center gap-1.5 shadow-xs"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Manual Verification (Developer Mode)</span>
        </button>
      </div>
    </div>
  );
};
