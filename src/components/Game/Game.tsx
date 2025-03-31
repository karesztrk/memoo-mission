import { type FC } from "react";
import "./Game.css";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import Board from "../Board";

interface GameProps {
  deck?: string[];
}

const Game: FC<GameProps> = ({ deck = [] }) => {
  return (
    <Provider store={store}>
      <Board deck={deck} />
    </Provider>
  );
};

export default Game;
