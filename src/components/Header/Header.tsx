import { useEffect, useState, type FC } from "react";
import "./Header.css";
import { getStore, subscribeToStore } from "@/store/store";
import { restart, selectMistakes, type GameStatus } from "@/store/gameSlice";
import { formatTime } from "./Header.util";
import SettingsModal from "../Settings/SettingsModal";

interface HeaderProps {
  deck?: string[];
}

const Header: FC<HeaderProps> = ({ deck }) => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [matches, setMatches] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [status, setStatus] = useState<GameStatus>("idle");
  const playing = status === "playing" || status === "gameover";

  const [settingsOpen, setSettingsOpen] = useState(false);
  const username = getStore().getState().user.userName || "";

  const onOpenSettings = () => {
    setSettingsOpen(true);
  };

  const onCloseSettings = () => {
    setSettingsOpen(false);
  };

  const onPlayAgain = () => {
    getStore().dispatch(restart());
  };

  /**
   * Subscribe to store changes.
   */
  useEffect(() => {
    const unsubscribe = subscribeToStore(
      (state) => state.game,
      (state) => {
        setTimeRemaining(state.timeRemaining);
        setMatches(state.matches);

        const mistakes = selectMistakes({ game: state });
        setMistakes(mistakes);

        setStatus(state.status);
      },
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <header className="container">
      <nav>
        <ul>
          <li>
            <a href="/" className="home">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="215"
                height="119"
                viewBox="0 0 215 119"
                fill="none"
                className="logo"
              >
                <path
                  fill="#F5F5F5"
                  d="M102.423 114.198C24.249 111.785.932 87.811 2.32 54.895 4.653-.425 174.148-12.65 202.124 32.558c27.975 45.208-1.985 84.657-99.701 81.64Z"
                />
                <path
                  fill="#000"
                  d="M63.105 38.816c4.6 0 7.52 3.12 7.52 8.32v12.24h-6.68v-11.48c0-1.72-.8-2.8-2.48-2.8-1.88 0-2.76 1.36-2.76 3.36v10.92h-6.64v-11.48c0-1.72-.84-2.8-2.52-2.8-1.84 0-2.76 1.36-2.76 3.36v10.92h-6.64v-20h6.64v1.88c1.08-1.44 2.84-2.44 5.4-2.44 2.36 0 4.04.92 5.12 2.56 1.24-1.52 3.04-2.56 5.8-2.56Z"
                />
                <path
                  fill="#000"
                  fill-rule="evenodd"
                  d="M80.088 51.816c.8 1.92 2.56 2.44 4.48 2.44 1.44 0 2.68-.48 3.64-1.4l4.8 3.36c-2 2.52-5.04 3.72-8.6 3.72-6.92 0-11.2-4.6-11.2-10.52 0-6 4.4-10.6 10.64-10.6 6 0 10.32 4.52 10.32 10.52 0 .84-.08 1.64-.28 2.48h-13.8Zm-.08-4.6h7.68c-.6-2.08-2.16-2.8-3.76-2.8-1.92 0-3.36.96-3.92 2.8Z"
                  clip-rule="evenodd"
                />
                <path
                  fill="#000"
                  d="M127.5 47.136c0-5.2-2.92-8.32-7.52-8.32-2.76 0-4.56 1.04-5.8 2.56-1.08-1.64-2.76-2.56-5.12-2.56-2.56 0-4.32 1-5.4 2.44v-1.88h-6.64v20h6.64v-10.92c0-2 .92-3.36 2.76-3.36 1.68 0 2.52 1.08 2.52 2.8v11.48h6.64v-10.92c0-2 .88-3.36 2.76-3.36 1.68 0 2.48 1.08 2.48 2.8v11.48h6.68v-12.24ZM70.625 72.136c0-5.2-2.92-8.32-7.52-8.32-2.76 0-4.56 1.04-5.8 2.56-1.08-1.64-2.76-2.56-5.12-2.56-2.56 0-4.32 1-5.4 2.44v-1.88h-6.64v20h6.64v-10.92c0-2 .92-3.36 2.76-3.36 1.68 0 2.52 1.08 2.52 2.8v11.48h6.64v-10.92c0-2 .88-3.36 2.76-3.36 1.68 0 2.48 1.08 2.48 2.8v11.48h6.68v-12.24ZM93.711 71.63c-1.578-.364-2.792-.644-2.792-1.414 0-.6.56-.96 1.48-.96 1.12 0 1.92.6 2.48 1.72l5.6-2.52c-1.64-3.28-4.64-4.64-8.24-4.64-4.08 0-8.04 2.2-8.04 6.72 0 4.592 4.104 5.65 6.99 6.395 1.564.403 2.77.714 2.77 1.445 0 .72-.64 1.08-1.8 1.08-1.56 0-2.6-.72-3.12-2.2l-5.8 2.92c1.6 3.4 4.76 4.76 8.96 4.76 4.08 0 8.64-1.72 8.64-6.72 0-4.941-4.194-5.909-7.128-6.586ZM111.485 71.63c-1.579-.364-2.793-.644-2.793-1.414 0-.6.56-.96 1.48-.96 1.12 0 1.92.6 2.48 1.72l5.6-2.52c-1.64-3.28-4.64-4.64-8.24-4.64-4.08 0-8.04 2.2-8.04 6.72 0 4.592 4.105 5.65 6.99 6.395 1.564.403 2.77.714 2.77 1.445 0 .72-.64 1.08-1.8 1.08-1.56 0-2.6-.72-3.12-2.2l-5.8 2.92c1.6 3.4 4.76 4.76 8.96 4.76 4.08 0 8.64-1.72 8.64-6.72 0-4.941-4.193-5.909-7.127-6.586ZM174.509 72.416c0-5.76-3.24-8.6-7.36-8.6-2.48 0-4.44.96-5.56 2.56v-2h-6.64v20h6.64v-10.64c0-2.4 1.24-3.64 3.28-3.64 1.72 0 3 1 3 3.16v11.12h6.64v-11.96ZM121.199 84.376v-20h6.64v20h-6.64ZM74.207 64.376v20h6.64v-20h-6.64Z"
                />
                <path
                  fill="#D5D5D5"
                  fill-rule="evenodd"
                  d="M176.225 48.38c0 6.158-5.06 10.996-11 10.996-6.16 0-11-5.058-11-10.996 0-6.158 5.06-10.997 11-10.997 6.16-.22 11 4.839 11 10.997Z"
                  clip-rule="evenodd"
                />
                <path
                  fill="#FF3F56"
                  d="M141.225 59.376c5.94 0 11-4.84 11-11s-4.84-11-11-11c-5.94 0-11 4.84-11 11 0 5.94 4.84 11 11 11ZM141 85c5.94 0 11-4.84 11-11s-4.84-11-11-11c-5.94 0-11 4.84-11 11 0 5.94 4.84 11 11 11Z"
                />
              </svg>
              <span className="visually-hidden">Memoo Mission</span>
            </a>
          </li>
        </ul>
        <ul>
          <li className="stat">
            {playing && (
              <>
                <div className="score">{formatTime(timeRemaining)}</div>
                <div className="matches stat-item">{matches} matches</div>
                <div className="mistakes stat-item">{mistakes} mistakes</div>
              </>
            )}
          </li>
        </ul>
        <ul>
          <li>
            <button onClick={onOpenSettings} className="button">
              Settings
            </button>
            {playing && (
              <>
                <button onClick={onPlayAgain} className="button">
                  Restart
                </button>
                <div>Player: {username}</div>
              </>
            )}
          </li>
        </ul>
      </nav>

      <SettingsModal open={settingsOpen} onClose={onCloseSettings} deck={deck} />
    </header>
  );
};

export default Header;
