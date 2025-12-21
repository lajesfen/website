import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef, useState, type RefObject } from "react";
import * as THREE from "three";
import CameraController from "../components/CameraController";
import Computer from "../components/Computer";
import Ground from "../components/Ground";
import Lights from "../components/Lights";
import { DonutModel } from "../models/DonutModel";
import { GooseModel } from "../models/GooseModel";

const DEFAULT_POS = new THREE.Vector3(-5, 8, 15.2);
const DEFAULT_LOOK_AT = new THREE.Vector3(0, 1.5, 0);

interface CameraView {
  position: THREE.Vector3;
  lookAt: THREE.Vector3;
}

function Desk() {
  const [view, setView] = useState<CameraView>({
    position: DEFAULT_POS,
    lookAt: DEFAULT_LOOK_AT,
  });
  const donutRef = useRef<THREE.Object3D>(null!);
  const gooseRef = useRef<THREE.Object3D>(null!);

  const focusOn = (ref: RefObject<THREE.Object3D>) => {
    setView({
      position: new THREE.Vector3(
        ref.current.position.x,
        ref.current.position.y + 5,
        ref.current.position.z + 10
      ),
      lookAt: ref.current.position,
    });
  };

  return (
    <Canvas shadows>
      <CameraController
        targetPosition={view.position}
        targetLookAt={view.lookAt}
      />

      <Environment files={"/assets/environment/studio_small_08_1k.hdr"} />
      <Lights />
      <Computer />

      <GooseModel
        position={[3, 2, 0]}
        ref={gooseRef}
        onClick={() => focusOn(gooseRef)}
      />

      <DonutModel
        position={[-5, 2, 0]}
        scale={0.2}
        ref={donutRef}
        onClick={() => focusOn(donutRef)}
      />

      <Ground />
    </Canvas>
  );
}

export default Desk;
