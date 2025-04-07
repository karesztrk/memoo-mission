import { useEffect, useRef, useState } from "react";

const useDebouncedValue = <T>(value: T, wait: number) => {
  const [_value, setValue] = useState(value);
  const mountedRef = useRef(false);
  const timeoutRef = useRef<number>(null);
  const cooldownRef = useRef(false);

  const cancel = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    if (mountedRef.current) {
      cancel();
      timeoutRef.current = window.setTimeout(() => {
        cooldownRef.current = false;
        setValue(value);
      }, wait);
    }
  }, [value, wait]);

  useEffect(() => {
    mountedRef.current = true;
    return cancel;
  }, []);

  return [_value] as const;
};

export default useDebouncedValue;
