import { useCallback, useEffect, useRef } from 'react'

function useInterval(callback = () => {}, delay = 1000) {
  const cb = useRef(callback)
  const interval = useRef(null)

  const _log = useCallback((...messages) => {
    const LOGS_ENABLED = false
    if (process.env.NODE_ENV === 'production' || !LOGS_ENABLED) return
    console.info('[useInterval]', ...messages)
  }, [])

  const resetInterval = useCallback(() => {
    _log('resetInterval')
    if (!interval) return
    if (interval.current) clearInterval(interval.current)
    cb.current = callback
    interval.current = setInterval(() => {
      _log('callback called')
      cb.current()
    }, delay)
  }, [delay, callback, _log])

  useEffect(() => {
    _log('init')
    resetInterval()
    return () => {
      _log('destruct')
      if (interval.current) clearInterval(interval.current)
    }
  }, [resetInterval])

  useEffect(() => {
    _log('update callback')
    cb.current = callback
  }, [callback, _log])

  useEffect(() => {
    _log('update interval time')
    resetInterval()
  }, [delay, resetInterval])

  return [resetInterval]
}

export default useInterval
