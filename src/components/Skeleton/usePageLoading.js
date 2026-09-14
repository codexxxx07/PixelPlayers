import { useCallback, useEffect, useRef, useState } from "react";

const MIN_DISPLAY_MS = 450;
const LATENCY_MS = 500;

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function simulateNetwork(loadingPromise = Promise.resolve()) {
  await Promise.all([loadingPromise, sleep(LATENCY_MS)]);
}

export default function usePageLoading({
  loading = false,
  latencyMs = LATENCY_MS,
  minDisplayMs = MIN_DISPLAY_MS,
  onContentReady,
} = {}) {
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const readyRef = useRef(onContentReady);

  useEffect(() => {
    readyRef.current = onContentReady;
  }, [onContentReady]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const start = Date.now();
        await sleep(loading ? latencyMs : latencyMs);
        const elapsed = Date.now() - start;
        if (elapsed < minDisplayMs) {
          await sleep(minDisplayMs - elapsed);
        }
        if (mounted) {
          setStatus("success");
          readyRef.current?.();
        }
      } catch (err) {
        if (mounted) {
          setStatus("error");
          setError(err);
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, [loading, latencyMs, minDisplayMs, attempt]);

  const retry = useCallback(() => {
    setError(null);
    setStatus("loading");
    setAttempt((current) => current + 1);
  }, []);

  return { status, error, retry };
}