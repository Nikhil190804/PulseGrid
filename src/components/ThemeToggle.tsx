import React from "react";
import { useTheme } from "../theme/Themeprovider";


export const ThemeToggle: React.FC = () => {
// This component will show a simple theme toggle button
const { theme, toggle } = useTheme();
return (
<button className="ghost" onClick={toggle} aria-label="Toggle theme">
{theme === "light" ? "🌞 Light" : "🌙 Dark"}
</button>
);
};