import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState, type RefObject } from "react";
import * as THREE from "three";
import CameraController from "../components/desk/CameraController";
import Computer from "../components/desk/Computer";
import Ground from "../components/desk/Ground";
import Lights from "../components/desk/Lights";
import SelectableObject from "../components/desk/SelectableObject";
import { DonutModel } from "../models/DonutModel";

const DEFAULT_POS = new THREE.Vector3(-5, 8, 15.2);
const DEFAULT_LOOK_AT = new THREE.Vector3(0, 1.5, 0);

interface CameraView {
  position: THREE.Vector3;
  lookAt: THREE.Vector3;
}

function Desk({
  focusedId,
  setFocusedId,
}: {
  focusedId: string | null;
  setFocusedId: (id: string | null) => void;
}) {
  const [view, setView] = useState<CameraView>({
    position: DEFAULT_POS.clone(),
    lookAt: DEFAULT_LOOK_AT.clone(),
  });
  const donutRef = useRef<THREE.Object3D>(null!);

  const focusOn = (id: string, ref: RefObject<THREE.Object3D>) => {
    if (focusedId == null) {
      setView({
        position: new THREE.Vector3(
          ref.current.position.x,
          ref.current.position.y + 5,
          ref.current.position.z + 10
        ),
        lookAt: ref.current.position.clone(),
      });
      setFocusedId(id);
    } else {
      setView({
        position: DEFAULT_POS.clone(),
        lookAt: DEFAULT_LOOK_AT.clone(),
      });
      setFocusedId(null);
    }
  };

  return (
    <Canvas shadows>
      <CameraController
        targetPosition={view.position}
        targetLookAt={view.lookAt}
      />

      <Environment files={"/assets/environment/studio_small_08_1k.hdr"} />
      <Lights />

      <Suspense fallback={null}>
        <Computer />
      </Suspense>

      <SelectableObject
        component={DonutModel}
        position={[-3, 0, -1]}
        scale={0.2}
        ref={donutRef}
        onClick={() => focusOn("donut", donutRef)}
      />

      <Ground />
    </Canvas>
  );
}

export default Desk;
