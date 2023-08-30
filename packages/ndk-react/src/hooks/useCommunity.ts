import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNDK } from "src/context";
import { TCommunity } from "src/types/Community";
import eventToCommunity from "src/utils/eventToCommunities";

export function useCommunity(
  id: string | undefined,
  staleTime = 1000 * 60 * 60
) {
  const queryClient = useQueryClient();
  const { ndk, fetchEvents } = useNDK();
  const { status, data, error, isFetching } = useQuery(
    ["communities", id],
    async () => {
      const [_, author, d] = id!.split(":");

      const filter: NDKFilter = {
        //@ts-ignore
        kinds: [34550],
        authors: [author],
        "#d": [d],
      };
      const events = await fetchEvents(filter);

      if (events.length === 0) throw new Error("Community not found");

      const community = eventToCommunity(events[0]);
      return community;
    },
    {
      enabled: !!id && !!ndk,
      staleTime: staleTime,
      initialData: () => {
        const communities = queryClient.getQueryData([
          "communities",
        ]) as TCommunity[];
        const community = communities?.find((c) => c.id === id);
        return community;
      },
    }
  );

  return { status, data, error, isFetching };
}
