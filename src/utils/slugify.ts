/**
 * Turn a label into a data-testid-safe slug: lowercases the input, collapses
 * whitespace runs into a single hyphen, and optionally truncates the result.
 */
export function slugify(input: string, maxLen?: number): string {
  const slug = input.replace(/\s+/g, "-").toLowerCase();
  return typeof maxLen === "number" ? slug.substring(0, maxLen) : slug;
}
