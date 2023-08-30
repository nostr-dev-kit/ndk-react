import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery } from "@tanstack/react-query";
import { useNDK } from "src/context";
import { TUser } from "src/types/User";
import { getPublicKeys } from "src/utils/getPublicKeys";

export function useUserProfile(
  npubOrPk: string | undefined,
  staleTime = 1000 * 60 * 60
) {
  let pubkey = npubOrPk;

  if (npubOrPk && npubOrPk.includes("npub"))
    pubkey = getPublicKeys(npubOrPk).pk;

  const { ndk, fetchEvents } = useNDK();
  const { status, data, error, isFetching } = useQuery(
    ["user", pubkey, "profile"],
    async () => {
      const filter: NDKFilter = { kinds: [0], authors: [pubkey!] };
      const events = await fetchEvents(filter);

      const event = [...events].slice(-1)[0];

      const ndkuser = event.author;

      const profile = JSON.parse(event.content);

      const userDisplayName = profile
        ? profile.display_name
          ? profile.display_name
          : profile.displayName
          ? profile.displayName
          : profile.name
          ? profile.name
          : `${cleannpub(ndkuser.npub)}-`
        : `${cleannpub(ndkuser.npub)}.`;

      const userSubTitle = profile ? (profile.nip05 ? profile.nip05 : "") : "";

      const image = profile
        ? profile.image
          ? profile.image
          : profile.picture
          ? profile.picture
          : ""
        : "";

      const user: TUser = {
        pk: event.author.hexpubkey(),
        npub: event.author.npub,
        profile: profile!,
        displayName: userDisplayName,
        userSubTitle: userSubTitle,
        image: image,
      };

      return user;
    },
    {
      enabled: !!pubkey && !!ndk,
      staleTime: staleTime,
    }
  );

  return { status, data, error, isFetching };
}

function cleannpub(npub: string) {
  const numchar = 5;
  const first = npub.substring(0, numchar);
  const last = npub.substring(npub.length - numchar);
  return `${first}...${last}`;
}
