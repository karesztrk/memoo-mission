import { type FC, useState, type PropsWithChildren, type MouseEvent, useEffect } from "react";

interface ModalProps {
  title?: string;
  onClose?: () => void;
  open?: boolean;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({ open: openProp = false, onClose, children }) => {
  const [open, setOpen] = useState(openProp);

  const onCloseSettings = () => {
    setOpen(false);
    onClose?.();
  };

  const onOverlayClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) {
      onCloseSettings();
    }
  };

  useEffect(() => {
    setOpen(openProp);
  }, [openProp]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <dialog onClick={onOverlayClick} open={open} onClose={onClose}>
      <article>{children}</article>
    </dialog>
  );
};

export default Modal;
