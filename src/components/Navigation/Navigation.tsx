import styles from './Navigation.module.scss'
import { ReactComponent as GitHubIcon } from './icons/github.svg'
import { ReactComponent as ShareIcon } from './icons/share.svg'
import { ReactComponent as ClipBoardIcon } from './icons/clipboard.svg'

export type NavigationPropsType = {
  shareFunction: (event: React.MouseEvent<HTMLAnchorElement>) => void
  canIShareFile: boolean
}

const Navigation = ({
  shareFunction,
  canIShareFile = false,
}: NavigationPropsType) => (
  <nav className='d-flex flex-row justify-content-around align-items-center py-2 border-bottom'>
    <ul className='nav'>
      <li className='nav-link text-center'>
        <a
          href='/'
          className='link-secondary text-decoration-none d-flex flex-row align-items-center gap-1'
          title={canIShareFile ? 'Share note' : 'Copy note text'}
          onClick={shareFunction}>
          {canIShareFile ? (
            <>
              <ShareIcon className={styles.share} />
              Share text
            </>
          ) : (
            <>
              <ClipBoardIcon className={styles.share} /> Copy text
            </>
          )}
        </a>
      </li>
    </ul>
    <ul className='nav'>
      <li className='nav-link'>
        <a
          href='https://github.com/slimcandy/openNotes'
          rel='nofollow noopener'
          className='link-secondary text-decoration-none  d-flex flex-row align-items-center gap-1'
          title='GitHub profile'>
          <GitHubIcon className={styles.github} /> GitHub Page
        </a>
      </li>
    </ul>
  </nav>
)

export default Navigation
