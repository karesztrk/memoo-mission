import { type FC, type FormEvent } from "react";
import Modal from "../Modal";
import Settings from "./Settings";
import { updateSettings } from "@/store/gameSlice";
import { getStore } from "@/store/store";

interface SettingsModalProps {
  deck?: string[];
  open?: boolean;
  onClose?: () => void;
}

const SettingsModal: FC<SettingsModalProps> = ({ deck = [], open, onClose }) => {
  const store = getStore();
  const dispatch = store.dispatch;
  const { numberOfPairs, countdownTime, allowedMoves, status } = store.getState().game;
  const playing = status === "playing";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const pairs = data.get("pairs") as string | null;
    const time = data.get("time") as string | null;
    const guesses = data.get("guesses") as string | null;
    if (!pairs || !time || deck.length === 0) {
      return;
    }
    const numberOfPairs = parseInt(pairs);
    const countdownTime = parseInt(time);
    const allowedGuesses = guesses ? parseInt(guesses) : undefined;

    if (isNaN(numberOfPairs) || isNaN(countdownTime)) {
      return;
    }
    dispatch(updateSettings({ numberOfPairs, countdownTime, deck, allowedMoves: allowedGuesses }));
    onClose?.();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="game-settings-title">
      <header>
        <button aria-label="Close" rel="prev" onClick={onClose}></button>
        <h3 id="game-settings-title">Game Settings</h3>
      </header>
      <form onSubmit={handleSubmit} method="dialog">
        <Settings numberOfPairs={numberOfPairs} countdownTime={countdownTime} allowedMoves={allowedMoves} />
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
