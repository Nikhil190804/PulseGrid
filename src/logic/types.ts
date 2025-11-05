export type Phase = "intro" | "flashing" | "selecting" | "review";


export type LevelRule = (index: number, row: number, col: number) => boolean;


export interface Level {
id: number;
name: string;
description: string;
hint: string;
rule: LevelRule;
}