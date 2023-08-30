import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery } from "@tanstack/react-query";
import { useNDK } from "src/context";
import { getPublicKeys } from "src/utils/getPublicKeys";

export function useUserFollowings(
  npubOrPk: string | undefined,
  staleTime = 1000 * 60 * 60
) {
  let pubkey = npubOrPk;

  if (npubOrPk && npubOrPk.includes("npub"))
    pubkey = getPublicKeys(npubOrPk).pk;

  const { ndk, fetchEvents } = useNDK();
  const { status, data, error, isFetching, refetch } = useQuery(
    ["user", pubkey, "followings"],
    async () => {
      const filter: NDKFilter = { kinds: [3], authors: [pubkey!] };
      const events = await fetchEvents(filter);

      const event = [...events].slice(-1)[0];

      const pubkeys = event.tags.filter((t) => t[0] === "p").map((t) => t[1]);
      return pubkeys;
    },
    {
      enabled: !!pubkey && !!ndk,
      staleTime: staleTime,
    }
  );

  return { status, data, error, isFetching, refetch };
}
