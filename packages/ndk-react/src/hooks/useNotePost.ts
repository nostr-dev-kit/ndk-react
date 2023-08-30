import { NDKEvent } from "@nostr-dev-kit/ndk";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNDK } from "src/context";

export function useNotePost() {
  const queryClient = useQueryClient();

  const { ndk, signPublishEvent } = useNDK();

  return useMutation(
    async ({
      event,
      isUserFollowings,
      isCommunity,
      isReply,
    }: {
      event: NDKEvent;
      isUserFollowings?: boolean;
      isCommunity?: string;
      isReply?: string;
    }) => {
      if (!ndk) return undefined;

      const success = await signPublishEvent(event);
      if (success)
        return { event: success, isUserFollowings, isCommunity, isReply };
      return undefined;
    },
    {
      onSettled: (res) => {
        if (res) {
          if (res.isCommunity) {
            queryClient.invalidateQueries(["feed", res.isCommunity, "all"]);
            queryClient.invalidateQueries(["feed", res.isCommunity, "mod"]);
          }
          if (res.isReply) {
            queryClient.invalidateQueries(["note", res.isReply, "replies"]);
          }

          if (res.isUserFollowings) {
            queryClient.invalidateQueries(["feed", "followings"]);
          }
        }
      },
    }
  );
}
