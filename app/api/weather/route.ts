import { NextResponse } from 'next/server'

const WMO_EMOJI: Record<number, string> = {
  0: '☀️',
  1: '🌤️', 2: '⛅', 3: '☁️',
  45: '🌫️', 48: '🌫️',
  51: '🌦️', 53: '🌦️', 55: '🌧️',
  61: '🌧️', 63: '🌧️', 65: '🌧️',
  71: '🌨️', 73: '🌨️', 75: '❄️',
  80: '🌦️', 81: '🌦️', 82: '🌧️',
  95: '⛈️', 96: '⛈️', 99: '⛈️',
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export async function GET() {
  try {
    const url =
      'https://api.open-meteo.com/v1/forecast' +
      '?latitude=37.7749&longitude=-122.4194' +
      '&daily=temperature_2m_max,temperature_2m_min,weathercode' +
      '&temperature_unit=fahrenheit' +
      '&timezone=America%2FLos_Angeles' +
      '&forecast_days=7'

    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) throw new Error('open-meteo error')
    const data = await res.json()

    const forecast = (data.daily.time as string[]).map((date, i) => ({
      date,
      day: i === 0 ? 'Today' : DAY_NAMES[new Date(date + 'T12:00:00').getDay()],
      high: Math.round(data.daily.temperature_2m_max[i]),
      low: Math.round(data.daily.temperature_2m_min[i]),
      emoji: WMO_EMOJI[data.daily.weathercode[i] as number] ?? '🌡️',
    }))

    return NextResponse.json({ forecast })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch weather' }, { status: 500 })
  }
}
