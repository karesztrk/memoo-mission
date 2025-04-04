const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Controls the animation of the sparkling stars.
 * @see https://codepen.io/Hyperplexed/pen/YzeOLYe
 */
export const animate = (star: HTMLSpanElement) => {
  star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
  star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

  // Stops the running animation
  star.style.animation = "none";
  star.offsetHeight;
  star.style.animation = "";
};
