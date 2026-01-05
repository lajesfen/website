import { PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

interface Props {
  targetPosition: THREE.Vector3;
  targetLookAt: THREE.Vector3;
}

function CameraController({ targetPosition, targetLookAt }: Props) {
  const { camera } = useThree();

  const internalTarget = useRef(new THREE.Vector3(-5, 8, 15.2));
  const internalLookAt = useRef(new THREE.Vector3(0, 1.5, 0));

  useFrame((state) => {
    const offsetX = state.pointer.x * 1.5;
    const offsetY = state.pointer.y * -1.5;

    internalTarget.current.set(
      targetPosition.x + offsetX,
      targetPosition.y + offsetY,
      targetPosition.z
    );

    camera.position.lerp(internalTarget.current, 0.05);

    internalLookAt.current.lerp(targetLookAt, 0.04);
    camera.lookAt(internalLookAt.current);
  });

  return <PerspectiveCamera makeDefault fov={32} position={[-5, 8, 15.2]} />;
}

export default CameraController;
