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
