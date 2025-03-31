import { useAppDispatch } from "@/hooks/useAppDispatch";
import "./Settings.css";
import { type FC, type FormEvent } from "react";
import { updateSettings } from "@/store/gameSlice";

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
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Number of Pairs (6-16)
          <input type="number" name="pairs" min="6" max="16" defaultValue={numberOfPairs} required />
        </label>
      </div>

      <div>
        <label>
          Time Limit (seconds)
          <input type="number" name="time" min="30" max="300" defaultValue={countdownTime} required />
        </label>
      </div>

      <button type="submit">Save settings</button>
    </form>
  );
};

export default Settings;
