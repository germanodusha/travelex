import React, { useMemo, useState, useRef, useEffect } from 'react'
import classNames from 'classnames'
import styles from './Accordion.module.scss'
import { Chevron } from './Icons'

function Accordion({
  title,
  content,
  activeClass,
  toggleAccordion,
  theme = 'dark',
}) {
  const activeContent = useRef(null)
  const [setHeight, setHeightState] = useState('0px')
  const [setRotate, setRotateState] = useState('accordion-icon')

  const iconFill = useMemo(() => {
    switch (theme) {
      case 'dark':
        return 'white'
      case 'white':
      case 'light':
        return 'black'
      default:
        return 'black'
    }
  }, [theme])

  useEffect(() => {
    setHeightState(
      activeClass === '' ? '0px' : `${activeContent.current.scrollHeight}px`
    )
    setRotateState(activeClass === '' ? '' : 'rotate')
  }, [activeClass])

  return (
    <div
      className={classNames(
        styles['accordion-section'],
        styles[`accordion-section__${theme}`]
      )}
    >
      <button className={styles['accordion-button']} onClick={toggleAccordion}>
        <p className={styles['accordion-title']}>{title}</p>
        <div
          className={classNames(
            styles['accordion-icon'],
            styles[`${setRotate}`]
          )}
        >
          <Chevron fill={iconFill} />
        </div>
      </button>
      <div
        ref={activeContent}
        style={{ maxHeight: `${setHeight}` }}
        className={styles['accordion-content']}
      >
        <div className={styles['accordion-text']}>{content}</div>
      </div>
    </div>
  )
}

export default Accordion
