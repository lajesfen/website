import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ComputerModel } from "../meshes/ComputerModel";

const KeyboardKeys = {
  escape: "Key_Esc",
  "1": "Key_1",
  "2": "Key_2",
  enter: "Key_Enter",
};

function Computer() {
  const modelRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const model = modelRef.current;
    if (!model) return;

    const keyOriginalYs = new Map<string, number>();
    const KEY_PRESS_OFFSET = -0.04;

    const handleKeyDown = (event: KeyboardEvent) => {
      const keyName = event.key.toLowerCase() as keyof typeof KeyboardKeys;
      const keyMesh = model.getObjectByName(KeyboardKeys[keyName]);
      if (!keyMesh) return;

      if (!keyOriginalYs.has(keyName)) {
        keyOriginalYs.set(keyName, keyMesh.position.y);
        keyMesh.position.y += KEY_PRESS_OFFSET;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const keyName = event.key.toLowerCase() as keyof typeof KeyboardKeys;
      const keyMesh = model.getObjectByName(KeyboardKeys[keyName]);
      if (!keyMesh) return;

      const originalY = keyOriginalYs.get(keyName);

      if (originalY !== undefined) {
        keyMesh.position.y = originalY;
        keyOriginalYs.delete(keyName);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return <ComputerModel ref={modelRef} />;
}

export default Computer;
