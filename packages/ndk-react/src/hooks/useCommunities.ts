import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNDK } from "src/context";
import { TCommunity } from "src/types/Community";
import eventToCommunity from "src/utils/eventToCommunities";

export function useCommunities(staleTime = 1000 * 60 * 60) {
  const queryClient = useQueryClient();

  const { ndk, fetchEventsEOSE } = useNDK();
  const { status, data, error, isFetching, refetch } = useQuery(
    ["communities"],
    async () => {
      let existingCommunities: TCommunity[] = [];

      const _existingCommunities = queryClient.getQueryData([
        "communities",
      ]) as TCommunity[];

      if (_existingCommunities) {
        existingCommunities = _existingCommunities;
      }

      const existingCommuntiesIds = existingCommunities.map((community) => {
        return community.id;
      });

      const filter: NDKFilter = {
        //@ts-ignore
        kinds: [34550],
      };
      const events = await fetchEventsEOSE(filter);
      const newCommunities = events
        .map((event) => {
          return eventToCommunity(event);
        })
        .filter((community) => {
          return !existingCommuntiesIds.includes(community.id);
        });

      const communities = existingCommunities.concat(newCommunities);

      return communities;
    },
    {
      enabled: !!ndk,
      staleTime: staleTime,
    }
  );

  return { status, data, error, isFetching, refetch };
}
