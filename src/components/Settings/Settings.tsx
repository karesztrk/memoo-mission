import "./Settings.css";
import { type FC } from "react";

interface SettingsFormProps {
  numberOfPairs?: number;
  countdownTime?: number;
}

const Settings: FC<SettingsFormProps> = ({ numberOfPairs = 6, countdownTime = 60 }) => {
  return (
    <>
      <label>
        Number of Pairs
        <input type="number" name="pairs" min="6" max="16" defaultValue={numberOfPairs} required />
      </label>

      <label>
        Time Limit (seconds)
        <input type="number" name="time" min="30" max="300" defaultValue={countdownTime} required />
      </label>

      <label>
        Allowed guesses
        <input type="number" name="guesses" min="6" max="16" />
      </label>
    </>
  );
};

export default Settings;
