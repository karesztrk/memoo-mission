import { useAppDispatch } from "@/hooks/useAppDispatch";
import "./Settings.css";
import { useState, type FC } from "react";
import { setUserName, type GameSettings } from "@/store/gameSlice";

interface SettingsFormProps {
  onSubmit: (settings: GameSettings) => void;
}

const Settings: FC<SettingsFormProps> = ({ onSubmit }) => {
  const dispatch = useAppDispatch();
  const [settings, setSettings] = useState<GameSettings>({
    numberOfPairs: 6,
    countdownTime: 60,
  });

  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    dispatch(setUserName(name.trim()));
    onSubmit(settings);
  };

  return (
    <form onSubmit={handleSubmit} className="settings-form">
      <div className="form-header">
        <h2>Game Settings</h2>
      </div>

      <div className="form-group">
        <label className="form-label">
          Your Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-input"
            placeholder="Enter your name"
          />
        </label>
      </div>

      <div className="form-group">
        <label className="form-label">
          Number of Pairs (2-16)
          <input
            type="number"
            min="2"
            max="16"
            value={settings.numberOfPairs}
            onChange={(e) => setSettings((prev) => ({ ...prev, numberOfPairs: parseInt(e.target.value) }))}
            className="form-input"
          />
        </label>
      </div>

      <div className="form-group">
        <label className="form-label">
          Time Limit (seconds)
          <input
            type="number"
            min="30"
            max="300"
            value={settings.countdownTime}
            onChange={(e) => setSettings((prev) => ({ ...prev, countdownTime: parseInt(e.target.value) }))}
            className="form-input"
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
