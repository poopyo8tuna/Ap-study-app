import Link from "next/link"

export default function WorldHistoryPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8 text-primary">AP World History</h1>
      <Link
        href="/world-history/quick-practice"
        className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 text-lg font-semibold"
      >
        Quick Practice
      </Link>
      <Link href="/" className="mt-8 text-green-500 hover:underline text-lg">
        Back to Home
      </Link>
    </main>
  )
}

