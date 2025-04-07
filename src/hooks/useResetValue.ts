import { useEffect, useState } from "react";

export const useResetValue = (timeout: number) => {
  const [value, setValue] = useState(false);

  useEffect(() => {
    if (value) {
      setValue(true);
    }
    const id = setTimeout(() => {
      setValue(false);
    }, timeout);
    return () => {
      clearTimeout(id);
    };
  }, [value]);

  return [value, setValue] as const;
};
