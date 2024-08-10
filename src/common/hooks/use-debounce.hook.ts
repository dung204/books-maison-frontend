import { useLayoutEffect, useMemo, useRef } from 'react';

export default function useDebounce<TFunc extends (...args: any) => any>(
  callback: TFunc,
  delayMs: number,
) {
  const callbackRef = useRef(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  let timer: NodeJS.Timeout;
  const internalDebounce = (
    func: TFunc,
    delayMs: number,
    ...args: Parameters<TFunc>
  ) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delayMs);
  };

  return useMemo(
    () =>
      (...args: Parameters<TFunc>) =>
        internalDebounce(callbackRef.current, delayMs, ...args),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [delayMs],
  );
}
