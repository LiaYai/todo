import React from 'react';

export const useLocalStorage = <T>(key: string, initialTasks: T): [T, (value: T | ((val: T) => T)) => void] => {
  const [value, setValue] = React.useState<T>(() => {
    try {
    const savedValue = window.localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue): initialTasks;
    } catch (error) {
      console.error('Error reading localStorage key “' + key + '”: ', error);
      return initialTasks;
    }
  });

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};
