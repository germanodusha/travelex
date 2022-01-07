import { useState, useEffect } from 'react'
import classNames from 'classnames'
import Scroller, { ScrollerSection } from '@/components/Scroller'
import Title from '@/components/Title'
import Footer from '@/components/Layout/Footer'
import styles from './UsefulPageLegacy.module.scss'

function UsefulPageLegacy({
  title,
  caption,
  content,
  children,
  alwaysShowTitle = true,
  backgroundColor = 'transparent',
}) {
  const [onCoverPage, setCoverPage] = useState(true)
  const [page, setPage] = useState(0)
  const [scrollEnabled, setScrollEnabled] = useState(false)

  const onBeforePageScroll = (newPage) => {
    setCoverPage(newPage === 0)
    setPage(newPage)
  }

  useEffect(() => {
    const shouldDefaultScroll = page === 1
    setScrollEnabled(shouldDefaultScroll)
  }, [page])

  useEffect(() => {
    const onScroll = (e) => {
      if (scrollEnabled) return

      e.preventDefault()
      window.scrollTo(0, 0)
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [page, scrollEnabled])

  return (
    <div style={{ backgroundColor }} className={styles.main}>
      <div
        className={classNames(styles['title'], {
          [styles['title__second-page']]: !onCoverPage,
          [styles['title__hide-title']]: !onCoverPage && !alwaysShowTitle,
        })}
      >
        <Title
          mainTitle={title}
          titleClassName={classNames(styles['title__txt'], {
            [styles['title__txt__second-page']]: !onCoverPage,
          })}
        />
        <div
          className={classNames(styles['title__border'], {
            [styles['title__border__second-page']]: !onCoverPage,
          })}
        />
      </div>

      <Scroller onBeforePageScroll={onBeforePageScroll}>
        <ScrollerSection menuTheme="light">
          <div className={styles['caption']}>
            <p>{caption}</p>
          </div>
        </ScrollerSection>

        {(children || content) && (
          <ScrollerSection menuTheme="light" className={styles['section']}>
            <div className={styles['content']}>
              <p>{content}</p>
              {children}
            </div>
          </ScrollerSection>
        )}
      </Scroller>

      <Footer />
    </div>
  )
}

export default UsefulPageLegacy
