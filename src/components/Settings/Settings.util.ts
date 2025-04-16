/**
 * @throws {Error} If the form data is invalid
 */
export const validate = (
  data: FormData,
): {
  numberOfPairs: number;
  countdownTime: number;
  allowedGuesses?: number;
} => {
  const pairs = data.get("pairs") as string | null;
  const time = data.get("time") as string | null;
  const guesses = data.get("guesses") as string | null;
  if (!pairs || !time) {
    throw Error('Missing "number of pairs" or "countdown time"');
  }
  const numberOfPairs = Number.parseInt(pairs);
  const countdownTime = Number.parseInt(time);
  const allowedGuesses = guesses ? Number.parseInt(guesses) : undefined;

  if (Number.isNaN(numberOfPairs) || Number.isNaN(countdownTime)) {
    throw Error('Invalid "number of pairs" or "countdown time"');
  }

  return {
    numberOfPairs,
    countdownTime,
    allowedGuesses,
  };
};
