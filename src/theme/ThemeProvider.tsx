import React, { createContext, useContext, useEffect, useMemo, useState } from "react";


type Theme = "light" | "dark";


interface ThemeCtx {
theme: Theme;
toggle: () => void;
}


const Ctx = createContext<ThemeCtx | null>(null);


export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
// This state will store the current theme
const [theme, setTheme] = useState<Theme>(() => {
const saved = localStorage.getItem("theme") as Theme | null;
if (saved) return saved;
return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
});


useEffect(() => {
// This effect will apply the chosen theme to the <html> element
document.documentElement.setAttribute("data-theme", theme);
localStorage.setItem("theme", theme);
}, [theme]);


const value = useMemo(() => ({ theme, toggle: () => setTheme(t => t === "light" ? "dark" : "light") }), [theme]);


return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};


export function useTheme() {
// This hook will expose theme context
const ctx = useContext(Ctx);
if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
return ctx;
}