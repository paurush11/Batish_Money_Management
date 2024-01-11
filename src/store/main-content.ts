import { create } from "zustand"

interface ISetMainContent {
    value: number;
    setValue: (num: number) => void
}

export const useMainContent = create<ISetMainContent>((set)=>({
    value: 0,
    setValue: (num) => set(()=>({value: num}))
}))