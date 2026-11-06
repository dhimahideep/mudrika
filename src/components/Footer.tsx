import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-parchment-border bg-[#F5EFE6] text-ink-secondary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Core Natyashastra Verse Banner */}
        <div className="p-6 rounded-2xl bg-[#FDFBF7] border border-brass/40 text-center max-w-3xl mx-auto shadow-sm">
          <div className="text-[11px] font-mono tracking-widest uppercase text-alta mb-2">
            CANONICAL AESTHETIC PRINCIPLE · अभिनयदर्पण
          </div>
          <p className="font-devanagari text-lg sm:text-xl text-ink-primary font-medium leading-relaxed">
            यतो हस्तस्ततो दृष्टिर्यतो दृष्टिस्ततो मनः ।<br className="hidden sm:inline" /> यतो मनस्ततो भावो यतो भावस्ततो रसः ॥
          </p>
          <p className="mt-3 text-xs sm:text-sm font-serif italic text-ink-muted">
            “Where the hand moves, the glance follows; where the glance goes, the mind follows; where the mind goes, mood is born; where mood is born, aesthetic relish (Rasa) arises.”
          </p>
        </div>

        {/* Footer Meta Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-6 border-t border-parchment-border/70 text-xs text-ink-muted">
          <div>
            <div className="flex items-center gap-2 text-sm font-serif font-bold text-ink-primary mb-2">
              <span>Mudrika (मुद्रिका)</span>
            </div>
            <p className="leading-relaxed">
              An archival digital repository documenting the spatial, anatomical, and poetic taxonomy of classical Bharatanatyam mudras in realtime 3D.
            </p>
          </div>

          <div>
            <div className="font-mono uppercase tracking-wider text-ink-primary font-semibold mb-2">
              Primary Sources
            </div>
            <ul className="space-y-1.5">
              <li>• Abhinaya Darpana (Nandikeshvara)</li>
              <li>• Natyashastra (Bharata Muni)</li>
              <li>• Sangita Ratnakara (Sarangadeva)</li>
              <li>• Hasta Lakshana Deepika</li>
            </ul>
          </div>

          <div>
            <div className="font-mono uppercase tracking-wider text-ink-primary font-semibold mb-2">
              Hand Classifications
            </div>
            <ul className="space-y-1.5">
              <li>• <strong>Asamyukta Hastas:</strong> 28 Single-hand gestures</li>
              <li>• <strong>Samyukta Hastas:</strong> 24 Combined-hand gestures</li>
              <li>• <strong>Nritta Hastas:</strong> Pure rhythmic gestures</li>
              <li>• <strong>Bandhava Hastas:</strong> Kinship gestures</li>
            </ul>
          </div>

          <div>
            <div className="font-mono uppercase tracking-wider text-ink-primary font-semibold mb-2">
              Digital Archival Stack
            </div>
            <p className="leading-relaxed">
              Crafted with Three.js, React Three Fiber, Framer Motion, and Tailwind CSS. Rendered with interactive 3D WebGL framing, Alta lacquer detailing, and temple brass trim.
            </p>
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-parchment-border/70 text-[11px] font-mono text-ink-light">
          <div>
            © {new Date().getFullYear()} Mudrika Archival Project · Dedicated to the classical arts of India.
          </div>
          <div className="flex items-center gap-1">
            <span>Preserved with devotion and modern digital craft</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
