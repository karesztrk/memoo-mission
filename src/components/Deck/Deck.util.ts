export const greatestDivisor = (num: number) => {
  if (num <= 1) {
    return 1;
  }

  // work the way down
  for (let i = Math.floor(num / 2); i >= 1; i--) {
    if (num % i === 0) {
      return i;
    }
  }

  return 1;
};
