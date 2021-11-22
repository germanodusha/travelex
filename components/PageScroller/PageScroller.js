import {
  forwardRef,
  useCallback,
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
} from 'react'
import classNames from 'classnames'
import { config as springConfig } from 'react-spring'
import { Parallax } from '@react-spring/parallax'
import { clamp } from '@/utils'
import useBounceScroll from '@/hooks/useBounceScroll'
import styles from './PageScroller.module.scss'

const PageScroller = (
  { children, className = '', pages = 1, onPageChange = undefined },
  ref
) => {
  const scroller = useRef(null)
  const [, setCurrentPage] = useState(0)

  const scrollTo = useCallback(
    (i, isRelative = false) => {
      const maxPages = pages - 1

      setCurrentPage((v) => {
        const newPage = clamp(isRelative ? v + i : i, 0, maxPages)
        scroller.current.scrollTo(newPage)
        if (typeof onPageChange === 'function') onPageChange(newPage)
        return newPage
      })
    },
    [pages, onPageChange]
  )

  useImperativeHandle(ref, () => ({ scrollTo }))

  useBounceScroll({
    callback: () => {
      const toPage = Math.round(scroller.current.current / window.innerHeight)
      scrollTo(toPage)
    },
    wait: 500,
    preventDefault: false,
  })

  useEffect(() => {
    const onKeydown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault()
          return scrollTo(-1, true)
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault()
          return scrollTo(1, true)
        default:
          return null
      }
    }

    window.addEventListener('keydown', onKeydown, { passive: false })

    return () => {
      window.removeEventListener('keydown', onKeydown)
    }
  }, [scrollTo])

  return (
    <Parallax
      ref={scroller}
      pages={pages}
      className={classNames(styles['scroller'], className)}
      config={springConfig.gentle}
    >
      {children}
    </Parallax>
  )
}

export default forwardRef(PageScroller)
