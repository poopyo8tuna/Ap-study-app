export function saveProgress(subject: string, mode: string, progress: number) {
  localStorage.setItem(`${subject}-${mode}-progress`, progress.toString())
}

export function getProgress(subject: string, mode: string): number {
  const progress = localStorage.getItem(`${subject}-${mode}-progress`)
  return progress ? Number.parseInt(progress, 10) : 0
}

export function saveQuestions(subject: string, questions: any[]) {
  localStorage.setItem(`${subject}-questions`, JSON.stringify(questions))
}

export function getQuestions(subject: string): any[] {
  const questions = localStorage.getItem(`${subject}-questions`)
  return questions ? JSON.parse(questions) : []
}

