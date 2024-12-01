import {CardSchema, TagSchema} from '../schemas/schemas';
import {Card, CardCreate, CardUpdate} from '../types/Card';
import {Repository} from 'typeorm';
import {BaseCrudService} from './BaseCrud';
import {isKnowledgeLevel} from '../utils/knowledgeLevel';
import {KnowledgeLevel} from '../types/KnowledgeLevel';

export class CardService extends BaseCrudService<
  Card,
  CardCreate,
  CardUpdate,
  CardSchema
> {
  static readonly EMPTY: CardCreate = {
    sideA: '',
    sideB: '',
    comment: '',
    knowledgeLevel: KnowledgeLevel.Learning,
  };

  constructor(
    repo: Repository<CardSchema>,
    onUpdate: (ids?: Card['id'][]) => void,
  ) {
    const relations = ['tags'];
    super(repo, onUpdate, relations);
  }

  // TODO test link to tag
  async create(payload: CardCreate): Promise<Card | null> {
    if (!isKnowledgeLevel(payload.knowledgeLevel)) {
      payload.knowledgeLevel = KnowledgeLevel.Learning;
    }

    if (payload.tags) {
      const tags: TagSchema[] = [];

      for (const tag of payload.tags) {
        if (typeof tag === 'number') {
          const tagEntity = await this.repo.manager.findOne(TagSchema, {
            where: {id: tag},
          });

          if (tagEntity) {
            tags.push(tagEntity);
          }
        } else {
          tags.push(tag);
        }
      }

      payload.tags = tags;
    }

    return super.create(payload);
  }

  async update(id: CardSchema['id'], payload: CardUpdate) {
    if (!isKnowledgeLevel(payload.knowledgeLevel as string)) {
      payload.knowledgeLevel = KnowledgeLevel.Learning;
    }

    return super.update(id, payload);
  }
}
