"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { saveProgress, getProgress } from "../../utils/storage"
import { trackEvent } from "../../utils/analytics"
import Question from "../../components/Question"
import { apBiologyQuestions } from "../../data/apBiologyQuestions"

export default function QuickPracticePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [incorrectAnswers, setIncorrectAnswers] = useState(0)
  const [questions] = useState(() => apBiologyQuestions.sort(() => 0.5 - Math.random()).slice(0, 20))
  const [quizComplete, setQuizComplete] = useState(false)

  useEffect(() => {
    const storedProgress = getProgress("biology", "quick-practice")
    const storedCorrect = getProgress("biology", "quick-practice-correct") || 0
    const storedIncorrect = getProgress("biology", "quick-practice-incorrect") || 0
    setCurrentQuestionIndex(Math.min(storedProgress, 19))
    setCorrectAnswers(storedCorrect)
    setIncorrectAnswers(storedIncorrect)
    if (storedProgress >= 20) setQuizComplete(true)
  }, [])

  const handleAnswered = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1)
      saveProgress("biology", "quick-practice-correct", correctAnswers + 1)
    } else {
      setIncorrectAnswers((prev) => prev + 1)
      saveProgress("biology", "quick-practice-incorrect", incorrectAnswers + 1)
    }

    if (currentQuestionIndex < 19) {
      setCurrentQuestionIndex((prev) => prev + 1)
      saveProgress("biology", "quick-practice", currentQuestionIndex + 1)
    } else {
      setQuizComplete(true)
    }

    trackEvent("question_answered", {
      subject: "biology",
      mode: "quick-practice",
      questionIndex: currentQuestionIndex,
      isCorrect,
    })
  }

  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    setCorrectAnswers(0)
    setIncorrectAnswers(0)
    setQuizComplete(false)
    saveProgress("biology", "quick-practice", 0)
    saveProgress("biology", "quick-practice-correct", 0)
    saveProgress("biology", "quick-practice-incorrect", 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link
            href="/biology"
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-6 h-6 mr-2" />
            Back
          </Link>
        </div>
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">AP Biology Practice</h1>
          {!quizComplete && (
            <div className="flex items-center justify-between">
              <div className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                Question {currentQuestionIndex + 1} of 20
              </div>
              <div className="flex space-x-4">
                <span className="text-green-600 dark:text-green-400">Correct: {correctAnswers}</span>
                <span className="text-red-600 dark:text-red-400">Incorrect: {incorrectAnswers}</span>
              </div>
            </div>
          )}
        </div>

        {!quizComplete ? (
          <Question
            key={currentQuestionIndex}
            {...questions[currentQuestionIndex]}
            onAnswered={handleAnswered}
            questionNumber={currentQuestionIndex}
          />
        ) : (
          <div className="backdrop-blur-xl bg-white/10 dark:bg-gray-800/10 p-6 sm:p-8 rounded-3xl shadow-lg text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">Quiz Complete!</h2>
            <div className="space-y-4 mb-8">
              <p className="text-xl sm:text-2xl">
                Score:{" "}
                <span className="text-green-600 dark:text-green-400">{Math.round((correctAnswers / 20) * 100)}%</span>
              </p>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
                Correct Answers: <span className="text-green-600 dark:text-green-400">{correctAnswers}</span>
              </p>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
                Incorrect Answers: <span className="text-red-600 dark:text-red-400">{incorrectAnswers}</span>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={restartQuiz}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
              >
                Try Again
              </button>
              <Link
                href="/biology"
                className="px-6 py-3 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Back to Menu
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

