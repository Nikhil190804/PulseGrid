import type { Level } from "./types";
import { isPrime, rcToIndex } from "./utils";


// 5x5 grid, indices 0..24 as per assignment
export const LEVELS: Level[] = [
{
id: 1,
name: "Even indices",
description: "Flash squares where index % 2 === 0",
hint: "Think in 0-based positions: 0,2,4…",
rule: (index) => index % 2 === 0,
},
{
id: 2,
name: "Diagonals",
description: "Flash squares where row===col or row+col===4",
hint: "Main and anti-diagonal cross.",
rule: (index, row, col) => row === col || row + col === 4,
},
{
id: 3,
name: "Prime numbers",
description: "Flash squares whose index is prime",
hint: "Numbers divisible only by 1 and themselves.",
rule: (index) => isPrime(index),
},
{
id: 4,
name: "Center cluster",
description: "Center and its 4 neighbors",
hint: "Focus around the middle of the board.",
rule: (_index, row, col) => {
const centerR = 2, centerC = 2;
const isCenter = row === centerR && col === centerC;
const isNeighbor = (row === centerR && Math.abs(col - centerC) === 1) ||
(col === centerC && Math.abs(row - centerR) === 1);
return isCenter || isNeighbor;
},
},
{
id: 5,
name: "(row+col) % 3 === 0",
description: "Use (row + col) % 3 === 0",
hint: "Try summing row and column.",
rule: (_index, row, col) => (row + col) % 3 === 0,
},
];


export const BOARD_SIZE = 5; // 5x5


export function computeCorrectIndices(levelId: number): Set<number> {
// This function will compute which indices are correct for a given level
const lvl = LEVELS.find((l) => l.id === levelId)!;
const out = new Set<number>();
for (let r = 0; r < BOARD_SIZE; r++) {
for (let c = 0; c < BOARD_SIZE; c++) {
const idx = rcToIndex(r, c, BOARD_SIZE);
if (lvl.rule(idx, r, c)) out.add(idx);
}
}
return out;
}