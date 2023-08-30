import { NDKEvent, NDKTag } from "@nostr-dev-kit/ndk";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNDK } from "src/context";
import { TNote } from "src/types/Note";

export function useFeedCommunityApprovePost() {
  const queryClient = useQueryClient();

  const { ndk, signPublishEvent } = useNDK();

  return useMutation(
    async (note: TNote) => {
      if (!ndk) return undefined;

      const aTags = note.tags.filter((t) => t[0] === "a");

      if (aTags.length === 1) {
        const newEvent = new NDKEvent();
        newEvent.kind = 4550;

        newEvent.content = JSON.stringify({
          id: note.id,
          content: note.content,
          created_at: note.created_at,
          kind: note.kind,
          pubkey: note.author,
          tags: note.tags,
        });

        let _tag: NDKTag[] = [];
        _tag.push(["a", `${aTags[0][1]}`, ""]);
        _tag.push(["e", `${note.id}`, "", "post-request-id"]);
        _tag.push(["p", `${note.author}`, "", "post-request-author-id"]);
        _tag.push(["k", note.kind!.toString()]);
        newEvent.tags = _tag;

        const success = await signPublishEvent(newEvent);

        if (success) return newEvent;
      }

      return undefined;
    },
    {
      onSettled: (event) => {
        if (event) {
          const aTags = event.tags.filter((t) => t[0] === "a");
          if (aTags.length == 1) {
            queryClient.invalidateQueries(["feed", aTags[0][1], "all"]);
            queryClient.invalidateQueries(["feed", aTags[0][1], "mod"]);
          }
        }
      },
    }
  );
}
