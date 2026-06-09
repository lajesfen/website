import Email from "../../assets/Email.png";
import GitHub from "../../assets/GitHub.png";
import LinkedIn from "../../assets/LinkedIn.png";
import { GrabbableObject } from "./GrabbableObject";

export const Board = () => {
  return (
    <div>
      <GrabbableObject tooltip="LinkedIn" defaults={{ x: 0.86, y: 0.85, rotation: -15 }}>
        <img src={LinkedIn} alt="Object" className="w-12 h-12" />
      </GrabbableObject>
      <GrabbableObject tooltip="GitHub" defaults={{ x: 0.9, y: 0.83, rotation: 15 }}>
        <img src={GitHub} alt="Object" className="w-12 h-12" />
      </GrabbableObject>
      <GrabbableObject tooltip="Email" defaults={{ x: 0.94, y: 0.85, rotation: 0 }}>
        <img src={Email} alt="Object" className="w-12 h-12" />
      </GrabbableObject>
    </div>
  );
};
