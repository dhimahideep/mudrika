# Mudrika (मुद्रिका) — Archival 3D Classical Bharatanatyam Mudra Dictionary

An interactive, archival 3D web application preserving the anatomical precision, poetic usages (*viniyogas*), and canonical Sanskrit verses of classical Bharatanatyam *hastas* from the ancient treatise *Abhinaya Darpana* (अभिनयदर्पण) by Nandikeshvara.

---

## Aesthetic & Editorial Direction
- **Theme**: Editorial Indian Modernism — high-fashion cultural museum archive meets sleek digital typography.
- **Palette**:
  - Raw warm ivory parchment (`#FDFBF7`)
  - Card & modal surfaces (`#F3EFEA`)
  - Deep graphite charcoal ink (`#1C1917`)
  - Alta / Kumkum crimson (`#B91C1C`) for energy marks, active tags, and CTA accents
  - Muted temple brass (`#C29B38`) for metallic trim and metadata borders
- **Typography**:
  - *Playfair Display* & *Cinzel* for headings and classical titles
  - *Noto Serif Devanagari* for authentic Sanskrit Devanagari script
  - *Inter* / *Plus Jakarta Sans* for modern interfaces and labels
  - *JetBrains Mono* for spatial telemetry, knuckle angles, and 3D camera readouts

---

## Features
- **Extensive Mudra Dataset**:
  - Both **Asamyukta Hastas** (Single-hand gestures: *Pataka, Tripataka, Ardhapataka, Kartarimukha, Mayura, Ardhachandra, Shikhara, Mushti, Suchi, Chandrakala, Alapadma, Padmakosha, Sarpashirsha, Mrigashirsha, Hamsasya, Mukula*, etc.) and **Samyukta Hastas** (Combined-hand gestures: *Anjali, Kapota, Karkata, Swastika, Pushpaputa, Shivalinga, Garuda, Matsya*).
  - Accurate Sanskrit names, Devanagari script, English meanings, canonical *Abhinaya Darpana* verses, anatomical descriptions, and *viniyogas*.
- **Real-time 3D Stage**:
  - Powered by Three.js and `@react-three/fiber` / `@react-three/drei`.
  - Realistic anatomical hand model with procedural finger joint articulation for each mudra's specific angles.
  - Traditional **Alta vermilion** circular mandalas on the palms, fingertips dipped in ceremonial crimson lacquer, and polished **temple gold bangles** (*Kangan/Valayal*) at the wrist.
  - Interactive **OrbitControls** with 360° turntable rotation, smooth damping, and zoom limits.
  - Dynamic **Perspective Presets** ("Front", "Profile", "Top", "Angle") with animated camera transitions.
  - Realtime optical telemetry overlay tracking camera coordinates and field of view.
- **Live Search & Filter System**:
  - Search across Sanskrit names, Devanagari, English meanings, anatomy, and *viniyoga* themes.
  - Category pill filter: All, Asamyukta, Samyukta.
  - Clickable *viniyoga* pills across cards and modals to instantly explore related mudras.
  - "Discover Random" button to explore unknown hastas.
- **Deep-Dive Scholarly Inspector**:
  - Split-screen archival modal with backdrop blur.
  - Keyboard navigation (Esc to close, Left/Right arrows to browse).
  - One-click copy for Sanskrit *shlokas*.

---

## Getting Started

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```
