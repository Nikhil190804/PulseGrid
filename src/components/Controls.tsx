import React from "react";


interface ControlsProps {
phase: "intro" | "flashing" | "selecting" | "review";
canSubmit: boolean;
onSubmit: () => void;
onClear: () => void;
onNext: () => void;
onReplay: () => void;
}


export const Controls: React.FC<ControlsProps> = ({ phase, canSubmit, onSubmit, onClear, onNext, onReplay }) => {
// This component will render action buttons depending on phase
return (
<div className="controls">
{phase === "flashing" && (
<button onClick={onReplay} title="Replay pattern">Replay Pattern</button>
)}


{phase === "selecting" && (
<>
<button className="primary" disabled={!canSubmit} onClick={onSubmit}>Submit Guess</button>
<button onClick={onClear}>Clear</button>
<button onClick={onReplay}>Replay Pattern</button>
</>
)}


{phase === "review" && (
<>
<button className="primary" onClick={onNext}>Next Level</button>
<button onClick={onReplay}>View Pattern</button>
</>
)}
</div>
);
};