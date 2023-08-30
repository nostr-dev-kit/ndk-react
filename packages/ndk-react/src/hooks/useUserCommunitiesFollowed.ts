import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery } from "@tanstack/react-query";
import { useNDK } from "src/context";

export function useUserCommunitiesFollowed(pubkey: string | undefined) {
  const { ndk, fetchEvents } = useNDK();
  const { status, data, error, isFetching, refetch } = useQuery(
    ["user", pubkey, "communities", "followed"],
    async () => {
      const filter: NDKFilter = {
        //@ts-ignore
        kinds: [30001],
        "#d": ["communities"],
        authors: [pubkey!],
      };
      let events = Array.from(await fetchEvents(filter));

      let ids = [];
      for (let e of events) {
        for (let tag of e.tags) {
          if (tag[0] === "e" || tag[0] === "a") {
            ids.push(tag[1]);
          }
        }
      }

      return ids;
    },
    {
      enabled: !!pubkey && !!ndk,
    }
  );

  return { status, data, error, isFetching, refetch };
}
