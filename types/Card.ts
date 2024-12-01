import {CardSchema, TagSchema} from '../schemas/schemas';
import {KnowledgeLevel} from './KnowledgeLevel';

export type Card = Omit<CardSchema, 'knowledgeLevel'> & {
  knowledgeLevel: KnowledgeLevel;
};

export type CardCreate = Pick<Card, 'sideA' | 'sideB' | 'comment'> & {
  tags?: TagSchema[];
  knowledgeLevel: KnowledgeLevel;
};

export type CardUpdate = Omit<Card, 'id' | 'createdAt' | 'updatedAt'>;
