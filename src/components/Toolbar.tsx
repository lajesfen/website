import { useUIStore } from "../store/uiStore";
import { LabeledObject } from "./LabeledObject";

export const Toolbar = () => {
  const toggleMode = useUIStore((s) => s.toggleMode);
  const isMobile = useUIStore((s) => s.isMobile);

  return (
    <div>
      {!isMobile && (
        <div
          className="fixed top-1/2 right-3 transform -translate-y-1/2 flex flex-col gap-3 p-2 z-20 bg-[#EDEDED] border border-[#DCDCDC] rounded-xl"
          style={{
            boxShadow: "inset 0 2px 4px rgba(255,255,255,0.5)",
          }}
        >
          <LabeledObject label="Toggle Mode">
            <button onClick={toggleMode}>
              <img
                src="../assets/icons/toggle-mode.webp"
                alt="Toggle Mode"
                className="w-10 h-10 shadow-md cursor-pointer select-none shrink-0 rounded-lg"
              />
            </button>
          </LabeledObject>
        </div>
      )}
    </div>
  );
};
