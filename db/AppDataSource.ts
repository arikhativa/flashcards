import 'reflect-metadata';

import {CardSchema, ConfSchema, MetadataSchema, TagSchema} from './schemas';
import {DataSource} from 'typeorm';
import {migrations} from './migrations';

const DB_NAME = 'flashcards.db';

import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm/browser';

@Entity('author')
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({nullable: true})
  birthdate: string;
}

export const AppDataSource = new DataSource({
  database: DB_NAME,
  type: 'react-native',
  location: 'default',
  entities: [],
  // entities: [CardSchema, TagSchema, ConfSchema, MetadataSchema],
  synchronize: false,
  logging: false,
  migrations: [...migrations],
});
