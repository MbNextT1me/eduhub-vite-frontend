import { useState } from "react";
import { APP_NAME } from "~/shared/config/env";

export const useLocalStorage = (key, initialValue) => {
  const keyLS = `${APP_NAME}:${key}`;

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(keyLS);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("useLocalStorage", "useState", error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(keyLS, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("useLocalStorage", "setValue", error);
    }
  };

  return [storedValue, setValue];
};

export const initLSItem = (key, initialValue) => {
  const keyLS = `${APP_NAME}:${key}`;

  const setValue = (nextValue) => {
    window.localStorage.setItem(keyLS, JSON.stringify(nextValue));
  };

  const getValue = () => {
    const item = window.localStorage.getItem(keyLS);
    const value = item ? JSON.parse(item) : initialValue;
    return value;
  };

  return [getValue, setValue];
};
