import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery } from "@tanstack/react-query";
import { useNDK } from "src/context";

export function useCommunityFollowers(
  id: string | undefined,
  staleTime = 1000 * 60 * 60
) {
  const { ndk, fetchEvents } = useNDK();
  const { status, data, error, isFetching, refetch } = useQuery(
    ["communities", id, "followers"],
    async () => {
      const filter: NDKFilter = {
        //@ts-ignore
        kinds: [30001],
        "#a": [id!],
      };

      let events = Array.from(await fetchEvents(filter));

      const pubkeys = events.map((e) => {
        return e.pubkey;
      });
      return pubkeys;
    },
    {
      enabled: !!id && !!ndk,
      staleTime: staleTime,
    }
  );

  return { status, data, error, isFetching, refetch };
}
