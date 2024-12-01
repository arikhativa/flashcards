import {KnowledgeLevel} from '../types/KnowledgeLevel';
import {CardCreate} from '../types/Card';
import {TagCreate} from '../types/Tag';

export const CARDS: CardCreate[] = [
  {
    sideA: 'Manger',
    sideB: 'To eat',
    comment: 'a simple verb',
    knowledgeLevel: KnowledgeLevel.Learning,
  },
  {
    sideA: 'Placard',
    sideB: 'closet',
    comment: '',
    knowledgeLevel: KnowledgeLevel.Learning,
  },
  {
    sideA: 'ver',
    sideB: 'glass',
    comment: '',
    knowledgeLevel: KnowledgeLevel.Learning,
  },
  {
    sideA: 'Pomme',
    sideB: 'Apple',
    comment: 'it is like Adams',
    knowledgeLevel: KnowledgeLevel.GettingThere,
  },
  {
    sideA: 'Port',
    sideB: 'Door',
    comment: '',
    knowledgeLevel: KnowledgeLevel.GettingThere,
  },
  {
    sideA: 'jour',
    sideB: 'day',
    comment: '',
    knowledgeLevel: KnowledgeLevel.Confident,
  },
  {
    sideA: 'il y a',
    sideB: 'there is',
    comment: '',
    knowledgeLevel: KnowledgeLevel.Confident,
  },
  {
    sideA: 'il fait chaud',
    sideB: "it's hot",
    comment: '',
    knowledgeLevel: KnowledgeLevel.Confident,
  },
  {
    sideA: 'quelque chose',
    sideB: 'something',
    comment: '',
    knowledgeLevel: KnowledgeLevel.Confident,
  },
  {
    sideA: 'ou est la rue?',
    sideB: 'where is the street?',
    comment: '',
    knowledgeLevel: KnowledgeLevel.Confident,
  },
  {
    sideA: 'Agriculture',
    sideB: 'Farming',
    comment: '',
    knowledgeLevel: KnowledgeLevel.Confident,
  },
  {
    sideA: 'Récolte',
    sideB: 'Harvest',
    comment: '',
    knowledgeLevel: KnowledgeLevel.Learning,
  },
  {
    sideA: 'Sol',
    sideB: 'Soil',
    comment: '',
    knowledgeLevel: KnowledgeLevel.Learning,
  },
  {
    sideA: 'Vache',
    sideB: 'Cow',
    comment: '',
    knowledgeLevel: KnowledgeLevel.Confident,
  },
  {
    sideA: 'Bétail',
    sideB: 'Livestock',
    comment: '',
    knowledgeLevel: KnowledgeLevel.GettingThere,
  },
  {
    sideA: 'Chèvre',
    sideB: 'Goat',
    comment: '',
    knowledgeLevel: KnowledgeLevel.Confident,
  },
  {
    sideA: 'Labour',
    sideB: 'Plowing',
    comment: '',
    knowledgeLevel: KnowledgeLevel.Confident,
  },
  {
    sideA: 'Graine',
    sideB: 'Seed',
    comment: '',
    knowledgeLevel: KnowledgeLevel.Confident,
  },
  {
    sideA: 'Durabilité',
    sideB: 'Sustainability',
    comment: '',
    knowledgeLevel: KnowledgeLevel.Learning,
  },
  {
    sideA: 'Grange',
    sideB: 'Barn',
    comment: '',
    knowledgeLevel: KnowledgeLevel.GettingThere,
  },
];

export const TAGS: TagCreate[] = [
  {
    name: 'verbs',
  },
  {
    name: 'Phrases',
  },
  {
    name: 'Nouns',
  },
  {
    name: 'Food',
  },
  {
    name: 'Agriculture',
  },
];
