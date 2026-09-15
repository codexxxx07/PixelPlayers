import { lazy } from "react";

const MIN_NAV_DELAY_MS = 150;

function getEffectiveDelay(userDelay) {
  if (typeof window !== "undefined" && "matchMedia" in window) {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return 0;
    const saveData = window.matchMedia("(prefers-reduced-data: reduce)").matches;
    if (saveData) return 0;
    const isSlow = window.navigator && window.navigator.connection && window.navigator.connection.saveData;
    if (isSlow) return 0;
  }
  return userDelay;
}

export default function lazyWithDelay(importFn, opts = {}) {
  const delay = getEffectiveDelay(opts.delay ?? MIN_NAV_DELAY_MS);
  if (delay <= 0) return lazy(importFn);
  return lazy(async () => {
    const [module] = await Promise.all([
      importFn(),
      new Promise((resolve) => setTimeout(resolve, delay)),
    ]);
    return module;
  });
}