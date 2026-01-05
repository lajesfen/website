import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ComputerModel } from "../../models/ComputerModel";

const KeyboardKeys = {
  Escape: "Key_Esc",
  Enter: "Key_Enter",
  Tab: "Key_Tab",
  Backspace: "Key_Backspace",
  CapsLock: "Key_CapsLock",
  ShiftLeft: "Key_ShiftLeft",
  ShiftRight: "Key_ShiftRight",
  ControlLeft: "Key_CtrlLeft",
  ControlRight: "Key_CtrlRight",
  AltRight: "Key_AltRight",
  AltLeft: "Key_AltLeft",
  MetaLeft: "Key_MetaLeft",
  MetaRight: "Key_MetaRight",
  ContextMenu: "Key_CtxMenu",

  Digit0: "Key_0",
  Digit1: "Key_1",
  Digit2: "Key_2",
  Digit3: "Key_3",
  Digit4: "Key_4",
  Digit5: "Key_5",
  Digit6: "Key_6",
  Digit7: "Key_7",
  Digit8: "Key_8",
  Digit9: "Key_9",

  KeyA: "Key_A",
  KeyB: "Key_B",
  KeyC: "Key_C",
  KeyD: "Key_D",
  KeyE: "Key_E",
  KeyF: "Key_F",
  KeyG: "Key_G",
  KeyH: "Key_H",
  KeyI: "Key_I",
  KeyJ: "Key_J",
  KeyK: "Key_K",
  KeyL: "Key_L",
  KeyM: "Key_M",
  KeyN: "Key_N",
  KeyO: "Key_O",
  KeyP: "Key_P",
  KeyQ: "Key_Q",
  KeyR: "Key_R",
  KeyS: "Key_S",
  KeyT: "Key_T",
  KeyU: "Key_U",
  KeyV: "Key_V",
  KeyW: "Key_W",
  KeyX: "Key_X",
  KeyY: "Key_Y",
  KeyZ: "Key_Z",

  Space: "Key_Space",
  Minus: "Key_Minus",
  Equal: "Key_Plus",
  BracketLeft: "Key_BrackLeft",
  BracketRight: "Key_BrackRight",
  Backslash: "Key_Backslash",
  Semicolon: "Key_SemiCol",
  Quote: "Key_Quote",
  Comma: "Key_Comma",
  Period: "Key_Dot",
  Slash: "Key_QMark",
};

function Computer() {
  const modelRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const model = modelRef.current;
    if (!model) return;

    const keyOriginalYs = new Map<string, number>();
    const KEY_PRESS_OFFSET = -0.04;

    const handleKeyDown = (event: KeyboardEvent) => {
      let keyName = event.code as keyof typeof KeyboardKeys;
      const keyMesh = model.getObjectByName(KeyboardKeys[keyName]);
      if (!keyMesh) return;

      if (!keyOriginalYs.has(keyName)) {
        keyOriginalYs.set(keyName, keyMesh.position.y);
        keyMesh.position.y += KEY_PRESS_OFFSET;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const keyName = event.code as keyof typeof KeyboardKeys;
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
