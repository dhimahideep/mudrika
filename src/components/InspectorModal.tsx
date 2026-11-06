import { useEffect, useState } from 'react';
import { Mudra } from '../types';
import { MUDRAS_DATA } from '../data/mudras';
import { MudraCanvas } from './MudraCanvas';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Compass,
  Scroll,
  Quote,
  Check,
  Share2,
} from 'lucide-react';

export interface InspectorModalProps {
  mudra: Mudra | null;
  onClose: () => void;
  onSelectMudra?: (mudra: Mudra) => void;
  allMudras?: Mudra[];
  onSelectTag?: (tag: string) => void;
}

export function InspectorModal({
  mudra,
  onClose,
  onSelectMudra,
  allMudras = MUDRAS_DATA,
  onSelectTag,
}: InspectorModalProps) {
  const [copiedVerse, setCopiedVerse] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && mudra && onSelectMudra) {
        handleNext();
      } else if (e.key === 'ArrowLeft' && mudra && onSelectMudra) {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mudra, allMudras, onSelectMudra]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (mudra) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mudra]);

  if (!mudra) return null;

  const mudraList = allMudras && allMudras.length > 0 ? allMudras : MUDRAS_DATA;
  const currentIndex = mudraList.findIndex((m) => m.id === mudra.id);
  const prevMudra = currentIndex > 0 ? mudraList[currentIndex - 1] : mudraList[mudraList.length - 1];
  const nextMudra = currentIndex < mudraList.length - 1 ? mudraList[currentIndex + 1] : mudraList[0];

  const handlePrev = () => {
    if (prevMudra && onSelectMudra) onSelectMudra(prevMudra);
  };

  const handleNext = () => {
    if (nextMudra && onSelectMudra) onSelectMudra(nextMudra);
  };

  const handleCopyVerse = () => {
    navigator.clipboard.writeText(`${mudra.name} (${mudra.devanagari}): ${mudra.verse}`);
    setCopiedVerse(true);
    setTimeout(() => setCopiedVerse(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 backdrop-blur-md bg-black/60 overflow-y-auto animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-6xl bg-[#FDFBF7] rounded-2xl shadow-2xl border border-brass/40 overflow-hidden flex flex-col max-h-[92vh] my-auto">
        {/* Top Archival Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#F3EFEA] border-b border-parchment-border">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 rounded-full bg-alta" />
            <div className="text-xs font-mono tracking-widest text-ink-muted uppercase">
              ABHINAYA DARPANA ARCHIVE · FOLIO #{mudra.chapterIndex ? String(mudra.chapterIndex).padStart(2, '0') : '01'}
            </div>
            <span className="text-parchment-darkBorder">/</span>
            <span
              className={`px-2.5 py-0.5 text-[11px] font-mono uppercase tracking-wider rounded-full border ${
                mudra.category === 'Asamyukta'
                  ? 'bg-amber-50 text-amber-900 border-amber-300/60'
                  : 'bg-emerald-50 text-emerald-900 border-emerald-300/60'
              }`}
            >
              {mudra.category} Hasta
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Prev / Next navigation */}
            <div className="hidden sm:flex items-center gap-1 border border-parchment-border rounded-lg bg-white/60 p-0.5">
              <button
                onClick={handlePrev}
                className="p-1.5 text-ink-secondary hover:text-ink-primary hover:bg-parchment-hover rounded transition-colors"
                title={`Previous: ${prevMudra?.name}`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2 text-xs font-mono text-ink-muted">
                {currentIndex + 1} / {allMudras.length}
              </span>
              <button
                onClick={handleNext}
                className="p-1.5 text-ink-secondary hover:text-ink-primary hover:bg-parchment-hover rounded transition-colors"
                title={`Next: ${nextMudra?.name}`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 text-ink-secondary hover:text-alta hover:bg-alta/10 rounded-full transition-colors border border-transparent hover:border-alta/20"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Split Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto flex-1 divide-y lg:divide-y-0 lg:divide-x divide-parchment-border">
          {/* Left: Editorial Museum Stage Viewport (55% on large screens) */}
          <div className="lg:col-span-7 p-4 sm:p-6 bg-[#F7F4EE] flex flex-col min-h-[380px] lg:min-h-[580px]">
            <div className="flex-1 w-full rounded-2xl overflow-hidden relative border border-[#E5DFD7]">
              <MudraCanvas selectedMudra={mudra} />
            </div>

            {/* Bottom Archival Quick Guide */}
            <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-ink-muted">
              <div className="flex items-center gap-2">
                <span className="text-alta">●</span>
                <span>Alta finger lacquer indicates active terminal energy points</span>
              </div>
              <div className="hidden sm:block text-ink-light">
                HOVER TO TILT · ARCHIVAL FOLIO
              </div>
            </div>
          </div>

          {/* Right: Scholarly Metadata & Viniyogas (45% on large screens) */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-[#FDFBF7] flex flex-col justify-between overflow-y-auto space-y-6">
            <div className="space-y-6">
              {/* Title & Transliteration */}
              <div>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ink-primary tracking-tight">
                    {mudra.name}
                  </h2>
                  <span className="text-2xl sm:text-3xl font-devanagari text-alta font-bold">
                    {mudra.devanagari}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm font-serif italic text-ink-secondary">
                    “{mudra.englishMeaning}”
                  </span>
                  <span className="text-xs text-brass font-mono">✦</span>
                  <span className="text-xs font-mono uppercase tracking-wider text-ink-muted">
                    {mudra.category === 'Asamyukta' ? 'Single Hand Gesture' : 'Combined Dual Hand Gesture'}
                  </span>
                </div>
              </div>

              {/* Sanskrit Shloka Blockquote */}
              <div className="relative p-4 rounded-xl bg-[#F5EFE6] border-l-4 border-alta shadow-sm">
                <Quote className="absolute top-2 right-3 w-6 h-6 text-alta/20" />
                <div className="text-[10px] font-mono uppercase tracking-widest text-ink-muted mb-1 flex items-center justify-between">
                  <span>Abhinaya Darpana · Shloka Excerpt</span>
                  <button
                    onClick={handleCopyVerse}
                    className="flex items-center gap-1 text-ink-muted hover:text-alta transition-colors"
                    title="Copy Sanskrit Shloka"
                  >
                    {copiedVerse ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="font-devanagari text-base sm:text-lg text-ink-primary leading-relaxed">
                  {mudra.verse}
                </p>
                {mudra.historicalContext && (
                  <p className="mt-2 text-xs font-sans text-ink-secondary leading-normal border-t border-parchment-border/80 pt-2">
                    {mudra.historicalContext}
                  </p>
                )}
              </div>

              {/* Anatomical Finger Posture */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-ink-muted font-semibold">
                  <Compass className="w-3.5 h-3.5 text-alta" />
                  <span>Anatomical Posture & Knuckle Placement</span>
                </div>
                <div className="p-3.5 rounded-lg bg-white border border-parchment-border text-sm leading-relaxed text-ink-secondary font-sans shadow-sm">
                  {mudra.anatomy}
                </div>
              </div>

              {/* Viniyogas (Thematic Usages) */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-ink-muted font-semibold">
                    <Scroll className="w-3.5 h-3.5 text-brass" />
                    <span>Canonical Viniyogas (Thematic Meanings)</span>
                  </div>
                  <span className="text-[11px] font-mono text-ink-muted">
                    {mudra.viniyogas.length} Expressions
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {mudra.viniyogas.map((vini, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (onSelectTag) onSelectTag(vini);
                        onClose();
                      }}
                      className="group text-left px-3 py-1.5 rounded-md text-xs font-medium bg-[#F3EFEA] hover:bg-alta hover:text-white text-ink-primary border border-parchment-border transition-all duration-200 flex items-center gap-1.5 shadow-sm"
                      title={`Filter library by "${vini}"`}
                    >
                      <span className="text-alta group-hover:text-white transition-colors">✦</span>
                      <span>{vini}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Modal Actions */}
            <div className="pt-6 border-t border-parchment-border flex items-center justify-between gap-3">
              <button
                onClick={handlePrev}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-parchment-border hover:bg-parchment-card text-xs font-mono text-ink-secondary hover:text-ink-primary transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Prev:</span> {prevMudra.name}
              </button>

              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-alta text-white hover:bg-alta-dark text-xs font-mono transition-colors shadow-sm"
              >
                <span className="hidden sm:inline">Next:</span> {nextMudra.name}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const MudraInspectorModal = InspectorModal;
export default InspectorModal;
