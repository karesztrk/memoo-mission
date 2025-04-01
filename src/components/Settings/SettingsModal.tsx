import { type FC, type FormEvent } from "react";
import Modal from "../Modal";
import Settings from "./Settings";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { updateSettings } from "@/store/gameSlice";
import { useAppSelector } from "@/hooks/useAppSelector";

interface SettingsModalProps {
  deck?: string[];
  open?: boolean;
  onClose?: () => void;
}

const SettingsModal: FC<SettingsModalProps> = ({ deck = [], open, onClose }) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.game.status);
  const playing = status === "playing";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const pairs = data.get("pairs") as string | null;
    const time = data.get("time") as string | null;
    if (!pairs || !time || deck.length === 0) {
      return;
    }
    const numberOfPairs = parseInt(pairs);
    const countdownTime = parseInt(time);

    if (isNaN(numberOfPairs) || isNaN(countdownTime)) {
      return;
    }
    dispatch(updateSettings({ numberOfPairs, countdownTime, deck }));
    onClose?.();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <header>
        <button aria-label="Close" rel="prev" onClick={onClose}></button>
        <h3>Game Settings</h3>
      </header>
      <form onSubmit={handleSubmit} method="dialog">
        <Settings />
        <footer>
          <button type="submit" disabled={playing ? true : undefined}>
            Save settings
          </button>
        </footer>
      </form>
    </Modal>
  );
};

export default SettingsModal;
