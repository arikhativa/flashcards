import Tags from "@/components/tags/Tags";
import { useMultiSelect } from "@/hooks/useMultiSelect";
import { useStore } from "@/providers/GlobalStore";

export default function TagsScreen() {
  const { tags, tagService } = useStore();
  const multiSelect = useMultiSelect();

  return <Tags tags={tags} tagService={tagService} multiSelect={multiSelect} />;
}
