import React from "react";


export const Hint: React.FC<{ text: string }>
= ({ text }) => {
// This component will show a subtle hint text
return <div className="hint">💡 Hint: {text}</div>;
};