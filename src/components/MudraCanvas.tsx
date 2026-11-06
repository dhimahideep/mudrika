import { Component, ErrorInfo, ReactNode, Suspense, useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, ContactShadows } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { SkeletonUtils } from 'three-stdlib';
import * as THREE from 'three';
import { RotateCw } from 'lucide-react';
import { Mudra, toDevanagariNumeral, ThemeMode } from '../types';

export interface MudraCanvasProps {
  modelPath?: string;
  mudra?: Mudra | null;
  selectedMudra?: Mudra | null;
  className?: string;
  showControls?: boolean;
  theme?: ThemeMode;
}

// -------------------------------------------------------------
// Safe React Error Boundary for 3D WebGL Canvas
// -------------------------------------------------------------
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class CanvasErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ThreeJS Canvas Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="flex flex-col items-center justify-center h-full w-full p-6 text-center bg-[#F7F4EE] border border-[#E5DFD7] rounded-2xl text-ink-secondary">
          <div className="w-10 h-10 rounded-full bg-alta/10 text-alta flex items-center justify-center mb-3">
            <RotateCw className="w-5 h-5" />
          </div>
          <p className="text-xs font-mono font-medium text-ink-primary mb-1">
            3D WebGL Context Suspended
          </p>
          <p className="text-[11px] text-ink-muted max-w-xs mb-4">
            Folio textual archive and anatomical rules remain fully accessible.
          </p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
            className="px-3 py-1.5 rounded-lg bg-alta text-white text-[11px] font-mono hover:bg-alta-dark transition-colors cursor-pointer"
          >
            Retry 3D View
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// -------------------------------------------------------------
// Canonical Finger & Thumb State Constants
// -------------------------------------------------------------
const FINGER_STATES = {
  CURL: 1.4,   // Curled tight into palm (rad)
  FLAT: 0.0,   // Straight upright (rad)
  HALF: 0.85,  // Knuckle bent downward (rad)
  PINCH: 1.1,  // Curved forward to meet thumb (rad)
} as const;

export interface ThumbRotation {
  x?: number;
  y?: number;
  z?: number;
  curl?: number;
  spread?: number;
  oppose?: number;
}

const THUMB_STATES: Record<string, ThumbRotation> = {
  TUCK: { x: 0.22, y: -0.42, z: 0.28 },
  UP: { x: 0.0, y: 0.20, z: 0.20 },
  OUT: { x: 0.0, y: -0.60, z: 0.0 },
  LOCK: { x: 0.5, y: -0.8, z: 0.4 },
  PINCH: { x: 0.6, y: -0.3, z: 0.2 },
  HALF: { x: 0.3, y: -0.2, z: 0.3 },
};

export type FingerConfig =
  | number
  | {
      bend?: number | [number, number, number];
      curl?: number;
      spread?: number;
      y?: number;
      z?: number;
      x?: number;
    };

export interface MudraPoseConfig {
  index: FingerConfig;
  middle: FingerConfig;
  ring: FingerConfig;
  pinky: FingerConfig;
  thumb: ThumbRotation;
  inverted?: boolean;
}

// -------------------------------------------------------------
// Core 24 Asamyukta Hastas Pose Dictionary
// -------------------------------------------------------------
const MUDRA_POSES: Record<string, MudraPoseConfig> = {
  // 1. Pataka
  pataka: {
    index: { bend: FINGER_STATES.FLAT, y: 0.0 },
    middle: { bend: FINGER_STATES.FLAT, y: 0.0 },
    ring: { bend: FINGER_STATES.FLAT, y: 0.0 },
    pinky: { bend: FINGER_STATES.FLAT, y: 0.0 },
    thumb: THUMB_STATES.TUCK,
  },

  // 2. Tripataka
  tripataka: {
    index: { bend: FINGER_STATES.FLAT, y: 0.05 },
    middle: { bend: FINGER_STATES.FLAT, y: 0.0 },
    ring: { bend: [0.15, 1.55, 0.35], y: 0.0 },
    pinky: { bend: FINGER_STATES.FLAT, y: 0.10, z: -0.08 },
    thumb: THUMB_STATES.TUCK,
  },

  // 3. Ardhapataka
  ardhapataka: {
    index: { bend: FINGER_STATES.FLAT, y: 0.05 },
    middle: { bend: FINGER_STATES.FLAT, y: 0.0 },
    ring: { bend: 1.30, y: -0.02 },
    pinky: { bend: 1.30, y: -0.05 },
    thumb: THUMB_STATES.TUCK,
  },

  // 4. Kartarimukha
  kartarimukha: {
    index: { bend: FINGER_STATES.FLAT, spread: -0.18 },
    middle: { bend: FINGER_STATES.FLAT, spread: 0.18 },
    ring: { bend: FINGER_STATES.CURL, spread: 0.0 },
    pinky: { bend: FINGER_STATES.CURL, spread: -0.04 },
    thumb: { curl: 1.35, spread: -0.38, oppose: 0.58 },
  },

  // 5. Mayura
  mayura: {
    index: { bend: FINGER_STATES.FLAT, y: 0.04 },
    middle: { bend: FINGER_STATES.FLAT, y: 0.0 },
    ring: FINGER_STATES.PINCH,
    pinky: { bend: FINGER_STATES.FLAT, y: -0.04 },
    thumb: THUMB_STATES.PINCH,
  },

  // 6. Ardhachandra
  ardhachandra: {
    index: { bend: FINGER_STATES.FLAT, y: 0.06 },
    middle: { bend: FINGER_STATES.FLAT, y: 0.0 },
    ring: { bend: FINGER_STATES.FLAT, y: -0.04 },
    pinky: { bend: FINGER_STATES.FLAT, y: -0.08 },
    thumb: THUMB_STATES.OUT,
  },

  // 7. Aralam (Arala)
  aralam: {
    index: FINGER_STATES.HALF,
    middle: { bend: FINGER_STATES.FLAT, y: 0.0 },
    ring: { bend: FINGER_STATES.FLAT, y: -0.04 },
    pinky: { bend: FINGER_STATES.FLAT, y: -0.08 },
    thumb: THUMB_STATES.OUT,
  },
  arala: {
    index: FINGER_STATES.HALF,
    middle: { bend: FINGER_STATES.FLAT, y: 0.0 },
    ring: { bend: FINGER_STATES.FLAT, y: -0.04 },
    pinky: { bend: FINGER_STATES.FLAT, y: -0.08 },
    thumb: THUMB_STATES.OUT,
  },

  // 8. Shukatunda
  shukatunda: {
    index: FINGER_STATES.HALF,
    middle: { bend: FINGER_STATES.FLAT, y: 0.0 },
    ring: FINGER_STATES.HALF,
    pinky: { bend: FINGER_STATES.FLAT, y: -0.06 },
    thumb: THUMB_STATES.TUCK,
  },

  // 9. Mushti
  mushti: {
    index: FINGER_STATES.CURL,
    middle: FINGER_STATES.CURL,
    ring: FINGER_STATES.CURL,
    pinky: FINGER_STATES.CURL,
    thumb: THUMB_STATES.LOCK,
  },

  // 10. Shikhara
  shikhara: {
    index: FINGER_STATES.CURL,
    middle: FINGER_STATES.CURL,
    ring: FINGER_STATES.CURL,
    pinky: FINGER_STATES.CURL,
    thumb: THUMB_STATES.UP,
  },

  // 11. Kapittha
  kapittha: {
    index: { bend: FINGER_STATES.HALF, y: 0.08 },
    middle: FINGER_STATES.CURL,
    ring: FINGER_STATES.CURL,
    pinky: FINGER_STATES.CURL,
    thumb: THUMB_STATES.UP,
  },

  // 12. Katakamukha
  katakamukha: {
    index: FINGER_STATES.PINCH,
    middle: FINGER_STATES.PINCH,
    ring: { bend: FINGER_STATES.FLAT, y: 0.08, z: -0.06 },
    pinky: { bend: FINGER_STATES.FLAT, y: 0.16, z: -0.08 },
    thumb: THUMB_STATES.PINCH,
  },

  // 13. Suchi
  suchi: {
    index: { bend: FINGER_STATES.FLAT, y: 0.0 },
    middle: FINGER_STATES.CURL,
    ring: FINGER_STATES.CURL,
    pinky: FINGER_STATES.CURL,
    thumb: THUMB_STATES.LOCK,
  },

  // 14. Chandrakala
  chandrakala: {
    index: { bend: FINGER_STATES.FLAT, y: 0.0 },
    middle: FINGER_STATES.CURL,
    ring: FINGER_STATES.CURL,
    pinky: FINGER_STATES.CURL,
    thumb: THUMB_STATES.OUT,
  },

  // 15. Padmakosha
  padmakosha: {
    index: { bend: FINGER_STATES.HALF, y: -0.1 },
    middle: { bend: FINGER_STATES.HALF, y: 0.0 },
    ring: { bend: FINGER_STATES.HALF, y: 0.1 },
    pinky: { bend: FINGER_STATES.HALF, y: 0.2 },
    thumb: THUMB_STATES.HALF,
  },

  // 16. Sarpashirsha (Cobra Hood)
  sarpashirsha: {
    index: { bend: 0.38, y: 0.04 },
    middle: { bend: 0.38, y: 0.0 },
    ring: { bend: 0.38, y: -0.03 },
    pinky: { bend: 0.38, y: -0.06 },
    thumb: THUMB_STATES.TUCK,
    inverted: true,
  },

  // 17. Mrigashirsha
  mrigashirsha: {
    index: { bend: FINGER_STATES.FLAT, spread: -0.12 },
    middle: FINGER_STATES.PINCH,
    ring: FINGER_STATES.PINCH,
    pinky: { bend: FINGER_STATES.FLAT, spread: 0.14 },
    thumb: THUMB_STATES.PINCH,
  },

  // 18. Simhamukha
  simhamukha: {
    index: { bend: FINGER_STATES.FLAT, y: -0.16 },
    middle: FINGER_STATES.PINCH,
    ring: FINGER_STATES.PINCH,
    pinky: { bend: FINGER_STATES.FLAT, y: 0.20 },
    thumb: THUMB_STATES.PINCH,
  },

  // 19. Kangula
  kangula: {
    index: { bend: 0.12, y: -0.10 },
    middle: { bend: 0.12, y: -0.02 },
    ring: { bend: [1.30, 1.40, 1.10], x: 0.72 },
    pinky: { bend: FINGER_STATES.FLAT, y: 0.18 },
    thumb: THUMB_STATES.OUT,
  },

  // 20. Alapadma
  alapadma: {
    index: { bend: 0.1, y: -0.20 },
    middle: { bend: 0.3, y: -0.05 },
    ring: { bend: 0.6, y: 0.14 },
    pinky: { bend: 0.9, y: 0.32 },
    thumb: THUMB_STATES.OUT,
    inverted: true,
  },

  // 21. Chatura
  chatura: {
    index: { curl: 0.0, spread: 0.0 },
    middle: { curl: 0.0, spread: 0.0 },
    ring: { curl: 0.0, spread: 0.0 },
    pinky: { curl: 0.0, spread: 0.16 },
    thumb: { curl: 1.45, spread: -0.30, oppose: 0.60 },
  },

  // 22. Bhramara
  bhramara: {
    index: FINGER_STATES.CURL,
    middle: FINGER_STATES.PINCH,
    ring: { bend: FINGER_STATES.FLAT, y: 0.08 },
    pinky: { bend: FINGER_STATES.FLAT, y: 0.20 },
    thumb: THUMB_STATES.PINCH,
  },

  // 23. Hamsasya
  hamsasya: {
    index: FINGER_STATES.PINCH,
    middle: { bend: FINGER_STATES.FLAT, y: -0.04 },
    ring: { bend: FINGER_STATES.FLAT, y: 0.08 },
    pinky: { bend: FINGER_STATES.FLAT, y: 0.22 },
    thumb: THUMB_STATES.PINCH,
  },

  // 24. Hamsapaksha
  hamsapaksha: {
    index: { bend: FINGER_STATES.FLAT, y: 0.04 },
    middle: { bend: FINGER_STATES.FLAT, y: 0.0 },
    ring: { bend: FINGER_STATES.FLAT, y: -0.03 },
    pinky: { bend: FINGER_STATES.FLAT, y: 0.22, z: -0.16 },
    thumb: THUMB_STATES.TUCK,
  },
};

// -------------------------------------------------------------
// Interactive Pose Values & Mutable Ref Interface
// -------------------------------------------------------------
export interface PoseValues {
  manual: boolean;
  index: { curl: number; spread: number };
  middle: { curl: number; spread: number };
  ring: { curl: number; spread: number };
  pinky: { curl: number; spread: number };
  thumb: { curl: number; spread: number; oppose: number };
}

// -------------------------------------------------------------
// Hand Model Component with Direct 60fps Mutable Ref Articulation
// -------------------------------------------------------------
function HandModel({
  modelPath = '/models/hand_neutral.glb',
  selectedMudra,
  poseRef,
  altaEnabled = true,
}: {
  modelPath?: string;
  selectedMudra?: Mudra | null;
  poseRef: React.MutableRefObject<PoseValues>;
  altaEnabled?: boolean;
}) {
  const { scene } = useGLTF(modelPath);
  const restEulers = useRef<Map<string, THREE.Euler>>(new Map());

  // Neutral Bind-Pose Verification: Print all bone names & default rest rotations to F12 console
  useEffect(() => {
    if (!scene) return;
    console.log('=== NEUTRAL BIND-POSE VERIFICATION (/models/hand_neutral.glb) ===');
    scene.traverse((obj) => {
      if ((obj as THREE.Bone).isBone) {
        console.log(obj.name, obj.rotation.x, obj.rotation.y, obj.rotation.z);
      }
    });
  }, [scene]);

  const clonedScene = useMemo(() => {
    if (!scene) return new THREE.Group();
    const clone = SkeletonUtils.clone(scene);

    scene.traverse((node) => {
      if ((node as THREE.Bone).isBone && node.name && node.rotation) {
        restEulers.current.set(node.name, node.rotation.clone());
      }
    });

    clone.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (mesh.material) {
          const origMat = mesh.material as THREE.MeshStandardMaterial;
          const mat = origMat.clone();
          const isFingertip = mesh.name === 'Object_9' || origMat.name?.includes('SegmentTop');

          if (isFingertip && altaEnabled) {
            mat.color.set('#B91C1C'); // Classical deep vermilion Alta lacquer
            mat.roughness = 0.22;
            mat.metalness = 0.12;
          } else {
            mat.roughness = 0.44;
            mat.metalness = 0.06;
          }
          mesh.material = mat;
        }
      }
    });

    return clone;
  }, [scene, altaEnabled]);

  // Dynamic Alta lacquer reactive toggle
  useEffect(() => {
    if (!clonedScene) return;
    clonedScene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh && mesh.material) {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        const isFingertip = mesh.name === 'Object_9' || mat.name?.includes('SegmentTop');
        if (isFingertip) {
          if (altaEnabled) {
            mat.color.set('#B91C1C');
            mat.roughness = 0.22;
            mat.metalness = 0.12;
          } else {
            mat.color.set('#FFFFFF');
            mat.roughness = 0.44;
            mat.metalness = 0.06;
          }
          mat.needsUpdate = true;
        }
      }
    });
  }, [clonedScene, altaEnabled]);

  // Exact bone mapping strictly matching hand_neutral.glb node hierarchy
  const bones = useMemo(() => {
    const getBone = (exactName: string, prefixFallback?: string): THREE.Bone | null => {
      let b = clonedScene.getObjectByName(exactName) as THREE.Bone | null;
      if (!b && prefixFallback) {
        clonedScene.traverse((obj) => {
          if (!b && ((obj as THREE.Bone).isBone || obj.type === 'Bone')) {
            if (obj.name === prefixFallback || obj.name.startsWith(prefixFallback + '_')) {
              b = obj as THREE.Bone;
            }
          }
        });
      }
      return b;
    };

    return {
      index1: getBone('Index1_16', 'Index1'),
      index2: getBone('Index2_15', 'Index2'),
      index3: getBone('Index3_14', 'Index3'),
      middle1: getBone('Middle1_13', 'Middle1'),
      middle2: getBone('Middle2_12', 'Middle2'),
      middle3: getBone('Middle3_11', 'Middle3'),
      ring1: getBone('Ring1_10', 'Ring1'),
      ring2: getBone('Ring2_9', 'Ring2'),
      ring3: getBone('Ring3_8', 'Ring3'),
      pinky1: getBone('Pinky1_7', 'Pinky1'),
      pinky2: getBone('Pinky2_6', 'Pinky2'),
      pinky3: getBone('Pinky3_5', 'Pinky3'),
      thumb1: getBone('Thumb1_18', 'Thumb1'),
      thumb2: getBone('Thumb2_17', 'Thumb2'),
      palm: getBone('Palm_19', 'Palm'),
    };
  }, [clonedScene]);

  // 1. Neutral Base Pose Reset Before Morphing:
  // Reset each finger bone to its neutral rest orientation before applying target angles
  useEffect(() => {
    Object.values(bones).forEach((bone) => {
      if (bone) {
        const r = restEulers.current.get(bone.name);
        if (r) {
          bone.rotation.copy(r);
        } else {
          bone.rotation.set(0, 0, 0);
        }
      }
    });
  }, [selectedMudra?.id, bones]);

  useFrame((_, delta) => {
    const p = poseRef.current;
    if (!p) return;

    // 2. Safe Rotation Application: Clamped interpolation step to prevent overshooting or explosive spikes
    const step = Math.min(delta * 8, 1);

    const applySafeRotation = (
      bone: THREE.Bone | null,
      targetX: number,
      targetY: number,
      targetZ: number
    ) => {
      if (!bone) return;
      // Absolute target angles strictly clamped within safe anatomical limits
      const safeX = THREE.MathUtils.clamp(targetX, -Math.PI, Math.PI);
      const safeY = THREE.MathUtils.clamp(targetY, -Math.PI, Math.PI);
      const safeZ = THREE.MathUtils.clamp(targetZ, -Math.PI, Math.PI);

      bone.rotation.x = THREE.MathUtils.lerp(bone.rotation.x, safeX, step);
      bone.rotation.y = THREE.MathUtils.lerp(bone.rotation.y, safeY, step);
      bone.rotation.z = THREE.MathUtils.lerp(bone.rotation.z, safeZ, step);
    };

    if (p.manual) {
      // Direct slider adjustments with smooth clamped lerp
      if (bones.index1) {
        const r = restEulers.current.get(bones.index1.name) || new THREE.Euler();
        applySafeRotation(bones.index1, r.x + p.index.spread, r.y, r.z + p.index.curl * 0.75);
      }
      if (bones.index2) {
        const r = restEulers.current.get(bones.index2.name) || new THREE.Euler();
        applySafeRotation(bones.index2, r.x, r.y, r.z + p.index.curl * 0.85);
      }
      if (bones.index3) {
        const r = restEulers.current.get(bones.index3.name) || new THREE.Euler();
        applySafeRotation(bones.index3, r.x, r.y, r.z + p.index.curl * 0.65);
      }

      // Middle
      if (bones.middle1) {
        const r = restEulers.current.get(bones.middle1.name) || new THREE.Euler();
        applySafeRotation(bones.middle1, r.x + p.middle.spread, r.y, r.z + p.middle.curl * 0.75);
      }
      if (bones.middle2) {
        const r = restEulers.current.get(bones.middle2.name) || new THREE.Euler();
        applySafeRotation(bones.middle2, r.x, r.y, r.z + p.middle.curl * 0.85);
      }
      if (bones.middle3) {
        const r = restEulers.current.get(bones.middle3.name) || new THREE.Euler();
        applySafeRotation(bones.middle3, r.x, r.y, r.z + p.middle.curl * 0.65);
      }

      // Ring
      if (bones.ring1) {
        const r = restEulers.current.get(bones.ring1.name) || new THREE.Euler();
        applySafeRotation(bones.ring1, r.x + p.ring.spread, r.y, r.z + p.ring.curl * 0.75);
      }
      if (bones.ring2) {
        const r = restEulers.current.get(bones.ring2.name) || new THREE.Euler();
        applySafeRotation(bones.ring2, r.x, r.y, r.z + p.ring.curl * 0.85);
      }
      if (bones.ring3) {
        const r = restEulers.current.get(bones.ring3.name) || new THREE.Euler();
        applySafeRotation(bones.ring3, r.x, r.y, r.z + p.ring.curl * 0.65);
      }

      // Pinky
      if (bones.pinky1) {
        const r = restEulers.current.get(bones.pinky1.name) || new THREE.Euler();
        applySafeRotation(bones.pinky1, r.x + p.pinky.spread, r.y, r.z + p.pinky.curl * 0.75);
      }
      if (bones.pinky2) {
        const r = restEulers.current.get(bones.pinky2.name) || new THREE.Euler();
        applySafeRotation(bones.pinky2, r.x, r.y, r.z + p.pinky.curl * 0.85);
      }
      if (bones.pinky3) {
        const r = restEulers.current.get(bones.pinky3.name) || new THREE.Euler();
        applySafeRotation(bones.pinky3, r.x, r.y, r.z + p.pinky.curl * 0.65);
      }

      // Thumb
      if (bones.thumb1) {
        const r = restEulers.current.get(bones.thumb1.name) || new THREE.Euler();
        applySafeRotation(bones.thumb1, r.x + p.thumb.spread, r.y + p.thumb.oppose, r.z + p.thumb.curl);
      }
      if (bones.thumb2) {
        const r = restEulers.current.get(bones.thumb2.name) || new THREE.Euler();
        applySafeRotation(bones.thumb2, r.x, r.y, r.z + p.thumb.curl * 0.5);
      }
    } else {
      // 3. Smoothly interpolated canonical dictionary posture
      const mudraId = selectedMudra?.id?.toLowerCase().trim() || '';
      const mudraName = selectedMudra?.name?.toLowerCase().trim() || '';
      const matchedKey = Object.keys(MUDRA_POSES).find(
        (k) =>
          k.toLowerCase() === mudraId ||
          k.toLowerCase() === mudraName ||
          (mudraId && mudraId.includes(k.toLowerCase())) ||
          (mudraName && mudraName.includes(k.toLowerCase()))
      );
      const pose = (matchedKey ? MUDRA_POSES[matchedKey] : null) || MUDRA_POSES.pataka;

      const animateFingerChain = (
        b1: THREE.Bone | null,
        b2: THREE.Bone | null,
        b3: THREE.Bone | null,
        spec: FingerConfig
      ) => {
        const bend = typeof spec === 'number' ? spec : (spec.bend ?? spec.curl ?? 0);
        const extraX = typeof spec === 'number' ? 0 : (spec.spread ?? spec.x ?? spec.y ?? 0);
        const extraZ = typeof spec === 'number' ? 0 : (spec.z ?? 0);
        const jointBends = Array.isArray(bend)
          ? bend
          : [bend * 0.75, bend * 0.85, bend * 0.65];

        if (b1) {
          const r = restEulers.current.get(b1.name) || new THREE.Euler();
          const targetZ = r.z + jointBends[0] + extraZ;
          const targetX = r.x + extraX;
          applySafeRotation(b1, targetX, r.y, targetZ);
        }
        if (b2) {
          const r = restEulers.current.get(b2.name) || new THREE.Euler();
          const targetZ = r.z + jointBends[1];
          applySafeRotation(b2, r.x, r.y, targetZ);
        }
        if (b3) {
          const r = restEulers.current.get(b3.name) || new THREE.Euler();
          const targetZ = r.z + jointBends[2];
          applySafeRotation(b3, r.x, r.y, targetZ);
        }
      };

      animateFingerChain(bones.index1, bones.index2, bones.index3, pose.index);
      animateFingerChain(bones.middle1, bones.middle2, bones.middle3, pose.middle);
      animateFingerChain(bones.ring1, bones.ring2, bones.ring3, pose.ring);
      animateFingerChain(bones.pinky1, bones.pinky2, bones.pinky3, pose.pinky);

      const thumbSpread = pose.thumb.spread ?? pose.thumb.y ?? 0;
      const thumbOppose = pose.thumb.oppose ?? pose.thumb.x ?? 0;
      const thumbCurl = pose.thumb.curl ?? pose.thumb.z ?? 0;

      if (bones.thumb1) {
        const r = restEulers.current.get(bones.thumb1.name) || new THREE.Euler();
        applySafeRotation(bones.thumb1, r.x + thumbSpread, r.y + thumbOppose, r.z + thumbCurl);
      }
      if (bones.thumb2) {
        const r = restEulers.current.get(bones.thumb2.name) || new THREE.Euler();
        const isBent =
          pose.thumb === THUMB_STATES.PINCH ||
          pose.thumb === THUMB_STATES.LOCK ||
          pose.thumb === THUMB_STATES.TUCK ||
          thumbCurl > 0.6;
        const tipBend = isBent ? (thumbCurl > 0.6 ? thumbCurl * 0.4 : 0.35) : 0;
        applySafeRotation(bones.thumb2, r.x, r.y, r.z + tipBend);
      }
    }
  });

  return (
    <group rotation={[Math.PI / 2, Math.PI / 2, 0]}>
      <primitive object={clonedScene} scale={0.16} />
    </group>
  );
}

// -------------------------------------------------------------
// MudraCanvas Viewport Component
// -------------------------------------------------------------
export function MudraCanvas({
  modelPath = '/models/hand_neutral.glb',
  mudra,
  selectedMudra,
  className = 'w-full h-full',
  showControls = true,
  theme = 'parchment',
}: MudraCanvasProps) {
  const activeMudra = selectedMudra || mudra;
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const [activePreset, setActivePreset] = useState<'front' | 'profile' | 'top' | 'angle'>('front');
  const [altaEnabled] = useState<boolean>(true);
  const [palmMandalaEnabled] = useState<boolean>(true);

  // Normalization helper for consistent storage keys
  const getMudraStorageKey = (m: Mudra | null | undefined) => {
    const raw = (m?.id || m?.name || 'pataka').toLowerCase().replace(/\s+/g, '-').trim();
    return `mudrika_pose_${raw}`;
  };

  // Helper to determine persistent inverted front orientation per mudra
  const getInvertedForMudra = (id: string, config?: MudraPoseConfig): boolean => {
    try {
      // 1. Explicit user orientation map
      const mapRaw = localStorage.getItem('mudrika_inverted_mudras');
      if (mapRaw) {
        const map = JSON.parse(mapRaw);
        if (typeof map[id] === 'boolean') return map[id];
      }
      // 2. Saved custom pose object
      const poseRaw =
        localStorage.getItem(`mudrika_pose_${id.replace(/\s+/g, '-').trim()}`) ||
        localStorage.getItem(`mudra_pose_${id.replace(/\s+/g, '-').trim()}`);
      if (poseRaw) {
        const p = JSON.parse(poseRaw);
        if (typeof p.inverted === 'boolean') return p.inverted;
      }
    } catch {
      // fallback
    }
    // 3. Pose config or canonical default
    if (config?.inverted !== undefined) return config.inverted;
    return id.includes('sarpashirsha') || id.includes('alapadma');
  };

  const [isInverted, setIsInverted] = useState<boolean>(() => {
    const id = (activeMudra?.id || activeMudra?.name || '').toLowerCase().trim();
    return getInvertedForMudra(id);
  });

  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleInvert = () => {
    setIsInverted((prev) => {
      const next = !prev;
      const mudraId = (activeMudra?.id || activeMudra?.name || 'pataka').toLowerCase().trim();
      try {
        const mapRaw = localStorage.getItem('mudrika_inverted_mudras');
        const map = mapRaw ? JSON.parse(mapRaw) : {};
        map[mudraId] = next;
        localStorage.setItem('mudrika_inverted_mudras', JSON.stringify(map));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // 1. Direct Mutable Ref for Instant 60fps Updates in useFrame
  const poseRef = useRef<PoseValues>({
    manual: false,
    index: { curl: 0.0, spread: 0.05 },
    middle: { curl: 0.0, spread: 0.0 },
    ring: { curl: 0.0, spread: -0.04 },
    pinky: { curl: 0.0, spread: -0.08 },
    thumb: { curl: 0.28, spread: -0.42, oppose: 0.22 },
  });

  // Preserve Saved Joint Configurations: Read from localStorage first, then fallback to canonical dictionary
  useEffect(() => {
    const mudraId = activeMudra?.id?.toLowerCase().trim() || '';
    const mudraName = activeMudra?.name?.toLowerCase().trim() || '';
    const rawKey = (activeMudra?.id || activeMudra?.name || 'pataka').toLowerCase().replace(/\s+/g, '-').trim();

    const matchedKey = Object.keys(MUDRA_POSES).find(
      (k) =>
        k.toLowerCase() === mudraId ||
        k.toLowerCase() === mudraName ||
        (mudraId && mudraId.includes(k.toLowerCase())) ||
        (mudraName && mudraName.includes(k.toLowerCase()))
    );
    const canonicalPose = (matchedKey ? MUDRA_POSES[matchedKey] : null) || MUDRA_POSES.pataka;

    // Restore persistent inverted front orientation for this mudra
    setIsInverted(getInvertedForMudra(mudraId || 'pataka', canonicalPose));

    // 1. Check localStorage for user saved pose customizations (supports both naming patterns)
    try {
      const savedRaw =
        localStorage.getItem(`mudra_pose_${activeMudra?.id}`) ||
        localStorage.getItem(`mudra_pose_${rawKey}`) ||
        localStorage.getItem(`mudrika_pose_${rawKey}`) ||
        localStorage.getItem(getMudraStorageKey(activeMudra));

      if (savedRaw) {
        const saved = JSON.parse(savedRaw);
        if (saved && saved.index && saved.middle && saved.ring && saved.pinky && saved.thumb) {
          if (typeof saved.inverted === 'boolean') {
            setIsInverted(saved.inverted);
          }
          const parseSafeAngle = (val: any, fallback: number = 0): number => {
            const num = typeof val === 'number' ? val : parseFloat(val);
            if (isNaN(num)) return fallback;
            return THREE.MathUtils.clamp(num, -Math.PI, Math.PI);
          };

          poseRef.current = {
            manual: true,
            index: { curl: parseSafeAngle(saved.index.curl, 0), spread: parseSafeAngle(saved.index.spread, 0) },
            middle: { curl: parseSafeAngle(saved.middle.curl, 0), spread: parseSafeAngle(saved.middle.spread, 0) },
            ring: { curl: parseSafeAngle(saved.ring.curl, 0), spread: parseSafeAngle(saved.ring.spread, 0) },
            pinky: { curl: parseSafeAngle(saved.pinky.curl, 0), spread: parseSafeAngle(saved.pinky.spread, 0) },
            thumb: {
              curl: parseSafeAngle(saved.thumb.curl, 0.28),
              spread: parseSafeAngle(saved.thumb.spread, -0.42),
              oppose: parseSafeAngle(saved.thumb.oppose, 0.22),
            },
          };
          return;
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved mudra pose from localStorage:', e);
    }

    // 2. Fallback to calibrated canonical pose dictionary if no saved configuration exists
    const extractBend = (spec: FingerConfig): number => {
      if (typeof spec === 'number') return spec;
      if (Array.isArray(spec.bend)) return spec.bend[1] ?? 0.85;
      return spec.bend ?? spec.curl ?? 0;
    };
    const extractSpread = (spec: FingerConfig): number => {
      if (typeof spec === 'number') return 0;
      return spec.spread ?? spec.x ?? spec.y ?? 0;
    };

    poseRef.current = {
      manual: false,
      index: { curl: extractBend(canonicalPose.index), spread: extractSpread(canonicalPose.index) },
      middle: { curl: extractBend(canonicalPose.middle), spread: extractSpread(canonicalPose.middle) },
      ring: { curl: extractBend(canonicalPose.ring), spread: extractSpread(canonicalPose.ring) },
      pinky: { curl: extractBend(canonicalPose.pinky), spread: extractSpread(canonicalPose.pinky) },
      thumb: {
        curl: canonicalPose.thumb.curl ?? canonicalPose.thumb.z ?? 0,
        spread: canonicalPose.thumb.spread ?? canonicalPose.thumb.y ?? 0,
        oppose: canonicalPose.thumb.oppose ?? canonicalPose.thumb.x ?? 0,
      },
    };
  }, [activeMudra]);

  const setCameraPreset = (preset: 'front' | 'profile' | 'top' | 'angle') => {
    setActivePreset(preset);
    if (!controlsRef.current) return;

    const controls = controlsRef.current;
    const camera = controls.object;

    if (preset === 'front') {
      camera.position.set(0, 0.1, 4.2);
    } else if (preset === 'profile') {
      camera.position.set(4.2, 0.1, 0);
    } else if (preset === 'top') {
      camera.position.set(0, 4.2, 0);
    } else if (preset === 'angle') {
      camera.position.set(2.8, 1.8, 3.2);
    }

    controls.target.set(0, 0.1, 0);
    controls.update();
  };

  const handleReset = () => {
    setCameraPreset('front');
  };

  const isRatri = theme === 'ratri';

  return (
    <div className={`relative ${className} select-none overflow-hidden touch-pan-y`}>
      {/* Background Watermark: Large, Faint Archival Devanagari Floating Behind 3D Hand Stage */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <span className={`font-devanagari text-[130px] sm:text-[200px] md:text-[280px] font-black leading-none tracking-tighter transform -rotate-6 select-none transition-all duration-700 ${
          isRatri ? 'text-white/[0.04]' : 'text-[#1C1917]/[0.08]'
        }`}>
          {activeMudra?.devanagari || 'मुद्रिका'}
        </span>
      </div>

      {/* Archival Specimen Viewport Corner Crosshairs */}
      <span className={`absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-20 font-mono text-xs font-bold pointer-events-none select-none ${
        isRatri ? 'text-[#525252]' : 'text-[#1C1917]'
      }`}>
        +
      </span>
      <span className={`absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-20 font-mono text-xs font-bold pointer-events-none select-none ${
        isRatri ? 'text-[#525252]' : 'text-[#1C1917]'
      }`}>
        +
      </span>
      <div className={`absolute bottom-2 left-2 sm:bottom-2.5 sm:left-2.5 z-20 flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] font-bold pointer-events-none select-none tracking-wider uppercase ${
        isRatri ? 'text-[#A3A3A3]' : 'text-[#1C1917]/80'
      }`}>
        <span>+</span>
        <span className={`px-1.5 sm:px-2 py-0.5 border flex items-center gap-1.5 ${
          isRatri
            ? 'bg-[#121212] text-[#F3F4F6] border-[#262626] shadow-[1px_1px_0px_#EF4444]'
            : 'bg-[#FCFBF7] text-[#1C1917] border-[#1C1917] shadow-[1px_1px_0px_#1C1917]'
        }`}>
          <span className={`font-devanagari font-bold ${isRatri ? 'text-[#F87171]' : 'text-[#B91C1C]'}`}>
            [ पत्रम् // {toDevanagariNumeral(String(activeMudra?.chapterIndex || 1).padStart(2, '0'))} ]
          </span>
          <span className={isRatri ? 'text-[#525252]' : 'text-[#1C1917]/40'}>•</span>
          <span>[ SPECIMEN // 360° RIG ]</span>
        </span>
      </div>
      <span className={`absolute bottom-2 right-2 sm:bottom-2.5 sm:right-2.5 z-20 font-mono text-xs font-bold pointer-events-none select-none ${
        isRatri ? 'text-[#525252]' : 'text-[#1C1917]'
      }`}>
        +
      </span>

      {/* Safe Error Boundary wrapping WebGL Canvas */}
      <CanvasErrorBoundary>
        <Suspense
          fallback={
            <div className={`flex items-center justify-center h-full w-full text-xs font-mono ${
              isRatri ? 'bg-[#0A0A0A] text-[#A3A3A3]' : 'bg-[#F7F4EE] text-[#8C8275]'
            }`}>
              Loading 3D Rig...
            </div>
          }
        >
          <Canvas
            camera={{ position: [0, 0, 4.2], fov: 45 }}
            className="w-full h-full"
            gl={{ antialias: true, alpha: true }}
            shadows
          >
            {/* Gallery Studio / Nighttime Lighting based on theme */}
            {isRatri ? (
              <>
                {/* Ambient low neutral moonlight */}
                <ambientLight intensity={0.5} color="#171717" />
                {/* Warm temple lantern key light */}
                <directionalLight position={[3, 5, 4]} intensity={1.8} color="#FBBF24" castShadow />
                {/* Soft moonlight cool fill */}
                <directionalLight position={[-3, -1, -2]} intensity={0.9} color="#E2E8F0" />
              </>
            ) : (
              <>
                {/* Gallery Studio Lighting */}
                <ambientLight intensity={0.9} />
                <directionalLight position={[4, 7, 5]} intensity={1.6} castShadow />
                <directionalLight position={[-3, 2, -2]} intensity={0.65} color="#FFF3E0" />
                <directionalLight position={[0, 4, -4]} intensity={0.45} color="#FFE4C4" />
              </>
            )}

            {/* Contact ground shadows */}
            <ContactShadows
              position={[0, -1.35, 0]}
              opacity={0.32}
              scale={4.8}
              blur={2.4}
            />

            {/* Center Hand Model container - scaled and positioned so fingertips and wrist never clip */}
            <group
              scale={isMobile ? 0.68 : 0.78}
              position={isMobile ? [0, -0.75, 0] : [0, -0.95, 0]}
              rotation={[0, isInverted ? Math.PI : 0, 0]}
            >
              <HandModel
                modelPath={modelPath}
                selectedMudra={activeMudra}
                poseRef={poseRef}
                altaEnabled={altaEnabled}
              />

              {/* Classical Circular Alta Mandala on Front Palm Surface */}
              {altaEnabled && palmMandalaEnabled && !isInverted && (
                <mesh
                  position={[-0.08, 0.61, 0.643]}
                  rotation={[0, 0, 0]}
                >
                  <circleGeometry args={[0.082, 48]} />
                  <meshStandardMaterial
                    color="#B91C1C"
                    roughness={0.22}
                    metalness={0.12}
                    polygonOffset
                    polygonOffsetFactor={-2}
                    polygonOffsetUnits={-2}
                    side={THREE.DoubleSide}
                  />
                </mesh>
              )}
            </group>

            {/* 360° OrbitControls */}
            <OrbitControls
              ref={controlsRef}
              target={[0, 0.1, 0]}
              enableZoom={true}
              enablePan={false}
              maxPolarAngle={Math.PI / 1.7}
              minDistance={2.5}
              maxDistance={6.0}
              dampingFactor={0.08}
              enableDamping={true}
              touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }}
            />
          </Canvas>
        </Suspense>
      </CanvasErrorBoundary>

      {/* Clean Presentation-Ready Camera Angle Presets & Orientation Controls */}
      {showControls && (
        <div className={`absolute top-2 right-2 sm:top-3 sm:right-3 z-20 flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-lg border-[1.5px] ${
          isRatri
            ? 'bg-[#121212] border-[#262626] shadow-[2px_2px_0px_#EF4444]'
            : 'bg-[#FCFBF7] border-[#1C1917] shadow-[2px_2px_0px_#1C1917]'
        }`}>
          <button
            type="button"
            onClick={handleToggleInvert}
            className={`px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-mono uppercase tracking-wider rounded border-[1.5px] transition-all cursor-pointer shadow-[1px_1px_0px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
              isInverted
                ? isRatri
                  ? 'bg-[#991B1B] text-[#F9FAFB] border-[#EF4444] shadow-[#EF4444] font-bold'
                  : 'bg-[#B91C1C] text-[#F8F5EE] border-[#1C1917] shadow-[#1C1917] font-bold'
                : isRatri
                  ? 'bg-[#1E1E1E] text-[#9CA3AF] border-[#262626] shadow-[#262626] hover:bg-[#262626] hover:text-white'
                  : 'bg-[#F8F5EE] text-[#1C1917] border-[#1C1917] shadow-[#1C1917] hover:bg-[#B91C1C] hover:text-[#F8F5EE]'
            }`}
            title="Invert hand front / back view"
          >
            {isInverted ? 'Inverted' : 'Invert'}
          </button>

          <button
            type="button"
            onClick={() => setCameraPreset('front')}
            className={`px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-mono uppercase tracking-wider rounded border-[1.5px] transition-all cursor-pointer shadow-[1px_1px_0px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
              activePreset === 'front'
                ? isRatri
                  ? 'bg-[#EF4444] text-[#0A0A0A] border-[#EF4444] shadow-[#EF4444] font-bold'
                  : 'bg-[#1C1917] text-[#F8F5EE] border-[#1C1917] shadow-[#1C1917] font-bold'
                : isRatri
                  ? 'bg-[#1E1E1E] text-[#9CA3AF] border-[#262626] shadow-[#262626] hover:bg-[#262626] hover:text-white'
                  : 'bg-[#F8F5EE] text-[#1C1917] border-[#1C1917] shadow-[#1C1917] hover:bg-[#1C1917] hover:text-[#F8F5EE]'
            }`}
          >
            Front
          </button>
          <button
            type="button"
            onClick={() => setCameraPreset('profile')}
            className={`px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-mono uppercase tracking-wider rounded border-[1.5px] transition-all cursor-pointer shadow-[1px_1px_0px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
              activePreset === 'profile'
                ? isRatri
                  ? 'bg-[#EF4444] text-[#0A0A0A] border-[#EF4444] shadow-[#EF4444] font-bold'
                  : 'bg-[#1C1917] text-[#F8F5EE] border-[#1C1917] shadow-[#1C1917] font-bold'
                : isRatri
                  ? 'bg-[#1E1E1E] text-[#9CA3AF] border-[#262626] shadow-[#262626] hover:bg-[#262626] hover:text-white'
                  : 'bg-[#F8F5EE] text-[#1C1917] border-[#1C1917] shadow-[#1C1917] hover:bg-[#1C1917] hover:text-[#F8F5EE]'
            }`}
          >
            Profile
          </button>
          <button
            type="button"
            onClick={() => setCameraPreset('top')}
            className={`px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-mono uppercase tracking-wider rounded border-[1.5px] transition-all cursor-pointer shadow-[1px_1px_0px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
              activePreset === 'top'
                ? isRatri
                  ? 'bg-[#EF4444] text-[#0A0A0A] border-[#EF4444] shadow-[#EF4444] font-bold'
                  : 'bg-[#1C1917] text-[#F8F5EE] border-[#1C1917] shadow-[#1C1917] font-bold'
                : isRatri
                  ? 'bg-[#1E1E1E] text-[#9CA3AF] border-[#262626] shadow-[#262626] hover:bg-[#262626] hover:text-white'
                  : 'bg-[#F8F5EE] text-[#1C1917] border-[#1C1917] shadow-[#1C1917] hover:bg-[#1C1917] hover:text-[#F8F5EE]'
            }`}
          >
            Top
          </button>
          <button
            type="button"
            onClick={handleReset}
            className={`p-1 sm:p-1.5 rounded border-[1.5px] shadow-[1px_1px_0px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer ${
              isRatri
                ? 'text-[#9CA3AF] bg-[#1E1E1E] hover:bg-[#991B1B] hover:text-white border-[#262626] shadow-[#262626]'
                : 'text-[#1C1917] bg-[#F8F5EE] hover:bg-[#B91C1C] hover:text-[#F8F5EE] border-[#1C1917] shadow-[#1C1917]'
            }`}
            title="Reset View"
            aria-label="Reset Camera"
          >
            <RotateCw className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// Non-intrusive Console Export Utility for Fine-Tuned Coordinates
// Call `dumpAllSavedPoses()` in F12 devtools to inspect all saved configurations
// -------------------------------------------------------------
if (typeof window !== 'undefined' && !(window as any).dumpAllSavedPoses) {
  (window as any).dumpAllSavedPoses = () => {
    const poses: Record<string, any> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (
        key &&
        (key.startsWith('mudra_pose_') ||
          key.startsWith('mudrika_pose_') ||
          key === 'mudrika_custom_poses_library' ||
          key === 'mudrika_inverted_mudras')
      ) {
        try {
          poses[key] = JSON.parse(localStorage.getItem(key) || '');
        } catch {
          poses[key] = localStorage.getItem(key);
        }
      }
    }
    console.log('=== ALL MUDRIKA CONFIGURED POSES & CALIBRATIONS ===');
    console.log(JSON.stringify(poses, null, 2));
    return poses;
  };
}

// Preload the neutral model
useGLTF.preload('/models/hand_neutral.glb');

export default MudraCanvas;
