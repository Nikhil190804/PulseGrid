
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./index.css";
import { ThemeProvider } from "./theme/Themeprovider";
import { ThemeToggle } from "./components/ThemeToggle";
import { Timer } from "./components/Timer";
import { Score } from "./components/Score";
import { Grid } from "./components/Grid";
import { Hint } from "./components/Hint";
import { MusicPlayer } from "./components/MusicPlayer";
import {
  BGM_SRC,
  BOARD_SIZE as SIZE,
  FLASH_DURATION_SEC,
  FLASH_INTERVAL_MS,
  AUTO_START_MUSIC,
} from "./config";
import type { Phase } from "./logic/types";
import { LEVELS, computeCorrectIndices, BOARD_SIZE } from "./logic/levels";

// =====================================
// Helper function
// =====================================
function setEquals(a: Set<number>, b: Set<number>) {
  // This function will compare two sets for equality
  if (a.size !== b.size) return false;
  for (const v of a) if (!b.has(v)) return false;
  return true;
}

// =====================================
// Main Game Component
// =====================================
const AppInner: React.FC = () => {
  // Core game states
  const [phase, setPhase] = useState<Phase>("intro");
  const [levelIdx, setLevelIdx] = useState<number>(0);
  const level = LEVELS[levelIdx];

  // Pattern and player selection states
  const correct = useMemo(() => computeCorrectIndices(level.id), [level.id]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [flashOn, setFlashOn] = useState<boolean>(false);
  const [flashSeconds, setFlashSeconds] = useState<number>(FLASH_DURATION_SEC);
  const [score, setScore] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [revealed, setRevealed] = useState<boolean>(false);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);

  // Timer refs
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  // =====================================
  // Timer cleanup helper
  // =====================================
  const clearTimers = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // =====================================
  // Start flashing pattern phase
  // =====================================
  const startFlashing = useCallback(() => {
    // This function will start the flashing animation for the pattern
    clearTimers();
    setPhase("flashing");
    setShowHint(false);
    setSelected(new Set());
    setRevealed(false);
    setFlashSeconds(FLASH_DURATION_SEC);
    setFlashOn(true);

    // Start flashing toggle
    intervalRef.current = window.setInterval(() => {
      setFlashOn((f) => !f);
      setFlashSeconds((s) => (s > 0 ? s - 1 : 0));
    }, FLASH_INTERVAL_MS);

    // Stop exactly after 10 seconds
    timeoutRef.current = window.setTimeout(() => {
      clearTimers();
      setFlashOn(false);
      setPhase("selecting");
      setFlashSeconds(0);
    }, FLASH_DURATION_SEC * 1000);
  }, [clearTimers]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  // =====================================
  // Cell selection logic
  // =====================================
  const onToggleCell = useCallback((idx: number) => {
    // This function will toggle selection of a cell
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }, []);

  const canSubmit = selected.size > 0;

  // =====================================
  // Compute review map (only after reveal)
  // =====================================
  const reviewMap = useMemo(() => {
    if (!revealed) return {};
    const map: Record<number, "correct" | "incorrect" | "missed" | ""> = {};
    for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
      const isC = correct.has(i);
      const isS = selected.has(i);
      if (isS && isC) map[i] = "correct";
      else if (isS && !isC) map[i] = "incorrect";
      else if (!isS && isC) map[i] = "missed";
      else map[i] = "";
    }
    return map;
  }, [revealed, correct, selected]);

  // =====================================
  // Submit guess
  // =====================================
  const submit = useCallback(() => {
    // This function will evaluate the user's guess
    if (phase !== "selecting") return;

    if (setEquals(selected, correct)) {
      // ✅ Correct guess
      setScore((s) => s + 3);
      setPhase("review");
      setRevealed(true);
      setShowHint(false);
    } else {
      // ❌ Wrong guess → just show hint
      setShowHint(true);
    }
  }, [phase, selected, correct]);

  // =====================================
  // Reveal pattern manually
  // =====================================
  const revealPattern = useCallback(() => {
    // This function will reveal the correct squares to the user
    setRevealed(true);
    setPhase("review");
  }, []);

  // =====================================
  // Next level or game complete
  // =====================================
  const nextLevel = useCallback(() => {
    if (levelIdx === LEVELS.length - 1) {
      // All levels completed
      setGameCompleted(true);
      setPhase("intro");
      setLevelIdx(0);
      setSelected(new Set());
      setRevealed(false);
      setShowHint(false);
      return;
    }

    // Go to next level
    setLevelIdx((i) => i + 1);
    startFlashing();
  }, [levelIdx, startFlashing]);

  // =====================================
  // Replay pattern
  // =====================================
  const replay = useCallback(() => startFlashing(), [startFlashing]);

  // =====================================
  // JSX Rendering
  // =====================================
  return (
    <div className="card">
      {/* Header */}
      <div className="header">
        <div>
          <div className="title">PulseGrid: The Invisible Pattern Game</div>
          <div className="subtle">
            Watch the pattern. Select the squares. Decode the rule.
          </div>
        </div>
        <ThemeToggle />
      </div>

      {/* Top bar */}
      <div className="topbar">
        <Score level={level.id} score={score} />
        {phase === "flashing" && <Timer seconds={flashSeconds} label="Memorize" />}
      </div>

      {/* Intro phase */}
      {phase === "intro" && !gameCompleted && (
        <div className="intro">
          <div className="alert">
            <b>How to play:</b> A 5×5 board will flash a pattern for {FLASH_DURATION_SEC}s.
            Then, select the same squares and submit.
          </div>
          <div className="kpi">
            <div className="pill">Levels: {LEVELS.length}</div>
            <div className="pill">Board: {SIZE}×{SIZE}</div>
          </div>
          <div className="sep" />
          <button className="primary" onClick={() => startFlashing()}>
            Start Game
          </button>
          <div className="subtle">
            Tip: Your first click will enable background music automatically.
          </div>
        </div>
      )}

      {/* Game completed screen */}
      {gameCompleted && (
        <div className="intro">
          <h2>🎉 All Levels Completed!</h2>
          <p>Come again next time for further levels.</p>
          <button onClick={() => setGameCompleted(false)}>Return to Home</button>
        </div>
      )}

      {/* Main Game Phases */}
      {phase !== "intro" && !gameCompleted && (
        <div className="grid-wrap">
          <Grid
            size={SIZE}
            selectable={phase === "selecting"}
            flashingOn={phase === "flashing" ? flashOn : false}
            litIndices={correct}
            selected={selected}
            reviewMap={reviewMap}
            onToggle={onToggleCell}
          />

          {showHint && <Hint text={level.hint} />}

          {/* Controls Section */}
          <div className="controls">
            {phase === "selecting" && (
              <>
                <button
                  className="primary"
                  disabled={!canSubmit}
                  onClick={submit}
                >
                  Submit Guess
                </button>
                <button onClick={() => setSelected(new Set())}>Clear</button>
                <button onClick={replay}>Replay Pattern</button>
                {showHint && !revealed && (
                  <button onClick={revealPattern}>Reveal Squares</button>
                )}
              </>
            )}

            {phase === "review" && (
              <button className="primary" onClick={nextLevel}>
                Next Level
              </button>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="footer">
        {!gameCompleted && (
          <div className="subtle">
            Current level: <b>{level.name}</b>
          </div>
        )}
        <MusicPlayer src={BGM_SRC} autoStart={AUTO_START_MUSIC} />
      </div>
    </div>
  );
};

// =====================================
// Root App Wrapper
// =====================================
const App: React.FC = () => {
  // This component will wrap the game in ThemeProvider
  return (
    <ThemeProvider>
      <div className="app">
        <AppInner />
      </div>
    </ThemeProvider>
  );
};

export default App;
