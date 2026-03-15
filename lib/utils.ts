import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SelectOption } from '../components/form/SelectField';
import { knowledgeLevelEnum, KnowledgeLevelEnum } from '@/lib/enums';

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

export function enumToSelectOption(enumObj: object): SelectOption[] {
  return Object.entries(enumObj).map(([key, value]) => ({
    label: key,
    value: value,
  }));
}

export function increaseKL(kl: KnowledgeLevelEnum): KnowledgeLevelEnum {
  switch (kl) {
    case knowledgeLevelEnum.Learning:
      return knowledgeLevelEnum.GettingThere;
    case knowledgeLevelEnum.GettingThere:
      return knowledgeLevelEnum.Confident;
    case knowledgeLevelEnum.Confident:
      return knowledgeLevelEnum.Confident;
  }
}

export function decreaseKL(kl: KnowledgeLevelEnum): KnowledgeLevelEnum {
  switch (kl) {
    case knowledgeLevelEnum.Confident:
      return knowledgeLevelEnum.GettingThere;
    case knowledgeLevelEnum.GettingThere:
      return knowledgeLevelEnum.Learning;
    case knowledgeLevelEnum.Learning:
      return knowledgeLevelEnum.Learning;
  }
}
