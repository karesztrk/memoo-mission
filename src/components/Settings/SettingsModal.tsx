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
import { validate } from "./Settings.util";

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const { numberOfPairs, countdownTime, allowedGuesses } = validate(data);
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
