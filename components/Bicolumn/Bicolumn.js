import Title from '@/components/Title'
import styles from './Bicolumn.module.scss'

function Bicolumn({
  id = '',
  title = '',
  subTitle = '',
  headerBg = true,
  children,
}) {
  return (
    <div>
      {/* {headerBg && <div className={styles['container__header-logo']} />} */}
      {headerBg && <div className={styles['container__header']} />}

      <div id={id} className={styles['title']}>
        <Title mainTitle={title} />
      </div>

      <div className={styles['container']}>
        <div className={styles['container__left']}>
          <div className={styles['container__left-txt']}>
            <p>{subTitle}</p>
          </div>
        </div>

        <div className={styles['container__right']}>{children}</div>
      </div>
    </div>
  )
}

export default Bicolumn
