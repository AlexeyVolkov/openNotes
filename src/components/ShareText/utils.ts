import { IShareText } from './types'

export const shareText = ({ text }: IShareText) =>
  window.navigator.share({ text })
export const copyText = (text: string) =>
  window.navigator.clipboard.writeText(text)
