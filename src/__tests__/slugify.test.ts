import { describe, it, expect } from "vitest";
import { slugify } from "../utils/slugify";

describe("slugify", () => {
  it("lowercases the input", () => {
    expect(slugify("Instagram")).toBe("instagram");
  });

  it("collapses whitespace runs into a single hyphen", () => {
    expect(slugify("oklahoma  watch\tarticle")).toBe(
      "oklahoma-watch-article"
    );
  });

  it("truncates to maxLen when provided", () => {
    expect(slugify("Online Science Communication and Public Literacy", 10)).toBe(
      "online-sci"
    );
  });

  it("does not truncate when maxLen is omitted", () => {
    const long = "a very long article title indeed";
    expect(slugify(long)).toBe(long.replace(/\s+/g, "-").toLowerCase());
  });
});
