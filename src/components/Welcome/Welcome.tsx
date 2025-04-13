import "./Welcome.css";
import type { FC, FormEvent } from "react";
import {
  allowedMovesAtom,
  numberOfPairsAtom,
  timeRemainingAtom,
} from "@/store/gameStore";
import { userAtom } from "@/store/userStore";
import { useStore } from "@nanostores/react";
import { prepareDeck } from "@/store/cardStore.action";
import { start } from "@/store/gameStore.action";

interface WelcomeProps {
  onSubmit?: (data: { name: string }) => void;
}

const Welcome: FC<WelcomeProps> = ({ onSubmit: onSubmitProp }) => {
  const timeRemaining = useStore(timeRemainingAtom);
  const allowedMoves = useStore(allowedMovesAtom);
  const numberOfPairs = useStore(numberOfPairsAtom);
  const username = userAtom.get();

  const dispatchStart = (username: string) => {
    userAtom.set(username);
    start({
      numberOfPairs,
      countdownTime: timeRemaining,
      allowedMoves,
    });
    prepareDeck({
      numberOfPairs,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const name = data.get("name") as string | null;
    if (!name) {
      return;
    }
    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    onSubmitProp?.({ name });

    if (!document.startViewTransition) {
      dispatchStart(trimmedName);
      return;
    }

    // transition
    document.startViewTransition(() => dispatchStart(trimmedName));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Your Name
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          defaultValue={username}
          required
          autoComplete="off"
        />
      </label>

      <button type="submit">Start Game</button>
    </form>
  );
};

export default Welcome;
