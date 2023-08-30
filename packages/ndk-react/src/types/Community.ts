export type TCommunity = {
  id: string;
  eventId: string;
  name: string;
  description?: string;
  image?: string;
  d: string;
  relay?: string[];
  author: string;
  moderators: string[];
  rules?: string;
  tags: string[];
};
