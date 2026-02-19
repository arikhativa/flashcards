import { Config } from '@/db/schema';
import { View } from 'react-native';
import * as z from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAutoSubmit } from '@/hooks/useAutoSubmit';
import useConfigEdit from '@/hooks/mutation/useConfigEdit';
import { queryKeyStore } from '@/lib/queryKeyStore';
import { STRINGS } from '@/lib/strings';
import Field from '@/components/form/Field';

const formSchema = z.object({
  sideA: z.string().min(1),
  sideB: z.string().min(1),
});

export type FormSchema = z.infer<typeof formSchema>;

interface Props {
  conf: Config;
}

export default function SettingsForm({ conf }: Props) {
  const { update } = useConfigEdit();
  const query = useQueryClient();

  const {
    trigger,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormSchema>({
    defaultValues: conf,
    resolver: zodResolver(formSchema),
  });

  const { mutate } = useMutation({
    mutationFn: async (variables: FormSchema) => {
      return update(variables);
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: queryKeyStore.config.one.queryKey });
    },
    onError: (e) => {
      console.error('mutate err: ', e);
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = (data: FormSchema) => {
    mutate(data);
  };

  useAutoSubmit({
    trigger,
    watch,
    onSubmit: handleSubmit(onSubmit),
  });

  return (
    <>
      <Field
        name="sideA"
        control={control}
        labelId={'settings-side-a'}
        labelText={STRINGS.settings.sideA}
      />

      <Field
        name="sideB"
        control={control}
        labelId={'settings-side-b'}
        labelText={STRINGS.settings.sideB}
      />
    </>
  );
}
