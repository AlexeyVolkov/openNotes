import GitHubIcon from "./icons/github.svg";
import ShareText from "../ShareText/ShareText";

export type NavigationPropsType = {
  text: string;
};

function Navigation({ text }: NavigationPropsType) {
  return (
    <nav>
      <ul>
        <li>
          <ShareText text={text} />
        </li>
      </ul>
      <ul>
        <li>
          <a
            href="https://github.com/slimcandy/openNotes"
            rel="nofollow noopener"
            title="GitHub profile"
          >
            <img src={GitHubIcon} alt="" />
            GitHub Page
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
