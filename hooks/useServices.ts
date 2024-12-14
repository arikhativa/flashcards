import {Repositories} from '../schemas/schemas';
import {CardService} from '../services/Card';
import {CardTagService} from '../services/CardTag';
import {ConfService} from '../services/Conf';
import {MetadataService} from '../services/Metadata';
import {TagService} from '../services/Tag';
import {Card} from '../types/Card';
import {Conf} from '../types/Conf';
import {Metadata} from '../types/Metadata';
import {Tag} from '../types/Tag';
import {useState} from 'react';
import {useList} from './useList';
import {ObjectLiteral} from 'typeorm';
import {BaseCrudService} from '../services/BaseCrud';
import {BaseCrud} from '../types/generic';

export function useServices(repos: Repositories) {
  const [archiveCards, setArchiveCards] = useState<Card[]>([]);
  const [cards, setCards, modifyCards, filterCards] = useList<Card>([]);
  const [tags, setTags, modifyTags, filterTags] = useList<Tag>([]);
  const [conf, setConf] = useState<Conf>(ConfService.EMPTY);
  const [metadata, setMetadata] = useState<Metadata>({} as Metadata);

  const fetchAll = async () => {
    // await fetchArchiveCards();
    await fetchCards();
    await fetchTags();
    await fetchConf();
    await fetchMetadata();
  };

  const fetchMetadata = async () => {
    const md = await metadataService.get();
    if (md) {
      setMetadata(md);
    }
  };

  const fetchConf = async () => {
    const conf = await confService.get();
    if (conf) {
      setConf(conf);
    }
  };

  // const fetchArchiveCards = async () => {
  //   const list = await cardService.getAllArchive();

  //   if (list) {
  //     setArchiveCards(list.filter((e) => e.deletedAt));
  //   }
  // };

  const fetchCards = async () => {
    const cardList = await cardService.getAll();
    if (cardList) {
      setCards(cardList);
    }
  };

  const fetchTags = async () => {
    const tagList = await tagService.getAll();
    if (tagList) {
      setTags(tagList);
    }
  };

  const metadataService = new MetadataService(
    repos.metadataRepository,
    fetchMetadata,
  );

  const handleCardUpdate = async (ids: Card['id'][]) => {
    if (!ids || !ids.length) {
      console.error('handleCardUpdate: no ids');
      return;
    }

    const getLinkedIds = (list: Card[]) => {
      const ret: Tag['id'][] = [];
      list.forEach(card => {
        card.tags.forEach(tag => {
          ret.push(tag.id);
        });
      });
      return ret;
    };

    await fetchItems<Card, Tag>(
      ids,
      cardService,
      tagService,
      filterCards,
      fetchTags,
      modifyCards,
      modifyTags,
      getLinkedIds,
    );
  };

  const handleTagUpdate = async (ids: Tag['id'][]) => {
    if (!ids || !ids.length) {
      console.error('handleTagUpdate: no ids');
      return;
    }

    const getLinkedIds = (list: Tag[]) => {
      const ret: Card['id'][] = [];
      list.forEach(tag => {
        tag.cards.forEach(c => {
          ret.push(c.id);
        });
      });
      return ret;
    };

    await fetchItems<Tag, Card>(
      ids,
      tagService,
      cardService,
      filterTags,
      fetchCards,
      modifyTags,
      modifyCards,
      getLinkedIds,
    );
  };

  const handleConfUpdate = async () => {
    await fetchConf();
  };

  const cardService = new CardService(repos.cardRepository, handleCardUpdate);
  const tagService = new TagService(repos.tagRepository, handleTagUpdate);
  const cardTagService = new CardTagService(cardService, tagService);
  const confService = new ConfService(repos.confRepository, handleConfUpdate);

  return {
    cards,
    tags,
    conf,
    metadata,
    cardService,
    tagService,
    cardTagService,
    confService,
    metadataService,
    fetchCards,
    fetchTags,
  };
}

// This does not work in case a card is removing a tag
// the tag will not be updated
// So i just call fetchLinked instead of specific items
async function fetchItems<M extends BaseCrud, L extends BaseCrud>(
  ids: M['id'][],
  mainService: BaseCrudService<M, ObjectLiteral, ObjectLiteral, ObjectLiteral>,
  linkedService: BaseCrudService<
    L,
    ObjectLiteral,
    ObjectLiteral,
    ObjectLiteral
  >,
  mainFilter: (ids: number[]) => void,
  fetchLinked: () => void,
  modifyMain: (list: M[]) => void,
  modifyLinked: (list: L[]) => void,
  getLinkedIds: (list: M[]) => L['id'][],
) {
  const dirtyMainItems = await mainService.getByIds(ids);

  // Delete Flow
  if (!dirtyMainItems || !dirtyMainItems.length) {
    mainFilter(ids);
    fetchLinked();
    return;
  }

  // const dirtyLinkedIds: L['id'][] = getLinkedIds(dirtyMainItems);

  // const dirtyTags = await linkedService.getByIds(dirtyLinkedIds);
  // if (dirtyTags) {
  //   modifyLinked(dirtyTags);
  // }

  fetchLinked();
  modifyMain(dirtyMainItems);
}
