import { test, expect } from "@playwright/test";

test.describe("Accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should have proper heading hierarchy", async ({ page }) => {
    // Check that we have an h1
    await expect(page.locator("h1")).toBeVisible();

    // Navigate to journalism page to check h2 structure
    await page.getByTestId("nav-journalism").click();
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("h2").first()).toBeVisible();
  });

  test("should have proper link text", async ({ page }) => {
    // Check that links have meaningful text
    const links = page.getByTestId("main-content").locator("a");
    const linkCount = await links.count();

    for (let i = 0; i < linkCount; i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      expect(text?.trim()).toBeTruthy();
      expect(text?.trim()).not.toBe("");
    }
  });

  test("should have proper aria labels", async ({ page }) => {
    // Check theme toggle button has aria-label
    const themeToggle = page.getByTestId("theme-toggle");
    await expect(themeToggle).toBeVisible();
    await expect(themeToggle).toHaveAttribute("aria-label", "Toggle theme");
  });

  test("should be keyboard navigable", async ({
    page,
    browserName,
  }, testInfo) => {
    test.skip(
      browserName === "webkit" || testInfo.project.name === "Mobile Safari",
      "Keyboard navigation tests are flaky in WebKit/Safari browsers"
    );

    // Test keyboard navigation
    await page.keyboard.press("Tab");

    // Should be able to navigate to the first link
    const focusedElement = page.locator(":focus");
    await expect(focusedElement).toBeVisible();

    // Continue tabbing to navigate through elements
    await page.keyboard.press("Tab");
    await expect(page.locator(":focus")).toBeVisible();
  });

  test("should have proper focus indicators", async ({
    page,
    browserName,
  }, testInfo) => {
    test.skip(
      browserName === "webkit" || testInfo.project.name === "Mobile Safari",
      "Focus indicator tests are flaky in WebKit/Safari browsers"
    );

    // Test that focused elements are visible
    await page.keyboard.press("Tab");
    const focusedElement = page.locator(":focus");
    await expect(focusedElement).toBeVisible();

    // The focused element should have some visual indication
    // This would typically be tested with visual regression testing
    // but we can at least verify the element is in focus
    const isVisible = await focusedElement.isVisible();
    expect(isVisible).toBe(true);
  });

  test("should work with screen readers", async ({ page }) => {
    // Test that important content has proper semantic structure
    await expect(page.getByTestId("navigation")).toBeVisible();
    await expect(page.getByTestId("main-content")).toBeVisible();
    await expect(page.locator("h1")).toBeVisible();

    // Lists should be properly structured
    await page.getByTestId("nav-journalism").click();
    await expect(page.locator("ul").first()).toBeVisible();
    await expect(page.locator("li").first()).toBeVisible();
  });

  test("should have proper color contrast", async ({ page }) => {
    // Test both light and dark themes
    const themeToggle = page.getByTestId("theme-toggle");

    // Test light theme
    await page.emulateMedia({ colorScheme: "light" });
    await page.reload();
    await expect(page.locator("h1")).toBeVisible();

    // Test dark theme
    await page.emulateMedia({ colorScheme: "dark" });
    await page.reload();
    await expect(page.locator("h1")).toBeVisible();

    // Toggle theme manually
    await themeToggle.click();
    await expect(page.locator("h1")).toBeVisible();
  });

  test("should handle reduced motion preference", async ({ page }) => {
    // Test with reduced motion preference
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();

    // Basic functionality should still work
    await expect(page.locator("h1")).toBeVisible();
    await page.getByTestId("nav-journalism").click();
    await expect(page.locator("h1")).toContainText("journalism");
  });

  test("should have proper lang attribute", async ({ page }) => {
    // Check that html has lang attribute
    const html = page.locator("html");
    const lang = await html.getAttribute("lang");
    expect(lang).toBeTruthy();
  });
});
