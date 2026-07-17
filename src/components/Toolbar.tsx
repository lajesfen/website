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
            <button onClick={toggleMode} aria-label="Toggle Mode">
              <div className="w-10 h-10 flex cursor-pointer items-center bg-[#FCFAFA] justify-center shadow-md rounded-lg overflow-hidden">
                <div
                  className="relative w-3/5 h-1/3 rounded-full transition-colors duration-300"
                  style={{
                    backgroundColor: isInteractiveMode ? "#434343" : "#B0B0B0",
                  }}
                >
                  <div
                    className="absolute w-2 h-2 top-1/2 rounded-full bg-white transition-all duration-150"
                    style={{
                      left: isInteractiveMode ? "calc(100% - 10px)" : "2px",
                      transform: "translateY(-50%)",
                    }}
                  />
                </div>
              </div>
            </button>
          </LabeledObject>
        </div>
      )}
    </div>
  );
};
