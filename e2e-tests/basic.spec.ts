import { test, expect } from "@playwright/test";

test.describe("Basic Functionality", () => {
  test("should load the application", async ({ page }) => {
    await page.goto("/");

    // Check that the page loads successfully
    await expect(page).toHaveTitle("darrenjaworski.com");

    // Check that main content is visible
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByTestId("navigation")).toBeVisible();
    await expect(page.getByTestId("main-content")).toBeVisible();
  });

  test("should handle 404 gracefully", async ({ page }) => {
    // Since this is a SPA, all routes will serve the same content
    // The routing is handled by React
    await page.goto("/nonexistent-page");

    // Should still load the React app
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByTestId("navigation")).toBeVisible();
  });

  test("should be responsive", async ({ page }) => {
    await page.goto("/");

    // Test different viewport sizes
    const viewports = [
      { width: 320, height: 568 }, // iPhone SE
      { width: 375, height: 667 }, // iPhone 6/7/8
      { width: 768, height: 1024 }, // iPad
      { width: 1024, height: 768 }, // iPad landscape
      { width: 1200, height: 800 }, // Desktop
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.getByTestId("navigation")).toBeVisible();
    }
  });

  test("should have no console errors", async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto("/");

    // Navigate to journalism page
    await page.getByTestId("nav-journalism").click();

    // Wait a bit to catch any async errors
    await page.waitForTimeout(1000);

    // Check for console errors
    expect(consoleErrors).toHaveLength(0);
  });

  test("should have proper meta tags", async ({ page }) => {
    await page.goto("/");

    // Check that we have a viewport meta tag
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute(
      "content",
      "width=device-width, initial-scale=1.0"
    );

    // Should have a title
    await expect(page).toHaveTitle("darrenjaworski.com");
  });
});
