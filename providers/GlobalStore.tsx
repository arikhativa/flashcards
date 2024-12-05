import React from 'react';
import {createContext, useContext, useEffect, useState, ReactNode} from 'react';
import {Card} from '../types/Card';
import {Tag} from '../types/Tag';
import {MetadataService} from '../services/Metadata';
import {CardService} from '../services/Card';
import {TagService} from '../services/Tag';
import {CardTagService} from '../services/CardTag';
import {ConfService} from '../services/Conf';
import {Repositories} from '../schemas/schemas';
import {Conf} from '../types/Conf';
import {CARDS, TAGS} from '../constants/db';
import {Metadata} from '../types/Metadata';
import {useKeyboardHeight} from '../hooks/useKeyboardHeight';
import {useServices} from '../hooks/useServices';

export interface StoreContextType {
  cards: Card[];
  tags: Tag[];
  conf: Conf;
  metadata: Metadata;
  metadataService: MetadataService;
  cardService: CardService;
  tagService: TagService;
  cardTagService: CardTagService;
  confService: ConfService;
  keyboardHeight: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({
  children,
  repos,
}: {
  children: ReactNode;
  repos: Repositories;
}) => {
  const [dbIsReady, setDbIsReady] = useState(false);
  const {keyboardHeight} = useKeyboardHeight();

  const {
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
  } = useServices(repos);

  useEffect(() => {
    const init = async () => {
      const cards = await cardService.getAll();
      const conf = await confService.get();
      if (__DEV__ && (!cards || cards.length === 0) && !conf) {
        console.log('This is Dev and the DB is empty, adding items...');
        for (const card of CARDS) {
          await cardService.create(card);
        }
        for (const tag of TAGS) {
          await tagService.create(tag);
        }
        const cards = (await cardService.getAll()) || [];
        const tags = (await tagService.getAll()) || [];

        if (cards?.length === 0 || tags?.length === 0) {
          console.error('Failed to add items to the DB');
        }

        await cardTagService.link(1, 1); // Manger + verbs
        await cardTagService.link(2, 3); // Placard + nouns
        await cardTagService.link(3, 3); // ver + nouns
        await cardTagService.link(4, 3); // Pomme + nouns
        await cardTagService.link(4, 4); // Pomme + food
        await cardTagService.link(5, 3); // Port + nouns
        await cardTagService.link(6, 2); // jour + nouns
        await cardTagService.link(7, 2); // il y a + phrases
        await cardTagService.link(8, 2); // il fait chaud + phrases
        await cardTagService.link(9, 2); // quelque chose + phrases
        await cardTagService.link(10, 2); // ou est la rue? + phrases

        // Agriculture
        await cardTagService.link(11, 5); // Farm
        await cardTagService.link(12, 5); // Farm
        await cardTagService.link(13, 5); // Farm
        await cardTagService.link(14, 5); // Farm
        await cardTagService.link(15, 5); // Farm
        await cardTagService.link(16, 5); // Farm
        await cardTagService.link(17, 5); // Farm
        await cardTagService.link(18, 5); // Farm
        await cardTagService.link(19, 5); // Farm
        await cardTagService.link(20, 5); // Farm
      }

      setDbIsReady(true);
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO add a startup check that make sure all data is loaded
  useEffect(() => {
    if (dbIsReady) {
      fetchCards();
      fetchTags();
      confService.init();
      metadataService.init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbIsReady]);

  if (!dbIsReady) {
    return null;
  }

  return (
    <StoreContext.Provider
      value={{
        cards,
        tags,
        conf,
        metadata,
        metadataService,
        cardService,
        tagService,
        cardTagService,
        confService,
        keyboardHeight,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
