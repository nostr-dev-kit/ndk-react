import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery } from "@tanstack/react-query";
import { useNDK } from "src/context";
import { fetchNotes } from "src/utils/fetchNotes";

export function useFeedCommunities({
  ids,
  queryKey,
  showAllNotes = false,
  staleTime = 1000 * 60 * 60,
}: {
  ids: string[] | undefined;
  queryKey: string;
  showAllNotes?: boolean;
  staleTime?: number;
}) {
  const { ndk, fetchEventsEOSE } = useNDK();
  const { status, data, error, isFetching, refetch } = useQuery({
    enabled: ids !== undefined && !!ndk,
    queryKey: ["feed", queryKey, showAllNotes ? "all" : "mod"],
    queryFn: async () => {
      let filter: NDKFilter = {
        //@ts-ignore
        kinds: [4550],
        "#a": ids!,
      };

      if (showAllNotes) {
        filter = {
          kinds: [1],
          "#a": ids!,
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
