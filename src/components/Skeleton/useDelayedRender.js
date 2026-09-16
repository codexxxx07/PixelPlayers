import { useEffect, useState } from 'react';

export default function useDelayedRender(delayMs = 0, immediate = false) {
  const [shown, setShown] = useState(immediate || delayMs <= 0);

  useEffect(() => {
    if (delayMs <= 0) return undefined;
    const id = setTimeout(() => setShown(true), delayMs);
    return () => clearTimeout(id);
  }, [delayMs]);

  return shown;
}