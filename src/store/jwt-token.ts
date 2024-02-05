import { IUser, TToken } from "@/lib/Interfaces";

import { create } from "zustand";
import { persist } from "zustand/middleware";
interface IuseAuthStore {
  user: IUser | null;
  token: TToken | null;
  setUser: (user: IUser) => void;
  setToken: (token: TToken) => void;
  clearAuth: () => void;
}
const useAuthStore = create<
  IuseAuthStore,
  [["zustand/persist", IuseAuthStore]]
>(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      setUser: (user: IUser) => set({ user }),
      setToken: (token: TToken) => set({ token }),
      clearAuth: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-storage",
    },
  ),
);

export default useAuthStore;
