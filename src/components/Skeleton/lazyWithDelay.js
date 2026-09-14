import { lazy } from "react";

const MIN_NAV_DELAY_MS = 350;

export default function lazyWithDelay(importFn, opts = {}) {
  const delay = opts.delay ?? MIN_NAV_DELAY_MS;
  return lazy(async () => {
    const [module] = await Promise.all([
      importFn(),
      new Promise((resolve) => setTimeout(resolve, delay)),
    ]);
    return module;
  });
}