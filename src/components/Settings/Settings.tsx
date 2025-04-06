import "./Settings.css";
import type { FC } from "react";

interface SettingsFormProps {
  numberOfPairs?: number;
  countdownTime?: number;
  allowedMoves?: number;
}

const Settings: FC<SettingsFormProps> = ({
  numberOfPairs = 6,
  countdownTime = 60,
  allowedMoves,
}) => {
  return (
    <div className="settings">
      <label>
        Number of pair of cards
        <input
          type="number"
          name="pairs"
          min="6"
          max="16"
          defaultValue={numberOfPairs}
          required
          autoComplete="off"
        />
      </label>

      <label>
        Countdown time (sec.)
        <input
          type="number"
          name="time"
          min="30"
          max="300"
          defaultValue={countdownTime}
          required
          autoComplete="off"
        />
      </label>

      <label>
        Allowed guesses
        <input
          type="number"
          name="guesses"
          min="2"
          max="16"
          defaultValue={allowedMoves}
          autoComplete="off"
        />
      </label>
    </div>
  );
};

export default Settings;
