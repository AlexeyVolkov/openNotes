import { useEffect, useState } from "react";
import CopyIcon from "../assets/copy.svg";
import ShareIcon from "../assets/share.svg";

function shareText(text: string) {
  return window.navigator.share({ text });
}
function copyText(text: string) {
  return window.navigator.clipboard.writeText(text);
}

function ShareText({ text }: { text: string }) {
  const [canShare, setCanShare] = useState(false);

  function handleShareText() {
    return shareText(text);
  }
  function handleCopyText() {
    return copyText(text);
  }

  useEffect(
    function checkCanShareText() {
      if (
        typeof window.navigator.canShare !== "undefined" &&
        window.navigator.canShare({
          text,
        })
      )
        setCanShare(true);

      return function cleanup() {
        setCanShare(false);
      };
    },
    [text]
  );

  if (canShare) {
    return (
      <button
        type="button"
        className="flex items-center justify-center gap-1"
        onClick={handleShareText}
      >
        <img src={ShareIcon} alt="Copy Icon" className="w-8 h-8" />
        Share text
      </button>
    );
  }

  return (
    <button
      type="button"
      className="flex items-center justify-center gap-1"
      onClick={handleCopyText}
    >
      <img src={CopyIcon} alt="Copy Icon" className="w-8 h-8" />
      Copy text
    </button>
  );
}
export default ShareText;
