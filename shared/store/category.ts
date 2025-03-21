import { create } from 'zustand';

type CategoryStore = {
  activeId: number;
  setActiveId: (id: number) => void;
};

export const useCategoryStore = create<CategoryStore>((set) => ({
  activeId: 0,
  setActiveId: (activeId: number) => set({ activeId }),
}));
