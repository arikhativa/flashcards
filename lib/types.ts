import { BuildQueryResult, ExtractTablesWithRelations } from 'drizzle-orm';
import * as schema from '@/db/schema';

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
