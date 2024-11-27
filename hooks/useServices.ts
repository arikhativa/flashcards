import { Repositories } from "@/schemas/schemas";
import { CardService } from "@/services/Card";
import { CardTagService } from "@/services/CardTag";
import { ConfService } from "@/services/Conf";
import { MetadataService } from "@/services/Metadata";
import { TagService } from "@/services/Tag";
import { Card } from "@/types/Card";
import { Conf } from "@/types/Conf";
import { Metadata } from "@/types/Metadata";
import { Tag } from "@/types/Tag";
import { useState } from "react";

export function useServices(repos: Repositories) {
  const [archiveCards, setArchiveCards] = useState<Card[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
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
    if (md) setMetadata(md);
  };

  const fetchConf = async () => {
    const conf = await confService.get();
    if (conf) setConf(conf);
  };

  // const fetchArchiveCards = async () => {
  //   const list = await cardService.getAllArchive();

  //   if (list) {
  //     setArchiveCards(list.filter((e) => e.deletedAt));
  //   }
  // };

  const fetchCards = async () => {
    const cardList = await cardService.getAll();
    if (cardList) setCards(cardList);
  };

  // const fetchSpecificCards = async (ids: Card["id"][]) => {
  //   const dirtyCards = await cardService.getByIds(ids);

  //   if (!dirtyCards || !dirtyCards.length) return;

  //   let dirtyTagIds: Tag["id"][] = [];

  //   dirtyCards.forEach((card) => {
  //     card.tags.forEach((tag) => {
  //       dirtyTagIds.push(tag.id);
  //     });
  //   });

  //   const dirtyTags = await tagService.getByIds(dirtyTagIds);
  //   if (dirtyTags) {
  //     const tagMap = new Map(tags.map((tag) => [tag.id, tag]));
  //     dirtyTags.forEach((tag) => {
  //       tagMap.set(tag.id, tag);
  //     });
  //     setTags(Array.from(tagMap.values()));
  //   }

  //   const cardMap = new Map(cards.map((card) => [card.id, card]));
  //   dirtyCards.forEach((card) => {
  //     cardMap.set(card.id, card);
  //   });
  //   setCards(Array.from(cardMap.values()));
  // };

  const fetchTags = async () => {
    const tagList = await tagService.getAll();
    if (tagList) setTags(tagList);
  };

  const metadataService = new MetadataService(
    repos.metadataRepository,
    fetchMetadata
  );

  const handleCardUpdate = async () => {
    await fetchCards();
    await fetchTags();
  };

  const handleTagUpdate = async () => {
    await fetchCards();
    await fetchTags();
  };

  const handleConfUpdate = async () => {
    await fetchCards();
    await fetchTags();
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
