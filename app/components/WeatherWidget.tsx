'use client'
import { useState, useEffect } from 'react'

interface DayForecast {
  date: string
  day: string
  high: number
  low: number
  emoji: string
}

export default function WeatherWidget() {
  const [forecast, setForecast] = useState<DayForecast[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/api/weather')
      .then((r) => r.json())
      .then((data) => {
        if (data.forecast) setForecast(data.forecast)
        else setError(true)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  if (error) return null

  return (
    <section className="pt-16 pb-16 border-b border-gray-100">
      <p className="font-mono text-xs font-bold tracking-widest uppercase text-gray-400 mb-6">
        San Francisco Weather
      </p>
      {loading ? (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-[72px] h-24 bg-gray-50 animate-pulse rounded" />
          ))}
        </div>
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {forecast.map((day) => (
            <div
              key={day.date}
              className="flex-shrink-0 border border-gray-100 rounded p-3 text-center w-[72px]"
            >
              <div className="font-mono text-[10px] text-gray-400 mb-1">{day.day}</div>
              <div className="text-xl mb-2">{day.emoji}</div>
              <div className="font-mono text-xs font-bold">{day.high}°</div>
              <div className="font-mono text-[10px] text-gray-400">{day.low}°</div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
