import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery } from "@tanstack/react-query";
import { useNDK } from "src/context";
import { fetchNotes } from "src/utils/fetchNotes";

export function useFeedCommunitiesGlobal(staleTime = 1000 * 60 * 60) {
  const { ndk, fetchEventsEOSE } = useNDK();
  const { status, data, error, isFetching, refetch } = useQuery({
    enabled: !!ndk,
    queryKey: ["feed", "globalCommunities"],
    queryFn: async () => {
      let filter: NDKFilter = {
        //@ts-ignore
        kinds: [4550],
      };

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
