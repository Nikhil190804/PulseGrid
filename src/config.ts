import music from "./assets/music.mp3";


// This config will centralize basic knobs for the game
export const BOARD_SIZE = 5; // grid NxN
export const FLASH_DURATION_SEC = 10; // how long to flash before selection
export const FLASH_INTERVAL_MS = 600; // flash cadence
export const AUTO_START_MUSIC = true; // attempt to start after first user gesture


// This path will define the looping BGM file. Replace music.mp3 in /src/assets easily.
export const BGM_SRC: string = music;