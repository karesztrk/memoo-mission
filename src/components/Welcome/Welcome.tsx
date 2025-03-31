import { useAppDispatch } from "@/hooks/useAppDispatch";
import "./Welcome.css";
import { type FC, type FormEvent } from "react";
import { start } from "@/store/gameSlice";
import { useAppSelector } from "@/hooks/useAppSelector";

interface WelcomeProps {
  deck?: string[];
}

const Welcome: FC<WelcomeProps> = ({ deck = [] }) => {
  const dispatch = useAppDispatch();
  const { numberOfPairs, timeRemaining } = useAppSelector((state) => state.game);

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
    dispatch(
      start({
        username: trimmedName,
        numberOfPairs,
        countdownTime: timeRemaining,
        deck,
      }),
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Game Settings</h2>

      <label>
        Your Name
        <input type="text" name="name" required placeholder="Enter your name" />
      </label>

      <button type="submit">Start Game</button>
    </form>
  );
};

export default Welcome;
