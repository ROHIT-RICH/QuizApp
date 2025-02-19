import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const multipleChoiceQuestions = [
  {
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Mercury", "Earth", "Mars"],
    answer: "Mercury",
  },
  {
    question: "Which data structure organizes items in a First-In, First-Out (FIFO) manner?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    answer: "Queue",
  },
  {
    question: "Which of the following is primarily used for structuring web pages?",
    options: ["Python", "Java", "HTML", "C++"],
    answer: "HTML",
  },
  {
    question: "Which chemical symbol stands for Gold?",
    options: ["Au", "Gd", "Ag", "Pt"],
    answer: "Au",
  },
  {
    question: "Which of these processes is not typically involved in refining petroleum?",
    options: ["Fractional distillation", "Cracking", "Polymerization", "Filtration"],
    answer: "Filtration",
  }
];

const integerQuestions = [
  { question: "What is the value of 12 + 28?", answer: 40 },
  { question: "How many states are there in the United States?", answer: 50 },
  { question: "In which year was the Declaration of Independence signed?", answer: 1776 },
  { question: "What is the value of pi rounded to the nearest integer?", answer: 3 },
  { question: "If a car travels at 60 mph for 2 hours, how many miles does it travel?", answer: 120 }
];

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [isIntegerQuestion, setIsIntegerQuestion] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const timerRef = useRef(null);
  
  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [currentQuestion]);

  const startTimer = () => {
    setTimeLeft(30);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timerRef.current);
          handleNextQuestion();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleAnswerSelection = (option) => {
    setSelectedOption(option);
    if (!isIntegerQuestion && option === multipleChoiceQuestions[currentQuestion].answer) {
      setScore(score + 1);
      setFeedback("Correct!");
    } else {
      setFeedback("Wrong Answer!");
    }
  };

  const handleIntegerAnswer = () => {
    if (parseInt(userAnswer) === integerQuestions[currentQuestion - multipleChoiceQuestions.length].answer) {
      setScore(score + 1);
      setFeedback("Correct!");
    } else {
      setFeedback("Wrong Answer!");
    }
  };

  const handleNextQuestion = () => {
    clearInterval(timerRef.current);
    if (currentQuestion < multipleChoiceQuestions.length + integerQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setFeedback("");
      setUserAnswer("");
      setIsIntegerQuestion(currentQuestion + 1 >= multipleChoiceQuestions.length);
    } else {
      alert(`Quiz finished! Your score: ${score}/${multipleChoiceQuestions.length + integerQuestions.length}`);
    }
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Quiz App</h1>
      <p className="quiz-timer">Time Left: {timeLeft}s</p>
      {currentQuestion < multipleChoiceQuestions.length ? (
        <>
          <p className="quiz-question">{multipleChoiceQuestions[currentQuestion].question}</p>
          <div className="quiz-options">
            {multipleChoiceQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelection(option)}
                className={`quiz-option-btn ${selectedOption === option ? 'selected' : ''}`}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="quiz-question">{integerQuestions[currentQuestion - multipleChoiceQuestions.length].question}</p>
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="quiz-input"
          />
          <button onClick={handleIntegerAnswer} className="quiz-submit-btn">Submit</button>
        </>
      )}
      <button
        onClick={handleNextQuestion}
        className="quiz-next-btn"
      >
        Next
      </button>
      {feedback && <p className="quiz-feedback">{feedback}</p>}
    </div>
  );
};

export default QuizApp;
