import { Card } from "@/types/Card";
import { TestSettings } from "@/types/TestSettings";

export function generateCardsForTest(
  allCards: Card[],
  testSettings: TestSettings
): Card[] {
  let smallList = createCardList(allCards, testSettings);
  let list: Card[] = [];

  const len = Math.min(smallList.length, testSettings.numberOfCards);

  for (let i = 0; i < len; i++) {
    const c = getRandomCard(smallList);
    smallList = smallList.filter((card) => card.id !== c.id);
    list.push(c);
  }
  return list;
}

export function createCardList(
  cards: Card[],
  testSettings: TestSettings
): Card[] {
  let list: Card[] = cards;
  const start = testSettings.timeRange.startDate;
  const end = testSettings.timeRange.endDate;

  if (start && end) {
    list = list.filter(
      (card) => card.createdAt >= start && card.createdAt <= end
    );
  }

  if (testSettings.knowledgeLevels) {
    list = list.filter((card) => {
      return testSettings.knowledgeLevels[card.knowledgeLevel];
    });
  }

  if (testSettings.selectedTags.length > 0) {
    list = list.filter((card) => {
      return testSettings.selectedTags.some((tag) => {
        return card.tags.map((e) => e.id).includes(tag.id);
      });
    });
  }

  return list;
}

export function getRandomCard(cards: Card[]): Card {
  return cards[Math.floor(Math.random() * cards.length)];
}
