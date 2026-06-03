import React, { useState } from "react";

const questionsData = {
  easy: [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Hyper Transfer Markup Language",
        "Home Tool Markup Language",
      ],
      answer: 0,
    },
    {
      question: "Which tag is used for a paragraph?",
      options: ["<p>", "<h1>", "<div>", "<span>"],
      answer: 0,
    },
  ],
  medium: [
    {
      question: "Which CSS property controls text size?",
      options: ["font-style", "text-size", "font-size", "text-style"],
      answer: 2,
    },
    {
      question: "Which is used to add interactivity?",
      options: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      answer: 2,
    },
  ],
  hard: [
    {
      question: "Which hook is used for state in React?",
      options: ["useFetch", "useState", "useEffect", "useData"],
      answer: 1,
    },
    {
      question: "Which method converts JSON to object?",
      options: [
        "JSON.parse()",
        "JSON.stringify()",
        "JSON.convert()",
        "JSON.toObject()",
      ],
      answer: 0,
    },
  ],
};

export default function App() {
  const [screen, setScreen] = useState("start");
  const [difficulty, setDifficulty] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);

  const questions = difficulty ? questionsData[difficulty] : [];

  const startGame = (level) => {
    setDifficulty(level);
    setScreen("quiz");
    setCurrentQ(0);
    setScore(0);
  };

  const handleAnswer = (index) => {
    if (index === questions[currentQ].answer) {
      setScore(score + 1);
    }

    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setScreen("result");
    }
  };

  const restart = () => {
    setScreen("start");
    setDifficulty(null);
    setCurrentQ(0);
    setScore(0);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(243,232,223)] text-[rgb(69,40,41)] px-4">
      <div className="w-full max-w-xl p-8 bg-[rgb(232,209,197)] rounded-2xl shadow-lg transition-all">
        {/* START SCREEN */}
        {screen === "start" && (
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold">Learning Game</h1>
            <p className="text-[rgb(87,89,91)]">
              Test your knowledge with interactive questions
            </p>

            <div className="flex flex-col gap-4 mt-6">
              <button
                onClick={() => startGame("easy")}
                className="py-3 rounded-xl bg-[rgb(69,40,41)] text-white hover:scale-105 transition"
              >
                Easy
              </button>

              <button
                onClick={() => startGame("medium")}
                className="py-3 rounded-xl bg-[rgb(87,89,91)] text-white hover:scale-105 transition"
              >
                Medium
              </button>

              <button
                onClick={() => startGame("hard")}
                className="py-3 rounded-xl bg-[#b08968] text-white hover:scale-105 transition"
              >
                Hard
              </button>
            </div>
          </div>
        )}

        {/* QUIZ SCREEN */}
        {screen === "quiz" && (
          <div>
            <div className="flex justify-between text-sm text-[rgb(87,89,91)] mb-4">
              <span>
                Question {currentQ + 1} / {questions.length}
              </span>
              <span>Score: {score}</span>
            </div>

            <h2 className="text-xl font-semibold mb-6">
              {questions[currentQ].question}
            </h2>

            <div className="space-y-3">
              {questions[currentQ].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="w-full py-3 bg-white rounded-xl hover:bg-[rgb(243,232,223)] transition"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* RESULT SCREEN */}
        {screen === "result" && (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold">Game Complete 🎉</h2>

            <p className="text-lg">
              Your Score: {score} / {questions.length}
            </p>

            <p className="text-[rgb(87,89,91)]">
              {score === questions.length
                ? "Excellent!"
                : score > questions.length / 2
                ? "Good job!"
                : "Keep practicing!"}
            </p>

            <button
              onClick={restart}
              className="px-6 py-3 bg-[rgb(69,40,41)] text-white rounded-xl hover:scale-105 transition"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
