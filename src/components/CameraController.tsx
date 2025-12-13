import { PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function CameraController() {
  const { camera } = useThree();
  const initialPosition = new THREE.Vector3(-5, 8, 15.2);
  const targetPosition = new THREE.Vector3();

  useFrame((state) => {
    const offsetX = state.pointer.x * 0.5;
    const offsetY = state.pointer.y * -0.5;

    targetPosition.set(
      initialPosition.x + offsetX,
      initialPosition.y + offsetY,
      initialPosition.z
    );

    camera.position.lerp(targetPosition, 0.05);
    camera.lookAt(0, 1.5, 0);
  });

  return <PerspectiveCamera makeDefault position={initialPosition} fov={32} />;
}

export default CameraController;
