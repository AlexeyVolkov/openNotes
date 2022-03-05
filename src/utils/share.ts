export type ShareActionType = {
  text: string
  title: string
  url: string
}

export const shareAction = (props: ShareActionType): Promise<void> => {
  const navigatorHack: Navigator = window.navigator
  return navigatorHack.share(props)
}
