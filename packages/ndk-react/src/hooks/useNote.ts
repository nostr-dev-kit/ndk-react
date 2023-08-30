import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery } from "@tanstack/react-query";
import { useNDK } from "src/context";
import { fetchNotes } from "src/utils/fetchNotes";

export function useNote(
  eventId: string | undefined,
  removeReplies?: boolean,
  staleTime = 1000 * 60 * 60
) {
  const { ndk, fetchEvents } = useNDK();
  const { status, data, error, isFetching } = useQuery({
    enabled: eventId !== undefined && !!ndk,
    queryKey: ["note", eventId],
    queryFn: async () => {
      const filter: NDKFilter = {
        kinds: [1],
        ids: [eventId!],
      };

      let notes = await fetchNotes({
        fetchEvents: fetchEvents,
        filter: filter,
        removeReplies: removeReplies,
      });

      return notes[0] || null;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: staleTime,
  });

  return { status, data, error, isFetching };
}
