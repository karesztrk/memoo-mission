import { useAppDispatch } from "@/hooks/useAppDispatch";
import "./Settings.css";
import { type FC, type FormEvent } from "react";
import { start } from "@/store/gameSlice";

interface SettingsFormProps {
  deck?: string[];
  numberOfPairs?: number;
  countdownTime?: number;
}

const Settings: FC<SettingsFormProps> = ({ deck = [], numberOfPairs = 6, countdownTime = 60 }) => {
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const name = data.get("name") as string | null;
    const pairs = data.get("pairs") as string | null;
    const time = data.get("time") as string | null;
    if (!name || !pairs || !time || deck.length === 0) {
      return;
    }
    const trimmedName = name.trim();
    const numberOfPairs = parseInt(pairs);
    const countdownTime = parseInt(time);

    if (!trimmedName || isNaN(numberOfPairs) || isNaN(countdownTime)) {
      return;
    }
    dispatch(start({ username: trimmedName, numberOfPairs, countdownTime, deck }));
  };

  return (
    <form onSubmit={handleSubmit} className="settings-form">
      <div className="form-header">
        <h2>Game Settings</h2>
      </div>

      <div className="form-group">
        <label className="form-label">
          Your Name
          <input type="text" name="name" required className="form-input" placeholder="Enter your name" />
        </label>
      </div>

      <div className="form-group">
        <label className="form-label">
          Number of Pairs (6-16)
          <input
            type="number"
            name="pairs"
            min="6"
            max="16"
            className="form-input"
            defaultValue={numberOfPairs}
            required
          />
        </label>
      </div>

      <div className="form-group">
        <label className="form-label">
          Time Limit (seconds)
          <input
            type="number"
            name="time"
            min="30"
            max="300"
            defaultValue={countdownTime}
            className="form-input"
            required
          />
        </label>
      </div>

      <button type="submit" className="button">
        Start Game
      </button>
    </form>
  );
};

export default Settings;
