import Tags from "@/components/tags/Tags";
import { useMultiSelect } from "@/hooks/useMultiSelect";
import { useStore } from "@/providers/GlobalStore";

export default function TagsScreen() {
  const { tags, tagService, conf } = useStore();
  const multiSelect = useMultiSelect();

  return (
    <Tags
      conf={conf}
      tags={tags}
      tagService={tagService}
      multiSelect={multiSelect}
    />
  );
}
