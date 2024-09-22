import React from "react";

export const getItem = <T>(key: string): T | undefined => {
  const item = localStorage.getItem(key);

  if (item) {
    try {
      return JSON.parse(item);
    } catch (e) {
      return undefined;
    }
  }
  return undefined;
};

export const useLocalStorage = <T>(
  key: string
): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>] => {
  const [value, setValue] = React.useState<T | undefined>(getItem(key));

  React.useEffect(() => {
    if (value !== null && value !== undefined) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  }, [value]);

  return [value, setValue];
};
