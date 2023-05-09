import GitHubIcon from "./icons/github.svg";
import ShareText from "../ShareText/ShareText";

export type NavigationPropsType = {
  text: string;
};

function Navigation({ text }: NavigationPropsType) {
  return (
    <nav className="py-2 border-b">
      <ul className="flex justify-around items-center gap-1">
        <li className="text-center">
          <ShareText text={text} className="flex items-center gap-1" />
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
