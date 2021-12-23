import Image from 'next/image'
// import Link from 'next/link'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useMenuTheme } from '@/contexts/LayoutContext'
import mainLogoWhite from '../../../public/images/TravelexBranco.png'
import mainLogoColorful from '../../../public/images/TravelexLogo.png'
import styles from './Menu.module.scss'
import { MenuIcon, MenuClose } from '../../Icons'

const MenuSmall = ({
  emptyMenu,
  isOpen,
  lockScroll,
  setIsOpen,
  toggleMenu,
  unlockScroll,
}) => {
  const { theme } = useMenuTheme()
  const { push } = useRouter()

  function handleClick() {
    if (isOpen) {
      setIsOpen(false)
      unlockScroll()
    } else {
      setIsOpen(true)
      lockScroll()
    }
  }

  const onPressMenu = () => {
    emptyMenu()
    push('/')
  }

  const isMenuMobile = theme === 'dark' || isOpen

  return (
    <nav
      className={classNames(
        styles['menu-small'],
        styles[`menu-small__${theme}`]
      )}
    >
      <div className={styles['menu-mobile']}>
        <div
          onClick={onPressMenu}
          className={styles['mobile-logo']}
          role="presentation"
          onKeyPress={0}
        >
          {/* <Link href="/">
            <a>
              {theme === 'dark' ? (
                <Image src={mainLogoWhite} alt="Travelex Logo Mobile" />
              ) : (
                <Image src={mainLogoColorful} alt="Travelex Logo Mobile" />
              )}
            </a>
          </Link> */}
          {/* <Link href="/">
            <a>
              {isMenuMobile ? (
                <Image src={mainLogoWhite} alt="Travelex Logo Mobile" />
              ) : (
                <Image src={mainLogoColorful} alt="Travelex Logo Mobile" />
              )}
            </a>
          </Link> */}

          {isMenuMobile ? (
            <Image src={mainLogoWhite} alt="Travelex Logo Mobile" />
          ) : (
            <Image src={mainLogoColorful} alt="Travelex Logo Mobile" />
          )}
        </div>
        <button
          className={classNames(styles['header-small-button'], {
            [styles['menu-logo']]: isOpen,
          })}
          onClick={() => {
            toggleMenu()
            handleClick()
          }}
        >
          <MenuIcon fill={theme === 'dark' ? '#bebebe' : '#221f42'} />
          {/* <MenuIcon fill={'#bebebe'} /> */}
        </button>
        <button
          className={classNames(styles['header-small-closebtn'], {
            [styles['menu-logo']]: !isOpen,
          })}
          onClick={() => {
            toggleMenu()
            handleClick()
          }}
        >
          {/* <MenuClose fill={theme === 'dark' ? '#bebebe' : '#221f42'} /> */}
          <MenuClose fill={'#bebebe'} />
        </button>
      </div>
    </nav>
  )
}
export default MenuSmall
