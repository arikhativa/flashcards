import {useEffect, useState} from 'react';

export function useLoading() {
  const [isLoading, setIsLoading] = useState(false);
  const onUnmount = () => setIsLoading(false);

  useEffect(() => {
    return onUnmount;
  }, []);

  const setLoadingForTime = (time: number) => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), time);
  };

  const setLoading = (value: boolean) => {
    setIsLoading(value);
  };

  return {isLoading, setLoadingForTime, setLoading};
}
