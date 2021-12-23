import { useEffect } from 'react'
import classNames from 'classnames'
import Banner from '@/components/Banner'
import { useMenuTheme } from '@/contexts/LayoutContext'
import RegisterForm, { FormTypes } from '@/components/RegisterForm'
import styles from './FormPage.module.scss'

function FormPage({
  description,
  descriptionTitle,
  backgroundImage,
  hideFormType = false,
  formType = FormTypes.PESSOA_FISICA,
  menuTheme = 'light',
  menuOptions = {},
  theme = undefined,
  ...props
}) {
  const { changeTheme } = useMenuTheme()

  useEffect(() => {
    changeTheme(menuTheme, menuOptions)
    return () => changeTheme('dark', {})
  }, [changeTheme, menuTheme, menuOptions])

  return (
    <Banner
      showGradient={false}
      image={backgroundImage}
      bannerClass={classNames({
        [styles['page-white']]: theme === 'white',
      })}
    >
      <div className={styles['page']}>
        <div
          className={classNames(styles['page__desc'], {
            [styles['page__desc-white']]: theme === 'white',
          })}
        >
          {descriptionTitle && (
            <p className={styles['page__desc-title']}>{descriptionTitle}</p>
          )}
          {description && <p>{description}</p>}
        </div>

        <div className={styles['page__form']}>
          <RegisterForm
            hideType={hideFormType}
            formType={formType}
            theme={theme}
            {...props}
          />
        </div>
      </div>
    </Banner>
  )
}

export default FormPage
