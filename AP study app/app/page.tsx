import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="text-center space-y-8">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white">AP Study</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/biology"
            className="px-8 py-4 backdrop-blur-xl bg-blue-500/90 text-white rounded-2xl hover:bg-blue-600/90 transition-colors text-lg font-medium"
          >
            AP Biology
          </Link>
          <Link
            href="/world-history"
            className="px-8 py-4 backdrop-blur-xl bg-green-500/90 text-white rounded-2xl hover:bg-green-600/90 transition-colors text-lg font-medium"
          >
            AP World History
          </Link>
        </div>
      </div>
    </main>
  )
}

