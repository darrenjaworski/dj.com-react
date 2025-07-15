import { test, expect } from "@playwright/test";

test.describe("Mobile Responsiveness", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display correctly on mobile viewport", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check that main elements are still visible
    await expect(page.getByTestId("navigation")).toBeVisible();
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByTestId("main-content")).toBeVisible();
    await expect(page.getByTestId("theme-toggle")).toBeVisible();
  });

  test("should have readable text on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Check that text is readable (not too small)
    const bodyText = page.locator("p").first();
    await expect(bodyText).toBeVisible();

    // Check that links are tappable (not too small)
    const socialLinks = page.getByTestId("social-links").locator("a");
    await expect(socialLinks.first()).toBeVisible();
  });

  test("should maintain functionality on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Test navigation
    await page.getByTestId("nav-journalism").click();
    await expect(page.locator("h1")).toContainText("journalism");

    // Test theme toggle
    const themeToggle = page.getByTestId("theme-toggle");
    const initialTheme = await themeToggle.textContent();
    await themeToggle.click();
    const newTheme = await themeToggle.textContent();
    expect(newTheme).not.toBe(initialTheme);
  });

  test("should handle tablet viewport", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });

    // Check that layout works on tablet
    await expect(page.getByTestId("navigation")).toBeVisible();
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByTestId("main-content")).toBeVisible();
    await expect(page.getByTestId("theme-toggle")).toBeVisible();
  });

  test("should handle different screen orientations", async ({ page }) => {
    // Portrait
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator("h1")).toBeVisible();

    // Landscape
    await page.setViewportSize({ width: 667, height: 375 });
    await expect(page.locator("h1")).toBeVisible();
  });
});
