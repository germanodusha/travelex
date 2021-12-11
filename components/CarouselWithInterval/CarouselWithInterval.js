import React, { useCallback, useState } from 'react'
import classNames from 'classnames'
import useInterval from '@/hooks/useInterval'
import styles from './CarouselWithInterval.module.scss'

function CarouselWithInterval({ data = [], RenderItem }) {
  const [page, setPage] = useState(0)

  const nextItem = useCallback(() => {
    const maxPage = data.length - 1
    console.log('[nextItem]')
    setPage((current) => (current >= maxPage ? 0 : current + 1))
  }, [])

  useInterval(nextItem, 6000)

  return (
    <div className={styles['content']}>
      <div
        className={styles['content__inner']}
        style={{ transform: `translateY(-${100 * page}vh)` }}
      >
        {data.map((item, i) => (
          <RenderItem key={item.id} item={item} index={i} />
        ))}
      </div>

      <div className={styles['pagination']}>
        {data.map((_, i) => (
          <div
            key={i}
            className={classNames(styles['pagination__item'], {
              [styles['pagination__item-active']]: i === page,
            })}
            role="presentation"
            onClick={() => setPage(i)}
            onPress={() => setPage(i)}
            onKeyDown={() => setPage(i)}
          >
            <div className={classNames(styles['pagination__item-bg'])} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CarouselWithInterval
