import { useRef, useEffect } from 'react'
import { useIntersection } from 'react-use'
import { useMenuTheme } from '@/contexts/LayoutContext'

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

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        height: '100vh',
        width: '100%',
        zIndex: '-1',
        ...style,
      }}
    />
  )
}

export default ChangeThemeOnScroll
