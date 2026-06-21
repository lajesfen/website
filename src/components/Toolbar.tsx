import { useUIStore } from "../store/uiStore";
import { LabeledObject } from "./LabeledObject";

export const Toolbar = () => {
  const toggleMode = useUIStore((s) => s.toggleMode);
  const isInteractiveMode = useUIStore((s) => s.interactiveMode);
  const isMobile = useUIStore((s) => s.isMobile);

  return (
    <div>
      {!isMobile && (
        <div className="fixed top-1/2 right-3 transform -translate-y-1/2 flex flex-col gap-3 p-2 z-20 bg-[#EDEDED] border border-[#DCDCDC] shadow-inset-highlight rounded-xl">
          <LabeledObject label="Toggle Mode">
            <button onClick={toggleMode}>
              <div className="w-10 h-10 flex items-center justify-center shadow-md rounded-lg overflow-hidden">
                <img
                  src="../assets/icons/toggle-mode.webp"
                  alt="Toggle Mode"
                  className="w-full h-full cursor-pointer select-none"
                  style={{
                    transform: isInteractiveMode ? "scaleX(1)" : "scaleX(-1)",
                  }}
                />
              </div>
            </button>
          </LabeledObject>
        </div>
      )}
    </div>
  );
};
