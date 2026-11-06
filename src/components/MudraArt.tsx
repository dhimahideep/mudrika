interface MudraArtProps {
  mudraId: string;
  className?: string;
  size?: number;
}

// High-resolution SVG / vector line-art silhouettes with authentic Alta crimson detailing (#B91C1C)
// and warm Indian sandalwood skin tones (#E4BD9C / #D6A47D)
export function MudraArt({ mudraId, className = '', size = 320 }: MudraArtProps) {
  // Common visual definitions: skin gradient, Alta vermilion gradient, gold accents
  const defs = (
    <defs>
      {/* Warm Indian Sandalwood Skin Gradient */}
      <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F5D5BA" />
        <stop offset="50%" stopColor="#E4BD9C" />
        <stop offset="100%" stopColor="#D0A27E" />
      </linearGradient>

      {/* Volar Palmar Shadow */}
      <linearGradient id="palmShade" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#DEAC87" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#B37851" stopOpacity="0.8" />
      </linearGradient>

      {/* Authentic Alta Crimson Lacquer (Alaktaka / Mahavar) */}
      <linearGradient id="altaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#D92626" />
        <stop offset="50%" stopColor="#B91C1C" />
        <stop offset="100%" stopColor="#8A0F0F" />
      </linearGradient>

      {/* Temple Gold Bangle Shimmer */}
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#D6B048" />
        <stop offset="50%" stopColor="#F2D879" />
        <stop offset="100%" stopColor="#B38B26" />
      </linearGradient>

      {/* Soft Drop Shadow for Palm Layering */}
      <filter id="handShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#2A1D15" floodOpacity="0.16" />
      </filter>
    </defs>
  );

  // Common wrist base with classical Alta band and temple gold bangles
  const wristBase = (
    <g id="wrist-base">
      {/* Forearm / Wrist */}
      <path
        d="M 125 240 C 122 280 120 310 118 330 L 182 330 C 180 310 178 280 175 240 Z"
        fill="url(#skinGrad)"
        stroke="#2E2017"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* Alta Crimson Wrist Ribbon */}
      <path
        d="M 121 285 C 135 291 165 291 179 285 L 180 293 C 165 299 135 299 120 293 Z"
        fill="url(#altaGrad)"
        stroke="#2E2017"
        strokeWidth="1.2"
      />
      {/* Temple Gold Bangles (Valayal / Kangan) */}
      <ellipse cx="150" cy="304" rx="31" ry="5.5" fill="none" stroke="url(#goldGrad)" strokeWidth="4.5" />
      <ellipse cx="150" cy="304" rx="31" ry="5.5" fill="none" stroke="#2E2017" strokeWidth="1" />
      <ellipse cx="150" cy="316" rx="32" ry="5.5" fill="none" stroke="url(#goldGrad)" strokeWidth="4" />
      <ellipse cx="150" cy="316" rx="32" ry="5.5" fill="none" stroke="#2E2017" strokeWidth="1" />
    </g>
  );

  // Palm Alta Mandala
  const palmMandala = (cx = 150, cy = 180, r = 16) => (
    <g id="palm-mandala">
      <circle cx={cx} cy={cy} r={r} fill="url(#altaGrad)" stroke="#8A0F0F" strokeWidth="1.2" />
      <circle cx={cx} cy={cy} r={r * 0.28} fill="url(#goldGrad)" />
    </g>
  );

  // Render specific mudra vector geometry based on mudraId
  const renderMudraContent = () => {
    switch (mudraId) {
      // 1. PATAKA (Flag): All 4 fingers straight up, pressed together; thumb bent touching index base.
      case 'pataka':
        return (
          <g>
            {wristBase}
            {/* Palm */}
            <path
              d="M 125 240 C 120 190 122 150 126 130 C 130 120 170 120 174 130 C 178 150 180 190 175 240 Z"
              fill="url(#skinGrad)"
              stroke="#2E2017"
              strokeWidth="2.2"
            />
            {/* 4 Joined Straight Fingers */}
            {/* Index */}
            <path d="M 126 130 L 126 48 C 126 38 138 38 138 48 L 138 126" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 126 58 C 126 38 138 38 138 58 Z" fill="url(#altaGrad)" stroke="#2E2017" strokeWidth="1.2" />
            {/* Middle */}
            <path d="M 138 126 L 138 36 C 138 26 150 26 150 36 L 150 125" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 138 48 C 138 26 150 26 150 48 Z" fill="url(#altaGrad)" stroke="#2E2017" strokeWidth="1.2" />
            {/* Ring */}
            <path d="M 150 125 L 150 46 C 150 36 162 36 162 46 L 162 127" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 150 56 C 150 36 162 36 162 56 Z" fill="url(#altaGrad)" stroke="#2E2017" strokeWidth="1.2" />
            {/* Little */}
            <path d="M 162 127 L 162 68 C 162 58 174 58 174 68 L 174 135" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 162 76 C 162 58 174 58 174 76 Z" fill="url(#altaGrad)" stroke="#2E2017" strokeWidth="1.2" />
            {/* Thumb bent touching base of index */}
            <path
              d="M 125 210 C 108 200 102 185 106 170 C 110 155 125 158 132 165 C 136 172 134 185 128 195 Z"
              fill="url(#skinGrad)"
              stroke="#2E2017"
              strokeWidth="2.2"
            />
            <path d="M 108 170 C 114 156 126 158 130 167 C 124 175 116 178 108 170 Z" fill="url(#altaGrad)" />
            {palmMandala(150, 185, 15)}
          </g>
        );

      // 2. TRIPATAKA (Three Parts of a Flag): Ring finger bent downward at knuckle; others straight.
      case 'tripataka':
        return (
          <g>
            {wristBase}
            <path d="M 125 240 C 120 190 122 150 126 130 C 130 120 170 120 174 130 C 178 150 180 190 175 240 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            {/* Index Straight */}
            <path d="M 126 130 L 126 48 C 126 38 138 38 138 48 L 138 126" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 126 58 C 126 38 138 38 138 58 Z" fill="url(#altaGrad)" />
            {/* Middle Straight */}
            <path d="M 138 126 L 138 36 C 138 26 150 26 150 36 L 150 125" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 138 48 C 138 26 150 26 150 48 Z" fill="url(#altaGrad)" />
            {/* Ring Finger BENT DOWN */}
            <path d="M 150 125 C 150 148 162 148 162 125 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 151 138 C 151 154 161 154 161 138 Z" fill="url(#altaGrad)" stroke="#2E2017" strokeWidth="1" />
            {/* Little Finger Straight */}
            <path d="M 162 127 L 162 68 C 162 58 174 58 174 68 L 174 135" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 162 76 C 162 58 174 58 174 76 Z" fill="url(#altaGrad)" />
            {/* Thumb */}
            <path d="M 125 210 C 108 200 102 185 106 170 C 110 155 125 158 132 165 C 136 172 134 185 128 195 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 108 170 C 114 156 126 158 130 167 C 124 175 116 178 108 170 Z" fill="url(#altaGrad)" />
            {palmMandala(148, 185, 14)}
          </g>
        );

      // 3. ARDHAPATAKA (Half Flag): Ring and little finger bent down together; index & middle straight.
      case 'ardhapataka':
        return (
          <g>
            {wristBase}
            <path d="M 125 240 C 120 190 122 150 126 130 C 130 120 170 120 174 130 C 178 150 180 190 175 240 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            {/* Index Straight */}
            <path d="M 126 130 L 126 48 C 126 38 138 38 138 48 L 138 126" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 126 58 C 126 38 138 38 138 58 Z" fill="url(#altaGrad)" />
            {/* Middle Straight */}
            <path d="M 138 126 L 138 36 C 138 26 150 26 150 36 L 150 125" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 138 48 C 138 26 150 26 150 48 Z" fill="url(#altaGrad)" />
            {/* Ring Bent Down */}
            <path d="M 150 125 C 150 152 162 152 162 125 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 151 140 C 151 155 161 155 161 140 Z" fill="url(#altaGrad)" />
            {/* Little Bent Down */}
            <path d="M 162 127 C 162 156 174 156 174 127 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 163 144 C 163 158 173 158 173 144 Z" fill="url(#altaGrad)" />
            {/* Thumb */}
            <path d="M 125 210 C 108 200 102 185 106 170 C 110 155 125 158 132 165 C 136 172 134 185 128 195 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 108 170 C 114 156 126 158 130 167 C 124 175 116 178 108 170 Z" fill="url(#altaGrad)" />
            {palmMandala(146, 185, 14)}
          </g>
        );

      // 4. KARTARIMUKHA (Scissors Face): Index & middle in sharp 'V' shape; ring & thumb touching; pinky bent.
      case 'kartarimukha':
        return (
          <g>
            {wristBase}
            <path d="M 125 240 C 120 190 122 150 126 130 C 130 120 170 120 174 130 C 178 150 180 190 175 240 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            {/* Index splayed left */}
            <path d="M 130 128 L 112 46 C 110 36 122 34 126 44 L 140 125" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 116 54 C 110 38 122 34 125 48 Z" fill="url(#altaGrad)" />
            {/* Middle splayed right (V-shape) */}
            <path d="M 140 125 L 160 40 C 164 30 176 34 172 44 L 152 126" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 158 48 C 164 30 176 34 170 54 Z" fill="url(#altaGrad)" />
            {/* Ring and thumb touching inward */}
            <path d="M 148 126 C 145 158 160 165 154 140 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2" />
            <circle cx="152" cy="154" r="7" fill="url(#altaGrad)" />
            {/* Pinky bent inward */}
            <path d="M 162 130 C 168 155 174 150 172 132 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2" />
            {/* Thumb curved inward meeting ring */}
            <path d="M 125 205 C 115 185 130 165 146 156" fill="none" stroke="#2E2017" strokeWidth="2.2" strokeLinecap="round" />
            {palmMandala(142, 192, 13)}
          </g>
        );

      // 5. MAYURA (Peacock): Ring finger tip touches thumb tip; index, middle, pinky straight and joined.
      case 'mayura':
        return (
          <g>
            {wristBase}
            <path d="M 125 240 C 120 190 122 150 126 130 C 130 120 170 120 174 130 C 178 150 180 190 175 240 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            {/* Index upright */}
            <path d="M 126 130 L 126 48 C 126 38 138 38 138 48 L 138 126" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 126 58 C 126 38 138 38 138 58 Z" fill="url(#altaGrad)" />
            {/* Middle upright */}
            <path d="M 138 126 L 138 36 C 138 26 150 26 150 36 L 150 125" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 138 48 C 138 26 150 26 150 48 Z" fill="url(#altaGrad)" />
            {/* Pinky upright */}
            <path d="M 166 128 L 168 64 C 168 54 180 56 178 66 L 174 132" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 168 72 C 168 54 180 56 177 74 Z" fill="url(#altaGrad)" />
            {/* Ring finger and Thumb loop (eye of peacock) */}
            <path d="M 150 125 C 145 155 160 168 152 145 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2" />
            <path d="M 124 205 C 114 180 134 160 148 152" fill="none" stroke="#2E2017" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="150" cy="152" r="6" fill="url(#altaGrad)" />
            {palmMandala(145, 190, 13)}
          </g>
        );

      // 6. ARDHACHANDRA (Half Moon): 4 fingers upright joined; thumb stretched wide outward at 90° forming crescent.
      case 'ardhachandra':
        return (
          <g>
            {wristBase}
            <path d="M 125 240 C 120 190 122 150 126 130 C 130 120 170 120 174 130 C 178 150 180 190 175 240 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            {/* 4 Joined Straight Fingers */}
            <path d="M 126 130 L 126 48 C 126 38 138 38 138 48 L 138 126" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 126 58 C 126 38 138 38 138 58 Z" fill="url(#altaGrad)" />
            <path d="M 138 126 L 138 36 C 138 26 150 26 150 36 L 150 125" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 138 48 C 138 26 150 26 150 48 Z" fill="url(#altaGrad)" />
            <path d="M 150 125 L 150 46 C 150 36 162 36 162 46 L 162 127" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 150 56 C 150 36 162 36 162 56 Z" fill="url(#altaGrad)" />
            <path d="M 162 127 L 162 68 C 162 58 174 58 174 68 L 174 135" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 162 76 C 162 58 174 58 174 76 Z" fill="url(#altaGrad)" />
            {/* Thumb stretched wide outward forming deep 'C' crescent */}
            <path
              d="M 126 215 C 95 210 65 195 62 178 C 60 168 74 165 85 174 C 105 188 120 182 126 155"
              fill="url(#skinGrad)"
              stroke="#2E2017"
              strokeWidth="2.2"
            />
            <path d="M 62 178 C 60 168 74 165 82 174 C 74 184 66 184 62 178 Z" fill="url(#altaGrad)" />
            {palmMandala(150, 185, 15)}
          </g>
        );

      // 7. ARALA (Bent): Index finger curved downward like a bow; others upright; thumb tucked.
      case 'arala':
        return (
          <g>
            {wristBase}
            <path d="M 125 240 C 120 190 122 150 126 130 C 130 120 170 120 174 130 C 178 150 180 190 175 240 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            {/* Index bent downward like a bow */}
            <path d="M 126 130 C 120 90 108 90 114 125 C 118 145 130 145 134 128" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 112 110 C 108 90 120 90 122 110 Z" fill="url(#altaGrad)" />
            {/* Middle, Ring, Little Upright */}
            <path d="M 138 126 L 138 36 C 138 26 150 26 150 36 L 150 125" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 138 48 C 138 26 150 26 150 48 Z" fill="url(#altaGrad)" />
            <path d="M 150 125 L 150 46 C 150 36 162 36 162 46 L 162 127" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 150 56 C 150 36 162 36 162 56 Z" fill="url(#altaGrad)" />
            <path d="M 162 127 L 162 68 C 162 58 174 58 174 68 L 174 135" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 162 76 C 162 58 174 58 174 76 Z" fill="url(#altaGrad)" />
            {/* Thumb tucked at index base */}
            <path d="M 125 210 C 112 200 112 175 125 170 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2" />
            <path d="M 114 182 C 112 172 122 170 125 180 Z" fill="url(#altaGrad)" />
            {palmMandala(152, 185, 14)}
          </g>
        );

      // 8. SHUKATUNDA (Parrot's Beak): Index and ring curved inward toward palm; middle and pinky upright.
      case 'shukatunda':
        return (
          <g>
            {wristBase}
            <path d="M 125 240 C 120 190 122 150 126 130 C 130 120 170 120 174 130 C 178 150 180 190 175 240 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            {/* Index bent downward */}
            <path d="M 126 130 C 120 90 108 90 114 125 C 118 145 130 145 134 128" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 112 110 C 108 90 120 90 122 110 Z" fill="url(#altaGrad)" />
            {/* Middle Upright */}
            <path d="M 138 126 L 138 36 C 138 26 150 26 150 36 L 150 125" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 138 48 C 138 26 150 26 150 48 Z" fill="url(#altaGrad)" />
            {/* Ring bent downward */}
            <path d="M 150 125 C 146 100 158 100 160 125 C 160 145 150 145 150 125" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 148 114 C 146 100 158 100 158 114 Z" fill="url(#altaGrad)" />
            {/* Pinky Upright */}
            <path d="M 162 127 L 162 68 C 162 58 174 58 174 68 L 174 135" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 162 76 C 162 58 174 58 174 76 Z" fill="url(#altaGrad)" />
            {/* Thumb tucked */}
            <path d="M 125 210 C 112 200 112 175 125 170 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2" />
            {palmMandala(145, 185, 14)}
          </g>
        );

      // 9. MUSHTI (Fist): All 4 fingers curled into tight closed fist; thumb pressed horizontally across them.
      case 'mushti':
        return (
          <g>
            {wristBase}
            {/* Knuckle Clenched Foundation */}
            <path
              d="M 122 240 C 116 185 116 135 125 120 C 135 110 175 110 182 125 C 185 150 182 195 175 240 Z"
              fill="url(#skinGrad)"
              stroke="#2E2017"
              strokeWidth="2.2"
            />
            {/* Four Curled Knuckles */}
            <ellipse cx="132" cy="120" rx="9" ry="12" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2" />
            <ellipse cx="148" cy="116" rx="9" ry="13" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2" />
            <ellipse cx="164" cy="118" rx="9" ry="12" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2" />
            <ellipse cx="178" cy="125" rx="8" ry="11" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2" />
            {/* Folded Finger Bar */}
            <rect x="124" y="132" width="56" height="34" rx="8" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            {/* Thumb wrapped horizontally across the fingers */}
            <path
              d="M 112 205 C 108 170 120 150 142 145 C 160 142 175 145 176 156 C 176 166 155 168 135 172 C 122 176 118 190 118 205 Z"
              fill="url(#skinGrad)"
              stroke="#2E2017"
              strokeWidth="2.2"
            />
            <path d="M 160 143 C 175 145 176 156 168 162 C 158 158 156 148 160 143 Z" fill="url(#altaGrad)" />
          </g>
        );

      // 10. SHIKHARA (Peak / Spire): Tight fist with thumb extended straight up vertically (thumbs up).
      case 'shikhara':
        return (
          <g>
            {wristBase}
            <path
              d="M 122 240 C 116 185 116 135 125 120 C 135 110 175 110 182 125 C 185 150 182 195 175 240 Z"
              fill="url(#skinGrad)"
              stroke="#2E2017"
              strokeWidth="2.2"
            />
            {/* 4 Curled Knuckles */}
            <ellipse cx="138" cy="122" rx="8" ry="11" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2" />
            <ellipse cx="152" cy="120" rx="8" ry="11" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2" />
            <ellipse cx="166" cy="122" rx="8" ry="11" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2" />
            <ellipse cx="178" cy="128" rx="7" ry="10" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2" />
            <rect x="130" y="132" width="50" height="34" rx="8" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            {/* Thumb extending straight up vertically (Spire) */}
            <path
              d="M 124 205 C 114 190 114 140 114 62 C 114 46 132 46 132 62 L 132 145 C 132 175 130 195 124 205 Z"
              fill="url(#skinGrad)"
              stroke="#2E2017"
              strokeWidth="2.2"
            />
            <path d="M 114 68 C 114 46 132 46 132 68 Z" fill="url(#altaGrad)" />
          </g>
        );

      // 11. KAPITTHA (Elephant Apple): Shikhara fist with thumb bent down; index curled tightly over top of thumb.
      case 'kapittha':
        return (
          <g>
            {wristBase}
            <path d="M 122 240 C 116 185 116 135 125 120 C 135 110 175 110 182 125 C 185 150 182 195 175 240 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <ellipse cx="152" cy="120" rx="8" ry="11" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2" />
            <ellipse cx="166" cy="122" rx="8" ry="11" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2" />
            <ellipse cx="178" cy="128" rx="7" ry="10" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2" />
            {/* Thumb upright with tip bent slightly */}
            <path d="M 120 200 C 115 160 118 100 128 85 C 136 85 136 100 134 140 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            {/* Index curled tightly over top of thumb */}
            <path
              d="M 128 135 C 118 100 118 70 132 68 C 146 66 146 95 136 115 Z"
              fill="url(#skinGrad)"
              stroke="#2E2017"
              strokeWidth="2.2"
            />
            <path d="M 128 72 C 132 66 142 66 142 78 C 136 85 130 82 128 72 Z" fill="url(#altaGrad)" />
          </g>
        );

      // 12. KATAKAMUKHA (Opening in Bracelet): Index & middle tips touching thumb tip; ring & little extended upward.
      case 'katakamukha':
        return (
          <g>
            {wristBase}
            <path d="M 125 240 C 120 190 122 150 126 130 C 130 120 170 120 174 130 C 178 150 180 190 175 240 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            {/* Ring and Little extended upward and slightly curved */}
            <path d="M 152 125 L 158 52 C 160 40 172 44 170 56 L 164 126" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 158 60 C 160 40 172 44 170 64 Z" fill="url(#altaGrad)" />
            <path d="M 166 128 L 174 68 C 176 56 186 60 184 72 L 174 135" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 174 76 C 176 56 186 60 184 80 Z" fill="url(#altaGrad)" />
            {/* Index, Middle & Thumb forming delicate bracelet ring loop */}
            <path d="M 128 130 C 120 100 135 95 142 120" fill="none" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 138 126 C 132 95 145 92 148 118" fill="none" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 125 205 C 115 170 125 140 144 122" fill="none" stroke="#2E2017" strokeWidth="2.2" />
            {/* Meeting Point Alta Lacquer Ring */}
            <circle cx="144" cy="120" r="7" fill="url(#altaGrad)" stroke="#2E2017" strokeWidth="1" />
            {palmMandala(145, 185, 13)}
          </g>
        );

      // 13. SUCHI (Needle): Index finger pointing straight up; others curled in tight fist with thumb.
      case 'suchi':
        return (
          <g>
            {wristBase}
            <path d="M 122 240 C 116 185 116 135 125 120 C 135 110 175 110 182 125 C 185 150 182 195 175 240 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            {/* Index finger pointing skyward */}
            <path d="M 126 125 L 126 34 C 126 22 138 22 138 34 L 138 125" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 126 46 C 126 22 138 22 138 46 Z" fill="url(#altaGrad)" />
            {/* Other three fingers curled into fist */}
            <ellipse cx="148" cy="124" rx="8" ry="11" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2" />
            <ellipse cx="162" cy="126" rx="8" ry="11" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2" />
            <ellipse cx="174" cy="132" rx="7" ry="10" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2" />
            {/* Thumb curled over folded fingers */}
            <path d="M 125 200 C 118 165 132 145 154 148 C 160 155 155 168 135 172 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2" />
            <circle cx="152" cy="154" r="5" fill="url(#altaGrad)" />
          </g>
        );

      // 14. CHANDRAKALA (Crescent Moon): Index pointing straight up; thumb stretched wide at 90-degree 'L'.
      case 'chandrakala':
        return (
          <g>
            {wristBase}
            <path d="M 122 240 C 116 185 116 135 125 120 C 135 110 175 110 182 125 C 185 150 182 195 175 240 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            {/* Index pointing straight up */}
            <path d="M 126 125 L 126 34 C 126 22 138 22 138 34 L 138 125" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 126 46 C 126 22 138 22 138 46 Z" fill="url(#altaGrad)" />
            {/* Thumb stretched wide outward forming 90° 'L' */}
            <path
              d="M 124 210 C 95 205 66 188 64 172 C 62 162 76 160 86 168 C 104 182 118 175 126 150"
              fill="url(#skinGrad)"
              stroke="#2E2017"
              strokeWidth="2.2"
            />
            <path d="M 64 172 C 62 162 76 160 82 168 C 76 178 68 178 64 172 Z" fill="url(#altaGrad)" />
            {/* Remaining 3 fingers curled in */}
            <ellipse cx="148" cy="126" rx="8" ry="11" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2" />
            <ellipse cx="162" cy="128" rx="8" ry="11" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2" />
            <ellipse cx="174" cy="134" rx="7" ry="10" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2" />
          </g>
        );

      // 15. PADMAKOSHA (Lotus Bud): All 5 fingers curved inward forming a hollow chalice/bud.
      case 'padmakosha':
        return (
          <g>
            {wristBase}
            <path d="M 125 240 C 120 190 125 160 132 145 C 140 140 162 140 170 145 C 178 160 180 190 175 240 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            {/* 5 curved inward fingers forming lotus chalice */}
            <path d="M 132 145 C 120 90 140 70 144 80 C 140 100 138 120 142 142" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2" />
            <path d="M 142 142 C 135 85 148 60 152 70 C 148 95 148 115 152 140" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2" />
            <path d="M 152 140 C 150 78 162 60 166 72 C 160 95 158 115 160 142" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2" />
            <path d="M 160 142 C 165 85 178 75 178 88 C 172 105 168 125 168 145" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2" />
            {/* Thumb curving to center */}
            <path d="M 125 210 C 105 180 120 130 138 115" fill="none" stroke="#2E2017" strokeWidth="2.2" strokeLinecap="round" />
            {/* Alta tips meeting around center hollow */}
            <circle cx="144" cy="80" r="5" fill="url(#altaGrad)" />
            <circle cx="152" cy="70" r="5" fill="url(#altaGrad)" />
            <circle cx="166" cy="72" r="5" fill="url(#altaGrad)" />
            <circle cx="178" cy="88" r="5" fill="url(#altaGrad)" />
            <circle cx="138" cy="115" r="5" fill="url(#altaGrad)" />
          </g>
        );

      // 16. SARPASHIRSHA (Snake Hood): 4 fingers straight, joined, bent forward at knuckles (hood).
      case 'sarpashirsha':
        return (
          <g>
            {wristBase}
            <path d="M 125 240 C 120 190 122 150 126 130 C 130 120 170 120 174 130 C 178 150 180 190 175 240 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            {/* Curved Cobra Hood fingers */}
            <path
              d="M 126 130 C 120 70 145 60 150 75 C 152 100 148 115 148 126"
              fill="url(#skinGrad)"
              stroke="#2E2017"
              strokeWidth="2.2"
            />
            <path
              d="M 148 126 C 145 65 170 58 174 72 C 176 95 174 115 174 130"
              fill="url(#skinGrad)"
              stroke="#2E2017"
              strokeWidth="2.2"
            />
            {/* Hood Alta Tip */}
            <path d="M 128 75 C 135 62 165 62 172 75 Z" fill="url(#altaGrad)" />
            {/* Thumb tucked along side */}
            <path d="M 125 210 C 112 195 115 170 128 165 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2" />
            {palmMandala(150, 185, 14)}
          </g>
        );

      // 17. MRIGASHIRSHA (Deer Head): Middle & ring bent touching thumb; index & little pointing up (deer ears).
      case 'mrigashirsha':
        return (
          <g>
            {wristBase}
            <path d="M 125 240 C 120 190 122 150 126 130 C 130 120 170 120 174 130 C 178 150 180 190 175 240 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            {/* Index standing up (Left Ear / Horn) */}
            <path d="M 126 130 L 118 48 C 118 36 130 36 130 48 L 136 126" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 118 56 C 118 36 130 36 130 56 Z" fill="url(#altaGrad)" />
            {/* Little standing up (Right Ear / Horn) */}
            <path d="M 164 130 L 172 58 C 172 46 184 46 184 58 L 174 135" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 172 66 C 172 46 184 46 184 66 Z" fill="url(#altaGrad)" />
            {/* Middle & Ring bent forward meeting thumb (snout) */}
            <path d="M 136 126 C 136 160 164 160 164 128 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 124 205 C 114 175 130 152 148 148" fill="none" stroke="#2E2017" strokeWidth="2.2" strokeLinecap="round" />
            {/* Meeting snout tip in Alta */}
            <circle cx="150" cy="150" r="7" fill="url(#altaGrad)" stroke="#2E2017" strokeWidth="1" />
            {palmMandala(150, 190, 13)}
          </g>
        );

      // 18. SIMHAMUKHA (Lion Face): Middle & ring touching thumb; index & little spread straight outward.
      case 'simhamukha':
        return (
          <g>
            {wristBase}
            <path d="M 125 240 C 120 190 122 150 126 130 C 130 120 170 120 174 130 C 178 150 180 190 175 240 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            {/* Index splayed wide outward */}
            <path d="M 128 130 L 102 54 C 98 42 110 38 116 48 L 136 126" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 104 60 C 98 42 110 38 114 54 Z" fill="url(#altaGrad)" />
            {/* Little splayed wide outward */}
            <path d="M 164 130 L 186 54 C 190 42 202 46 198 58 L 174 135" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 186 60 C 190 42 202 46 196 62 Z" fill="url(#altaGrad)" />
            {/* Middle & Ring meeting thumb in lion mouth */}
            <path d="M 136 126 C 136 160 164 160 164 128 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 124 205 C 114 175 130 152 148 148" fill="none" stroke="#2E2017" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="150" cy="150" r="7" fill="url(#altaGrad)" />
            {palmMandala(150, 190, 13)}
          </g>
        );

      // 19. KANGULA: Ring finger curled into palm; index, middle, little, and thumb extended outward.
      case 'kangula':
        return (
          <g>
            {wristBase}
            <path d="M 125 240 C 120 190 122 150 126 130 C 130 120 170 120 174 130 C 178 150 180 190 175 240 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            {/* Index, Middle extended */}
            <path d="M 126 130 L 122 52 C 122 40 134 40 134 52 L 138 126" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 122 62 C 122 40 134 40 134 62 Z" fill="url(#altaGrad)" />
            <path d="M 138 126 L 142 42 C 142 30 154 30 154 42 L 150 125" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 142 52 C 142 30 154 30 154 52 Z" fill="url(#altaGrad)" />
            {/* Ring finger curled deep into palm */}
            <path d="M 150 125 C 148 165 162 165 162 127 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <circle cx="155" cy="155" r="5" fill="url(#altaGrad)" />
            {/* Pinky extended */}
            <path d="M 162 127 L 170 68 C 170 56 182 56 182 68 L 174 135" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 170 76 C 170 56 182 56 182 76 Z" fill="url(#altaGrad)" />
            {/* Thumb extended outward */}
            <path d="M 125 210 C 105 195 90 175 96 160 C 102 148 116 155 125 170" fill="none" stroke="#2E2017" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="96" cy="160" r="5" fill="url(#altaGrad)" />
            {palmMandala(145, 185, 13)}
          </g>
        );

      // 20. ALAPADMA (Full Bloomed Lotus): All 5 fingers spread wide, separated, curved outward in blooming flower.
      case 'alapadma':
        return (
          <g>
            {wristBase}
            <path d="M 125 240 C 120 190 122 160 130 150 C 140 145 165 145 172 150 C 178 160 180 190 175 240 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            {/* 5 Fanned, Undulating Lotus Petal Fingers */}
            {/* Thumb spread wide left */}
            <path d="M 128 175 C 95 165 80 140 85 128 C 92 118 108 125 118 145" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 85 128 C 92 118 102 122 98 135 Z" fill="url(#altaGrad)" />
            {/* Index curved outward left */}
            <path d="M 130 150 C 105 105 110 65 122 68 C 130 72 132 105 138 146" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 116 75 C 110 65 122 68 126 78 Z" fill="url(#altaGrad)" />
            {/* Middle curved upright */}
            <path d="M 138 146 C 136 90 148 50 154 52 C 160 55 158 95 156 146" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 148 60 C 148 50 154 52 156 62 Z" fill="url(#altaGrad)" />
            {/* Ring curved right */}
            <path d="M 156 146 C 160 95 178 68 184 74 C 188 80 175 115 168 148" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 176 80 C 178 68 184 74 180 86 Z" fill="url(#altaGrad)" />
            {/* Little curved wide right */}
            <path d="M 168 148 C 180 115 208 95 212 104 C 215 115 195 140 172 152" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 204 104 C 208 95 212 104 206 114 Z" fill="url(#altaGrad)" />
            {palmMandala(151, 175, 14)}
          </g>
        );

      // 21. CHATURA: 4 fingers straight and touching; thumb rested flat at root of ring finger.
      case 'chatura':
        return (
          <g>
            {wristBase}
            <path d="M 125 240 C 120 190 122 150 126 130 C 130 120 170 120 174 130 C 178 150 180 190 175 240 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            {/* 4 Straight Fingers Touching */}
            <path d="M 126 130 L 126 55 C 126 45 138 45 138 55 L 138 126" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 126 65 C 126 45 138 45 138 65 Z" fill="url(#altaGrad)" />
            <path d="M 138 126 L 138 45 C 138 35 150 35 150 45 L 150 125" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 138 55 C 138 35 150 35 150 55 Z" fill="url(#altaGrad)" />
            <path d="M 150 125 L 150 52 C 150 42 162 42 162 52 L 162 127" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 150 62 C 150 42 162 42 162 62 Z" fill="url(#altaGrad)" />
            <path d="M 162 127 L 162 70 C 162 60 174 60 174 70 L 174 135" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 162 78 C 162 60 174 60 174 78 Z" fill="url(#altaGrad)" />
            {/* Thumb rested flat inside palm reaching toward ring root */}
            <path d="M 125 210 C 120 185 136 175 156 168 C 162 174 158 185 135 192 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2" />
            <path d="M 150 168 C 158 168 162 174 156 178 Z" fill="url(#altaGrad)" />
            {palmMandala(145, 185, 13)}
          </g>
        );

      // 22. BHRAMARA (Black Bee): Index curled to thumb root; thumb touches side of middle; ring & little straight up.
      case 'bhramara':
        return (
          <g>
            {wristBase}
            <path d="M 125 240 C 120 190 122 150 126 130 C 130 120 170 120 174 130 C 178 150 180 190 175 240 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            {/* Ring and Little Straight Up */}
            <path d="M 150 125 L 154 50 C 154 40 166 40 166 50 L 162 127" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 154 60 C 154 40 166 40 166 60 Z" fill="url(#altaGrad)" />
            <path d="M 164 127 L 170 68 C 170 58 182 58 182 68 L 174 135" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 170 76 C 170 58 182 58 182 76 Z" fill="url(#altaGrad)" />
            {/* Index curled deep to root of thumb */}
            <path d="M 126 130 C 124 165 140 165 138 135 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2" />
            {/* Thumb touching side of middle finger */}
            <path d="M 124 205 C 114 175 135 145 146 125" fill="none" stroke="#2E2017" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="144" cy="126" r="6" fill="url(#altaGrad)" />
            {palmMandala(145, 185, 13)}
          </g>
        );

      // 23. HAMSASYA (Swan Beak): Index tip and thumb tip touching in delicate pinch; others upright & separated.
      case 'hamsasya':
        return (
          <g>
            {wristBase}
            <path d="M 125 240 C 120 190 122 150 126 130 C 130 120 170 120 174 130 C 178 150 180 190 175 240 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            {/* Middle, Ring, Pinky upright and separated */}
            <path d="M 144 125 L 146 44 C 146 34 158 34 158 44 L 152 126" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 146 54 C 146 34 158 34 158 54 Z" fill="url(#altaGrad)" />
            <path d="M 154 126 L 162 50 C 162 40 174 42 172 52 L 164 128" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 162 60 C 162 40 174 42 172 62 Z" fill="url(#altaGrad)" />
            <path d="M 166 128 L 176 68 C 178 58 188 60 186 70 L 174 135" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 176 76 C 178 58 188 60 186 78 Z" fill="url(#altaGrad)" />
            {/* Index and Thumb meeting in delicate swan beak */}
            <path d="M 126 130 C 118 100 132 90 136 112" fill="none" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 125 205 C 115 170 122 135 136 114" fill="none" stroke="#2E2017" strokeWidth="2.2" />
            <circle cx="136" cy="113" r="6" fill="url(#altaGrad)" stroke="#2E2017" strokeWidth="1" />
            {palmMandala(145, 185, 13)}
          </g>
        );

      // 24. HAMSAPAKSHA (Swan Wing): Little finger straight up; thumb tucked; index, middle, ring slightly slanted.
      case 'hamsapaksha':
        return (
          <g>
            {wristBase}
            <path d="M 125 240 C 120 190 122 150 126 130 C 130 120 170 120 174 130 C 178 150 180 190 175 240 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            {/* Little finger standing straight UP */}
            <path d="M 166 130 L 174 54 C 176 42 188 44 186 56 L 174 135" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 174 62 C 176 42 188 44 186 64 Z" fill="url(#altaGrad)" />
            {/* Index, Middle, Ring slightly slanted in a cascade */}
            <path d="M 126 130 C 126 85 138 78 140 95 L 140 126" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 130 84 C 126 78 138 78 140 90 Z" fill="url(#altaGrad)" />
            <path d="M 140 126 C 142 80 152 75 154 90 L 152 126" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 144 80 C 142 75 152 75 154 85 Z" fill="url(#altaGrad)" />
            <path d="M 152 126 C 156 75 166 70 166 85 L 164 128" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 158 76 C 156 70 166 70 166 80 Z" fill="url(#altaGrad)" />
            {/* Thumb tucked inward */}
            <path d="M 125 210 C 112 195 115 170 128 165 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2" />
            {palmMandala(145, 185, 13)}
          </g>
        );

      // 25. SANDAMSHA (Pincers): All fingertips gathered touching thumb tip in a tight point.
      case 'sandamsha':
        return (
          <g>
            {wristBase}
            <path d="M 125 240 C 120 190 122 150 126 130 C 130 120 170 120 174 130 C 178 150 180 190 175 240 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            {/* All 5 fingers curving in to pinch together at (150, 110) */}
            <path d="M 126 130 C 124 95 145 95 150 110" fill="none" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 138 126 C 138 92 148 92 150 110" fill="none" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 150 125 C 150 90 152 92 150 110" fill="none" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 162 127 C 164 92 154 95 150 110" fill="none" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 125 205 C 115 160 130 130 150 110" fill="none" stroke="#2E2017" strokeWidth="2.2" />
            {/* Gathered Alta Pincer Tip */}
            <ellipse cx="150" cy="110" rx="8" ry="7" fill="url(#altaGrad)" stroke="#2E2017" strokeWidth="1" />
            {palmMandala(145, 185, 13)}
          </g>
        );

      // 26. MUKULA (Flower Bud): All 5 fingertips gathered tightly together touching at a single sharp point.
      case 'mukula':
        return (
          <g>
            {wristBase}
            <path d="M 125 240 C 120 190 125 150 132 135 C 140 130 162 130 170 135 C 178 150 180 190 175 240 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            {/* Conical Bud converging to sharp apex at (150, 60) */}
            <path
              d="M 132 135 C 126 100 144 70 150 56 C 156 70 174 100 168 135 Z"
              fill="url(#skinGrad)"
              stroke="#2E2017"
              strokeWidth="2.2"
            />
            {/* Fine finger flutes */}
            <path d="M 140 132 L 148 65" stroke="#2E2017" strokeWidth="1.2" />
            <path d="M 160 132 L 152 65" stroke="#2E2017" strokeWidth="1.2" />
            {/* Sharp Point Alta Tip */}
            <path d="M 144 75 C 148 56 152 56 156 75 Z" fill="url(#altaGrad)" stroke="#2E2017" strokeWidth="1" />
            {palmMandala(150, 185, 13)}
          </g>
        );

      // 27. TAMRACHUDA (Rooster's Crest): Index bent into hook shape; thumb touches middle; others curled.
      case 'tamrachuda':
        return (
          <g>
            {wristBase}
            <path d="M 122 240 C 116 185 116 135 125 120 C 135 110 175 110 182 125 C 185 150 182 195 175 240 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            {/* Index hooked forward like rooster comb / question mark */}
            <path
              d="M 126 125 C 120 70 146 55 146 72 C 146 88 134 95 136 125"
              fill="url(#skinGrad)"
              stroke="#2E2017"
              strokeWidth="2.2"
            />
            <path d="M 138 60 C 146 55 146 72 140 76 Z" fill="url(#altaGrad)" />
            {/* Thumb touching middle finger */}
            <path d="M 125 200 C 118 165 135 145 152 145" fill="none" stroke="#2E2017" strokeWidth="2.2" />
            <circle cx="150" cy="144" r="6" fill="url(#altaGrad)" />
            {/* Curled ring and pinky */}
            <ellipse cx="162" cy="126" rx="8" ry="11" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2" />
            <ellipse cx="174" cy="132" rx="7" ry="10" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2" />
          </g>
        );

      // 28. TRISHULA (Trident of Shiva): Thumb and pinky curl inward touching tips; index, middle, ring straight up & separated.
      case 'trishula':
        return (
          <g>
            {wristBase}
            <path d="M 125 240 C 120 190 122 150 126 130 C 130 120 170 120 174 130 C 178 150 180 190 175 240 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            {/* Three Prongs of Shiva's Trident (Index, Middle, Ring separated wide) */}
            {/* Index Prong */}
            <path d="M 126 130 L 118 42 C 118 30 130 30 130 42 L 136 126" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 118 52 C 118 30 130 30 130 52 Z" fill="url(#altaGrad)" />
            {/* Middle Central Prong (Tallest) */}
            <path d="M 144 126 L 144 32 C 144 20 156 20 156 32 L 156 126" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 144 44 C 144 20 156 20 156 44 Z" fill="url(#altaGrad)" />
            {/* Ring Prong */}
            <path d="M 164 126 L 170 42 C 170 30 182 30 182 42 L 174 130" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 170 52 C 170 30 182 30 182 52 Z" fill="url(#altaGrad)" />
            {/* Thumb and Pinky curled inward touching tips */}
            <path d="M 124 205 C 114 175 130 155 148 155" fill="none" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 174 135 C 176 160 162 165 148 155" fill="none" stroke="#2E2017" strokeWidth="2.2" />
            <circle cx="148" cy="155" r="6" fill="url(#altaGrad)" stroke="#2E2017" strokeWidth="1" />
            {palmMandala(150, 185, 13)}
          </g>
        );

      // Default / Dual hand / Samyukta gracefully rendered as canonical classical hands
      default:
        return (
          <g>
            {wristBase}
            <path d="M 125 240 C 120 190 122 150 126 130 C 130 120 170 120 174 130 C 178 150 180 190 175 240 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            {/* Classical Graceful Open Hand */}
            <path d="M 126 130 L 126 48 C 126 38 138 38 138 48 L 138 126" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 126 58 C 126 38 138 38 138 58 Z" fill="url(#altaGrad)" />
            <path d="M 138 126 L 138 36 C 138 26 150 26 150 36 L 150 125" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 138 48 C 138 26 150 26 150 48 Z" fill="url(#altaGrad)" />
            <path d="M 150 125 L 150 46 C 150 36 162 36 162 46 L 162 127" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 150 56 C 150 36 162 36 162 56 Z" fill="url(#altaGrad)" />
            <path d="M 162 127 L 162 68 C 162 58 174 58 174 68 L 174 135" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 162 76 C 162 58 174 58 174 76 Z" fill="url(#altaGrad)" />
            <path d="M 125 210 C 108 200 102 185 106 170 C 110 155 125 158 132 165 C 136 172 134 185 128 195 Z" fill="url(#skinGrad)" stroke="#2E2017" strokeWidth="2.2" />
            <path d="M 108 170 C 114 156 126 158 130 167 C 124 175 116 178 108 170 Z" fill="url(#altaGrad)" />
            {palmMandala(150, 185, 15)}
          </g>
        );
    }
  };

  return (
    <svg
      viewBox="0 0 300 360"
      width={size}
      height={size}
      className={`select-none filter drop-shadow-md ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {defs}
      {renderMudraContent()}
    </svg>
  );
}
