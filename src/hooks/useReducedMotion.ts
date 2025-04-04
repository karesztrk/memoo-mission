import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

const getInitialState = () => {
  if (!window?.matchMedia) {
    return false;
  }
  return window.matchMedia(QUERY).matches;
};

const useReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState(getInitialState);

  useEffect(() => {
    if (window?.matchMedia) {
      const mediaQueryList = window.matchMedia(QUERY);
      const listener = (event: MediaQueryListEvent) => {
        setPrefersReducedMotion(event.matches);
      };
      mediaQueryList.addEventListener("change", listener);
      return () => {
        mediaQueryList.removeEventListener("change", listener);
      };
    }
  }, []);

  return prefersReducedMotion;
};

export default useReducedMotion;
