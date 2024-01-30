import { create } from "zustand";

interface IUseSidebar {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

export const useSidebar = create<IUseSidebar>((set) => ({
  collapsed: true,
  onExpand: () => set(() => ({ collapsed: false })),
  onCollapse: () => set(() => ({ collapsed: true })),
}));
