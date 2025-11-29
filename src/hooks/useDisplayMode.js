import { useState, useEffect } from 'react'

/**
 * Custom hook to detect display mode (standalone/PWA vs browser)
 * @returns {{ isStandalone: boolean, displayMode: 'standalone' | 'browser' }}
 */
const useDisplayMode = () => {
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Guard for SSR - check if window is available
    if (typeof window === 'undefined') {
      return
    }

    // Create MediaQueryList objects once to avoid duplication
    const standaloneMediaQuery = window.matchMedia('(display-mode: standalone)')
    const fullscreenMediaQuery = window.matchMedia('(display-mode: fullscreen)')

    // Check for standalone mode using multiple methods
    const checkStandaloneMode = () => {
      // Method 1: Check CSS media query for standalone display mode
      const standaloneMatch = standaloneMediaQuery.matches
      
      // Method 2: Check for iOS standalone mode (Safari PWA)
      const isIOSStandalone = window.navigator.standalone === true
      
      // Method 3: Check for fullscreen display mode (alternative PWA mode)
      const fullscreenMatch = fullscreenMediaQuery.matches
      
      const standalone = standaloneMatch || isIOSStandalone || fullscreenMatch
      setIsStandalone(standalone)
    }

    // Initial check
    checkStandaloneMode()

    // Listen for display mode changes (in case of dynamic changes)
    const handleChange = () => checkStandaloneMode()
    
    standaloneMediaQuery.addEventListener('change', handleChange)
    fullscreenMediaQuery.addEventListener('change', handleChange)

    return () => {
      standaloneMediaQuery.removeEventListener('change', handleChange)
      fullscreenMediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return {
    isStandalone,
    displayMode: isStandalone ? 'standalone' : 'browser'
  }
}

export default useDisplayMode
