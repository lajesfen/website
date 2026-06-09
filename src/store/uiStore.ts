import { create } from "zustand";

type UIStore = {
  interactiveMode: boolean;
  toggleMode: () => void;
};

export const useUIStore = create<UIStore>((set) => ({
  interactiveMode: true,
  toggleMode: () => set((s) => ({ interactiveMode: !s.interactiveMode })),
}));
