import { useUIStore } from "../store/uiStore";
import { LabeledObject } from "./LabeledObject";

export const Toolbar = () => {
  const toggleMode = useUIStore((s) => s.toggleMode);

  return (
    <div
      className="fixed top-1/2 right-3 transform -translate-y-1/2 flex flex-col gap-3 p-2 z-20 bg-[#EDEDED] border border-[#DCDCDC] rounded-xl"
      style={{
        boxShadow: "inset 0 2px 4px rgba(255,255,255,0.5)",
      }}
    >
      <LabeledObject label="Toggle Mode">
        <button onClick={toggleMode}>
          <img
            src="../assets/project.webp"
            alt="Project"
            className="w-12 h-12 drop-shadow-md cursor-pointer"
          />
        </button>
      </LabeledObject>

      <img
        src="../assets/project.webp"
        alt="Project"
        className="w-12 h-12 drop-shadow-md cursor-pointer"
      />
      <img
        src="../assets/project.webp"
        alt="Project"
        className="w-12 h-12 drop-shadow-md cursor-pointer"
      />
    </div>
  );
};
