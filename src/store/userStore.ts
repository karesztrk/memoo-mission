import { persistentAtom } from "@nanostores/persistent";

export const userAtom = persistentAtom<string>("name", "");
