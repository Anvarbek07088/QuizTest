import { useState } from "react";
import { questions } from "../data/QuizData";
import { CheckCircle, XCircle } from "lucide-react"; // lucide-react kutubxona uchun

const Quiz = () => {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const startQuiz = () => {
    setStarted(true);
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
    setShowAnswer(false);
  };

  const currentQuestion = questions[currentIndex];

  const handleSelect = (option) => {
    if (showAnswer) return;
    setSelected(option);
    setShowAnswer(true);
    if (option === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelected(null);
    setShowAnswer(false);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  if (!started) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-3xl font-bold mb-6">Rumen German Quiz</h1>
        <button
          onClick={startQuiz}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Boshlash
        </button>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-semibold mb-4">Test yakunlandi!</h2>
        <p className="text-xl mb-6">Natijangiz: {score} / {questions.length}</p>
        <button
          onClick={startQuiz}
          className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Qaytadan boshlash
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">
        {currentIndex + 1}. {currentQuestion.question}
      </h2>
      <ul className="space-y-2">
        {currentQuestion.options.map((option, idx) => {
          const isCorrect = option === currentQuestion.correctAnswer;
          const isSelected = option === selected;

          let style = "flex items-center justify-between border px-4 py-2 rounded cursor-pointer";
          let icon = null;

          if (showAnswer) {
            if (isCorrect) {
              style += " bg-green-100 border-green-400 ";
              icon = <CheckCircle className="text-green-600" size={20} />;
            } else if (isSelected) {
              style += " bg-red-100 border-red-400";
              icon = <XCircle className="text-red-600" size={20} />;
            } else {
              style += " hover:bg-gray-100";
            }
          } else {
            if (isSelected) {
              style += " bg-blue-100 border-blue-400 ";
              icon = <CheckCircle className="text-blue-500" size={20} />;
            } else {
              style += " hover:bg-gray-100";
            }
          }

          return (
            <li  key={idx} onClick={() => handleSelect(option)} className={style}>
              <button  >{option}</button>
              {icon}
            </li>
          );
        })}
      </ul>

      {showAnswer && (
        <div className="flex justify-between mt-6">
          <button
            onClick={handleNext}
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {currentIndex + 1 === questions.length ? "Yakunlash" : "Keyingi savol"}
          </button>
          <button
            onClick={startQuiz}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
          >
            Qaytadan boshlash
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
