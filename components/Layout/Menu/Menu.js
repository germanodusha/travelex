import React, { useState, useEffect, useCallback } from 'react'
import MenuLinks from './MenuLinks'
import MenuSmall from './MenuSmall'

const Menu = () => {
  const [toggle, setToggle] = useState('')
  const [visible, setVisible] = useState('menu')
  const [isOpen, setIsOpen] = useState(false)

  function toggleMenu() {
    setToggle(toggle === '' ? 'active' : '')
  }

  function emptyMenu() {
    setToggle('')
    setIsOpen(false)
    unlockScroll()
  }

  const lockScroll = useCallback(() => {
    document.body.style.overflow = 'hidden'
  }, [])

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = ''
  }, [])

  useEffect(() => {
    setVisible(toggle === 'active' ? '' : 'menu')
  }, [toggle])

  return (
    <header>
      <MenuLinks emptyMenu={emptyMenu} visible={visible} />
      <MenuSmall
        emptyMenu={emptyMenu}
        isOpen={isOpen}
        lockScroll={lockScroll}
        setIsOpen={setIsOpen}
        toggleMenu={toggleMenu}
        unlockScroll={unlockScroll}
        visible={visible}
      />
    </header>
  )
}

export default Menu
