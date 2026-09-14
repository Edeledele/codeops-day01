import { useEffect, useState } from 'react'

/**
 * useFetch — runs an async function, tracks loading/error/data,
 * and cleans up if the component unmounts or deps change mid-flight.
 *
 * fetcher: (signal) => Promise<T>
 */
export function useFetch(fetcher, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null })

  useEffect(() => {
    const controller = new AbortController()
    let cancelled = false

    setState({ data: null, loading: true, error: null })

    fetcher(controller.signal)
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null })
      })
      .catch((error) => {
        if (!cancelled && error.name !== 'AbortError') {
          setState({ data: null, loading: false, error })
        }
      })

    return () => {
      cancelled = true
      controller.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return state
}
