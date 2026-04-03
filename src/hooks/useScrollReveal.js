import { useEffect, useRef, useState } from 'react'

export function useScrollReveal(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px', ...options }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, isVisible]
}

export function useScrollRevealGroup(count, options = {}) {
  const refs = Array.from({ length: count }, () => useRef(null))
  const [visible, setVisible] = useState(Array(count).fill(false))

  useEffect(() => {
    const observers = refs.map((ref, i) => {
      if (!ref.current) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(prev => { const next = [...prev]; next[i] = true; return next })
            observer.unobserve(entry.target)
          }
        },
        { threshold: 0.08, ...options }
      )
      observer.observe(ref.current)
      return observer
    })
    return () => observers.forEach(obs => obs?.disconnect())
  }, [])

  return [refs, visible]
}
