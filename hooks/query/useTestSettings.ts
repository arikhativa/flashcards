import { Config } from '@/db/schema';
import useConfigEdit from '@/hooks/mutation/useConfigEdit';
import { useSuspenseConfig } from '@/hooks/query/useConfig';
import { knowledgeLevelEnum, knowledgeLevelEnumArray } from '@/lib/enums';
import { queryKeyStore } from '@/lib/queryKeyStore';
import { isTestSetting } from '@/lib/typeGuards';
import { CARD_SIDE_VALUE } from '@/lib/types';
import { useMutation, useQueryClient, UseMutateFunction } from '@tanstack/react-query';
import * as z from 'zod';
import { dateRangeSchema } from '@/lib/zodSchemas';

export type SetTestSettingsType = UseMutateFunction<unknown, unknown, TestSettings, unknown>;

export const testSettingsSchema = z.object({
  numberOfCards: z.number().min(1),
  testSide: z.enum(CARD_SIDE_VALUE),
  range: dateRangeSchema,
  knowledgeLevelList: z
    .array(z.enum(knowledgeLevelEnum))
    .min(1)
    .max(knowledgeLevelEnumArray.length),
  cardIdsToTest: z.array(z.number()).optional(),
  tagIdsToTest: z.array(z.number()).optional(),
});

export type TestSettings = z.infer<typeof testSettingsSchema>;

export default function useTestSettings() {
  const queryClient = useQueryClient();
  const { data: config } = useSuspenseConfig();
  const { update } = useConfigEdit();

  const testSettings = isTestSetting(config.testSettings) ? config.testSettings : null;

  const { mutate } = useMutation({
    mutationFn: async (variables: TestSettings) => {
      return update({ testSettings: variables });
    },
    onSuccess: (_data, variables) => {
      queryClient.setQueryData<Config>(queryKeyStore.config.one.queryKey, () => ({
        ...config,
        cardListFilter: variables,
      }));
    },
  });

  return { testSettings, setTestSettings: mutate };
}
