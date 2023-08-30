import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery } from "@tanstack/react-query";
import { useNDK } from "src/context";
import { fetchNotes } from "src/utils/fetchNotes";

export function useFeedAuthors(
  authors: string[] | undefined,
  queryKey: string | undefined,
  staleTime = 1000 * 60 * 60
) {
  const { ndk, fetchEventsEOSE } = useNDK();
  const { status, data, error, isFetching, refetch } = useQuery({
    enabled: authors !== undefined && queryKey !== undefined && !!ndk,
    queryKey: ["feed", queryKey],
    queryFn: async () => {
      const filter: NDKFilter = {
        kinds: [1],
        authors: authors,
      };

      let notes = await fetchNotes({
        fetchEvents: fetchEventsEOSE,
        filter: filter,
        removeReplies: true,
      });

      return notes;
    },
    staleTime: staleTime,
  });

  return { status, data, error, isFetching, refetch };
}
