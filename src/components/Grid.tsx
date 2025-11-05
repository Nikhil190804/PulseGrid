import React from "react";
import { Cell } from "./Cell";


interface GridProps {
size: number;
selectable: boolean;
flashingOn: boolean; // global flag if currently showing lit state frame
litIndices: Set<number>; // which indices are lit by the rule
selected: Set<number>;
reviewMap?: Record<number, "correct" | "incorrect" | "missed" | "">; // index -> class
onToggle?: (index: number) => void;
}


export const Grid: React.FC<GridProps> = ({ size, selectable, flashingOn, litIndices, selected, reviewMap = {}, onToggle }) => {
// This component will render the 5x5 grid of cells
const cells = [];
for (let i = 0; i < size * size; i++) {
const isFlashing = flashingOn && litIndices.has(i);
const isSelected = selected.has(i);
const reviewClass = reviewMap[i] ?? "";
cells.push(
<Cell
key={i}
index={i}
selectable={selectable}
isFlashing={isFlashing}
isSelected={isSelected}
reviewClass={reviewClass}
onToggle={onToggle}
/>
);
}


return <div className="board" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>{cells}</div>;
};