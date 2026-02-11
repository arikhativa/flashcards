import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<T>(func: (args: T) => void, delay: number) {
  let timeout: number;
  return function (args: T) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(args), delay);
  };
}
