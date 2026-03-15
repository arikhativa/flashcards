import { Card } from '@/db/schema';
import { CardMeta } from '@/lib/types';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

const QUERY_KEY = ['useTestSummary'];

interface TestSummaryData {
  cardsToTest?: Card[];
  metadataList?: CardMeta[];
}

export default function useTestSummary() {
  const queryClient = useQueryClient();

  const query = useSuspenseQuery({
    queryKey: QUERY_KEY,
    initialData: {},
    staleTime: Infinity,
    queryFn: async (): Promise<TestSummaryData> => ({}),
  });

  const setData = (data: TestSummaryData) => {
    queryClient.setQueryData(QUERY_KEY, data);
  };

  const updateCard = (prev: TestSummaryData, cardId: Card['id'], updatedCard: Partial<Card>) => {
    queryClient.setQueryData(QUERY_KEY, {
      ...prev,
      cardsToTest: prev.cardsToTest?.map((card) =>
        card.id === cardId ? { ...card, ...updatedCard } : card
      ),
    });
  };

  return { setData, updateCard, data: query.data };
}
