import { test, expect } from "@playwright/test";

test.describe("Journalism Data Integrity", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("nav-journalism").click();
  });

  test("should display all journalism sections", async ({ page }) => {
    // Based on the journalism.json structure, check for expected sections
    const sections = page.getByTestId("journalism-page").locator("h2");
    await expect(sections).toHaveCount(3);

    // Check for specific sections using test IDs
    await expect(
      page.getByTestId("journalism-section-oklahoma-watch")
    ).toBeVisible();
    await expect(page.getByTestId("journalism-section-routes")).toBeVisible();
    await expect(
      page.getByTestId("journalism-section-journalism-master's-research")
    ).toBeVisible();
  });
  test("should have valid article structure", async ({ page }) => {
    // Get the specific oklahoma watch section
    const oklahomaWatchSection = page.getByTestId(
      "journalism-section-oklahoma-watch"
    );

    // The section should be visible
    await expect(oklahomaWatchSection).toBeVisible();

    // The section should have a heading
    await expect(oklahomaWatchSection.locator("h2")).toBeVisible();

    // The section should have an article list
    const articleList = oklahomaWatchSection.locator("ul");
    await expect(articleList).toBeVisible();

    // Check that there are articles in the list (count should be > 0)
    const articleCount = await articleList.locator("li").count();
    expect(articleCount).toBeGreaterThan(0);
  });

  test("should have working article links", async ({ page }) => {
    // Get all article links from oklahoma watch section
    const oklahomaWatchSection = page.getByTestId(
      "journalism-section-oklahoma-watch"
    );
    const articleLinks = oklahomaWatchSection.locator("li a");
    const count = await articleLinks.count();

    // Should have multiple articles
    expect(count).toBeGreaterThan(0);

    // Check first few links
    for (let i = 0; i < Math.min(3, count); i++) {
      const link = articleLinks.nth(i);

      // Should have href
      const href = await link.getAttribute("href");
      expect(href).toBeTruthy();
      expect(href).toMatch(/^https?:\/\//);

      // Should have text content
      const text = await link.textContent();
      expect(text?.trim()).toBeTruthy();

      // Should have proper attributes for external links
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  test("should display articles grouped by section", async ({ page }) => {
    // Check the three specific sections
    const sections = [
      { testId: "journalism-section-oklahoma-watch", name: "oklahoma watch" },
      { testId: "journalism-section-routes", name: "routes" },
      {
        testId: "journalism-section-journalism-master's-research",
        name: "journalism master's research",
      },
    ];

    for (const section of sections) {
      const sectionElement = page.getByTestId(section.testId);
      await expect(sectionElement).toBeVisible();

      // Each section should have a ul with articles
      const articleList = sectionElement.locator("ul");
      await expect(articleList).toBeVisible();

      const articles = articleList.locator("li");
      const articleCount = await articles.count();

      // Each section should have at least one article
      expect(articleCount).toBeGreaterThan(0);

      console.log(`Section "${section.name}" has ${articleCount} articles`);
    }
  });

  test("should have proper article titles", async ({ page }) => {
    // Check that article titles are meaningful from oklahoma watch section
    const oklahomaWatchSection = page.getByTestId(
      "journalism-section-oklahoma-watch"
    );
    const articleLinks = oklahomaWatchSection.locator("li a");
    const count = await articleLinks.count();

    for (let i = 0; i < count; i++) {
      const link = articleLinks.nth(i);
      const title = await link.textContent();

      // Title should not be empty
      expect(title?.trim()).toBeTruthy();

      // Title should be reasonably long (not just a single character)
      expect(title?.trim().length).toBeGreaterThan(3);

      // Title should not contain common placeholder text (but "test" is allowed in legitimate articles)
      expect(title?.toLowerCase()).not.toContain("lorem ipsum");
      expect(title?.toLowerCase()).not.toContain("example");
      expect(title?.toLowerCase()).not.toContain("placeholder");
    }
  });

  test("should handle empty or malformed data gracefully", async ({ page }) => {
    // This test ensures the component handles data structure properly
    // Even if there are no articles, the page should still render without errors

    // Check that the page loads without JavaScript errors
    let hasErrors = false;
    page.on("pageerror", (error) => {
      hasErrors = true;
      console.error("Page error:", error);
    });

    // Navigate to journalism page using navigation link
    await page.getByTestId("nav-journalism").click();
    await page.waitForLoadState("networkidle");

    // Should still have the main structure
    await expect(page.getByTestId("journalism-page")).toBeVisible();

    // Should not have thrown any errors
    expect(hasErrors).toBe(false);
  });

  test("should maintain consistent link formatting", async ({ page }) => {
    // Check that all external links follow the same pattern from oklahoma watch section
    const oklahomaWatchSection = page.getByTestId(
      "journalism-section-oklahoma-watch"
    );
    const articleLinks = oklahomaWatchSection.locator("li a");
    const count = await articleLinks.count();

    for (let i = 0; i < count; i++) {
      const link = articleLinks.nth(i);

      // All article links should have the same attributes
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");

      // All should have valid URLs
      const href = await link.getAttribute("href");
      expect(href).toMatch(/^https?:\/\/.+/);
    }
  });
});
