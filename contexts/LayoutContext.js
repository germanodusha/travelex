import { createContext, useCallback, useContext, useState } from 'react'

function isObject(value) {
  return value && typeof value === 'object' && value.constructor === Object
}

const LayoutContext = createContext(undefined)

function LayoutProvider({ children }) {
  const [menuTheme, setMenuTheme] = useState('dark')
  const [menuOptions, setOptions] = useState({})

  const changeMenuTheme = useCallback((theme, options = {}) => {
    const isValidTheme = ['light', 'dark', 'white'].includes(theme)
    if (!isValidTheme) {
      throw new Error('Invalid theme. light or dark is available')
    }

    const isValidOptions = isObject(options)
    if (!isValidOptions) {
      throw new Error('Invalid theme options. Must be an object')
    }

    setMenuTheme(theme)
    setOptions(options)
  }, [])

  console.log({ menuOptions })
  return (
    <LayoutContext.Provider value={{ menuTheme, changeMenuTheme, menuOptions }}>
      {children}
    </LayoutContext.Provider>
  )
}

function useMenuTheme() {
  const {
    menuTheme: theme,
    changeMenuTheme: changeTheme,
    menuOptions: options,
  } = useContext(LayoutContext)

  return { theme, changeTheme, options }
}

export default LayoutProvider
export { useMenuTheme }
