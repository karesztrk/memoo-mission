import { useEffect, useState, type FC } from "react";
import "./Header.css";
import { getStore, subscribeToStore } from "@/store/store";
import { restart, selectMistakes, selectScore, type GameStatus } from "@/store/gameSlice";
import { formatTime } from "./Header.util";
import SettingsModal from "../Settings/SettingsModal";

interface HeaderProps {
  deck?: string[];
}

const Header: FC<HeaderProps> = ({ deck }) => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [matches, setMatches] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [score, setScore] = useState(0);
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
    if (!document.startViewTransition) {
      getStore().dispatch(restart());
      return;
    }

    // transition
    document.startViewTransition(() => {
      getStore().dispatch(restart());
    });
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

        const score = selectScore({ game: state });
        setScore(score);
      },
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <header className="container">
      <nav>
        <ul className="home">
          <li>
            <a href="/" className="home-link">
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
        {playing && (
          <ul className="stats">
            <li className="stat">
              <>
                <div className="time">{formatTime(timeRemaining)}</div>
                <div className="matches stat-item">{matches} matches</div>
                <div className="mistakes stat-item">{mistakes} mistakes</div>
                <div className="score stat-item">{score} score</div>
              </>
            </li>
          </ul>
        )}
        <ul className="controls">
          <li>
            <ul>
              <li className="control">
                <button onClick={onOpenSettings} className="icon-button settings-button" aria-label="Settings">
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M23.2031 8.32812C23.3906 8.75 23.25 9.17188 22.9219 9.5L20.9062 11.3281C20.9531 11.7031 20.9531 12.125 20.9531 12.5C20.9531 12.9219 20.9531 13.3438 20.9062 13.7188L22.9219 15.5469C23.25 15.8281 23.3906 16.2969 23.2031 16.7188C23.0156 17.2812 22.7812 17.7969 22.5 18.3125L22.2656 18.6875C21.9375 19.2031 21.6094 19.7188 21.2344 20.1406C20.9531 20.5156 20.4844 20.6094 20.0625 20.4688L17.4844 19.6719C16.8281 20.1406 16.125 20.5156 15.4219 20.8438L14.8125 23.5156C14.7188 23.9375 14.3906 24.2656 13.9688 24.3594C13.3125 24.4531 12.6562 24.5 11.9531 24.5C11.2969 24.5 10.6406 24.4531 9.98438 24.3594C9.5625 24.2656 9.23438 23.9375 9.14062 23.5156L8.53125 20.8438C7.78125 20.5156 7.125 20.1406 6.46875 19.6719L3.89062 20.4688C3.46875 20.6094 3 20.5156 2.71875 20.1875C2.34375 19.7188 2.01562 19.2031 1.6875 18.6875L1.45312 18.3125C1.17188 17.7969 0.9375 17.2812 0.75 16.7188C0.5625 16.2969 0.703125 15.875 1.03125 15.5469L3.04688 13.7188C3 13.3438 3 12.9219 3 12.5C3 12.125 3 11.7031 3.04688 11.3281L1.03125 9.5C0.703125 9.17188 0.5625 8.75 0.75 8.32812C0.9375 7.76562 1.17188 7.25 1.45312 6.73438L1.6875 6.35938C2.01562 5.84375 2.34375 5.32812 2.71875 4.85938C3 4.53125 3.46875 4.4375 3.89062 4.57812L6.46875 5.375C7.125 4.90625 7.82812 4.48438 8.53125 4.20312L9.14062 1.53125C9.23438 1.10938 9.5625 0.78125 9.98438 0.6875C10.6406 0.59375 11.2969 0.5 12 0.5C12.6562 0.5 13.3125 0.59375 13.9688 0.6875C14.3906 0.734375 14.7188 1.10938 14.8125 1.53125L15.4219 4.20312C16.1719 4.48438 16.8281 4.90625 17.4844 5.375L20.0625 4.57812C20.4844 4.4375 20.9531 4.53125 21.2344 4.85938C21.6094 5.32812 21.9375 5.84375 22.2656 6.35938L22.5 6.73438C22.7812 7.25 23.0156 7.76562 23.25 8.32812H23.2031ZM12 16.25C13.3125 16.25 14.5312 15.5469 15.2344 14.375C15.8906 13.25 15.8906 11.7969 15.2344 10.625C14.5312 9.5 13.3125 8.75 12 8.75C10.6406 8.75 9.42188 9.5 8.71875 10.625C8.0625 11.7969 8.0625 13.25 8.71875 14.375C9.42188 15.5469 10.6406 16.25 12 16.25Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </li>
              {playing && (
                <>
                  <li className="control">
                    <button onClick={onPlayAgain} className="icon-button restart-button" aria-label="Restart">
                      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M0 11C0 6.875 3.32812 3.5 7.5 3.5H15V2C15 1.4375 15.3281 0.875 15.8906 0.640625C16.4531 0.40625 17.1094 0.546875 17.5312 0.96875L20.5312 3.96875C21.1406 4.53125 21.1406 5.51562 20.5312 6.07812L17.5312 9.07812C17.1094 9.5 16.4531 9.64062 15.8906 9.40625C15.3281 9.17188 15 8.60938 15 8V6.5H7.5C5.01562 6.5 3 8.51562 3 11C3 11.8438 2.29688 12.5 1.5 12.5C0.65625 12.5 0 11.8438 0 11ZM24 14C24 18.1719 20.625 21.5 16.5 21.5H9V23C9 23.6094 8.625 24.1719 8.0625 24.4062C7.5 24.6406 6.84375 24.5 6.42188 24.0781L3.42188 21.0781C2.8125 20.5156 2.8125 19.5312 3.42188 18.9688L6.42188 15.9688C6.84375 15.5469 7.5 15.4062 8.0625 15.6406C8.625 15.875 9 16.4375 9 17V18.5H16.5C18.9844 18.5 21 16.4844 21 14C21 13.2031 21.6562 12.5 22.5 12.5C23.2969 12.5 24 13.2031 24 14Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </li>
                </>
              )}
            </ul>
          </li>
          {playing && (
            <li>
              <span>Player: {username}</span>
            </li>
          )}
        </ul>
      </nav>

      <SettingsModal open={settingsOpen} onClose={onCloseSettings} deck={deck} />
    </header>
  );
};

export default Header;
