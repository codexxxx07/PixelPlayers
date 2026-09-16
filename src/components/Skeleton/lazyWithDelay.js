import { lazy } from 'react';

export default function lazyWithDelay(importFn) {
  return lazy(importFn);
}