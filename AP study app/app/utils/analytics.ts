export function trackEvent(eventName: string, eventData: any) {
  // In a real application, you would send this data to your analytics service
  console.log("Analytics event:", eventName, eventData)
  // For now, we'll just store it in localStorage
  const events = JSON.parse(localStorage.getItem("analytics") || "[]")
  events.push({ name: eventName, data: eventData, timestamp: new Date().toISOString() })
  localStorage.setItem("analytics", JSON.stringify(events))
}

