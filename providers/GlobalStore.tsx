import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Card } from "@/types/Card";
import { Tag } from "@/types/Tag";
import { CardService } from "@/services/Card";
import { TagService } from "@/services/Tag";
import { CardTagService } from "@/services/CardTag";
import { ConfService } from "@/services/Conf";
import { Repository } from "typeorm";
import { CardSchema, ConfSchema, TagSchema } from "@/schemas/schemas";
import { Conf } from "@/types/Conf";
import { CARDS, TAGS } from "@/constants/db";

interface StoreContextType {
  cards: Card[];
  archiveCards: Card[];
  tags: Tag[];
  conf: Conf;
  cardService: CardService;
  tagService: TagService;
  cardTagService: CardTagService;
  confService: ConfService;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({
  children,
  cardRepository,
  tagRepository,
  confRepository,
}: {
  children: ReactNode;
  cardRepository: Repository<CardSchema>;
  tagRepository: Repository<TagSchema>;
  confRepository: Repository<ConfSchema>;
}) => {
  const [dbIsReady, setDbIsReady] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [archiveCards, setArchiveCards] = useState<Card[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [conf, setConf] = useState<Conf>(ConfService.EMPTY);

  const fetchAll = async () => {
    await fetchArchiveCards();
    await fetchCards();
    await fetchTags();
    await fetchConf();
  };

  const fetchConf = async () => {
    const conf = await confService.get();
    if (conf) setConf(conf);
  };

  const fetchArchiveCards = async () => {
    const list = await cardService.getAllArchive();

    if (list) {
      setArchiveCards(list.filter((e) => e.deletedAt));
    }
  };

  const fetchCards = async () => {
    const cardList = await cardService.getAll();
    if (cardList) setCards(cardList);
  };

  const fetchTags = async () => {
    const tagList = await tagService.getAll();
    if (tagList) setTags(tagList);
  };

  const cardService = new CardService(cardRepository, fetchAll);
  const tagService = new TagService(tagRepository, fetchAll);
  const cardTagService = new CardTagService(cardService, tagService);
  const confService = new ConfService(confRepository, fetchAll);

  useEffect(() => {
    const init = async () => {
      const cards = await cardService.getAll();
      const conf = await confService.get();
      if (__DEV__ && (!cards || cards.length === 0) && !conf) {
        console.log("This is Dev and the DB is empty, adding items...");
        for (const card of CARDS) {
          await cardService.create(card);
        }
        for (const tag of TAGS) {
          await tagService.create(tag);
        }
        const cards = (await cardService.getAll()) || [];
        const tags = (await tagService.getAll()) || [];

        if (cards?.length === 0 || tags?.length === 0) {
          console.error("Failed to add items to the DB");
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
      }

      setDbIsReady(true);
    };
    init();
  }, []);

  // TODO add a startup check that make sure all data is loaded
  useEffect(() => {
    if (dbIsReady) {
      fetchCards();
      fetchTags();
      confService.init();
    }
  }, [dbIsReady]);

  if (!dbIsReady) {
    return null;
  }

  return (
    <StoreContext.Provider
      value={{
        cards,
        archiveCards,
        tags,
        conf,
        cardService,
        tagService,
        cardTagService,
        confService,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
