import Link from "next/link"

export default function BiologyPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8 text-primary">AP Biology</h1>
      <Link
        href="/biology/quick-practice"
        className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 text-lg font-semibold"
      >
        Quick Practice
      </Link>
      <Link href="/" className="mt-8 text-blue-500 hover:underline text-lg">
        Back to Home
      </Link>
    </main>
  )
}

