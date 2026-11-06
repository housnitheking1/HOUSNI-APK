import React, { useState, useEffect, useCallback } from 'react';
import { Smartphone, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Expand } from 'lucide-react';

interface ScreenshotsGalleryProps {
  screenshots: string[];
  appName: string;
}

export const ScreenshotsGallery: React.FC<ScreenshotsGalleryProps> = ({ screenshots, appName }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleOpen = (index: number) => {
    setActiveIndex(index);
    setIsZoomed(false);
  };

  const handleClose = useCallback(() => {
    setActiveIndex(null);
    setIsZoomed(false);
  }, []);

  const handleNext = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev! + 1) % screenshots.length);
    setIsZoomed(false);
  }, [activeIndex, screenshots.length]);

  const handlePrev = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev! - 1 + screenshots.length) % screenshots.length);
    setIsZoomed(false);
  }, [activeIndex, screenshots.length]);

  // Keyboard navigation
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, handleClose, handleNext, handlePrev]);

  if (!screenshots || screenshots.length === 0) return null;

  return (
    <>
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0B132B]/70 backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-accent" />
            <span>معاينة ولقطات شاشة التطبيق • Screenshots</span>
          </h2>
          <span className="text-xs text-slate-500">
            {screenshots.length} لقطات • اضغط للتكبير
          </span>
        </div>

        {/* Scrollable Horizontal Strip */}
        <div className="flex items-center gap-3.5 overflow-x-auto pb-3 scrollbar-thin">
          {screenshots.map((shot, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleOpen(idx)}
              className="relative shrink-0 w-44 sm:w-56 h-76 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 hover:border-accent hover:scale-[1.02] transition-all duration-200 shadow-md cursor-pointer group"
            >
              <img
                src={shot}
                alt={`${appName} preview ${idx + 1}`}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold backdrop-blur-xs gap-1.5">
                <Expand className="w-4 h-4" />
                <span>تكبير الصورة</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-between p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={handleClose}
        >
          {/* Top Bar Controls */}
          <div
            className="w-full max-w-4xl flex items-center justify-between text-white py-2 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm font-bold text-slate-300">
                {appName} • لقطة {activeIndex + 1} من {screenshots.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsZoomed((prev) => !prev)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title={isZoomed ? 'Zoom out' : 'Zoom in'}
              >
                {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Screenshot Display */}
          <div
            className="relative flex-1 flex items-center justify-center w-full max-w-5xl my-2 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Button */}
            {screenshots.length > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 z-20 p-2.5 sm:p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/20 shadow-xl transition-transform hover:scale-110 cursor-pointer"
                title="Previous image (Left Arrow)"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}

            {/* Image */}
            <div
              className={`transition-all duration-300 max-h-[75vh] flex items-center justify-center ${
                isZoomed ? 'scale-125 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed((prev) => !prev)}
            >
              <img
                src={screenshots[activeIndex]}
                alt={`${appName} screenshot ${activeIndex + 1}`}
                className="max-h-[75vh] max-w-[85vw] object-contain rounded-2xl shadow-2xl border border-white/10"
              />
            </div>

            {/* Next Button */}
            {screenshots.length > 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2 sm:right-4 z-20 p-2.5 sm:p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/20 shadow-xl transition-transform hover:scale-110 cursor-pointer"
                title="Next image (Right Arrow)"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnails */}
          {screenshots.length > 1 && (
            <div
              className="w-full max-w-xl flex items-center justify-center gap-2 overflow-x-auto py-2 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {screenshots.map((thumb, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setActiveIndex(idx);
                    setIsZoomed(false);
                  }}
                  className={`w-12 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    idx === activeIndex
                      ? 'border-accent scale-105 shadow-md'
                      : 'border-white/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={thumb} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};
