import { formatTime } from "@/components/Header/Header.util";
import { describe, expect, test } from "vitest";

describe("Header util", () => {
  describe("formatTime", () => {
    test("formats seconds as minutes and seconds", () => {
      expect(formatTime(65)).toBe("1:05");
      expect(formatTime(126)).toBe("2:06");
      expect(formatTime(3600)).toBe("60:00");
    });

    test("handles zero seconds", () => {
      expect(formatTime(0)).toBe("0:00");
    });

    test("handles seconds less than 60", () => {
      expect(formatTime(45)).toBe("0:45");
      expect(formatTime(9)).toBe("0:09"); // Tests padding
    });

    test('returns "0" when input is undefined', () => {
      expect(formatTime(undefined)).toBe("0");
    });
  });
});
