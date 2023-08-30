import { NDKEvent } from "@nostr-dev-kit/ndk";
import { TCommunity } from "src/types/Community";
import { getPublicKeys } from "./getPublicKeys";

export default function eventToCommunity(event: NDKEvent) {
  let community: TCommunity = {
    name: "",
    id: "",
    d: "",
    author: event.pubkey,
    moderators: [event.pubkey],
    eventId: event.id,
    tags: [],
  };

  event.tags.forEach((tag) => {
    if (tag[0] == "p" && tag[3] == "moderator") {
      const _npub = tag[1];
      const publicKeys = getPublicKeys(_npub);
      if (!community.moderators.includes(publicKeys.pk)) {
        community.moderators.push(publicKeys.pk);
      }
    } else if (tag[0] == "t") {
      community.tags.push(tag[1]);
    } else {
      //@ts-ignore
      community[tag[0] as string] = tag[1];
    }
  });

  community.id = `34550:${event.pubkey}:${community["d"]}`;

  if (community.name === undefined || community.name.length === 0) {
    community.name = community["d"];
  }

  return community;
}
