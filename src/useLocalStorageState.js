import { useEffect, useState } from "react";

export function useLocaclStorageState(initialState, key) {
  const [value, setValue] = useState(() => {
    const storedWatchlist = localStorage.getItem(key);
    return storedWatchlist ? JSON.parse(storedWatchlist) : initialState;
  });
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
