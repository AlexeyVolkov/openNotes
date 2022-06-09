import * as React from 'react'

import { ShareIcon, CopyIcon } from './icons'
import { copyText, shareText } from './utils'
import { IShareTextProps } from './types'

function ShareText({ text, className }: IShareTextProps) {
  const [canShare, setCanShare] = React.useState(false)
  const handleShareText = () =>
    shareText({
      text
    })
  const handleCopyText = () => copyText(text)

  React.useEffect(() => {
    if (
      typeof window.navigator.canShare !== 'undefined' &&
      window.navigator.canShare({
        text
      })
    )
      setCanShare(true)
  }, [text])

  if (canShare) {
    return (
      <button type="button" className={className} onClick={handleShareText}>
        <ShareIcon />
        Share text
      </button>
    )
  }

  return (
    <button type="button" className={className} onClick={handleCopyText}>
      <CopyIcon />
      Copy text
    </button>
  )
}
export default ShareText
