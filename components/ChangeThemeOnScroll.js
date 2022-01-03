import { useRef, useEffect, useMemo } from 'react'
import { useIntersection } from 'react-use'
import { useMenuTheme } from '@/contexts/LayoutContext'
import { randomRGBA } from '@/utils'

const DEBUG = false

function ChangeThemeOnScroll({ theme, options = {}, style }) {
  const ref = useRef()
  const { changeTheme, theme: currentTheme } = useMenuTheme()

  const intersection = useIntersection(ref, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  })

  useEffect(() => {
    if (currentTheme === theme) return
    if (!intersection || !intersection.isIntersecting) return
    changeTheme(theme, options)
  }, [intersection, options, theme, currentTheme])

  const debugColor = useMemo(randomRGBA, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        height: '100vh',
        width: '100%',
        zIndex: '-1',
        ...(DEBUG ? { backgroundColor: debugColor, zIndex: 10000 } : {}),
        ...style,
      }}
    />
  )
}

export default ChangeThemeOnScroll
