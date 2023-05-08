import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const Modal = ({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: React.ReactNode;
}) => {
  const elementReference = React.useRef<HTMLDivElement | null>(null);
  if (elementReference.current === null) {
    elementReference.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    if (modalRoot !== null && elementReference.current !== null)
      modalRoot.appendChild(elementReference.current);

    return function cleanup() {
      if (modalRoot !== null && elementReference.current !== null)
        modalRoot.removeChild(elementReference.current);
    };
  }, [elementReference]);

  return ReactDOM.createPortal(
    <dialog open={isOpen}>{children}</dialog>,
    elementReference.current
  );
};

export default Modal;
