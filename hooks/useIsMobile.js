import { useState, useEffect } from 'react'

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // const onResize = () => setIsMobile(window.innerWidth < 769)
    const onResize = () => setIsMobile(window.innerWidth < 950)
    onResize()

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return isMobile
}

export default useIsMobile
