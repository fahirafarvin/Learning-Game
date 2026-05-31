import React, { useState, useEffect } from "react";
import {
  BookOpen,
  ChevronRight,
  ArrowLeft,
  Key,
  FileText,
  User,
  X,
  Check,
  Code,
  Play,
} from "lucide-react";

// 10 Popular In-Demand Courses
const COURSES = [
  {
    id: 1,
    title: "Frontend Development",
    category: "Web",
    color: "border-amber-500",
    rooms: 50,
  },
  {
    id: 2,
    title: "Backend Systems",
    category: "Engineering",
    color: "border-blue-500",
    rooms: 45,
  },
  {
    id: 3,
    title: "AI & Machine Learning",
    category: "Data",
    color: "border-purple-500",
    rooms: 40,
  },
  {
    id: 4,
    title: "Cybersecurity",
    category: "Security",
    color: "border-red-500",
    rooms: 35,
  },
  {
    id: 5,
    title: "Cloud Architecture",
    category: "DevOps",
    color: "border-cyan-500",
    rooms: 35,
  },
  {
    id: 6,
    title: "UI/UX Design",
    category: "Creative",
    color: "border-pink-500",
    rooms: 30,
  },
  {
    id: 7,
    title: "Mobile App Dev",
    category: "Mobile",
    color: "border-emerald-500",
    rooms: 40,
  },
  {
    id: 8,
    title: "Data Science",
    category: "Analysis",
    color: "border-indigo-500",
    rooms: 30,
  },
  {
    id: 9,
    title: "Game Development",
    category: "Gaming",
    color: "border-orange-500",
    rooms: 45,
  },
  {
    id: 10,
    title: "Blockchain Web3",
    category: "Crypto",
    color: "border-yellow-500",
    rooms: 35,
  },
];

export default function App() {
  const [view, setView] = useState("home"); // home, courses, game
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Game Play States
  const [room, setRoom] = useState(1);
  const [playerPos, setPlayerPos] = useState({ x: 450, y: 350 }); // Center of room
  const [solvedObjects, setSolvedObjects] = useState([]);
  const [activePuzzle, setActivePuzzle] = useState(null); // 'newspaper' | 'portrait'
  const [showNote, setShowNote] = useState(true);
  const [inputCode, setInputCode] = useState("");
  const [feedback, setFeedback] = useState("");
  const [keys, setKeys] = useState(3);
  const [crystals, setCrystals] = useState(120);

  // WASD Key Movement Controller
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (view !== "game") return;
      const key = e.key.toLowerCase();
      const step = 15;

      setPlayerPos((prev) => {
        let newX = prev.x;
        let newY = prev.y;

        if (key === "w" || key === "arrowup")
          newY = Math.max(260, prev.y - step);
        if (key === "s" || key === "arrowdown")
          newY = Math.min(420, prev.y + step);
        if (key === "a" || key === "arrowleft")
          newX = Math.max(150, prev.x - step);
        if (key === "d" || key === "arrowright")
          newX = Math.min(750, prev.x + step);

        return { x: newX, y: newY };
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [view]);

  // Handle On-screen WASD Clicks
  const handleMove = (dir) => {
    const step = 20;
    setPlayerPos((prev) => {
      let newX = prev.x;
      let newY = prev.y;
      if (dir === "W") newY = Math.max(260, prev.y - step);
      if (dir === "S") newY = Math.min(420, prev.y + step);
      if (dir === "A") newX = Math.max(150, prev.x - step);
      if (dir === "D") newX = Math.min(750, prev.x + step);
      return { x: newX, y: newY };
    });
  };

  // Puzzle Solvers
  const verifyPuzzle = () => {
    const cleanInput = inputCode.trim();

    if (activePuzzle === "newspaper") {
      const h1Regex = /^<h1>\s*(.*?)\s*<\/h1>$/i;
      const match = cleanInput.match(h1Regex);

      if (match && match[1].length > 0) {
        setSolvedObjects([...solvedObjects, "newspaper"]);
        setFeedback(
          "Success! The headline binds to the newspaper, and a brass key materializes."
        );
        setKeys((prev) => prev + 1);
        setActivePuzzle(null);
        setInputCode("");
      } else {
        setFeedback(
          "The incantation fails. Ensure you type opening <h1> and closing </h1> tags around your text."
        );
      }
    }

    if (activePuzzle === "portrait") {
      if (
        cleanInput.toLowerCase().includes("<img src=") &&
        cleanInput.toLowerCase().includes(">")
      ) {
        setSolvedObjects([...solvedObjects, "portrait"]);
        setFeedback(
          "Splendid! The magical scenery displays on the canvas, and the room gate shimmers."
        );
        setCrystals((prev) => prev + 50);
        setActivePuzzle(null);
        setInputCode("");
      } else {
        setFeedback(
          'The canvas stays blank. Double-check your <img src="..."> tags!'
        );
      }
    }
  };

  const quitToHub = () => {
    setView("home");
    setRoom(1);
    setSolvedObjects([]);
    setActivePuzzle(null);
    setInputCode("");
    setFeedback("");
    setPlayerPos({ x: 450, y: 350 });
  };

  return (
    <div className="min-h-screen bg-[#070503] text-[#e5d5bc] font-sans selection:bg-amber-500 selection:text-black flex flex-col justify-between overflow-x-hidden">
      {/* ================= STUNNING TOP HEADER (Active except inside immersive game) ================= */}
      {view !== "game" && (
        <header className="flex items-center justify-between px-10 py-5 bg-[#0a0705]/95 backdrop-blur-md border-b border-[#2a1d12] sticky top-0 z-50 shadow-xl">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={quitToHub}
          >
            <div className="w-9 h-9 bg-gradient-to-br from-[#d4af37] via-[#b99331] to-[#806018] rounded flex items-center justify-center text-black font-serif font-black shadow-lg">
              A
            </div>
            <h1 className="text-2xl font-serif font-black tracking-widest text-[#d4af37]">
              ASCENDIA
            </h1>
          </div>
          <nav className="hidden lg:flex gap-10">
            {["Home", "Courses", "Progress", "Achievements", "Profile"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() =>
                    item === "Courses" ? setView("courses") : setView("home")
                  }
                  className={`text-xs font-bold uppercase tracking-[0.25em] relative py-1 transition-all duration-300 group
                  ${
                    (item === "Home" && view === "home") ||
                    (item === "Courses" && view === "courses")
                      ? "text-[#d4af37]"
                      : "text-stone-500 hover:text-[#faf2cc]"
                  }`}
                >
                  {item}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#d4af37] to-[#806018] transition-transform duration-300 origin-left 
                  ${
                    (item === "Home" && view === "home") ||
                    (item === "Courses" && view === "courses")
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                  />
                </button>
              )
            )}
          </nav>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[#17100a] border border-[#2a1d12] px-3.5 py-1.5 rounded-full text-xs font-mono text-[#d4af37]">
              <Key className="w-3.5 h-3.5" />
              <span>{keys} / 20</span>
            </div>
            <div className="flex items-center gap-2 bg-[#17100a] border border-[#2a1d12] px-3.5 py-1.5 rounded-full text-xs font-mono text-[#faf2cc]">
              <span>💎</span>
              <span>{crystals}</span>
            </div>
          </div>
        </header>
      )}

      {/* ================= VIEW 1: PRECISE REPLICA OF THE HOME PAGE ================= */}
      {view === "home" && (
        <main className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-grow">
          {/* Left Hero & Action Callouts */}
          <div className="lg:col-span-5 space-y-10 animate-fadeIn">
            <div className="space-y-4">
              <span className="text-[#d4af37] text-6xl font-serif">“</span>
              <p className="text-3xl md:text-4xl font-serif leading-relaxed italic text-stone-100 -mt-6">
                The air is heavy, and walls are lined with strange puzzles. Do
                you have what it takes to code your way out?
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setView("courses")}
                className="bg-gradient-to-r from-[#d4af37] to-[#806018] hover:brightness-110 text-black font-black py-4 px-10 rounded-lg text-sm uppercase tracking-widest transition-all shadow-xl shadow-yellow-950/20"
              >
                Enter Courses
              </button>
              <button className="bg-[#1f130a]/80 border border-[#4d341a] hover:bg-[#2b1b10] text-[#faf2cc] font-bold py-4 px-8 rounded-lg text-xs uppercase tracking-widest transition-all">
                How It Works
              </button>
            </div>
            <div className="bg-[#120a05] border border-[#2d1e11] p-5 rounded-xl flex gap-4 items-start shadow-md">
              <div className="p-2.5 bg-amber-950/50 border border-amber-800/30 rounded-lg text-[#d4af37]">
                💡
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#d4af37] font-black mb-1">
                  Tip of the Day
                </h4>
                <p className="text-xs text-[#9c8669] leading-relaxed">
                  Remember: Every puzzle you solve teaches you something
                  powerful. Altering code changes physical architectural gates.
                  Keep exploring!
                </p>
              </div>
            </div>
          </div>

          {/* Right Immersive Grand Entrance Illustration */}
          <div className="lg:col-span-7 relative aspect-[16/11] rounded-2xl overflow-hidden border border-[#4d341a] shadow-2xl bg-gradient-to-b from-[#1b1209] to-black">
            {/* Fully Painted Grand Entrance background representing ChatGPT Image May 31, 2026, 02_08_11 PM.png */}
            <svg viewBox="0 0 800 550" className="w-full h-full object-cover">
              <defs>
                <linearGradient id="wallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2c1a0e" />
                  <stop offset="100%" stopColor="#070402" />
                </linearGradient>
                <linearGradient
                  id="carpetGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#4a0e0e" />
                  <stop offset="50%" stopColor="#8c1c1c" />
                  <stop offset="100%" stopColor="#4a0e0e" />
                </linearGradient>
                <radialGradient id="lightGlow" cx="50%" cy="10%" r="50%">
                  <stop offset="0%" stopColor="rgba(212, 175, 55, 0.3)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </radialGradient>
              </defs>

              {/* Walls & Pillars */}
              <rect width="800" height="550" fill="url(#wallGrad)" />
              <path
                d="M 0,0 L 250,0 L 150,550 L 0,550 Z"
                fill="#140c06"
                stroke="#2c1a0e"
                strokeWidth="2"
              />
              <path
                d="M 800,0 L 550,0 L 650,550 L 800,550 Z"
                fill="#140c06"
                stroke="#2c1a0e"
                strokeWidth="2"
              />

              {/* Columns on Sides */}
              <rect
                x="60"
                y="0"
                width="35"
                height="550"
                fill="#2c1a0e"
                stroke="#4d341a"
              />
              <rect
                x="705"
                y="0"
                width="35"
                height="550"
                fill="#2c1a0e"
                stroke="#4d341a"
              />

              {/* Grand Staircase back center */}
              <path
                d="M 300,180 L 500,180 L 580,380 L 220,380 Z"
                fill="#0d0805"
              />
              {/* Stairs Lines */}
              {Array.from({ length: 15 }).map((_, i) => (
                <line
                  key={i}
                  x1={300 - i * 5}
                  y1={180 + i * 13}
                  x2={500 + i * 5}
                  y2={180 + i * 13}
                  stroke="#2c1a0e"
                  strokeWidth="3"
                />
              ))}
              {/* Red Stair Carpet */}
              <path
                d="M 360,180 L 440,180 L 480,380 L 320,380 Z"
                fill="url(#carpetGrad)"
              />

              {/* Symmetrical Hanging Wall Banners */}
              <rect
                x="180"
                y="40"
                width="30"
                height="150"
                fill="#4a0e0e"
                rx="4"
              />
              <circle cx="195" cy="115" r="8" fill="#d4af37" opacity="0.3" />
              <rect
                x="590"
                y="40"
                width="30"
                height="150"
                fill="#4a0e0e"
                rx="4"
              />
              <circle cx="605" cy="115" r="8" fill="#d4af37" opacity="0.3" />

              {/* Warm glow from the Chandelier top center */}
              <rect
                x="0"
                y="0"
                width="800"
                height="550"
                fill="url(#lightGlow)"
              />
              {/* Chandelier Stem */}
              <line
                x1="400"
                y1="0"
                x2="400"
                y2="70"
                stroke="#d4af37"
                strokeWidth="4"
              />
              <path
                d="M 330,70 Q 400,110 470,70"
                fill="none"
                stroke="#d4af37"
                strokeWidth="3"
              />
              <circle cx="400" cy="90" r="12" fill="#d4af37" opacity="0.7" />

              {/* Polished Marble Floor with Checkered perspective */}
              <path d="M 0,380 L 800,380 L 800,550 L 0,550 Z" fill="#0c0704" />
              <path
                d="M 150,380 L 300,550 M 300,380 L 450,550 M 450,380 L 600,550 M 600,380 L 750,550 M 50,380 L 0,480 M 750,380 L 800,480"
                stroke="#22140a"
                strokeWidth="2"
              />
              <line
                x1="0"
                y1="410"
                x2="800"
                y2="410"
                stroke="#22140a"
                strokeWidth="2"
              />
              <line
                x1="0"
                y1="450"
                x2="800"
                y2="450"
                stroke="#22140a"
                strokeWidth="2"
              />
              <line
                x1="0"
                y1="500"
                x2="800"
                y2="500"
                stroke="#22140a"
                strokeWidth="2"
              />

              {/* Red floor carpet leading to stairs */}
              <path
                d="M 320,380 L 480,380 L 520,550 L 280,550 Z"
                fill="url(#carpetGrad)"
              />

              {/* Character sprite standing from behind */}
              <g transform="translate(400, 410)">
                {/* Hair */}
                <ellipse cx="0" cy="-62" rx="14" ry="12" fill="#3a2512" />
                {/* Hoodie body */}
                <path
                  d="M -16,-20 L 16,-20 L 22,30 L -22,30 Z"
                  fill="#1d2d44"
                />
                <path
                  d="M -10,-45 C -15,-45 -18,-35 -14,-20 L 14,-20 C 18,-35 15,-45 10,-45 Z"
                  fill="#101a28"
                />
                {/* Jeans */}
                <rect
                  x="-14"
                  y="30"
                  width="11"
                  height="50"
                  fill="#2d4263"
                  rx="2"
                />
                <rect
                  x="3"
                  y="30"
                  width="11"
                  height="50"
                  fill="#2d4263"
                  rx="2"
                />
                {/* Shoes */}
                <rect
                  x="-15"
                  y="80"
                  width="13"
                  height="8"
                  fill="#e0e0e0"
                  rx="2"
                />
                <rect
                  x="2"
                  y="80"
                  width="13"
                  height="8"
                  fill="#e0e0e0"
                  rx="2"
                />
                {/* Hoodie Hood lines */}
                <path
                  d="M -8,-20 C -8,-20 0,-15 8,-20"
                  fill="none"
                  stroke="#2d4263"
                  strokeWidth="3"
                />
              </g>
            </svg>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
          </div>
        </main>
      )}

      {/* ================= VIEW 2: 10 HIGH-IN-DEMAND POPULAR COURSES GRID ================= */}
      {view === "courses" && (
        <main className="max-w-6xl mx-auto px-8 py-16 animate-fadeIn flex-grow">
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-3xl font-serif text-[#faf2cc] uppercase tracking-wider">
              Select Your Path of Magic
            </h2>
            <p className="text-sm text-[#9c8669] max-w-md mx-auto">
              Click on your desired tech discipline to unlock its specific
              escape chamber segment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {COURSES.map((course) => (
              <div
                key={course.id}
                onClick={() => {
                  setSelectedCourse(course);
                  setView("game");
                }}
                className={`bg-[#120a05] border border-[#2d1e11] hover:border-[#d4af37] p-8 rounded-xl cursor-pointer group transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between aspect-square`}
              >
                <div>
                  <span className="text-stone-500 text-[10px] font-mono uppercase tracking-widest block mb-1">
                    {course.category}
                  </span>
                  <h3 className="text-lg font-serif font-black text-[#faf2cc] group-hover:text-[#d4af37] leading-tight transition-colors">
                    {course.title}
                  </h3>
                </div>
                <div className="flex justify-between items-center mt-auto text-xs">
                  <span className="text-stone-500 font-mono">
                    Chambers: {course.rooms}
                  </span>
                  <ChevronRight className="w-4 h-4 text-stone-600 group-hover:text-[#d4af37] transition-all" />
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* ================= VIEW 3: FULL SCREEN IMMERSIVE ESCAPE GAME (CLUTTER FREE) ================= */}
      {view === "game" && (
        <main className="h-screen bg-black overflow-hidden flex flex-col justify-between animate-fadeIn select-none">
          {/* Top Escape environment view */}
          <div className="flex-1 relative bg-gradient-to-b from-[#1b1209] to-black flex items-center justify-center p-6">
            {/* INLINE CUSTOM SVG 2.5D ROOM VIEW matching 5962838090574326606.jpeg exactly */}
            <svg
              viewBox="0 0 1000 550"
              className="w-full max-w-5xl h-full rounded-2xl border-2 border-[#4d341a] shadow-2xl overflow-hidden bg-[#0a0704]"
            >
              {/* Gradients */}
              <defs>
                <linearGradient
                  id="suiteWallGrad"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#25160c" />
                  <stop offset="100%" stopColor="#080503" />
                </linearGradient>
                <linearGradient id="deskGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3d2613" />
                  <stop offset="100%" stopColor="#1a0f07" />
                </linearGradient>
                <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(253, 213, 189, 0.45)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </radialGradient>
              </defs>

              {/* Room Structure */}
              <rect width="1000" height="550" fill="url(#suiteWallGrad)" />
              {/* Floor Panel */}
              <path
                d="M 0,400 L 1000,400 L 1000,550 L 0,550 Z"
                fill="#0c0704"
              />
              <path
                d="M 120,400 L 0,550 M 350,400 L 150,550 M 650,400 L 850,550 M 880,400 L 1000,550"
                stroke="#1d120a"
                strokeWidth="2"
              />
              <line
                x1="0"
                y1="440"
                x2="1000"
                y2="440"
                stroke="#1d120a"
                strokeWidth="2"
              />
              <line
                x1="0"
                y1="490"
                x2="1000"
                y2="490"
                stroke="#1d120a"
                strokeWidth="2"
              />

              {/* Ambient lighting rays from chandelier */}
              <path
                d="M 400,0 L 450,0 L 600,400 L 300,400 Z"
                fill="rgba(212,175,55,0.04)"
              />

              {/* Grand staircase representation centered in backdrop */}
              <path
                d="M 440,150 L 560,150 L 620,400 L 380,400 Z"
                fill="#140d08"
                stroke="#25160c"
              />
              {Array.from({ length: 10 }).map((_, i) => (
                <line
                  key={i}
                  x1={440 - i * 6}
                  y1={150 + i * 25}
                  x2={560 + i * 6}
                  y2={150 + i * 25}
                  stroke="#25160c"
                  strokeWidth="2"
                />
              ))}
              <path
                d="M 480,150 L 520,150 L 540,400 L 460,400 Z"
                fill="#4a0e0e"
              />

              {/* ================= LEFT SIDE: THE LIBRARY STUDY DESK ================= */}
              {room === 1 && (
                <g>
                  {/* Glowing Wall Sconce above table */}
                  <circle
                    cx="150"
                    cy="180"
                    r="15"
                    fill="#fdd5bd"
                    opacity="0.3"
                    className="animate-pulse"
                  />
                  <path d="M 145,185 L 155,185 L 150,210 Z" fill="#d4af37" />

                  {/* Desk */}
                  <path
                    d="M 60,320 L 240,320 L 260,390 L 40,390 Z"
                    fill="url(#deskGrad)"
                    stroke="#4d341a"
                    strokeWidth="2"
                  />
                  {/* Desk Legs */}
                  <rect x="60" y="390" width="12" height="60" fill="#1a0f07" />
                  <rect x="230" y="390" width="12" height="60" fill="#1a0f07" />

                  {/* Table Lamp */}
                  <path d="M 80,320 L 95,280 L 110,320 Z" fill="#8c1c1c" />
                  <rect x="92" y="320" width="6" height="20" fill="#d4af37" />
                  {/* Lamp glow */}
                  <circle
                    cx="95"
                    cy="275"
                    r="50"
                    fill="url(#lampGlow)"
                    className="pointer-events-none"
                  />

                  {/* Porcelain Vase */}
                  <path
                    d="M 210,320 Q 195,290 210,270 Q 220,290 210,320"
                    fill="#f0ebd5"
                    stroke="#1d2d44"
                    strokeWidth="1.5"
                  />

                  {/* The Vintage Newspaper (Clickable Puzzle Trigger) */}
                  <g
                    onClick={() => {
                      setActivePuzzle("newspaper");
                      setFeedback("");
                    }}
                    className="cursor-pointer group"
                  >
                    <path
                      d="M 120,335 L 180,335 L 195,370 L 135,370 Z"
                      fill="#fcf9f2"
                      stroke="#25160c"
                      strokeWidth="1.5"
                    />
                    {/* Newspaper contents lines */}
                    <line
                      x1="130"
                      y1="345"
                      x2="170"
                      y2="345"
                      stroke="#555"
                      strokeWidth="3"
                    />
                    <line
                      x1="130"
                      y1="352"
                      x2="180"
                      y2="352"
                      stroke="#777"
                      strokeWidth="1"
                    />
                    <line
                      x1="130"
                      y1="358"
                      x2="185"
                      y2="358"
                      stroke="#777"
                      strokeWidth="1"
                    />
                    <line
                      x1="130"
                      y1="364"
                      x2="165"
                      y2="364"
                      stroke="#777"
                      strokeWidth="1"
                    />

                    {/* Dynamic Header render if solved */}
                    {solvedObjects.includes("newspaper") ? (
                      <g>
                        {/* Live Header Text representation */}
                        <rect
                          x="130"
                          y="342"
                          width="45"
                          height="5"
                          fill="#1a150e"
                        />
                        {/* Brass Key spawn floating above solved paper */}
                        <g
                          transform="translate(155, 230)"
                          className="animate-bounce"
                        >
                          <circle
                            cx="10"
                            cy="10"
                            r="8"
                            fill="none"
                            stroke="#d4af37"
                            strokeWidth="3"
                          />
                          <line
                            x1="10"
                            y1="18"
                            x2="10"
                            y2="40"
                            stroke="#d4af37"
                            strokeWidth="3.5"
                          />
                          <line
                            x1="10"
                            y1="30"
                            x2="18"
                            y2="30"
                            stroke="#d4af37"
                            strokeWidth="3"
                          />
                          <line
                            x1="10"
                            y1="37"
                            x2="18"
                            y2="37"
                            stroke="#d4af37"
                            strokeWidth="3"
                          />
                        </g>
                      </g>
                    ) : (
                      // Unsolved outline highlights
                      <path
                        d="M 120,335 L 180,335 L 195,370 L 135,370 Z"
                        fill="none"
                        stroke="#d4af37"
                        strokeWidth="2.5"
                        className="animate-pulse"
                      />
                    )}
                  </g>
                </g>
              )}

              {/* ================= RIGHT SIDE: THE GILDED PICTURE FRAME ================= */}
              {room === 2 && (
                <g>
                  {/* Huge Classical Gilded Wood frame representing screenshots */}
                  <g
                    onClick={() => {
                      setActivePuzzle("portrait");
                      setFeedback("");
                    }}
                    className="cursor-pointer"
                  >
                    {/* Outer Gilded Carvings */}
                    <rect
                      x="700"
                      y="100"
                      width="180"
                      height="250"
                      fill="none"
                      stroke="#d4af37"
                      strokeWidth="10"
                      rx="4"
                    />
                    <rect
                      x="710"
                      y="110"
                      width="160"
                      height="230"
                      fill="none"
                      stroke="#806018"
                      strokeWidth="4"
                    />
                    {/* Canvas Inner */}
                    <rect
                      x="718"
                      y="118"
                      width="144"
                      height="214"
                      fill="#150f0b"
                    />

                    {/* Render visual image contents once solved */}
                    {solvedObjects.includes("portrait") ? (
                      <g>
                        {/* Illustrated landscape scenery */}
                        <rect
                          x="718"
                          y="118"
                          width="144"
                          height="214"
                          fill="#2d4263"
                        />
                        <circle cx="790" cy="180" r="30" fill="#fdd5bd" />
                        <path
                          d="M 718,280 L 760,220 L 800,270 L 862,200 L 862,332 L 718,332 Z"
                          fill="#1d2d44"
                        />
                      </g>
                    ) : (
                      // Unsolved blinking warning
                      <g className="animate-pulse">
                        <rect
                          x="718"
                          y="118"
                          width="144"
                          height="214"
                          fill="none"
                          stroke="#d4af37"
                          strokeWidth="2"
                        />
                        <text
                          x="790"
                          y="230"
                          fill="#d4af37"
                          fontSize="12"
                          textAnchor="middle"
                          fontFamily="sans-serif"
                          letterSpacing="1"
                        >
                          EMPTY CANVAS
                        </text>
                      </g>
                    )}
                  </g>
                </g>
              )}

              {/* ================= CONTROLLABLE PLAYER AVATAR ================= */}
              <g
                transform={`translate(${playerPos.x}, ${playerPos.y})`}
                className="transition-all duration-300"
              >
                {/* Silhouette matching 5962838090574326606.jpeg exactly */}
                <ellipse cx="0" cy="-62" rx="14" ry="12" fill="#3a2512" />
                <path
                  d="M -16,-20 L 16,-20 L 22,30 L -22,30 Z"
                  fill="#1d2d44"
                />
                <path
                  d="M -10,-45 C -15,-45 -18,-35 -14,-20 L 14,-20 C 18,-35 15,-45 10,-45 Z"
                  fill="#101a28"
                />
                <rect
                  x="-14"
                  y="30"
                  width="11"
                  height="50"
                  fill="#2d4263"
                  rx="2"
                />
                <rect
                  x="3"
                  y="30"
                  width="11"
                  height="50"
                  fill="#2d4263"
                  rx="2"
                />
                <rect
                  x="-15"
                  y="80"
                  width="13"
                  height="8"
                  fill="#e0e0e0"
                  rx="2"
                />
                <rect
                  x="2"
                  y="80"
                  width="13"
                  height="8"
                  fill="#e0e0e0"
                  rx="2"
                />
                <path
                  d="M -8,-20 C -8,-20 0,-15 8,-20"
                  fill="none"
                  stroke="#2d4263"
                  strokeWidth="3"
                />
              </g>
            </svg>

            {/* ================= SCREENPUZZLE CODE OVERLAYS (MATCHING SCENARIOS EXACTLY) ================= */}
            {activePuzzle === "newspaper" && (
              <div className="absolute top-1/4 left-1/3 bg-[#120a05]/95 border-2 border-[#d4af37] p-4 rounded-xl shadow-2xl max-w-xs animate-slideDown z-20">
                <div className="flex justify-between items-center border-b border-[#4d341a] pb-2 mb-3">
                  <span className="text-xs font-mono text-[#d4af37]">
                    &lt;h1&gt; Newspaper Title: &lt;/h1&gt;
                  </span>
                  <button
                    onClick={() => setActivePuzzle(null)}
                    className="text-stone-500 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  autoFocus
                  placeholder="<h1> An accident on midnight </h1>"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && verifyPuzzle()}
                  className="w-full bg-black border border-stone-800 p-2.5 rounded text-sm text-amber-200 font-mono focus:border-[#d4af37] outline-none"
                />
                <div className="flex justify-between items-center mt-3">
                  <span className="text-[10px] text-stone-500 italic">
                    Press enter key to cast
                  </span>
                  <button
                    onClick={verifyPuzzle}
                    className="bg-[#d4af37] text-black font-bold text-xs py-1 px-3 rounded"
                  >
                    Cast
                  </button>
                </div>
              </div>
            )}

            {activePuzzle === "portrait" && (
              <div className="absolute top-1/4 right-1/4 bg-[#120a05]/95 border-2 border-[#d4af37] p-4 rounded-xl shadow-2xl max-w-sm animate-slideDown z-20">
                <div className="flex justify-between items-center border-b border-[#4d341a] pb-2 mb-3">
                  <div className="text-left">
                    <span className="text-stone-500 text-[10px] uppercase block">
                      Image Source Name
                    </span>
                    <span className="text-xs font-mono text-[#faf2cc] font-bold">
                      'landscape.png'
                    </span>
                  </div>
                  <button
                    onClick={() => setActivePuzzle(null)}
                    className="text-stone-500 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  autoFocus
                  placeholder='<img src="landscape.png" alt="A beautiful landscape">'
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && verifyPuzzle()}
                  className="w-full bg-black border border-stone-800 p-2.5 rounded text-sm text-amber-200 font-mono focus:border-[#d4af37] outline-none"
                />
                <div className="flex justify-between items-center mt-3">
                  <span className="text-[10px] text-stone-500 italic">
                    Press enter key to projection render
                  </span>
                  <button
                    onClick={verifyPuzzle}
                    className="bg-[#d4af37] text-black font-bold text-xs py-1 px-3 rounded"
                  >
                    Render
                  </button>
                </div>
              </div>
            )}

            {/* FLOATING INSTRUCTION PARCHMENT EASAL */}
            {showNote && (
              <div className="absolute left-8 top-8 max-w-xs bg-[#f4ecd8] text-stone-900 p-6 rounded-md shadow-2xl border-l-4 border-amber-800 font-serif leading-relaxed animate-fadeIn z-20">
                <div className="flex justify-between items-center border-b border-amber-900/10 pb-2 mb-3">
                  <h4 className="text-sm font-bold tracking-wide uppercase">
                    📖 Ancient Guidance Scroll
                  </h4>
                  <button
                    onClick={() => setShowNote(false)}
                    className="text-stone-500 hover:text-black"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {room === 1 ? (
                  <div className="text-xs space-y-2">
                    <p>
                      To patch headings onto missing text blocks, invoke the{" "}
                      <strong>Header 1 Tag</strong>.
                    </p>
                    <p className="bg-amber-950/5 p-2 font-mono text-[10px] text-amber-950 rounded">
                      Syntax layout:
                      <br />
                      <strong>&lt;h1&gt; Newspaper Title &lt;/h1&gt;</strong>
                    </p>
                    <p>
                      Use WASD keys to walk up to the newspaper desk and click
                      to fix the title!
                    </p>
                  </div>
                ) : (
                  <div className="text-xs space-y-2">
                    <p>
                      To projects illustrations onto physical canvases, call the
                      standalone <strong>Image Element</strong>.
                    </p>
                    <p className="bg-amber-950/5 p-2 font-mono text-[10px] text-amber-950 rounded">
                      Syntax layout:
                      <br />
                      <strong>&lt;img src="landscape.png"&gt;</strong>
                    </p>
                    <p>
                      Click on the empty gilded picture portrait to render the
                      visual projection!
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* MINIMIZED INSTRUCTION FLOATING SCROLL ACTOR */}
            {!showNote && (
              <button
                onClick={() => setShowNote(true)}
                className="absolute left-8 top-8 p-3.5 bg-amber-600 text-black rounded-full hover:scale-105 transition-all shadow-xl animate-pulse z-20"
              >
                <FileText className="w-5 h-5" />
              </button>
            )}

            {/* ACTION TRIGGERS TO MOVE TO ROOM 2 OR COMPLETED STATE */}
            {solvedObjects.includes("newspaper") && room === 1 && (
              <button
                onClick={() => {
                  setRoom(2);
                  setSolvedObjects([]);
                  setFeedback("");
                  setShowNote(true);
                }}
                className="absolute right-12 bottom-12 bg-gradient-to-r from-[#d4af37] to-[#806018] text-black font-black uppercase tracking-widest px-8 py-4 rounded-xl shadow-2xl animate-bounce z-20"
              >
                Go to Room 2 door &rarr;
              </button>
            )}

            {solvedObjects.includes("portrait") && room === 2 && (
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#120a05]/95 border-2 border-emerald-500 p-8 rounded-2xl text-center max-w-sm shadow-2xl z-20">
                <span className="text-4xl block mb-2">✨🏆✨</span>
                <h4 className="text-lg font-serif font-black text-emerald-400 uppercase tracking-widest">
                  Chamber Escaped!
                </h4>
                <p className="text-xs text-[#9c8669] leading-relaxed mt-2">
                  You successfully completed your first course segment, earning
                  gems and key fragments!
                </p>
                <button
                  onClick={quitToHub}
                  className="mt-6 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-lg text-xs uppercase tracking-widest transition-all"
                >
                  Return to Dashboard
                </button>
              </div>
            )}
          </div>

          {/* Clean HUD Controllers (No extra sidebar dashboard widgets) */}
          <div className="h-56 bg-[#0c0805] border-t border-[#2e1d0d] flex divide-x divide-stone-900">
            {/* Left System Info */}
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <h4 className="text-xs uppercase font-mono tracking-widest text-[#d4af37]">
                  Interactive Spellbook Room
                </h4>
                <p className="text-xs text-[#9c8669] mt-1 leading-relaxed">
                  Use WASD keyboard buttons to walk your character sprite. Touch
                  the glowing objects in the castle to inspect and render spells
                  inside the room!
                </p>
              </div>
              {feedback && (
                <div className="text-xs font-mono text-amber-500 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                  {feedback}
                </div>
              )}
            </div>

            {/* Center Movement controllers representing visual pad */}
            <div className="w-64 p-6 flex flex-col items-center justify-center gap-2">
              <div className="grid grid-cols-3 gap-1">
                <div></div>
                <button
                  onClick={() => handleMove("W")}
                  className="w-9 h-9 bg-[#1c1209] border border-[#4d341a] rounded flex items-center justify-center font-mono font-bold text-xs text-[#d4af37] active:bg-[#342211]"
                >
                  W
                </button>
                <div></div>
                <button
                  onClick={() => handleMove("A")}
                  className="w-9 h-9 bg-[#1c1209] border border-[#4d341a] rounded flex items-center justify-center font-mono font-bold text-xs text-[#d4af37] active:bg-[#342211]"
                >
                  A
                </button>
                <button
                  onClick={() => handleMove("S")}
                  className="w-9 h-9 bg-[#1c1209] border border-[#4d341a] rounded flex items-center justify-center font-mono font-bold text-xs text-[#d4af37] active:bg-[#342211]"
                >
                  S
                </button>
                <button
                  onClick={() => handleMove("D")}
                  className="w-9 h-9 bg-[#1c1209] border border-[#4d341a] rounded flex items-center justify-center font-mono font-bold text-xs text-[#d4af37] active:bg-[#342211]"
                >
                  D
                </button>
              </div>
              <span className="text-[10px] text-stone-600 uppercase tracking-widest font-bold mt-1">
                WASD Movement
              </span>
            </div>

            {/* Right system triggers */}
            <div className="w-48 flex flex-col divide-y divide-stone-900">
              <button
                onClick={quitToHub}
                className="flex-1 hover:bg-[#251010]/20 transition-colors flex items-center justify-center text-red-500/80 text-[11px] uppercase font-bold tracking-widest"
              >
                Quit Course
              </button>
              <button
                onClick={() => setView("courses")}
                className="flex-1 hover:bg-amber-950/10 transition-colors flex items-center justify-center text-[#d4af37]/80 text-[11px] uppercase font-bold tracking-widest"
              >
                Course Catalog
              </button>
            </div>
          </div>
        </main>
      )}

      {/* Footer copyright */}
      <footer className="py-6 border-t border-[#120a05] text-center text-[10px] text-stone-700 uppercase tracking-[0.3em]">
        &copy; 2026 Ascendia Educational Game Systems. All magic is coded.
      </footer>
    </div>
  );
}
