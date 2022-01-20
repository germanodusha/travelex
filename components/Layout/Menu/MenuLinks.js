import { useCallback, useEffect, useState, useRef, useMemo } from 'react'
import { useEffectOnce, useMountedState } from 'react-use'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import classNames from 'classnames'
import { useMenuTheme, usePageLimits } from '@/contexts/LayoutContext'
import { CambiosTypes, Services } from '@/enums/cambio'
import mainLogoWhite from '../../../public/images/TravelexBranco.png'
import mainLogoColorful from '../../../public/images/TravelexLogo.png'
import styles from './Menu.module.scss'

function SubMenu({ menuHover, menuTextHover, subMenu, subMenuPadding }) {
  const router = useRouter()
  const translate = useTranslations(subMenu ? `cambio-${subMenu}` : 'cambio')
  const { theme } = useMenuTheme()
  const items = Services[subMenu] || []
  const [path, service] = router.asPath.split('#')

  const isCambioPath = useMemo(() => path.includes('cambio'), [path])
  const isAboutPath = useMemo(() => path.includes('institucional'), [path])

  return (
    <div
      className={classNames(styles['menu-links'], styles['submenu'], {
        [styles['submenu-enabled']]: (menuHover || menuTextHover) && subMenu,
        [styles['submenu-opaque']]:
          (isCambioPath || isAboutPath) && theme === 'light',
        [styles['submenu-transparent']]:
          (isCambioPath || isAboutPath) && theme === 'dark',
      })}
    >
      <div
        className={styles['submenu__links']}
        style={{ paddingLeft: subMenuPadding }}
      >
        {items.map((item) => (
          <Link key={item.path} href={`/cambio/${subMenu}#${item.path}`}>
            <a
              className={classNames({
                [styles['submenu__links-active']]: item.path === service,
              })}
            >
              {translate(`services.${item.path}`)}
            </a>
          </Link>
        ))}
        {subMenu === CambiosTypes.PESSOA_FISICA && (
          <div className={styles['submenu__links-empty']} />
        )}
      </div>
    </div>
  )
}

function MenuLinks({ visible, emptyMenu }) {
  const isMonted = useMountedState()
  const { setLimits } = usePageLimits()
  const { theme, options } = useMenuTheme()
  const translate = useTranslations('Layout')
  const { locale, locales, route, asPath } = useRouter()
  const otherLocale = locales?.find((cur) => cur !== locale)
  const [hover, setHover] = useState(null)
  const [subMenu, setSubmenu] = useState(null)
  const [menuHover, setMenuHover] = useState(false)
  const [menuTextHover, setMenuTextHover] = useState(false)
  const corpRef = useRef(null)
  const personRef = useRef(null)
  const logoRef = useRef(null)
  const menuRef = useRef(null)

  const onMouseEnterText = useCallback((type) => {
    setMenuTextHover(true)
    setSubmenu(type)
  }, [])

  const onMouseLeaveMenu = useCallback(() => {
    setMenuTextHover(false)
    setSubmenu(null)
  }, [])

  const subMenuPadding =
    subMenu === CambiosTypes.CORPORATIVO
      ? corpRef.current?.getBoundingClientRect().left || 0
      : personRef.current?.getBoundingClientRect().left || 0

  const handleLimits = useCallback(() => {
    setLimits({
      leftColumn: JSON.parse(
        JSON.stringify(logoRef?.current?.getBoundingClientRect())
      ),
      rightColumn: JSON.parse(
        JSON.stringify(menuRef?.current?.getBoundingClientRect())
      ),
    })
  }, [setLimits])

  useEffectOnce(() => {
    handleLimits()
    const timeout = setTimeout(handleLimits, 200)

    return () => {
      clearTimeout(timeout)
    }
  }, [isMonted, handleLimits])

  useEffect(() => {
    window.addEventListener('resize', handleLimits)

    return () => {
      window.removeEventListener('resize', handleLimits)
    }
  }, [handleLimits])

  useEffect(() => {
    handleLimits()
    // eslint-disable-next-line
  }, [locale, handleLimits])

  return (
    <div
      onMouseOver={() => setMenuHover(true)}
      onMouseLeave={onMouseLeaveMenu}
      onFocus={() => void 0}
      onBlur={() => void 0}
      className={classNames(styles[`${visible}`], styles[theme])}
      style={{
        ...(options.background ? { backgroundColor: options.background } : {}),
      }}
    >
      <div className={styles['menu-wrapper']}>
        <Link href="/">
          <a ref={logoRef}>
            <div
              className={classNames(
                styles['menu-logo'],
                styles[`menu-logo__${theme}`]
              )}
            >
              {/* Logo da parte desktop */}
              {theme === 'dark' || theme === 'white' ? (
                <Image src={mainLogoWhite} alt="Travelex Logo Mobile" />
              ) : (
                <Image src={mainLogoColorful} alt="Travelex Logo Mobile" />
              )}
            </div>
          </a>
        </Link>
        <div className={styles['menu-left']}>
          <div className={styles['menu-links']}>
            <div className={styles['menu-about']} ref={menuRef}>
              <div
                className={classNames(
                  styles['menu-about-border'],
                  styles[`menu-about-border__${theme}`]
                )}
              />
              <Link href="/institucional" passHref>
                <button
                  onMouseEnter={() => {
                    setHover('institucional')
                    setSubmenu(null)
                  }}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => void 0}
                  onBlur={() => void 0}
                  onClick={emptyMenu}
                  className={classNames(styles['link'], {
                    [styles[`${theme}__link-active`]]:
                      route === '/institucional',
                    [styles[`${theme}__link-hover`]]: hover === 'institucional',
                  })}
                >
                  {translate('menu.about')}
                </button>
              </Link>

              <Link href="/cambio/corporativo" passHref>
                <button
                  ref={corpRef}
                  onMouseEnter={() => {
                    setHover(CambiosTypes.CORPORATIVO)
                    onMouseEnterText(CambiosTypes.CORPORATIVO)
                  }}
                  onMouseLeave={() => {
                    setHover(null)
                    setMenuTextHover(null)
                  }}
                  onFocus={() => void 0}
                  onBlur={() => void 0}
                  onClick={emptyMenu}
                  className={classNames(styles['link'], {
                    [styles[`${theme}__link-active`]]:
                      route === '/cambio/corporativo',
                    [styles[`${theme}__link-hover`]]:
                      hover === CambiosTypes.CORPORATIVO ||
                      subMenu === CambiosTypes.CORPORATIVO,
                  })}
                >
                  {translate('menu.company')}
                </button>
              </Link>

              <Link href="/cambio/pessoa-fisica" passHref>
                <button
                  ref={personRef}
                  onMouseEnter={() => {
                    setHover(CambiosTypes.PESSOA_FISICA)
                    onMouseEnterText(CambiosTypes.PESSOA_FISICA)
                  }}
                  onMouseLeave={() => {
                    setHover(null)
                    setMenuTextHover(null)
                  }}
                  onFocus={() => void 0}
                  onBlur={() => void 0}
                  onClick={emptyMenu}
                  className={classNames(styles['link'], {
                    [styles[`${theme}__link-active`]]:
                      route === '/cambio/pessoa-fisica',
                    [styles[`${theme}__link-hover`]]:
                      hover === CambiosTypes.PESSOA_FISICA ||
                      subMenu === CambiosTypes.PESSOA_FISICA,
                  })}
                >
                  {translate('menu.personal')}
                </button>
              </Link>

              <a
                href="https://www.travelexbank.com.br/blog/"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => {
                  setHover('blog')
                  setSubmenu(null)
                }}
                onMouseLeave={() => setHover(null)}
                onFocus={() => void 0}
                onBlur={() => void 0}
                className={classNames(styles['link'], {
                  [styles[`${theme}__link-hover`]]: hover === 'blog',
                })}
              >
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
              <Link href="/cadastro" passHref>
                <button
                  onMouseEnter={() => {
                    setHover('openAcc')
                    setSubmenu(null)
                  }}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => void 0}
                  onBlur={() => void 0}
                  onClick={emptyMenu}
                  className={classNames(styles['link'], {
                    [styles[`${theme}__link-hover`]]: hover === 'openAcc',
                  })}
                >
                  {translate('menu.openAccount')}
                </button>
              </Link>
            </div>
          </div>
          <div className={styles['menu-lang']}>
            <p className={classNames(styles[`menu-lang-p__${theme}`])}>
              {translate('menu.currentLocale')}
            </p>
            <Link href={asPath} locale={otherLocale} passHref>
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

      <SubMenu
        menuHover={menuHover}
        menuTextHover={menuTextHover}
        subMenu={subMenu}
        subMenuPadding={subMenuPadding}
      />
    </div>
  )
}

export default MenuLinks
