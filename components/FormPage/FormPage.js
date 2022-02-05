import { useEffect } from 'react'
import classNames from 'classnames'
import Banner from '@/components/Banner'
import { useMenuTheme, usePageLimits } from '@/contexts/LayoutContext'
import RegisterForm, { FormTypes } from '@/components/RegisterForm'
import useIsMobile from '@/hooks/useIsMobile'
import styles from './FormPage.module.scss'

function FormPage({
  description,
  descriptionTitle,
  backgroundImage,
  hideFormType = false,
  faq = false,
  formType = FormTypes.PESSOA_FISICA,
  menuTheme = 'light',
  menuOptions = {},
  theme = undefined,
  disableTheme = false,
  ...props
}) {
  const isMobile = useIsMobile()
  const { limits } = usePageLimits()
  const { changeTheme } = useMenuTheme()

  useEffect(() => {
    if (disableTheme) return

    changeTheme(menuTheme, menuOptions)
    return () => changeTheme('dark', {})
  }, [disableTheme, changeTheme, menuTheme, menuOptions])

  return (
    <Banner
      showGradient={false}
      image={backgroundImage}
      bannerClass={classNames({
        [styles['page-white']]: theme === 'white',
      })}
      faq
    >
      <div
        className={classNames(styles['page'], {
          [styles['page__bg']]: faq === true,
        })}
      >
        <div
          className={classNames(styles['page__form'], {
            [styles['page__desc-white']]: theme === 'white',
          })}
          style={isMobile ? {} : { width: `${limits.rightColumn.x}px` }}
        >
          <RegisterForm
            hideType={hideFormType}
            formType={formType}
            theme={theme}
            faqPage={faq}
            {...props}
          />
        </div>

        <div
          className={classNames(styles['page__desc'], {
            [styles['page__desc-white']]: theme === 'white',
          })}
          style={isMobile ? {} : { width: `${limits.rightColumn.width}px` }}
        >
          {descriptionTitle && (
            <p className={styles['page__desc-title']}>{descriptionTitle}</p>
          )}
          {description && <p>{description}</p>}
        </div>
      </div>
    </Banner>
  )
}

export default FormPage
