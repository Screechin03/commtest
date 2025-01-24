import { create } from "zustand";

export const useThemeStore = create((set) => ({
    theme: "light", // Default theme
    toggleTheme: () =>
        set((state) => ({
            theme: state.theme === "light" ? "dark" : "light",
        })),
}));
