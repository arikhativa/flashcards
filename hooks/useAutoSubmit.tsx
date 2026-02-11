// NOTE: this code is from https://dev.to/yehor_kardash_2d268868708/automatically-submitting-forms-in-react-hook-form-3imk
import { useCallback, useEffect, useState } from 'react';
import { DEBOUNCE_FORM_DELAY } from '@/lib/constants';
import { debounce } from '@/lib/utils';
import type { FieldValues, Path, UseFormTrigger, UseFormWatch } from 'react-hook-form';

interface AutoSubmitProps<T extends FieldValues> {
  trigger: UseFormTrigger<T>;
  watch: UseFormWatch<T>;
  excludeFields?: Path<T>[];
  onSubmit: () => void;
  onValidationFailed?: () => void;
  debounceTime?: number;
}

export const useAutoSubmit = <T extends FieldValues>({
  trigger,
  watch,
  onSubmit,
  debounceTime = DEBOUNCE_FORM_DELAY,
  excludeFields,
  onValidationFailed,
}: AutoSubmitProps<T>) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debouncedSubmit = useCallback(
    debounce((submitFn: () => void) => {
      submitFn();
    }, debounceTime),
    []
  );

  useEffect(() => {
    const subscription = watch((_data, info) => {
      if (info.type !== 'change') return;
      if (info.name && excludeFields?.includes(info.name)) return;
      setIsSubmitting(true);
      trigger()
        .then((valid) => {
          if (valid) debouncedSubmit(onSubmit);
          else onValidationFailed?.();
        })
        .finally(() => setIsSubmitting(false));
    });
    return () => subscription.unsubscribe();
  }, [watch, onSubmit]);

  return { isSubmitting, manualSubmit: onSubmit };
};
