import { useAppDispatch } from "@/hooks/useAppDispatch";
import "./Welcome.css";
import { type FC, type FormEvent } from "react";
import { start } from "@/store/gameSlice";
import { useAppSelector } from "@/hooks/useAppSelector";

interface WelcomeProps {
  deck?: string[];
  onSubmit?: (data: { name: string }) => void;
}

const Welcome: FC<WelcomeProps> = ({ deck = [], onSubmit: onSubmitProp }) => {
  const dispatch = useAppDispatch();
  const { numberOfPairs, timeRemaining } = useAppSelector((state) => state.game);

  const dispatchStart = (username: string) => {
    dispatch(
      start({
        username,
        numberOfPairs,
        countdownTime: timeRemaining,
        deck,
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

    if (!document.startViewTransition) {
      dispatchStart(trimmedName);
      return;
    }

    // transition
    document.startViewTransition(() => dispatchStart(trimmedName));

    onSubmitProp?.({ name });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Your Name
        <input type="text" name="name" required placeholder="Enter your name" />
      </label>

      <button type="submit">Start Game</button>
    </form>
  );
};

export default Welcome;
