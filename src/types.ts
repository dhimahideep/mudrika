export type ThemeMode = 'parchment' | 'ratri';

export type MudraCategory = 'Asamyukta' | 'Samyukta';

export interface FingerJoints {
  mcp: number; // Base knuckle bend in degrees (0 = straight, 90+ = folded into palm)
  pip?: number; // Intermediate joint bend (0 = straight, 90+ = folded)
  dip?: number; // Distal tip bend (0 = straight, 60+ = curved)
  spread?: number; // Lateral abduction in degrees (-30 = inwards, +30 = outwards)
  curl?: number; // Fallback curl
}

export interface ThumbJoints {
  mcp: number; // Metacarpophalangeal bend in degrees
  ip?: number; // Interphalangeal tip bend in degrees
  spread: number; // Abduction (-60 = wide lateral L-shape, +20 = inward)
  opposition: number; // Movement/rotation across palm (0 = flat, 60 = across fingers)
  curl?: number; // Fallback curl
}

export interface MudraHandPosture {
  thumb: ThumbJoints;
  index: FingerJoints;
  middle: FingerJoints;
  ring: FingerJoints;
  pinky: FingerJoints;
  wristAngle?: number; // Traditional wrist yaw
  wristPitch?: number; // Anatomical presentation tilt (forward/backward)
  wristRoll?: number; // Anatomical lateral tilt
  wristYaw?: number; // Anatomical twist
  isTwoHanded?: boolean;
}

export interface Mudra {
  id: string;
  name: string;
  devanagari: string;
  englishMeaning: string;
  category: MudraCategory;
  anatomy: string;
  viniyogas: string[];
  verse: string;
  modelPath: string;
  historicalContext?: string;
  posture: MudraHandPosture;
  audioPronunciation?: string;
  chapterIndex?: number;
}

export const toDevanagariNumeral = (num: number | string): string => {
  const devanagariDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return String(num).replace(/[0-9]/g, (d) => devanagariDigits[parseInt(d, 10)]);
};

export const formatMudraName = (name: string): string => {
  if (!name) return '';
  const lower = name.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
};
