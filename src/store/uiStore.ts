import { create } from "zustand";

type UIStore = {
  interactiveMode: boolean;
  toggleMode: () => void;
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
};

const getInitialIsMobile = () =>
  typeof window !== "undefined" ? window.innerWidth <= 768 : false;

export const useUIStore = create<UIStore>((set) => {
  if (typeof window !== "undefined") {
    window.addEventListener("resize", () => {
      set({ isMobile: window.innerWidth <= 768 });
    });
  }

  return {
    interactiveMode: true,
    toggleMode: () => set((s) => ({ interactiveMode: !s.interactiveMode })),
    isMobile: getInitialIsMobile(),
    setIsMobile: (isMobile) => set({ isMobile }),
  };
});
