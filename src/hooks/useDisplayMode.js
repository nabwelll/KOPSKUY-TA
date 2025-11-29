import { useState, useEffect } from 'react'

/**
 * Custom hook to detect display mode (standalone/PWA vs browser)
 * @returns {{ isStandalone: boolean, displayMode: 'standalone' | 'browser' }}
 */
const useDisplayMode = () => {
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Check for standalone mode using multiple methods
    const checkStandaloneMode = () => {
      // Method 1: Check CSS media query for standalone display mode
      const standaloneMediaQuery = window.matchMedia('(display-mode: standalone)')
      
      // Method 2: Check for iOS standalone mode (Safari PWA)
      const isIOSStandalone = window.navigator.standalone === true
      
      // Method 3: Check for fullscreen display mode (alternative PWA mode)
      const fullscreenMediaQuery = window.matchMedia('(display-mode: fullscreen)')
      
      const standalone = standaloneMediaQuery.matches || isIOSStandalone || fullscreenMediaQuery.matches
      setIsStandalone(standalone)
    }

    // Initial check
    checkStandaloneMode()

    // Listen for display mode changes (in case of dynamic changes)
    const standaloneQuery = window.matchMedia('(display-mode: standalone)')
    const fullscreenQuery = window.matchMedia('(display-mode: fullscreen)')
    
    const handleChange = () => checkStandaloneMode()
    
    standaloneQuery.addEventListener('change', handleChange)
    fullscreenQuery.addEventListener('change', handleChange)

    return () => {
      standaloneQuery.removeEventListener('change', handleChange)
      fullscreenQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return {
    isStandalone,
    displayMode: isStandalone ? 'standalone' : 'browser'
  }
}

export default useDisplayMode
