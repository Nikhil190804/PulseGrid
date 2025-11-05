import React from "react";


interface CellProps {
index: number;
selectable: boolean;
isFlashing: boolean; // during flashing phase, true if this cell is lit
isSelected: boolean; // during selecting, true if user selected
reviewClass?: "correct" | "incorrect" | "missed" | ""; // during review phase
onToggle?: (index: number) => void;
}


export const Cell: React.FC<CellProps> = ({ index, selectable, isFlashing, isSelected, reviewClass = "", onToggle }) => {
// This component will render a single grid cell with appropriate visual state
const cls = [
"cell",
isFlashing ? "flash" : "",
selectable ? "selectable" : "",
isSelected ? "selected" : "",
reviewClass ? reviewClass : ""
].filter(Boolean).join(" ");


return (
<div
role={selectable ? "button" : undefined}
aria-label={`Cell ${index}`}
className={cls}
onClick={() => selectable && onToggle && onToggle(index)}
/>
);
};