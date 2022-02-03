import { useEffect, useState } from 'react'
import classNames from 'classnames'
import Title from '@/components/Title'
import ChangeThemeOnScroll from '@/components/ChangeThemeOnScroll'
import Footer from '@/components/Layout/Footer'
import styles from './UsefulPageComp.module.scss'
import { useMenuTheme } from '@/contexts/LayoutContext'

function UsefulPageComp({
  title,
  caption,
  content,
  children,
  alwaysShowTitle = true,
}) {
  const [onCoverPage, setOnCoverPage] = useState(true)
  const { theme } = useMenuTheme()

  useEffect(() => {
    const onScroll = (event) => {
      if (event.pageY > 1000) {
        setOnCoverPage(false)
      } else {
        setOnCoverPage(true)
      }
    }

    window.addEventListener('wheel', onScroll)

    return () => {
      window.removeEventListener('wheel', onScroll)
    }
  }, [])

  return (
    <>
      <ChangeThemeOnScroll theme="light" />
      <div
        className={classNames(styles['menu-bg'], {
          [styles['menu-bg__dark']]: theme === 'dark',
          [styles['menu-bg__light']]: theme === 'light',
        })}
      ></div>
      <div>
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

        <div className={styles['caption']}>
          <p>{caption}</p>
        </div>

        {(children || content) && (
          <div className={styles['content']}>
            <p>{content}</p>
            {children}
          </div>
        )}

        <ChangeThemeOnScroll
          theme="light"
          style={{ transform: 'translateY(-100%)' }}
        />
        <ChangeThemeOnScroll theme="dark" />
        <Footer />
      </div>
    </>
  )
}

export default UsefulPageComp
