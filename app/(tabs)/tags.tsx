import Tags from "@/components/tags/Tags";
import { useStore } from "@/providers/GlobalStore";

export default function TagsScreen() {
  const { tags, tagService } = useStore();

  return <Tags tags={tags} tagService={tagService} />;
}
