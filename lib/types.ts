import { BuildQueryResult, ExtractTablesWithRelations } from 'drizzle-orm';
import * as schema from '@/db/schema';
import * as z from 'zod';
import { testSettingsSchema } from '@/components/provider/TestProvider';

type TSchema = ExtractTablesWithRelations<typeof schema>;

export type RawCard = BuildQueryResult<
  TSchema,
  TSchema['cardTable'],
  {
    with: {
      tagList: {
        with: {
          tag: true;
        };
      };
    };
  }
>;

export type RawTag = BuildQueryResult<
  TSchema,
  TSchema['tagTable'],
  {
    with: {
      cardList: {
        with: {
          card: true;
        };
      };
    };
  }
>;

export const CARD_SIDE_VALUE = ['A', 'B'] as const;
export type CardSide = z.infer<typeof testSettingsSchema>['testSide'];
