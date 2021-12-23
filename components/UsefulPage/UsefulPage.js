import { useState } from 'react'
import classNames from 'classnames'
import Scroller, { ScrollerSection } from '@/components/Scroller'
import Title from '@/components/Title'
import Footer from '@/components/Layout/Footer'
import ChangeThemeOnScroll from '@/components/ChangeThemeOnScroll'
import styles from './UsefulPage.module.scss'

function UsefulPage({
  title,
  caption,
  content,
  children,
  color = undefined,
  alwaysShowTitle = true,
  backgroundColor = 'transparent',
  Wrapper = Scroller,
}) {
  const [onCoverPage, setCoverPage] = useState(true)

  const onBeforePageScroll = (page) => {
    setCoverPage(page === 0)
  }

  return (
    <div style={{ backgroundColor }}>
      <div
        className={classNames(styles['title'], {
          [styles['title__fixed']]: true,
          [styles['title__second-page']]: !onCoverPage,
          [styles['title__hide-title']]: !onCoverPage && !alwaysShowTitle,
        })}
      >
        <Title
          color={color}
          mainTitle={title}
          titleClassName={classNames(styles['title__txt'], {
            [styles['title__txt__second-page']]: !onCoverPage,
          })}
        />
        <div
          className={classNames(styles['title__border'], {
            [styles['title__border__second-page']]: !onCoverPage,
          })}
          // style={color ? { backgroundColor: color } : {}}
        />
      </div>

      <Wrapper onBeforePageScroll={onBeforePageScroll}>
        <ScrollerSection menuTheme="light">
          <div className={styles['caption']}>
            <p>{caption}</p>
          </div>
        </ScrollerSection>

        {content && (
          <ScrollerSection menuTheme="light" className={styles['section']}>
            <div className={styles['content']}>
              <p>{content}</p>
            </div>
          </ScrollerSection>
        )}

        {children}

        <ChangeThemeOnScroll
          theme="light"
          options={{}}
          style={{ transform: 'translateY(-100%)' }}
        />
        <ChangeThemeOnScroll theme="dark" options={{}} />
        <Footer />
        <ChangeThemeOnScroll
          theme="dark"
          options={{}}
          style={{ transform: 'translateY(-100%)' }}
        />
      </Wrapper>
    </div>
  )
}

export default UsefulPage
