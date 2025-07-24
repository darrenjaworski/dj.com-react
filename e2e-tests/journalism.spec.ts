import { test, expect } from "@playwright/test";

test.describe("Journalism Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("nav-journalism").click();
  });

  test("should display journalism page title", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("journalism");
  });

  test("should display journalism sections", async ({ page }) => {
    // Check that we have sections with h2 headings
    const sections = page.getByTestId("journalism-page").locator("h2");
    await expect(sections).toHaveCount(3); // Based on the actual JSON data structure

    // Check for specific sections
    await expect(
      page.getByTestId("journalism-page").locator("h2")
    ).toContainText(["oklahoma watch"]);
    await expect(
      page.getByTestId("journalism-page").locator("h2")
    ).toContainText(["routes"]);
    await expect(
      page.getByTestId("journalism-page").locator("h2")
    ).toContainText(["journalism master's research"]);
  });

  test("should display articles in lists", async ({ page }) => {
    // Check that we have article lists
    const articleLists = page.getByTestId("journalism-page").locator("ul");
    await expect(articleLists.first()).toBeVisible();

    // Check that articles are clickable links
    const articleLinks = page
      .getByTestId("journalism-page")
      .locator("ul > li a");
    await expect(articleLinks.first()).toBeVisible();
  });

  test("should have working external article links", async ({ page }) => {
    // Get the first article link
    const firstArticleLink = page
      .getByTestId("journalism-page")
      .locator("ul > li a")
      .first();
    await expect(firstArticleLink).toBeVisible();

    // Check that it has target="_blank" and rel="noopener noreferrer"
    await expect(firstArticleLink).toHaveAttribute("target", "_blank");
    await expect(firstArticleLink).toHaveAttribute(
      "rel",
      "noopener noreferrer"
    );

    // Check that it has a proper href (should be an external URL)
    const href = await firstArticleLink.getAttribute("href");
    expect(href).toBeTruthy();
    expect(href).toMatch(/^https?:\/\//);
  });

  test("should display specific article titles", async ({ page }) => {
    // Check for specific articles that should exist in the journalism data
    await expect(
      page.getByTestId("journalism-page").locator("ul > li a")
    ).toContainText(["Oklahoma Correctional Facilities"]);
  });

  test("should organize articles by sections", async ({ page }) => {
    // Each section should have a heading followed by a list of articles
    const sections = page.getByTestId("journalism-page").locator("h2");
    const firstSection = sections.first();

    await expect(firstSection).toBeVisible();

    // The next sibling should be a ul with articles
    const articleList = firstSection.locator("+ ul");
    await expect(articleList).toBeVisible();

    // The list should contain article links
    const articles = articleList.locator("li a");
    await expect(articles.first()).toBeVisible();
  });

  test("should not display any broken links", async ({ page }) => {
    // Get all article links
    const articleLinks = page
      .getByTestId("journalism-page")
      .locator("ul > li a");
    const count = await articleLinks.count();

    // Each link should have a valid href
    for (let i = 0; i < count; i++) {
      const link = articleLinks.nth(i);
      const href = await link.getAttribute("href");
      expect(href).toBeTruthy();
      expect(href).not.toBe("");
      expect(href).not.toBe("#");
    }
  });
});
