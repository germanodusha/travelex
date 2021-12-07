import { useRef, useEffect } from 'react'
import { useIntersection } from 'react-use'
import { useMenuTheme } from '@/contexts/LayoutContext'

function ChangeThemeOnScroll({ theme, options = {}, style }) {
  const ref = useRef()
  const { changeTheme } = useMenuTheme()

  const intersection = useIntersection(ref, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  })

  useEffect(() => {
    if (!intersection || !intersection.isIntersecting) return
    changeTheme(theme, options)
  }, [intersection, options, theme])

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        height: '100vh',
        width: '100%',
        ...style,
      }}
    />
  )
}

export default ChangeThemeOnScroll
