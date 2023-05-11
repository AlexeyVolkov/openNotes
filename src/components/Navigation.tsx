import GitHubIcon from "../assets/github.svg";
import ShareText from "./ShareText";

export type NavigationPropsType = {
  text: string;
  className?: string;
};

function Navigation({ text, className }: NavigationPropsType) {
  return (
    <nav className={className}>
      <ul className="flex justify-around items-center gap-1">
        <li className="text-center">
          <ShareText text={text} />
        </li>
        <li>
          <a
            href="https://github.com/slimcandy/openNotes"
            rel="nofollow noopener"
            title="GitHub profile"
            className="flex items-center gap-1"
          >
            <img src={GitHubIcon} alt="GitHub Icon" className="w-8 h-8" />
            GitHub Page
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
