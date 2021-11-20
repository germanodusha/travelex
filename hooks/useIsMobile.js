import { useMediaQuery } from 'react-responsive'

function useIsMobile() {
  const isMobile = useMediaQuery(
    { maxDeviceWidth: 768 },
    { orientation: 'portrait' }
  )

  return isMobile
}

export default useIsMobile
