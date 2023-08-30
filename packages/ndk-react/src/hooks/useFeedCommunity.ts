import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery } from "@tanstack/react-query";
import { useNDK } from "src/context";
import { fetchNotes } from "src/utils/fetchNotes";

export function useFeedCommunity(
  id: string | undefined,
  moderators: string[] | undefined,
  showAllNotes = false,
  staleTime = 1000 * 60 * 60
) {
  const { ndk, fetchEventsEOSE } = useNDK();
  const { status, data, error, isFetching, refetch } = useQuery({
    enabled: id !== undefined && moderators !== undefined && !!ndk,
    queryKey: ["feed", id, showAllNotes ? "all" : "mod"],
    queryFn: async () => {
      let filter: NDKFilter = {
        //@ts-ignore
        kinds: [4550],
        authors: moderators,
        "#a": [id!],
      };

      if (showAllNotes) {
        filter = {
          kinds: [1],
          "#a": [id!],
        };
      }

      let notes = await fetchNotes({
        fetchEvents: fetchEventsEOSE,
        filter: filter,
      });

      return notes;
    },
    staleTime: staleTime,
  });

  return { status, data, error, isFetching, refetch };
}
