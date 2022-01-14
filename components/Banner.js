import Link from 'next/link'
import Image from 'next/image'
import classNames from 'classnames'
import styles from './Banner.module.scss'

function Banner({
  title,
  id,
  link,
  image,
  children,
  video,
  showGradient = true,
  bannerClass = undefined,
}) {
  return (
    <div className={classNames(styles['banner'], bannerClass)}>
      {image && (
        <div className={styles['banner-media']}>
          <Image src={image} alt={id} />
        </div>
      )}

      {video && (
        <div className={styles['banner-media']}>
          <video src={video} alt={id} autoPlay muted loop />
        </div>
      )}

      {showGradient && (
        <div
          className={classNames({
            [styles['banner-media__gradient']]: showGradient,
          })}
        />
      )}

      {link && (
        <div className={styles['title']}>
          <Link href={link}>
            <a>{title} </a>
          </Link>
        </div>
      )}

      {!link && <div className={styles['title']}>{title}</div>}
      <div className={styles['content']}>{children}</div>

      <div className={styles['white-out']}></div>
    </div>
  )
}

export default Banner
