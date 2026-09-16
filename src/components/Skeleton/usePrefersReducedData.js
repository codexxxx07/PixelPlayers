import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-data: reduce)';

function getPreference() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  try {
    return window.matchMedia(QUERY).matches;
  } catch {
    return false;
  }
}

export default function usePrefersReducedData() {
  const [reduced, setReduced] = useState(getPreference);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    let mql;
    try {
      mql = window.matchMedia(QUERY);
    } catch {
      return undefined;
    }
    const onChange = (event) => setReduced(event.matches);
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    }
    mql.addListener(onChange);
    return () => mql.removeListener(onChange);
  }, []);

  return reduced;
}