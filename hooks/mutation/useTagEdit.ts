import { Tag, TagInsert, tagTable, TagUpdate } from '@/db/schema';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';

export default function useTagEdit() {
  const create = async (tag: TagInsert) => {
    return db.insert(tagTable).values(tag);
  };

  const update = async (id: Tag['id'], tag: Partial<TagUpdate>) => {
    return db.update(tagTable).set(tag).where(eq(tagTable.id, id));
  };

  return { create, update };
}
