import React from "react";


export const Score: React.FC<{ level: number; score: number }> = ({ level, score }) => {
// This component will display the current level and score
return (
<div className="kpi">
<div className="pill">Level: {level}</div>
<div className="pill">Score: {score}</div>
</div>
);
};