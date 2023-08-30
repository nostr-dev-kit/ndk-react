import { NDKEvent } from "@nostr-dev-kit/ndk";
import { TNote } from "src/types/Note";

export default function eventToNote(event: NDKEvent) {
  let tags = event.tags;

  const isKind4550 = event.kind == 4550;

  if (isKind4550 && event.content.substring(0, 1) == "{") {
    event = JSON.parse(event.content);
  }

  let note: TNote = {
    id: event.id,
    content: event.content,
    author: event.pubkey,
    created_at: event.created_at,
    tags: event.tags,
    kind: event.kind ? event.kind : 1,
  };

  if (isKind4550) {
    const eTags = tags.filter((t) => t[0] === "e");
    if (eTags.length == 1) {
      note.requestEventId = eTags[0][1];
    } else if (eTags.length > 1) {
      const eTags = tags.filter((t) => t[3] === "post-request-id");
      if (eTags.length == 1) {
        note.requestEventId = eTags[0][1];
      }
    }

    // try to get the request event
    if (note.requestEventId === undefined) {
      note.requestEventId = eTags[0][1];
    }
  }

  const aTags = tags.filter((t) => t[0] === "a");
  if (aTags.length === 1) {
    const aTag = aTags[0][1];
    const aTagSplit = aTag.split(":");
    if (aTagSplit[0] === "34550") {
      note.communityId = aTag;
    }
  }

  return note;
}
