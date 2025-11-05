# 🎮 PulseGrid - Decode the Invisible Pattern

> A memory + logic puzzle built with **React + TypeScript + Vite**.  
> Watch the flashing grid, recall the pattern, and discover the invisible logic behind it.

---

## 🧠 Game Concept

In **PulseGrid**, you’ll see a **5×5 flashing grid** that follows a hidden mathematical rule.  
Your goal: **memorize the flash pattern**, **select the same cells**, and **decode the logic**.

Each level has its own pattern rule:
1. Even indices  
2. Diagonals  
3. Prime numbers  
4. Center cluster  
5. `(row + col) % 3 === 0`

Complete all levels to finish the game and reveal the “All Levels Completed” message!

---

## ✨ Features

**React + TypeScript + Vite** (lightning fast dev setup)  
**5 custom logic levels** with unique patterns  
**Accurate 10s flashing timer**  
**Day/Night theme toggle** (auto-saved)  
**Background music system** that loops forever  
**Hint + Reveal** system for wrong guesses  
**Clean modular components** with comments  
**Simple and beginner-friendly code**

---

## 🧩 Gameplay Flow

1. Press **Start Game**  
2. Watch the pattern flash for 10 seconds  
3. Select the same cells  
4. Press **Submit Guess**  
   - ✅ Correct → move to next level  
   - ❌ Wrong → shows hint + option to reveal squares  
5. After completing level 5 → final “🎉 All Levels Completed!” screen appears

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|----------|
| **React (Vite)** | Frontend + state management |
| **TypeScript** | Type safety & clarity |
| **CSS** | Clean, themeable visuals |
| **HTML Audio API** | Background music loop |
| **LocalStorage** | Save theme preference |

---

## 🚀 Getting Started

 ## Run locally
 ```bash
 npm install
 npm run dev
 ```

## Change the background music
 - Put your file under `src/assets/music.mp3` (or any name)
 - Update import in `src/config.ts`: `import music from "./assets/your-file.mp3";`

 ## Notes
 - Autoplay policies require a user gesture; the first click starts the music.
 - Levels implemented exactly per assignment.