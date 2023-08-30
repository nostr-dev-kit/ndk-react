import { TUserList } from "@/types/List";
import { NDKEvent } from "@nostr-dev-kit/ndk";

export default function eventToListUser(events: NDKEvent[]) {
  let _lists: { [id: string]: TUserList } = {};
  for (let e of events) {
    const dTags = e.tags.filter((t) => t[0] === "d");
    const pTags = e.tags.filter((t) => t[0] === "p").map((t) => t[1]);

    if (dTags.length === 0 || dTags.length > 1 || pTags.length === 0) continue;

    const id = dTags[0][1];
    if (id != "mute") {
      _lists[id] = { id, items: pTags, type: "user", pk: e.pubkey };
    }
  }

  return _lists;
}
