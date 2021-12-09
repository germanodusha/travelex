import { useCallback, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import classNames from 'classnames'
import { useMenuTheme } from '@/contexts/LayoutContext'
import mainLogoWhite from '../../../public/images/TravelexBranco.png'
import mainLogoColorful from '../../../public/images/TravelexLogo.png'
import styles from './Menu.module.scss'

function MenuLinks({ visible }) {
  const { theme, options } = useMenuTheme()
  const translate = useTranslations('Layout')
  const { locale, locales, route } = useRouter()
  const otherLocale = locales?.find((cur) => cur !== locale)
  const [subMenu, setSubmenu] = useState('cambio-corporativo')
  const [menuHover, setMenuHover] = useState(false)
  const [menuTextHover, setMenuTextHover] = useState(false)
  const corpRef = useRef(null)
  const personRef = useRef(null)

  const onMouseEnterText = useCallback((type) => {
    setMenuTextHover(true)
    setSubmenu(type)
  }, [])

  const subMenuPadding =
    subMenu === 'cambio-corporativo'
      ? corpRef.current?.getBoundingClientRect().left || 0
      : personRef.current?.getBoundingClientRect().left || 0

  return (
    <div
      onMouseOver={() => setMenuHover(true)}
      onMouseLeave={() => setMenuHover(false)}
      onFocus={() => void 0}
      onBlur={() => void 0}
      className={classNames(styles[`${visible}`], styles[theme])}
      styles={{
        ...(options.background ? { backgroundColor: options.background } : {}),
      }}
    >
      <div className={styles['menu-wrapper']}>
        <Link href="/">
          <a>
            <div
              className={classNames(
                styles['menu-logo'],
                styles[`menu-logo__${theme}`]
              )}
            >
              {theme === 'dark' || theme === 'white' ? (
                <Image
                  src={mainLogoWhite}
                  alt="Travelex Logo Mobile"
                  layout="responsive"
                />
              ) : (
                <Image
                  src={mainLogoColorful}
                  alt="Travelex Logo Mobile"
                  layout="responsive"
                />
              )}
            </div>
          </a>
        </Link>
        <div className={styles['menu-left']}>
          <div className={styles['menu-links']}>
            <div className={styles['menu-about']}>
              <div
                className={classNames(
                  styles['menu-about-border'],
                  styles[`menu-about-border__${theme}`]
                )}
              />
              <Link href="/institucional">
                <a
                  className={classNames({
                    [styles[`${theme}__link-active`]]:
                      route === '/institucional',
                  })}
                >
                  {translate('menu.about')}
                </a>
              </Link>

              <Link href="/cambio/corporativo">
                <a
                  ref={corpRef}
                  onMouseEnter={() => onMouseEnterText('cambio-corporativo')}
                  onMouseLeave={() => setMenuTextHover(null)}
                  onFocus={() => void 0}
                  onBlur={() => void 0}
                  className={classNames({
                    [styles[`${theme}__link-active`]]:
                      route === '/cambio/corporativo',
                  })}
                >
                  {translate('menu.company')}
                </a>
              </Link>

              <Link href="/cambio/pessoa-fisica">
                <a
                  ref={personRef}
                  onMouseEnter={() => onMouseEnterText('cambio-pessoa-fisica')}
                  onMouseLeave={() => setMenuTextHover(null)}
                  onFocus={() => void 0}
                  onBlur={() => void 0}
                  className={classNames({
                    [styles[`${theme}__link-active`]]:
                      route === '/cambio/pessoa-fisica',
                  })}
                >
                  {translate('menu.personal')}
                </a>
              </Link>

              <a href="/blog" target="_blank">
                {translate('menu.blog')}
              </a>
            </div>
            <div
              className={classNames(styles['menu-cta'], {
                [styles['menu-cta-active']]: route === '/cadastro',
              })}
            >
              <div
                className={classNames(
                  styles['menu-cta-border'],
                  styles[`menu-cta-border__${theme}`]
                )}
              />
              <Link href="/cadastro">
                <a>{translate('menu.openAccount')}</a>
              </Link>
            </div>
          </div>
          <div className={styles['menu-lang']}>
            <p>{translate('menu.currentLocale')}</p>
            <Link href={route} locale={otherLocale}>
              <button
                className={classNames(
                  styles['menu-lang-btn'],
                  styles[`menu-lang-btn__${theme}`]
                )}
              >
                {translate('menu.switchLocale', { locale: otherLocale })}
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div
        className={classNames(styles['submenu'], {
          [styles['submenu-enabled']]: menuHover || menuTextHover,
        })}
      >
        <div
          className={styles['submenu__links']}
          style={{ paddingLeft: subMenuPadding }}
        >
          <p>{subMenu}</p>
          <p>{subMenu}</p>
          <p>{subMenu}</p>
          <p>{subMenu}</p>
          <p>{subMenu}</p>
        </div>
      </div>
    </div>
  )
}

export default MenuLinks
