import { type Color, type Link } from "~/shared/types";

export type UserId = Brand<Id, "UserId">;

export interface UserState {
  id: UserId;
  theme_id: Id;
  name: string;
  email: Email;
  image: string;
  bio: string;
  theme: null;
  colors: Color[];
  allLinks: Link[];
  isMobile: boolean;
  updatedLinkId: number;
  addLinkOverlay: boolean;
  isPreviewOverlay: boolean;
}
