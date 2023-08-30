import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery } from "@tanstack/react-query";
import { useNDK } from "src/context";
import { fetchNotes } from "src/utils/fetchNotes";

export function useFeedTags(
  tags: string[] | undefined,
  queryKey: string | undefined,
  isRemoveSpam: boolean = true,
  staleTime = 1000 * 60 * 60
) {
  const { ndk, fetchEventsEOSE } = useNDK();

  const { status, data, error, isFetching, refetch } = useQuery({
    enabled: tags !== undefined && queryKey !== undefined && !!ndk,
    queryKey: ["feed", "tags", queryKey],
    queryFn: async () => {
      const filter: NDKFilter = {
        kinds: [1],
        "#t": tags!,
      };

      let notes = await fetchNotes({
        fetchEvents: fetchEventsEOSE,
        filter: filter,
        removeReplies: true,
        removeManyTags: isRemoveSpam ? 3 : 0,
      });

      return notes;
    },
    staleTime: staleTime,
  });

  return { status, data, error, isFetching, refetch };
}
