import { Stage3D } from './Stage3D';
import { MudraCanvas } from './MudraCanvas';
import { Mudra } from '../types';

export interface ClassicalHand3DProps {
  mudra: Mudra;
  modelPath?: string;
}

export function ClassicalHand3D({ mudra, modelPath = '/models/hand2.glb' }: ClassicalHand3DProps) {
  return <Stage3D mudra={mudra} modelPath={modelPath} />;
}

export { MudraCanvas };
export const MudraModel = ClassicalHand3D;
export default ClassicalHand3D;
