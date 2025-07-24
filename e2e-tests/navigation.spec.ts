import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display navigation menu", async ({ page }) => {
    const nav = page.getByTestId("navigation");
    await expect(nav).toBeVisible();

    const homeLink = page.getByTestId("nav-home");
    await expect(homeLink).toBeVisible();
    await expect(homeLink).toHaveText("home");

    const journalismLink = page.getByTestId("nav-journalism");
    await expect(journalismLink).toBeVisible();
    await expect(journalismLink).toHaveText("journalism");
  });

  test("should navigate to journalism page", async ({ page }) => {
    const journalismLink = page.getByTestId("nav-journalism");
    await journalismLink.click();

    await expect(page.getByTestId("journalism-page")).toBeVisible();
  });

  test("should navigate back to home page", async ({ page }) => {
    // First go to journalism page
    await page.getByTestId("nav-journalism").click();
    await expect(page.getByTestId("journalism-page")).toBeVisible();

    // Then go back to home page
    await page.getByTestId("nav-home").click();
    await expect(page.getByTestId("home-page")).toBeVisible();
  });

  test("should navigate using journalism link in content", async ({ page }) => {
    const journalismLink = page.getByTestId("journalism-link");
    await journalismLink.click();

    await expect(page.getByTestId("journalism-page")).toBeVisible();
  });

  test("should prevent default navigation behavior", async ({ page }) => {
    // This test verifies that the navigation is handled by React Router
    // and doesn't cause a full page reload
    await page.getByTestId("nav-journalism").click();

    // We should still be on the same domain/port
    expect(page.url()).toBe("http://localhost:4173/");

    // But the content should have changed
    await expect(page.getByTestId("journalism-page")).toBeVisible();
  });
});
