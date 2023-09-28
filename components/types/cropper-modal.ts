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

export interface CropperData {
  imgStyles: {
    height?: string
    width?: string
    left?: string
    top?: string
  }
  filePath: string
}
