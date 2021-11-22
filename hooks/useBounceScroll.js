import { useState, useRef, useEffect } from 'react'

const useBounceScroll = ({ callback, wait, preventDefault = false }) => {
  const [scrolling, setScrolling] = useState({ x: 0, y: 0 })
  const cb = useRef(callback)
  const waiting = useRef(false)

  const _log = (message) => {
    const isDev =
      !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    if (isDev) console.info(`[useBounceScroll] ${message}`)
  }

  useEffect(() => {
    const { x, y } = scrolling

    if (waiting.current || (!x && !y)) {
      _log('is waiting')
      waiting.current = false
      return
    }

    _log('set waiting')
    waiting.current = true

    const timeout = setTimeout(() => {
      _log('cb')
      setScrolling({ x: 0, y: 0 })
      waiting.current = false
      cb.current({ x: scrolling.x, y: scrolling.y })
      clearTimeout(timeout)
    }, wait)

    return () => {
      clearTimeout(timeout)
    }
  }, [scrolling.x, scrolling.y, wait])

  useEffect(() => {
    const onScroll = (event) => {
      if (preventDefault) event.preventDefault()
      if (!waiting.current) setScrolling({ x: event.deltaX, y: event.deltaY })
    }

    window.addEventListener('wheel', onScroll, { passive: false })

    return () => {
      window.removeEventListener('wheel', onScroll)
    }
  }, [preventDefault])

  return [scrolling]
}

export default useBounceScroll
