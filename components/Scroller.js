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
  const { children, onBeforePageScroll = undefined } = props
  const [isThemeInit, setTehemeInit] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const { changeTheme } = useMenuTheme()

  const totalPages = useMemo(() => {
    if (!Array.isArray(children)) return 1

    const calcLength = children.reduce((sum, c) => {
      if (Array.isArray(c)) return sum + c.length
      return sum + 1
    }, 0)
    return calcLength
  }, [children])

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
    const currentChild = Array.isArray(children) ? children[page] : children
    changeTheme(currentChild?.props?.menuTheme || 'dark')
  }

  const handleBeforePageScroll = (page) => {
    if (typeof onBeforePageScroll === 'function') onBeforePageScroll(page)
    if (!children) return
    setThemeByChildren(page)
  }

  useEffect(() => {
    if (isThemeInit) return
    setTehemeInit(true)
    setThemeByChildren(0)
  }, [isThemeInit])

  useBounceScroll({
    callback: (scrolling) => {
      const isToNext = scrolling.x + scrolling.y > 0
      const offset = isToNext ? 1 : -1
      setCurrentPage((v) => getNewPageNumber(v + offset))
    },
    wait: 1000,
    preventDefault: false,
  })

  return (
    <div>
      <ReactPageScroller
        blockScrollUp
        blockScrollDown
        renderAllPagesOnFirstRender
        customPageNumber={currentPage}
        onBeforePageScroll={handleBeforePageScroll}
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
}) {
  return (
    <div
      className={className}
      data-menu-theme={menuTheme} // prevent unused var
    >
      {children}
    </div>
  )
}

export default Scroller
export { ScrollerSection }
