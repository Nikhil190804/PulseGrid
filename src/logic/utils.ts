// This utility will check prime numbers for the 0..24 index range
export function isPrime(n: number): boolean {
// This function will determine if a given number is prime
if (n < 2) return false;
for (let i = 2; i * i <= n; i++) {
if (n % i === 0) return false;
}
return true;
}


export function indexToRC(index: number, size = 5) {
// This function will convert a linear index to row/column
return { row: Math.floor(index / size), col: index % size };
}


export function rcToIndex(row: number, col: number, size = 5) {
// This function will convert row/column back to linear index
return row * size + col;
}


export function range(n: number) {
// This function will create an array [0..n-1]
return Array.from({ length: n }, (_, i) => i);
}


export function setEquals(a: Set<number>, b: Set<number>) {
// This function will compare two numeric sets for equality
if (a.size !== b.size) return false;
for (const v of a) if (!b.has(v)) return false;
return true;
}