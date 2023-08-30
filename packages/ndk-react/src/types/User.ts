import { NDKUserProfile } from "@nostr-dev-kit/ndk";

export type TUser = {
  pk: string;
  npub: string;
  profile: NDKUserProfile;
  displayName: string;
  userSubTitle: string;
  image: string;
};

export type TUserReactions = { [eventId: string]: string[] };

export type TUserZaps = { [eventId: string]: number[] };
