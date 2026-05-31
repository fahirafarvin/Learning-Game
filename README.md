# 🏰 Ascendia: Code Your Way Out

Let's be honest: learning to code by reading documentation and typing `console.log("Hello World")` into a blank white terminal is dry. I wanted to build something that makes learning web development feel like playing a classic pensive adventure game.

**Ascendia** is an interactive, gamified escape room wrapped in a cozy, mysterious "Dark Academia" aesthetic (think grand gothic libraries, warm chandelier lighting, and secret passages).

Instead of just checking if your code is syntactically correct, **your code directly alters the physical environment** to help you escape the room:

- **The Newspaper Puzzle:** Find an old newspaper missing a title. Write a proper `<h1>` tag inside the terminal overlay, and the headline dynamically prints onto the paper in real-time, spawning a brass key on the desk.
- **The Empty Portrait Puzzle:** Inspect a giant gilded frame on the wall. Write an `<img>` tag with the correct source, and watch a beautiful landscape painting materialize on the canvas to unlock the exit door.

---

## 🎮 How It Works (The Gameplay Loop)

1. **The Grand Hall (Home):** You land in a gorgeous entrance hall featuring pensive music, gold accents, and your character standing at the foot of a massive carpeted staircase.
2. **Choose Your Discipline:** Browse a selection grid of **10 in-demand tech pathways** (Frontend, Backend, Cyber, AI, Game Dev, etc.).
3. **Resonate Your Skill Level:** Already know the basics? You don't have to suffer through the beginner levels. You can choose to skip straight to Chamber 20 (Intermediate) or 40 (Advanced).
4. **Enter the Room:** Once you step inside, all UI clutter, sidebars, and dashboard noise disappear. You get a pure, beautiful 2.5D game window.
5. **Explore & Code:** Move your avatar using **WASD** (or the on-screen D-pad), walk up to glowing objects, read the physical instruction scrolls, and open the integrated console to solve the rooms.

---

## ✨ Key Features

- **Interactive 2.5D Game Engine:** Built entirely using responsive SVG rendering and state-based keyboard movement. No heavy 3D rendering engines (like Three.js) required, keeping it incredibly fast and lightweight.
- **Clutter-Free Immersive Mode:** Standard learning platforms overwhelm you with XP bars, quest popups, and badges. When you're in an Ascendia chamber, it’s just you, the gothic room, and the puzzle.
- **"Ancient Scroll" Cheat Sheet:** A beautifully styled pop-up parchment paper explaining the code concepts to absolute beginners, which can be minimized into a floating icon so it doesn't block the screen.
- **Responsive Layout:** Beautifully adapted for both desktop (WASD keyboard keys) and mobile (on-screen touch D-pad).

---

## 🛠️ Tech Stack

This project was built to show how much you can accomplish in a lightweight, modern web stack without bloated dependencies:

- **React** (State management, keyboard event listeners, and live DOM rendering)
- **Tailwind CSS** (Custom theme colors, atmospheric gradients, and UI transitions)
- **Lucide Icons** (Minimalist vector icons)
- **Pure SVG Geometry** (To render the isometric room perspective and player movement dynamically)
