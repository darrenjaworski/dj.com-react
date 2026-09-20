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
    const html = page.locator("html");

    // Get initial icon svg markup
    const initialIcon = await themeToggle.innerHTML();

    // Click to toggle theme
    await themeToggle.click();

    // Theme should have changed: data-theme attribute set and icon swapped
    await expect(html).toHaveAttribute("data-theme", /^(light|dark)$/);
    const newIcon = await themeToggle.innerHTML();
    expect(newIcon).not.toBe(initialIcon);
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
    const themeAfterToggle = await themeToggle.innerHTML();

    // Navigate to journalism page
    await page.getByTestId("nav-journalism").click();

    // Theme should persist
    const themeOnJournalismPage = await themeToggle.innerHTML();
    expect(themeOnJournalismPage).toBe(themeAfterToggle);

    // Navigate back to home
    await page.getByTestId("nav-home").click();

    // Theme should still persist
    const themeBackOnHome = await themeToggle.innerHTML();
    expect(themeBackOnHome).toBe(themeAfterToggle);
  });

  test("should respect system dark mode preference", async ({ page }) => {
    // Test with system dark mode
    await page.emulateMedia({ colorScheme: "dark" });
    await page.reload();

    // In dark mode, icon should show light-mode icon (to switch to light)
    await expect(page.getByTestId("light-mode-icon")).toBeVisible();
  });

  test("should respect system light mode preference", async ({ page }) => {
    // Test with system light mode
    await page.emulateMedia({ colorScheme: "light" });
    await page.reload();

    // In light mode, icon should show dark-mode icon (to switch to dark)
    await expect(page.getByTestId("dark-mode-icon")).toBeVisible();
  });

  test("should toggle from system preference to explicit choice", async ({
    page,
  }) => {
    // Start with system dark mode
    await page.emulateMedia({ colorScheme: "dark" });
    await page.reload();

    const themeToggle = page.getByTestId("theme-toggle");

    // Should show light-mode icon initially (system is dark)
    await expect(page.getByTestId("light-mode-icon")).toBeVisible();

    // Click to go to light mode (explicit choice)
    await themeToggle.click();
    await expect(page.getByTestId("dark-mode-icon")).toBeVisible();

    // Click again to go to dark mode (explicit choice)
    await themeToggle.click();
    await expect(page.getByTestId("light-mode-icon")).toBeVisible();
  });

  test("should apply Catppuccin Latte colors in light mode", async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.reload();

    const bgColor = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue(
        "--bg-color",
      ),
    );
    const textColor = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue(
        "--text-color",
      ),
    );

    expect(bgColor.trim()).toBe("#eff1f5");
    expect(textColor.trim()).toBe("#4c4f69");
  });

  test("should apply Catppuccin Frappé colors in dark mode", async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.reload();

    const bgColor = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue(
        "--bg-color",
      ),
    );
    const textColor = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue(
        "--text-color",
      ),
    );

    expect(bgColor.trim()).toBe("#303446");
    expect(textColor.trim()).toBe("#c6d0f5");
  });
});
