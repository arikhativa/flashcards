import {MetadataSchema} from '../schemas/schemas';

export type Metadata = Pick<MetadataSchema, 'cardsCreated'>;

export type MetadataUpdate = Partial<Metadata>;
