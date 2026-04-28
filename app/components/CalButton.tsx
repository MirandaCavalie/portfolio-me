'use client'

import { getCalApi } from '@calcom/embed-react'
import { useEffect } from 'react'

export function CalButton() {
  useEffect(() => {
    ;(async () => {
      const cal = await getCalApi({ namespace: '15min' })
      cal('ui', {
        hideEventTypeDetails: false,
        layout: 'month_view',
      })
    })()
  }, [])

  return (
    <button
      data-cal-namespace="15min"
      data-cal-link="miranda-cavalie-oye0qu/15min"
      data-cal-config='{"layout":"month_view"}'
      className="font-mono text-sm border border-black px-5 py-2.5 text-black bg-white hover:bg-black hover:text-white transition-colors duration-150 cursor-pointer"
    >
      Book a chat →
    </button>
  )
}
