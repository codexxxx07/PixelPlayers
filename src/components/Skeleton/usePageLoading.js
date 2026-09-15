import { useCallback, useEffect, useRef, useState } from "react";

const MIN_DISPLAY_MS = 200;
const LATENCY_MS = 150;

function getEnvDefaults() {
  if (typeof window === "undefined" || !("matchMedia" in window)) {
    return { minDisplayMs: MIN_DISPLAY_MS, latencyMs: LATENCY_MS };
  }
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = window.matchMedia("(prefers-reduced-data: reduce)").matches;
  const slowConn =
    window.navigator && window.navigator.connection && window.navigator.connection.saveData;
  if (reduceMotion || saveData || slowConn) {
    return { minDisplayMs: 0, latencyMs: 0 };
  }
  return { minDisplayMs: MIN_DISPLAY_MS, latencyMs: LATENCY_MS };
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function simulateNetwork(loadingPromise = Promise.resolve(), latencyMs) {
  const { latencyMs: defaultLatency } = getEnvDefaults();
  const effective = latencyMs ?? defaultLatency;
  if (effective <= 0) return loadingPromise;
  await Promise.all([loadingPromise, sleep(effective)]);
}

export default function usePageLoading({
  loading = false,
  latencyMs,
  minDisplayMs,
  onContentReady,
} = {}) {
  const envDefaults = getEnvDefaults();
  const finalLatency = latencyMs ?? envDefaults.latencyMs;
  const finalMin = minDisplayMs ?? envDefaults.minDisplayMs;

  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const readyRef = useRef(onContentReady);

  useEffect(() => {
    readyRef.current = onContentReady;
  }, [onContentReady]);

  useEffect(() => {
    let mounted = true;
    const start = Date.now();

    (async () => {
      try {
        if (finalLatency > 0) await sleep(loading ? finalLatency : finalLatency);
        const elapsed = Date.now() - start;
        const remaining = finalMin - elapsed;
        if (remaining > 0) await sleep(remaining);
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
  }, [loading, finalLatency, finalMin, attempt]);

  const retry = useCallback(() => {
    setError(null);
    setStatus("loading");
    setAttempt((current) => current + 1);
  }, []);

  return { status, error, retry };
}