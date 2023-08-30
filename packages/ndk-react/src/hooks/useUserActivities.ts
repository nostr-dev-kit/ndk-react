import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery } from "@tanstack/react-query";
import { useNDK } from "src/context";
import { fetchNotes } from "src/utils/fetchNotes";

export function useUserActivities(
  pubkey: string | undefined,
  staleTime = 1000 * 60 * 60
) {
  const { ndk, fetchEventsEOSE } = useNDK();
  const { status, data, error, isFetching, refetch } = useQuery(
    ["user", pubkey, "activities"],
    async () => {
      const filter: NDKFilter = {
        kinds: [1],
        "#p": [pubkey!],
      };

      let notes = await fetchNotes({
        fetchEvents: fetchEventsEOSE,
        filter: filter,
      });

      notes = notes.filter((note) => note.author != pubkey);

      return notes;
    },
    {
      enabled: !!pubkey && !!ndk,
      staleTime: staleTime,
    }
  );

  return { status, data, error, isFetching, refetch };
}
