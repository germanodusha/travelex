import React, { useState, useEffect } from 'react'
import MenuLinks from './MenuLinks'
import MenuSmall from './MenuSmall'

const Menu = () => {
  const [toggle, setToggle] = useState('')
  const [visible, setVisible] = useState('menu')

  function toggleMenu() {
    setToggle(toggle === '' ? 'active' : '')
  }

  useEffect(() => {
    setVisible(toggle === 'active' ? '' : 'menu')
  }, [toggle])

  return (
    <header>
      <MenuLinks visible={visible} />
      <MenuSmall toggleMenu={toggleMenu} visible={visible} />
    </header>
  )
}

export default Menu
