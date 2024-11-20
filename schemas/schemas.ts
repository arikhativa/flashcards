import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  DeleteDateColumn,
} from "typeorm";

@Entity()
export class CardSchema extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
  @DeleteDateColumn() deletedAt?: Date;

  @Column({ type: "text" })
  sideA: string;

  @Column({ type: "text" })
  sideB: string;

  @Column({ type: "text", default: "" })
  comment: string;

  @Column({ nullable: true, type: "datetime" })
  lastTimeTested: Date;

  // NOTE - this is an enum of type KnowledgeLevel
  @Column({
    type: "text",
    length: 16,
    default: 0,
  })
  knowledgeLevel: string;

  @Column({ type: "integer", default: 0 })
  succuss: number;

  @Column({ type: "integer", default: 0 })
  failure: number;

  @ManyToMany(() => TagSchema, (tag) => tag.cards, { nullable: true })
  @JoinTable()
  tags: TagSchema[];
}

@Entity()
export class TagSchema extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
  @DeleteDateColumn() deletedAt?: Date;

  @Column({ type: "text" })
  name: string;

  @ManyToMany(() => CardSchema, (card) => card.tags, { nullable: true })
  cards: CardSchema[];
}

// NOTE - make sure there is only one entity of Conf
@Entity()
export class ConfSchema extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;

  @Column({ type: "text", default: "A" })
  sideA: string;

  @Column({ type: "text", default: "B" })
  sideB: string;

  @Column({ type: "text", default: "A" })
  testSide: string;

  @Column({ type: "integer", default: 10 })
  numberOfCards: number;
}

// NOTE - make sure there is only one entity
@Entity()
export class MetadataSchema extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;

  @Column({ type: "integer", default: 0 })
  cardsCreated: number;
}
