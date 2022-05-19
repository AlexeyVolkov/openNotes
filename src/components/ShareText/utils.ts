import { IShareText } from './types'

export const shareText = ({ text }: IShareText) =>
  window.navigator.share({ text }).then(console.log).catch(console.error)
export const copyText = (text: string) =>
  navigator.clipboard.writeText(text).then(console.log).catch(console.error)
