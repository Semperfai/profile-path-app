export interface NavbarLink {
  name: string;
  url: Url;
  icon: string;
  img?: string;
}

export type Color = {
  id: number;
  color: string;
  text: string;
  name: string;
};

export type Link = {
  id: number;
  name: string;
  url: string;
  image?: string;
};

export interface ICropperFormDataFields {
  image: Blob | string;
  height?: number | string;
  width?: number | string;
  left?: number | string;
  top?: number | string;
  id?: number | string;
}

export const optionsVariants = [
  "Links",
  "Apperance",
  "Preview",
  "More",
] as const;

export type CurrentMenuOptionsVariant = (typeof optionsVariants)[number];
