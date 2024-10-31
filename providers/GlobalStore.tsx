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

interface StoreContextType {
  cards: Card[];
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
  const [cards, setCards] = useState<Card[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [conf, setConf] = useState<Conf>(ConfService.EMPTY);

  const fetchAll = async () => {
    await fetchCards();
    await fetchTags();
    await fetchConf();
  };

  const fetchConf = async () => {
    const conf = await confService.get();
    setConf(conf);
  };

  const fetchCards = async () => {
    const cardList = await cardService.getAll();
    setCards(cardList);
  };

  const fetchTags = async () => {
    const tagList = await tagService.getAll();
    setTags(tagList);
  };

  const cardService = new CardService(cardRepository, fetchAll);
  const tagService = new TagService(tagRepository, fetchAll);
  const cardTagService = new CardTagService(cardService, tagService);
  const confService = new ConfService(confRepository, fetchAll);

  useEffect(() => {
    fetchCards();
    fetchTags();
    confService.init();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        cards,
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
