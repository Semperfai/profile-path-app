export interface CropperComponent {
  getResult(): {
    coordinates: {
      width?: string
      height?: string
      left?: string
      top?: string
      transform?: string
    }
  }
}

export type ICropperFormDataFields = Record<
  'height' | 'width' | 'left' | 'top' | 'id',
  StringOrNumber
> & {
  image: File | string
}
