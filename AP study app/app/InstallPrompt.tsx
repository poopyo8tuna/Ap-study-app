"use client"

import { useState, useEffect } from "react"

export default function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches

    if (isIOS && !isStandalone) {
      setShowPrompt(true)
    }
  }, [])

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-yellow-100 p-4 text-center">
      <p>
        Install this app on your iPhone: tap
        <svg className="inline-block w-4 h-4 mx-1" viewBox="0 0 120 169">
          <path d="M60 0l28 28-2 2a586 586 0 0 0-4 4L64 52v23h-8V52L38 34l-6-6 28-28z" />
          <path d="M60 169c-18 0-35-6-48-19-12-12-19-29-19-48V97h34v5c0 9 3 17 9 23 6 6 14 9 23 9 9 0 17-3 23-9 6-6 9-14 9-23v-5h34v5c0 19-7 36-19 48-13 13-30 19-48 19h2-2z" />
        </svg>
        then "Add to Home Screen"
      </p>
    </div>
  )
}

