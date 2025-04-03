import {
  type FC,
  useState,
  type PropsWithChildren,
  type MouseEvent,
  type ComponentPropsWithoutRef,
  useEffect,
} from "react";

interface ModalProps extends ComponentPropsWithoutRef<"dialog"> {
  title?: string;
  onClose?: () => void;
  open?: boolean;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({ open: openProp = false, onClose, children, ...rest }) => {
  const [open, setOpen] = useState(openProp);

  const onCloseSettings = () => {
    setOpen(false);
    onClose?.();
  };

  const onOverlayClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) {
      onCloseSettings();
    }
  };

  useEffect(() => {
    setOpen(openProp);
  }, [openProp]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <dialog {...rest} onClick={onOverlayClick} open={open} onClose={onClose}>
      <article>{children}</article>
    </dialog>
  );
};

export default Modal;
