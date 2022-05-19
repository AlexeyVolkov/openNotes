import styles from "./Navigation.module.scss";
import { ReactComponent as GitHubIcon } from "./icons/github.svg";
import ShareText from "../ShareText";

export type NavigationPropsType = {
  text: string;
};

const Navigation = ({ text }: NavigationPropsType) => (
  <nav className="d-flex flex-row justify-content-around align-items-center py-2 border-bottom">
    <ul className="nav">
      <li className="nav-link text-center">
        <ShareText
          text={text}
          className="btn btn-light d-flex flex-row align-items-center gap-1"
        />
      </li>
    </ul>
    <ul className="nav">
      <li className="nav-link">
        <a
          href="https://github.com/slimcandy/openNotes"
          rel="nofollow noopener"
          className="link-secondary text-decoration-none  d-flex flex-row align-items-center gap-1"
          title="GitHub profile"
        >
          <GitHubIcon className={styles.github} /> GitHub Page
        </a>
      </li>
    </ul>
  </nav>
);

export default Navigation;
