import "./Welcome.css";
import type { FC } from "react";
import { userAtom } from "@/store/userStore";
import Settings from "@/components/Settings";

interface WelcomeProps {
  id?: string;
  onSubmit?: (data: { name: string }) => void;
}

const Welcome: FC<WelcomeProps> = ({ id }) => {
  const username = userAtom.get();

  return (
    <form id={id} action="/game" method="post">
      <label>
        Your Name
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          defaultValue={username}
          required
          autoComplete="username"
        />
        <Settings />
      </label>

      <button type="submit">Start Game</button>
    </form>
  );
};

export default Welcome;
