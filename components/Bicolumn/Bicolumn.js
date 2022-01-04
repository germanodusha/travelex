import Title from '@/components/Title'
import { usePageLimits } from '@/contexts/LayoutContext'
import useIsMobile from '@/hooks/useIsMobile'
import styles from './Bicolumn.module.scss'

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
