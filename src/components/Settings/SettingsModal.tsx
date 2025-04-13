import type { FC, FormEvent } from "react";
import Modal from "../Modal";
import Settings from "./Settings";
import {
  allowedMovesAtom,
  countdownTimeAtom,
  numberOfPairsAtom,
  statusAtom,
} from "@/store/gameStore";
import { useStore } from "@nanostores/react";
import { updateSettings } from "@/store/gameStore.action";
import { prepareDeck } from "@/store/cardStore.action";

interface SettingsModalProps {
  open?: boolean;
  onClose?: () => void;
}

const SettingsModal: FC<SettingsModalProps> = ({ open, onClose }) => {
  const status = useStore(statusAtom);
  const allowedMoves = useStore(allowedMovesAtom);
  const numberOfPairs = useStore(numberOfPairsAtom);
  const countdownTime = useStore(countdownTimeAtom);
  const playing = status === "playing";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const pairs = data.get("pairs") as string | null;
    const time = data.get("time") as string | null;
    const guesses = data.get("guesses") as string | null;
    if (!pairs || !time) {
      return;
    }
    const numberOfPairs = Number.parseInt(pairs);
    const countdownTime = Number.parseInt(time);
    const allowedGuesses = guesses ? Number.parseInt(guesses) : undefined;

    if (Number.isNaN(numberOfPairs) || Number.isNaN(countdownTime)) {
      return;
    }
    updateSettings({
      numberOfPairs,
      countdownTime,
      allowedMoves: allowedGuesses,
    });
    prepareDeck({
      numberOfPairs,
    });
    onClose?.();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="game-settings-title">
      <header>
        <button type="button" aria-label="Close" rel="prev" onClick={onClose} />
        <h3 id="game-settings-title">Game Settings</h3>
      </header>
      <form onSubmit={handleSubmit} method="dialog">
        <Settings
          numberOfPairs={numberOfPairs}
          countdownTime={countdownTime}
          allowedMoves={allowedMoves}
        />
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
