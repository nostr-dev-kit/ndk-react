import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery } from "@tanstack/react-query";
import { useNDK } from "src/context";

export function useUserTopics(
  pubkey: string | undefined,
  staleTime = 1000 * 60 * 60
) {
  const { ndk, fetchEvents } = useNDK();
  const { status, data, error, isFetching } = useQuery(
    ["user", pubkey, "topics"],
    async () => {
      const filter: NDKFilter = {
        //@ts-ignore
        kinds: [30001],
        "#d": ["hashtags"],
        authors: [pubkey!],
      };
      let events = Array.from(await fetchEvents(filter));

      let _tags = [];
      for (let e of events) {
        for (let tag of e.tags) {
          if (tag[0] === "t") {
            _tags.push(tag[1]);
          }
        }
      }

      return _tags;
    },
    {
      enabled: !!pubkey && !!ndk,
      staleTime: staleTime,
    }
  );

  return { status, data, error, isFetching };
}
