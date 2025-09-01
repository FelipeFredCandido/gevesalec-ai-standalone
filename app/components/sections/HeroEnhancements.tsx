'use client'

import { useEffect } from 'react'

export default function HeroEnhancements() {
  useEffect(() => {
    const progressBars = document.querySelectorAll<HTMLElement>('.progress-bar')
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement
            element.style.transition = 'width 1.5s ease-out'
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )

    progressBars.forEach((bar) => observer.observe(bar))

    return () => observer.disconnect()
  }, [])

  return null
}