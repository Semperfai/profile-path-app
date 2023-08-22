export interface NavbarLink {
  name: string
  url: Url
  icon: string
  img?: string
}

export type Color = {
  id: number
  color: string
  text: string
  name: string
}

export const optionsVariants = [
  'Links',
  'Apperance',
  'Preview',
  'More'
] as const

export type CurrentMenuOptionsVariant = (typeof optionsVariants)[number]
