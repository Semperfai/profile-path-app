export const links: Link[] = [
  {
    id: 1,
    name: 'Google',
    url: 'https://google.com',
    image: 'https://picsum.photos/id/3/300/320'
  },
  {
    id: 2,
    name: 'Twitter',
    url: 'https://google.com',
    image: 'https://picsum.photos/id/4/300/320'
  },
  {
    id: 3,
    name: 'Facebook',
    url: 'https://google.com',
    image: 'https://picsum.photos/id/11/300/320'
  }
]

export type Link = {
  id: number
  name: string
  url: string
  image: string
}
