import { useState } from 'react'
import { useTranslations } from 'use-intl'
import classNames from 'classnames'
import Accordion from '../Accordion'
import styles from './FAQAccordion.module.scss'

function FAQAccordion({
  showTitle,
  theme = 'dark',
  showContact = false,
  faqItems = [],
  title = undefined,
}) {
  const translate = useTranslations('FAQ')
  const [active, setActive] = useState('')

  return (
    <div
      className={classNames(styles['section'], {
        [styles['section__light']]: theme === 'light',
        [styles['section__white']]: theme === 'white',
      })}
    >
      {showTitle && (
        <p className={styles['section__subtitle']}>
          {title || translate('title')}
        </p>
      )}

      {faqItems.map((x) => {
        const isActive = active === x.id
        const activeClass = isActive ? 'active' : ''
        const toggleAccordion = () => setActive(isActive ? '' : x.id)

        return (
          <Accordion
            key={x.id}
            id={x.id}
            title={x.title}
            content={x.content}
            activeClass={activeClass}
            toggleAccordion={toggleAccordion}
            theme={theme}
          />
        )
      })}

      {showContact && (
        <div className={styles['section__contact']}>
          <p>{translate('contact')}</p>
        </div>
      )}
    </div>
  )
}

export function getStaticProps({ locale }) {
  const messages = require(`../../content/${locale}.json`)

  return {
    props: {
      messages,
      locale,
    },
  }
}

export default FAQAccordion
