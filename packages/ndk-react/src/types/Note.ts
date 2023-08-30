import { NDKTag } from "@nostr-dev-kit/ndk";

export type TNote = {
  id: string;
  content: string;
  author: string;
  created_at?: number;
  tags: NDKTag[];
  parent?: string;
  replies?: TNote[];
  kind: number;
  requestEventId?: string;
  reacted?: string;
  reposted?: boolean;
  communityId?: string;
  rootNote?: string;
};

export type TImageUpload = {
  blurhash?: string;
  url: string;
  thumbnail?: string;
  dim?: string;
  responsive240p?: string;
  responsive360p?: string;
  responsive480p?: string;
  responsive720p?: string;
  responsive1080p?: string;
};

export type TNoteStats = {
  react: number;
  repost: number;
  reply: number;
  zaps: number;
  zapsAmt: number;
};

export enum EZapState {
  NotZapped,
  Zapping,
  Zapped,
  GottenInvoice,
  GottenNWC,
  ErrorZapping,
  UserCancelled,
  OpenLnUrl,
  OpenNWCUrl,
}
