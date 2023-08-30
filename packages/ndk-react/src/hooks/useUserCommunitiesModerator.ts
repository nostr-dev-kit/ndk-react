import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNDK } from "src/context";
import { TCommunity } from "src/types/Community";
import eventToCommunity from "src/utils/eventToCommunities";

export function useUserCommunitiesModerator(
  pubkey: string | undefined,
  staleTime = 1000 * 60 * 60
) {
  const queryClient = useQueryClient();

  const { ndk, fetchEvents } = useNDK();
  const { status, data, error, isFetching, refetch } = useQuery(
    ["user", pubkey, "communities", "moderator"],
    async () => {
      const filter: NDKFilter = {
        //@ts-ignore
        kinds: [34550],
        "#p": [pubkey!],
      };
      const events = await fetchEvents(filter);

      const communities = events.map((event) => {
        return eventToCommunity(event);
      });
      return communities;
    },
    {
      enabled: !!pubkey && !!ndk,
      staleTime: staleTime,
      initialData: () => {
        const communities = queryClient.getQueryData([
          "communities",
        ]) as TCommunity[];
        if (communities) {
          return communities.filter((c) => c.moderators.includes(pubkey!));
        } else {
          return undefined;
        }
      },
    }
  );

  return { status, data, error, isFetching, refetch };
}
