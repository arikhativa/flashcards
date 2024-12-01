import {Tag} from '../types/Tag';

// TODO use or remove this

export function useTagSection() {
  const addTag = (list: Tag[], tag: Tag, setList: (list: Tag[]) => void) => {
    if (list.find(t => t.id === tag.id)) {
      console.error('tag already exists');
      return;
    }
    list.push(tag);
    setList(list);
  };

  const removeTag = (list: Tag[], tag: Tag, setList: (list: Tag[]) => void) => {
    if (!list.find(t => t.id === tag.id)) {
      console.error("tag does not exists: can't remove");
      return;
    }
    setList(list);
  };

  return {addTag, removeTag};
}
