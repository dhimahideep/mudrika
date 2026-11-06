import React from 'react';
import { motion } from 'framer-motion';
import { Mudra, toDevanagariNumeral, formatMudraName, ThemeMode } from '../types';
import { ArrowRight } from 'lucide-react';

interface MudraCardProps {
  mudra: Mudra;
  onSelect: (mudra: Mudra) => void;
  onTagClick?: (tag: string) => void;
  theme?: ThemeMode;
}

const springTransition = {
  type: 'spring',
  stiffness: 320,
  damping: 26,
  mass: 0.8,
} as const;

export const MudraCard: React.FC<MudraCardProps> = ({ mudra, onSelect, onTagClick, theme = 'parchment' }) => {
  const isRatri = theme === 'ratri';

  return (
    <motion.div
      layoutId={`mudra-card-${mudra.id}`}
      transition={springTransition}
      role="button"
      tabIndex={0}
      onClick={() => onSelect(mudra)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(mudra);
        }
      }}
      className={`group relative border-[1.5px] sm:border-2 rounded-xl p-4 sm:p-5 transition-all duration-200 flex flex-col justify-between cursor-pointer select-none outline-none overflow-hidden touch-pan-y hover:translate-x-[-1px] hover:translate-y-[-1px] ${
        isRatri
          ? 'bg-[#121212] border-[#262626] shadow-[2px_2px_0px_#EF4444] sm:shadow-[3.5px_3.5px_0px_#EF4444] hover:shadow-[5px_5px_0px_#EF4444] focus-visible:ring-2 focus-visible:ring-[#EF4444]'
          : 'bg-[#FCFBF7] border-[#1C1917] shadow-[2px_2px_0px_#1C1917] sm:shadow-[3.5px_3.5px_0px_#1C1917] hover:shadow-[4.5px_4.5px_0px_#1C1917] focus-visible:ring-2 focus-visible:ring-[#B91C1C]'
      }`}
    >
      <div>
        {/* Name in Sanskrit Devanagari & Expressive Editorial Italic Latin */}
        <div className="mb-2.5 sm:mb-3">
          <div className="flex items-baseline justify-between gap-2 mb-1">
            <span className={`font-devanagari text-xl sm:text-2xl lg:text-3xl font-black tracking-wide ${
              isRatri ? 'text-[#F87171]' : 'text-[#B91C1C]'
            }`}>
              {mudra.devanagari}
            </span>
            <span className={`font-mono text-[9px] sm:text-[10px] tracking-wider uppercase border px-1.5 py-0.5 rounded ${
              isRatri
                ? 'bg-[#1E1E1E] text-[#9CA3AF] border-[#262626] shadow-[1px_1px_0px_#EF4444]'
                : 'bg-[#F8F5EE] text-[#78716C] border-[#1C1917] shadow-[1px_1px_0px_#1C1917]'
            }`}>
              [ पत्रम् // {toDevanagariNumeral(String(mudra.chapterIndex || 1).padStart(2, '0'))} ]
            </span>
          </div>
          <h3 className={`font-['Playfair_Display'] italic font-bold text-xl tracking-tight capitalize transition-colors ${
            isRatri
              ? 'text-[#F9FAFB] group-hover:text-[#F87171]'
              : 'text-[#1C1917] group-hover:text-[#B91C1C]'
          }`}>
            {formatMudraName(mudra.name)}
          </h3>
        </div>

        {/* English Translation */}
        <div className="mb-2.5 sm:mb-3 flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <span className={`inline-block px-2 sm:px-2.5 py-0.5 text-xs font-serif italic rounded border ${
            isRatri
              ? 'bg-[#1E1E1E] text-[#F3F4F6] border-[#262626] shadow-[1px_1px_0px_#EF4444]'
              : 'bg-[#F8F5EE] text-[#1C1917] border-[#1C1917] shadow-[1px_1px_0px_#1C1917] sm:shadow-[1.5px_1.5px_0px_#1C1917]'
          }`}>
            “{mudra.englishMeaning}”
          </span>
        </div>

        {/* Anatomical snippet */}
        <p className={`text-xs leading-relaxed line-clamp-2 mb-3 sm:mb-4 font-sans ${
          isRatri ? 'text-[#9CA3AF]' : 'text-[#78716C]'
        }`}>
          {mudra.anatomy}
        </p>

        {/* Mini Viniyoga Tag Pills (Show 2 features) */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 mb-4 sm:mb-5">
          {mudra.viniyogas.slice(0, 2).map((vini, index) => (
            <button
              key={index}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onTagClick) onTagClick(vini);
              }}
              className={`text-[10px] sm:text-[11px] font-mono px-1.5 sm:px-2 py-0.5 rounded border transition-all cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
                isRatri
                  ? 'bg-[#1E1E1E] text-[#D1D5DB] border-[#262626] shadow-[1px_1px_0px_#262626] hover:bg-[#991B1B] hover:text-[#F9FAFB] hover:border-[#EF4444]'
                  : 'bg-[#FCFBF7] text-[#1C1917] border-[#1C1917] shadow-[1px_1px_0px_#1C1917] hover:bg-[#B91C1C] hover:text-[#F8F5EE]'
              }`}
              title={`Filter by ${vini}`}
            >
              {vini}
            </button>
          ))}
          {mudra.viniyogas.length > 2 && (
            <span className={`text-[9px] sm:text-[10px] font-mono px-1 py-0.5 self-center ${
              isRatri ? 'text-[#9CA3AF]' : 'text-[#78716C]'
            }`}>
              +{mudra.viniyogas.length - 2} more
            </span>
          )}
        </div>
      </div>

      {/* Action CTA Button */}
      <div className={`pt-2.5 sm:pt-3 border-t ${
        isRatri ? 'border-[#262626]' : 'border-[#1C1917]/20'
      }`}>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(mudra);
          }}
          className={`w-full inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 border-[1.5px] font-serif italic font-medium text-xs sm:text-sm tracking-wide active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer ${
            isRatri
              ? 'bg-[#991B1B] text-[#F9FAFB] border-[#EF4444] shadow-[2px_2px_0px_#EF4444] sm:shadow-[3px_3px_0px_#EF4444] hover:bg-[#B91C1C] hover:shadow-[3.5px_3.5px_0px_#EF4444]'
              : 'bg-[#B91C1C] text-[#F8F5EE] border-[#1C1917] shadow-[2px_2px_0px_#1C1917] sm:shadow-[3px_3px_0px_#1C1917] hover:shadow-[3.5px_3.5px_0px_#1C1917]'
          } hover:translate-x-[-1px] hover:translate-y-[-1px]`}
        >
          <span>Inspect in 3d</span>
          <ArrowRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 group-hover:translate-x-0.5 transition-transform not-italic" />
        </button>
      </div>
    </motion.div>
  );
};
