"use client"

import { useState, useEffect } from "react"

interface QuestionProps {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  onAnswered: (isCorrect: boolean) => void
  questionNumber: number
}

export default function Question({
  question,
  options,
  correctAnswer,
  explanation,
  onAnswered,
  questionNumber,
}: QuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [answered, setAnswered] = useState(false)

  useEffect(() => {
    setSelectedAnswer(null)
    setShowExplanation(false)
    setAnswered(false)
  }, [])

  const handleAnswer = (index: number) => {
    if (!answered) {
      setSelectedAnswer(index)
    }
  }

  const handleSubmit = () => {
    if (selectedAnswer !== null && !answered) {
      setAnswered(true)
      setShowExplanation(true)
    }
  }

  const handleNext = () => {
    if (answered) {
      onAnswered(selectedAnswer === correctAnswer)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto backdrop-blur-xl bg-white/10 dark:bg-gray-800/10 p-4 sm:p-8 rounded-3xl shadow-lg">
      <div className="space-y-6 sm:space-y-8">
        <h2 className="text-xl sm:text-2xl font-medium text-gray-900 dark:text-white">{question}</h2>
        <div className="space-y-2 sm:space-y-3">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={answered}
              className={`w-full text-left p-3 sm:p-4 rounded-xl sm:rounded-2xl text-base sm:text-lg transition-all
                ${
                  !answered
                    ? selectedAnswer === index
                      ? "bg-blue-500/20 dark:bg-blue-500/30 text-blue-700 dark:text-blue-300"
                      : "bg-white/50 dark:bg-gray-800/50 hover:bg-white/70 dark:hover:bg-gray-700/70"
                    : selectedAnswer === index
                      ? index === correctAnswer
                        ? "bg-green-500/20 dark:bg-green-500/30 text-green-700 dark:text-green-300"
                        : "bg-red-500/20 dark:bg-red-500/30 text-red-700 dark:text-red-300"
                      : index === correctAnswer
                        ? "bg-green-500/20 dark:bg-green-500/30 text-green-700 dark:text-green-300"
                        : "bg-white/50 dark:bg-gray-800/50"
                }
                ${answered ? "cursor-default" : "cursor-pointer"}
              `}
            >
              {option}
            </button>
          ))}
        </div>
        {selectedAnswer !== null && !answered && (
          <button
            onClick={handleSubmit}
            className="w-full py-3 sm:py-4 px-4 sm:px-6 bg-blue-500 text-white rounded-xl sm:rounded-2xl hover:bg-blue-600 transition-colors text-base sm:text-lg font-medium"
          >
            Submit Answer
          </button>
        )}
        {showExplanation && (
          <div className="space-y-4">
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-blue-500/10 dark:bg-blue-500/20">
              <p className="text-blue-900 dark:text-blue-100 text-sm sm:text-base">{explanation}</p>
            </div>
            <button
              onClick={handleNext}
              className="w-full py-3 sm:py-4 px-4 sm:px-6 bg-blue-500 text-white rounded-xl sm:rounded-2xl hover:bg-blue-600 transition-colors text-base sm:text-lg font-medium"
            >
              Next Question
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

