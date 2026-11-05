import React, { useEffect, useRef, useState } from 'react';
import { Palette, Check, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.tsx';
import { ACCENT_COLORS, AccentColor } from '../types.ts';

export const ColorPickerPopover: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { accentColor, setAccentColor } = useTheme();
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleSelectColor = (color: AccentColor) => {
    setAccentColor(color);
  };

  return (
    <div className="relative" ref={popoverRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Customize accent color"
        aria-expanded={isOpen}
        className="flex items-center gap-1.5 p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all focus:outline-none hover:border-accent/50 shadow-xs"
        title="Personalize Neon Accent Color"
      >
        <span
          className="w-4 h-4 rounded-full shadow-[0_0_8px_var(--accent-color)] transition-transform duration-200 flex items-center justify-center"
          style={{ backgroundColor: accentColor.hex }}
        >
          <Palette className="w-2.5 h-2.5 text-white opacity-90" />
        </span>
        <span className="hidden sm:inline text-xs font-semibold">Neon Color</span>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label="Neon Color Palette"
          className="absolute right-0 mt-2 w-72 p-3.5 bg-white/98 dark:bg-[#0B132B]/95 rounded-2xl shadow-xl dark:shadow-[0_0_35px_rgba(0,0,0,0.8)] border border-slate-200 dark:border-slate-700/80 backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-bold text-slate-900 dark:text-white tracking-wide">Neon Aura System</span>
            </div>
            <span className="text-[11px] text-accent font-semibold font-mono">
              {accentColor.name}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {ACCENT_COLORS.map((color) => {
              const isSelected = accentColor.id === color.id;
              return (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => handleSelectColor(color)}
                  className={`flex items-center gap-2 p-1.5 rounded-lg text-left transition-all ${
                    isSelected
                      ? 'bg-slate-100 dark:bg-slate-800 border border-accent/60 shadow-[0_0_12px_rgba(var(--accent-rgb),0.35)] font-semibold'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <span
                    className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 shadow-xs transition-transform group-hover:scale-105"
                    style={{
                      backgroundColor: color.hex,
                      boxShadow: isSelected ? `0 0 10px ${color.hex}` : 'none',
                    }}
                  >
                    {isSelected && <Check className="w-3 h-3 text-white stroke-[2.5]" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-slate-800 dark:text-slate-200 truncate leading-tight">
                      {color.name}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-medium">
            <span>Dynamic Mountain Lighting</span>
            <span>Saved to device</span>
          </div>
        </div>
      )}
    </div>
  );
};
