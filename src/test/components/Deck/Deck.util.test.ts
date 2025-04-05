import { greatestDivisor } from "@/components/Deck/Deck.util";
import { describe, expect, test } from "vitest";

describe("Deck util", () => {
  test("1 for prime numbers", () => {
    expect(greatestDivisor(2)).toBe(1);
    expect(greatestDivisor(3)).toBe(1);
    expect(greatestDivisor(5)).toBe(1);
    expect(greatestDivisor(7)).toBe(1);
    expect(greatestDivisor(11)).toBe(1);
    expect(greatestDivisor(13)).toBe(1);
    expect(greatestDivisor(17)).toBe(1);
    expect(greatestDivisor(19)).toBe(1);
    expect(greatestDivisor(23)).toBe(1);
  });

  test("the greatest divisor for composite numbers", () => {
    expect(greatestDivisor(4)).toBe(2);
    expect(greatestDivisor(6)).toBe(3);
    expect(greatestDivisor(8)).toBe(4);
    expect(greatestDivisor(9)).toBe(3);
    expect(greatestDivisor(10)).toBe(5);
    expect(greatestDivisor(12)).toBe(6);
    expect(greatestDivisor(15)).toBe(5);
    expect(greatestDivisor(16)).toBe(8);
    expect(greatestDivisor(18)).toBe(9);
  });
});
