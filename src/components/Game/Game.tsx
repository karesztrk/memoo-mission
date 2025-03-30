import { type FC } from "react";
import "./Game.css";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import Board from "../Board";

const Game: FC = () => {
  return (
    <Provider store={store}>
      <Board />
    </Provider>
  );
};

export default Game;
