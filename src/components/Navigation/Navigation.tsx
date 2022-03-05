import { MouseEventHandler, useEffect, useState } from 'react'

import styles from './Navigation.module.scss'
import { ReactComponent as GitHubIcon } from './icons/github.svg'
import { ReactComponent as ShareIcon } from './icons/share.svg'
import { ReactComponent as ClipBoardIcon } from './icons/clipboard.svg'

export type NavigationPropsType = {
  shareFunction: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

const Navigation = (props: NavigationPropsType) => {
  const [navigatorHack, setNavigatorHack] = useState<Navigator>()
  const [canIShareFile, setCanIShareFile] = useState<boolean>(false)

  useEffect(() => {
    const navigatorHack: Navigator = window.navigator
    if (
      navigatorHack &&
      typeof navigatorHack.canShare !== 'undefined' &&
      navigatorHack.canShare()
    ) {
      setNavigatorHack(window.navigator)
      setCanIShareFile(true)
    }
    return setCanIShareFile(false)
  }, [])

  useEffect(() => {
    setNavigatorHack(window.navigator)
  }, [])

  return (
    <nav className='d-flex flex-row justify-content-between align-items-center py-2 border-bottom'>
      <ul className='nav'>
        <li className='nav-link'>
          <a
            href='/'
            className='link-secondary text-decoration-none'
            title='About project'>
            About Me
          </a>
        </li>
      </ul>
      <ul className='nav'>
        <li className='nav-link text-center'>
          <a
            href='/'
            className='link-secondary text-decoration-none'
            title={canIShareFile ? 'Share note' : 'Copy note text'}
            onClick={props.shareFunction}>
            {canIShareFile ? (
              <ShareIcon className={`logo font font_serif text-dark`} />
            ) : (
              <ClipBoardIcon className={`logo font font_serif text-dark`} />
            )}
          </a>
        </li>
      </ul>
      <ul className='nav'>
        <li className='nav-link'>
          <a
            href='https://github.com/slimcandy'
            rel='nofollow noopener'
            className='link-secondary text-decoration-none'
            title='GitHub profile'>
            <GitHubIcon className={styles.github} />
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
