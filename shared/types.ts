export interface NavbarLink {
  name: string
  url: Url
  icon: string
  img?: string
}

export const optionsVariants = [
  'Links',
  'Apperance',
  'Preview',
  'More'
] as const

export type CurrentMenuOptionsVariant = (typeof optionsVariants)[number]
