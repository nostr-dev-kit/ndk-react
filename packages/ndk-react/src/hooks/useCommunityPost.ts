import { NDKEvent } from "@nostr-dev-kit/ndk";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNDK } from "src/context";
import { TCommunity } from "src/types/Community";
import { getPublicKeys } from "src/utils/getPublicKeys";

export function useCommunityPost() {
  const queryClient = useQueryClient();

  const { ndk, signPublishEvent } = useNDK();

  return useMutation(
    async (community: TCommunity) => {
      if (!ndk) return undefined;

      const communityEvent = new NDKEvent();
      communityEvent.kind = 34550;

      communityEvent.tags = [
        ["d", community.d.split(" ").join("")],
        ["name", community.name],
      ];

      if (community.description && community.description.length > 0)
        communityEvent.tags.push(["description", community.description]);
      if (community.image && community.image.length > 0)
        communityEvent.tags.push(["image", community.image]);
      if (community.rules && community.rules.length > 0)
        communityEvent.tags.push(["rules", community.rules]);

      if (community.moderators) {
        community.moderators.forEach((moderator) => {
          const pks = getPublicKeys(moderator);
          communityEvent.tags.push(["p", pks.pk, "", "moderator"]);
        });
      }

      if (community.tags) {
        community.tags.forEach((tag) => {
          communityEvent.tags.push(["t", tag]);
        });
      }

      const success = await signPublishEvent(communityEvent);
      if (success) return { event: communityEvent, community: community };
      return undefined;
    },
    {
      onSettled: (event) => {
        if (event) {
          if (event) {
            queryClient.invalidateQueries(["communities", event.community.id]);
          }
        }
      },
    }
  );
}
