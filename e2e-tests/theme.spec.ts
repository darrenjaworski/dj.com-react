import { test, expect } from "@playwright/test";

test.describe("Theme Toggle", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display theme toggle button", async ({ page }) => {
    const themeToggle = page.getByTestId("theme-toggle");
    await expect(themeToggle).toBeVisible();
  });

  test("should toggle between light and dark theme", async ({ page }) => {
    const themeToggle = page.getByTestId("theme-toggle");

    // Get initial theme state
    const initialEmoji = await themeToggle.textContent();
    expect(initialEmoji).toMatch(/☀️|🌙/);

    // Click to toggle theme
    await themeToggle.click();

    // Theme should have changed
    const newEmoji = await themeToggle.textContent();
    expect(newEmoji).toMatch(/☀️|🌙/);
    expect(newEmoji).not.toBe(initialEmoji);
  });

  test("should apply theme to document", async ({ page }) => {
    const themeToggle = page.getByTestId("theme-toggle");

    // Click the theme toggle
    await themeToggle.click();

    // Check if data-theme attribute is set on html element
    const html = page.locator("html");
    const dataTheme = await html.getAttribute("data-theme");
    expect(dataTheme).toMatch(/^(light|dark)$/);
  });

  test("should persist theme selection", async ({ page }) => {
    const themeToggle = page.getByTestId("theme-toggle");

    // Toggle theme
    await themeToggle.click();
    const themeAfterToggle = await themeToggle.textContent();

    // Navigate to journalism page
    await page.getByTestId("nav-journalism").click();

    // Theme should persist
    const themeOnJournalismPage = await themeToggle.textContent();
    expect(themeOnJournalismPage).toBe(themeAfterToggle);

    // Navigate back to home
    await page.getByTestId("nav-home").click();

    // Theme should still persist
    const themeBackOnHome = await themeToggle.textContent();
    expect(themeBackOnHome).toBe(themeAfterToggle);
  });

  test("should respect system dark mode preference", async ({ page }) => {
    // Test with system dark mode
    await page.emulateMedia({ colorScheme: "dark" });
    await page.reload();

    const themeToggle = page.getByTestId("theme-toggle");
    const buttonText = await themeToggle.textContent();

    // In dark mode, button should show sun (to switch to light)
    expect(buttonText).toBe("☀️");
  });

  test("should respect system light mode preference", async ({ page }) => {
    // Test with system light mode
    await page.emulateMedia({ colorScheme: "light" });
    await page.reload();

    const themeToggle = page.getByTestId("theme-toggle");
    const buttonText = await themeToggle.textContent();

    // In light mode, button should show moon (to switch to dark)
    expect(buttonText).toBe("🌙");
  });

  test("should toggle from system preference to explicit choice", async ({
    page,
  }) => {
    // Start with system dark mode
    await page.emulateMedia({ colorScheme: "dark" });
    await page.reload();

    const themeToggle = page.getByTestId("theme-toggle");

    // Should show sun initially (system is dark)
    await expect(themeToggle).toHaveText("☀️");

    // Click to go to light mode (explicit choice)
    await themeToggle.click();
    await expect(themeToggle).toHaveText("🌙");

    // Click again to go to dark mode (explicit choice)
    await themeToggle.click();
    await expect(themeToggle).toHaveText("☀️");
  });
});
