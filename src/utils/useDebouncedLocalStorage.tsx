import { useState, useEffect } from 'react'
import useDebounce from './useDebounce'
import useLocalStorage from './useLocalStorage'

function useDebouncedLocalStorage<T>(
  key: string,
  initialValue: T,
  debounceDelay: number
) {
  const [localStorageValue, setLocalStorageValue] = useLocalStorage<T>(
    key,
    initialValue
  )
  const [tempValue, setTempValue] = useState<T>(localStorageValue)
  const debouncedValue = useDebounce<T>(tempValue, debounceDelay)
  useEffect(() => {
    setLocalStorageValue(debouncedValue)
  }, [debouncedValue, setLocalStorageValue])

  return [tempValue, setTempValue] as const
}

export default useDebouncedLocalStorage
