import { useEffect, useState } from "react";
import { TCommunity } from "src/types/Community";
import { TNote } from "src/types/Note";
import { useFeedCommunity } from "./useFeedCommunity";

export function useFeedCommunityApprove(community: TCommunity | undefined) {
  const [pendingNotes, setPendingNotes] = useState<TNote[]>([]);

  const { data: allNotes } = useFeedCommunity(
    community?.id,
    community?.moderators,
    true
  );

  const { data: approvedNotes, status } = useFeedCommunity(
    community?.id,
    community?.moderators,
    false
  );

  useEffect(() => {
    if (allNotes == undefined || approvedNotes == undefined) return undefined;

    const approvedEventIds = approvedNotes?.map((e) => e.id);

    const _pendingNotes =
      approvedEventIds &&
      allNotes?.filter(function (e) {
        return !approvedEventIds.includes(e.id);
      });

    setPendingNotes(_pendingNotes!);
  }, [allNotes, approvedNotes]);

  return { pendingNotes, status };
}
