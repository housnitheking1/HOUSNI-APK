import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus.ts';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-amber-500/95 dark:bg-amber-600/95 text-white shadow-lg backdrop-blur-md border border-amber-400 text-xs font-semibold animate-bounce">
      <WifiOff className="w-4 h-4 shrink-0" />
      <span>Offline Mode — Cached applications remain accessible.</span>
    </div>
  );
};
