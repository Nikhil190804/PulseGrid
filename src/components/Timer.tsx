import React from "react";


export const Timer: React.FC<{ seconds: number; label?: string }> = ({ seconds, label = "Timer" }) => {
// This component will display a remaining seconds counter
return <div className="pill" aria-label={label}>⏱️ {label}: {seconds}s</div>;
};