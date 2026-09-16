import { useCallback, useEffect, useState } from 'react';

export default function usePageLoading({ loading = false, error = null, minDisplayMs = 200 } = {}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!loading) return undefined;
    const id = setTimeout(() => setVisible(true), minDisplayMs);
    return () => {
      clearTimeout(id);
      setVisible(false);
    };
  }, [loading, minDisplayMs]);

  let status = 'content';
  if (error) status = 'error';
  else if (visible && loading) status = 'loading';
  else if (loading) status = 'idle';

  const retry = useCallback(() => setVisible(false), []);

  return { status, error, retry, loading };
}