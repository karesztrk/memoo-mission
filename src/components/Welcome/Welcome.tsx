import { useAppDispatch } from "@/hooks/useAppDispatch";
import "./Welcome.css";
import type { FC, FormEvent } from "react";
import { start } from "@/store/gameSlice";
import { useAppSelector } from "@/hooks/useAppSelector";

interface WelcomeProps {
  deck?: string[];
  onSubmit?: (data: { name: string }) => void;
}

const Welcome: FC<WelcomeProps> = ({ deck = [], onSubmit: onSubmitProp }) => {
  const dispatch = useAppDispatch();
  const { numberOfPairs, timeRemaining, allowedMoves } = useAppSelector(
    (state) => state.game,
  );
  const username = useAppSelector((state) => state.user.userName);

  const dispatchStart = (username: string) => {
    dispatch(
      start({
        username,
        numberOfPairs,
        countdownTime: timeRemaining,
        deck,
        allowedMoves,
      }),
    );
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
