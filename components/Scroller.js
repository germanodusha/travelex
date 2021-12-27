import React, {
  useEffect,
  forwardRef,
  useImperativeHandle,
  useState,
  useMemo,
} from 'react'
import ReactPageScroller from 'react-page-scroller'
import { useMenuTheme } from '@/contexts/LayoutContext'
import useBounceScroll from '@/hooks/useBounceScroll'

// eslint-disable-next-line react/display-name
const Scroller = forwardRef((props, ref) => {
  const {
    children,
    disableScroll = false,
    onBeforePageScroll = undefined,
    onPageChange = undefined,
    pages = undefined,
    disableAutoTheme = false,
  } = props
  const [isThemeInit, setTehemeInit] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const { changeTheme } = useMenuTheme()

  const totalPages = useMemo(() => {
    if (pages) return pages - 1
    if (!Array.isArray(children)) return 1

    const calcLength = children.reduce((sum, c) => {
      if (Array.isArray(c)) return sum + c.length
      return sum + 1
    }, 0)
    return calcLength
  }, [children, pages])

  useImperativeHandle(ref, () => ({
    onNext() {
      setCurrentPage(getNewPageNumber(currentPage + 1))
    },
    goToPage(page) {
      setCurrentPage(getNewPageNumber(page))
    },
  }))

  const getNewPageNumber = (number) => {
    const newPage = Math.max(Math.min(totalPages, number), 0)
    return newPage
  }

  const setThemeByChildren = (page) => {
    if (disableAutoTheme) return
    const currentChild = Array.isArray(children) ? children[page] : children
    changeTheme(currentChild?.props?.menuTheme || 'dark')
  }

  const handleBeforePageScroll = (page) => {
    if (typeof onBeforePageScroll === 'function') onBeforePageScroll(page)
    if (!children) return
    setThemeByChildren(page)
  }

  const handlePageChange = (page) => {
    if (typeof onPageChange === 'function') onPageChange(page)
  }

  useEffect(() => {
    if (isThemeInit) return
    setTehemeInit(true)
    setThemeByChildren(0)
  }, [isThemeInit])

  useBounceScroll({
    callback: (scrolling) => {
      if (disableScroll) return
      const isToNext = scrolling.x + scrolling.y > 0
      const offset = isToNext ? 1 : -1
      setCurrentPage((v) => getNewPageNumber(v + offset))
    },
    wait: 250,
    preventDefault: false,
  })

  return (
    <div>
      <ReactPageScroller
        animationTimer={500}
        animationTimerBuffer={100}
        blockScrollUp
        blockScrollDown
        renderAllPagesOnFirstRender
        customPageNumber={currentPage}
        onBeforePageScroll={handleBeforePageScroll}
        pageOnChange={handlePageChange}
      >
        {children}
      </ReactPageScroller>
    </div>
  )
})

function ScrollerSection({
  children,
  className = undefined,
  menuTheme = 'dark',
  menuOptions = {},
}) {
  return (
    <div
      className={className}
      data-menu-theme={menuTheme} // prevent unused var
      data-menu-options={menuOptions} // prevent unused var
    >
      {children}
    </div>
  )
}

export default Scroller
export { ScrollerSection }
