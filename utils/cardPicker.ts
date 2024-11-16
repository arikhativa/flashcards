import { Card } from "@/types/Card";
import { TestSettings } from "@/types/TestSettings";

export function getMatchingCardsForTest(
  allCards: Card[],
  testSettings: TestSettings
): Card[] {
  let list: Card[] = allCards;

  list = filterViaTime(list, testSettings);
  list = filterViaKL(list, testSettings);
  list = filterViaTags(list, testSettings);

  return list;
}

export function generateSmallList(
  matchingCards: Card[],
  testSettings: TestSettings
) {
  let list: Card[] = [];

  const len = Math.min(matchingCards.length, testSettings.numberOfCards);

  for (let i = 0; i < len; i++) {
    const index = getRandomIndex(matchingCards);
    const [c] = matchingCards.splice(index, 1);
    list.push(c);
  }
  return list;
}

function filterViaTags(list: Card[], testSettings: TestSettings): Card[] {
  if (testSettings.selectedTags.length > 0) {
    list = list.filter((card) => {
      return testSettings.selectedTags.some((tag) => {
        return card.tags.map((e) => e.id).includes(tag.id);
      });
    });
  }
  return list;
}

function filterViaKL(list: Card[], testSettings: TestSettings): Card[] {
  if (testSettings.knowledgeLevels) {
    list = list.filter((card) => {
      return testSettings.knowledgeLevels[card.knowledgeLevel];
    });
  }

  return list;
}

function filterViaTime(list: Card[], testSettings: TestSettings): Card[] {
  const start = testSettings.timeRange.startDate;
  const end = testSettings.timeRange.endDate;

  if (start && end) {
    list = list.filter(
      (card) => card.createdAt >= start && card.createdAt <= end
    );
  }
  return list;
}

function getRandomIndex(cards: Card[]): number {
  return Math.floor(Math.random() * cards.length);
}
