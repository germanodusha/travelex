import { createContext, useCallback, useContext, useState } from 'react'

function isObject(value) {
  return value && typeof value === 'object' && value.constructor === Object
}

const LayoutContext = createContext(undefined)

const DEFAULT_BOUNDING_RECT = {
  x: 0,
  y: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: 0,
  height: 0,
}

function LayoutProvider({ children }) {
  const [menuTheme, setMenuTheme] = useState('dark')
  const [menuOptions, setOptions] = useState({})
  const [limits, setLimits] = useState({
    leftColumn: DEFAULT_BOUNDING_RECT,
    rightColumn: DEFAULT_BOUNDING_RECT,
  })

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

  return (
    <LayoutContext.Provider
      value={{ menuTheme, changeMenuTheme, menuOptions, limits, setLimits }}
    >
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

function usePageLimits() {
  const { limits, setLimits } = useContext(LayoutContext)
  return { limits, setLimits }
}

export default LayoutProvider
export { useMenuTheme, usePageLimits }
