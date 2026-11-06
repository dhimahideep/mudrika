import { Mudra } from '../types';
import { MudraCanvas } from './MudraCanvas';

export interface Stage3DProps {
  mudra: Mudra;
  modelPath?: string;
}

export function Stage3D({ mudra, modelPath = '/models/hand2.glb' }: Stage3DProps) {
  const folioNumber = mudra.chapterIndex
    ? String(mudra.chapterIndex).padStart(2, '0')
    : '01';

  return (
    <div
      className="relative w-full h-full min-h-[420px] bg-[#F7F4EE] border border-[#E5DFD7] rounded-2xl overflow-hidden select-none flex items-center justify-center"
    >
      {/* ============================================================== */}
      {/* 1. ARCHIVAL BLUEPRINT BACKDROP: Concentric Rings & Angle Marks */}
      {/* ============================================================== */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="stageVignette" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#F7F4EE" stopOpacity="0" />
            <stop offset="100%" stopColor="#EAE4D9" stopOpacity="0.35" />
          </radialGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#stageVignette)" />

        {/* Center Origin Blueprint Grid */}
        <g transform="translate(240, 240)">
          {/* Concentric archival measurement rings in faint #DCD5CB */}
          <circle r="60" fill="none" stroke="#DCD5CB" strokeWidth="1" strokeDasharray="3 4" opacity="0.8" />
          <circle r="115" fill="none" stroke="#DCD5CB" strokeWidth="1.2" opacity="0.75" />
          <circle r="170" fill="none" stroke="#DCD5CB" strokeWidth="1" strokeDasharray="5 5" opacity="0.65" />
          <circle r="225" fill="none" stroke="#DCD5CB" strokeWidth="1.2" opacity="0.55" />
          <circle r="280" fill="none" stroke="#DCD5CB" strokeWidth="1.2" opacity="0.45" />

          {/* Coordinate crosshair axes */}
          <line x1="-300" y1="0" x2="300" y2="0" stroke="#DCD5CB" strokeWidth="1" strokeDasharray="2 6" opacity="0.7" />
          <line x1="0" y1="-300" x2="0" y2="300" stroke="#DCD5CB" strokeWidth="1" strokeDasharray="2 6" opacity="0.7" />

          {/* Diagonal degree alignment guidelines (45° / 135° / 225° / 315°) */}
          <line x1="-200" y1="-200" x2="200" y2="200" stroke="#DCD5CB" strokeWidth="0.8" strokeDasharray="2 8" opacity="0.4" />
          <line x1="-200" y1="200" x2="200" y2="-200" stroke="#DCD5CB" strokeWidth="0.8" strokeDasharray="2 8" opacity="0.4" />

          {/* Degree angle measurement labels in faint #DCD5CB */}
          <text x="125" y="-6" fill="#A89F91" fontSize="9" fontFamily="monospace" opacity="0.75" textAnchor="start">0°</text>
          <text x="125" y="-125" fill="#A89F91" fontSize="8" fontFamily="monospace" opacity="0.65" textAnchor="start">45°</text>
          <text x="0" y="-180" fill="#A89F91" fontSize="9" fontFamily="monospace" opacity="0.75" textAnchor="middle">90°</text>
          <text x="-125" y="-125" fill="#A89F91" fontSize="8" fontFamily="monospace" opacity="0.65" textAnchor="end">135°</text>
          <text x="-125" y="-6" fill="#A89F91" fontSize="9" fontFamily="monospace" opacity="0.75" textAnchor="end">180°</text>
          <text x="-125" y="125" fill="#A89F91" fontSize="8" fontFamily="monospace" opacity="0.65" textAnchor="end">225°</text>
          <text x="0" y="180" fill="#A89F91" fontSize="9" fontFamily="monospace" opacity="0.75" textAnchor="middle">270°</text>
          <text x="125" y="125" fill="#A89F91" fontSize="8" fontFamily="monospace" opacity="0.65" textAnchor="start">315°</text>
        </g>
      </svg>

      {/* ============================================================== */}
      {/* 2. TOP BADGE: Preserved Archival Folio Reference               */}
      {/* ============================================================== */}
      <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2 backdrop-blur-md bg-white/85 px-3.5 py-1.5 rounded-full border border-[#E5DFD7] shadow-sm z-20">
        <span className="w-1.5 h-1.5 rounded-full bg-alta animate-pulse" />
        <span className="text-[10px] font-mono tracking-widest uppercase text-ink-muted font-medium">
          FOLIO #{folioNumber} / {mudra.category.toUpperCase()} HASTA
        </span>
      </div>

      {/* ============================================================== */}
      {/* 3. 3D WEBGL STAGE: Three.js Canvas with Clean Manual Framing   */}
      {/* ============================================================== */}
      <div className="absolute inset-0 w-full h-full z-10">
        <MudraCanvas modelPath={modelPath} showControls={true} />
      </div>

      {/* ============================================================== */}
      {/* 4. FOOTER: Quick Interaction Guide                             */}
      {/* ============================================================== */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-ink-muted/80 backdrop-blur-sm bg-white/70 px-3 py-1 rounded-full border border-[#E5DFD7]/60 z-20">
        <span className="w-1.5 h-1.5 rounded-full bg-alta" />
        <span>DRAG TO ROTATE · SCROLL TO ZOOM</span>
      </div>
    </div>
  );
}

// Aliases for compatibility
export { MudraCanvas } from './MudraCanvas';
export const ClassicalHand3D = Stage3D;
export const MudraModel = Stage3D;
export default Stage3D;
