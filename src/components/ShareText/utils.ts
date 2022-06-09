import { IShareText } from './types'

export const shareText = ({ text }: IShareText) =>
  window.navigator.share({ text }).then()
export const copyText = (text: string) =>
  navigator.clipboard.writeText(text).then()
