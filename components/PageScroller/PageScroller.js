import {
  forwardRef,
  useRef,
  useEffect,
  useState,
  useImperativeHandle,
} from 'react'
import classNames from 'classnames'
import { Parallax } from '@react-spring/parallax'
import useIsMobile from '@/hooks/useIsMobile'
import styles from './PageScroller.module.scss'

const PageScroller = (
  { children, className = '', pages = undefined, onPageChange = undefined },
  ref
) => {
  const scroller = useRef(null)
  const isMobile = useIsMobile()
  const [currentPage, setCurrentPage] = useState(0)

  const toPrevPage = () => setCurrentPage((v) => v - 1)

  const toNextPage = () => setCurrentPage((v) => v + 1)

  useImperativeHandle(ref, () => ({
    scrollTo: (page) => setCurrentPage(page),
    toPrevPage,
    toNextPage,
  }))

  useEffect(() => {
    if (currentPage > pages) {
      setCurrentPage(pages - 1)
      return
    }
    if (currentPage < 0) {
      setCurrentPage(0)
      return
    }

    scroller.current.scrollTo(currentPage)
    if (typeof onPageChange === 'function') onPageChange(currentPage)
  }, [pages, currentPage, onPageChange])

  useEffect(() => {
    const onKeydown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault()
          return toPrevPage()
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault()
          return toNextPage()
        default:
          return null
      }
    }

    const onScroll = (event) => {
      if (isMobile) return

      event.preventDefault()

      const scrollSize = event.deltaY + event.deltaX
      if (scrollSize > 0) return toNextPage()
      if (scrollSize < 0) return toPrevPage()
    }

    window.addEventListener('wheel', onScroll, { passive: false })
    window.addEventListener('keydown', onKeydown, { passive: false })

    return () => {
      window.removeEventListener('wheel', onScroll, { passive: false })
      window.removeEventListener('keydown', onKeydown, { passive: false })
    }
  }, [isMobile])

  return (
    <Parallax
      ref={scroller}
      pages={pages}
      className={classNames(styles['scroller'], className)}
    >
      {children}
    </Parallax>
  )
}

export default forwardRef(PageScroller)
