import * as z from 'zod';

export const dateRangeSchema = z.object({
  dateFrom: z.date().nullable(),
  dateTo: z.date().nullable(),
});
