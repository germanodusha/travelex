import { useState, useEffect } from 'react'
import Title from '@/components/Title'
import { usePageLimits } from '@/contexts/LayoutContext'
import styles from './Bicolumn.module.scss'

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize()

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return isMobile
}

function Bicolumn({
  id = '',
  title = '',
  subTitle = '',
  headerBg = true,
  children,
}) {
  const { limits } = usePageLimits()
  const isMobile = useIsMobile()

  return (
    <div>
      {/* {headerBg && <div className={styles['container__header-logo']} />} */}
      {headerBg && <div className={styles['container__header']} />}

      <div id={id} className={styles['title']}>
        <Title mainTitle={title} />
      </div>

      <div className={styles['container']}>
        <div
          className={styles['container__left']}
          style={isMobile ? {} : { width: `${limits.rightColumn.x}px` }}
        >
          <div className={styles['container__left-txt']}>
            <p>{subTitle}</p>
          </div>
        </div>

        <div
          className={styles['container__right']}
          style={isMobile ? {} : { width: `${limits.rightColumn.width}px` }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default Bicolumn
