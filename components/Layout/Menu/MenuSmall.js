import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import classNames from 'classnames'
import { useMenuTheme } from '@/contexts/LayoutContext'
import mainLogoWhite from '../../../public/images/TravelexBranco.png'
import mainLogoColorful from '../../../public/images/TravelexLogo.png'
import styles from './Menu.module.scss'
import { MenuIcon, MenuClose } from '../../Icons'

const MenuSmall = ({ toggleMenu }) => {
  const { theme } = useMenuTheme()

  const [isOpen, setIsOpen] = useState(false)

  function handleClick() {
    if (isOpen) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }

  return (
    <nav
      className={classNames(
        styles['menu-small'],
        styles[`menu-small__${theme}`]
      )}
    >
      <div className={styles['menu-mobile']}>
        <div className={styles['mobile-logo']}>
          <Link href="/">
            <a>
              {theme === 'dark' ? (
                <Image src={mainLogoWhite} alt="Travelex Logo Mobile" />
              ) : (
                <Image src={mainLogoColorful} alt="Travelex Logo Mobile" />
              )}
            </a>
          </Link>
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
          <MenuClose fill={theme === 'dark' ? '#bebebe' : '#221f42'} />
        </button>
      </div>
    </nav>
  )
}
export default MenuSmall
